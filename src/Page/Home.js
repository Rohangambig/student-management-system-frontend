import { useState } from "react";
import { useQuery, gql,useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import '../Styles/Home.css'
import * as XLSX from "xlsx";   
import { saveAs } from "file-saver"; 

// importing components
import NavBar from "../component/NavBar";

const GET_STUDENTS = gql`
  query {
    students {
      id
      name
      email
      branch
      section
      batch
    }
  }
`;

const DELETE_USER = gql`
    mutation($deleteStudentId: ID!) {
    deleteStudent(id: $deleteStudentId) {
        name
        email
        branch
        section
        batch
    }
}
`

function Home() {
const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_STUDENTS);
  const [searchName, setSearchName] = useState("");
  const [searchBranch, setBranch] = useState("");
  const [searchSection, setSection] = useState("");
  const [searchBatch, setBatch] = useState("");

  const [deleteUser] = useMutation(DELETE_USER);

  const filterStudent =
    data?.students.filter((student) => {
      return (
        (!searchName ||
          student.name.toLowerCase().includes(searchName.toLowerCase())) &&
        (!searchBranch ||
          student.branch.toLowerCase().includes(searchBranch.toLowerCase())) &&
        (!searchSection ||
          student.section.toLowerCase().includes(searchSection)) &&
        (!searchBatch || student.batch.toString().includes(searchBatch))
      );
    }) || [];

    const handleDelete = async (id) => {
        try {

        await deleteUser(
            {
                variables:{deleteStudentId:id},
                refetchQueries:[{query:GET_STUDENTS}],
                awaitRefetchQueries:true
            }
        )

        alert("user data deleted..")

        }catch(err) {
            console.log("Error in deleting the user record");
        }
    }

  const handleDownload = () => {
    if (filterStudent.length === 0) {
      alert("No student data to download!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(filterStudent);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(dataBlob, "students.xlsx");
  };


  return (
    <div className="container">
      <NavBar></NavBar>
      <div className="home-container">
        <h1>All students</h1>
        <div className="search-container">
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="name"
          ></input>
          <input
            type="text"
            value={searchBranch}
            onChange={(e) => setBranch(e.target.value)}
            placeholder="branch"
          ></input>
          <input
            type="text"
            value={searchSection}
            onChange={(e) => setSection(e.target.value)}
            placeholder="section"
          ></input>
          <input
            type="text"
            value={searchBatch}
            onChange={(e) => setBatch(e.target.value)}
            placeholder="batch"
          ></input>
          <button onClick={handleDownload}>Download</button>
        </div>
        <div>
          {loading && <p>loading...</p>}
          {error && <p>Error in fetching student details</p>}
          {!loading && !error && (
            <ul>
              {filterStudent.map((student) => (
                <li key={student.id}>
                  <div>{student.name} - {student.branch} - {student.section} -{" "}
                  {student.batch}</div>
                  <div>
                    <button onClick={() => navigate(`/edit/${student.id}`)}>edit</button>
                  <button onClick={() => handleDelete(student.id)}>delete</button>
                  </div>
                </li>
              ))}
              {filterStudent.length === 0 && <p>No students found.</p>}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
