import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import ReactTooltip from 'react-tooltip';
import { StyledTdWithHover, StyledTd } from '@notes/components';

export const StyledButton = styled.button`
  color: black;
  background: white;
  height: 40px;
  width: 40px;
  border-radius: 10px;
  ${({ theme }) => theme.media.phone} {
    height: 30px;
    width: 30px;
  }
`;

export const TodoItem = ({
  title,
  id,
  deadline,
  completed,
  index,
  onEdit,
  onDelete,
  onCompleteCheck,
}) => {
  const handleOnEdit = () => {
    onEdit(id);
  };

  const handleOnDelete = () => {
    onDelete(id);
  };

  const handleCompletedCheck = () => {
    onCompleteCheck(id, title, deadline, completed);
  };

  return (
    <tr key={id}>
      <td className="align-middle">{index + 1}</td>
      <StyledTdWithHover className="align-middle">{title}</StyledTdWithHover>
      <StyledTdWithHover deadline className="align-middle">
        {deadline}
      </StyledTdWithHover>
      <StyledTd className="align-middle">
        <StyledButton onClick={handleOnEdit} data-tip data-for="edit">
          <FontAwesomeIcon icon={faEdit} />
        </StyledButton>
        <StyledButton onClick={handleOnDelete} data-tip data-for="delete">
          <FontAwesomeIcon icon={faTrashAlt} />
        </StyledButton>
        <StyledButton onClick={handleCompletedCheck} data-tip data-for="complete">
          {completed ? (
            <FontAwesomeIcon icon={faCheck} color="green" />
          ) : (
            <FontAwesomeIcon icon={faTimes} color="red" />
          )}
        </StyledButton>
        <>
          <ReactTooltip id="edit" place="top" effect="solid">
            Edit task
          </ReactTooltip>
          <ReactTooltip id="delete" place="top" effect="solid">
            Delete Task
          </ReactTooltip>
          <ReactTooltip id="complete" place="top" effect="solid">
            {completed ? 'Is task completed? YES' : 'Is task completed? NO'}
          </ReactTooltip>
        </>
      </StyledTd>
    </tr>
  );
};
