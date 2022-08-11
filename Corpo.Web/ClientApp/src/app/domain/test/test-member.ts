import { TestExerciseMember } from "./test-exercise-member";

export class TestMember {
  id: number;
  level: number;
  memberId: number;
  status: StatusTest;
  testTemplateId: number;
  testExercisesMember: TestExerciseMember[];
}

export enum StatusTest {
  executed = 1,
  pending = 2
}
