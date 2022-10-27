import {useState} from "react";
import Layout from "@/components/Layout";
import { TOKEN, DATABASE_EXP_ID } from "@/config";
import TimelineMenuItem from "@/components/TimelineMenuItem";
import styles from '@/styles/Experiences.module.scss'
import { MdSchool, MdWork } from 'react-icons/md';

export default function Experiences({record}) {
  const [currentRecordNo, setCurrentRecordNo] = useState(0);
  const currentRecord = record[currentRecordNo];

  return (
    <Layout>
      <div className={styles.expContainer}>
        <aside className={styles.timelineMenu}>
          {
            record.map((item, index) => {
              return (
                <TimelineMenuItem
                  key={`timeline-${index}`}
                  item={item}
                  currentRecordNo={currentRecordNo}
                  displayThisRecord={setCurrentRecordNo} 
                />)
            })
          }
        </aside>
        <article className={styles.mainContent}>
          { 
            currentRecord.status === 'study' ? 
            <MdSchool size='2rem' /> : <MdWork size='2rem' />
          }
          <span className={styles.recordTitle}>{currentRecord.name}</span>
          <span className={styles.recordLocation}>{currentRecord.location}</span>
          <span className={styles.recordPeriod}>{`${currentRecord.startDate} - ${currentRecord.endDate}`}</span>
          <div className={styles.descriptionContainer}>
            <span className={styles.recordSkills}>{currentRecord.skills}</span>
            <p className={styles.recordDescription}>{currentRecord.description}</p>
          </div>
        </article>
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Notion-Version': '2022-06-28',
      authorization: `Bearer ${TOKEN}`
    }
  };
  
  const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_EXP_ID}/query`, options)
    
  const result = await res.json();

  
  const record = result.results.sort(sortByOrder)
    .map((row, index) => {
    return {
        name: row.properties.name.title[0].plain_text,
        skills: row.properties.skills.multi_select?.map(skill => {return skill.name}).join(", ") ?? null,
        location: row.properties.location.rich_text[0].plain_text,
        status: row.properties.status.select.name,
        startDate: row.properties.period.date.start,
        endDate: row.properties.period.date.end,
        description: row.properties.description.rich_text[0].plain_text,
        order: index,
      }
    }
  );

  return {
    props: {
      record
    }
  }
}

function sortByOrder(prev, curr) {
  return new Date(curr.properties.period.date.start) - new Date(prev.properties.period.date.start);
}