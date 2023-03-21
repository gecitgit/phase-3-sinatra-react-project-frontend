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

  function handleDeleteStudent(id) {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
  }

  function handleStudentEdit(updatedStudentObj, newAssignment, studentId) {
    const updatedStudents = students.map((student) => {
      if (student.id === updatedStudentObj.id) {
        const updatedStudent = {
          ...updatedStudentObj,
          assignments: newAssignment ? [...updatedStudentObj.assignments, newAssignment] : updatedStudentObj.assignments
        };
        return updatedStudent;
      } else {
        return student;
      }
    });

    if (newAssignment) {
      const studentIndex = updatedStudents.findIndex((student) => student.id === studentId);
      if (studentIndex !== -1) {
        const updatedStudent = {
          ...updatedStudents[studentIndex],
          assignments: [...updatedStudents[studentIndex].assignments, newAssignment], 
        };
        updatedStudents[studentIndex] = updatedStudent;
      }
    }
    setStudents(updatedStudents);
  }


  //This function goes through the current 'students' and for each student will check to see if the student's id matches the owner of the deleted assignment.  If it does then the student is updated by using filter to return all but the matching id's.  If the current student being checked does not match the deletedAssignmentOwner then it is returned to the array unchanged.  That new array is then being passed through setStudents to update the state variable.
  function handleAssignmentDelete(assignment) {
    const deletedAssignmentId = assignment.id;
    const deletedAssignmentOwner = assignment.student_id;
    const updatedAssignments = students.map(student => {
      if (student.id === deletedAssignmentOwner) {
        const updatedStudent = {...student};
        updatedStudent.assignments = student.assignments.filter(a => a.id !== deletedAssignmentId);
        return updatedStudent;
      }
      return student;
    });
    setStudents(updatedAssignments);
  }

  //This function is for editing an already existing assignment
  function handleAssignmentEdit(updatedAssignment){
    // console.log("this is the editedAssignment from App: ", assignmentFormData)
    const updatedAssignmentId = updatedAssignment.id;
    const updatedAssignmentOwner = updatedAssignment.student_id;

    const updatedStudents = students.map((student) => {
      if (student.id === updatedAssignmentOwner) {
        const updatedAssignments = student.assignments.map((assignment) => {
          if (assignment.id === updatedAssignmentId) {
            return {
              ...assignment,
              ...updatedAssignment,
            };
          }
          return assignment;
        });
        return {
          ...student,
          assignments: updatedAssignments,
        };
      }
      return student;
    });
    setStudents(updatedStudents);
  }


  function handleNewAssignment(newAssignment) {
    const updatedStudents = students.map((student) => {
      if (student.id === newAssignment.student_id) {
        return {
          ...student,
          assignments: [...student.assignments, newAssignment],
        };
      } else {
        return student;
      }
    });
    setStudents(updatedStudents);
  }


  return (
    <div className="App">
      <h1>Phase 3 Project</h1>
      <h3>Buckle up!</h3>
      <StudentList 
        students={students} 
        onStudentDelete={handleDeleteStudent} 
        onStudentUpdate={handleStudentEdit} 
        onNewAssignment={handleNewAssignment}
        onAssignmentDelete={handleAssignmentDelete}
        onAssignmentEdit={handleAssignmentEdit}
      />
      {showNewStudentForm ? (
        <>
        <button onClick={handleNewStudentButton}>cancel new student</button>
        <NewStudentForm 
          onAddStudent={handleAddStudent}
          showNewStudentForm={showNewStudentForm}
          setShowNewStudentForm={setShowNewStudentForm}
        />
        </>
      ) : (
        <button onClick={handleNewStudentButton}>add student</button>
      )}
    </div>
  )
}

export default App;
