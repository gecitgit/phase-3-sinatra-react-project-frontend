import React from "react";
import AssignmentRow from "./AssignmentRow";

function AssignmentList({ assignments }) {
    return (
        <div>
            <ul>
                {assignments.map((assignment) => (
                <AssignmentRow key={assignment.id} assignment={assignment} />
                ))}
            </ul>
        </div>
    )
}

export default AssignmentList;