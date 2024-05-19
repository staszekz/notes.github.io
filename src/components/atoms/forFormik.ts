import styled from 'styled-components';
import { StyledButton } from '@notes/components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

`;

export const ChangedStyledButton = styled(StyledButton)`
  align-self: flex-end;
  margin-top: 2rem;
  color: ${({ theme }) => theme.colors.dark};
  ${({ theme }) => theme.media.landscape} {
    margin-top: 1rem;
  }
`;
