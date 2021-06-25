import { Router } from "express";
import PracticeService from "../../services/PracticeService";

const router = Router();

router.get("/", (req, res) => {
  /*
    #swagger.path = '/api/practice'
    #swagger.tags = ['Practice']
  */

  PracticeService.getPosts()
    .then((posts) => {
      console.log("Get all posts:", posts);
      /*
        #swagger.responses[200] = { 
          type: 'array',
          schema: { $ref: '#/definitions/Posts' }
        }
      */
      res.status(200).send(posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

router.post("/upload", (req, res) => {
  /*
    #swagger.path = '/api/practice/upload'
    #swagger.tags = ['Practice']
    #swagger.parameters['obj'] = {
      in: 'body',
      required: true,
      type: 'object',
      schema: { "post": { $ref: '#/definitions/Article'} }
    }
  */

  console.log(req.body);
  const { post } = req.body;

  PracticeService.uploadPost({ post })
    .then((postId) => {
      console.log("Uploaded post:", postId);
      /*
        #swagger.responses[200] = { 
          schema: {
            id: 'string'
          }
        }
      */
      res.status(200).json({ id: postId });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

export default router;
