import  { Request, Response } from "express";
import classTeacherModel,  {IClassTeacher} from "../model/ClassTeacher.model";
import studentModel, {IStudent} from "../model/Student.model";
import {GettingMyStudentGrades,GetGradeAverageByNameFromDb} from "../dal/teacher.dal"

interface AuthRequest extends Request {
    userId?: {_id: string};}


export async function addGradeToStudent(req: Request, res: Response): Promise<void> {

    const { subject,comment, grade } = req.body;
    const studentName = req.params.studentName;
    const newStudent: IStudent | null = await studentModel.findOneAndUpdate(
        { studentName }, { $push: { grades: { subject, comment, grade } } }, { new: true });
    if (newStudent) {
      res.status(201).json({ message: "student updated successfully", newStudent });
      await newStudent.save();
      return;
    }
    res.status(404).json({ message: "student not found" });
};
export async function getAllClassData(req: AuthRequest, res: Response): Promise<void> {

    const id = req.userId?._id;
    const allData = await studentModel.find({className: id }).select("-hashedPassword -__v -_id");
    res.status(200).json(allData);
};
export async function getGrdesOfStudent(req: AuthRequest, res: Response): Promise<void> {

    const id  = req.userId?._id;
    if (!id) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const studentname = req.params.studentName;
    console.log(studentname, id);
    
    const student = await GettingMyStudentGrades(studentname, id);
    if (!student) {
        res.status(404).json({ message: "student not found" });
        return;
    }
    res.status(200).json(student);
};
export async function GetClassGradeAverage(req: AuthRequest, res: Response): Promise<void> {
    // const className = req.params.className;
    const id  = req.userId?._id;
    if (!id) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const classgradeAverage = await GetGradeAverageByNameFromDb(id);
    if (!classgradeAverage) {
        res.status(404).json({ message: "Class not found" });
        return;
    }
    res.status(200).json(classgradeAverage);
};

