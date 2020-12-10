import axios from "axios";

class TaskService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_PROJECTS_API}/api`,
      withCredentials: true
    });
    this.service = service;
  }

  getAllTasks() {
    //axios.get('http://localhost:5000/characters);
    return this.service.get("/tasks");
  }

  getTask(id) {
    //axios.get('http://localhost:5000/characters/1);
    return this.service.get(`/tasks/${id}`);
  }

  addTask(task, user, done, date) {
    //axios.post('http://localhost:5000/characters/, { name: 'miguel});
    return this.service.post("/tasks", { task, user, done, date });
  }

  //create delete project fuction for our projectService =>
  deleteTask(id) {
    return this.service.delete(`/tasks/${id}`);
  }

  updateTask(taskId, task) {
    return this.service.put(`/tasks/${taskId}`, task);
  }

  getTasksForUsers() {
    return this.service.get("/task-users");
  }
}

export default TaskService;
