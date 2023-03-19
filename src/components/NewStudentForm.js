import React from "react";

function NewStudentForm() {
    return(
        <div>
            <h1>new student from</h1>
            <form>
                <label>Student Name: </label>
                <input type="text"></input>
                <button>Add New Student</button>
                <button>cancel</button>
            </form>
        </div>
    )
}

export default NewStudentForm;