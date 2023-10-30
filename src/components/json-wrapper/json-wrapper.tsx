import React, { useMemo } from 'react'
import styles from './json-wrapper.module.scss'
import clsx from 'clsx'

import PreCode from '../pre-code/pre-code'
import useJSONPreview from '../../hooks/useJSONPreview.hook'

interface JSONWrapperProps {
  jsonText: string
  onUpdateJsonText?: (newJsonText: string) => void
}

const JSONWrapper: React.FC<JSONWrapperProps> = ({ jsonText, onUpdateJsonText }) => {
  const canEdit = useMemo(() => !!onUpdateJsonText, [])
  const { json, animateSuccess, animateError, handleJsonTextChange } = useJSONPreview({
    editMode: canEdit,
    jsonText,
    onUpdate: onUpdateJsonText,
  })

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
