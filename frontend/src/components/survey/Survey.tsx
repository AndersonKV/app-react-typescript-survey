import React, { useState, useEffect, SelectHTMLAttributes } from "react";

import { api } from "../../services/api";
import {
  countTo,
  checkValidity,
  submitMapAnswers,
  formattedDate,
  getDaysInMonth,
} from "../../utils";

import styled from "styled-components";
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Formulary from "./Form";

const Form = styled.form`
  background-color: white;
  padding: 30px 25px;
  border-radius: 5px;
  overflow: hidden;
  animation: fade 0.2s;
  max-width: 450px;
  margin: 0 auto;
  margin-top: 30px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);

  padding-bottom: 30px;
  .back {
    border-radius: 25px;
    text-decoration: none;
    padding: 10px;
    border: 1px solid #ccddef;
    background-color: whitesmoke;
    color: black;
  }

  @keyframes move {
    from {
      opacity: 0;
      transform: translateX(-35%);
    }
    to {
      opacity: 1;
      transform: translateX(0%);
    }
  }
  @keyframes fade {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 5px;
  .error {
    border: 1px solid red !important;
  }
  select {
    padding: 10px;
    margin-top: 20px;
  }
  label {
    font-size: 14px;
    color: darkslateblue;
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
    outline-color: blue;
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

const GridQuestions = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 5px;

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
  margin-top: 20px;
  margin-bottom: 20px;

  animation: move 500ms;
  animation-delay: 250ms;
  animation-fill-mode: backwards;
  cursor: pointer;
  outline: none;
`;

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  map: any;
  options: Array<{
    value: string;
    label: string;
  }>;
  passQuestions: any;
  post(e: any): any;
}

interface Questions {
  quantity: any;
  question_quantity: string;
}

interface DayToExpire {
  data: string;
  expire: string;
}

const Survey: React.FC<SelectProps> = () => {
  const [amount, setAmount] = useState<SelectProps>();
  const [questions, setQuestions] = useState<Questions>();
  const [title, setTitle] = useState<any>("");
  const [daysToExpire, setDaysToExpire] = useState<DayToExpire | any>();
  const [checked, isChecked] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [select1Error, setSelect1Error] = useState(false);
  const [select2Error, setSelect2Error] = useState(false);

  useEffect(() => {
    async function load() {
      setAmount(countTo(10));
    } /*end*/

    load();
  }, [questions]);

  function handleSubmit(event: any) {
    event.preventDefault();

    if (title.length >= 3) {
      setTitleError(false);
      if (questions?.quantity.length != null) {
        setSelect1Error(false);
        if (daysToExpire?.data.length != null) {
          localStorage.clear();
          isChecked(true);
        } else {
          setSelect2Error(true);
        }
      } else {
        setSelect1Error(true);
      }
    } else {
      setTitleError(true);
    }
  }

  const handleChange = (e: any) => {
    if (e.target.value !== "666") {
      setQuestions({
        quantity: countTo(e.target.value),
        question_quantity: e.target.value,
      });
    }
  };

  const handleChangeDays = (e: any) => {
    const date = new Date();

    const day = date.getDate().toString(); // 1-31
    const month = date.getMonth() + 1; // 0-11 (zero=janeiro)
    const year = date.getFullYear(); // 2 dígitos

    const dataExceedsMonth = parseInt(day) + parseInt(e.target.value);
    const currentData = `${day}-${month}-${year}`;

    if (e.target.value !== "666") {
      if (dataExceedsMonth > getDaysInMonth(month, year)) {
        const newMonth = month + 1;
        const newDays = dataExceedsMonth - getDaysInMonth(newMonth, year);
        const newCurrentData = `${newDays}-${newMonth}-${year}`;
        setDaysToExpire({ data: currentData, expire: newCurrentData });
      } else {
        setDaysToExpire({
          data: currentData,
          expire: `${dataExceedsMonth}-${month}-${year}`,
        });
      }
    }
  };

  return (
    <>
      <Navbar />
      <Form>
        {checked === false ? (
          <Grid>
            <label htmlFor="fname">Titulo do questionario</label>
            <input
              type="text"
              className={titleError === true ? "error" : "pass"}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <select
              onChange={(e) => handleChange(e)}
              className={select1Error === true ? "error" : "pass"}
            >
              <option value={666}>Selecione quantos questionarios</option>
              {amount?.map((option: SelectProps) => {
                return (
                  <option key={option.toString()} value={option.toString()}>
                    {option}
                  </option>
                );
              })}
            </select>
            <select
              onChange={(e) => handleChangeDays(e)}
              className={select2Error === true ? "error" : "pass"}
            >
              <option value={666}>Quando vai expirar</option>
              {amount?.map((option: SelectProps) => {
                return (
                  <option key={option.toString()} value={option.toString()}>
                    {option}
                  </option>
                );
              })}
            </select>
            <Button type="submit" onClick={handleSubmit}>
              Enviar
            </Button>
          </Grid>
        ) : null}

        {checked == true ? (
          <Formulary
            post={questions}
            title={title}
            daysToExpire={daysToExpire}
          />
        ) : null}

        <Link to="/" className="back">
          Voltar
        </Link>
      </Form>
    </>
  );
};

export default Survey;
