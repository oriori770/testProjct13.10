import  { Request, Response } from "express";
import classTeacherModel,  {IClassTeacher} from "../model/ClassTeacher.model";
import studentModel, {IStudent} from "../model/Student.model";
import {receivingAStudentGradeById} from "../dal/student.dal"

interface AuthRequest extends Request {
    userId?: {_id: string};}


export async function getGrdesOfStudent(req: AuthRequest, res: Response): Promise<void> {

    const studentId = req.userId?._id;;
    if (!studentId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const allData = await receivingAStudentGradeById(studentId);
    res.status(200).json(allData);

};