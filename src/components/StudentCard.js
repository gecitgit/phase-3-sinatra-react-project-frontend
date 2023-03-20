import React from "react";
import AssignmentList from "./AssignmentList";


function StudentCard({ student }){
    function handleEditStudentClick(){
        
    }


    console.log('this is assignments:', student.assignments)
    return (
        <div className="student-card">
            <h1>{student.first_name} {student.last_name}</h1>
            <div className="student-card-details">
                <img src={student.student_pic} alt={`${student.first_name} ${student.last_name}`}/>
                <div className="student-card-details-text">
                    <div className="student-card-details-text-personal">
                        <h4>Student Details</h4>
                        <p><strong>Pronouns: </strong>{student.pronouns}</p>
                        <p><strong>Age: </strong>{student.age}</p>
                        <p><strong>Birthday: </strong>{new Date(student.birthday).toLocaleDateString('en-US', {timeZone: 'UTC'})}</p>
                        <p><strong>Hobby: </strong>{student.hobby}</p>
                        <p><strong>Allergies: </strong>{student.allergies}</p>
                        <p><strong>Academic Standing: </strong>{student.academic_standing}</p>
                    </div>
                    <div className="student-card-emergency">
                        <h4>Emergency Contact Info</h4>
                        <p><strong>Name: </strong>{student.e_contact_name}</p>
                        <p><strong>Relationship: </strong>{student.e_contact_relationship}</p>
                        <p><strong>Phone Number: </strong>{student.e_contact_number}</p>
                    </div>
                </div>
                
            </div>
            
            
            <button>Edit Student</button>
            <AssignmentList assignments={student.assignments}/>
        </div>
    )
}

export default StudentCard;