import { Tag } from "./tag";

export class Exercise {
  id: number;
  name: string;
  categoryExerciseId: number;
  video: string;
  tags: Tag[];
}
