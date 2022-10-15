import Layout from "@/components/Layout";
import { TOKEN, DATABASE_EXP_ID } from "@/config";
import RecordCard from "@/components/RecordCard";
import styles from '@/styles/Experiences.module.css'

export default function Experiences({record}) {
  const renderEachWing = item => {
    return (
      <RecordCard item={item} />
    )
  } 

  return (
    <Layout>
      <h2>Experiences</h2>
      <article className={styles.mainContainer}>
        <div style={{flex: 1}}>
          {
            record.filter(data => data.order%2 === 1)
                  .map(data => renderEachWing(data))
          }
        </div>
        <div style={{flex: 1}}>
          {
            record.filter(data => data.order%2 === 0)
            .map(data => renderEachWing(data))
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
        order: row.properties.order.number,
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