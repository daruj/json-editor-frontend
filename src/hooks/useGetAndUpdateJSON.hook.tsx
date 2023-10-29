import { fetchJsonData, updateJsonData } from '../api/json.api'
import { useMutation, useQuery } from 'react-query'

export default function useGetJSON() {
  const { data, isSuccess, isError, isLoading, refetch } = useQuery(
    'jsonData',
    fetchJsonData,
    {
      refetchOnWindowFocus: false,
    }
  )
  const handleUpdateJSONMutation = useMutation({
    mutationFn: updateJsonData,
  })

  const handleRefetch = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault()
    refetch()
  }

  const jsonText = isSuccess && data ? data : ''

  return {
    jsonText,
    data,
    isSuccess,
    isError,
    isLoading,
    handleRefetch,
    handleUpdateJSONMutation,
  }
}
