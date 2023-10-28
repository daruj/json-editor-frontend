import JsonPreview from '../../components/json-preview/json-preview'
import styles from './preview.page.module.scss'

import React from 'react'

interface PreviewPageProps {
  jsonText: string
}

const PreviewPage: React.FC<PreviewPageProps> = ({ jsonText }) => {
  return (
    <div className={styles['preview-page']}>
      <JsonPreview jsonText={jsonText} />
    </div>
  )
}

export default PreviewPage
