import React from "react";
//import HousesService from "../utils/api";
import HousesService from "../../utils/api";
import SelectTask from "./SelectTask";
import TaskService from "../../utils/task";

class ListUserHouse extends React.Component {
  state = {
    task: "",
    users: [],
    done: false,
    date: '',
    selectedUser: "",
    loaded: false,
    //houses: [],
  };

  componentDidMount() {
    const housesService = new HousesService();
    housesService.getHousesForUsers().then((response) => {
      this.setState({
        users: response.data.users,
        loaded: true,
      });
    });

    /*
    housesService.getAll().then((response) => {
      console.log(response);
      this.setState({
        houses: response.data,
      });
    });
    */
  }

  handleChange = (event) => {
    let { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const taskService = new TaskService();

    taskService.addTask(this.state.task, this.state.selectedUser, this.state.done, this.state.date).then(() => {
      //this.props.history.push("/house");
      console.log("Task created!");
    });
  };

  render() {
    return (
      //if no loaded --> load this
      this.state.loaded ? (<div className="flex-sign-2">
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input
          className="input-change"
            type="text"
            name="task"
            value={this.state.task}
            onChange={this.handleChange}
          />
          <select
          className="input-change"
            name="selectedUser"
            onChange={this.handleChange}
            value={this.state.selectedUser}
          >
            {this.state.users.map((user, index) => {
              return (
                <option className="input-change" value={user._id} key={index}>
                  {user.username}
                </option>
              );
            })}
          </select>
          <input type="date" name="date"
            value={this.state.date}
            onChange={this.handleChange}/>  
          <button className="task-btn"><h1>Create</h1></button>
        </form>
      </div>) : (<h1>loading</h1>) 
    )}

}

export default ListUserHouse;
