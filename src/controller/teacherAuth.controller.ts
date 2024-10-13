import  { Request, Response } from "express";
import classTeacherModel,  {IClassTeacher} from "../model/ClassTeacher.model";
import jsonwebtoken from "jsonwebtoken";




export async function registerTeacher(req: Request, res: Response): Promise<void> {

    const { className,teacherName, email, password } = req.body;
    const existingUser: IClassTeacher | null = await classTeacherModel.findOne({ className });
    if (existingUser) {
      res.status(400).json({ message: "className already exists" });
      return;
    }
    const user = new classTeacherModel({ className,teacherName, email, hashedPassword:password });
    await user.save();
    res.status(201).json({ message: "Teacher created successfully" });
}
export async function logInTeacher(req: Request, res: Response): Promise<void> {
   try{
     
     const {email, password } = req.body;
     console.log(email, password);
     if (!email || !password) {
       res.status(400).json({ message: "Missing TeacherName or password" });
       return;
     }
     const existingUser :IClassTeacher | null  = await classTeacherModel.findOne({ email });
     if (!existingUser ||!await existingUser.comparePassword(password)) {
       res.status(401).json({ message: "Incorrect TeacherName or password" });
      return;
    }
    else{
      console.log(existingUser);
      
      const token = jsonwebtoken.sign(
        { teacherId: existingUser._id },
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
