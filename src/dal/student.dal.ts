import StudentModel, {IStudent, IGrade} from "../model/Student.model"; 

export async function GettingMyGrades(studentId: string): Promise<IGrade[]> {
    console.log(studentId);
    const student = await StudentModel.findById(studentId).select("grades");
    if(student) return student.grades   
    else throw new Error("student not found");
}
export async function GettingMyStudentGrades(studentName: string, teacherId: string): Promise<IGrade[]> {
    const student :any = await StudentModel.findOne({studentName, className: teacherId}).select("grades");
    // console.log(student[0].grades, studentName, teacherId);
    if(student) return student.grades  as IGrade[] 
    else throw new Error("student not found");
}
