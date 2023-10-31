import React from 'react'
import styles from './content-wrapper.module.scss'
import clsx from 'clsx'

interface ContentWrapperProps {
  children: React.ReactElement
  centered?: boolean
  fullHeight?: boolean
  fullHeightVP?: boolean
  className?: string
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({
  children,
  centered,
  fullHeight,
  fullHeightVP,
  className,
}) => {
  return (
    <div
      className={clsx(
        styles.wrapper,
        {
          [styles.centered]: centered,
          [styles.fullHeight]: fullHeight,
          [styles.fullHeightVP]: fullHeightVP,
        },
        className
      )}
    >
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default ContentWrapper
