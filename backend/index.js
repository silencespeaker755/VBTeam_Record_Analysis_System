import express from "express";
import loaders from "./loaders";
import config from "./config";

async function startServer() {
  const app = express();

  await loaders({ expressApp: app });

  app.listen(config.port || 5000, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Server listen on ${config.port || 5000}...`);
  });
}

startServer();
