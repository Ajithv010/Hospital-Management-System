import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

function MedicalRecords() {

    const emptyRecord = {
        patientId: "",
        diagnosis: "",
        treatment: "",
        allergies: "",
        testResults: "",
        recordDate: ""
    };

    const [records, setRecords] = useState([]);

    const [patients, setPatients] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [record, setRecord] = useState(emptyRecord);

    const [isEditing, setIsEditing] = useState(false);

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {

        loadRecords();

        loadPatients();

    }, []);

    const loadRecords = async () => {

        try {

            setLoading(true);

            const response = await api.get("/medical-records");

            setRecords(response.data);

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

    const clearForm = () => {

        setRecord(emptyRecord);

        setEditingId(null);

        setIsEditing(false);

    };

    const saveRecord = async () => {

        try {

            await api.post("/medical-records", record);

            console.log("Medical Record Added Successfully");

            clearForm();

            loadRecords();

        } catch (error) {

            console.error(error);

            alert("Failed to Add Medical Record");

        }

    };

    const editRecord = (item) => {

        setRecord({

            patientId: item.patient.patientId,

            diagnosis: item.diagnosis,

            treatment: item.treatment,

            allergies: item.allergies,

            testResults: item.testResults,

            recordDate: item.recordDate

        });

        setEditingId(item.recordId);

        setIsEditing(true);

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };

    const updateRecord = async () => {

        try {

            await api.put(

                `/medical-records/${editingId}`,

                record

            );

            console.log("Medical Record Updated Successfully");

            clearForm();

            loadRecords();

        } catch (error) {

            console.error(error);

            alert("Failed to Update Medical Record");

        }

    };

    const deleteRecord = async (id) => {

        if (!window.confirm("Delete this medical record?")) return;

        try {

            await api.delete(`/medical-records/${id}`);

            console.log("Medical Record Deleted Successfully");

            loadRecords();

        } catch (error) {

            console.error(error);

            alert("Failed to Delete Medical Record");

        }

    };

    const filteredRecords = records.filter((item) =>

        item.patient?.name.toLowerCase().includes(search.toLowerCase()) ||

        item.diagnosis.toLowerCase().includes(search.toLowerCase()) ||

        item.treatment.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <MainLayout>

<div className="container-fluid">

    {/* Header */}

    <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

            <h2 className="fw-bold mb-1">
                Medical Records
            </h2>

            <p className="text-muted mb-0">
                Manage patient diagnoses, treatments and medical history
            </p>

        </div>

        <div style={{ width: "320px" }}>

            <input
                type="text"
                className="form-control"
                placeholder="🔍 Search medical record..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

        </div>

    </div>

    {/* Medical Record Form */}

    <div className="card shadow border-0 mb-4">

        <div className="card-header bg-white">

            <h4 className="mb-0">

                {isEditing ? "Update Medical Record" : "Add New Medical Record"}

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
                        value={record.patientId}
                        onChange={(e) =>
                            setRecord({
                                ...record,
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
                        Diagnosis
                    </label>

                    <input
                        className="form-control"
                        placeholder="Enter Diagnosis"
                        value={record.diagnosis}
                        onChange={(e) =>
                            setRecord({
                                ...record,
                                diagnosis: e.target.value
                            })
                        }
                    />

                </div>

                <div className="col-md-6">

                    <label className="form-label">
                        Treatment
                    </label>

                    <input
                        className="form-control"
                        placeholder="Treatment"
                        value={record.treatment}
                        onChange={(e) =>
                            setRecord({
                                ...record,
                                treatment: e.target.value
                            })
                        }
                    />

                </div>

                <div className="col-md-6">

                    <label className="form-label">
                        Allergies
                    </label>

                    <input
                        className="form-control"
                        placeholder="Allergies"
                        value={record.allergies}
                        onChange={(e) =>
                            setRecord({
                                ...record,
                                allergies: e.target.value
                            })
                        }
                    />

                </div>

                <div className="col-md-8">

                    <label className="form-label">
                        Test Results
                    </label>

                    <textarea
                        rows="3"
                        className="form-control"
                        placeholder="Enter Test Results"
                        value={record.testResults}
                        onChange={(e) =>
                            setRecord({
                                ...record,
                                testResults: e.target.value
                            })
                        }
                    />

                </div>

                <div className="col-md-4">

                    <label className="form-label">
                        Record Date
                    </label>

                    <input
                        type="date"
                        className="form-control"
                        value={record.recordDate}
                        onChange={(e) =>
                            setRecord({
                                ...record,
                                recordDate: e.target.value
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
                            onClick={updateRecord}
                        >
                            Update Medical Record
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
                        onClick={saveRecord}
                    >
                        Save Medical Record
                    </button>

                )}

            </div>

        </div>

    </div>
    {/* Medical Records Table */}

<div className="card shadow border-0">

    <div className="card-header bg-white d-flex justify-content-between align-items-center">

        <h4 className="mb-0">
            Medical Records
        </h4>

        <span className="badge bg-primary">
            {filteredRecords.length} Records
        </span>

    </div>

    <div className="table-responsive">

        <table className="table table-hover align-middle mb-0">

            <thead className="table-light">

                <tr>

                    <th>ID</th>
                    <th>Patient</th>
                    <th>Diagnosis</th>
                    <th>Treatment</th>
                    <th>Allergies</th>
                    <th>Test Results</th>
                    <th>Date</th>
                    <th className="text-center">Actions</th>

                </tr>

            </thead>

            <tbody>

                {loading ? (

                    <tr>

                        <td
                            colSpan="8"
                            className="text-center py-5"
                        >

                            <div
                                className="spinner-border text-primary"
                                role="status"
                            ></div>

                        </td>

                    </tr>

                ) : filteredRecords.length === 0 ? (

                    <tr>

                        <td
                            colSpan="8"
                            className="text-center py-5 text-muted"
                        >

                            No Medical Records Found

                        </td>

                    </tr>

                ) : (

                    filteredRecords.map((item) => (

                        <tr key={item.recordId}>

                            <td>

                                #{item.recordId}

                            </td>

                            <td className="fw-semibold">

                                {item.patient?.name}

                            </td>

                            <td>

                                {item.diagnosis}

                            </td>

                            <td>

                                {item.treatment}

                            </td>

                            <td>

                                {item.allergies}

                            </td>

                            <td>

                                {item.testResults}

                            </td>

                            <td>

                                {item.recordDate}

                            </td>

                            <td className="text-center">

                                <button
                                    className="btn btn-outline-warning btn-sm me-2"
                                    onClick={() => editRecord(item)}
                                >
                                    ✏️ Edit
                                </button>

                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() =>
                                        deleteRecord(item.recordId)
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

export default MedicalRecords;