import { Router } from "express";
import UserService from "../../services/userService";

const router = Router();

router.post("/signup", (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  UserService.signUp({ name, email, password })
    .then((user) => {
      console.log("User signup:", user);
      res.status(200).json({ id: user._id, isAdmin: user.isAdmin });
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
      console.log("User login:", user);
      res.status(200).json({ id: user._id, isAdmin: user.isAdmin });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send(err);
    });
});

export default router;
