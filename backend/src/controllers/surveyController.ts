import { Request, Response } from "express";
import Survey from "../schemas/Survey";
import Result from "../schemas/Result";
import { mapVotes, gatherVotes } from "./utils";

interface AnswerInterface {
  choice: string;
  checked: boolean;
  id: string;
  survey_id: Number;
  title_id: Number;
  question_title: String;
  anwsers_id: Number;
  anwsers_choice: String;
}

interface QuestionsInterface {
  question_title: string;
  answers: AnswerInterface[];
}

interface SurveyInterface {
  quantity: number;
  questions_and_answers: QuestionsInterface[];
  title_form: string;
  forEach?: any;
  filter?: any;
}

interface Guard {
  _id: number;
  survey_id: Number;
  title_id: Number;
  question_title: String;
  anwsers_id: Number;
  anwsers_choice: String;
}

interface Form {
  quantity: string;
  _id: string;
  title_form: string;
  questions_and_answers: Question[];
  map: any;
}

interface Question {
  question_title: string;
  id: string;
  filter: any;
  forEach: any;
  map: any;

  answers: {
    forEach: any;
    filter: any;
    length: any;
    id: string;
    map: any;
    choice: string;
    checked: boolean;
  };
}

interface IntrinsicElements {
  choice: Answer;
  checked: Answer;
}

export interface Answer {
  id: string;
  choice: string;
  checked: boolean;
  vote: number;
  map: any;
}

class surveyController {
  async store(req: Request, res: Response): Promise<Response> {
    const { main } = req.body;

    try {
      const survey = await Survey.create(main);

      return res.json(survey);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
  async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;

    try {
      const survey_id = id;
      const survey: Form = await Survey.findById(id);

      const result = await Result.find({ survey_id });
      const resultedFinal: any = [];

      //formata array dos votos
      result.forEach((element) => {
        resultedFinal.push({
          title_id: element.title_id,
          question_title: element.question_title,
          anwsers_choice: element.anwsers_choice,
          anwsers_id: element.anwsers_id,
          vote: gatherVotes(result, element),
        });
      });

      const array_with_vote: any =
        survey &&
        survey.questions_and_answers.map((question: any) => {
          const updateWithVotes = {
            question_title: question.question_title,
            id: question.id,
            answers: mapVotes(resultedFinal, question.answers),
          };
          return updateWithVotes;
        });

      survey.questions_and_answers = [];
      survey.questions_and_answers = array_with_vote;

      return res.json(survey);
    } catch (err) {
      return res.status(400).json("error: ocorreu um problema na requisição");
    }
  }
  async show(req: Request, res: Response): Promise<Response> {
    try {
      const form = await Survey.find();

      return res.json(form);
    } catch (err) {
      return res.status(400).json({ error: "User does not exists" });
    }
  }
  public async destroy(req: Request, res: Response): Promise<Response> {
    try {
      const survey = await Survey.find().remove();
      return res.json(survey);
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  }
}

export default surveyController;
