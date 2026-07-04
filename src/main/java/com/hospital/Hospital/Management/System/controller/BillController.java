package com.hospital.Hospital.Management.System.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.hospital.Hospital.Management.System.entity.Bill;
import com.hospital.Hospital.Management.System.service.BillService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/bills")
public class BillController {

    private final BillService billService;

    public BillController(BillService billService) {
        this.billService = billService;
    }

    // Create Bill
    @PostMapping
    public Bill saveBill(@Valid @RequestBody Bill bill) {
        return billService.saveBill(bill);
    }

    // Get All Bills
    @GetMapping
    public List<Bill> getAllBills() {
        return billService.getAllBills();
    }

    // Get Bill By Id
    @GetMapping("/{id}")
    public Bill getBillById(@PathVariable Long id) {
        return billService.getBillById(id);
    }

    // Update Bill
    @PutMapping("/{id}")
    public Bill updateBill(@PathVariable Long id,
                           @Valid @RequestBody Bill bill) {
        return billService.updateBill(id, bill);
    }

    // Delete Bill
    @DeleteMapping("/{id}")
    public void deleteBill(@PathVariable Long id) {
        billService.deleteBill(id);
    }
}