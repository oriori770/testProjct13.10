import express from "express";
import {register, logIn} from "../controller/auth.controller"
import {tryCatchHandler} from "../middleware/tryCatchHandler.middleware"
const auth = express.Router();


auth.post("/register", tryCatchHandler(register));
auth.post("/login", tryCatchHandler(logIn))

export default auth;
    