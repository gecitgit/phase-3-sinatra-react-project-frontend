import React, { useEffect , useState } from "react";
import { Route, Routes } from "react-router-dom";
import NewAssignmentform from "./NewAssignmentForm";
import StudentList from "./StudentList";


function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/students")
      .then((r) => r.json())
      .then((data) => setStudents(data));
  }, []);


  return (
    <div className="App">
      <h1>Phase 3 Project</h1>
      <h3>Buckle up!</h3>
      <StudentList students={students}/>
      {/* <NewAssignmentform /> */}
      <button className="add-student-button" onClick={(() => console.log('add student was clicked'))}>
                        <span>+</span>
      </button>
    </div>
    
  );
}

export default App;
