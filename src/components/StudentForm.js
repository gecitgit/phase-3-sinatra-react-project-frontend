import React from "react";

function StudentForm({ student }) {
    // console.log("this is student in StudentForm", student);
    const birthday = new Date(student.birthday).toLocaleDateString();
    return(
        <div className="student-form-student">
            <div className="student-form-info">
                <p>{student.first_name} {student.last_name}</p>
                <p>{student.age}</p>
                <p>{birthday}</p>
                <p>{student.academic_standing}</p>
                
            </div>
            <div className="student-form-btns">
                <button className="student-form-btns-indiv">See Student Info</button>
                {/* see student will cause a popup to show all info */}
                <button className="student-form-btns-indiv">Delete Student</button>
                {/* deletes the student from the DB */}
            </div>
        </div>
    )
}

export default StudentForm;