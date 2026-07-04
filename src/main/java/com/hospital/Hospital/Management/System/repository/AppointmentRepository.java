package com.hospital.Hospital.Management.System.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hospital.Hospital.Management.System.entity.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

}