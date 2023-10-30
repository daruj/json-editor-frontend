import useWebSocket from 'react-use-websocket'
import { WS_URL } from '../constants'

import { isJSONUpdateEvent } from '../utils/ws.utils'
import { useCallback, useEffect, useState } from 'react'
import useDebounce from './useDebounce.hook'

const executeAnimation = (time: number, callback: (value: boolean) => void) => {
  callback(true)
  const timer = setTimeout(() => {
    callback(false)
  }, time)
  return timer
}

export default function useJSONPreview({
  editMode,
  jsonText,
  onUpdate,
}: {
  editMode: boolean
  jsonText: string
  onUpdate?: (jsonText: string) => void
}) {
  const [jsonValue, setJsonValue] = useState<string>(jsonText || '')
  const debouncedValue = useDebounce<string>(jsonValue, 500)

  const [animateSuccess, setAnimateSuccess] = useState(false)
  const [animateError, setAnimateError] = useState(false)

  useEffect(() => {
    if (editMode) {
      try {
        if (JSON.parse(debouncedValue) && onUpdate) {
          onUpdate(debouncedValue)
        }
      } catch (err) {
        executeAnimation(1000, setAnimateError)
      }
    }
  }, [debouncedValue, editMode])

  const handleJsonTextChange = useCallback((value: string) => {
    setJsonValue(value)
  }, [])

  const { lastJsonMessage }: { lastJsonMessage: { payload: string } | null } =
    useWebSocket(WS_URL, {
      share: true,
      filter: isJSONUpdateEvent,
      retryOnError: true,
      shouldReconnect: () => true,
    })

  useEffect(() => {
    const newJsonMessage =
      lastJsonMessage !== null ? JSON.parse(lastJsonMessage.payload) : null

    if (newJsonMessage) {
      if (!editMode) {
        setJsonValue(newJsonMessage)
      }

      const timer = executeAnimation(1000, setAnimateSuccess)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [lastJsonMessage])

  return {
    json: jsonValue,
    handleJsonTextChange,
    animateSuccess,
    animateError,
  }
}
