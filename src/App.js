import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import posed from 'react-pose';
import Layout from 'Layout/Layout';
import NavBar from 'components/NavBar/NavBar.js';
import GlobalStyles from 'Theme/GlobalStyle';

const data = [
  { title: 'hello Staszek' },
  { title: 'hello Asia', ad: 'lorem ipsum dolor' },
  { title: 'hello ktos' },
  { title: 'hello Białystok', ad: 'lorem dalej dalej dalej' },
];

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const PosedH2 = posed.h2({
  visible: {
    x: 0,
    opacity: 1,
  },
  hidden: {
    x: '-150%',
    opacity: 0,
  },
});

const StyledH2 = styled(PosedH2)`
  font-size: 2em;
  font-family: Montserrat;
  text-align: center;
  color: white;
  grid-column-start: ${({ order }) => (order % 2 === 0 ? '2' : '1')};
`;

const StyledAd = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: aqua;
  border-radius: 10px;
  height: 80%;
  width: 80%80%;
`;

const App = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(state => !state);

  return (
    <>
      <GlobalStyles />
      <Layout>
        <NavBar />
      </Layout>
    </>
  );
};

export default App;
