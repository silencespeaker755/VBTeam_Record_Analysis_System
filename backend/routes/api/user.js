import { Router } from "express";
import UserService from "../../services/UserService";

const router = Router();

router.post("/signup", (req, res) => {
  /*
    #swagger.path = '/api/user/signup'
    #swagger.tags = ['User']
    #swagger.parameters['obj'] = {
      schema: {
        "name": {
          in: 'body',
          required: true,
          type: 'string',
        }, 
        "email": {
          in: 'body',
          required: true,
          type: 'string',
        }, 
        "password": {
          in: 'body',
          required: true,
          type: 'string',
        }
      }
    }
  */

  console.log(req.body);
  const { name, email, password } = req.body;

  UserService.signUp({ name, email, password })
    .then((user) => {
      console.log("User signup:", user);
      /*
        #swagger.responses[200] = { 
          schema: {
            id: "60d0b2011e44bec4e4be3a52",
            isAdmin: false,
          }
        }
      */
      res
        .status(200)
        .json({ id: user._id, isAdmin: user.isAdmin, auth: user.auth });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send(err);
    });
});

router.post("/login", (req, res) => {
  /*
    #swagger.path = '/api/user/login'
    #swagger.tags = ['User']
    #swagger.parameters['obj'] = {
      schema: {
        "email": {
          in: 'body',
          required: true,
          type: 'string',
        }, 
        "password": {
          in: 'body',
          required: true,
          type: 'string',
        }
      }
    }
  */

  console.log(req.body);
  const { email, password } = req.body;

  UserService.logIn({ email, password })
    .then((user) => {
      console.log("User login:", user);
      /*
        #swagger.responses[200] = { 
          schema: {
            id: "60d0b2011e44bec4e4be3a52",
            isAdmin: false,
          }
        }
      */
      res
        .status(200)
        .json({ id: user._id, isAdmin: user.isAdmin, auth: user.auth });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send(err);
    });
});

router.post("/auth", (req, res) => {
  const { email, verifyCode } = req.body;
  UserService.authentication({ email, verifyCode })
    .then((auth) => {
      console.log("Verification:", auth);
      if (auth) res.status(200).send({ msg: "Verification Success!", auth });
      else res.status(200).send({ msg: "Incorrect Verification Code!", auth });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

router.get("/users", (req, res) => {
  const { userId } = req.query;
  if (userId) {
    UserService.getUser({ userId })
      .then((userList) => {
        console.log("Get user:", userList);
        res.status(200).send(userList);
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
  } else {
    UserService.getUser({})
      .then((userList) => {
        console.log("Get userList:", userList);
        res.status(200).send(userList);
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
  }
});

router.post("/update", (req, res) => {
  const { body } = req;
  UserService.updateUser(body)
    .then((user) => {
      console.log("Update user:", user);
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

router.post("/admin", (req, res) => {
  const { body } = req;
  UserService.updateAdmin(body)
    .then((user) => {
      console.log("Update user:", user);
      res.status(200).send("Update Success !");
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

export default router;
