import { Router } from "express";
import calendarRouter from "./calendar";

const router = Router();

router.use("/calendar", calendarRouter);

export default router;
