import express from "express";
import mongoose from "mongoose";
import rootRouter from "./routes/root.js";
import "dotenv/config";

mongoose
  .connect(process.env.MDB_CONNECTION_STR, {
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log("MDB connection successfull");
  })
  .catch((error) => {
    console.log("MDB connection failed");
    console.error(error);
  });

const app = express();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", rootRouter);

app.listen(3000);
