import  { Request, Response } from "express";
import studentModel, {IStudent} from "../model/Student.model";
import jsonwebtoken from "jsonwebtoken";
import classTeacherModel from "../model/ClassTeacher.model";


export async function registerStudent(req: Request, res: Response): Promise<void> {

    const {studentName, password,email, className } = req.body;
    const existingUser: IStudent | null = await studentModel.findOne({ studentName });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const studentClassId = await classTeacherModel.findOne({ className }).select("_id");
    const user = new studentModel({ studentName, hashedPassword:password, email, className: studentClassId });
    await user.save();
    res.status(201).json({ message: "student created successfully" });
}
export async function logInStudent(req: Request, res: Response): Promise<void> {
   try{
     
     const { email, password } = req.body;
     if (!email || !password) {
       res.status(400).json({ message: "Missing email or password" });
       return;
     }
     const existingStudent :IStudent | null  = await studentModel.findOne({ email });
     if (!existingStudent ||!await existingStudent.comparePassword(password)) {
       res.status(401).json({ message: "Incorrect email or password" });
      return;
    }
    else{    
      const token = jsonwebtoken.sign(
        { _id: existingStudent._id },
        process.env.JWT_SECRET!,
        { expiresIn: "4h" }
      );
      const hours =5
      const expirationDate = new Date(Date.now() + 1000 * 60 * 60 * hours);
        res.cookie("token", `Bearer ${token}`, {httpOnly:true, secure: false, expires: expirationDate})
        res.status(200).json({ message: "Login successful", token: `Bearer ${token}` });
    }
   }catch(err){
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
   }

  }
