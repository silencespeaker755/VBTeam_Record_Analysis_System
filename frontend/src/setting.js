import axios from "axios";

const instance = axios.create({
  baseURL: "https://ntucsievolleyballserver.herokuapp.com/",
});

export { instance as default };
