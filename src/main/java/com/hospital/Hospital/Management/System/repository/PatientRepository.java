package com.hospital.Hospital.Management.System.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hospital.Hospital.Management.System.entity.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {

}