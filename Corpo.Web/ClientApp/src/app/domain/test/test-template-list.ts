import { TestExercise } from "./test-exercise";
import { StatusTest } from "./test-member";

export class TestTemplateList {
  id: number;
  level: number;
  testExercises: TestExercise[];
  assignment: boolean;
  status: StatusTest;
}
