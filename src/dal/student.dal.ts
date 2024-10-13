import StudentModel, {IStudent, IGrade} from "../model/Student.model"; 

export async function receivingAStudentGradeById(studentId: string): Promise<IGrade[]> {
    console.log(studentId);
    
    const student = await StudentModel.findById(studentId).select("grades");
    if(student) return student.grades   
    else throw new Error("student not found");
}
