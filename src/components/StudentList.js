import React from "react";
import StudentForm from "./StudentForm";
import StudentListHeader from "./StudentListHeader";

function StudentList({ students, onStudentDelete, onStudentUpdate, onNewAssignment, onAssignmentDelete, onAssignmentEdit }){

    const studentsCopy = [...students]


    return(
        <div className="student-list-container">
            <StudentListHeader />
            <ul>
                {studentsCopy.map((student) => (
                    <li key={student.id}>
                        <StudentForm 
                            student={student}  
                            onStudentDelete={onStudentDelete} 
                            onStudentUpdate={onStudentUpdate} 
                            onNewAssignment={onNewAssignment}
                            onAssignmentDelete={onAssignmentDelete}
                            onAssignmentEdit={onAssignmentEdit}
                        />
                    </li>                    
                ))}
            </ul>
        </div>
    )
}

export default StudentList;