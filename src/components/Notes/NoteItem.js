import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEye } from '@fortawesome/free-regular-svg-icons';
import { StyledTdWithHover } from 'components/Todo/TodoItem';
import { StyledButton } from 'components/Todo/TodoItem';
import ReactTooltip from 'react-tooltip';

const NoteItem = ({ title, index, id, created, showDetails, onDelete }) => {
  const handleToggleShow = () => {
    showDetails(id);
  };
  const handleOnDelete = () => {
    onDelete(id);
  };

  return (
    <tr key={id}>
      <td className="align-middle">{index + 1}</td>
      <StyledTdWithHover className="align-middle">{title}</StyledTdWithHover>
      <StyledTdWithHover created className="align-middle">
        {created}
      </StyledTdWithHover>
      <td className="align-middle">
        <StyledButton onClick={handleToggleShow} data-tip data-for="more">
          <FontAwesomeIcon icon={faEye} />
        </StyledButton>
        <StyledButton onClick={handleOnDelete} data-tip data-for="delete">
          <FontAwesomeIcon icon={faTrashAlt} />
        </StyledButton>
        <ReactTooltip id="more" place="top" effect="solid">
          Show more details
        </ReactTooltip>
        <ReactTooltip id="delete" place="top" effect="solid">
          Delete note
        </ReactTooltip>
      </td>
    </tr>
  );
};

export default NoteItem;
