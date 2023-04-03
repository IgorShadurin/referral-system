import { ReferralSystem } from './client'

export { ReferralSystem }

declare global {
  interface Window {
    wiki: {
      ReferralSystem: typeof import('./client').ReferralSystem
    }
  }
}
