import React, { useEffect, useRef, useState } from 'react'

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
  const [json, setJSON] = useState(jsonText)

  useEffect(() => {
    if (!canEdit) {
      setJSON(jsonText)
    }
  }, [jsonText, canEdit])

  const preRef = useRef<HTMLPreElement>(null)

  // I made this so when pressing a Tab I insert 2 spaces
  const handleKeyDown = (e: React.KeyboardEvent<HTMLPreElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const selection = window.getSelection()
      if (selection) {
        const range = selection.getRangeAt(0)
        const tabNode = document.createTextNode('  ')
        range.insertNode(tabNode)
        range.setStartAfter(tabNode)
        range.setEndAfter(tabNode)
        selection.removeAllRanges()
        selection.addRange(range)
      }
    }
  }

  const onChange = () => {
    if (preRef.current && handleJsonTextChange) {
      const newJsonText = preRef.current.textContent || ''
      handleJsonTextChange(newJsonText)
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <pre
      contentEditable={canEdit}
      ref={preRef}
      onKeyDown={handleKeyDown}
      onInput={onChange}
      suppressContentEditableWarning={canEdit}
    >
      {JSON.stringify(json, null, 2)}
    </pre>
  )
}

export default React.memo(PreCode)
