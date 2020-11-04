import styled from 'styled-components';

export const StyledH1 = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.font.bold};
  text-align: center;
  padding: 1rem;

  ${({ theme }) => theme.media.phone} {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
`;

export const StyledH2 = styled.h2`
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.font.bold};
  text-align: center;
  padding: 3rem;
  margin-bottom: 4rem;
  position: relative;
  top: 13vh;
  /* background-color: red; */
`;
