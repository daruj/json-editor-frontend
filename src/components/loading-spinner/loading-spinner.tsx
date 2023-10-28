import styles from './loading-spinner.module.scss'

export default function LoadingSpinner() {
  return (
    <div className={styles['loading-spinner']}>
      <div></div>
      <div></div>
    </div>
  )
}
