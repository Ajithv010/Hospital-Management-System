import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

function Patients() {

    const [patients, setPatients] = useState([]);

    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [patient, setPatient] = useState({
        name: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        address: ""
    });

    useEffect(() => {
        loadPatients();
    }, []);

    // Load Patients
    const loadPatients = async () => {
        try {
            const response = await api.get("/patients");
            setPatients(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Save Patient
    const savePatient = async () => {
        try {

            await api.post("/patients", patient);

            alert("Patient Added Successfully");

            clearForm();

            loadPatients();

        } catch (error) {

            console.error(error);

            alert("Failed to Add Patient");
        }
    };

    // Edit Patient
    const editPatient = (patient) => {

        setPatient({
            name: patient.name,
            age: patient.age,
            gender: patient.gender,
            phone: patient.phone,
            email: patient.email,
            address: patient.address
        });

        setEditingId(patient.patientId);

        setIsEditing(true);
    };

    // Update Patient
    const updatePatient = async () => {

        try {

            await api.put(`/patients/${editingId}`, patient);

            alert("Patient Updated Successfully");

            clearForm();

            loadPatients();

        } catch (error) {

            console.error(error);

            alert("Failed to Update Patient");
        }
    };

    // Delete Patient
    const deletePatient = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this patient?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/patients/${id}`);

            alert("Patient Deleted Successfully");

            loadPatients();

        } catch (error) {

            console.error(error);

            alert("Failed to Delete Patient");
        }
    };

    // Clear Form
    const clearForm = () => {

        setPatient({
            name: "",
            age: "",
            gender: "",
            phone: "",
            email: "",
            address: ""
        });

        setEditingId(null);

        setIsEditing(false);
    };

    return (

        <MainLayout>

            <h2 className="mb-4">Patients</h2>

            <div className="card mb-4 shadow">

                <div className="card-body">

                    <h5 className="mb-3">
                        {isEditing ? "Update Patient" : "Add Patient"}
                    </h5>

                    <div className="row">

                        <div className="col-md-4 mb-3">
                            <input
                                className="form-control"
                                placeholder="Name"
                                value={patient.name}
                                onChange={(e) =>
                                    setPatient({ ...patient, name: e.target.value })
                                }
                            />
                        </div>

                        <div className="col-md-2 mb-3">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Age"
                                value={patient.age}
                                onChange={(e) =>
                                    setPatient({ ...patient, age: e.target.value })
                                }
                            />
                        </div>

                        <div className="col-md-2 mb-3">
                            <input
                                className="form-control"
                                placeholder="Gender"
                                value={patient.gender}
                                onChange={(e) =>
                                    setPatient({ ...patient, gender: e.target.value })
                                }
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <input
                                className="form-control"
                                placeholder="Phone"
                                value={patient.phone}
                                onChange={(e) =>
                                    setPatient({ ...patient, phone: e.target.value })
                                }
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <input
                                className="form-control"
                                placeholder="Email"
                                value={patient.email}
                                onChange={(e) =>
                                    setPatient({ ...patient, email: e.target.value })
                                }
                            />
                        </div>

                        <div className="col-md-8 mb-3">
                            <input
                                className="form-control"
                                placeholder="Address"
                                value={patient.address}
                                onChange={(e) =>
                                    setPatient({ ...patient, address: e.target.value })
                                }
                            />
                        </div>

                    </div>

                    {isEditing ? (

                        <>
                            <button
                                className="btn btn-warning me-2"
                                onClick={updatePatient}
                            >
                                Update Patient
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
                            onClick={savePatient}
                        >
                            Save Patient
                        </button>

                    )}

                </div>

            </div>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th width="180">Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {patients.map((patient) => (

                        <tr key={patient.patientId}>

                            <td>{patient.patientId}</td>
                            <td>{patient.name}</td>
                            <td>{patient.age}</td>
                            <td>{patient.gender}</td>
                            <td>{patient.phone}</td>
                            <td>{patient.email}</td>
                            <td>{patient.address}</td>

                            <td>

                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => editPatient(patient)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deletePatient(patient.patientId)}
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

export default Patients;