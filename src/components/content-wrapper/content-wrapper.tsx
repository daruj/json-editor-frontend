import React from 'react'
import styles from './content-wrapper.module.scss'
import clsx from 'clsx'

interface ContentWrapperProps {
  children: React.ReactElement
  centered?: boolean
  fullHeight?: boolean
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({
  children,
  centered,
  fullHeight,
}) => {
  return (
    <div
      className={clsx(styles['content-wrapper'], {
        [styles.centered]: centered,
        [styles.fullHeight]: fullHeight,
      })}
    >
      {children}
    </div>
  )
}

export default ContentWrapper
