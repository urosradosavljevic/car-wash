export type StepTypes =
  | "login"
  | "date"
  | "treatment"
  | "timeline"
  | "checkout";

export interface StepsState {
  login: boolean;
  date: boolean;
  treatment: boolean;
  timeline: boolean;
  checkout: boolean;
  currentStep: StepTypes;
}
