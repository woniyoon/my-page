import {useState} from "react";
import Layout from "../components/layout.js";
import { TOKEN, DATABASE_EXP_ID } from "../config";
import TimelineMenuItem from "../components/TimelineMenuItem.js";
import styles from '../styles/Experiences.module.scss'

export default function Experiences({data}) {
  const [records, setRecords] = useState(data);

  const showItemIdx = (idx) => {
    const data = records.map((item, index) => { return {...item, isSelected: index === idx }})
    setRecords(data);
  }

  return (
    <Layout>
      <div className={styles.timelineMenu}>
        {
          records.map((item, index) => {
            return (
              <TimelineMenuItem
                key={`timeline-${index}`}
                item={item}
                showItemIdx={showItemIdx}
              />)
          })
        }
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

  const data = result.results.sort(sortByOrder)
    .map((row, index) => {
    return {
        name: row.properties.name.title[0].plain_text,
        skills: row.properties.skills.multi_select?.map(skill => {return skill.name}).join(", ") ?? null,
        location: row.properties.location.rich_text[0].plain_text,
        status: row.properties.status.select.name,
        startDate: row.properties.period.date.start.replaceAll('-', '/'),
        endDate: row.properties.period.date.end.replaceAll('-', '/'),
        description: row.properties.description.multi_select?.map(desc => {return desc.name}),
        order: index,
        isSelected: index === 0,
      }
    }
  );

  return {
    props: {
      data
    }
  }
}

function sortByOrder(prev, curr) {
  return new Date(curr.properties.period.date.start) - new Date(prev.properties.period.date.start);
}