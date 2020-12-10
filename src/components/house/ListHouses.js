import React from "react";
import HousesService from "../../utils/api";
import { Link } from "react-router-dom";

class ListHouses extends React.Component {
  state = {
    houses: [],
  };

  componentDidMount() {
    const housesService = new HousesService();
    housesService.getAll().then((response) => {
      console.log(response);
      this.setState({
        houses: response.data,
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.houses.map((house, index) => {
          return (
            <div key={index}>
              <Link to={`/house/${house._id}`}>{house.house}</Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ListHouses;
