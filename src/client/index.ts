import { ethers, Wallet } from 'ethers'
import { Bee, Topic } from '@ethersphere/bee-js'

export const INVITER_SLOT_PREFIX = 'inviter_'
export const INVITEE_SLOT_PREFIX = 'invitee_'
export const FEED_TYPE = 'sequence'

export enum InviteSystemType {
  INVITER = 'inviter',
  INVITEE = 'invitee',
}

export interface JoinOptions {
  slot?: number
  walletAddress: string
}

export interface JoinInviteSystemResponse {
  slot: number
  slotId: string
  topic: Topic
  wallet: Wallet
}

export interface ReferralSystemOptions {
  maxInviterSlots: number
  maxInviteeSlots: number
}

export class ReferralSystem {
  constructor(private beeUrl: string, private postageBatchId: string, private options: ReferralSystemOptions) {}

  randomSlot(userType: InviteSystemType): number {
    const number =
      Math.random() *
      (userType === InviteSystemType.INVITEE ? this.options.maxInviteeSlots : this.options.maxInviterSlots)

    return Math.floor(number) + 1
  }

  stringToBytes(data: string): Uint8Array {
    return new TextEncoder().encode(data)
  }

  getInviterSlotId(slotNumber: number): string {
    return `${INVITER_SLOT_PREFIX}${slotNumber}`
  }

  getInviteeSlotId(slotNumber: number): string {
    return `${INVITEE_SLOT_PREFIX}${slotNumber}`
  }

  async join(userType: InviteSystemType, privateKey: string, options: JoinOptions): Promise<JoinInviteSystemResponse> {
    const wallet = ethers.Wallet.createRandom()
    const bee = new Bee(this.beeUrl)
    const slotNumber = options?.slot ?? this.randomSlot(userType)

    let slotId

    if (userType === InviteSystemType.INVITEE) {
      slotId = this.getInviteeSlotId(slotNumber)
    } else if (userType === InviteSystemType.INVITER) {
      slotId = this.getInviterSlotId(slotNumber)
    } else {
      throw new Error('Invalid user type')
    }
    const topic = bee.makeFeedTopic(slotId)
    const writer = bee.makeFeedWriter(FEED_TYPE, topic, privateKey)
    const reference = (await bee.uploadData(this.postageBatchId, this.stringToBytes(options.walletAddress))).reference
    await writer.upload(this.postageBatchId, reference)

    return {
      slot: slotNumber,
      slotId,
      topic,
      wallet,
    }
  }

  async getSlotItemsCount(slotId: string, ownerAddress: string): Promise<number> {
    try {
      const bee = new Bee(this.beeUrl)
      const topic = bee.makeFeedTopic(slotId)
      const reader = bee.makeFeedReader(FEED_TYPE, topic, ownerAddress)
      const feedUpdate = await reader.download()

      return Number(feedUpdate.feedIndex) + 1
    } catch (e) {
      return 0
    }
  }

  async getSlotItems(slotId: string, ownerAddress: string): Promise<string[]> {
    const bee = new Bee(this.beeUrl)
    const topic = bee.makeFeedTopic(slotId)
    const reader = bee.makeFeedReader(FEED_TYPE, topic, ownerAddress)
    const length = await this.getSlotItemsCount(slotId, ownerAddress)
    const items = []
    for (let i = 0; i < length; i++) {
      const item = await reader.download({
        type: FEED_TYPE,
        index: i.toString().padStart(16, '0'),
      })
      items.push((await bee.downloadData(item.reference)).text())
    }

    return items
  }
}
