import React from "react";
import TaskService from "../../utils/task";
import { withRouter } from "react-router-dom";

class AddTask extends React.Component {
  state = {
    task: "",
  };

  handleChange = (event) => {
    let { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const taskService = new TaskService();
    taskService.addTask(this.state).then(() => {
      this.props.history.push("/");
    });
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="task"
          value={this.state.task}
          onChange={this.handleChange}
        />

        <button>Create</button>
      </form>
    );
  }
}

export default withRouter(AddTask);
