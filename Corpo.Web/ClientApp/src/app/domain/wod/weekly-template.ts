import { WodTemplate } from "../wod";
import { WeeklyWodTemplate } from "./weekly-wod-template";

export class WeeklyTemplate {
  id: number;
  name: string;
  goal: string;
  weeklyWodTemplates: WeeklyWodTemplate[] = [];
 
}

export class WeeklyTemplateResponse {
  id: number;
  name: string;
  goal: string;
  wodTemplates: WodTemplate[] = [];
}
