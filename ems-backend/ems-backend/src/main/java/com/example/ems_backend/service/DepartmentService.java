package com.example.ems_backend.service;

import com.example.ems_backend.dto.DepartmentDto;
import com.example.ems_backend.entity.Department;

import java.util.List;

public interface DepartmentService {
    DepartmentDto createDepartment(DepartmentDto departmentDto);

    DepartmentDto getDepartmentById(Long id);

    List<DepartmentDto> getAllDepartments();

    DepartmentDto updateDepartment(Long id, DepartmentDto departmentDto);

    void deleteDepartment(Long id);
}
