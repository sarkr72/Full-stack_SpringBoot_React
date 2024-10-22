package com.example.ems_backend.service.impl;

import com.example.ems_backend.dto.DepartmentDto;
import com.example.ems_backend.entity.Department;
import com.example.ems_backend.exception.ResourceNotFoundException;
import com.example.ems_backend.mapper.DepartmentMapper;
import com.example.ems_backend.repository.DepartmentRepository;
import com.example.ems_backend.service.DepartmentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DeartmentServiceImpl implements DepartmentService {

    private DepartmentRepository departmentRepository;

    @Override
    public DepartmentDto createDepartment(DepartmentDto departmentDto) {
        Department department = DepartmentMapper.mapToDepartment(departmentDto);
        Department savedDepartment = departmentRepository.save(department);

        return DepartmentMapper.mapToDepartmentDto(savedDepartment);
    }

    @Override
    public DepartmentDto getDepartmentById(Long id) {
        Department department = departmentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Department does not exist with given id: " + id));

        return DepartmentMapper.mapToDepartmentDto(department);
    }

    @Override
    public List<DepartmentDto> getAllDepartments() {
        List<Department> list = departmentRepository.findAll();
        return list.stream().map(department -> DepartmentMapper.mapToDepartmentDto(department)).collect(Collectors.toList());
    }

    @Override
    public DepartmentDto updateDepartment(Long id, DepartmentDto departmentDto) {
        Department department = departmentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Department does not exist with given id: " + id));
        department.setDepartmentName(departmentDto.getDepartmentName());
        department.setDepartmentDescription(departmentDto.getDepartmentDescription());
        Department updatedDepartment = departmentRepository.save(department);
        return DepartmentMapper.mapToDepartmentDto(updatedDepartment);
    }


    @Override
    public void deleteDepartment(Long id) {
        Department department = departmentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Department does not exist with given id: " + id));
        departmentRepository.delete(department);
    }
}
