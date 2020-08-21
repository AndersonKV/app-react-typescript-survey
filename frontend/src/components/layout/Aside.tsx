import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

import styled from "styled-components";

const SidNav = styled.aside`
  position: fixed;
  background-color: white;
  width: 300px;
  height: 100%;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);

  ul li {
    padding: 20px;
    cursor: pointer;
  }

  .li-list:hover {
    background-color: whitesmoke;
  }
  .ul-hiden {
    background-color: white;

    li a {
      color: white;
    }
  }

  .open {
    background-color: #45b649;
  }
  .closed {
    background-color: #c31432;
  }

  ul li a {
    display: grid;
    grid-auto-columns: 1fr;
  }
`;

const TinyText = styled.span`
  font-size: 12px;
  margin-top: 2px;
  color: red;
  font-weight: bold;
`;

interface AnswerInterface {
  choice: string;
  checked: boolean;
}

interface QuestionsInterface {
  choice: string;
  answers: AnswerInterface[];
}

interface FormInterface {
  quantity: number;
  id: string;
  _id: string;
  questions_and_answers: QuestionsInterface[];
  title_form: string;
  map: any;
  isExpired: boolean;
  days_to_expire: {
    [0]: {
      data: string;
      expire: string;
    };
  };
}

interface StateProps {}

interface DispatchProps {}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

const Aside: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);
  const [forms, setForms] = useState<FormInterface[]>();
  const [expired, setExpired] = useState<any[]>();
  const [notExpired, setNotExpired] = useState<any[]>();

  const showOpen = async () => {
    setOpen(!open);
  };
  const showClose = async () => {
    setClose(!close);
  };

  useEffect(() => {
    async function loadForms() {
      const response = await api.get("/show");
      const { data } = response;

      const date = new Date();

      const day = date.getDate().toString(); // 1-31
      const month = date.getMonth() + 1; // 0-11 (zero=janeiro)
      const year = date.getFullYear(); // 0000

      const currentData = `${day}-${month}-${year}`;

      const updateForm = data.map((element: FormInterface) => {
        const [day, month, year] = currentData.split("-").map(Number);
        const [
          dayExp,
          monthExp,
          yearExp,
        ] = element.days_to_expire[0].expire.split("-").map(Number);

        const newCurrentData = `${month}/${day}/${year}`;
        const expiredData = `${monthExp}/${dayExp}/${yearExp}`;

        const startTime = new Date(newCurrentData);
        const endTime = new Date(expiredData);

        const expired = startTime > endTime ? true : false;

        const [q, w, e] = element.days_to_expire[0].data.split("-").map(Number);
        const [a, s, d] = element.days_to_expire[0].expire
          .split("-")
          .map(Number);

        const preUpdate = {
          _id: element._id,
          quantity: element.quantity,
          questions_and_answers: element.questions_and_answers,
          title_form: element.title_form,
          isExpired: expired,
          days_to_expire: {
            0: {
              data: `${q}/${w}/${e}`,
              expire: `${a}/${s}/${d}`,
            },
          },
        };
        return preUpdate;
      });

      const hasExpired: any = [];
      const notExpired: any = [];

      updateForm.forEach((element: FormInterface, key: string) => {
        element.isExpired === true
          ? hasExpired.push({ key })
          : notExpired.push({ key });
      });
      setForms(updateForm);
      setExpired(hasExpired);
      setNotExpired(notExpired);
    }
    loadForms();
  }, []);

  return (
    <>
      <SidNav>
        <ul>
          <li className="li-list" onClick={showOpen}>
            <a>Pesquisas em aberto {notExpired?.length}</a>
          </li>
          {open == true ? (
            <ul className="ul-hiden open">
              {forms &&
                forms.map((formulary: FormInterface, n) => {
                  return formulary.isExpired === false ? (
                    <li key={n}>
                      <Link to={"/quiz/" + formulary._id}>
                        <span>{formulary.title_form}</span>
                        <TinyText>
                          {formulary.days_to_expire[0].expire}
                        </TinyText>
                      </Link>
                    </li>
                  ) : null;
                })}
            </ul>
          ) : null}

          <li className="li-list" onClick={showClose}>
            <a>Pesquisa fechada {expired?.length}</a>
          </li>
          {close == true ? (
            <ul className="ul-hiden closed">
              {forms &&
                forms.map((formulary: FormInterface, n) => {
                  return formulary.isExpired === true ? (
                    <li key={n}>
                      <Link to={formulary._id}>{formulary.title_form}</Link>
                    </li>
                  ) : null;
                })}
            </ul>
          ) : null}
        </ul>
      </SidNav>
    </>
  );
};

export default Aside;
