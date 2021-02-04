import { FC } from 'react';
import { observer } from 'mobx-react-lite';

import { PROGRESS_STEP } from '../../shared/types/progress'

import Checkout from '../../view/screens/checkout';
import DateSelect from '../../view/screens/date-select';
import Login from '../../view/screens/login'
import Timeline from '../../view/screens/timeline';
import TreatmentSelect from '../../view/screens/treatment';
import { ScheduleStep } from './ScheduleStepNav';

interface Props {
  currentStep: PROGRESS_STEP;
}

export const ScheduleSteps: FC<Props> = observer(({ currentStep }) => {

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
        <Timeline />
      </ScheduleStep>

      <ScheduleStep
        backButton={true}
        label={PROGRESS_STEP.CHECKOUT}
      >
        <Checkout />
      </ScheduleStep>
    </>);
})