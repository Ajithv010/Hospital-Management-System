package com.hospital.Hospital.Management.System.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hospital.Hospital.Management.System.entity.Doctor;
import com.hospital.Hospital.Management.System.exception.ResourceNotFoundException;
import com.hospital.Hospital.Management.System.repository.DoctorRepository;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    // Create Doctor
    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    // Get All Doctors
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    // Get Doctor By ID
    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Doctor not found"));
    }

    // Update Doctor
    public Doctor updateDoctor(Long id, Doctor updatedDoctor) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Doctor not found"));

        doctor.setName(updatedDoctor.getName());
        doctor.setSpecialization(updatedDoctor.getSpecialization());
        doctor.setPhone(updatedDoctor.getPhone());
        doctor.setEmail(updatedDoctor.getEmail());
        doctor.setExperience(updatedDoctor.getExperience());

        return doctorRepository.save(doctor);
    }

    // Delete Doctor
    public void deleteDoctor(Long id) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Doctor not found"));

        doctorRepository.delete(doctor);
    }
}