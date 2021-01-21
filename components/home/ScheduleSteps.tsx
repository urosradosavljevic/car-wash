import { FC } from 'react';
import { observer } from 'mobx-react-lite';

import { PROGRESS_STEP } from '../../shared/constants/progress'

import { Checkout } from '../../view/screens/checkout/Checkout';
import { DateSelect } from '../../view/screens/date-select/DateSelect';
import { Login } from '../../view/screens/login/Login'
import { Timeline } from '../../view/screens/timeline/Timeline';
import { TimelineMobile } from '../../view/screens/timeline/TimelineMobile';
import { TreatmentSelect } from '../../view/screens/treatment/Treatments';
import { ScheduleStep } from './ScheduleStepNav';
import { useUIStore } from '../../shared/providers/RootStoreProvider';

interface Props {
  currentStep: PROGRESS_STEP;
}

export const ScheduleSteps: FC<Props> = observer(({ currentStep }) => {
  const uiStore = useUIStore();

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
        {uiStore.isMobile ? <TimelineMobile /> : <Timeline />}
      </ScheduleStep>
      <ScheduleStep
        backButton={true}
        label={PROGRESS_STEP.CHECKOUT}
      >
        <Checkout />
      </ScheduleStep>
    </>);
})