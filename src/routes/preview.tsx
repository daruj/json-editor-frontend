import PreviewPage from '../pages/preview/preview.page'
import LoadingSpinner from '../components/loading-spinner/loading-spinner'
import ContentWrapper from '../components/content-wrapper/content-wrapper'
import useGetAndUpdateJSON from '../hooks/useGetAndUpdateJSON.hook'

export default function Preview() {
  const { isLoading, isError, handleRefetch, jsonText } = useGetAndUpdateJSON()

  if (isLoading) {
    return (
      <ContentWrapper centered fullHeight>
        <LoadingSpinner />
      </ContentWrapper>
    )
  }

  if (isError) {
    return (
      <ContentWrapper centered fullHeightVP>
        <span>
          We were not able to retrieve the json, please{' '}
          <a href='/#' onClick={handleRefetch}>
            try refetching
          </a>
        </span>
      </ContentWrapper>
    )
  }

  return <PreviewPage jsonText={jsonText} />
}
