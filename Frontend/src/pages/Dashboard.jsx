import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Dashboard() {

    const [stats, setStats] = useState({
        patients: 0,
        doctors: 0,
        appointments: 0,
        bills: 0,
        prescriptions: 0,
        medicalRecords: 0
    });

    const [patients, setPatients] = useState([]);

    const [appointments, setAppointments] = useState([]);

    const appointmentChart = {

        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

        datasets: [

            {
                label: "Appointments",
                data: [12, 18, 15, 22, 28, 20],
                borderColor: "#0d6efd",
                backgroundColor: "rgba(13,110,253,.2)",
                fill: true,
                tension: .4
            }

        ]

    };

    const billChart = {

        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

        datasets: [

            {
                label: "Revenue",
                data: [5000, 7000, 9000, 8000, 12000, 10000],
                backgroundColor: "#198754"
            }

        ]

    };

    useEffect(() => {

        loadDashboard();

        loadPatients();

        loadAppointments();

    }, []);

    const loadDashboard = async () => {

        try {

            const response = await api.get("/dashboard/stats");

            setStats(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const loadPatients = async () => {

        try {

            const response = await api.get("/patients");

            setPatients(response.data.slice(0, 5));

        } catch (error) {

            console.error(error);

        }

    };

    const loadAppointments = async () => {

        try {

            const response = await api.get("/appointments");

            setAppointments(response.data.slice(0, 5));

        } catch (error) {

            console.error(error);

        }

    };
        return (

        <MainLayout>

            {/* Welcome Banner */}

            <div
                className="card border-0 shadow-lg mb-4"
                style={{
                    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
                    borderRadius: "20px"
                }}
            >

                <div className="card-body p-5 text-white">

                    <div className="row align-items-center">

                        <div className="col-lg-8">

                            <h2 className="fw-bold mb-3">
                                👋 Welcome Back, Admin
                            </h2>

                            <p className="mb-4 fs-5">
                                Manage your entire hospital from one dashboard.
                            </p>

                        </div>

                        <div className="col-lg-4 text-center">

                            <i
                                className="bi bi-hospital-fill"
                                style={{
                                    fontSize: "120px",
                                    opacity: .2
                                }}
                            ></i>

                        </div>

                    </div>

                </div>

            </div>

            {/* Statistics */}

            <div className="row g-4">

                <div className="col-lg-4">

                    <div className="card dashboard-card bg-primary text-white border-0 shadow">

                        <div className="card-body d-flex justify-content-between">

                            <div>

                                <h6>Total Patients</h6>

                                <h2>{stats.patients}</h2>

                            </div>

                            <i className="bi bi-people-fill fs-1"></i>

                        </div>

                    </div>

                </div>

                <div className="col-lg-4">

                    <div className="card dashboard-card bg-success text-white border-0 shadow">

                        <div className="card-body d-flex justify-content-between">

                            <div>

                                <h6>Total Doctors</h6>

                                <h2>{stats.doctors}</h2>

                            </div>

                            <i className="bi bi-person-badge-fill fs-1"></i>

                        </div>

                    </div>

                </div>

                <div className="col-lg-4">

                    <div className="card dashboard-card bg-warning border-0 shadow">

                        <div className="card-body d-flex justify-content-between">

                            <div>

                                <h6>Appointments</h6>

                                <h2>{stats.appointments}</h2>

                            </div>

                            <i className="bi bi-calendar-check-fill fs-1"></i>

                        </div>

                    </div>

                </div>

                <div className="col-lg-4">

                    <div className="card dashboard-card bg-danger text-white border-0 shadow">

                        <div className="card-body d-flex justify-content-between">

                            <div>

                                <h6>Bills</h6>

                                <h2>{stats.bills}</h2>

                            </div>

                            <i className="bi bi-cash-stack fs-1"></i>

                        </div>

                    </div>

                </div>

                <div className="col-lg-4">

                    <div className="card dashboard-card bg-info text-white border-0 shadow">

                        <div className="card-body d-flex justify-content-between">

                            <div>

                                <h6>Prescriptions</h6>

                                <h2>{stats.prescriptions}</h2>

                            </div>

                            <i className="bi bi-capsule-pill fs-1"></i>

                        </div>

                    </div>

                </div>

                <div className="col-lg-4">

                    <div className="card dashboard-card bg-dark text-white border-0 shadow">

                        <div className="card-body d-flex justify-content-between">

                            <div>

                                <h6>Medical Records</h6>

                                <h2>{stats.medicalRecords}</h2>

                            </div>

                            <i className="bi bi-file-earmark-medical-fill fs-1"></i>

                        </div>

                    </div>

                </div>

            </div>

            {/* Charts */}

            <div className="row mt-5">

                <div className="col-lg-6">

                    <div className="card shadow border-0">

                        <div className="card-body">

                            <h5 className="mb-3">
                                Monthly Appointments
                            </h5>

                            <Line data={appointmentChart} />

                        </div>

                    </div>

                </div>

                <div className="col-lg-6">

                    <div className="card shadow border-0">

                        <div className="card-body">

                            <h5 className="mb-3">
                                Revenue Overview
                            </h5>

                            <Bar data={billChart} />

                        </div>

                    </div>

                </div>

            </div>

            {/* Recent Data */}

            <div className="row mt-5">

                <div className="col-lg-6">

                    <div className="card shadow border-0">

                        <div className="card-header bg-white">

                            <h5 className="mb-0">
                                Recent Patients
                            </h5>

                        </div>

                        <ul className="list-group list-group-flush">

                            {patients.map((patient) => (

                                <li
                                    key={patient.patientId}
                                    className="list-group-item d-flex justify-content-between"
                                >

                                    <span>{patient.name}</span>

                                    <span className="text-muted">
                                        {patient.gender}
                                    </span>

                                </li>

                            ))}

                        </ul>

                    </div>

                </div>

                <div className="col-lg-6">

                    <div className="card shadow border-0">

                        <div className="card-header bg-white">

                            <h5 className="mb-0">
                                Recent Appointments
                            </h5>

                        </div>

                        <ul className="list-group list-group-flush">

                            {appointments.map((appointment) => (

                                <li
                                    key={appointment.appointmentId}
                                    className="list-group-item d-flex justify-content-between"
                                >

                                    <span>

                                        {appointment.patient?.name}

                                    </span>

                                    <span className="badge bg-success">

                                        {appointment.status}

                                    </span>

                                </li>

                            ))}

                        </ul>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default Dashboard;