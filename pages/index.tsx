import OrderStore from '../shared/stores/OrderStore'
import UIStore from '../shared/stores/UIStore';
import styles from '../shared/styles/pages/Home.module.scss'

import { Layout } from '../view/layout/Layout';
import { useProgressContext } from '../shared/context/ProgressContext';
import { ScheduleProgress } from '../components/schedule-progress/ScheduleProgress';
import { ScheduleSteps } from '../components/home/ScheduleSteps';

interface IndexProps {
  orderStore?: OrderStore;
  uiStore?: UIStore;
}

const Home: React.FC<IndexProps> = () => {

  const { current } = useProgressContext();

  return (
    <Layout title="Schedule appointement">
      <main className={styles.container}>
        <ScheduleProgress currentStep={current} />
        <div className={styles.main}>
          <ScheduleSteps
            currentStep={current}
          />
        </div >
        <div />
      </main >
    </Layout >
  )
}

export default Home;