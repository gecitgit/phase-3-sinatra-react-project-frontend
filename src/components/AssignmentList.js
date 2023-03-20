import React from "react";
import AssignmentRow from "./AssignmentRow";

function AssignmentList({ assignments }) {
    return (
        <div>
            <p>hello</p>
            <p>from the assignment list</p>
            <ul>
                {assignments.map((assignment) => (
                <AssignmentRow key={assignment.id} assignment={assignment} />
                ))}
            </ul>
            
        </div>
    )
}

export default AssignmentList;