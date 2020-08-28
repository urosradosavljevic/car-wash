import Head from 'next/head'
import { observer } from 'mobx-react'
import styles from '../styles/Home.module.scss'
import { AppProps } from 'next/app'
import DatePicker from "react-datepicker"
import { useState, useContext } from 'react'
import { OrderStoreContext } from '../stores/OrderStore'
import { useRouter } from 'next/dist/client/router'

interface IndexProps {

}

const Home: React.FC<AppProps> = observer(() => {

  const counterStore = useContext(OrderStoreContext)
  const router = useRouter()

  const setDate = (date: Date) => {
    counterStore.date = date;
    router.push("/timeline")
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>
          Car Wash Service
        </h2>
        <h3 className={styles.subtitle}>
          Select Date
        </h3>
        <div className={styles.datepickerWrap}>
          <DatePicker
            disabledKeyboardNavigation
            selected={counterStore.date}
            onChange={(date: Date) => setDate(date)}
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
})


export default Home;