import React from "react";
import TaskService from "../../utils/task";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Success from "../success/success";

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
      <div>
        <div>
          <h1>{this.state.currentDay}</h1>
          {this.state.dayTasks ? (
            this.state.dayTasks.map((task, index) => {
              return (
                <div key={index}>
                  <Link to={`/task/${task._id}`}>{task.task}</Link>
                  <button onClick={() => this.handleChange(task)}>
                    {task.done ? "Mark as to-do" : "Mark as done"}
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
        <div className="success!">
          {this.state.success ? <Success /> : <div></div>}
        </div>
        <div className="next-day">
          <button onClick={this.buttonPrevDay} className="day-toggle">
            Previous day
          </button>
          <button onClick={this.buttonNextDay} className="day-toggle">
            Next Day
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(ListTasks);
