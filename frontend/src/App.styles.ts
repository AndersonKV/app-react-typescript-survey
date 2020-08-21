import styled, { createGlobalStyle } from "styled-components";
import BGImage from "./images/nattu-adnan-unsplash.jpg";

export const GlobalStyle = createGlobalStyle`
* {
    padding: 0;
    margin: 0;
    font-family: 'Catamaran', sans-serif;
    box-sizing: border-box;
  }
  html {
    height: 100%;  
   }
  body {
    background: #373B44;  /* fallback for old browsers */
    /* background: linear-gradient(to bottom, #4286f4, #373B44); */
    height: 100%;  
  }

 a {
  text-decoration: none;
  }
    
`;
