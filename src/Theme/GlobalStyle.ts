import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

*, *::before, *::after{
  box-sizing: border-box;
}




body{
  padding: 0;
  margin: 0;
  font-family: 'Nunito', sans-serif;
  background-color: #0f1c21;
  
 th, td {
   text-align: center;
 }}
`;

