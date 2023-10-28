import useWebSocket from 'react-use-websocket'
import { WS_URL } from '../constants'
import { useQuery } from 'react-query'
import { fetchJsonData } from '../api/json.api'
import PreviewPage from '../pages/preview/preview.page'
import LoadingSpinner from '../components/loading-spinner/loading-spinner'
import ContentWrapper from '../components/content-wrapper/content-wrapper'

interface WsData {
  event: string
  payload: string
}

function isJSONUpdateEvent(message: { data: string }) {
  try {
    const parsedMessage: WsData = JSON.parse(message.data)

    if (parsedMessage.event !== 'JSON_UPDATED') {
      return false
    }

    return true
  } catch (err) {
    return false
  }
}

export default function Preview() {
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

  if (isLoading)
    return (
      <ContentWrapper centered fullHeight>
        <LoadingSpinner />
      </ContentWrapper>
    )

  if (isError)
    return (
      <ContentWrapper centered fullHeight>
        <span>
          We were not able to retrieve the json, please{' '}
          <a href='/#' onClick={handleRefetch}>
            try refetching
          </a>
        </span>
      </ContentWrapper>
    )

  if (isSuccess && data) {
    const jsonText = lastJsonMessage !== null ? JSON.parse(lastJsonMessage.payload) : data
    return <PreviewPage jsonText={jsonText} />
  }

  return <PreviewPage jsonText='{}' />
}
