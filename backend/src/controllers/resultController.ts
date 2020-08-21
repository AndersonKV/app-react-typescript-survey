import { Request, Response } from "express";
import Survey from "../schemas/Survey";
import Result from "../schemas/Result";

interface Guard {
  id: number;
  _id: number;
  survey_id: Number;
  title_id: Number;
  question_title: String;
  anwsers_id: Number;
  anwsers_choice: String;
  filter: any;
}

class resultSurveyController {
  async store(req: Request, res: Response): Promise<Response> {
    const { _id, myArray } = req.body;

    try {
      const survey = await Survey.findById(_id);

      const item: any = [];

      myArray.forEach((element: Guard) => {
        const obj = {
          survey_id: _id,
          title_id: element.id,
          question_title: element.question_title,
          anwsers_id: element.anwsers_id,
          anwsers_choice: element.anwsers_choice,
        };
        item.push(obj);
      });

      const spot = await Result.create(item);

      return res.json(spot);
    } catch (err) {
      return res.status(400).json("error: ocorreu um problema na requisição");
    }
  }
  async index(req: Request, res: Response): Promise<Response> {
    const { survey_id } = req.body;

    try {
      const item: any = [];

      const survey = await Result.find({ survey_id });

      survey.forEach((element) => {
        item.push({
          title_id: element.title_id,
          question_title: element.question_title,
          anwsers_choice: element.anwsers_choice,
          anwsers_id: element.anwsers_id,
        });
      });

      const mapVotes = (array: Guard, value: Guard) => {
        return array.filter((i: Guard) => i.anwsers_id === value.anwsers_id)
          .length;
      };

      const newItem: any = [];

      item.forEach((element: Guard) => {
        mapVotes(item, element) !== 0
          ? newItem.push({
              result: element,
              quantity: mapVotes(item, element),
            })
          : 0;
      });

      return res.json(newItem);
    } catch (err) {
      return res.status(400).json("error: ocorreu um problema na requisição");
    }
  }
  async show(req: Request, res: Response): Promise<Response> {
    try {
      const form = await Result.find();
      return res.json(form);
    } catch (err) {
      return res.status(400).json({ error: "User does not exists" });
    }
  }
  public async destroy(req: Request, res: Response): Promise<Response> {
    try {
      const survey = await Result.find().remove();
      return res.json(survey);
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  }
}

export default resultSurveyController;
