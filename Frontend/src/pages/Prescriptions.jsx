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
            const res = await api.get("/prescriptions");
            setPrescriptions(res.data);
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
        setPrescription(emptyPrescription);
        setEditingId(null);
        setIsEditing(false);
    };

    const savePrescription = async () => {

        try {

            await api.post("/prescriptions", prescription);

            alert("Prescription Added Successfully");

            clearForm();

            loadPrescriptions();

        } catch (err) {

            console.error(err);

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
    };

    const updatePrescription = async () => {

        try {

            await api.put(
                `/prescriptions/${editingId}`,
                prescription
            );

            alert("Prescription Updated Successfully");

            clearForm();

            loadPrescriptions();

        } catch (err) {

            console.error(err);

            alert("Update Failed");
        }
    };

    const deletePrescription = async (id) => {

        if (!window.confirm("Delete Prescription?")) return;

        try {

            await api.delete(`/prescriptions/${id}`);

            alert("Prescription Deleted");

            loadPrescriptions();

        } catch (err) {

            console.error(err);

            alert("Delete Failed");
        }
    };

    return (

        <MainLayout>

            <h2 className="mb-4">Prescriptions</h2>

            <div className="card mb-4">

                <div className="card-body">

                    <h5>
                        {isEditing ? "Update Prescription" : "Add Prescription"}
                    </h5>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <select
                                className="form-control"
                                value={prescription.patientId}
                                onChange={(e) =>
                                    setPrescription({
                                        ...prescription,
                                        patientId: e.target.value
                                    })
                                }
                            >

                                <option value="">Select Patient</option>

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
                                value={prescription.doctorId}
                                onChange={(e) =>
                                    setPrescription({
                                        ...prescription,
                                        doctorId: e.target.value
                                    })
                                }
                            >

                                <option value="">Select Doctor</option>

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
                                className="form-control"
                                placeholder="Medicine"
                                value={prescription.medicine}
                                onChange={(e) =>
                                    setPrescription({
                                        ...prescription,
                                        medicine: e.target.value
                                    })
                                }
                            />

                        </div>

                        <div className="col-md-4 mb-3">

                            <input
                                className="form-control"
                                placeholder="Dosage"
                                value={prescription.dosage}
                                onChange={(e) =>
                                    setPrescription({
                                        ...prescription,
                                        dosage: e.target.value
                                    })
                                }
                            />

                        </div>

                        <div className="col-md-4 mb-3">

                            <input
                                className="form-control"
                                placeholder="Duration"
                                value={prescription.duration}
                                onChange={(e) =>
                                    setPrescription({
                                        ...prescription,
                                        duration: e.target.value
                                    })
                                }
                            />

                        </div>

                        <div className="col-md-8 mb-3">

                            <input
                                className="form-control"
                                placeholder="Notes"
                                value={prescription.notes}
                                onChange={(e) =>
                                    setPrescription({
                                        ...prescription,
                                        notes: e.target.value
                                    })
                                }
                            />

                        </div>

                        <div className="col-md-4 mb-3">

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
                            className="btn btn-success"
                            onClick={savePrescription}
                        >
                            Save Prescription
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
                        <th>Medicine</th>
                        <th>Dosage</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {prescriptions.map((item) => (

                        <tr key={item.prescriptionId}>

                            <td>{item.prescriptionId}</td>
                            <td>{item.patient?.name}</td>
                            <td>{item.doctor?.name}</td>
                            <td>{item.medicine}</td>
                            <td>{item.dosage}</td>
                            <td>{item.duration}</td>
                            <td>{item.prescriptionDate}</td>

                            <td>

                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => editPrescription(item)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deletePrescription(item.prescriptionId)}
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

export default Prescriptions;