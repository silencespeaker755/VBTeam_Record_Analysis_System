import { Router } from "express";
import postRouter from "./posts";

const router = Router();

router.use("/posts", postRouter);

export default router;
