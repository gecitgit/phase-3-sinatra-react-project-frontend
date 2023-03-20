import React, { useEffect , useState } from "react";
import { Route, Routes } from "react-router-dom";
import NewAssignmentform from "./NewAssignmentForm";
import NewStudentForm from "./NewStudentForm";
import StudentList from "./StudentList";


function App() {
  const [students, setStudents] = useState([]);
  const [showNewStudentForm, setShowNewStudentForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:9292/students")
      .then((r) => r.json())
      .then((data) => setStudents(data));
  }, []);

  function handleNewStudentButton() {
    setShowNewStudentForm(!showNewStudentForm);
  }

  function handleAddStudent(newStudent) {
    setStudents([...students, newStudent]);
  }

  return (
    <div className="App">
      <h1>Phase 3 Project</h1>
      <h3>Buckle up!</h3>
      <StudentList students={students}/>
      {showNewStudentForm ? (
        <>
        <button onClick={handleNewStudentButton}>cancel new student</button>
        <NewStudentForm onAddStudent={handleAddStudent} showNewStudentForm={showNewStudentForm} setShowNewStudentForm={setShowNewStudentForm}/>
        </>
      ) : (
        <button onClick={handleNewStudentButton}>add student</button>
      )}
    </div>
  )
}

export default App;
