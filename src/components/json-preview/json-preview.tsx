import React, { useEffect, useState, useRef } from 'react'
import styles from './json-preview.module.scss'
import clsx from 'clsx'

interface JSONPreviewProps {
  jsonText: string
  onUpdateJsonText?: (newJsonText: string) => void
}

const JSONPreview: React.FC<JSONPreviewProps> = ({ jsonText, onUpdateJsonText }) => {
  const [animate, setAnimate] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)
  const preRef = useRef<HTMLPreElement>(null)
  const canEdit = !!onUpdateJsonText

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false)
    } else {
      setAnimate(true)
      const timer = setTimeout(() => {
        setAnimate(false)
      }, 1000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [jsonText])

  const handleJsonTextChange = () => {
    if (preRef.current && onUpdateJsonText) {
      const newJsonText = preRef.current.textContent || ''
      onUpdateJsonText(newJsonText)
    }
  }

  return (
    <div
      className={clsx(styles['json-preview'], {
        [styles.updated]: animate,
      })}
    >
      <pre
        contentEditable={canEdit}
        ref={preRef}
        onInput={handleJsonTextChange}
        suppressContentEditableWarning={canEdit}
      >
        {JSON.stringify(jsonText, null, 2)}
      </pre>
    </div>
  )
}

export default React.memo(JSONPreview)
