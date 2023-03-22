import React, { useState } from "react";
import AssignmentRow from "./AssignmentRow";
import NewAssignmentForm from "./NewAssignmentForm";

function AssignmentList({ student, onStudentUpdate, onNewAssignment, onAssignmentDelete, onAssignmentEdit }) {
    const [makeNew, setMakeNew] = useState(false);   

    function toggleMakeNew(e) {
        e.preventDefault();
        setMakeNew(!makeNew)
    }

    const assignmentsCopy = [...student.assignments];

    return (
        <div>
            <ul>
                {assignmentsCopy.map((assignment) => (
                <AssignmentRow key={assignment.id} assignment={assignment} onAssignmentDelete={onAssignmentDelete} onAssignmentEdit={onAssignmentEdit}/>
                ))}
                {makeNew ? (
                    <>
                    <button onClick={toggleMakeNew} className="cancel-btns">cancel</button>
                    <NewAssignmentForm 
                        student={student}
                        onStudentUpdate={onStudentUpdate}
                        makeNew={makeNew}
                        setMakeNew={setMakeNew}
                        onNewAssignment={onNewAssignment}    
                    />
                    </>
                ) : (
                    <button onClick={toggleMakeNew} className="modify-btns">+ Create an assignment</button>
                )}
            </ul>
        </div>
    )
}

export default AssignmentList;