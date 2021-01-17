import { inject, observer } from 'mobx-react'

import OrderStore from '../shared/stores/OrderStore'
import UIStore from '../shared/stores/UIStore';
import styles from '../shared/styles/pages/Home.module.scss'

import { TreatmentSelect } from '../view/screens/treatment/TreatmentSelect';
import { Timeline } from '../view/screens/timeline/Timeline';
import { DateSelect } from '../view/screens/date-select/DateSelect';
import { Checkout } from '../view/screens/checkout/Checkout';
import Layout from '../view/layout/Layout';
import { Login } from '../view/screens/login/Login';
import { TimelineMobile } from '../view/screens/timeline/TimelineMobile';
import { useProgressContext } from '../shared/context/ProgressContext';
import { PROGRESS_STEP } from '../shared/constants/progress';
import { ScheduleProgress } from '../components/schedule-progress/ScheduleProgress';

interface IndexProps {
  orderStore?: OrderStore;
  uiStore?: UIStore;
}

const Home: React.FC<IndexProps> = inject("uiStore")(observer(({ uiStore }) => {

  const { current, nextStep, previousStep } = useProgressContext();
  const ui = uiStore!

  const stepFoward = () => {
    ui.submitProgressBar(current);
    nextStep();
  }

  const submitTreatment = () => {
    let success = true;

    if (success) {
      ui.resetProgressBar();
      alert("Don't be late");
    }
  }

  const NavButton = ({ back = false }) => (
    back ?
      <button
        className={styles.step__nav_btn}
        onClick={previousStep}
      >Go Back</button> :
      <button
        className={styles.step__nav_btn}
        onClick={stepFoward}
      >Continue</button>
  );

  const renderStep = () => {
    switch (current) {
      case PROGRESS_STEP.LOGIN:
        return <Login nextStep={() => stepFoward()} />;
      case PROGRESS_STEP.DATE:
        return (<>
          <DateSelect />
          <div className={styles.step__nav}>
            <NavButton back={true} />
            <NavButton />
          </div>
        </>);
      case PROGRESS_STEP.TREATMENT:
        return (<>
          <TreatmentSelect />
          <div className={styles.step__nav}>
            <NavButton back={true} />
            <NavButton />
          </div>
        </>);
      case PROGRESS_STEP.TIMELINE:
        return <>
          {ui.isMobile ? <TimelineMobile /> : <Timeline />}
          <div className={styles.step__nav}>
            <NavButton back={true} />
            <NavButton />
          </div>
        </>;
      case PROGRESS_STEP.CHECKOUT:
        return <>
          <Checkout />
          <div className={styles.step__nav}>
            <NavButton back={true} />
            <button
              className={styles.step__nav_btn}
              onClick={() => submitTreatment()}
            >Continue</button>
          </div>
        </>;
      default:
        return <div>error</div >;
    }
  }

  return (
    <Layout title="Schedule appointement">
      <div className={styles.container}>
        <ScheduleProgress currentStep={current} />
        <main className={styles.main}>
          {renderStep()}
        </main >
        <div />
      </div >
    </Layout >
  )
})
)

export default Home;