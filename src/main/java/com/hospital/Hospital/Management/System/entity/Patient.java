package com.hospital.Hospital.Management.System.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long patientId;

    private String name;
    private int age;
    private String gender;
    private String phone;
    private String email;
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
    public String getName() {
    return name;
}
public void setName(String name) {
    this.name = name;
}

}