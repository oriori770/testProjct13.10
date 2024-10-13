import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  userName: string;
  hashedPassword: string;
  comparePassword(password:string):Promise<boolean>

}

const UserSchema: Schema = new Schema({
  userName: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
});

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("hashedPassword")) return next();
  this.hashedPassword = await bcrypt.hash(this.hashedPassword, 10);
  next();
});


UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.hashedPassword);
};

// Export the model
export default mongoose.model<IUser>("User", UserSchema);
