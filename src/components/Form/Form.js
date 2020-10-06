import React, { Component } from 'react';
import styled from 'styled-components';

import { DATABASE_URL } from 'utils/database';

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
    }).then(() => {
      this.props.onAdd();
    });
  };

  handleOnInputClick = e => {
    e.preventDefault();
    if (!this.state.content) {
      return alert('wprowadź zadanie');
    }
    this.putDataInDatabase();
    console.log(this.state);

    this.setState({
      content: '',
      deadline: '',
      completed: false,
    });
  };

  handleOnChange = e => {
    // console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <form>
        <label htmlFor="newTask">Dodaj zadanie:</label>
        <input
          name="content"
          // className={style.input}
          // id="newTask"
          placeholder="wprowadź nowe zadanie"
          value={this.state.task}
          onChange={this.handleOnChange}
        ></input>
        <input
          name="deadline"
          // className={style.input}
          // id="newTask"
          placeholder="wprowadź deadline"
          value={this.state.task}
          onChange={this.handleOnChange}
        ></input>
        <button type="submit" onClick={this.handleOnInputClick}>
          Dodaj zadanie
        </button>
      </form>
    );
  }
}

export default AddTask;
