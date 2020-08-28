import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { AppProps } from 'next/app'
import DatePicker from "react-datepicker"
import { useState } from 'react'

interface IndexProps {

}

const Home: React.FC<AppProps> = () => {

  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Car Wash Service
        </h1>
        <div className={styles.datepickerWrap}>
          <DatePicker
            disabledKeyboardNavigation
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            monthsShown={2}
            // calendarClassName={styles.calendar}
            inline
          // renderCustomHeader={}
          />

        </div>
      </main>

      <footer className={styles.footer}>
        <img src="/car.svg" alt="Car Logo" className={styles.logo} />
      </footer>
    </div>
  )
}


export default Home;