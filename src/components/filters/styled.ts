import styled from 'styled-components';
import { StyledButton } from '@notes/components';

export const StyledInput = styled.input`
  width: 40%;
  height: 40px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  color: white;
  background-color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  ${({ theme }) => theme.media.tablet} {
    ::placeholder {
      font-size: 1.5rem;
    }
  }
`;

export const StyledButtonClear = styled(StyledButton)`
  width: 20%;
  margin-bottom: 0.5rem;
`;

export const StyledFiltersWrapper = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.media.tablet} {
    width: 100%;
  }
  ${({ theme }) => theme.media.landscape} {
    width: 100%;
  }
`;
