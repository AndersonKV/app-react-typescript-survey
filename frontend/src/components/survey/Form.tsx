import React, { useState, useEffect, SelectHTMLAttributes } from "react";

import { api } from "../../services/api";
import { countTo, checkValidity, submitMapAnswers } from "../../utils";

import styled from "styled-components";

const GridQuestions = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 5px;

  .error {
    border: 1px solid red;
  }
  select {
    padding: 10px;
  }
  label {
    font-size: 14px;
    color: black;
    text-align: center;
  }
  input {
    margin-bottom: 20px;
    width: 100%;
    display: block;
    margin-top: 8px;
    padding: 10px;
    font-size: 16px;
    color: #7159c1;
    border-radius: 2px;
    border: 1px solid #ccddef;
    outline-color: green;
  }

  &:nth-child(1) {
    animation: move 500ms;
  }

  &:nth-child(2) {
    animation: move 400ms;
    animation-delay: 100ms;
    animation-fill-mode: backwards;
  }
  &:nth-child(3) {
    animation: move 500ms;
    animation-delay: 100ms;
    animation-fill-mode: backwards;
  }
`;

const Button = styled.button`
  display: block;
  min-width: 120px;
  border: 1px solid #ccddef;
  background-color: whitesmoke;
  color: black;
  border-radius: 25px;
  margin: auto;
  padding: 7px;

  animation: move 500ms;
  animation-delay: 250ms;
  animation-fill-mode: backwards;
  cursor: pointer;
  outline: none;
`;

const DivFormulary = styled.div`
  margin: 50px;

  button {
    display: block;
    min-width: 120px;
    border: 1px solid #ccddef;
    background-color: #1abc9c;
    color: black;
    border-radius: 25px;
    margin: auto;
    padding: 7px;
    color: white;

    animation: move 500ms;
    animation-delay: 250ms;
    animation-fill-mode: backwards;
    cursor: pointer;
    outline: none;
  }
`;

interface SelectProps {
  post: any;
  title: string;
  daysToExpire: any;
}

const Formulary: React.FC<SelectProps> = ({
  post,
  title,
  daysToExpire,
}: SelectProps) => {
  const [main, setMain] = useState<any[]>([]);
  const [input0, setInput0] = useState<any>("");
  const [input1, setInput1] = useState<any>("");
  const [input2, setInput2] = useState<any>("");
  const [input3, setInput3] = useState<any>("");
  const [input4, setInput4] = useState<any>("");
  const [input5, setInput5] = useState<any>("");
  const [checked, isChecked] = useState(false);
  const [label0, setLabel0] = useState(false);
  const [label1, setLabel1] = useState(false);
  const [label2, setLabel2] = useState(false);
  const [label3, setLabel3] = useState(false);
  const [label4, setLabel4] = useState(false);
  const [label5, setLabel5] = useState(false);

  const handleNextQuestion = (e: any) => {
    e.preventDefault();

    if (input0.length <= 3) {
      setLabel0(true);
    } else {
      setLabel0(false);
    }
    if (input1.length <= 3) {
      setLabel1(true);
    } else {
      setLabel1(false);
    }
    if (input2.length <= 3) {
      setLabel2(true);
    } else {
      setLabel2(false);
    }
    if (input3.length <= 3) {
      setLabel3(true);
    } else {
      setLabel3(false);
    }
    if (input4.length <= 3) {
      setLabel4(true);
    } else {
      setLabel4(false);
    }
    if (input5.length <= 3) {
      setLabel5(true);
    } else {
      setLabel5(false);
    }

    const checked = checkValidity(
      input0,
      input1,
      input2,
      input3,
      input4,
      input5
    );

    if (checked === true) {
      if (post?.quantity.length != 0) {
        const allQuestions = [input1, input2, input3, input4, input5];

        const questions_and_answers: any = {
          id: post?.quantity[0],
          question_title: input0,
          answers: submitMapAnswers(allQuestions),
        };

        let peoples = new Array();
        peoples.push(questions_and_answers);

        if (JSON.parse(localStorage.getItem("peoples") as any) != null) {
          const get = JSON.parse(localStorage.getItem("peoples") as any);
          get.push(questions_and_answers);
          localStorage.setItem("peoples", JSON.stringify(get));
        } else {
          localStorage.setItem("peoples", JSON.stringify(peoples));
        }

        let remove = post?.quantity;
        remove.shift();

        setInput0("");
        setInput1("");
        setInput2("");
        setInput3("");
        setInput4("");
        setInput5("");

        if (post?.quantity?.length == 0) {
          const inputs = JSON.parse(localStorage.getItem("peoples") as any);

          const data: any = {
            quantity: post?.question_quantity,
            title_form: title,
            questions_and_answers: inputs,
            days_to_expire: daysToExpire,
          };
          setMain(data);

          isChecked(true);
        }
      }
    }
  };

  async function submitForm(e: any) {
    e.preventDefault();

    try {
      await api.post("/create", { main }).then((response) => {
        if (response.status === 200) {
          alert("formulario enviado com sucesso");

          window.location.href = "/";
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  const SubmitFormulary = () => (
    <DivFormulary>
      <button onClick={submitForm}>Enviar</button>
    </DivFormulary>
  );

  return (
    <>
      <GridQuestions>
        {checked != true ? (
          <div>
            <div>
              <h3>Titulo da pergunta</h3>
              <input
                type="text"
                value={input0}
                className={label0 === true ? "error" : "pass"}
                onChange={(event) => setInput0(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="fname">Primeira pergunta</label>
              <input
                type="text"
                className={label1 === true ? "error" : "pass"}
                value={input1}
                onChange={(event) => setInput1(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="fname">Segunda pergunta</label>
              <input
                type="text"
                className={label2 === true ? "error" : "pass"}
                value={input2}
                onChange={(event) => setInput2(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="fname">Terceira pergunta</label>

              <input
                type="text"
                className={label3 === true ? "error" : "pass"}
                value={input3}
                onChange={(event) => setInput3(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="fname">Quarta pergunta</label>

              <input
                type="text"
                className={label4 === true ? "error" : "pass"}
                value={input4}
                onChange={(event) => setInput4(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="fname">Quinta pergunta</label>

              <input
                type="text"
                className={label5 === true ? "error" : "pass"}
                value={input5}
                onChange={(event) => setInput5(event.target.value)}
              />
            </div>
            <Button onClick={handleNextQuestion}>Proximo</Button>
          </div>
        ) : (
          <SubmitFormulary />
        )}
      </GridQuestions>
    </>
  );
};

export default Formulary;
