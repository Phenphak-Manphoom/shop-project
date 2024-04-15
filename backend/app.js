import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleware from "./middlewares/error.js";
import cookieParser from "cookie-parser";

//handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});
const app = express();
console.log("hello");
dotenv.config({ path: "backend/config/config.env" });
connectDatabase();
app.use(express.json());
app.use(cookieParser())
app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);

//using error middleware
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT : ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

//handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err}`);
  console.log("Shutting down server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
