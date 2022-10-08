import { EventEmitter } from 'events'

import type { StrictEventEmitter } from 'strict-event-emitter-types'

interface Events {
  'click.playAudioHandler': () => void
}

export const eventEmitter: StrictEventEmitter<EventEmitter, Events> = new EventEmitter()
