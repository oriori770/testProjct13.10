import express from "express";
import {studentAuthRouter, teacherAuthRouter} from "./auth.roting";
import {teacherRouter} from "./teacher.roting"
import {studentRouter} from "./student.roting"
import authenticateToken from "../middleware/auth.middleware"
const mainRouter = express.Router();

mainRouter.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Express.js API!" });
});

mainRouter.use("/student", studentAuthRouter);
mainRouter.use("/teacher", teacherAuthRouter);

mainRouter.use("/", authenticateToken);
mainRouter.use("/student", studentRouter);
mainRouter.use("/teacher", teacherRouter);




export default mainRouter;
