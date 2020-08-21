import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { api } from "../services/api";

import { mapAnswers, ClassActiveOrNot, checkIsDateExpired } from "../utils";

//components
import Navbar from "./layout/Navbar";

const Title = styled.h2`
  margin-top: 10px;

  text-align: center;
  color: white;

  button {
    display: block;
    min-width: 120px;
    border: 1px solid #ccddef;
    background: white;
    border-radius: 25px;
    margin: auto;
    padding: 7px;
    margin-top: 10px;

    a {
      color: black;
    }
  }
`;

const SecondTitle = styled.h2`
  text-align: center;
  color: white;
  margin-bottom: 10px;
`;

const ButtonNextQuestion = styled.button`
  display: block;
  min-width: 120px;
  border: 1px solid #ccddef;
  background: #396afc;
  color: white;
  border-radius: 25px;
  margin: auto;
  padding: 7px;
  margin-top: 20px;
  margin-bottom: 20px;

  animation: move 500ms;
  animation-delay: 250ms;
  animation-fill-mode: backwards;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #1cb5e0;
  }
`;

const Form = styled.form`
  max-width: 992px;
  display: grid;
  grid-template-columns: 1fr;
  border-radius: 5px;
  overflow: hidden;
  animation: fade 0.2s;
  margin: 0 auto;
  margin-top: 30px;

  h2 {
    text-align: center;
  }
`;

const Section = styled.section`
  border-left: 1px solid #ccddef;

  div {
    display: grid;
    grid-template-columns: 1fr 0.2fr;
    padding: 5px;

    span {
      padding: 10px;
    }

    input {
      width: 20px;
      height: 20px;
      margin: 0 auto;
      margin-top: 10px;
      cursor: pointer;
    }
  }
  .active {
    background-color: #1cb5e0;
    color: whitesmoke;

    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  }
  .not-active {
    color: whitesmoke;
    background: #396afc;
  }
`;

interface Form {
  filter: any;
  map: any;
  quantity: string;
  _id: string;
  title_form: string;
  forEach: any;
  survey: {
    quantity: string;
    _id: string;
    title_form: string;
    question_and_answers: Question;
  };
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

export interface Answer {
  choice: string;
  checked: boolean;
  map: any;
  id: string;
  length: any;
  vote: any;
  posts: {
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
  post: Answer;
}

interface DispatchProps {
  history: any;
}

interface Result {
  id: string;
  question_title: string;
  answers: {
    id: string;
    choice: string;
    checked: boolean;
    vote: number;
    map: any;
  };
}

type Props = DispatchProps;

const Quiz: React.FC<Props> = (props) => {
  const [validation, setValidation] = useState<Boolean>();
  const [form, setForm] = useState<Form>();
  const [quiz, setQuiz] = useState<Form>();
  const [result, setResult] = useState<Result | any>();
  const [count, setCount] = useState<Question | any>();

  useEffect(() => {
    async function loadForms() {
      const id: string = window.location.pathname.replace("/quiz/", "");

      await api.post("/form", { id }).then((response) => {
        const { data } = response;
        const { questions_and_answers } = data;
        //verifica se a data expirou se não mostra form
        if (checkIsDateExpired(data) === false) {
          //passa todo o form
          setForm(data);
          //passa apenas as perguntas
          setResult(questions_and_answers);
          //inicia o render das perguntas
          setValidation(true);
          //inicia a primeira pergunta no indice 0
          setCount(questions_and_answers[0]);
        } else {
          props.history.push("/");
        }
      });
    } /*end*/

    loadForms();
  }, []);

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target as HTMLInputElement | any;

    const updateForm =
      result &&
      result.map((question: any, n1: string) => {
        const preUpdate = {
          id: question.id,
          question_title: question.question_title,
          answers: mapAnswers(question.answers, count.id, question.id, input),
        };

        return preUpdate;
      });
    //atualiza os inputs com o checked como true
    setQuiz(updateForm);
  }

  async function handleSubmit() {
    const _id = form?._id;
    const myArray: any = [];

    result &&
      result.forEach((element: Question, key: string) => {
        element.answers.forEach((anwser: Answer, n2: string) => {
          if (anwser.checked === true) {
            const obj = {
              id: element.id,
              question_title: element.question_title,
              anwsers_id: anwser.id,
              anwsers_choice: anwser.choice,
            };

            myArray.push(obj);
          }
        });
      });

    await api.post("/result", { _id, myArray }).then((response) => {
      console.log(response);

      if (response.status === 200) {
        alert("enviado com sucesso");
        props.history.push("/");
      }
    });
  }

  const TitleInput = ({ post }: IntrinsicElements) => (
    <div>
      <span>{post.choice}</span>
    </div>
  );

  const InputCheckBox = ({ post }: IntrinsicElements) => (
    <input
      id={post.id}
      onChange={handleInput}
      type="checkbox"
      name={post.choice}
      checked={post.checked}
    />
  );

  const NextQuestion = () => (
    <ButtonNextQuestion id={count?.id} onClick={handleClick}>
      Proximo
    </ButtonNextQuestion>
  );

  const handleClick = (event: any) => {
    event.preventDefault();

    result.forEach((element: Result, key: string) => {
      element.answers.map((anwser: Answer) => {
        if (element.id.toString() === event.target.id) {
          if (anwser.checked === true) {
            if (result[key + 1] !== null) {
              setCount(result[key + 1]);
            }
          }
        }
      });
    });

    var item: any = [];

    result &&
      result.forEach((element: Question, key: string) => {
        element.answers.forEach((anwser: Answer, n2: string) => {
          if (anwser.checked === true) {
            item.push(1);
          }
        });
      });

    if (item.length === form?.quantity) {
      setValidation(false);
    }

    var item: any = [];
  };

  const CompletedForm = () => (
    <ButtonNextQuestion onClick={handleSubmit}>Finalizar?</ButtonNextQuestion>
  );

  return (
    <>
      <Navbar />
      {validation === true ? (
        <div>
          <Title>
            {form?.title_form}
            <button>
              <a href={"/result/" + form?._id}>ver resultado</a>
            </button>
          </Title>
          <Form>
            <SecondTitle>{count?.question_title}</SecondTitle>

            {count?.answers.map((answer: Answer, key: string) => (
              <Section key={key}>
                <div id={answer.id} className={ClassActiveOrNot(answer)}>
                  <TitleInput post={answer} />
                  <InputCheckBox post={answer} />
                </div>
              </Section>
            ))}
          </Form>
          <NextQuestion />
        </div>
      ) : null}
      {validation === false ? <CompletedForm /> : null}
    </>
  );
};

export default Quiz;
