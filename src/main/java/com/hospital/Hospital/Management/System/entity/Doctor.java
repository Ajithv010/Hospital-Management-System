package com.hospital.Hospital.Management.System.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Entity
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long doctorId;

    @NotBlank(message = "Doctor name is required")
    private String name;

    @NotBlank(message = "Specialization is required")
    private String specialization;

    @Pattern(regexp = "^[0-9]{10}$", message = "Phone must contain exactly 10 digits")
    private String phone;

    @Email(message = "Invalid email")
    private String email;

    @Min(value = 0, message = "Experience cannot be negative")
    private int experience;

    public Doctor() {
    }

    public Doctor(String name, String specialization,
                  String phone, String email, int experience) {
        this.name = name;
        this.specialization = specialization;
        this.phone = phone;
        this.email = email;
        this.experience = experience;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getExperience() {
        return experience;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }
}