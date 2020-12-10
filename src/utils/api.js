import axios from "axios";

class HousesService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_PROJECTS_API}/api`,
      withCredentials: true,
    });
    this.service = service;
  }

  getAll() {
    //axios.get('http://localhost:5000/characters);
    return this.service.get("/house");
  }

  getProject(id) {
    //axios.get('http://localhost:5000/characters/1);
    return this.service.get(`/house/${id}`);
  }

  addHouse(house) {
    //axios.post('http://localhost:5000/characters/, { name: 'miguel});
    return this.service.post("/house", house);
  }

  associateHouse(houseId, userId) {
    return this.service.put("/associateHouse", { houseId, userId });
  }

  //create delete project fuction for our projectService =>
  deleteProject(id) {
    return this.service.delete(`/house/${id}`);
  }

  updateProject(updatedHouse) {
    return this.service.put(`/house/${updatedHouse.id}`, updatedHouse);
  }

  getHousesForUsers() {
    return this.service.get("/house-users");
  }
}

export default HousesService;
