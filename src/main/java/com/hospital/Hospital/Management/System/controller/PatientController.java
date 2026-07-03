package com.hospital.Hospital.Management.System.controller;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.Hospital.Management.System.service.PatientService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.hospital.Hospital.Management.System.entity.Patient;
@RestController
@RequestMapping("/patients")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
       
    }
    @PostMapping
public Patient savePatient(@RequestBody Patient patient) {
    return patientService.savePatient(patient);
}
@GetMapping
public List<Patient> getAllPatients() {
    return patientService.getAllPatients();
}
}