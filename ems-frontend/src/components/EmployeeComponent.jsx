import React, { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import { listDeprtments } from "../services/DepartmentServices";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigator = useNavigate();
  const { id } = useParams();
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: ""
  });

  useEffect(() =>{

        getDepartments();
  }, [])

      const getDepartments=()=>{
        listDeprtments().then((response) =>{
            setDepartments(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName || "");
          setLastName(response.data.lastName || "");
          setEmail(response.data.email || "");
          setDepartmentId(response.data.departmentId || "");
        }).catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const employee = {firstName, lastName, email, departmentId};
      
      if (id) {
        updateEmployee(id, employee)
          .then((resonse) => {
            navigator("/employees");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log(employee);
        createEmployee(employee).then((response) => {
          console.log(response.data);
          navigator("/employees");
        });
      }
    }
  };

  const validateForm = () => {
    let valid = true;

    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First name is required";
      valid = false;
    }
    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last name is required";
      valid = false;
    }
    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }
    if(departmentId){
      errorsCopy.department = '';
    }else{
      errorsCopy.department = "Select Department"
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  };

  const pagetitle = () => {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="card">
          {pagetitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee First Name"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
                {errors.firstName && (
                  <div className="invalid-feedback"> {errors.firstName} </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee Last Name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
                {errors.lastName && (
                  <div className="invalid-feedback"> {errors.lastName} </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  placeholder="Enter Employee Email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                {errors.email && (
                  <div className="invalid-feedback"> {errors.email} </div>
                )}
              </div>
                <div className="form-group mb-2">
                <select className={`form-control ${errors.department ? "is-invalid" : ""}`} value={departmentId} onChange={(e)=> setDepartmentId(e.target.value)}>
                    <option value="Select Department">Select Department</option>
                    {departments?.map(department =>
                      <option key={department.id}  value={department.id}>{department.departmentName}</option>
                    )}
                </select>
                {errors.department && (
                  <div className="invalid-feedback"> {errors.department} </div>
                )}
              </div>
              <button
                className="btn btn-success"
                onClick={saveOrUpdateEmployee}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
