import { Router } from "express";
import recordRouter from "./records";

const router = Router();

router.use("/records", recordRouter);

export default router;
