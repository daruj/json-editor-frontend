import React, { useEffect, useState } from 'react'
import useDebounce from '../hooks/useDebounce.hook'

export default function Edit() {
  const [jsonValue, setJsonValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(jsonValue, 2000)

  useEffect(() => {
    if (debouncedValue) {
      console.log('ACAA')
    }
  }, [debouncedValue])

  const handleOnJsonEdit = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonValue(event.target.value)
  }

  return (
    <div>
      <textarea onChange={handleOnJsonEdit} />
    </div>
  )
}
