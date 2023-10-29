import { WS_EVENTS } from '../constants'

interface WsData {
  event: string
  payload: string
}

export function isJSONUpdateEvent(message: { data: string }) {
  try {
    const parsedMessage: WsData = JSON.parse(message.data)

    if (parsedMessage.event !== WS_EVENTS.JSON_UPDATED) {
      return false
    }

    return true
  } catch (err) {
    return false
  }
}
