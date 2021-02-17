import styles from '../shared/styles/pages/Home.module.scss'

import { Layout } from '../view/layout/Layout';
import { useProgressContext } from '../shared/context/ProgressContext';
import { ScheduleProgress } from '../components/schedule-progress/ScheduleProgress';
import { ScheduleSteps } from '../components/home/ScheduleSteps';
import { PROGRESS_STEP } from '../shared/types/progress';
import { NextAvailableChart } from '../components/charts/NextAvailableChart';
import { WeekChart } from '../components/charts/WeekChart';
import clsx from 'clsx';
import { useUIStore } from '../shared/providers/RootStoreProvider';

const Home: React.FC = () => {

  const { current } = useProgressContext();
  const uiStore = useUIStore();

  return (
    <Layout title="Schedule appointement">
      <main className={clsx(styles.container, current === PROGRESS_STEP.LOGIN && styles.login)}>
        <ScheduleProgress currentStep={current} />
        <div className={styles.main}>
          <ScheduleSteps
            currentStep={current}
          />
        </div >
        {current === PROGRESS_STEP.LOGIN &&
          <section className={clsx(styles.charts, uiStore.isMobile && styles.mobile)}>
            <NextAvailableChart />
            <WeekChart />
          </section>}
      </main >
      <div />
    </Layout >
  )
}

export default Home;