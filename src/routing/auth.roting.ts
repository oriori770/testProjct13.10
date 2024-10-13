import express from "express";
import {registerTeacher, logInTeacher} from "../controller/teacherAuth.controller"
import {logInStudent, registerStudent} from "../controller/studentAuth.controller"

import {tryCatchHandler} from "../middleware/tryCatchHandler.middleware"

export const studentAuthRouter = express.Router();


studentAuthRouter.post("/register", tryCatchHandler(registerStudent));
studentAuthRouter.post("/login", tryCatchHandler(logInStudent))

export const teacherAuthRouter = express.Router();


teacherAuthRouter.post("/register", tryCatchHandler(registerTeacher));
teacherAuthRouter.post("/login", tryCatchHandler(logInTeacher))

    