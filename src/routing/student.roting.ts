import express from "express";
import {getGrdesOfStudent} from "../controller/student.controller"

import {tryCatchHandler} from "../middleware/tryCatchHandler.middleware"


export const studentRouter = express.Router();


studentRouter.get("/", tryCatchHandler(getGrdesOfStudent));



    