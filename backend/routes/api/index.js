import { Router } from "express";
import userRouter from "./user";
import homeRouter from "./home";
import practiceRouter from "./practice";
import matchRouter from "./match";
// import adminRouter from "./admin";
import bulletinRouter from "./bulletin";

const router = Router();

router.use("/user", userRouter);
router.use("/home", homeRouter);
router.use("/practice", practiceRouter);
router.use("/match", matchRouter);
// router.use("/admin", adminRouter);
router.use("/bulletin", bulletinRouter);

export default router;
