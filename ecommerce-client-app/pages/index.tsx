import Head from 'next/head'
import Image from 'next/image'
import Heading from '../components/Heading/Heading'
import Products from '../components/Products/Products'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>شعاري</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
          <Heading title="المنتجات الأكثر طلباً" description='نقدم لكم الافضل دائما'/>
          <Products/>
      </main>

   
    </div>
  )
}