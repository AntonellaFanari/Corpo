import { TestExercise } from "./test-exercise";

export class TestTemplateList {
  id: number;
  name: string;
  testExercises: TestExercise[];
  assignment: boolean;
}
