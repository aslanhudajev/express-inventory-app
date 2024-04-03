import compression from "compression";
import "dotenv/config";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import rootRouter from "./routes/root.js";
import { v2 as cloudinary } from "cloudinary";

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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  handler: (req, res, next) => {
    res.render("RateLimit");
  },
});

app.use(limiter);
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"],
        "base-uri": ["'self'"],
        "font-src": ["'self'", "https:", "data:"],
        "frame-ancestors": ["'self'"],
        "img-src": ["'self'", "data:", "http://res.cloudinary.com"],
        "script-src-attr": ["'none'"],
        "style-src": ["'self'", "https:", "'unsafe-inline'"],
      },
    },
  }),
);
app.use(compression());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", rootRouter);

app.listen(8080);
