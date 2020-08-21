import { Schema, model, Document } from "mongoose";

interface AnswerInterface {
  choice: string;
  checked: boolean;
}

interface QuestionsInterface {
  question_title: string;
  answers: AnswerInterface[];
}

interface DayToExpire {
  data: string;
  expire: string;
}

interface SurveyInterface extends Document {
  quantity: number;
  questions_and_answers: QuestionsInterface[];
  title_form: string;
  forEach?: any;
  days_to_expire: DayToExpire[];
}

const SurveySchema: Schema = new Schema({
  quantity: { type: Number },
  questions_and_answers: { type: Array },
  title_form: { type: String },
  days_to_expire: { type: Array },
});

export default model<SurveyInterface | any>("survey_survey", SurveySchema);
