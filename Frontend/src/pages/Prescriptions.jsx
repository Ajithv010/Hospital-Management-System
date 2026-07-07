import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

function Prescriptions() {

    const emptyPrescription = {
        patientId: "",
        doctorId: "",
        medicine: "",
        dosage: "",
        duration: "",
        notes: "",
        prescriptionDate: ""
    };

    const [prescriptions, setPrescriptions] = useState([]);

    const [patients, setPatients] = useState([]);

    const [doctors, setDoctors] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [prescription, setPrescription] = useState(emptyPrescription);

    const [isEditing, setIsEditing] = useState(false);

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {

        loadPrescriptions();

        loadPatients();

        loadDoctors();

    }, []);

    const loadPrescriptions = async () => {

        try {

            setLoading(true);

            const response = await api.get("/prescriptions");

            setPrescriptions(response.data);

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

        setPrescription(emptyPrescription);

        setEditingId(null);

        setIsEditing(false);

    };

    const savePrescription = async () => {

        try {

            await api.post("/prescriptions", prescription);

            console.log("Prescription Added Successfully");

            clearForm();

            loadPrescriptions();

        } catch (error) {

            console.error(error);

            alert("Failed to Add Prescription");

        }

    };

    const editPrescription = (item) => {

        setPrescription({

            patientId: item.patient.patientId,

            doctorId: item.doctor.doctorId,

            medicine: item.medicine,

            dosage: item.dosage,

            duration: item.duration,

            notes: item.notes,

            prescriptionDate: item.prescriptionDate

        });

        setEditingId(item.prescriptionId);

        setIsEditing(true);

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };

    const updatePrescription = async () => {

        try {

            await api.put(

                `/prescriptions/${editingId}`,

                prescription

            );

            console.log("Prescription Updated Successfully");

            clearForm();

            loadPrescriptions();

        } catch (error) {

            console.error(error);

            alert("Failed to Update Prescription");

        }

    };

    const deletePrescription = async (id) => {

        if (!window.confirm("Delete this prescription?")) return;

        try {

            await api.delete(`/prescriptions/${id}`);

            console.log("Prescription Deleted Successfully");

            loadPrescriptions();

        } catch (error) {

            console.error(error);

            alert("Failed to Delete Prescription");

        }

    };

    const filteredPrescriptions = prescriptions.filter((item) =>

        item.patient?.name.toLowerCase().includes(search.toLowerCase()) ||

        item.doctor?.name.toLowerCase().includes(search.toLowerCase()) ||

        item.medicine.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <MainLayout>
         <div className="container-fluid">

    {/* Header */}

    <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

            <h2 className="fw-bold mb-1">
                Prescriptions
            </h2>

            <p className="text-muted mb-0">
                Manage patient prescriptions and medicines
            </p>

        </div>

        <div style={{ width: "320px" }}>

            <input
                type="text"
                className="form-control"
                placeholder="🔍 Search prescription..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

        </div>

    </div>

    {/* Prescription Form */}

    <div className="card shadow border-0 mb-4">

        <div className="card-header bg-white">

            <h4 className="mb-0">

                {isEditing ? "Update Prescription" : "Add New Prescription"}

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
                        value={prescription.patientId}
                        onChange={(e) =>
                            setPrescription({
                                ...prescription,
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
                        value={prescription.doctorId}
                        onChange={(e) =>
                            setPrescription({
                                ...prescription,
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
                        Medicine
                    </label>

                    <input
                        className="form-control"
                        placeholder="Medicine Name"
                        value={prescription.medicine}
                        onChange={(e) =>
                            setPrescription({
                                ...prescription,
                                medicine: e.target.value
                            })
                        }
                    />

                </div>

                <div className="col-md-4">

                    <label className="form-label">
                        Dosage
                    </label>

                    <input
                        className="form-control"
                        placeholder="1 Tablet"
                        value={prescription.dosage}
                        onChange={(e) =>
                            setPrescription({
                                ...prescription,
                                dosage: e.target.value
                            })
                        }
                    />

                </div>

                <div className="col-md-4">

                    <label className="form-label">
                        Duration
                    </label>

                    <input
                        className="form-control"
                        placeholder="5 Days"
                        value={prescription.duration}
                        onChange={(e) =>
                            setPrescription({
                                ...prescription,
                                duration: e.target.value
                            })
                        }
                    />

                </div>

                <div className="col-md-8">

                    <label className="form-label">
                        Notes
                    </label>

                    <textarea
                        rows="3"
                        className="form-control"
                        placeholder="Prescription Notes"
                        value={prescription.notes}
                        onChange={(e) =>
                            setPrescription({
                                ...prescription,
                                notes: e.target.value
                            })
                        }
                    />

                </div>

                <div className="col-md-4">

                    <label className="form-label">
                        Prescription Date
                    </label>

                    <input
                        type="date"
                        className="form-control"
                        value={prescription.prescriptionDate}
                        onChange={(e) =>
                            setPrescription({
                                ...prescription,
                                prescriptionDate: e.target.value
                            })
                        }
                    />

                </div>

            </div>

            <div className="mt-4">

                {isEditing ? (

                    <>

                        <button
                            className="btn btn-warning me-2"
                            onClick={updatePrescription}
                        >
                            Update Prescription
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
                        onClick={savePrescription}
                    >
                        Save Prescription
                    </button>

                )}

            </div>

        </div>

    </div>   
    {/* Prescription Table */}

<div className="card shadow border-0">

    <div className="card-header bg-white d-flex justify-content-between align-items-center">

        <h4 className="mb-0">
            Prescription List
        </h4>

        <span className="badge bg-primary">
            {filteredPrescriptions.length} Prescriptions
        </span>

    </div>

    <div className="table-responsive">

        <table className="table table-hover align-middle mb-0">

            <thead className="table-light">

                <tr>

                    <th>ID</th>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Medicine</th>
                    <th>Dosage</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th className="text-center">Actions</th>

                </tr>

            </thead>

            <tbody>

                {loading ? (

                    <tr>

                        <td colSpan="8" className="text-center py-5">

                            <div
                                className="spinner-border text-primary"
                                role="status"
                            ></div>

                        </td>

                    </tr>

                ) : filteredPrescriptions.length === 0 ? (

                    <tr>

                        <td
                            colSpan="8"
                            className="text-center py-5 text-muted"
                        >

                            No Prescriptions Found

                        </td>

                    </tr>

                ) : (

                    filteredPrescriptions.map((item) => (

                        <tr key={item.prescriptionId}>

                            <td>
                                #{item.prescriptionId}
                            </td>

                            <td className="fw-semibold">
                                {item.patient?.name}
                            </td>

                            <td>
                                {item.doctor?.name}
                            </td>

                            <td>
                                {item.medicine}
                            </td>

                            <td>
                                {item.dosage}
                            </td>

                            <td>
                                {item.duration}
                            </td>

                            <td>
                                {item.prescriptionDate}
                            </td>

                            <td className="text-center">

                                <button
                                    className="btn btn-outline-warning btn-sm me-2"
                                    onClick={() => editPrescription(item)}
                                >
                                    ✏️ Edit
                                </button>

                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() =>
                                        deletePrescription(item.prescriptionId)
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

export default Prescriptions;