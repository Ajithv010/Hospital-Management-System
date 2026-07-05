package com.hospital.Hospital.Management.System.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.hospital.Hospital.Management.System.dto.MedicalRecordRequest;
import com.hospital.Hospital.Management.System.entity.MedicalRecord;
import com.hospital.Hospital.Management.System.service.MedicalRecordService;
import com.hospital.Hospital.Management.System.dto.MedicalRecordRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/medical-records")
public class MedicalRecordController {

    private final MedicalRecordService medicalRecordService;

    public MedicalRecordController(
            MedicalRecordService medicalRecordService) {

        this.medicalRecordService = medicalRecordService;
    }

    @PostMapping
public MedicalRecord saveMedicalRecord(
        @RequestBody MedicalRecordRequest request) {

    return medicalRecordService.saveMedicalRecord(request);
}

    @GetMapping
    public List<MedicalRecord> getAllMedicalRecords() {
        return medicalRecordService.getAllMedicalRecords();
    }

    @GetMapping("/{id}")
    public MedicalRecord getMedicalRecordById(
            @PathVariable Long id) {

        return medicalRecordService.getMedicalRecordById(id);
    }

    @PutMapping("/{id}")
public MedicalRecord updateMedicalRecord(
        @PathVariable Long id,
        @RequestBody MedicalRecordRequest request) {

    return medicalRecordService.updateMedicalRecord(id, request);
}

    @DeleteMapping("/{id}")
    public void deleteMedicalRecord(
            @PathVariable Long id) {

        medicalRecordService.deleteMedicalRecord(id);
    }
}