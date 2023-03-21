import React, { useState } from "react";

function NewStudentForm({ onAddStudent, showNewStudentForm, setShowNewStudentForm }) {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        student_pic: "",
        pronouns: "",
        age: "",
        birthday: "",
        academic_standing: "",
        hobby: "",
        allergies: "",
        e_contact_name: "",
        e_contact_relationship: "",
        e_contact_number: ""
    })

    function handleChange(event) {
        console.log("this is being change: ", event.target.value)
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    function handleStudentSubmit(e) {
        e.preventDefault();
        console.log('student form was submitted', formData)
        fetch("http://localhost:9292/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name: formData.first_name,
                last_name: formData.last_name,
                student_pic: formData.student_pic,
                pronouns: formData.pronouns,
                age: formData.age,
                birthday: formData.birthday,
                academic_standing: formData.academic_standing,
                hobby: formData.hobby,
                allergies: formData.allergies,
                e_contact_name: formData.e_contact_name,
                e_contact_relationship: formData.e_contact_relationship,
                e_contact_number: formData.e_contact_number,
            }),
        })
            .then((r) => r.json())
            .then((newStudent) => {
                onAddStudent(newStudent);
                setShowNewStudentForm(!showNewStudentForm);
            });
    }

    return(
        <div>
            <h1>new student from</h1>
            <form autoComplete="off" onSubmit={handleStudentSubmit}>
                <fieldset>
                    <legend>Add a new student to your roster</legend>
                    
                    <div>
                        <label htmlFor="firstname">First name: *</label>
                        <input required type="text" id="firstname" name="first_name" value={formData.first_name} onChange={handleChange}/>
                    </div>
                    
                    {/* student last name */}
                    <div>
                        <label htmlFor="lastname">Last name: *</label>
                        <input required type="text" id="lastname" name="last_name" value={formData.last_name} onChange={handleChange} />
                    </div>

                    {/* Student photo */}
                    <div>
                        <label htmlFor="studentpic">Student photo: </label>
                        <input type="url" name="student_pic" id="studentpic" placeholder="https://example.com" value={formData.student_pic} onChange={handleChange} />
                    </div>

                    {/* Student pronounds*/}
                    <div>
                        <label htmlFor="pronouns">Student's preferred pronouns: </label>
                        <input type="text" name="pronouns" id="pronouns" placeholder="[optional]" value={formData.pronouns} onChange={handleChange} />
                    </div>

                    {/* Student Age */}
                    <div>
                        <label htmlFor="age">Student's Age: *</label>
                        <input required type="number" name="age" id="age" placeholder="ex: 7-25" value={formData.age} onChange={handleChange} />
                    </div>

                    {/* Student Birthday */}
                    <div>
                        <label htmlFor="birthday">Student's Birthday: *</label>
                        <input required type="date" id="birthday" name="birthday" value={formData.birthday} onChange={handleChange} />
                    </div>

                    {/* Student Academic Standing */}
                    <div>
                        <label htmlFor="academicstanding">Current academic standing: *</label>
                        <select required id="academicstanding" name="academic_standing" value={formData.academic_standing} onChange={handleChange}>
                            <option disabled value="">Choose from the list...</option>
                            <option value="Good Standing">Good Standing</option>
                            <option value="Warning">Warning</option>
                            <option value="Probation">Probation</option>
                        </select>
                    </div>

                    {/* Student Hobby */}
                    <div>
                        <label htmlFor="hobby">Do they have a hobby? </label>
                        <input type="text" id="hobby" name="hobby" value={formData.hobby} onChange={handleChange} />
                    </div>

                    {/* Student Allergies */}
                    <div>
                        <label htmlFor="allergies">Any allergies? </label>
                        <input type="text" id="allergies" name="allergies" value={formData.allergies} onChange={handleChange} />
                    </div>

                    {/* Emergency Contact Name */}
                    <div>
                        <label htmlFor="econtactname">Who is their emergency contact? </label>
                        <input type="text" id="econtactname" name="e_contact_name" value={formData.e_contact_name} onChange={handleChange} />
                    </div>

                    {/* Emergency Contact Relationship */}
                    <div>
                        <label htmlFor="econtactrelation">What is their relation to the student? </label>
                        <input type="text" id="econtactrelation" name="e_contact_relationship" value={formData.e_contact_relationship} onChange={handleChange} />
                    </div>

                    {/* Emergency Contact Number */}
                    <div>
                        <label htmlFor="econtactnumber">What is their number? </label>
                        <input type="text" id="econtactnumber" name="e_contact_number" value={formData.e_contact_number} onChange={handleChange} />
                    </div>

                    <div>
                        <button type="submit">Add student to roster</button>
                        <button>cancel</button>
                    </div>

                </fieldset>
            </form>
        </div>
    )
}

export default NewStudentForm;