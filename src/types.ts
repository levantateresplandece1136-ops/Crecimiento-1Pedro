export interface AreaData {
  score: number;
  vision: string;
  current: string;
}

export interface BeliefItem {
  belief: string;
  impact: string;
  reframe: string;
}

export interface AssessmentState {
  areas: Record<string, AreaData>;
  beliefs: BeliefItem[];
}

export interface IdentityState {
  spiritual: string;
  family: string;
  professional: string;
  declaration: string;
}

export interface VisionState {
  what: string;
  forWhat: string;
  why: string;
  vision: string;
  timeframes: {
    short: string;
    mid: string;
    long: string;
  };
}

export interface HabitItem {
  id: number;
  name: string;
  days: number;
  done: boolean[];
  startDate: string;
}

export interface SmartGoal {
  id: number;
  name: string;
  area: string;
  specific: string;
  current: number;
  target: number;
  unit: string;
  achievable: string;
  related: string;
  deadline: string;
  steps: string[];
  stepsDone: boolean[];
}

export interface ActionItem {
  id: number;
  text: string;
  done: boolean;
}

export interface ActionsState {
  today: ActionItem[];
  daily: ActionItem[];
}

export interface ReframedThought {
  negative: string;
  positive: string;
}

export interface AttitudeState {
  thoughts: ReframedThought[];
  reframe: string;
}

export interface VisualEntry {
  id: number;
  date: string;
  text: string;
}

export interface VisualizationState {
  entries: VisualEntry[];
  frequency: string;
  lastDone: string;
}

export interface ApplicationState {
  userName: string;
  currentStep: number; // 0 is welcome/resumen, 1 to 8 are the active steps
  completedSteps: number[];
  assessment: AssessmentState;
  identity: IdentityState;
  vision: VisionState;
  habits: HabitItem[];
  gratitude: Record<string, string[]>; // date string -> 3 strings
  goals: SmartGoal[];
  actions: ActionsState;
  attitude: AttitudeState;
  visualization: VisualizationState;
}

export interface StepConfig {
  id: number;
  virtue: string;
  color: string;      // tailwind class like text-amber-700
  lightColor: string; // tailwind class like bg-amber-50
  bgHex: string;      // RGB or hex color for dynamic inline gradients
  textHex: string;    // matching solid hex
  borderHex: string;  // border hex color
  name: string;
  verse: string;
  intro: string;
  type: 'assessment' | 'identity' | 'vision' | 'habits' | 'goals' | 'actions' | 'attitude' | 'visualization';
}
