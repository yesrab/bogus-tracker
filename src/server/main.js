import express from "express";
import ViteExpress from "vite-express";
import "dotenv/config";
import "express-async-errors";
import errorHandler from "./middleware/errorHandler.js";
import connect from "./db/connect.js";

const DBURI = process.env.DB;
const app = express();

app.get("/api/v1/test", (req, res) => {
  res.json({
    message: "Hello from the server",
  });
});

//dataRoute
import dataRouter from "./routes/salaryData.js";
app.use("/api/v1/data", dataRouter);

app.use(errorHandler);
const start = async () => {
  try {
    await connect(DBURI);
    console.log("Connected to DataBase");
    ViteExpress.listen(app, 3000, () =>
      console.log("Server is listening on port 3000...")
    );
  } catch (error) {
    console.log(error);
  }
};

start();

