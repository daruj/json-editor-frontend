import JSONWrapper from '../../components/json-wrapper/json-wrapper'
import styles from './edit.page.module.scss'

import React from 'react'

interface EditPageProps {
  jsonText: string
  onUpdateJsonText: (newJsonText: string) => void
}

const EditPage: React.FC<EditPageProps> = ({ jsonText, onUpdateJsonText }) => {
  return (
    <div className={styles['edit-page']}>
      <JSONWrapper jsonText={jsonText} onUpdateJsonText={onUpdateJsonText} />
    </div>
  )
}

export default React.memo(EditPage)
