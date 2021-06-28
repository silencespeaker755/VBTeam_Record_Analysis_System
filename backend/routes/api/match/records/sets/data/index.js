import { Router } from "express";
import dataRouter from "./data";

const router = Router();

router.use("/", dataRouter);

export default router;
