import express from "express";
import {register, logIn} from "../controller/auth.controller"
import {tryCatchHandler} from "../middleware/tryCatchHandler.middleware"
export const studentAuth = express.Router();


studentAuth.post("/register", tryCatchHandler(register));
studentAuth.post("/login", tryCatchHandler(logIn))

export const teacherAuth = express.Router();


teacherAuth.post("/register", tryCatchHandler(register));
teacherAuth.post("/login", tryCatchHandler(logIn))

    