import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

*, *::before, *::after{
  box-sizing: border-box;
}

html{
  font-size: 62.5%;

}


body{
  font-size: 1.6rem;
  padding: 0;
  margin: 0;
  font-family: 'Nunito', sans-serif;
  background-color: #0f1c21;
  /* background-color: pink; */

  
 th, td {
   text-align: center;
 }}
`;

export default GlobalStyle;
