import React from "react";

function StudentCard({ student }){
    return (
        <div>
            {/* <p>{selectedStudent.hobby}</p> */}
            <h2>{student.first_name} {student.last_name}</h2>
            <p>yo</p>
            <p>ok guy</p>
            <button>Edit Student</button>
            <button>Delete Student</button>
        </div>
    )
}

export default StudentCard;