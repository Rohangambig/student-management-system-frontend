import NavBar from "../component/NavBar";
import { useEffect, useState } from "react";
import {gql,useMutation,useQuery} from "@apollo/client";
import { useParams } from "react-router-dom";
import '../Styles/Update.css'

const USER_GET = gql`
    query($studentId: ID!) {
    student(id: $studentId) {
        name
        email
        branch
        section
        batch
    }
}
`

const UPDATE_USER = gql`
  mutation(
    $updateStudentId: ID!
    $name: String
    $email: String
    $branch: String
    $section: String
    $batch: Int
  ) {
    updateStudent(
      id: $updateStudentId
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


export default function Update() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("");
  const [section, seSection] = useState("");
  const [Batch, setBatch] = useState("");

  const [update_student] = useMutation(UPDATE_USER);

  const {id} = useParams();

  const {data, loading, error} = useQuery(USER_GET,{
    variables:{studentId : id},
    skip:!id
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

        await update_student({
            variables:{
                updateStudentId:id,
                name,
                email,
                  branch,
                section,
                batch: parseInt(Batch),
            }
        });

        alert("data updated");
        window.location.href='/';
        setName("");
        setEmail("");
        setBranch("");
        seSection("");
        setBatch("");

    }catch(err) {
        console.log("Error in updating the data",err.message)
    }
  }

  useEffect(() => {
    if(data?.student) {
        setName(data.student.name);
        setEmail(data.student.email);
        setBranch(data.student.branch);
        seSection(data.student.section);
        setBatch(data.student.batch);
    }
  },[data])
    if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <NavBar></NavBar>
      <form onSubmit={handleSubmit}>
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
};
