import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

function Dashboard() {

    const [stats, setStats] = useState({
        patients: 0,
        doctors: 0,
        appointments: 0,
        bills: 0,
        prescriptions: 0,
        medicalRecords: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {

            const response = await api.get("/dashboard/stats");

            setStats(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to Load Dashboard");
        }
    };

    return (

        <MainLayout>

            <h2 className="mb-4">
                Dashboard
            </h2>

            <div className="row g-4">

                <div className="col-md-4">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h5>Total Patients</h5>
                            <h2>{stats.patients}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h5>Total Doctors</h5>
                            <h2>{stats.doctors}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h5>Appointments</h5>
                            <h2>{stats.appointments}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h5>Bills</h5>
                            <h2>{stats.bills}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h5>Prescriptions</h5>
                            <h2>{stats.prescriptions}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h5>Medical Records</h5>
                            <h2>{stats.medicalRecords}</h2>
                        </div>
                    </div>
                </div>

            </div>

        </MainLayout>

    );
}

export default Dashboard;