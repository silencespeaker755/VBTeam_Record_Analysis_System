import axios from "axios";

const instance = axios.create({
  baseURL: "https://volleyballclub.herokuapp.com/",
});

export { instance as default };
