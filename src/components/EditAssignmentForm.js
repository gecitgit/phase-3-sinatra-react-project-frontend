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
            <form onSubmit={handleSubmit} className="edit-assignment-form">
                <fieldset>
                    <legend>
                    <strong>Edit the Assignment</strong>
                    </legend>

                    <div>
                        <label htmlFor="coursename"><strong>Course: </strong></label>
                        <input 
                            type="text"
                            id="coursename"
                            name="course"
                            value={assignmentFormData.course}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="assignmenttype"><strong>Assignment Type: </strong></label>
                        <select 
                            type="text"
                            id="assignmenttype"
                            name="assignment_type"
                            value={assignmentFormData.assignment_type}
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
                        <label htmlFor="duedatetime"><strong>Due Date: </strong></label>
                        <input
                            type="date"
                            id="duedatetime"
                            name="due_date"
                            defaultValue={new Date(assignment.due_date).toISOString().slice(0, 10)}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label><strong>Was the work submitted? </strong></label>
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
                        <label><strong>Was the work on time? </strong></label>
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
                        <label><strong>Assignment score: </strong></label>
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
                        <label><strong>Any additional notes: </strong></label>
                        <input
                            type="text"
                            id="notes"
                            name="notes"
                            placeholder="Add some feedback!"
                            value={assignmentFormData.notes}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <button className="modify-btns" type="submit">Save Changes</button>
                        <button className="cancel-btns" onClick={() => (setEditing(!editing))}>cancel</button>
                    </div>


                </fieldset>
            </form>
        </div>
    )
}

export default EditAssignmentForm;