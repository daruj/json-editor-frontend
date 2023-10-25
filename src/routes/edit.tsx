import React, { useEffect, useState } from 'react'
import useDebounce from '../hooks/useDebounce.hook'

export default function Edit() {
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [jsonValue, setJsonValue] = useState<string>('{}')
  const debouncedValue = useDebounce<string>(jsonValue, 500)

  useEffect(() => {
    if (debouncedValue && !isFirstRender) {
      console.log('ACAA')
    }

    if (isFirstRender) {
      setIsFirstRender(false)
    }
  }, [debouncedValue])

  const handleOnJsonEdit = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonValue(event.target.value)
  }

  return (
    <div>
      <textarea onChange={handleOnJsonEdit} value={jsonValue} />
    </div>
  )
}
