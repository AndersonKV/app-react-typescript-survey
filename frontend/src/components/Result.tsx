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
  margin-top: 10px;

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
    color: white;
    margin-top: 10px;
  }
`;

const Div = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);

  padding: 10px;

  div:nth-child(odd) {
  }
  h3 {
    text-align: center;
    padding: 10px;
  }
`;

const DivDad = styled.div`
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  display: grid;
  grid-template-columns: 1fr 0.1fr;
  background: #b92b27; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #1565c0,
    #b92b27
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #1565c0,
    #b92b27
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  padding: 10px;
  span {
    padding: 10px;
    color: white;
  }

  input {
    width: 20px;
    height: 20px;
    margin: 0 auto;
    margin-top: 10px;
    cursor: pointer;
  }

  progress {
    width: 100%;
    padding: 20px;
  }
`;
const Section = styled.section`
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
  quantity: string;
  _id: string;
  title_form: string;
  questions_and_answers: Question;
}

interface Question {
  question_title: string;
  id: string;
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

interface StateProps {
  //repositories: Forms[];
}

interface DispatchProps {
  //loadRequest(): void;
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

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

const Result: React.FC<Props> = (props) => {
  const [form, setForm] = useState<Form>();

  useEffect(() => {
    async function loadForms() {
      const id: string = window.location.pathname.replace("/result/", "");
      console.log("response");

      try {
        await api.post("/form", { id }).then((response) => {
          const { data } = response;
          if (checkIsDateExpired(data) === false) {
            setForm(data);
          } else {
            props.history.push("/");
          }
        });
      } catch (err) {
        console.log(err);
        // props.history.push("/");
        //history.push("/");
      }
    } /*end*/

    loadForms();
  }, []);

  const TitleInput = ({ post }: IntrinsicElements) => (
    <div>
      <span>{post.choice}</span>
    </div>
  );

  const InputCheckBox = ({ post }: IntrinsicElements) => (
    <span>{post.vote} votos</span>
  );
  return (
    <>
      <Navbar />
      <div>
        <Form>
          <h2>{form?.title_form}</h2>
          {form?.questions_and_answers?.map((question: Question) => (
            <div>
              <SecondTitle>{question.question_title}</SecondTitle>
              {question?.answers.map((answer: Answer) => (
                <Section>
                  <DivDad>
                    <TitleInput post={answer} />
                    <InputCheckBox post={answer} />
                  </DivDad>
                </Section>
              ))}
            </div>
          ))}
        </Form>
      </div>
    </>
  );
};

export default Result;
