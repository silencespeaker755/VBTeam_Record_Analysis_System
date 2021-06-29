import { Router } from "express";
import BulletinService from "../../../services/BulletinService";

const router = Router();

router.use("/", (req, res) => {
  console.log("/api/bulletin", req.body);
  BulletinService.getFbPosts({ req, res });
});

export default router;
