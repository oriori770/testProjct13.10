import express from "express";
import {registerTeacher, logInTeacher} from "../controller/teacherAuth.controller"
import {logInStudent, registerStudent} from "../controller/studentAuth.controller"

import {tryCatchHandler} from "../middleware/tryCatchHandler.middleware"

export const studentAuthRouter = express.Router();



/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication operations
 */

/**
 * @swagger
 * /api/student/register:
 *   post:
 *     tags: [student Auth]
 *     summary: Register a new user
 *     description: Create a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentName:
 *                 type: string
 *                 description: 'שם המשתמש'
 *                 example: 'user123'
 *               password:
 *                 type: string
 *                 description: 'סיסמת המשתמש'
 *                 example: 'password123'
 *               email:
 *                 type: string
 *                 description: 'דואר אלקטרוני'
 *                 example: 'user123@user123'
 *               className:
 *                 type: string
 *                 description: 'שם הכיתה'
 *                 example: 'hermon'
 *             required:
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 *
 * /api/student/login:
 *   post:
 *     tags: [student Auth]
 *     summary: Login user
 *     description: Authenticate a user and return a token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: 'שם המשתמש'
 *                 example: 'user123'
 *               password:
 *                 type: string
 *                 description: 'סיסמת המשתמש'
 *                 example: 'password123'
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */


studentAuthRouter.post("/register", tryCatchHandler(registerStudent));
studentAuthRouter.post("/login", tryCatchHandler(logInStudent))

export const teacherAuthRouter = express.Router();



/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication operations
 */

/**
 * @swagger
 * /api/teacher/register:
 *   post:
 *     tags: [teacher Auth]
 *     summary: Register a new user
 *     description: Create a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               className:
 *                 type: string
 *                 description: 'שם המשתמש'
 *                 example: 'user123'
 *               password:
 *                 type: string
 *                 description: 'סיסמת המשתמש'
 *                 example: 'password123'
 *               email:
 *                 type: string
 *                 description: 'דואר אלקטרוני'
 *                 example: 'user123@user123'
 *               teacherName:
 *                 type: string
 *                 description: 'שם הכיתה'
 *                 example: 'hermon'
 *             required:
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 *
 * /api/teacher/login:
 *   post:
 *     tags: [teacher Auth]
 *     summary: Login user
 *     description: Authenticate a user and return a token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: 'שם המשתמש'
 *                 example: 'user123@user123'
 *               password:
 *                 type: string
 *                 description: 'סיסמת המשתמש'
 *                 example: 'password123'
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */


teacherAuthRouter.post("/register", tryCatchHandler(registerTeacher));
teacherAuthRouter.post("/login", tryCatchHandler(logInTeacher))

    