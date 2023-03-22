import React, { useState } from "react";  

function NewAssignmentForm({ student, onStudentUpdate, makeNew, setMakeNew, onNewAssignment }) {
    const [formData, setFormData] = useState({
        course: "",
        assignment_type: "",
        due_date: "",
        submitted: "",
        on_time: "",
        score: "",
        notes: "",
        student_id: student.id
    })
    
    function handleSubmit(event) {
        event.preventDefault();
        fetch(`http://localhost:9292/students/${student.id}/assignments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
            .then((r) => r.json())
            .then((newAssignment => {
                onNewAssignment(newAssignment)
                setMakeNew(!makeNew)
            }))
        // here is where the POST is going to live
    }

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }
    
    
    
    return (
        <div>
            <form onSubmit={handleSubmit} className="edit-assignment-form">
                <fieldset>
                <legend>
                    <strong>Enter a new Assignment!</strong>
                </legend>

                <div>
                    <label><strong>Course: </strong></label>
                    <input required type="text" id="course" name="course" value={formData.course} onChange={handleChange} />
                </div>

                <div> 
                    <label><strong>Assignment type</strong></label>
                    <select required id="assignment_type" name="assignment_type" value={formData.assignment_type} onChange={handleChange}>
                        <option disabled value="">Choose from the list..</option>
                        <option>Test</option>
                        <option>Quiz</option>
                        <option>Lab</option>
                        <option>Project</option>
                        <option>Homework</option>
                        <option>Other</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="due_date"><strong>Due Date: </strong></label>
                    <input required type="date" id="due_date" name="due_date" value={formData.due_date} onChange={handleChange}/>
                </div>


                <div>
                    <label><strong>Was the work submitted? </strong></label>
                    <select 
                        required
                        id="submitted"
                        name="submitted"
                        value={formData.submitted}
                        onChange={handleChange}
                    >
                        <option disabled value="">Choose...</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <div>
                    <label><strong>Was the work on time? </strong></label>
                    <select
                        required
                        id="on_time"
                        name="on_time"
                        value={formData.on_time}
                        onChange={handleChange}
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>

                <div>
                    <label><strong>Assignment score: </strong></label>
                    <input required type="number" placeholder="0-100" id="score" name="score" value={formData.score} onChange={handleChange} />
                </div>

                <div>
                    <label><strong>Any additional notes: </strong></label>
                    <input type="text" id="notes" name="notes" placeholder="Add some feedback!" value={formData.notes} onChange={handleChange} />
                </div>

                <div>
                    <button type="submit" className="modify-btns">Add assignment!</button>
                </div>

                </fieldset>
            </form>
        </div>
    )
}

export default NewAssignmentForm;