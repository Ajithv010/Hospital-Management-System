package com.hospital.Hospital.Management.System.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hospital.Hospital.Management.System.entity.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

}
