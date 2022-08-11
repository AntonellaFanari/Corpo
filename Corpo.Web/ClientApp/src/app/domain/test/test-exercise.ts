import { StatusTest } from "./test-member";

export class TestExercise {
  id: number;
  name: string;
  protocol: string;
  testType: TestType;
  video: string;
  minutes: number;
  seconds: number;
  exerciseFmsId?: number
}

export enum TestType {
  HeartRate = 1,
  Repetition = 2,
  video = 3
}

