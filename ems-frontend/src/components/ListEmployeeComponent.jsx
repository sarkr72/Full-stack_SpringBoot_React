
import React, { useEffect, useState } from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import {useNavigate} from 'react-router-dom'

function ListEmployeeComponent() {
    const [employees, setEmployees] = useState([])
    const navigator = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        getAllEmployees();

    }, [])

    const getAllEmployees =()=>{
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error("not found");
        })
    }

    useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const marginStyle = windowWidth > 1000 ? { marginLeft: '5px' } : { marginTop: '5px' }; // Adjust 768 as per your breakpoints


    function addNewEmployee(){
        navigator('/add-employee');
    }

    const updateEmployee = (id) =>{
        navigator(`/edit-employee/${id}`);
    }

    const removeEmployee = (id) =>{
                deleteEmployee(id)
          .then((response) => {
            getAllEmployees();
          })
          .catch((error) => {
            console.log(error);
          });
    }

  return (
    <div className='container'>
        <h2>List of Employees</h2>
        <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email</th>
                </tr>
            </thead>
                <tbody>
                {
                    employees.map(employee => 
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td className=''>
                                <button className='btn btn-info' style={{width: "90px"}} onClick={() => updateEmployee(employee.id)}>Update</button>
                               <button className='btn btn-danger' style={{ ...marginStyle, width: "90px" }} onClick={() => removeEmployee(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
        </table>
    </div>

  )
}

export default ListEmployeeComponent