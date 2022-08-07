import React from 'react';
import withContext from 'components/context/withContext';
import { StyledInput, StyledButtonClear, StyledFiltersWrapper } from './styled';

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
