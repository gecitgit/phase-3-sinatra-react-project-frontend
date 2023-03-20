import React, { useState } from "react";
import EditAssignmentForm from "./EditAssignmentForm";
import NewAssignmentForm from "./NewAssignmentForm";

function AssignmentRow({ assignment }){
    const [editing, setEditing] = useState(false);

    function handleEdit() {
        setEditing(true);
    }

    function handleSaveChanges() {
        setEditing(false);
    }

    function handleDelete() {
        console.log('delete pressed')
    }

    return (
        <li>
            
            {editing ? (
                <EditAssignmentForm assignment={assignment} handleSaveChanges={handleSaveChanges}/>
            ) : (
                <div className="assignment-row-container">
                <div className="assignment-row">
                    <p>Course: {assignment.course}</p>
                    <p>Assignment Type: {assignment.assignment_type}</p>
                    <p>Due Date: {new Date(assignment.due_date).toLocaleDateString('en-US', {timeZone: 'UTC'})}</p>
                    <p>Was it submitted? {assignment.submitted ? "YES" : "NO"}</p>
                    <p>On time? {assignment.on_time ? "YES" : "NO"}</p>
                    <p>Score: {assignment.score}</p>
                    <p>Notes: {assignment.notes}</p>
                </div>
                <div>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
                </div>
                
            )}
        </li>
    )
}

export default AssignmentRow;