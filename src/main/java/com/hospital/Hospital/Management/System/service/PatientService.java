package com.hospital.Hospital.Management.System.service;

import org.springframework.stereotype.Service;
import com.hospital.Hospital.Management.System.entity.Patient;
import com.hospital.Hospital.Management.System.repository.PatientRepository;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }
}