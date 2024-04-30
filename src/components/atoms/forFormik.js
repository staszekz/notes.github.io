import styled from 'styled-components';
import { StyledButton } from '@notes/components';

export const StyledForm = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: 25%;
  color: white;
  ${({ theme }) => theme.media.phone} {
    width: 90%;
  }
  ${({ theme }) => theme.media.landscape} {
    width: 70%;
  }
`;

export const ChangedStyledButton = styled(StyledButton)`
  align-self: flex-end;
  margin-top: 2rem;
  color: ${({ theme }) => theme.colors.dark};
  ${({ theme }) => theme.media.landscape} {
    margin-top: 1rem;
  }
`;
