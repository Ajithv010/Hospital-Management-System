package com.hospital.Hospital.Management.System.dto;

public class DashboardResponse {

    private long patients;
    private long doctors;
    private long appointments;
    private long bills;
    private long prescriptions;
    private long medicalRecords;

    public DashboardResponse() {
    }

    public DashboardResponse(long patients,
                             long doctors,
                             long appointments,
                             long bills,
                             long prescriptions,
                             long medicalRecords) {

        this.patients = patients;
        this.doctors = doctors;
        this.appointments = appointments;
        this.bills = bills;
        this.prescriptions = prescriptions;
        this.medicalRecords = medicalRecords;
    }

    public long getPatients() {
        return patients;
    }

    public void setPatients(long patients) {
        this.patients = patients;
    }

    public long getDoctors() {
        return doctors;
    }

    public void setDoctors(long doctors) {
        this.doctors = doctors;
    }

    public long getAppointments() {
        return appointments;
    }

    public void setAppointments(long appointments) {
        this.appointments = appointments;
    }

    public long getBills() {
        return bills;
    }

    public void setBills(long bills) {
        this.bills = bills;
    }

    public long getPrescriptions() {
        return prescriptions;
    }

    public void setPrescriptions(long prescriptions) {
        this.prescriptions = prescriptions;
    }

    public long getMedicalRecords() {
        return medicalRecords;
    }

    public void setMedicalRecords(long medicalRecords) {
        this.medicalRecords = medicalRecords;
    }
}