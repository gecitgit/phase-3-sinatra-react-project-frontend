import React, { useState } from "react";
import StudentCard from "./StudentCard";

function StudentForm({ student, onStudentDelete, onStudentUpdate, onNewAssignment, onAssignmentDelete, onAssignmentEdit }) {
    const [showStudentInfo, setShowStudentInfo] = useState(false)
    const birthday = new Date(student.birthday).toLocaleDateString('en-US', {timeZone: 'UTC'});

    function handleStudentInfoClick() {
        setShowStudentInfo(!showStudentInfo);
    }

    function handleStudentDelete() {
        fetch(`http://localhost:9292/students/${student.id}`, {
            method: "DELETE",
        });
        onStudentDelete(student.id)
    }

    return(
        <div className="student-form-student">
            <div className="student-form-info">
                {showStudentInfo ? <><p></p></> : (
                    <>
                        <p>{student.first_name} {student.last_name}</p>
                        <p>{student.age}</p>
                        <p>{birthday}</p>
                        <p>{student.academic_standing}</p>
                    </>
                )}               
            </div>
            <div className="student-form-btns">
                <button onClick={handleStudentInfoClick} className="student-form-btns-indiv" id="sfb-toggle">
                    {showStudentInfo ? "Hide Student Info" : "Show Student Info"}
                </button>
                <button id="sfb-delete" className="student-form-btns-indiv" onClick={handleStudentDelete}>Delete Student</button>
                {/* deletes the student from the DB */}
            </div>
            <div className="student-form-info">
                {showStudentInfo && <StudentCard student={student} onStudentUpdate={onStudentUpdate} onNewAssignment={onNewAssignment} onAssignmentDelete={onAssignmentDelete} onAssignmentEdit={onAssignmentEdit}/>}
            </div>

        </div>
    )
}

export default StudentForm;