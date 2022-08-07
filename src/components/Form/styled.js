import styled from 'styled-components';

export const StyledLabel = styled.label`
  color: white;
  display: block;
`;
export const StyledForm = styled.form`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledDate = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
`;
