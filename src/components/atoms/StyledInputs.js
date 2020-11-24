import styled, { css } from 'styled-components';

export const StyledInput = styled.input`
  background-color: lightgray;
  border: none;
  border-radius: 20px;
  width: 100%;
  padding: 0.5rem 0.5rem;
  float: left;
  text-align: center;

  ::placeholder {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 1.2rem;
  }
`;

export const StyledModalInput = styled(StyledInput)`
  width: 70%;
  margin: 1rem auto;
  ${({ theme }) => theme.media.phone} {
    width: 100%;
  }
  ${({ notes }) =>
    notes &&
    css`
      width: 90%;
    `}
`;

export const StyledTextarea = styled.textarea`
  background-color: lightgray;
  border: none;
  border-radius: 20px;
  width: 70%;
  height: 50%;
  margin: 1rem auto;
  float: left;
  text-align: center;

  ::placeholder {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 1.2rem;
  }
  ${({ theme }) => theme.media.phone} {
    width: 100%;
  }
  ${({ notes }) =>
    notes &&
    css`
      width: 90%;
      height: 70%;
    `}
`;

export const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 90%;
  margin-top: auto;
`;
