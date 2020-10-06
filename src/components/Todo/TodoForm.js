import React from 'react';
import styled from 'styled-components';
import Input from '../../atoms/Input/Input';
import { StyledButtonLink } from 'components/Button/Button';

const StyledWrapper = styled.div`
  border-left: 10px solid ${({ theme, activecolor }) => theme[activecolor]};
  z-index: 9999;
  position: fixed;
  display: flex;
  padding: 100px 90px;
  flex-direction: column;
  right: 0;
  top: 0;
  height: 100vh;
  width: 680px;
  background-color: white;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transform: translate(${({ isVisible }) => (isVisible ? '0' : '100%')});
  transition: transform 0.25s ease-in-out;
`;

const StyledTextArea = styled(input)`
  margin: 30px 0 100px;
  border-radius: 20px;
  height: 30vh;
`;

const StyledInput = styled(input)`
  margin-top: 30px;
`;

const TodoForm = () => (
  <StyledWrapper isVisible={isVisible} activecolor={pageContext}>
    <h1>Create new {pageContext}</h1>
    <StyledInput placeholder="title" />
    {pageContext === 'twitters' && <StyledInput placeholder="link" />}

    {pageContext === 'articles' && <StyledInput placeholder="link" />}
    <StyledTextArea as="textarea" placeholder="title" />
    <StyledButtonLink>Add Note</StyledButtonLink>
  </StyledWrapper>
);

export default TodoForm;
