import { Router } from "express";
import dataRouter from "./data";

const router = Router();

router.use("/data", dataRouter);

export default router;
