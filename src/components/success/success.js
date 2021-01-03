import React from "react";
import HousesService from "../../utils/api";
import { Link } from "react-router-dom";
import YelpService from "../../utils/yelp";

class Success extends React.Component {
  state = {
    yelp: [],
    loaded: false,
    toggle: true,
  };

  componentDidMount() {
    const yelpService = new YelpService();
    yelpService.getAll().then((response) => {
      console.log(response);
      this.setState({
        yelp: response.data,
        loaded: true,
      });
    });
  }

  hideButton = () => {
    this.setState({
      toggle: false,
    });
  };

  render() {
    let i = Math.floor(Math.random() * 8);
    console.log("yelp", this.state.yelp);
    if (this.state.toggle) {
      return this.state.loaded ? (
        <div id="prize" style={{ display: "block" }}>
          <div className="align-success">
            <div className="success-divs">
              <h1>Success!</h1>
              {this.state.loaded && (
                <div href={this.state.yelp[i].url}>
                  <img
                    href={this.state.yelp[i].url}
                    src={this.state.yelp[i].image_url}
                    alt="yelp img"
                  />
                  <h1>{this.state.yelp[i].name}</h1>
                  <a href={this.state.yelp[i].url}>Visit</a>
                </div>
              )}

              {/* {this.state.yelp.map((results, index) => {
                    return (
                      <div key={index}>
                        <p>{results.name}</p>
                        <img src={results.image_url} alt="yelp img"/>
                      </div>
                    );
                  })} */}
              <button onClick={this.hideButton} className="exit">
                <h2 onClick={this.hideButton} className="exit-link">
                  Exit
                </h2>
              </button>
            </div>
          </div>
          <div className="bg-block"></div>
        </div>
      ) : (
        <div>loading</div>
      );
    } else {
      return <div></div>;
    }
  }
}
// }

export default Success;
