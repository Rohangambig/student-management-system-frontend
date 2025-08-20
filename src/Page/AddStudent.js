import NavBar from "../component/NavBar";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import '../Styles/AddStudent.css'

const STORE_STUDENT = gql`
  mutation (
    $name: String!
    $email: String!
    $branch: String!
    $section: String!
    $batch: Int!
  ) {
    insertStudent(
      name: $name
      email: $email
      branch: $branch
      section: $section
      batch: $batch
    ) {
      id
      name
      email
      branch
      section
      batch
    }
  }
`;

function AddStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("");
  const [section, seSection] = useState("");
  const [Batch, setBatch] = useState("");

  const [insertStudent] = useMutation(STORE_STUDENT);

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      await insertStudent({
        variables: {
            name,
            email,
            branch,
            section,
            batch: parseInt(Batch),
        },
      });

      alert("data submited successfully...");
      window.location.href='/'
      setName("");
      setEmail("");
      setBranch("");
      seSection("");
      setBatch("");
    } catch (err) {
      console.log("Error in storing the data", err.message);
    }
  };

  return (
    <div className="container">
      <NavBar></NavBar>
      <form onSubmit={handlesubmit}>
        <h1>Add Student</h1>
        <div>
          <p>Name</p>
          <input    
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="John Doe"
          ></input>
        </div>
        <div>
          <p>EmailID</p>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            placeholder="abc@example.com"
          ></input>
        </div>
        <div>
          <p>Branch</p>
          <input
            value={branch}
            onChange={(e) => {
              setBranch(e.target.value);
            }}
            type="text"
            placeholder="CSE"
          ></input>
        </div>
        <div>
          <p>Section</p>
          <input
            value={section}
            onChange={(e) => {
              seSection(e.target.value);
            }}
            type="text"
            placeholder="A"
          ></input>
        </div>
        <div>
          <p>Batch</p>
          <input
            value={Batch}
            onChange={(e) => {
              setBatch(e.target.value);
            }}
            type="text"
            placeholder="2021"
          ></input>
        </div>
        <input type="submit"></input>
      </form>
    </div>
  );
}

export default AddStudent;
