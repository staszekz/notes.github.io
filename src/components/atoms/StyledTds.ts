import styled, { css } from 'styled-components';

export const StyledTdWithHover = styled.td`
  width: 50%;
  :hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  ${({ deadline }) =>
    deadline &&
    css`
      width: 10vw;
    `}
  ${({ created }) =>
    created &&
    css`
      width: 15vw;
    `}
`;

export const StyledTd = styled.td`
  width: fit-content;
`;
