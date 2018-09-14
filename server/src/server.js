import express from "express";
import { postgraphile } from "postgraphile";
import morgan from "morgan";
import path from "path";
import winston from "winston";
import dotenv from "dotenv";
dotenv.config();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" })
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

logger.info("Server is starting up");
const app = express();
app.use(morgan("tiny"));

let rds = `postgres://graphile:postgraphile@${
  process.env.DB_HOST
}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
console.log(rds);
let schema = ["done_app", "done_app_public"];

app.use(
  postgraphile(rds, schema, {
    jwtSecret: process.env.JWT_SECRET,
    pgDefaultRole: "default_user",
    jwtPgTypeIdentifier: "done_app_public.jwt_token",
    watchPg: true,
    graphiql: process.env.NODE_ENV !== "production",
    disableDefaultMutations: false
  })
);

// serve built file in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "..", "client", "build")));

  app.get("/", function(req, res) {
    res.sendFile(
      path.join(__dirname, "..", "..", "client", "build", "index.html")
    );
  });
}

app.get("/ping", function(req, res) {
  return res.send("pong");
});

const port = process.env.PORT || 8080;
app.listen(port);
logger.info("Server listening on " + port);
