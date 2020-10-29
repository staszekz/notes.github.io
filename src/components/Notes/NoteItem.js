import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import { StyledTdWithHover } from 'components/Todo/TodoItem';
import { StyledButton } from 'components/Todo/TodoItem';
import NoteDetails from 'components/Notes/NoteDetails';

const NoteItem = ({ title, date, index, id, content }) => {
  const [detailsVisible, setDetailsVisible] = useState('false');

  const handleOnEdit = () => {
    setDetailsVisible(!detailsVisible);
  };
  const handleOnDelete = () => {
    console.log('deleted');
  };
  return (
    <>
      <tr key={id}>
        <td className="align-middle">{index + 1}</td>
        <StyledTdWithHover className="align-middle">{title}</StyledTdWithHover>
        <StyledTdWithHover deadline className="align-middle">
          {date}
        </StyledTdWithHover>
        <td className="align-middle">
          <StyledButton onClick={handleOnEdit}>
            <FontAwesomeIcon icon={faEdit} />
          </StyledButton>
          <StyledButton onClick={handleOnDelete}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </StyledButton>
        </td>
        <NoteDetails isVisible={detailsVisible} content={content} />
      </tr>
    </>
  );
};

export default NoteItem;
