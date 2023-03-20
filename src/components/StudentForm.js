import React, { useState } from "react";
import StudentCard from "./StudentCard";

function StudentForm({ student }) {
    const [showStudentInfo, setShowStudentInfo] = useState(false)
    const birthday = new Date(student.birthday).toLocaleDateString('en-US', {timeZone: 'UTC'});

    function handleStudentInfoClick() {
        setShowStudentInfo(!showStudentInfo);
    }

    function handleStudentDelete() {
        fetch(`http://localhost:9292/students/${student.id}`, {
            method: "DELETE",
        });
    }

    return(
        <div className="student-form-student">
            <div className="student-form-info">
                {showStudentInfo ? <><p>&nbsp;</p></> : (
                    <>
                        <p>{student.first_name} {student.last_name}</p>
                        <p>{student.age}</p>
                        <p>{birthday}</p>
                        <p>{student.academic_standing}</p>
                    </>
                )}               
            </div>
            <div className="student-form-btns">
                <button onClick={handleStudentInfoClick} className="student-form-btns-indiv">
                    {showStudentInfo ? "Hide Student Info" : "Show Student Info"}
                </button>
                <button id={student.id} className="student-form-btns-indiv" onClick={handleStudentDelete}>Delete Student</button>
                {/* deletes the student from the DB */}
            </div>
            <div className="student-form-info">
                {showStudentInfo && <StudentCard student={student}/>}
            </div>

        </div>
    )
}

export default StudentForm;