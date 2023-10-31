import ContentWrapper from '../../components/content-wrapper/content-wrapper'
import JSONWrapper from '../../components/json-wrapper/json-wrapper'
import styles from './preview.page.module.scss'

import React from 'react'

interface PreviewPageProps {
  jsonText: string
}

const PreviewPage: React.FC<PreviewPageProps> = ({ jsonText }) => {
  return (
    <div className={styles['preview-page']}>
      <ContentWrapper centered fullHeight className={styles.flex}>
        <JSONWrapper jsonText={jsonText} />
      </ContentWrapper>
    </div>
  )
}

export default PreviewPage
