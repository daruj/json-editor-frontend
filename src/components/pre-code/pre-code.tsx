import React, { useRef } from 'react'

interface PreCodeProps {
  canEdit: boolean
  handleJsonTextChange?: (newJsonText: string) => void
  jsonText: string
}

export const PreCode: React.FC<PreCodeProps> = ({
  canEdit,
  handleJsonTextChange,
  jsonText,
}) => {
  const preRef = useRef<HTMLPreElement>(null)

  const onChange = () => {
    if (preRef.current && handleJsonTextChange) {
      const newJsonText = preRef.current.textContent || ''
      handleJsonTextChange(newJsonText)
    }
  }

  return (
    <pre
      contentEditable={canEdit}
      ref={preRef}
      onInput={onChange}
      suppressContentEditableWarning={canEdit}
    >
      {JSON.stringify(jsonText, null, 2)}
    </pre>
  )
}

export default React.memo(PreCode)
