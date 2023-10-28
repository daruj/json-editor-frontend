import PreviewPage from '../pages/preview/preview.page'
import LoadingSpinner from '../components/loading-spinner/loading-spinner'
import ContentWrapper from '../components/content-wrapper/content-wrapper'
import useGetJSON from '../hooks/useGetJSON.hook'

export default function Preview() {
  const { isLoading, isError, handleRefetch, isSuccess, data, lastJsonMessage } =
    useGetJSON()

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
