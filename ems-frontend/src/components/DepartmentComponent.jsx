import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { createDepartment, getDepartment, updateDepartment } from '../services/DepartmentServices';

const DepartmentComponent = () => {
    const [departmentName, setDepartmentName] = useState("");
    const [departmentDescription, setDepartmentDescription] = useState("");
    const navigator = useNavigate();
    const {id} = useParams();
    const [errors, setErrors] = useState({
        departmentName: '',
        departmentDescription: ''
    });
    
    useEffect(() => {
        if(id){
            getDepartment(id).then((response) =>{
                setDepartmentName(response.data.departmentName || "");
                setDepartmentDescription(response.data.departmentDescription || "");
            })
        }
    }, [id])

    const saveOrUpdateDepartment = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const department = {departmentName, departmentDescription};
      
      if (id) {
        updateDepartment(id, department)
          .then((resonse) => {
            navigator("/departments");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log(department);
        createDepartment(department).then((response) => {
          console.log(response.data);
          navigator("/departments");
        });
      }
    }
  };

    const validateForm = () => {
    let valid = true;

    const errorsCopy = { ...errors };

    if (departmentName.trim()) {
      errorsCopy.departmentName = "";
    } else {
      errorsCopy.departmentName = "Department name is required";
      valid = false;
    }
    if (departmentDescription.trim()) {
      errorsCopy.departmentDescription = "";
    } else {
      errorsCopy.departmentDescription = "Department description is required";
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  };

  const pagetitle = () => {
    if (id) {
      return <h2 className="text-center">Update Department</h2>;
    } else {
      return <h2 className="text-center">Add Department</h2>;
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
                <label className="form-label">Department Name:</label>
                <input
                  type="text"
                  placeholder="Enter Department Name"
                  name="departmentName"
                  value={departmentName}
                  className={`form-control ${
                    errors.departmentName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setDepartmentName(e.target.value)}
                ></input>
                {errors.firstName && (
                  <div className="invalid-feedback"> {errors.departmentName} </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Department Description:</label>
                <input
                  type="text"
                  placeholder="Enter Department Description"
                  name="departmentDescription"
                  value={departmentDescription}
                  className={`form-control ${
                    errors.departmentDescription ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setDepartmentDescription(e.target.value)}
                ></input>
                {errors.lastName && (
                  <div className="invalid-feedback"> {errors.departmentDescription} </div>
                )}
              </div>
              <button
                className="btn btn-success"
                onClick={saveOrUpdateDepartment}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepartmentComponent