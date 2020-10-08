import React, { Component } from 'react';
import styled from 'styled-components';
import { StyledInput } from 'components/Todo/TodoInput'
import { StyledButton } from 'components/Button/Button'
import { DATABASE_URL } from 'utils/database';


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
    fetch(`${DATABASE_URL}/todos/.json`, {
      method: 'POST',
      body: JSON.stringify(this.state),
    })
      .then(() => {
        this.props.onAdd();
      })
      .then(() => {
        this.setState({
          content: '',
          deadline: '',
        });
      });
  };

  handleOnInputClick = e => {
    e.preventDefault();
    if (!this.state.content) {
      return alert('wprowadź zadanie');
    }
    this.putDataInDatabase();

  };

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <StyledForm>
        <StyledLabel htmlFor="newTask">Dodaj zadanie:</StyledLabel>
        <StyledModalInput
          name="content"
          placeholder="wprowadź nowe zadanie"
          value={this.state.content}
          onChange={this.handleOnChange}
        ></StyledModalInput>
        <StyledModalInput deadline
          name="deadline"
          placeholder="wprowadź deadline"
          value={this.state.deadline}
          onChange={this.handleOnChange}
        ></StyledModalInput>
        <StyledButtonWrapper>

          <StyledButton modal type="submit" onClick={this.handleOnInputClick}>
            Dodaj zadanie
        </StyledButton>
          <StyledButton onClick={this.onQuit}>quit</StyledButton>
        </StyledButtonWrapper>
      </StyledForm>
    );
  }
}

export default AddTask;
