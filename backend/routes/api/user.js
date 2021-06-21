import { Router } from "express";
import UserService from "../../services/userService";

const router = Router();

router.post("/signup", (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  UserService.signUp({ name, email, password })
    .then((user) => {
      console.log("user:", user);
      res.status(200).send("SignUp success!");
    })
    .catch((e) => {
      console.log(e);
      res.status(401).send(e);
    });
});

router.post("/login", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  UserService.logIn({ email, password })
    .then((user) => {
      console.log("user:", user);
      res.status(200).send("LogIn success!");
    })
    .catch((e) => {
      console.log(e);
      res.status(401).send(e);
    });
});

export default router;
