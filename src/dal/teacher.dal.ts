import StudentModel, { IGrade } from "../model/Student.model";
export async function GettingMyStudentGrades(studentName: string, teacherId: string): Promise<IGrade[]> {
    const student :any = await StudentModel.findOne({studentName, className: teacherId}).select("grades");
    // console.log(student[0].grades, studentName, teacherId);
    if(student) return student.grades  as IGrade[] 
    else throw new Error("student not found");
}
export async function GetGradeAverageByNameFromDb(id: string): Promise<any> {
    console.log(id);
        try {
            // שליפת כל הסטודנטים שמשויכים ל-classId
            const students = await StudentModel.find({ className: id });
        
            if (students.length === 0) {
              return null; 
            };
        
            let totalGrades = 0;
            let totalSubjects = 0;
        
            students.forEach(student => {
              student.grades.forEach(grade => {
                totalGrades += grade.grade;
                totalSubjects += 1;
              });
            });
        
            const averageGrade = totalGrades / totalSubjects;
        
            return averageGrade;
          } catch (error) {
            console.error("Error calculating average grade: ", error);
            return null;
          }
}
export async function addStudentGradeToDb(studentName: string, subject: string, comment: string, grade: string): Promise<number> {
    return 5;
}
export async function getFullInfoClass(className: string): Promise<number[]> {
    return [5];
}
export async function changeGradeStudentAtDb(studentName: string, newGrade: string): Promise<number> {
    return 5;
}







