package com.hospital.Hospital.Management.System.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hospital.Hospital.Management.System.entity.Patient;
import com.hospital.Hospital.Management.System.exception.ResourceNotFoundException;
import com.hospital.Hospital.Management.System.repository.PatientRepository;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    // Create Patient
    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    // Get All Patients
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // Get Patient By ID
    public Patient getPatientById(Long patientId) {
        return patientRepository.findById(patientId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found"));
    }

    // Update Patient
    public Patient updatePatient(Long id, Patient updatedPatient) {

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found"));

        patient.setName(updatedPatient.getName());
        patient.setAge(updatedPatient.getAge());
        patient.setGender(updatedPatient.getGender());
        patient.setPhone(updatedPatient.getPhone());
        patient.setEmail(updatedPatient.getEmail());
        patient.setAddress(updatedPatient.getAddress());

        return patientRepository.save(patient);
    }

    // Delete Patient
    public void deletePatient(Long id) {

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found"));

        patientRepository.delete(patient);
    }
}