import React, { Component } from 'react';
import './App.css';
import { render } from '@testing-library/react';


class todoList extends Component {
  // Create a reference to grab input field
  textInput = React.createRef()

  // Create State object YAY, my prayers have been answered.
  state = {
    query: '',
    text: '',
    todos: [],
    isClicked: false,
  }

  // Function to set focus on text input Field
  componentDidMount() {
    this.textInput.current.focus();
  }

  // Actions taken when Add Todo button is clicked.
  addTodoHandler = () => {
    // Save below 2 lines of code for another project
    // this.setState({ isClicked: !this.state.isClicked })
    // console.log(this.state.isClicked)
    
    // Move submitted text to todos array
    if(this.state.text.length > 0) {
    this.state.todos.push(this.state.text);
    } else {
      this.state.todos.push('Free time...I guess.')
    }
    // console.log('addTodoHandler() todo Push: ', this.state.todos);

    // Clear input field
    this.setState({ text: ''});

    // Set Focus on Text Input Field
    this.componentDidMount();
  }

  removeTodoHandler = (index)=> {
    // Using Splice - Destructive are requires extra code to return updated Todos[].
    // this.setState({
    //   todos: this.state.todos.splice(index, 1)
    // })
        // Set state to updated todos state 
    // (Otherwise splice returns deleted element in new array that is rendered)
    // this.setState({ todos: this.state.todos })
    // console.log('todos state after splice***', this.state.todos)

    // Using Filter... I think this one is better. Non-destructive and apparently faster?
    this.setState({
      todos: this.state.todos.filter((todo, i) => i !== index)
    })
  }

  inputFieldText = (e) => {
    this.setState({ text: e.target.value })
    // console.log(e.target.value);
  }

  searchFieldText = (e) => {
    this.setState({ query: e.target.value })
    // console.log(e.target.value)
  }

  // searchHandler = () => {
  //   console.log('handler***', this.state.query)
  // }

  render() {
    let filteredTodos = this.state.todos.filter((todo) => {
        return todo.indexOf(this.state.query) !== -1;
      }
    );
    return (
      <div className="todoBox">
        <h1 className="liveTodo">Todo: {this.state.text}</h1>
        <input className="textInput" ref={this.textInput} value={this.state.text} onChange={this.inputFieldText}></input>
        <button id="addButton" onClick={this.addTodoHandler}>Add Todo</button>
        <ul className="unorderedList">
          {filteredTodos.map((todo, index) => 
            <li className="listItem" key={index}>{index + 1}. {todo}<button id="deleteButton" onClick={() => this.removeTodoHandler(index)}>Done!</button></li>
          )}
        </ul>
        <input id="searchBox" className="textInput" placeholder="Search" value={this.state.query} onChange={this.searchFieldText}></input>
      </div>
    )
  }
};

export default todoList;
