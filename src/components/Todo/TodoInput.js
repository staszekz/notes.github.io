import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import saveIcon from 'assets/icons/save.svg';
import deleteIcon from 'assets/icons/trash.svg';

import { StyledButton } from 'components/Todo/TodoItem';
import { DATABASE_URL } from 'utils/database';

const StyledInput = styled.input`
  background-color: lightgray;
  border: none;
  border-radius: 20px;
  width: 30vw;
  /* margin-top: 1rem;
  margin-bottom: 1rem; */
  padding: 8px 16px;

  ::placeholder {
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  ${({ deadline }) =>
    deadline &&
    css`
      width: 8vw;
    `}
`;

class TodoInput extends React.Component {
  state = {
    content: this.props.content,
    deadline: this.props.deadline,
    completed: this.props.completed,
  };

  handleOnSave = id => {
    fetch(`${DATABASE_URL}/todos/${id}.json`, {
      method: 'PUT',
      body: JSON.stringify(this.state),
    }).then(() => {
      this.props.onSave(id);
    });
  };

  handleOnDelete = () => {
    console.log(`deleted`);
  };
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
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
            <StyledButton onClick={() => this.handleOnSave(id)}>
              <img src={saveIcon} alt="save icon" />
            </StyledButton>
          </td>
          <td className="align-middle">
            <StyledButton onClick={this.handleOnDelete}>
              <img src={deleteIcon} />
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
          <td className="align-middle">{completed ? '✔️' : '❌'}</td>
        </tr>
      </>
    );
  }
}

export default TodoInput;
