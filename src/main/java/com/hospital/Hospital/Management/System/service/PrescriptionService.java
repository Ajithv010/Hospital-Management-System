package com.hospital.Hospital.Management.System.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hospital.Hospital.Management.System.dto.PrescriptionRequest;
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
    public Prescription savePrescription(PrescriptionRequest request) {

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found"));

        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Doctor not found"));

        Prescription prescription = new Prescription();

        prescription.setPatient(patient);
        prescription.setDoctor(doctor);
        prescription.setMedicine(request.getMedicine());
        prescription.setDosage(request.getDosage());
        prescription.setDuration(request.getDuration());
        prescription.setNotes(request.getNotes());
        prescription.setPrescriptionDate(request.getPrescriptionDate());

        return prescriptionRepository.save(prescription);
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
                                           PrescriptionRequest request) {

        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Prescription not found"));

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found"));

        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Doctor not found"));

        prescription.setPatient(patient);
        prescription.setDoctor(doctor);
        prescription.setMedicine(request.getMedicine());
        prescription.setDosage(request.getDosage());
        prescription.setDuration(request.getDuration());
        prescription.setNotes(request.getNotes());
        prescription.setPrescriptionDate(request.getPrescriptionDate());

        return prescriptionRepository.save(prescription);
    }

    // Delete Prescription
    public void deletePrescription(Long id) {

        if (!prescriptionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Prescription not found");
        }

        prescriptionRepository.deleteById(id);
    }
}