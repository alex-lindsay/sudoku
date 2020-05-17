export interface AppState {
  errorMessages: string[];
  errorPositions: number[];
  isAddingPencilMarks: boolean;
  startingPosition: number[];
  guesses: number[];
  pencilMarks: number[][];
  selectedSlot: number;
  clickMode: null;
  numberMode: number;
  isSolving: boolean;
  isSolved: boolean;
  solverHasChangedGuesses: boolean;
  solverIsChecking: {};
  buildingBoard: boolean;
  currentStrategy: number;
  currentStrategyStage: number;
  messages: string[];
}
