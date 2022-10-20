import Layout from "@/components/Layout";
import { TOKEN, DATABASE_ABOUT_ID } from "@/config";
import styles from '@/styles/About.module.scss'

export default function About({myInfo}) {
  return (
    <Layout>
      <div className={styles.main}>
        {
          myInfo.map(info => {
            return (
              <div className={styles.cardContainer} key={`my-info-${info.order}`}>
                <p className={styles.cardLabel}>{info.label}</p>
                {
                  info.needsSplit ?
                  <div>
                    {
                      info.value.split(",").map((val, index) => 
                      <p 
                        className={styles.cardValue}
                        key={`val-${index}`}
                      >{val}</p>)
                    }
                  </div>
                  :
                  <p className={styles.cardValue}>{info.value}</p>
                }
              </div>
            )
          })
        }
      </div>
    </Layout>
  );
}

// 빌드 타임에 호출
export async function getStaticProps(context) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Notion-Version': '2022-06-28',
      authorization: `Bearer ${TOKEN}`
    }
  };
  
  const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ABOUT_ID}/query`, options)
    
  const result = await res.json();
  
  const myInfo = result.results.map((row) => {
      return {
        label: row.properties.label.title[0].plain_text,
        value: row.properties.value.rich_text[0].plain_text,
        order: row.properties.order.number,
        needsSplit: row.properties.needsSplit.rich_text[0].plain_text === 'y'
      }
    }
  ).sort(sortByOrder);
  
  return {
    props: {myInfo}
  }
}

function sortByOrder(prev, curr) {
  return prev.order - curr.order;
}