import { useState, useEffect } from 'react';
import Head from 'next/head'
import { inject, observer } from 'mobx-react'
// import { } from "mobx-react-lite";

import OrderStore from '../stores/OrderStore'
import styles from '../styles/Home.module.scss'
import { Treatment } from '../components/Treatment';
import { Timeline } from '../components/Timeline';
import { DateSelect } from '../components/DateSelect';

interface IndexProps {
  orderStore?: OrderStore;
}

const Home: React.FC<IndexProps> = inject("orderStore")(observer(({ orderStore }) => {

  const appointementStore = orderStore!

  const [step, setStep] = useState(0)

  const submit = () => {
  }

  useEffect(() => {
    console.log(appointementStore)
  }, [appointementStore.date])

  const renderStep = () => {
    switch (step) {
      case 0:
        // return <div>o</div>
        return <DateSelect />;
      case 1:
        return <Treatment />
      case 2:
        return <Timeline />;
      case 3:
        return <input />;

      default:
        return <Timeline />;
    }
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
        {renderStep()}
        <br />
        selected: {appointementStore.date?.toString()}
        <br />
        {step > 0 && <button onClick={() => setStep(step - 1)} >return</button>}
        {step < 3 && <button onClick={() => setStep(step + 1)} >continue</button>}
        {step == 3 && <button onClick={() => submit()} >submit</button>}
      </main >
      <footer className={styles.footer}>
        <img src="/car.svg" alt="Car Logo" className={styles.logo} />
        <button onClick={() => appointementStore.changeDate(new Date())}>change date</button>
        <span>{appointementStore?.date?.toString()}</span>
      </footer>
    </div >
  )
})
)

export default Home;