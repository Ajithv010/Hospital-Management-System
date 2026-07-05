package com.hospital.Hospital.Management.System.service;

import org.springframework.stereotype.Service;

import com.hospital.Hospital.Management.System.dto.DashboardResponse;
import com.hospital.Hospital.Management.System.repository.AppointmentRepository;
import com.hospital.Hospital.Management.System.repository.BillRepository;
import com.hospital.Hospital.Management.System.repository.DoctorRepository;
import com.hospital.Hospital.Management.System.repository.MedicalRecordRepository;
import com.hospital.Hospital.Management.System.repository.PatientRepository;
import com.hospital.Hospital.Management.System.repository.PrescriptionRepository;

@Service
public class DashboardService {

    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;
    private final BillRepository billRepository;
    private final PrescriptionRepository prescriptionRepository;
    private final MedicalRecordRepository medicalRecordRepository;

    public DashboardService(
            PatientRepository patientRepository,
            DoctorRepository doctorRepository,
            AppointmentRepository appointmentRepository,
            BillRepository billRepository,
            PrescriptionRepository prescriptionRepository,
            MedicalRecordRepository medicalRecordRepository) {

        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.appointmentRepository = appointmentRepository;
        this.billRepository = billRepository;
        this.prescriptionRepository = prescriptionRepository;
        this.medicalRecordRepository = medicalRecordRepository;
    }

    public DashboardResponse getDashboardStats() {

        return new DashboardResponse(

                patientRepository.count(),

                doctorRepository.count(),

                appointmentRepository.count(),

                billRepository.count(),

                prescriptionRepository.count(),

                medicalRecordRepository.count()
        );
    }
}