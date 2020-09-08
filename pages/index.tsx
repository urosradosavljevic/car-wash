import { useReducer } from 'react';
import { inject, observer } from 'mobx-react'

import OrderStore from '../stores/OrderStore'
import styles from '../styles/pages/Home.module.scss'
import { TreatmentSelect } from '../components/TreatmentSelect';
import { Timeline } from '../components/Timeline';
import { DateSelect } from '../components/DateSelect';
import { Checkout } from '../components/Checkout';
import Layout from '../components/Layout';
import { ScheduleProgress } from '../components/ScheduleProgress';
import { Login } from '../components/Login';
import UIStore from '../stores/UIStore';
import { TimelineMobile } from '../components/TimelineMobile';
import { StepTypes, StepsState } from '../constants/types/Steps';


type StepsAction = { type: StepTypes | "reset" } | { type: "current"; payload: StepTypes; }

function reducer(state: StepsState, action: StepsAction) {
  if (action.type === "reset") return initialStepMap
  if (action.type === "current") return { ...state, currentStep: action.payload }
  return { ...state, [action.type]: true };
}

const initialStepMap: StepsState = {
  login: false,
  date: false,
  treatment: false,
  timeline: false,
  checkout: false,
  currentStep: "login"
}
const memberInitialSteps: StepsState = {
  login: true,
  date: false,
  treatment: false,
  timeline: false,
  checkout: false,
  currentStep: "date"
}

interface IndexProps {
  orderStore?: OrderStore;
  uiStore?: UIStore;
}

const Home: React.FC<IndexProps> = inject("uiStore")(observer(({ uiStore }) => {
  const ui = uiStore!
  // check cookies for user
  const initialState = false ? memberInitialSteps : initialStepMap

  const [steps, dispatchStep] = useReducer(reducer, initialState);

  const nextStep = (type: StepTypes, next: StepTypes) => {
    dispatchStep({ type });
    dispatchStep({ type: "current", payload: next });
  }

  const submitTreatment = () => {
    let success = true;

    if (success) {
      dispatchStep({ type: "reset" })
      alert("Don't be late");
    }
  }

  const navButton = (type: StepTypes, next: StepTypes, back: boolean = false) => (
    <button
      className={styles.step__nav_btn}
      onClick={() => nextStep(type, next)}
    >
      {!back ? "Continue" : "Go Back"}
    </button>
  );

  const renderStep = () => {

    switch (steps.currentStep) {
      case "date":
        return (<>
          <DateSelect />
          <div className={styles.step__nav}>
            {navButton("date", "treatment")}
          </div>
        </>);
      case "treatment":
        return (<>
          <TreatmentSelect />
          <div className={styles.step__nav}>
            {navButton("treatment", "date", true)}
            {navButton("treatment", "timeline")}
          </div>
        </>);
      case "timeline":
        return <>
          {ui.isMobile ? <TimelineMobile /> : <Timeline />}
          {/* <TimelineMobile /> */}
          <div className={styles.step__nav}>
            {navButton("timeline", "treatment", true)}
            {navButton("timeline", "checkout")}</div>
        </>;
      case "checkout":
        return <>
          <Checkout />
          <div className={styles.step__nav}>
            {navButton("timeline", "treatment", true)}
            <button
              className={styles.step__nav_btn}
              onClick={() => submitTreatment()}
            >Continue</button>
          </div>
        </>;
      default:
        return <Login steps={steps} nextStep={() => nextStep("login", "date")} />;
    }
  }

  return (
    <Layout title="Schedule appointement">
      <div className={styles.container}>
        <ScheduleProgress steps={steps} currentStep={steps.currentStep} />
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