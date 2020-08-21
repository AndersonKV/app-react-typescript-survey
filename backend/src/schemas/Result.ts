import { Schema, model, Document } from "mongoose";

interface ResultInterface extends Document {
  title_id: { type: String };
  question_title: { type: String };
  anwsers_id: { type: String };
  anwsers_choice: { type: String };
  survey_id: { type: String };
  function: any;
}

const ResultSchema: Schema = new Schema({
  title_id: { type: String },
  question_title: { type: String },
  anwsers_id: { type: String },
  anwsers_choice: { type: String },
  survey_id: { type: String },
});

export default model<ResultInterface | any>("survey_result", ResultSchema);
