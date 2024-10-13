import mongoose, { Document, Schema, Types } from "mongoose";
import classTeacherSchema, {IClassTeacher} from "./ClassTeacher.model"
import bcrypt from "bcrypt";

export interface IStudent extends Document {
  studentName: string;
  email: string;
  className: Types.ObjectId;
  grades: IGrade[];
  hashedPassword: string;
  comparePassword(password:string):Promise<boolean>

}
export interface IGrade {
  subject: string;
  comment: string;
  grade: number;
}

const GradeSchema: Schema = new Schema({
  subject: { type: String, required: [true, "Subject is required"] },
  comment: { type: String, required: [true, "Comment is required"] },
  grade: { type: Number, required: true, min: [0,"Grade must be between 0 and 100"], max: [100, "Grade must be between 0 and 100"] },
});

const StudentSchema: Schema = new Schema({
  studentName: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: [true, "Password is required"] },
  email: { type: String, required: true, unique: true },
  className: { type: Schema.Types.ObjectId, ref: "classTeacher" , required: [true, "Class name is required"] },
  grades: [GradeSchema],
});

StudentSchema.pre<IStudent>("save", async function (next) {
  if (!this.isModified("hashedPassword")) return next();
  this.hashedPassword = await bcrypt.hash(this.hashedPassword, 10);
  next();
});


StudentSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.hashedPassword);
};

// Export the model
export default mongoose.model<IStudent>("student", StudentSchema);
