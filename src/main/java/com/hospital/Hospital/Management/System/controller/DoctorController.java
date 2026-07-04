package com.hospital.Hospital.Management.System.controller;

import java.util.List;


import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import com.hospital.Hospital.Management.System.entity.Doctor;
import com.hospital.Hospital.Management.System.service.DoctorService;

@RestController
@RequestMapping("/doctors")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @PostMapping
    public Doctor saveDoctor(@Valid @RequestBody Doctor doctor) {
        return doctorService.saveDoctor(doctor);
    }

    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    @GetMapping("/{id}")
public Doctor getDoctorById(@PathVariable Long id) {
    return doctorService.getDoctorById(id);
}
    @PutMapping("/{id}")
    public Doctor updateDoctor(@PathVariable Long id,
                               @Valid @RequestBody Doctor doctor) {
        return doctorService.updateDoctor(id, doctor);
    }

    @DeleteMapping("/{id}")
    public void deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
    }
}