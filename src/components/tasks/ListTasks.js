import React from "react";
import TaskService from "../../utils/task";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Success from "../success/success";
import Navbottom from "../Navbottom";

class ListTasks extends React.Component {
  state = {
    tasks: [],
    dayTasks: [],
    currentDay: "",
    success: false,
    dateSuccess: false,
  };

  componentDidMount() {
    this.getAllTasks();
    this.getDate();
  }
  getDate = () => {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    this.setState({
      currentDay: date,
    });
  };
  getAllTasks = () => {
    const taskService = new TaskService();
    taskService
      .getTasksForUsers()
      .then((response) => {
        console.log(response);
        this.setState(
          {
            tasks: response.data.tasks,
          },
          () => {
            this.checkForDate();
          }
        );
      })
      .then(() => {
        this.checkForSucess();
      });
  };
  checkForSucess = () => {
    // let tasksLength = this.state.tasks;
    let tasksNotDone = 0;
    this.state.tasks.forEach((task) => {
      if (task.done === false) {
        return tasksNotDone++;
      }
    });
    if (tasksNotDone === 0) {
      console.log("success");
      this.setState({
        success: true,
      });
    } else {
      this.setState({
        success: false,
      });
    }
  };

  checkForDate = () => {
    let currentDay = new Date(this.state.currentDay);
    let dateValidation = 0;
    let dayTasks = [];
    this.state.tasks.forEach((task) => {
      if (new Date(task.date).toString() === new Date(currentDay).toString()) {
        dayTasks.push(task);
      }
    });

    this.setState({
      dayTasks: dayTasks,
    });

    if (dateValidation === 0) {
      this.setState({
        dateSuccess: false,
      });
    } else {
      this.setState({
        dateSuccess: true,
      });
    }
  };

  buttonNextDay = () => {
    let today = new Date(this.state.currentDay);
    let newDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      (today.getDate() + 1);
    console.log(newDate);
    this.setState(
      {
        currentDay: newDate,
      },
      () => {
        this.checkForDate();
      }
    );
  };

  buttonPrevDay = () => {
    let today = new Date(this.state.currentDay);
    let newDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      (today.getDate() - 1);
    console.log(newDate);
    this.setState(
      {
        currentDay: newDate,
      },
      () => {
        this.checkForDate();
      }
    );
  };

  handleChange = (task) => {
    let taskId = task._id;

    // let task = {done: checked }

    const taskService = new TaskService();
    taskService
      .updateTask(taskId, task)
      .then(() => {
        this.getAllTasks();
      })
      .then(() => {
        this.checkForSucess();
      })
      .then(() => {
        this.checkForDate();
      });
  };

  render() {
    //write to list tasks only assigned by current day
    //write if all tasks for that day are done, prompt success!
    return (
      <div className="day-all">
        <div className="next-day bring-to-top">
          <button onClick={this.buttonPrevDay} className="day-toggle-2">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-arrow-left-circle day-button"
              fillRule="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                fill-rule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
              />
            </svg>
          </button>
          <button onClick={this.buttonNextDay} className="day-toggle">
          <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-arrow-right-circle day-button"
              fillRule="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                fill-rule="evenodd"
                d="M4 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5A.5.5 0 0 0 4 8z"
              />
            </svg>
          </button>
        </div>
        <div className="side-bar-1">
          <h1>{this.state.currentDay}</h1>
        </div>
        <div className="side-bar-2">
          <h1>{this.state.currentDay}</h1>
        </div>
        <div className="your-day">
          <h1>Your Day</h1>
        </div>
        <div className="task-list">
          <h1>{this.state.currentDay}</h1>
          <h2>Tasks:</h2>
          {this.state.dayTasks ? (
            this.state.dayTasks.map((task, index) => {
              return (
                <div class="checklist-align" key={index}>
                  <Link className="check-item" to={`/task/${task._id}`}>
                    {task.task}
                  </Link>
                  <button
                    onClick={() => this.handleChange(task)}
                    className="checkbox"
                  >
                    {task.done ? (
                      
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        class="bi bi-check-square-fill"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        class="bi bi-check-square"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
                        />
                      </svg>
                    )}
                  </button>
                  {/* <form>
                  <input
                    defaultChecked={task.done}
                    type="checkbox"
                    name="done"
                    onChange={(event) => this.handleChange(event, task._id)}
                  />
                </form> */}
                </div>
              );
            })
          ) : (
            <div>
              <h1>No Tasks for this day!</h1>
            </div>
          )}
        </div>

        <div className="success">
          {this.state.success ? <Success className="success-component" /> : <div></div>}
        </div>
        <Navbottom />
      </div>
    );
  }
}

export default withRouter(ListTasks);
