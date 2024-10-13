import  { Request, Response } from "express";
import classTeacherModel,  {IClassTeacher} from "../model/ClassTeacher.model";
import studentModel, {IStudent} from "../model/Student.model";

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
// export async function getAllClkassData(req: AuthRequest, res: Response): Promise<void> {

//     const id = req.userId?._id;
//     const allData = await studentModel.find({className: id }).select("-hashedPassword -__v -_id");
//     res.status(200).json(allData);
// };
