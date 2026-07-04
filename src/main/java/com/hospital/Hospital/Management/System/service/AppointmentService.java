package com.hospital.Hospital.Management.System.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hospital.Hospital.Management.System.dto.AppointmentRequest;
import com.hospital.Hospital.Management.System.entity.Appointment;
import com.hospital.Hospital.Management.System.entity.Doctor;
import com.hospital.Hospital.Management.System.entity.Patient;
import com.hospital.Hospital.Management.System.repository.AppointmentRepository;
import com.hospital.Hospital.Management.System.repository.DoctorRepository;
import com.hospital.Hospital.Management.System.repository.PatientRepository;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              PatientRepository patientRepository,
                              DoctorRepository doctorRepository) {

        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    public Appointment saveAppointment(AppointmentRequest request) {

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow();

        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow();

        Appointment appointment = new Appointment();

        appointment.setAppointmentDate(request.getAppointmentDate());
        appointment.setAppointmentTime(request.getAppointmentTime());
        appointment.setStatus(request.getStatus());

        appointment.setPatient(patient);
        appointment.setDoctor(doctor);

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }
}