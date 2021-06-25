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
      res.status(200).json({ id: user._id, isAdmin: user.isAdmin });
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
      res.status(200).json({ id: user._id, isAdmin: user.isAdmin });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send(err);
    });
});

export default router;
