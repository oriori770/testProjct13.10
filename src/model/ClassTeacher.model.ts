import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import StudentSchema , { IStudent } from "./Student.model";

export interface IClassTeacher extends Document {
  className: string;
  teacherName: string;
  email: string;
  // students: IStudent[];
  hashedPassword: string;
  comparePassword(password:string):Promise<boolean>
}

const classTeacherSchema: Schema = new Schema({
  className: { type: String, required: true, unique: true },
  teacherName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // students: [StudentSchema],
  hashedPassword: { type: String, required: true },
});

classTeacherSchema.pre<IClassTeacher>("save", async function (next) {
  if (!this.isModified("hashedPassword")) return next();
  this.hashedPassword = await bcrypt.hash(this.hashedPassword, 10);
  next();
});


classTeacherSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.hashedPassword);
};

// Export the model
export default mongoose.model<IClassTeacher>("classTeacher", classTeacherSchema);
