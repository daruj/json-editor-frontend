import { API_URL } from '../constants'

// IMPORTANT: There is no need to try catch any of these functions because the errors will be handled with react-query

export const fetchJsonData = async (): Promise<string> => {
  const response = await fetch(`${API_URL}/json`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const data: string = await response.json()

  return data
}

export const updateJsonData = async (json: string): Promise<string> => {
  const response = await fetch(`${API_URL}/json/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      // Add any other headers your API may require
    },
    body: json,
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const data: string = await response.json()

  return data
}
