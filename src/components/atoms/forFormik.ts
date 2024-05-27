import styled from 'styled-components';
import { StyledButton } from '@notes/components';



export const ChangedStyledButton = styled(StyledButton)`
  align-self: flex-end;
  margin-top: 2rem;
  color: ${({ theme }) => theme.colors.dark};
  ${({ theme }) => theme.media.landscape} {
    margin-top: 1rem;
  }
`;
