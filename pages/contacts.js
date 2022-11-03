import {useState} from "react";
import Layout from "@/components/Layout";
import { TOKEN, DATABASE_CON_ID } from "@/config";
import styles from '@/styles/Contacts.module.scss'
import { MdOutlineEmail } from "react-icons/md";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Contacts({contacts}) {
  const renderIcon = (type) => {
    switch (type) {
      case 'instagram':
        return <FaInstagram size='1.1rem'/>
      case 'linkedin':
        return <FaLinkedin size='1.1rem'/>
      case 'github':
        return <FaGithub size='1.1rem'/>
      case 'email':
        return <MdOutlineEmail size='1.1rem'/>
    }
  }

  return (
    <Layout>
      <div className={styles.cardPiles}></div>
      <div className={styles.nameCardContainer}>
        <div className={styles.leftSide}>
          <span className={styles.name}>Jaewon</span>
          <span className={styles.name}>Yoon</span>
        </div>
        <div className={styles.rightSide}>
          {
            contacts.map((item, index) => 
              <div className={styles.contact} key={`con-${index}`}>
                {renderIcon(item.type)}
                <a 
                  className={styles.contactLink}
                  href={item.link}
                  target='_blank'
                  rel="noreferrer"
                >{item.link}
                </a>
              </div>
            )
          }
        </div>
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
  
  const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_CON_ID}/query`, options)
    
  const result = await res.json();

  const contacts = result.results.map((row, index) => {
    return {
        type: row.properties.type.title[0].plain_text,
        link: row.properties.link.rich_text[0].plain_text,
      }
    }
  );

  return {
    props: {
      contacts
    }
  }
}
