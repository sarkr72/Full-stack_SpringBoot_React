package com.example.ems_backend.service.impl;

import com.example.ems_backend.dto.EmployeeDto;
import com.example.ems_backend.entity.Department;
import com.example.ems_backend.entity.Employee;
import com.example.ems_backend.exception.ResourceNotFoundException;
import com.example.ems_backend.mapper.EmployeeMapper;
import com.example.ems_backend.repository.DepartmentRepository;
import com.example.ems_backend.repository.EmployeeRepository;
import com.example.ems_backend.service.EmployeeService;
import lombok.AllArgsConstructor;
import lombok.val;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;
    private DepartmentRepository departmentRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);

        Department department = departmentRepository.findById(employeeDto.getDepartmentId()).orElseThrow(() -> new ResourceNotFoundException("Department doesn't exist with id: " + employeeDto.getDepartmentId()));
        employee.setDepartment(department);
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
         Employee employee = employeeRepository.findById(employeeId)
                 .orElseThrow(() -> new ResourceNotFoundException("Employee does not exists with given id: " + employeeId));
         
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
      List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDto(employee)).collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
      Employee employee = employeeRepository.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException("Employee does not exists with given id: " + employeeId));

      employee.setFirstName(updatedEmployee.getFirstName());
      employee.setLastName(updatedEmployee.getLastName());
      employee.setEmail(updatedEmployee.getEmail());
      Employee updatedEmployeeObj = employeeRepository.save(employee);
      return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException("Employee not found with given id: " + employeeId));
        employeeRepository.delete(employee);
    }
}

