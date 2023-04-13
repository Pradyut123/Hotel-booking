import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/authRoutes.js";
import hotelRoute from "./routes/hotelsRoutes.js";
import roomRoute from "./routes/roomsRoutes.js";
import userRoute from "./routes/usersRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// require("./db/connection");

const app = express();
dotenv.config();

//MongoDB connection
const DB = process.env.DATABASE;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB)
  .then(() => {
    console.log(`connection Successful`);
  })
  .catch((error) => console.log(`not connected`));

//middlewares
app.use(cors())
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/users", userRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
