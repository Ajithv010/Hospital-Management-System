package com.hospital.Hospital.Management.System.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.hospital.Hospital.Management.System.entity.Prescription;
import com.hospital.Hospital.Management.System.service.PrescriptionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/prescriptions")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    public PrescriptionController(PrescriptionService prescriptionService) {
        this.prescriptionService = prescriptionService;
    }

    @PostMapping
    public Prescription savePrescription(
            @Valid @RequestBody Prescription prescription) {
        return prescriptionService.savePrescription(prescription);
    }

    @GetMapping
    public List<Prescription> getAllPrescriptions() {
        return prescriptionService.getAllPrescriptions();
    }

    @GetMapping("/{id}")
    public Prescription getPrescriptionById(@PathVariable Long id) {
        return prescriptionService.getPrescriptionById(id);
    }

    @PutMapping("/{id}")
    public Prescription updatePrescription(
            @PathVariable Long id,
            @Valid @RequestBody Prescription prescription) {

        return prescriptionService.updatePrescription(id, prescription);
    }

    @DeleteMapping("/{id}")
    public void deletePrescription(@PathVariable Long id) {
        prescriptionService.deletePrescription(id);
    }
}