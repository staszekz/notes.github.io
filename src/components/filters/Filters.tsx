import React, { useContext } from 'react';
import { StyledInput, StyledButtonClear, StyledFiltersWrapper } from './styled';
import { usePageTypeContext } from '@notes/hooks';
import { PageType } from '@notes/types';

export const Filters = ({
  onTitleFilter,
  onDeadlineFilter,
  onContentFilter,
  titleText,
  contentText,
  deadlineText,
  onClear,
}) => {
  const pageContext = usePageTypeContext();

  return (
    <StyledFiltersWrapper>
      <StyledInput placeholder="🔎 by title" value={titleText} onChange={onTitleFilter} />
      {pageContext === PageType.TODOS && (
        <StyledInput
          placeholder="🔎 by deadline"
          value={deadlineText}
          onChange={onDeadlineFilter}
        />
      )}
      {pageContext === PageType.NOTES && (
        <StyledInput placeholder="🔎 by content" value={contentText} onChange={onContentFilter} />
      )}
      <StyledButtonClear onClick={onClear}>Clear</StyledButtonClear>
    </StyledFiltersWrapper>
  );
};
