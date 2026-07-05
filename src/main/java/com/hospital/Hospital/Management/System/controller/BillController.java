package com.hospital.Hospital.Management.System.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.hospital.Hospital.Management.System.dto.BillRequest;
import com.hospital.Hospital.Management.System.entity.Bill;
import com.hospital.Hospital.Management.System.service.BillService;

@RestController
@RequestMapping("/bills")
public class BillController {

    private final BillService billService;

    public BillController(BillService billService) {
        this.billService = billService;
    }

    @PostMapping
    public Bill saveBill(@RequestBody BillRequest request) {
        return billService.saveBill(request);
    }

    @GetMapping
    public List<Bill> getAllBills() {
        return billService.getAllBills();
    }

    @GetMapping("/{id}")
    public Bill getBillById(@PathVariable Long id) {
        return billService.getBillById(id);
    }

    @PutMapping("/{id}")
    public Bill updateBill(
            @PathVariable Long id,
            @RequestBody BillRequest request) {

        return billService.updateBill(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteBill(@PathVariable Long id) {
        billService.deleteBill(id);
    }
}