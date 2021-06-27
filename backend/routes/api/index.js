import { Router } from "express";
import userRouter from "./user";
import homeRouter from "./home";
import practiceRouter from "./practice";
import matchRouter from "./match";
// import adminRouter from "./admin";

const router = Router();

router.use("/user", userRouter);
router.use("/home", homeRouter);
router.use("/practice", practiceRouter);
router.use("/match", matchRouter);
// router.use("/admin", adminRouter);

export default router;
