import Layout from "@/components/Layout";
import { TOKEN, DATABASE_EXP_ID } from "@/config";
import styles from '@/styles/Experiences.module.css'

export default function Experiences({record}) {
  const renderEachWing = (item, index) => {
    return (
      <div className={styles.cardContainer} key={`exp-${index}`}>
        <strong className={styles.nameTxt}>{item.name}</strong>
        <p className={styles.locationTxt}>{item.location}</p>
        <p className={styles.periodTxt}>{`${item.startDate} - ${item.endDate}`}</p>
        <div className={styles.skillContainer}>
          <p className={styles.skillTxt}>{item.skills}</p>
          <div className={styles.highlighter}></div>
        </div>
        <p className={styles.descriptionTxt}>{`• ${item.description}`}</p>
      </div>
    )
  } 

  return (
    <Layout>
      <h2>Experiences</h2>
      <article style={{display: 'flex', flexDirection: 'row'}}>
        <div style={{flex: 1}}>
          {
            record.filter((data, index) => index%2 === 0)
                  .map((data, index) => renderEachWing(data, index))
          }
        </div>
        <div style={{width: 2, borderRadius: 2, backgroundColor: 'rgb(0, 0, 0, 0.5)', margin: '0 2rem' }}>
        </div>
        <div style={{flex: 1 }}>
          {
            record.filter((data, index) => index%2 === 1)
            .map((data, index) => renderEachWing(data, index))
          }
        </div>
      </article>
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

  
  const record = result.results.map((row) => {
    return {
        name: row.properties.name.title[0].plain_text,
        skills: row.properties.skills.multi_select?.map(skill => {return skill.name}).join(", ") ?? null,
        location: row.properties.location.rich_text[0].plain_text,
        status: row.properties.status.select.name,
        startDate: row.properties.period.date.start,
        endDate: row.properties.period.date.end,
        description: row.properties.description.rich_text[0].plain_text,
      }
    }
  ).sort(sortByOrder);

  return {
    props: {
      record
    }
  }
}

function sortByOrder(prev, curr) {
  return new Date(prev.startDate) - new Date(curr.startDate);
}