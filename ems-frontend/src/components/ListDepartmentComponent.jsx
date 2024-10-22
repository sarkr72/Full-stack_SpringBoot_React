import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteDepartment, listDeprtments } from '../services/DepartmentServices';

const ListDepartmentComponent = () => {

    const [departments, setDepartments] = useState([]);
    const navigator = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() =>{
        getDepartments();
    }, [])

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


    const getDepartments=()=>{
        listDeprtments().then((response) =>{
            setDepartments(response.data);
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

        function addNewDepartment(){
        navigator('/add-department');
    }

    const updateDepartment = (id) =>{
        navigator(`/edit-department/${id}`);
    }

    const removeDepartment = (id) =>{
            deleteDepartment(id)
          .then((response) => {
            getDepartments();
          })
          .catch((error) => {
            console.log(error);
          });
    }

  return (
    <div>
        <h2>List of Departments</h2>
        <button className='btn btn-primary mb-2' onClick={addNewDepartment}>Add Department</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Department Id</th>
                    <th>Department Name</th>
                    <th>Department Description</th>
                </tr>
            </thead>
            <tbody>
                {departments.map(department=>
                    <tr key={department.id}>
                        <td>{department.departmentName}</td>
                        <td>{department.departmentDescription}</td>
                        <td>
                            <button className='btn btn-info' style={{width: "90px"}} onClick={()=> updateDepartment(department.id)}>Update</button>
                         <button className='btn btn-danger' style={{ ...marginStyle, width: "90px" }} onClick={() => removeDepartment(department.id)}>Delete</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
  )
}

export default ListDepartmentComponent