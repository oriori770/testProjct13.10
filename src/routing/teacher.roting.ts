import express from "express";
import {addGradeToStudent} from "../controller/teacher.controller"

import {tryCatchHandler} from "../middleware/tryCatchHandler.middleware"

export const teacherRouter = express.Router();


teacherRouter.put("/:studentName", tryCatchHandler(addGradeToStudent));


    