import { ResultTestVideoExercise } from "./result-test-video-exercice";
import { TestHeartRateExercise } from "./test-heart-rate-exercise";
import { TestRepetitionExercise } from "./test-repetition-exercise";

export class TestResult {
  id: number;
  level: number;
  testType: TestType;
  video: string;
  minutes: number;
  seconds: number
  testHeartRateExercise?: TestHeartRateExercise;
  testRepetitionExercise?: TestRepetitionExercise;
  testVideoExercise?: ResultTestVideoExercise;


}
export enum TestType {
  HeartRate = 1,
  Repetition = 2,
  video = 3
}
