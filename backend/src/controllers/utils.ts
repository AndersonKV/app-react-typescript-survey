import { Answer } from "./surveyController";

export const mapVotes = function (results: any, answers: Answer) {
  const updateFinal = answers.map((answer: Answer) => {
    const update = {
      id: answer.id,
      choice: answer.choice,
      checked: answer.checked,
      vote: inserVotes(results, answer),
    };
    return update;
  });
  return updateFinal;
};

const inserVotes = (array: any, value: any) => {
  const coisa = array.filter((v: any) => {
    if (v.anwsers_choice == value.choice) {
      return v.vote;
    }
  });
  return coisa.length;
};

export const gatherVotes = (array: any, value: any) => {
  return array.filter((i: any) => i.anwsers_id == value.anwsers_id).length;
};
