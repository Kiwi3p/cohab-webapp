import React from "react";
import HousesService from "../../utils/api";
import { withRouter } from "react-router-dom";

class AddHouse extends React.Component {
  state = {
    house: "",
  };

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
      <form onSubmit={this.handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="house"
          value={this.state.house}
          onChange={this.handleChange}
        />

        <button>Create</button>
      </form>
    );
  }
}

export default withRouter(AddHouse);
