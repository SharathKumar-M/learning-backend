import express from "express";
import userRouter from "./routes/user.route.js";

const app = express();
app.use(express.json());




app.use("/api/v1/users",userRouter);

//example route: http://localhost:5000/api/v1/users/register

export default app;
