import styles from '../styles/TimelineMenuItem.module.scss'

export default function TimelineMenuItem({item, currentRecordNo, displayThisRecord}) {
  const {order, name, location, startDate, endDate, skills, description} = item;
  const isSelected = (order === currentRecordNo);

  const clickHandler = (index) => {
    displayThisRecord(index);
  }

  return (
    <div className={styles.container} onClick={() => {clickHandler(order)}}>
      <span className={styles.order}>{`${order+1}.`}</span>
      <span className={`${styles.dateMenu} ${isSelected ? styles.selectedRecord : ''}`}>{startDate}</span>
    </div>
  )
}