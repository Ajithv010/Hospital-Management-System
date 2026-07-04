package com.hospital.Hospital.Management.System.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Entity
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long patientId;

    @NotBlank(message = "Name is required")
    private String name;

    @Min(value = 0, message = "Age cannot be negative")
    private int age;

    @NotBlank(message = "Gender is required")
    private String gender;

    @Pattern(regexp = "^[0-9]{10}$", message = "Phone must contain exactly 10 digits")
    private String phone;

    @Email(message = "Invalid email address")
    private String email;

    @NotBlank(message = "Address is required")
    private String address;

    // No-argument constructor
    public Patient() {
    }

    // Parameterized constructor
    public Patient(String name, int age, String gender,
                   String phone, String email, String address) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.phone = phone;
        this.email = email;
        this.address = address;
    }

    // Getter for patientId
    public Long getPatientId() {
        return patientId;
    }

    // Getter & Setter for name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getter & Setter for age
    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    // Getter & Setter for gender
    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    // Getter & Setter for phone
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    // Getter & Setter for email
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Getter & Setter for address
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}