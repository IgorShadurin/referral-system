import { ReferralSystem } from '../../src'
import { Wallet } from 'ethers'
import { InviteSystemType } from '../../src/client'

jest.setTimeout(1000000)
describe('Client', () => {
  it('random', () => {
    const maxInviteeSlots = 5
    const maxInviterSlots = 10
    const invite = new ReferralSystem('', '', {
      maxInviteeSlots,
      maxInviterSlots,
    })

    for (let i = 0; i < 1000; i++) {
      const random = invite.randomSlot(InviteSystemType.INVITEE)
      expect(random).toBeGreaterThanOrEqual(1)
      expect(random).toBeLessThanOrEqual(maxInviteeSlots)
    }

    for (let i = 0; i < 1000; i++) {
      const random = invite.randomSlot(InviteSystemType.INVITER)
      expect(random).toBeGreaterThanOrEqual(1)
      expect(random).toBeLessThanOrEqual(maxInviterSlots)
    }
  })

  it('check', async () => {
    const maxInviteeSlots = 10
    const maxInviterSlots = 10
    const invite = new ReferralSystem(
      'http://localhost:1633',
      // 'https://bee-1.fairdatasociety.org/',
      'dd6f857e2f6915d73baf21636c1bf8f56cd6187f4697ae0693560ddbd6bd4329',
      // '0000000000000000000000000000000000000000000000000000000000000000',
      {
        maxInviteeSlots,
        maxInviterSlots,
      },
    )

    const publicWallet = Wallet.createRandom()
    const inviterWallet = Wallet.createRandom()
    const invitersCount0 = await invite.getSlotItemsCount(invite.getInviterSlotId(1), publicWallet.address)
    expect(invitersCount0).toEqual(0)
    await invite.join(InviteSystemType.INVITER, publicWallet.privateKey, {
      slot: 1,
      walletAddress: inviterWallet.address,
    })
    const invitersCount1 = await invite.getSlotItemsCount(invite.getInviterSlotId(1), publicWallet.address)
    expect(invitersCount1).toEqual(1)

    // todo check inviters count/address

    const wallets = []
    const maxInvitees = 100
    for (let i = 0; i < maxInvitees; i++) {
      const wallet = Wallet.createRandom()
      wallets.push(wallet.address)
      await invite.join(InviteSystemType.INVITEE, inviterWallet.privateKey, {
        slot: 1,
        walletAddress: wallet.address,
      })
    }

    const addresses = []
    for (let i = 1; i <= maxInvitees; i++) {
      addresses.push(...(await invite.getSlotItems(invite.getInviteeSlotId(i), inviterWallet.address)))
    }

    expect(addresses.length).toEqual(maxInvitees)
    for (const wallet of wallets) {
      expect(addresses).toContain(wallet)
    }
  })
})
