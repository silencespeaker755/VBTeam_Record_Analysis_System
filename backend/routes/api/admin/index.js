import { Router } from "express";
import facebookRouter from "./Facebook";

const router = Router();

router.use("/facebook", facebookRouter);

export default router;
