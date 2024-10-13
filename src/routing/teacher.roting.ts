import express from "express";
import {addGradeToStudent,getAllClassData, getGrdesOfStudent} from "../controller/teacher.controller"

import {tryCatchHandler} from "../middleware/tryCatchHandler.middleware"
import { get } from "http";


export const teacherRouter = express.Router();


teacherRouter.put("/:studentName", tryCatchHandler(addGradeToStudent));
teacherRouter.get("/", tryCatchHandler(getAllClassData));
teacherRouter.get("/grades/:studentName", tryCatchHandler(getGrdesOfStudent));




    