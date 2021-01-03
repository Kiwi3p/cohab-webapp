import axios from "axios";

class YelpService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_PROJECTS_API}/api`,
      withCredentials: true,
    });
    this.service = service;
  }

  getAll() {
    //axios.get('http://localhost:5000/characters);
    return this.service.get("/yelp");
  }

}

export default YelpService;
