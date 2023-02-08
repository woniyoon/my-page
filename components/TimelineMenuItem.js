import styles from '../styles/TimelineMenuItem.module.scss'
import { MdSchool, MdWork } from 'react-icons/md';

export default function TimelineMenuItem({item, showItemIdx}) {
  const {order, name, location, startDate, endDate, skills, status, description, isSelected} = item;
  const clickHandler = (index) => {
    showItemIdx(index);
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.timelineContainer} ${isSelected ? styles.selectedTimelineContainer : ''}`} onClick={() => {clickHandler(order)}}>
        <span className={`${styles.dateMenu} ${isSelected ? styles.selectedRecord : ''}`}>{`${startDate} - ${endDate}`}</span>
      </div>
      {
        isSelected &&
        <div className={`${styles.detail} ${isSelected ? styles.selectedDetail : ''}`}>
          <div>
          {
            status === 'study' ? 
            <MdSchool size='1.8rem' /> : <MdWork size='1.8rem' />
          }
          </div>
          <span className={styles.companyName}>{name}</span>
          <span className={styles.detailTxt}>{location}</span>
          <span className={`${styles.recordSkills} ${styles.detailTxt}`}>{skills}</span>
          {
              description.map((desc, index) => 
              <span key={`desc-${index}`} className={`${styles.detailDescription} ${styles.detailTxt}`}>{`· ${desc}`}</span>
            )
          }
        </div>
      }
    </div>
  )
}