import React, { useState } from "react";
import StudentForm from "./StudentForm";
import StudentListHeader from "./StudentListHeader";

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
            </ul>
        </div>
    )
}

export default StudentList;