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
    .catch((err) => {
      console.log(err);
      res.status(401).send(err);
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
    .catch((err) => {
      console.log(err);
      res.status(401).send(err);
    });
});

export default router;
