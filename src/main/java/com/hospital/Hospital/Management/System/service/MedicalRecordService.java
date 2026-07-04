package com.hospital.Hospital.Management.System.service;

import java.util.List;

import org.springframework.stereotype.Service;

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
    public MedicalRecord saveMedicalRecord(MedicalRecord record) {

        Patient patient = patientRepository.findById(
                record.getPatient().getPatientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found"));

        record.setPatient(patient);

        MedicalRecord savedRecord = medicalRecordRepository.save(record);

        return medicalRecordRepository.findById(savedRecord.getRecordId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Medical Record not found"));
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
            MedicalRecord updatedRecord) {

        MedicalRecord record = getMedicalRecordById(id);

        Patient patient = patientRepository.findById(
                updatedRecord.getPatient().getPatientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found"));

        record.setPatient(patient);
        record.setDiagnosis(updatedRecord.getDiagnosis());
        record.setTreatment(updatedRecord.getTreatment());
        record.setAllergies(updatedRecord.getAllergies());
        record.setTestResults(updatedRecord.getTestResults());
        record.setRecordDate(updatedRecord.getRecordDate());

        MedicalRecord savedRecord = medicalRecordRepository.save(record);

        return medicalRecordRepository.findById(savedRecord.getRecordId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Medical Record not found"));
    }

    // Delete Medical Record
    public void deleteMedicalRecord(Long id) {
        medicalRecordRepository.deleteById(id);
    }
}