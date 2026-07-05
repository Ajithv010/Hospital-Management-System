package com.hospital.Hospital.Management.System.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hospital.Hospital.Management.System.dto.MedicalRecordRequest;
import com.hospital.Hospital.Management.System.entity.MedicalRecord;
import com.hospital.Hospital.Management.System.entity.Patient;
import com.hospital.Hospital.Management.System.exception.ResourceNotFoundException;
import com.hospital.Hospital.Management.System.repository.MedicalRecordRepository;
import com.hospital.Hospital.Management.System.repository.PatientRepository;

@Service
public class MedicalRecordService {

    private final MedicalRecordRepository medicalRecordRepository;
    private final PatientRepository patientRepository;

    public MedicalRecordService(
            MedicalRecordRepository medicalRecordRepository,
            PatientRepository patientRepository) {

        this.medicalRecordRepository = medicalRecordRepository;
        this.patientRepository = patientRepository;
    }

    // Create Medical Record
    public MedicalRecord saveMedicalRecord(MedicalRecordRequest request) {

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found"));

        MedicalRecord record = new MedicalRecord();

        record.setPatient(patient);
        record.setDiagnosis(request.getDiagnosis());
        record.setTreatment(request.getTreatment());
        record.setAllergies(request.getAllergies());
        record.setTestResults(request.getTestResults());
        record.setRecordDate(request.getRecordDate());

        return medicalRecordRepository.save(record);
    }

    // Get All Medical Records
    public List<MedicalRecord> getAllMedicalRecords() {
        return medicalRecordRepository.findAll();
    }

    // Get Medical Record By Id
    public MedicalRecord getMedicalRecordById(Long id) {

        return medicalRecordRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Medical Record not found"));
    }

    // Update Medical Record
    public MedicalRecord updateMedicalRecord(
            Long id,
            MedicalRecordRequest request) {

        MedicalRecord record = medicalRecordRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Medical Record not found"));

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found"));

        record.setPatient(patient);
        record.setDiagnosis(request.getDiagnosis());
        record.setTreatment(request.getTreatment());
        record.setAllergies(request.getAllergies());
        record.setTestResults(request.getTestResults());
        record.setRecordDate(request.getRecordDate());

        return medicalRecordRepository.save(record);
    }

    // Delete Medical Record
    public void deleteMedicalRecord(Long id) {

        if (!medicalRecordRepository.existsById(id)) {
            throw new ResourceNotFoundException("Medical Record not found");
        }

        medicalRecordRepository.deleteById(id);
    }
}