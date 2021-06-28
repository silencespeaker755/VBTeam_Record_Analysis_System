import { Router } from "express";
import dataRouter from "./data";
import setRouter from "./sets";

const router = Router();

router.use("/", setRouter);
router.use("/data", dataRouter);

export default router;
