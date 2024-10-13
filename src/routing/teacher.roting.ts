import express from "express";
import {addGradeToStudent,getAllClassData} from "../controller/teacher.controller"

import {tryCatchHandler} from "../middleware/tryCatchHandler.middleware"


export const teacherRouter = express.Router();


teacherRouter.put("/:studentName", tryCatchHandler(addGradeToStudent));
teacherRouter.get("/", tryCatchHandler(getAllClassData));



    