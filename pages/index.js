import Head from 'next/head'
import Layout from '../components/layout.js';
import styles from '../styles/Home.module.scss'

export default function Home() {
  const greetingDescAbove = "I'm a frontend developer";
  const greetingDescBelow = "with neon green accent! :)";

  return (
    <Layout>
      <Head>
        <title>Jae, Frontend Developer</title>
        <meta name="description" content="J1's page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.mainContainer}>
        <div className={styles.triangleContainer}>
          <div className={styles.outerTriangle}>
            <div className={styles.innerTriangle}></div>
            <div className={styles.greetingContainer}>
              <p className={styles.greetingTxt}>Hello,</p>
              <p className={styles.greetingTxt}>Stranger!</p>
              <p className={styles.greetingDescAbove}>{greetingDescAbove}</p>
              <p className={styles.greetingDescBelow}>{greetingDescBelow}</p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
