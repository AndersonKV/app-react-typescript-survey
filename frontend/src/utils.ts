import { Answer } from "./components/Quiz";

interface MyArray {
  choice: string;
  checked: boolean;
  map: any;
  id: string;
}

export const mapAnswers = function (
  answers: Answer,
  div_id: string,
  question_id: string,
  input: HTMLInputElement
) {
  const updateForm = answers.map((answer: Answer, n2: string) => {
    checkedValidator(div_id, question_id, input, answer);

    const preUdate = {
      id: answer.id,
      choice: answer.choice,
      checked: answer.checked,
    };

    return preUdate;
  });
  return updateForm;
};

function checkedValidator(
  div_id: string,
  question_id: string,
  input: HTMLInputElement,
  answer: MyArray
) {
  if (div_id.toString() === question_id.toString()) {
    answer.checked = false;

    if (input.name.toString() === answer.choice.toString()) {
      answer.checked = input.checked;
    }
  }
}

export const ClassActiveOrNot = (param: any) =>
  param.checked === true ? "active" : "not-active";

export const countTo = (i: any) => {
  const count: any = [];
  for (let s = 1; s <= i; s++) {
    count.push(s);
  }
  return count;
};

export const checkValidity = (
  input0: string,
  input1: string,
  input2: string,
  input3: string,
  input4: string,
  input5: string
) => {
  let check = false;
  if (input0.length <= 3) {
    return (check = false);
  }
  if (input1.length <= 3) {
    return (check = false);
  }
  if (input2.length <= 3) {
    return (check = false);
  }
  if (input3.length <= 3) {
    return (check = false);
  }
  if (input4.length <= 3) {
    return (check = false);
  }
  if (input5.length <= 3) {
    return (check = false);
  }

  return (check = true);
};

export const submitMapAnswers = (array: any) => {
  const finalArray: any = [];
  for (let s = 0; s < array.length; s++) {
    finalArray.push({ choice: array[s], checked: false, id: s });
  }
  return finalArray;
};

export const formattedDate = () => {
  const date = new Date();
  const day = date.getDate().toString(); // 1-31
  const month = date.getMonth() + 1; // 0-11 (zero=janeiro)
  const year = date.getFullYear(); // 2 dígitos
  return `${day}-${month}-${year}`;
};

export const getDaysInMonth = function (month: any, year: any) {
  return new Date(year, month, 0).getDate();
};

export const checkIsDateExpired = (array: any) => {
  const date = new Date();

  const dayExact = date.getDate().toString(); // 1-31
  const monthExact = date.getMonth() + 1; // 0-11 (zero=janeiro)
  const yearExact = date.getFullYear(); // 0000

  const currentData = `${dayExact}-${monthExact}-${yearExact}`;

  const [day, month, year] = currentData.split("-").map(Number);
  const [dayExp, monthExp, yearExp] = array.days_to_expire[0].expire
    .split("-")
    .map(Number);

  const newCurrentData = `${month}/${day}/${year}`;
  const expiredData = `${monthExp}/${dayExp}/${yearExp}`;

  const startTime = new Date(newCurrentData);
  const endTime = new Date(expiredData);

  const expired = startTime > endTime ? true : false;
  return expired;
};
