import { Router } from "express";
import setRouter from "./sets";
import recordRouter from "./records";

const router = Router();

router.use("/", recordRouter);
router.use("/sets", setRouter);

export default router;
