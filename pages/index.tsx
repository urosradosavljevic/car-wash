import { useState } from 'react';
import { inject, observer } from 'mobx-react'

import OrderStore from '../stores/OrderStore'
import styles from '../styles/Home.module.scss'
import { TreatmentSelect } from '../components/TreatmentSelect';
import { Timeline } from '../components/Timeline';
import { DateSelect } from '../components/DateSelect';
import { Checkout } from '../components/Checkout';
import Layout from '../components/Layout';
import { ScheduleProgress } from '../components/ScheduleProgress';
import { Login } from '../components/Login';

interface IndexProps {
  orderStore?: OrderStore;
}

const Home: React.FC<IndexProps> = inject("orderStore")(observer(({ orderStore }) => {

  const appointementStore = orderStore!

  const [step, setStep] = useState(0)

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Login />;
      case 1:
        return <DateSelect />;
      case 2:
        return <TreatmentSelect />
      case 3:
        return <Timeline />;
      case 4:
        return <Checkout />;
      default:
        return <Timeline />;
    }
  }

  return (
    <Layout title="Schedule appointement">

      <div className={styles.container}>
        <ScheduleProgress step={step} setStep={setStep} />
        <main className={styles.main}>
          {renderStep()}
          <br />
          <div className={styles.step__navigation_container}>
            {step > 0 && <button onClick={() => setStep(step - 1)} >return</button>}
            {step < 4 && <button onClick={() => setStep(step + 1)} >continue</button>}
            {step == 4 && <button onClick={() => { }} >submit</button>}
          </div>
        </main >
        <div />
      </div >
    </Layout >
  )
})
)

export default Home;