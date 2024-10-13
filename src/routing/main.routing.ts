import express from "express";
import {studentAuthRouter, teacherAuthRouter} from "./auth.roting";
const mainRouter = express.Router();

mainRouter.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Express.js API!" });
});

mainRouter.use("/student", studentAuthRouter);
mainRouter.use("/teacher", teacherAuthRouter);

mainRouter.use("/student", studentAuthRouter);
mainRouter.use("/teacher", teacherAuthRouter);




export default mainRouter;
