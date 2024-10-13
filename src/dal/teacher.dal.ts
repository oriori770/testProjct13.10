import StudentModel, { IGrade } from "../model/Student.model";
export async function GettingMyStudentGrades(studentName: string, teacherId: string): Promise<IGrade[]> {
    const student :any = await StudentModel.findOne({studentName, className: teacherId}).select("grades");
    // console.log(student[0].grades, studentName, teacherId);
    if(student) return student.grades  as IGrade[] 
    else throw new Error("student not found");
}
export async function GetGradeAverageByNameFromDb(id: string): Promise<any[]> {
    console.log(id);
    const classgradeAverage = await StudentModel.aggregate([
        { $match: { className: id } },
      
        // { $unwind: "$grades" },
  
        {
          $group: {
            _id: "$className", 
            averageGrade: { $avg: "$grades.grade" } 
          }
        },
        {$group: {_id: "$studentName", average: {$avg: "$grades.grade"}}}
])
    

    return classgradeAverage;
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


// async function getAverageGradeByClassId(classId: mongoose.Types.ObjectId): Promise<number | null> {
//   try {
//     const result = await Student.aggregate([
//       // שלב 1: סינון התלמידים לפי ה-className
//       { $match: { className: classId } },
      
//       // שלב 2: "פיצוץ" המערך של הציונים לכל תלמיד
//       { $unwind: "$grades" },

//       // שלב 3: חישוב ממוצע הציונים לכל הכיתה
//       {
//         $group: {
//           _id: "$className", // קיבוץ לפי הכיתה
//           averageGrade: { $avg: "$grades.grade" } // חישוב ממוצע של השדה grade
//         }
//       }
//     ]);

//     if (result.length > 0) {
//       return result[0].averageGrade;
//     } else {
//       return null; // אם אין תוצאות
//     }
//   } catch (error) {
//     console.error("Error calculating average grade with aggregation: ", error);
//     return null;
//   }
// }



