import React from "react";
import AssignmentList from "./AssignmentList";


function StudentCard({ student }){
    console.log('this is assignments:', student.assignments)
    return (
        <div className="student-card">
            <h1>{student.first_name} {student.last_name}</h1>
            <h2>Pronouns: {student.pronouns}</h2>
            <h4>Age: {student.age}</h4>
            <h4>Birthday: {new Date(student.birthday).toLocaleDateString()}</h4>
            <img src={student.student_pic} alt={`${student.first_name} ${student.last_name}`}/>
            <p><strong>Hobby: </strong>{student.hobby}</p>
            <p><strong>Allergies: </strong>{student.allergies}</p>
            <p><strong>Academic Standing: </strong>{student.academic_standing}</p>
            <div className="student-card-emergency">
                <h3>Emergency Contact Info</h3>
                <p><strong>Name: </strong>{student.e_contact_name}</p>
                <p><strong>Relationship: </strong>{student.e_contact_relationship}</p>
                <p><strong>Phone Number: </strong>{student.e_contact_number}</p>
            </div>
            <button>Edit Student</button>
            <AssignmentList assignments={student.assignments}/>
        </div>
    )
}

export default StudentCard;