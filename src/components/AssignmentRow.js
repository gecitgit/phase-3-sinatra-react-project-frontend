import React, { useState } from "react";
import EditAssignmentForm from "./EditAssignmentForm";

function AssignmentRow({ assignment, onAssignmentDelete, onAssignmentEdit }){
    const [editing, setEditing] = useState(false);

    function handleToggle() {
        setEditing(!editing);
    }

    function handleDelete() {
        fetch(`http://localhost:9292/students/${assignment.student_id}/assignments/${assignment.id}`, {
            method: "DELETE",
        })
        .then(response => {
            if (response.ok) {
                onAssignmentDelete(assignment)
            } else {
                console.log("Delete request failed.")
            }
        })
    }

    return (
        <li>
            
            {editing ? (
                <EditAssignmentForm 
                    assignment={assignment} 
                    editing={editing}
                    setEditing={setEditing}
                    onAssignmentEdit={onAssignmentEdit}
                />
            ) : (
                <div className="assignment-row-container">
                <div className="assignment-row">
                    <p>Course: <br/>{assignment.course}</p>
                    <p>Assignment Type: <br/>{assignment.assignment_type}</p>
                    <p>Due Date: <br/>{new Date(assignment.due_date).toLocaleDateString('en-US', {timeZone: 'UTC'})}</p>
                    <p>Submitted? <br/>{assignment.submitted ? "YES" : "NO"}</p>
                    <p>On time? <br/>{assignment.on_time ? "YES" : "NO"}</p>
                    <p>Score: <br/>{assignment.score}</p>
                    <p>Notes: <br/>{assignment.notes}</p>
                </div>
                <div>
                    <button onClick={handleToggle} className="modify-btns">Edit Assignment</button>
                    <button onClick={handleDelete} className="delete-btns">Delete Assignment</button>
                </div>
                </div>
                
            )}
        </li>
    )
}

export default AssignmentRow;