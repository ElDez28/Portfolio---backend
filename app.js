const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const reviewRouter = require("./reviewRouter/reviewRouter");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.options("*", cors());
app.use(express.json());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use("/api/reviews", reviewRouter);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
});

module.exports = app;
