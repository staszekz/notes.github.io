import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { StyledButton } from 'components/Todo/TodoItem';
import { editTask } from 'reducers/todosReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faSave, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import { StyledTd } from 'components/Todo/TodoItem';

export const StyledInput = styled.input`
  background-color: lightgray;
  border: none;
  border-radius: 20px;
  width: 100%;
  padding: 0.5rem 0.5rem;
  float: left;
  text-align: center;

  ::placeholder {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 1.2rem;
  }
  /* ${({ deadline }) =>
    deadline &&
    css`
      width: inherit;
    `} */
`;

class TodoInput extends React.Component {
  state = {
    content: this.props.title,
    deadline: this.props.deadline,
    completed: this.props.completed,
  };

  handleOnSave = () => {
    this.props.onSave(this.state, this.props.id);
  };

  onEnterSave = e => {
    if (e.key === 'Enter') {
      this.handleOnSave();
    }
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCompletedCheck = () => {
    this.props.onCompleteCheck(
      this.props.id,
      this.state.content,
      this.state.deadline,
      this.state.completed,
    );
  };

  render() {
    const { index, id } = this.props;
    const { content, deadline, completed } = this.state;
    return (
      <>
        <tr key={id}>
          <td className="align-middle">{index + 1}</td>
          <td className="align-middle">
            <StyledInput
              name="content"
              value={content}
              onChange={this.handleInputChange}
              onKeyDown={this.onEnterSave}
            />
          </td>

          <td className="align-middle">
            <StyledInput
              name="deadline"
              deadline
              value={deadline}
              onChange={this.handleInputChange}
              onKeyDown={this.onEnterSave}
            />
          </td>
          <StyledTd className="align-middle">
            <StyledButton onClick={this.handleOnSave}>
              <FontAwesomeIcon icon={faSave} />
            </StyledButton>

            <StyledButton onClick={this.handleOnDelete}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </StyledButton>

            <StyledButton onClick={this.handleCompletedCheck}>
              {completed ? (
                <FontAwesomeIcon icon={faCheck} color="green" />
              ) : (
                <FontAwesomeIcon icon={faTimes} color="red" />
              )}
            </StyledButton>
          </StyledTd>
        </tr>
      </>
    );
  }
}

const mapDispatchToProps = {
  editTask,
};

export default connect(null, mapDispatchToProps)(TodoInput);
