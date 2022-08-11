import { StatusTest } from "./test-member";

export class TestExerciseMember {
  id: number;
  name: string;
  protocol: string;
  testType: TestType;
  video: string;
  minutes: number;
  seconds: number;
  status: StatusTest;
  exerciseFmsId: number
}


export enum TestType {
  HeartRate = 1,
  Repetition = 2,
  video = 3
}
