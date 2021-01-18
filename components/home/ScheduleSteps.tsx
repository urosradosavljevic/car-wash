import React from 'react'
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

import { PROGRESS_STEP } from '../../shared/constants/progress'
import UIStore from '../../shared/stores/UIStore';

import { Checkout } from '../../view/screens/checkout/Checkout';
import { DateSelect } from '../../view/screens/date-select/DateSelect';
import { Login } from '../../view/screens/login/Login'
import { Timeline } from '../../view/screens/timeline/Timeline';
import { TimelineMobile } from '../../view/screens/timeline/TimelineMobile';
import { TreatmentSelect } from '../../view/screens/treatment/TreatmentSelect';
import { ScheduleStep } from './ScheduleStepNav';

interface Props {
  currentStep: PROGRESS_STEP;
  uiStore?: UIStore;
}

export const ScheduleSteps: React.FC<Props> = inject("uiStore")(observer(({ currentStep, uiStore }) => {
  const ui = uiStore!;

  return (
    <>
      {currentStep === PROGRESS_STEP.LOGIN && <Login />}
      <ScheduleStep
        backButton={true}
        label={PROGRESS_STEP.DATE}
      >
        <DateSelect />
      </ScheduleStep>
      <ScheduleStep
        backButton={true}
        label={PROGRESS_STEP.TREATMENT}
      >
        <TreatmentSelect />
      </ScheduleStep>
      <ScheduleStep
        backButton={true}
        label={PROGRESS_STEP.TIMELINE}
      >
        {ui.isMobile ? <TimelineMobile /> : <Timeline />}
      </ScheduleStep>
      <ScheduleStep
        backButton={true}
        label={PROGRESS_STEP.CHECKOUT}
      >
        <Checkout />
      </ScheduleStep>
    </>);
}))