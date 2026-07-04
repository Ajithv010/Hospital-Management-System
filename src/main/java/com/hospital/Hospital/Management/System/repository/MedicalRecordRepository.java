package com.hospital.Hospital.Management.System.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hospital.Hospital.Management.System.entity.MedicalRecord;

@Repository
public interface MedicalRecordRepository
        extends JpaRepository<MedicalRecord, Long> {

}