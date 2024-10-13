import express from "express";
import authRouter from "./auth.roting";
const mainRouter = express.Router();

mainRouter.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Express.js API!" });
});

mainRouter.use("/student", authRouter);
mainRouter.use("/teacher", authRouter);



export default mainRouter;
