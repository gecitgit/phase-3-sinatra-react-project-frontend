import React from "react";  

function NewAssignmentForm() {
    
    function handleSubmit(event) {
        event.preventDefault();
        console.log("submit was pressed!")
        // here is where the POST is going to live
    }
    
    
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                <legend>Enter a new Assignment!</legend>

                <div> 
                    <label>Assignment type</label>
                    <select required id="hw_type">
                        <option>Test</option>
                        <option>Quiz</option>
                        <option>Lab</option>
                        <option>Project</option>
                        <option>Homework</option>
                        <option>Other</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="duedatetime">Due Date:</label>
                    <input type="date" id="duedatetime" name="duedatetime"/>
                </div>


                <div>
                    <label>Was the work submitted?</label>
                    <select required id="submitted">
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </div>

                <div>
                    <label>Was the work on time?</label>
                    <select required id="submitted">
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </div>

                <div>
                    <label>Assignment score: </label>
                    <input required type="number" placeholder="0-100" />
                </div>

                <div>
                    <label>Any additional notes: </label>
                    <textarea type="text" name="notes" placeholder="write more stuff bum" rows="4" cols="75" />
                </div>

                </fieldset>
            </form>
        </div>
    )
}

export default NewAssignmentForm;