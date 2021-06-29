import { Router } from "express";
import bulletinRouter from "./bulletin";

const router = Router();

router.use("/", bulletinRouter);

export default router;
