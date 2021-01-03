import React from "react";
import HousesService from "../../utils/api";
import AuthService from "../../utils/auth";
import SelectHouse from "../house/SelectHouse";
import Navbottom from "../Navbottom";

class ListUsers extends React.Component {
  state = {
    users: [],
    houses: [],
  };

  componentDidMount() {
    const authService = new AuthService();
    const housesService = new HousesService();
    authService.getAll().then((response) => {
      console.log(response);
      this.setState({
        users: response.data,
      });
    });
    housesService.getAll().then((response) => {
      console.log(response);
      this.setState({
        houses: response.data,
      });
    });
  }

  handleChange = (event) => {
    let { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const housesService = new HousesService();
    housesService.addHouse(this.state).then(() => {
      this.props.history.push("/");
    });
  };

  render() {
    return (
      <div>
        {this.state.users.map((user, index) => {
          return (
            <div className="flex-user" key={index}>
              <h1>{user.username}</h1>
              <SelectHouse user={user} houses={this.state.houses} />
            </div>
          );
        })}
      <Navbottom />
      </div>
    );
  }
}

export default ListUsers;
