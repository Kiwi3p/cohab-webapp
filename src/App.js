import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import ListHouse from "./components/house/ListHouses";
import AddHouse from "./components/house/AddHouse";
import Navbar from "./components/Navbar";
import Signup from "./components/user/Signup";
import Login from "./components/user/Login";
import React from "react";
import AuthService from "./utils/auth";
import AddTask from "./components/tasks/AddTask";
import ListUsers from "./components/user/ListUsers";
import ListUserHouse from "./components/tasks/ListUserHouse";
import ListTasks from "./components/tasks/ListTasks";
import Home from "./components/Home"
import HomeNoLogin from "./components/HomeNoLogin"
import Success from "./components/success/success";


class App extends React.Component {
  state = {
    loggedInUser: null,
  };

  setCurrentUser = (user) => {
    this.setState({
      loggedInUser: user,
    });
  };

  componentDidMount() {
    if (this.state.loggedInUser === null) {
      const authService = new AuthService();
      authService.loggedin().then((response) => {
        if (response.data._id) {
          //there's a user session active then set the state with the current user
          this.setCurrentUser(response.data);
          localStorage.setItem("loggedInUser", response.data._id);
        } else {
          localStorage.removeItem("loggedInUser");
        }
      });
    }
  }

  render() {
    return (
      <div className="App" width="375" height="812">
        
         <Navbar className="bring-to-top"
          loggedInUser={this.state.loggedInUser}
          setCurrentUser={this.setCurrentUser}
        /> 
        <Route
            exact
            path="/"
            render={() => {
              if (localStorage.getItem("loggedInUser")) {
                return <Home />;
              } else {
                return <HomeNoLogin />;
              }
            }}
          />
        <Switch>
          <Route exact path="/house" component={ListHouse} />
          <Route
            exact
            path="/house/add"
            render={() => {
              if (localStorage.getItem("loggedInUser")) {
                return <AddHouse />;
              } else {
                return <Redirect to="/login" />;
              }
            }}
          />
          <Route
            exact
            path="/house/task/add"
            render={() => {
              if (localStorage.getItem("loggedInUser")) {
                return <AddTask />;
              } else {
                return <Redirect to="/login" />;
              }
            }}
          />
          <Route
            exact
            path="/house/users"
            render={() => {
              if (localStorage.getItem("loggedInUser")) {
                return <ListUsers />;
              } else {
                return <Redirect to="/login" />;
              }
            }}
          />
          <Route
            exact
            path="/house/user-house"
            render={() => {
              if (localStorage.getItem("loggedInUser")) {
                return <ListUserHouse />;
              } else {
                return <Redirect to="/login" />;
              }
            }}
          />
          <Route
            exact
            path="/house/user-tasks"
            render={() => {
              if (localStorage.getItem("loggedInUser")) {
                return <ListTasks />;
              } else {
                return <Redirect to="/login" />;
              }
            }}
          />
          <Route
            exact
            path="/house/success"
            render={() => {
              if (localStorage.getItem("loggedInUser")) {
                return <Success />;
              } else {
                return <Redirect to="/login" />;
              }
            }}
          />
          <Route path="/signup" component={Signup} />
          <Route
            path="/login"
            render={() => {
              return <Login setCurrentUser={this.setCurrentUser} />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
