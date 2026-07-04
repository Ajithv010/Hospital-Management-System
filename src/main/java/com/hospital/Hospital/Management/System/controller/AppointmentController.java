package com.hospital.Hospital.Management.System.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.*;

import com.hospital.Hospital.Management.System.entity.Appointment;
import com.hospital.Hospital.Management.System.service.AppointmentService;
import com.hospital.Hospital.Management.System.dto.AppointmentRequest;
@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping
public Appointment saveAppointment(@RequestBody AppointmentRequest request) {
    return appointmentService.saveAppointment(request);
}

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @GetMapping("/{id}")
    public Optional<Appointment> getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
    }
}