import { Router } from "express";
import PostService from "../../../services/PostService";

const router = Router();

router.get("/", (req, res) => {
  /*
    #swagger.path = '/api/practice/posts'
    #swagger.tags = ['Practice']
  */

  PostService.getPosts()
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
    #swagger.path = '/api/practice/posts/upload'
    #swagger.tags = ['Practice']
    #swagger.parameters['obj'] = {
      in: 'body',
      required: true,
      type: 'object',
      schema: { $ref: '#/definitions/UploadPost'} 
    }
  */

  console.log(req.body);
  const { post, userId } = req.body;

  PostService.uploadPost({ post, userId })
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

router.post("/delete", (req, res) => {
  /*
    #swagger.path = '/api/practice/posts/delete'
    #swagger.tags = ['Practice']
    #swagger.parameters['obj'] = {
      "postId": {
        in: 'body',
        required: true,
        type: 'string'
      },
      "userId": {
        in: 'body',
        required: true,
        type: 'string',
      }
    }
  */

  console.log(req.body);
  const { postId, userId } = req.body;

  PostService.deletePost({ postId, userId })
    .then((post) => {
      console.log("Deleted post:", post);
      res.status(200).send("Delete success!");
    })
    .catch((err) => {
      console.log(err);
      if (err === "You are not the uploader!") {
        res.status(403).send(err);
      } else {
        res.status(404).send(err);
      }
    });
});

router.post("/update", (req, res) => {
  /*
    #swagger.path = '/api/practice/posts/update'
    #swagger.tags = ['Practice']
    #swagger.parameters['obj'] = {
      in: 'body',
      required: true,
      type: 'object',
      schema: { $ref: '#/definitions/UpdatePost'}
    }
  */

  console.log(req.body);
  const { post, userId } = req.body;

  PostService.updatePost({ post, userId })
    .then((Post) => {
      console.log("Updated event:", Post);
      res.status(200).send("Update success!");
    })
    .catch((err) => {
      console.log(err);
      if (err === "You are not the uploader!") {
        res.status(403).send(err);
      } else {
        res.status(404).send(err);
      }
    });
});

export default router;
