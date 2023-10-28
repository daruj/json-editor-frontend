import { fetchJsonData } from '../api/json.api'
import useWebSocket from 'react-use-websocket'
import { WS_EVENTS, WS_URL } from '../constants'
import { useQuery } from 'react-query'

interface WsData {
  event: string
  payload: string
}

function isJSONUpdateEvent(message: { data: string }) {
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

export default function useGetJSON() {
  const { lastJsonMessage }: { lastJsonMessage: { payload: string } | null } =
    useWebSocket(WS_URL, {
      share: true,
      filter: isJSONUpdateEvent,
      retryOnError: true,
      shouldReconnect: () => true,
    })

  const { data, isSuccess, isError, isLoading, refetch } = useQuery(
    'jsonData',
    fetchJsonData,
    {
      refetchOnWindowFocus: false,
    }
  )

  const handleRefetch = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault()
    refetch()
  }

  return { lastJsonMessage, data, isSuccess, isError, isLoading, handleRefetch }
}
