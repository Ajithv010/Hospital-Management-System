package com.hospital.Hospital.Management.System.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hospital.Hospital.Management.System.entity.Doctor;
import com.hospital.Hospital.Management.System.entity.Patient;
import com.hospital.Hospital.Management.System.entity.Prescription;
import com.hospital.Hospital.Management.System.exception.ResourceNotFoundException;
import com.hospital.Hospital.Management.System.repository.DoctorRepository;
import com.hospital.Hospital.Management.System.repository.PatientRepository;
import com.hospital.Hospital.Management.System.repository.PrescriptionRepository;

@Service
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public PrescriptionService(PrescriptionRepository prescriptionRepository,
                               PatientRepository patientRepository,
                               DoctorRepository doctorRepository) {

        this.prescriptionRepository = prescriptionRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    // Create Prescription
    public Prescription savePrescription(Prescription prescription) {

        Patient patient = patientRepository.findById(
                prescription.getPatient().getPatientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found"));

        Doctor doctor = doctorRepository.findById(
                prescription.getDoctor().getDoctorId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Doctor not found"));

        prescription.setPatient(patient);
        prescription.setDoctor(doctor);

        Prescription savedPrescription = prescriptionRepository.save(prescription);

        return prescriptionRepository.findById(savedPrescription.getPrescriptionId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Prescription not found"));
    }

    // Get All Prescriptions
    public List<Prescription> getAllPrescriptions() {
        return prescriptionRepository.findAll();
    }

    // Get Prescription By Id
    public Prescription getPrescriptionById(Long id) {

        return prescriptionRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Prescription not found"));
    }

    // Update Prescription
    public Prescription updatePrescription(Long id,
                                           Prescription updatedPrescription) {

        Prescription prescription = getPrescriptionById(id);

        Patient patient = patientRepository.findById(
                updatedPrescription.getPatient().getPatientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found"));

        Doctor doctor = doctorRepository.findById(
                updatedPrescription.getDoctor().getDoctorId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Doctor not found"));

        prescription.setPatient(patient);
        prescription.setDoctor(doctor);
        prescription.setMedicine(updatedPrescription.getMedicine());
        prescription.setDosage(updatedPrescription.getDosage());
        prescription.setDuration(updatedPrescription.getDuration());
        prescription.setNotes(updatedPrescription.getNotes());
        prescription.setPrescriptionDate(updatedPrescription.getPrescriptionDate());

        Prescription savedPrescription = prescriptionRepository.save(prescription);

        return prescriptionRepository.findById(savedPrescription.getPrescriptionId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Prescription not found"));
    }

    // Delete Prescription
    public void deletePrescription(Long id) {
        prescriptionRepository.deleteById(id);
    }
}