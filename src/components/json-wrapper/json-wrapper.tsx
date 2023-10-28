import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styles from './json-wrapper.module.scss'
import clsx from 'clsx'
import useWebSocket from 'react-use-websocket'
import { WS_URL } from '../../constants'
import { deepEqual } from '../../utils/json.utils'
import { isJSONUpdateEvent } from '../../utils/ws.utils'
import PreCode from '../pre-code/pre-code'

interface JSONWrapperProps {
  jsonText: string
  onUpdateJsonText?: (newJsonText: string) => void
}

const JSONWrapper: React.FC<JSONWrapperProps> = ({ jsonText, onUpdateJsonText }) => {
  const [json, setJSON] = useState(jsonText)
  const [animateSuccess, setAnimateSuccess] = useState(false)
  const [animateError, setAnimateError] = useState(false)
  const canEdit = useMemo(() => !!onUpdateJsonText, [])

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
    const currentJsonMessage = JSON.parse(JSON.stringify(json))

    if (newJsonMessage && !deepEqual(newJsonMessage, currentJsonMessage)) {
      setAnimateSuccess(true)
      if (!canEdit) {
        setJSON(newJsonMessage)
      }
      const timer = setTimeout(() => {
        setAnimateSuccess(false)
      }, 1000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [lastJsonMessage])

  const handleJsonTextChange = useCallback(
    (value: string) => {
      try {
        if (JSON.parse(value) && onUpdateJsonText) {
          onUpdateJsonText(value)
        }
      } catch (err) {
        setAnimateError(true)
        setTimeout(() => {
          setAnimateError(false)
        }, 1000)
      }
    },
    [onUpdateJsonText]
  )

  return (
    <div
      className={clsx(styles['json-preview'], {
        [styles.updated]: animateSuccess,
        [styles.error]: animateError,
      })}
    >
      <PreCode
        canEdit={canEdit}
        handleJsonTextChange={handleJsonTextChange}
        jsonText={json}
      />
    </div>
  )
}

export default React.memo(JSONWrapper)
