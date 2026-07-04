package com.hospital.Hospital.Management.System.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hospital.Hospital.Management.System.entity.Bill;
import com.hospital.Hospital.Management.System.entity.Patient;
import com.hospital.Hospital.Management.System.exception.ResourceNotFoundException;
import com.hospital.Hospital.Management.System.repository.BillRepository;
import com.hospital.Hospital.Management.System.repository.PatientRepository;

@Service
public class BillService {

    private final BillRepository billRepository;
    private final PatientRepository patientRepository;

    public BillService(BillRepository billRepository,
                       PatientRepository patientRepository) {
        this.billRepository = billRepository;
        this.patientRepository = patientRepository;
    }

    // Create Bill
    public Bill saveBill(Bill bill) {

        Patient patient = patientRepository.findById(
                bill.getPatient().getPatientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found"));

        bill.setPatient(patient);

        return billRepository.save(bill);
    }

    // Get All Bills
    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }

    // Get Bill By Id
    public Bill getBillById(Long id) {
        return billRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Bill not found"));
    }

    // Update Bill
    public Bill updateBill(Long id, Bill updatedBill) {

        Bill bill = getBillById(id);

        Patient patient = patientRepository.findById(
                updatedBill.getPatient().getPatientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found"));

        bill.setPatient(patient);
        bill.setAmount(updatedBill.getAmount());
        bill.setPaymentMethod(updatedBill.getPaymentMethod());
        bill.setPaymentStatus(updatedBill.getPaymentStatus());
        bill.setBillDate(updatedBill.getBillDate());

        return billRepository.save(bill);
    }

    // Delete Bill
    public void deleteBill(Long id) {
        billRepository.deleteById(id);
    }
}