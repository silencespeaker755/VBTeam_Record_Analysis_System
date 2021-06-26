import { Router } from "express";
import userRouter from "./user";
import homeRouter from "./home";
import practiceRouter from "./practice";

const router = Router();

router.use("/user", userRouter);
router.use("/home", homeRouter);
router.use("/practice", practiceRouter);

export default router;
