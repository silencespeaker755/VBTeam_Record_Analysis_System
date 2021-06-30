import { Router } from "express";
import analysisRouter from "./analysis";

const router = Router();

router.use("/", analysisRouter);

export default router;
