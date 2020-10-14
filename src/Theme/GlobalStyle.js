import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Grandstander:wght@100;300;500;800&display=swap');

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
  font-family: 'Grandstander', sans-serif;
  background-color: #0f1c21;
  
 th, td {
   text-align: center;
 }}
`;

export default GlobalStyle;
