import * as crypto from 'crypto'

export const PRIVATE_KEY_LENGTH = 64

export function generateRandomHexString(length = 10): string {
  return crypto.randomBytes(length).toString('hex').substring(0, length)
}

export async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
