import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

function Appointments() {

    const emptyAppointment = {
        patientId: "",
        doctorId: "",
        appointmentDate: "",
        appointmentTime: "",
        status: "Scheduled"
    };

    const [appointments, setAppointments] = useState([]);

    const [patients, setPatients] = useState([]);

    const [doctors, setDoctors] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [appointment, setAppointment] = useState(emptyAppointment);

    const [isEditing, setIsEditing] = useState(false);

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {

        loadAppointments();

        loadPatients();

        loadDoctors();

    }, []);

    const loadAppointments = async () => {

        try {

            setLoading(true);

            const response = await api.get("/appointments");

            setAppointments(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const loadPatients = async () => {

        try {

            const response = await api.get("/patients");

            setPatients(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const loadDoctors = async () => {

        try {

            const response = await api.get("/doctors");

            setDoctors(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const clearForm = () => {

        setAppointment(emptyAppointment);

        setEditingId(null);

        setIsEditing(false);

    };

    const saveAppointment = async () => {

        try {

            await api.post("/appointments", appointment);

            console.log("Appointment Added Successfully");

            clearForm();

            loadAppointments();

        } catch (error) {

            console.error(error);

            alert("Failed to Add Appointment");

        }

    };

    const editAppointment = (item) => {

        setAppointment({

            patientId: item.patient.patientId,

            doctorId: item.doctor.doctorId,

            appointmentDate: item.appointmentDate,

            appointmentTime: item.appointmentTime,

            status: item.status

        });

        setEditingId(item.appointmentId);

        setIsEditing(true);

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };

    const updateAppointment = async () => {

        try {

            await api.put(

                `/appointments/${editingId}`,

                appointment

            );

            console.log("Appointment Updated Successfully");

            clearForm();

            loadAppointments();

        } catch (error) {

            console.error(error);

            alert("Failed to Update Appointment");

        }

    };

    const deleteAppointment = async (id) => {

        if (!window.confirm("Delete this appointment?")) return;

        try {

            await api.delete(`/appointments/${id}`);

            console.log("Appointment Deleted Successfully");

            loadAppointments();

        } catch (error) {

            console.error(error);

            alert("Failed to Delete Appointment");

        }

    };

    const filteredAppointments = appointments.filter((item) =>

        item.patient?.name.toLowerCase().includes(search.toLowerCase()) ||

        item.doctor?.name.toLowerCase().includes(search.toLowerCase()) ||

        item.status.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <MainLayout>
            <div className="container-fluid">

    {/* Header */}

    <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

            <h2 className="fw-bold mb-1">
                Appointments
            </h2>

            <p className="text-muted mb-0">
                Schedule and manage patient appointments
            </p>

        </div>

        <div style={{ width: "320px" }}>

            <input
                type="text"
                className="form-control"
                placeholder="🔍 Search appointment..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

        </div>

    </div>

    {/* Appointment Form */}

    <div className="card shadow border-0 mb-4">

        <div className="card-header bg-white">

            <h4 className="mb-0">

                {isEditing ? "Update Appointment" : "New Appointment"}

            </h4>

        </div>

        <div className="card-body">

            <div className="row g-3">

                <div className="col-md-6">

                    <label className="form-label">
                        Patient
                    </label>

                    <select
                        className="form-select"
                        value={appointment.patientId}
                        onChange={(e) =>
                            setAppointment({
                                ...appointment,
                                patientId: e.target.value
                            })
                        }
                    >

                        <option value="">
                            Select Patient
                        </option>

                        {patients.map((patient) => (

                            <option
                                key={patient.patientId}
                                value={patient.patientId}
                            >

                                {patient.name}

                            </option>

                        ))}

                    </select>

                </div>

                <div className="col-md-6">

                    <label className="form-label">
                        Doctor
                    </label>

                    <select
                        className="form-select"
                        value={appointment.doctorId}
                        onChange={(e) =>
                            setAppointment({
                                ...appointment,
                                doctorId: e.target.value
                            })
                        }
                    >

                        <option value="">
                            Select Doctor
                        </option>

                        {doctors.map((doctor) => (

                            <option
                                key={doctor.doctorId}
                                value={doctor.doctorId}
                            >

                                {doctor.name}

                            </option>

                        ))}

                    </select>

                </div>

                <div className="col-md-4">

                    <label className="form-label">
                        Appointment Date
                    </label>

                    <input
                        type="date"
                        className="form-control"
                        value={appointment.appointmentDate}
                        onChange={(e) =>
                            setAppointment({
                                ...appointment,
                                appointmentDate: e.target.value
                            })
                        }
                    />

                </div>

                <div className="col-md-4">

                    <label className="form-label">
                        Appointment Time
                    </label>

                    <input
                        type="time"
                        className="form-control"
                        value={appointment.appointmentTime}
                        onChange={(e) =>
                            setAppointment({
                                ...appointment,
                                appointmentTime: e.target.value
                            })
                        }
                    />

                </div>

                <div className="col-md-4">

                    <label className="form-label">
                        Status
                    </label>

                    <select
                        className="form-select"
                        value={appointment.status}
                        onChange={(e) =>
                            setAppointment({
                                ...appointment,
                                status: e.target.value
                            })
                        }
                    >

                        <option>Scheduled</option>
                        <option>Completed</option>
                        <option>Cancelled</option>

                    </select>

                </div>

            </div>

            <div className="mt-4">

                {isEditing ? (

                    <>

                        <button
                            className="btn btn-warning me-2"
                            onClick={updateAppointment}
                        >

                            Update Appointment

                        </button>

                        <button
                            className="btn btn-secondary"
                            onClick={clearForm}
                        >

                            Cancel

                        </button>

                    </>

                ) : (

                    <button
                        className="btn btn-primary"
                        onClick={saveAppointment}
                    >

                        Save Appointment

                    </button>

                )}

            </div>

        </div>

    </div>
    {/* Appointment Table */}

<div className="card shadow border-0">

    <div className="card-header bg-white d-flex justify-content-between align-items-center">

        <h4 className="mb-0">

            Appointment List

        </h4>

        <span className="badge bg-primary">

            {filteredAppointments.length} Appointments

        </span>

    </div>

    <div className="table-responsive">

        <table className="table table-hover align-middle mb-0">

            <thead className="table-light">

                <tr>

                    <th>ID</th>

                    <th>Patient</th>

                    <th>Doctor</th>

                    <th>Date</th>

                    <th>Time</th>

                    <th>Status</th>

                    <th className="text-center">

                        Actions

                    </th>

                </tr>

            </thead>

            <tbody>

                {loading ? (

                    <tr>

                        <td
                            colSpan="7"
                            className="text-center py-5"
                        >

                            <div
                                className="spinner-border text-primary"
                                role="status"
                            ></div>

                        </td>

                    </tr>

                ) : filteredAppointments.length === 0 ? (

                    <tr>

                        <td
                            colSpan="7"
                            className="text-center py-5 text-muted"
                        >

                            No Appointments Found

                        </td>

                    </tr>

                ) : (

                    filteredAppointments.map((item) => (

                        <tr key={item.appointmentId}>

                            <td>

                                #{item.appointmentId}

                            </td>

                            <td className="fw-semibold">

                                {item.patient?.name}

                            </td>

                            <td>

                                {item.doctor?.name}

                            </td>

                            <td>

                                {item.appointmentDate}

                            </td>

                            <td>

                                {item.appointmentTime}

                            </td>

                            <td>

                                <span
                                    className={`badge ${
                                        item.status === "Completed"
                                            ? "bg-success"
                                            : item.status === "Cancelled"
                                            ? "bg-danger"
                                            : "bg-warning text-dark"
                                    }`}
                                >

                                    {item.status}

                                </span>

                            </td>

                            <td className="text-center">

                                <button
                                    className="btn btn-outline-warning btn-sm me-2"
                                    onClick={() => editAppointment(item)}
                                >

                                    ✏️ Edit

                                </button>

                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() =>
                                        deleteAppointment(item.appointmentId)
                                    }
                                >

                                    🗑 Delete

                                </button>

                            </td>

                        </tr>

                    ))

                )}

            </tbody>

        </table>

    </div>

</div>

        </div>

    </MainLayout>

    );

}

export default Appointments;