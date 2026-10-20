import type { QuestionItem } from '../../data/questionDatabase';

export interface QuestionState {
  chosenOption: number | null;
  isMarkedForReview: boolean;
  isVisited: boolean;
}

export type MockTestPhase =
  | 'setup'
  | 'instructions'
  | 'testing'
  | 'results'
  | 'review';

export interface TestResultsData {
  total: number;
  attempted: number;
  unattempted: number;
  correct: number;
  incorrect: number;
  score: number;
  maxScore: number;
  percentage: number;
}

export type { QuestionItem };