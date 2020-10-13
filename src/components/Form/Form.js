import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { StyledInput } from 'components/Todo/TodoInput';
import { StyledButton } from 'components/Button/Button';
import escIcon from 'assets/icons/esc.svg';
import { addNewTask } from 'reducers/todosReducer';
import { toggleModalOpen } from 'reducers/modalReducer';

const StyledLabel = styled.label`
  color: white;
  display: block;
`;

const StyledModalInput = styled(StyledInput)`
  width: 70%;
  margin: 1rem auto;
`;

const StyledForm = styled.form`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 90%;
  margin-top: auto;
`;

class AddTask extends Component {
  state = {
    content: '',
    deadline: '',
    completed: false,
  };

  putDataInDatabase = () => {
    this.props.addNewTask(this.state);
    this.props.toggleModalOpen();
    this.setState({
      content: '',
      deadline: '',
    });
  };

  handleOnAddClick = e => {
    e.preventDefault();
    if (!this.state.content) {
      return alert('Please add new task or quit!');
    }
    this.putDataInDatabase();
  };

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onQuit = () => {
    this.props.toggleModalOpen();
  };

  render() {
    return (
      <StyledForm>
        <StyledLabel htmlFor="newTask">Add new task:</StyledLabel>
        <StyledModalInput
          name="content"
          placeholder="new task"
          value={this.state.content}
          onChange={this.handleOnChange}
        ></StyledModalInput>
        <StyledModalInput
          deadline
          name="deadline"
          placeholder="new deadline"
          value={this.state.deadline}
          onChange={this.handleOnChange}
        ></StyledModalInput>
        <StyledButtonWrapper>
          <StyledButton modal type="submit" onClick={this.handleOnAddClick}>
            <img src={escIcon} />
          </StyledButton>
          <StyledButton onClick={this.onQuit}>
            <img src={escIcon} />
          </StyledButton>
        </StyledButtonWrapper>
      </StyledForm>
    );
  }
}

const mapDispatchToProps = {
  addNewTask,
  toggleModalOpen,
};
export default connect(null, mapDispatchToProps)(AddTask);
