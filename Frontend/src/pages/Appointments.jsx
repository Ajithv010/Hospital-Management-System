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
            const res = await api.get("/appointments");
            setAppointments(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const loadPatients = async () => {
        try {
            const res = await api.get("/patients");
            setPatients(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const loadDoctors = async () => {
        try {
            const res = await api.get("/doctors");
            setDoctors(res.data);
        } catch (err) {
            console.error(err);
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

            alert("Appointment Added Successfully");

            clearForm();

            loadAppointments();

        } catch (err) {

            console.error(err);

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
    };

    const updateAppointment = async () => {

        try {

            await api.put(
                `/appointments/${editingId}`,
                appointment
            );

            alert("Appointment Updated Successfully");

            clearForm();

            loadAppointments();

        } catch (err) {

            console.error(err);

            alert("Update Failed");
        }
    };

    const deleteAppointment = async (id) => {

        if (!window.confirm("Delete Appointment?")) return;

        try {

            await api.delete(`/appointments/${id}`);

            alert("Appointment Deleted");

            loadAppointments();

        } catch (err) {

            console.error(err);

            alert("Delete Failed");
        }
    };

    return (

        <MainLayout>

            <h2 className="mb-4">
                Appointments
            </h2>

            <div className="card mb-4">

                <div className="card-body">

                    <h5>
                        {isEditing ? "Update Appointment" : "Add Appointment"}
                    </h5>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <select
                                className="form-control"
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

                                {patients.map((p) => (
                                    <option
                                        key={p.patientId}
                                        value={p.patientId}
                                    >
                                        {p.name}
                                    </option>
                                ))}

                            </select>

                        </div>

                        <div className="col-md-6 mb-3">

                            <select
                                className="form-control"
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

                                {doctors.map((d) => (
                                    <option
                                        key={d.doctorId}
                                        value={d.doctorId}
                                    >
                                        {d.name}
                                    </option>
                                ))}

                            </select>

                        </div>
                                                <div className="col-md-4 mb-3">

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

                        <div className="col-md-4 mb-3">

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

                        <div className="col-md-4 mb-3">

                            <select
                                className="form-control"
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
                            className="btn btn-success"
                            onClick={saveAppointment}
                        >
                            Save Appointment
                        </button>

                    )}

                </div>

            </div>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>
                        <th>ID</th>
                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {appointments.map((item) => (

                        <tr key={item.appointmentId}>

                            <td>{item.appointmentId}</td>
                            <td>{item.patient?.name}</td>
                            <td>{item.doctor?.name}</td>
                            <td>{item.appointmentDate}</td>
                            <td>{item.appointmentTime}</td>
                            <td>{item.status}</td>

                            <td>

                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => editAppointment(item)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                        deleteAppointment(item.appointmentId)
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </MainLayout>

    );
}

export default Appointments;