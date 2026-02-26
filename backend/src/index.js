import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import envFile from "./config/env.js";
import authRouter from "./routes/auth.route.js";
import betsRouter from "./routes/bets.route.js";
import userRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.route.js";
import matchesRouter from "./routes/matches.route.js";

const Port = envFile.PORT || 5000;

connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
  "https://protectionpools.com",
  "https://www.protectionpools.com",
  "https://admin.protectionpools.com",
];

app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    allowedOrigins: allowedOrigins,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
    status: "success",
  });
});

app.get("/ping", (req, res) => {
  res.send("ok");
});


app.use("/auth", authRouter);
app.use("/bets", betsRouter);
app.use("/users", userRouter);
app.use("/admin", adminRouter);
app.use("/matches", matchesRouter);

app.listen(Port, () => {
  console.log(`Server is running on port http://localhost:${Port}`);
});
