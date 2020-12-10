import React from "react";
import HousesService from "../../utils/api";

class SelectHouse extends React.Component {
  state = {
    user: this.props.user,
    selectedHouse: "",
    houses: this.props.houses,
  };

  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({ selectedHouse: event.target.value });
  };

  handleFormSubmit = (event) => {
    // if (this.state.house.length === 1 ) {
    //   this.setState({
    //     selectedHouse: this.state.house[0]._id,
    //     //if there is only house
    //   })
    // }
    event.preventDefault();
    console.log("associating a house...");
    const housesService = new HousesService();
    housesService.associateHouse(this.state.selectedHouse, this.state.user._id);
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <select
          name="selectedHouse"
          onChange={this.handleChange}
          value={this.state.selectedHouse}
        >
          {this.props.houses.map((house) => {
            return <option value={house._id}>{house.house}</option>;
          })}
        </select>
        <button>Add to House</button>
      </form>
    );
  }
}

export default SelectHouse;
