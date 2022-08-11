import { TestExercise } from "./test-exercise";

export class TestTemplateList {
  id: number;
  level: number;
  testExercises: TestExercise[];
  assignment: boolean;
}
