import React from 'react'

export default function Edit() {
  const handleOnJsonEdit = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event.target.value)
  }

  return (
    <div>
      <textarea onChange={handleOnJsonEdit} />
    </div>
  )
}
