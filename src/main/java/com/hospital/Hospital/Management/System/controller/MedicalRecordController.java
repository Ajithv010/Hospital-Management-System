package com.hospital.Hospital.Management.System.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.hospital.Hospital.Management.System.entity.MedicalRecord;
import com.hospital.Hospital.Management.System.service.MedicalRecordService;

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
            @Valid @RequestBody MedicalRecord record) {

        return medicalRecordService.saveMedicalRecord(record);
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
            @Valid @RequestBody MedicalRecord record) {

        return medicalRecordService.updateMedicalRecord(id, record);
    }

    @DeleteMapping("/{id}")
    public void deleteMedicalRecord(
            @PathVariable Long id) {

        medicalRecordService.deleteMedicalRecord(id);
    }
}