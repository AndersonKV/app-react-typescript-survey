import React, { HtmlHTMLAttributes } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const Nav = styled.nav`
  width: 100%;
  height: 72px;
  background-color: #4286f4;

  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  ul {
    padding: 0 60px;
    height: 56px;
    display: grid;
    max-width: 800px;
    grid-template-columns: 4fr 1fr;
    list-style-type: none;
    margin: 0 auto;

    li:nth-child(1) {
      width: 100px;
      height: 34px;
      margin-top: 15px;
      padding-top: 6px;
      text-align: center;
      cursor: pointer;
      border-radius: 5px;
      border: 0.8px solid silver;
      background-color: white;
    }

    li:nth-child(2) {
      width: 140px;
      height: 34px;
      margin-top: 15px;
      padding-top: 6px;
      text-align: center;
      cursor: pointer;
      border-radius: 5px;
      border: 0.8px solid silver;
      background-color: white;
    }
  }
`;

const Navbar: React.FC = (props) => {
  return (
    <>
      <Nav>
        <ul>
          <li>
            <Link to="/" className="fas fa-home"></Link>
          </li>

          <li>
            <Link to="/survey">Nova pesquisa</Link>
          </li>
        </ul>
      </Nav>
    </>
  );
};

export default Navbar;
