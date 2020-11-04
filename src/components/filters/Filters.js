import React from 'react';
import styled from 'styled-components';
import { StyledButton } from 'components/Todo/TodoItem';
import withContext from 'components/context/withContext';

const StyledInput = styled.input`
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

const StyledButtonClear = styled(StyledButton)`
  width: 20%;
  margin-bottom: 0.5rem;
`;

const StyledFiltersWrapper = styled.div`
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

const Filters = ({
  onTitleFilter,
  onDeadlineFilter,
  onContentFilter,
  titleText,
  contentText,
  deadlineText,
  onClear,
  pageContext,
}) => {
  return (
    <StyledFiltersWrapper>
      <StyledInput
        placeholder="🔎 by title"
        value={titleText}
        onChange={onTitleFilter}
      ></StyledInput>
      {pageContext === 'todos' && (
        <StyledInput
          placeholder="🔎 by deadline"
          value={deadlineText}
          onChange={onDeadlineFilter}
        ></StyledInput>
      )}
      {pageContext === 'notes' && (
        <StyledInput
          placeholder="🔎 by content"
          value={contentText}
          onChange={onContentFilter}
        ></StyledInput>
      )}
      <StyledButtonClear onClick={onClear}>Clear</StyledButtonClear>
    </StyledFiltersWrapper>
  );
};

export default withContext(Filters);
