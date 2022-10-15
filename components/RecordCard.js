import styles from '@/styles/Experiences.module.css'

export default function RecordCard({item}) {
  const {order, name, location, startDate, endDate, skills, description} = item;
  const isLeft = order%2 === 0;
  const containerClasses = [styles.cardContainer, styles[isLeft ? 'container-left' : 'container-right']].join(" ")
  const linePosition = styles[isLeft ? 'left' : 'right'];

  return (
    <div className={containerClasses} key={`exp-${order}`}>
      <strong className={styles.nameTxt}>{name}</strong>
      <p className={styles.locationTxt}>{location}</p>
      <p className={styles.periodTxt}>{`${startDate} - ${endDate}`}</p>
      <div className={styles.skillContainer}>
        <p className={styles.skillTxt}>{skills}</p>
        <div className={styles.highlighter}></div>
      </div>
      <p className={styles.descriptionTxt}>{`• ${description}`}</p>
      <div className={linePosition}></div>
    </div>
  )
}