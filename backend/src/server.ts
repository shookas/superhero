import cors from "cors";
import express from "express";
import helmet from "helmet";
import errorHandler from "./middleware/errorHandler";
import router from "./router";

const port = 3000;
const app = express();

app.use(cors());
app.use(helmet());

app.use(express.json());

app.use(router);

app.use(errorHandler);

process.on("uncaughtException", (err) => {
  console.error("Caught exception: " + err);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
