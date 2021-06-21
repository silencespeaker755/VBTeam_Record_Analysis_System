import cors from "cors";
import express from "express";
import router from "../routes";

export default ({ app }) => {
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use("/", router);
};
