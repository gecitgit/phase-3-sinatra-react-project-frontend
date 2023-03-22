import React, { useState } from "react";
import AssignmentList from "./AssignmentList";


function StudentCard({ student, onStudentUpdate, onNewAssignment, onAssignmentDelete, onAssignmentEdit }){
    const [isEditing, setIsEditing] = useState(false);
    const [studentEditFormData, setStudentEditFormData] = useState({
        first_name: student.first_name,
        last_name: student.last_name,
        student_pic: student.student_pic,
        pronouns: student.pronouns,
        age: student.age,
        birthday: student.birthday,
        academic_standing: student.academic_standing,
        hobby: student.hobby,
        allergies: student.allergies,
        e_contact_name: student.e_contact_name,
        e_contact_relationship: student.e_contact_relationship,
        e_contact_number: student.e_contact_number
    })



    function handleEditStudentClick(){
        setStudentEditFormData(studentEditFormData);
        setIsEditing(!isEditing);
    }

    function handleChange(event) {
        setStudentEditFormData({
            ...studentEditFormData,
            [event.target.name]: event.target.value,
        });
    }

    function handleEditStudentSubmit(event){
        event.preventDefault();
        setIsEditing(!isEditing);

        fetch(`http://localhost:9292/students/${student.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(studentEditFormData)
        })
            .then((response) => response.json())
            .then((updatedStudent) => onStudentUpdate(updatedStudent));
    }



    return (
        <div className="student-card">
            {isEditing ? (
                <div className="student-card-pretty">
                <form>
                    <label className="edit-student-label">Name: </label>
                    <input style={{ fontSize: "32px", textAlign: "center", padding: "0px", margin: "0px"}} size={studentEditFormData.first_name.length-2} type="text" id="first_name" name="first_name" value={studentEditFormData.first_name} onChange={handleChange}/>
                    <input style={{ fontSize: "32px", textAlign: "center", padding: "0px", margin: "0px"}} size={studentEditFormData.last_name.length-2} type="text" id="last_name" name="last_name" value={studentEditFormData.last_name} onChange={handleChange}/>
                    <div className="student-card-details">
                        <div className="student-card-pic-box">
                            <img src={studentEditFormData.student_pic} alt={`${studentEditFormData.first_name} ${studentEditFormData.last_name}`}/>
                            <input type="text" id="student_pic" name="student_pic" value={studentEditFormData.student_pic} size={studentEditFormData.student_pic.length} style={{ marginTop: "5px" }} onChange={handleChange}/>
                        </div>                        
                            <div className="student-card-details-text">
                                <div className="student-card-details-text-personal">
                                    <h4>Student Details</h4>
                                    <div>
                                        <label><strong>Prounouns: </strong></label>
                                        <input type="text" id="pronouns" name="pronouns" value={studentEditFormData.pronouns} onChange={handleChange} />
                                    </div>
                                    

                                    <div>
                                        <label><strong>Age: </strong></label>
                                        <input type="text" id="age" name="age" value={studentEditFormData.age} onChange={handleChange}/>
                                    </div>
                                    
                                    <div>
                                        <label><strong>Birthday: </strong></label>
                                        <input type="date" id="birthday" name="birthday" value={new Date(studentEditFormData.birthday).toISOString().slice(0, 10)} onChange={handleChange}/>
                                    </div>

                                    <div>
                                        <label><strong>Hobby: </strong></label>
                                        <input type="text" id="hobby" name="hobby" value={studentEditFormData.hobby} onChange={handleChange} />
                                    </div>


                                    <div>
                                        <label><strong>Allergies: </strong></label>
                                        <input type="text" id="allergies" name="allergies" value={studentEditFormData.allergies} onChange={handleChange}/>
                                    </div>
                                    
                                    <div>
                                        <label><strong>Academic Standing: </strong></label>
                                        <input type="text" id="academic_standing" name="academic_standing" value={studentEditFormData.academic_standing} onChange={handleChange}/>
                                    </div>
                                </div>

                                <div className="student-card-emergency">
                                    <h4>Emergency Contact Info</h4>

                                    <div>
                                        <label><strong>Name: </strong></label>
                                        <input type="text" id="e_contact_name" name="e_contact_name" value={studentEditFormData.e_contact_name} onChange={handleChange}/>
                                    </div>

                                    <div>
                                        <label><strong>Relationship: </strong></label>
                                        <input type="text" id="e_contact_relationship" name="e_contact_relationship" value={studentEditFormData.e_contact_relationship} onChange={handleChange}/>
                                    </div>

                                    <div>
                                        <label><strong>Phone Number: </strong></label>
                                        <input type="text" id="e_contact_number" name="e_contact_number" value={studentEditFormData.e_contact_number} onChange={handleChange}/>
                                    </div>

                                </div>
                            </div>
                    </div>
                </form>
                </div>
            ) : (
                
                <div className="student-card-pretty">
                    <h1>{student.first_name} {student.last_name}</h1>
                    <div className="student-card-details">
                        <div className="student-card-pic-box">
                            <img src={student.student_pic} alt={`${student.first_name} ${student.last_name}`}/>
                            <p>{student.first_name}'s selfie!</p>
                        </div>                        
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
                </div>
                )
        }
        
        {isEditing ? (
            <>
                <button onClick={handleEditStudentClick} className="cancel-btns">cancel</button>
                <button onClick={handleEditStudentSubmit} className="modify-btns">Save Changes</button>
            </>
            
        ) : (
            <button onClick={handleEditStudentClick} className="modify-btns">Edit Student</button>
        )}
        <AssignmentList student={student} onStudentUpdate={onStudentUpdate} onNewAssignment={onNewAssignment} onAssignmentDelete={onAssignmentDelete} onAssignmentEdit={onAssignmentEdit} />
        </div>
    )
}

export default StudentCard;