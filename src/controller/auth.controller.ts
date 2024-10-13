import e, { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel, {IUser} from "../model/User.model";
import jsonwebtoken from "jsonwebtoken";
import { error } from "console"; //


export async function register(req: Request, res: Response): Promise<void> {

    const { userName, hashedPassword } = req.body;
    const existingUser: IUser | null = await UserModel.findOne({ userName });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const user = new UserModel({ userName, hashedPassword });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
}
export async function logIn(req: Request, res: Response): Promise<void> {
   try{
     
     const { userName, password } = req.body;
     console.log(userName, password);
     if (!userName || !password) {
       res.status(400).json({ message: "Missing username or password" });
       return;
     }
     const existingUser :IUser | null  = await UserModel.findOne({ userName });
     if (!existingUser ||!await existingUser.comparePassword(password)) {
       res.status(401).json({ message: "Incorrect username or password" });
      return;
    }
    else{
      console.log(existingUser);
      
      const token = jsonwebtoken.sign(
        { userId: existingUser._id },
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
