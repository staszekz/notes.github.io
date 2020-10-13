import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import saveIcon from 'assets/icons/save.svg';
import deleteIcon from 'assets/icons/trash.svg';
import { StyledButton } from 'components/Todo/TodoItem';
import { editTask } from 'reducers/todosReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

export const StyledInput = styled.input`
  background-color: lightgray;
  border: none;
  border-radius: 20px;
  width: 100%;
  padding: 0.5rem 0.5rem;
  float: left;

  ::placeholder {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 1.2rem;
  }
  ${({ deadline }) =>
    deadline &&
    css`
      width: 100%;
      text-align: center;
    `}
`;

class TodoInput extends React.Component {
  state = {
    content: this.props.content,
    deadline: this.props.deadline,
    completed: this.props.completed,
  };

  handleOnSave = () => {
    this.props.onSave(this.state, this.props.id);
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
            <StyledInput name="content" value={content} onChange={this.handleInputChange} />
          </td>

          <td className="align-middle">
            <StyledButton onClick={this.handleOnSave}>
              <img src={saveIcon} alt="save icon" />
            </StyledButton>
          </td>
          <td className="align-middle">
            <StyledButton onClick={this.handleOnDelete}>
              <img src={deleteIcon} alt="delete icon" />
            </StyledButton>
          </td>

          <td className="align-middle">
            <StyledInput
              name="deadline"
              deadline
              value={deadline}
              onChange={this.handleInputChange}
            />
          </td>
          <td className="align-middle">
            <StyledButton onClick={this.handleCompletedCheck}>
              {completed ? (
                <FontAwesomeIcon icon={faCheck} size="1.5x" color="green" />
              ) : (
                <FontAwesomeIcon icon={faTimes} size="1.5x" color="red" />
              )}
            </StyledButton>
          </td>
        </tr>
      </>
    );
  }
}

const mapDispatchToProps = {
  editTask,
};

export default connect(null, mapDispatchToProps)(TodoInput);
