import { useCallback } from 'react'
import useGetAndUpdateJSON from '../hooks/useGetAndUpdateJSON.hook'
import ContentWrapper from '../components/content-wrapper/content-wrapper'
import LoadingSpinner from '../components/loading-spinner/loading-spinner'
import EditPage from '../pages/edit/edit.page'

export default function Edit() {
  const { isLoading, isError, handleRefetch, jsonText, handleUpdateJSONMutation } =
    useGetAndUpdateJSON()

  const handleOnJsonEdit = useCallback((newJSONText: string) => {
    handleUpdateJSONMutation.mutate(newJSONText)
  }, [])

  if (isLoading) {
    return (
      <ContentWrapper centered fullHeight>
        <LoadingSpinner />
      </ContentWrapper>
    )
  }

  if (isError) {
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
  }

  return <EditPage jsonText={jsonText} onUpdateJsonText={handleOnJsonEdit} />
}
