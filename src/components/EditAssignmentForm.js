import React, { useState } from "react";

function EditAssignmentForm({ assignment, editing, setEditing, onAssignmentEdit }) {
    const [assignmentFormData, setAssignmentFormData] = useState({
        course: assignment.course,
        assignment_type: assignment.assignment_type,
        due_date: assignment.due_date,
        submitted: assignment.submitted,
        on_time: assignment.on_time,
        score: assignment.score,
        notes: assignment.notes,
    });

    function handleChange(event) {
        setAssignmentFormData({
            ...assignmentFormData,
            [event.target.name]: event.target.value,
        });
    }

    function handleSubmit(event){
        event.preventDefault();

        fetch(`http://localhost:9292/students/${assignment.student_id}/assignments/${assignment.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(assignmentFormData)
        })
            .then((response) => response.json())
            .then((updatedAssignment) => onAssignmentEdit(updatedAssignment));
            setEditing(!editing);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>
                    Edit Assignment
                    </legend>

                    <div>
                        <label htmlFor="coursename">Course: </label>
                        <input 
                            type="text"
                            id="coursename"
                            name="course"
                            value={assignmentFormData.course}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="assignmenttype">Assignment Type: </label>
                        <select 
                            type="text"
                            id="assignmenttype"
                            name="assignment_type"
                            value={assignment.assignment_type}
                            onChange={handleChange}
                        >
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
                        <label htmlFor="duedatetime">Due Date: </label>
                        <input
                            type="date"
                            id="duedatetime"
                            name="due_date"
                            defaultValue={new Date(assignment.due_date).toISOString().slice(0, 10)}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Was the work submitted? </label>
                        <select 
                            required
                            id="submitted"
                            name="submitted"
                            value={assignmentFormData.submitted}
                            onChange={handleChange}
                        >
                            <option disabled value="">Choose...</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>

                    <div>
                        <label>Was the work on time? </label>
                        <select
                            required
                            id="on_time"
                            name="on_time"
                            value={assignmentFormData.on_time}
                            onChange={handleChange}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>

                    <div>
                        <label>Assignment score: </label>
                        <input
                            required
                            type="number"
                            name="score"
                            placeholder="0-100"
                            value={assignmentFormData.score}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Any additional notes: </label>
                        <textarea 
                            name="notes"
                            placeholder="Add some feedback!"
                            rows="4"
                            cols="75"
                            value={assignmentFormData.notes}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <button type="submit">Save Changes</button>
                        <button onClick={() => (setEditing(!editing))}>cancel</button>
                    </div>


                </fieldset>
            </form>
        </div>
    )
}

export default EditAssignmentForm;