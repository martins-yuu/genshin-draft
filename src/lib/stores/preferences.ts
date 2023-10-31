import { persisted } from 'svelte-local-storage-store'

export interface Preferences {
  backgroundVideo: boolean
  backgroundURL: string
  nickname?: string
  avatar?: string
  characterBans: number
  weaponBans: number
  id?: number
}

export const defaultPreferences = {
  backgroundVideo: false,
  backgroundURL: 'youtube.com/watch?v=2DfJ-yslqAw',
  characterBans: 4,
  weaponBans: 1,
}

export const preferences = persisted<Preferences>('preferences', defaultPreferences)
