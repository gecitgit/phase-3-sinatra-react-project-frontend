import React, { useState } from "react";
import EditAssignmentForm from "./EditAssignmentForm";
import NewAssignmentForm from "./NewAssignmentForm";

function AssignmentRow({ assignment, onAssignmentDelete, onAssignmentEdit }){
    const [editing, setEditing] = useState(false);

    function handleToggle() {
        setEditing(!editing);
    }
    // function handleEdit() {
    //     setEditing(true);
    // }

    // function handleSaveChanges() {
    //     setEditing(false);
    // }

    function handleDelete() {
        fetch(`http://localhost:9292/students/${assignment.student_id}/assignments/${assignment.id}`, {
            method: "DELETE",
        })
        .then(response => {
            if (response.ok) {
                onAssignmentDelete(assignment)
                console.log("this is deleted assignment: ", assignment)
                console.log('this is deleted assignment id: ', assignment.id)
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
                    <p>Course: {assignment.course}</p>
                    <p>Assignment Type: {assignment.assignment_type}</p>
                    <p>Due Date: {new Date(assignment.due_date).toLocaleDateString('en-US', {timeZone: 'UTC'})}</p>
                    <p>Was it submitted? {assignment.submitted ? "NO" : "YES"}</p>
                    <p>On time? {assignment.on_time ? "NO" : "YES"}</p>
                    <p>Score: {assignment.score}</p>
                    <p>Notes: {assignment.notes}</p>
                </div>
                <div>
                    <button onClick={handleToggle}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
                </div>
                
            )}
        </li>
    )
}

export default AssignmentRow;