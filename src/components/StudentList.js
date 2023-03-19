import React from "react";
import StudentForm from "./StudentForm";
import StudentListHeader from "./StudentListHeader";
import NewStudentForm from "./NewStudentForm";

function StudentList({ students }){
    return(
        <div className="student-list-container">
            <StudentListHeader />
            <ul>
                {students.map((student) => (
                    <li key={student.id}>
                        <StudentForm student={student}/>
                    </li>
                ))}
                <li>
                    <button className="add-student-button" onClick={(() => console.log('add student was clicked'))}>
                        <span>+</span>
                    </button>
                </li>
            </ul>
            <NewStudentForm />

        </div>
    )

}

export default StudentList;