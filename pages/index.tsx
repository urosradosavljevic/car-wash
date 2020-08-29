import Head from 'next/head'
import { inject } from 'mobx-react'
import { observer } from "mobx-react-lite";
import styles from '../styles/Home.module.scss'
import DatePicker from "react-datepicker"
import { useRouter } from 'next/router'
import OrderStore from '../stores/OrderStore'

interface IndexProps {
  orderStore: OrderStore;
}

const Home: React.FC<IndexProps> = inject("orderStore")(observer(({ orderStore }) => {

  const router = useRouter()

  const setOrderDate = (date: Date) => {
    orderStore.date = date
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
            selected={orderStore?.date}
            onChange={(date: Date) => setOrderDate(date)}
            monthsShown={2}
            // calendarClassName={styles.calendar}
            inline
          // renderCustomHeader={}
          />

        </div>
      </main>
      {console.log("index orderStore", orderStore)}
      <footer className={styles.footer}>
        <img src="/car.svg" alt="Car Logo" className={styles.logo} />
        <span>{orderStore?.date?.toString()}</span>
      </footer>
    </div>
  )
})
)

export default Home;