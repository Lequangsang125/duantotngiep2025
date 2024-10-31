import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

mongoose
  .connect('mongodb://localhost:27017/duantotnghiep2025')
  .then(() => console.log("Connected!"))
  .catch(err => console.error("Lỗi kết nối đến MongoDB:", err));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
