import express from "express";
import path from "path";
import loaders from "./loaders";
import config from "./config";

async function startServer() {
  const app = express();

  await loaders({ expressApp: app });

  // const isProduction = process.env.NODE_ENV === "production";
  // if (isProduction) {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
  // }

  app.listen(config.port || 5000, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Server listen on ${config.port || 5000}...`);
  });
}

startServer();
