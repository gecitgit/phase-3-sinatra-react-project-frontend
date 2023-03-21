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
        console.log("submit was pressed!", formData)
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
                console.log('this is newAssignment: ', newAssignment)

            }))
        // here is where the POST is going to live
    }

    function handleChange(event) {
        console.log('this is the new assignment form: ', formData)
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }
    
    
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                <legend>Enter a new Assignment!</legend>

                <div>
                    <label>Course: </label>
                    <input required type="text" id="course" name="course" value={formData.course} onChange={handleChange} />
                </div>

                <div> 
                    <label>Assignment type</label>
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
                    <label htmlFor="due_date">Due Date:</label>
                    <input required type="date" id="due_date" name="due_date" value={formData.due_date} onChange={handleChange}/>
                </div>


                <div>
                    <label>Was the work submitted?</label>
                    <select required id="submitted" name="submitted" value={formData.submitted} onChange={handleChange}>
                        <option disabled value="">Choose...</option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </div>

                <div>
                    <label>Was the work on time?</label>
                    <select required id="on_time" name="on_time" value={formData.on_time} onChange={handleChange}>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </div>

                <div>
                    <label>Assignment score: </label>
                    <input required type="number" placeholder="0-100" id="score" name="score" value={formData.score} onChange={handleChange} />
                </div>

                <div>
                    <label>Any additional notes: </label>
                    <textarea type="text" id="notes" name="notes" placeholder="write more stuff please" rows="4" cols="75" value={formData.notes} onChange={handleChange} />
                </div>

                <div>
                    <button type="submit">Add assignment!</button>
                    <button onClick={() => setMakeNew(!makeNew)}>cancel</button>
                </div>

                </fieldset>
            </form>
        </div>
    )
}

export default NewAssignmentForm;