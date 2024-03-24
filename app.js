import express from "express";
import mongoose from "mongoose";

mongoose.connect("", { dbName: "" });

const app = express();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static());

app.listen(3000);
