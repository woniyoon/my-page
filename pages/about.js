import Layout from "@/components/Layout";
import { TOKEN, DATABASE_ID } from "@/config";

export default function About({myInfo}) {
  return (
    <Layout>
      <h2>About page</h2>
      {
        myInfo.map(info => {
          return (
            <div key={`my-info-${info.order}`}>
              <p>{info.label}</p>
              <p>{info.value}</p>
            </div>
          )
        })
      }
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
  
  const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, options)
    
  const result = await res.json();
  
  const myInfo = result.results.map((row) => {
      return {
        label: row.properties.label.title[0].plain_text,
        value: row.properties.value.rich_text[0].plain_text,
        order: row.properties.order.number,
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