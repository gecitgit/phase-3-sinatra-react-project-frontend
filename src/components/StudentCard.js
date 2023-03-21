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
        console.log("edit student was pressed")
        setStudentEditFormData(studentEditFormData);
        console.log('this is the updated student info, ', studentEditFormData)        
        setIsEditing(!isEditing);
        console.log('this is what uSTUDENTu looks like in StudentCard: ', student)
    }

    function handleChange(event) {
        setStudentEditFormData({
            ...studentEditFormData,
            [event.target.name]: event.target.value,
        });
    }

    function handleEditStudentSubmit(event){
        console.log('SUBMIT student was pressed')
        console.log('here is studentEditFormData', studentEditFormData)
        event.preventDefault();
        // setStudentEditFormData(studentEditFormData);
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


    // console.log('this is assignments:', student.assignments)

    return (
        <div className="student-card">
            {isEditing ? (
                <form>
                    <label>Name: </label>
                    <input type="text" id="first_name" name="first_name" value={studentEditFormData.first_name} onChange={handleChange}/>
                    <input type="text" id="last_name" name="last_name" value={studentEditFormData.last_name} onChange={handleChange}/>
                    <div className="student-card-details">
                        <div className="student-card-pic-container">
                            <img src={studentEditFormData.student_pic} alt={`${studentEditFormData.first_name} ${studentEditFormData.last_name}`}/>
                            <input type="text" value={studentEditFormData.student_pic} onChange={handleChange}/>
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
            ) : (
                
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
                </div>
                )
        }
        
        {isEditing ? (
            <>
                <button onClick={handleEditStudentSubmit}>Save Changes</button>
                <button onClick={handleEditStudentClick}>cancel</button>
            </>
            
        ) : (
            <button onClick={handleEditStudentClick}>Edit Student</button>
        )}
        <AssignmentList student={student} onStudentUpdate={onStudentUpdate} onNewAssignment={onNewAssignment} onAssignmentDelete={onAssignmentDelete} onAssignmentEdit={onAssignmentEdit} />
        </div>
    )



    // return (
    //     <div className="student-card">
    //         <h1>{student.first_name} {student.last_name}</h1>
    //         <div className="student-card-details">
    //             <img src={student.student_pic} alt={`${student.first_name} ${student.last_name}`}/>
    //             <div className="student-card-details-text">
    //                 <div className="student-card-details-text-personal">
    //                     <h4>Student Details</h4>
    //                     <p><strong>Pronouns: </strong>{student.pronouns}</p>
    //                     <p><strong>Age: </strong>{student.age}</p>
    //                     <p><strong>Birthday: </strong>{new Date(student.birthday).toLocaleDateString('en-US', {timeZone: 'UTC'})}</p>
    //                     <p><strong>Hobby: </strong>{student.hobby}</p>
    //                     <p><strong>Allergies: </strong>{student.allergies}</p>
    //                     <p><strong>Academic Standing: </strong>{student.academic_standing}</p>
    //                 </div>
    //                 <div className="student-card-emergency">
    //                     <h4>Emergency Contact Info</h4>
    //                     <p><strong>Name: </strong>{student.e_contact_name}</p>
    //                     <p><strong>Relationship: </strong>{student.e_contact_relationship}</p>
    //                     <p><strong>Phone Number: </strong>{student.e_contact_number}</p>
    //                 </div>
    //             </div>
                
    //         </div>
            
            
    //         <button onClick={handleEditStudentClick}>Edit Student</button>
    //         <AssignmentList assignments={student.assignments}/>
    //     </div>
    // )
}

export default StudentCard;