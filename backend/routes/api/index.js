import { Router } from "express";
import userRouter from "./user";
import homeRouter from "./home";

const router = Router();

router.use("/user", userRouter);
router.use("/home", homeRouter);

export default router;
