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

    const [record, setRecord] = useState(emptyRecord);

    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadRecords();
        loadPatients();
    }, []);

    const loadRecords = async () => {
        try {
            const res = await api.get("/medical-records");
            setRecords(res.data);
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

    const clearForm = () => {

        setRecord(emptyRecord);

        setEditingId(null);

        setIsEditing(false);
    };

    const saveRecord = async () => {

        try {

            await api.post("/medical-records", record);

            alert("Medical Record Added Successfully");

            clearForm();

            loadRecords();

        } catch (err) {

            console.error(err);

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
    };

    const updateRecord = async () => {

        try {

            await api.put(
                `/medical-records/${editingId}`,
                record
            );

            alert("Medical Record Updated Successfully");

            clearForm();

            loadRecords();

        } catch (err) {

            console.error(err);

            alert("Update Failed");
        }
    };

    const deleteRecord = async (id) => {

        if (!window.confirm("Delete Medical Record?")) return;

        try {

            await api.delete(`/medical-records/${id}`);

            alert("Medical Record Deleted");

            loadRecords();

        } catch (err) {

            console.error(err);

            alert("Delete Failed");
        }
    };

    return (

        <MainLayout>

            <h2 className="mb-4">
                Medical Records
            </h2>

            <div className="card mb-4">

                <div className="card-body">

                    <h5>
                        {isEditing ? "Update Medical Record" : "Add Medical Record"}
                    </h5>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <select
                                className="form-control"
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

                            <input
                                className="form-control"
                                placeholder="Diagnosis"
                                value={record.diagnosis}
                                onChange={(e) =>
                                    setRecord({
                                        ...record,
                                        diagnosis: e.target.value
                                    })
                                }
                            />

                        </div>
                                                <div className="col-md-6 mb-3">

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

                        <div className="col-md-6 mb-3">

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

                        <div className="col-md-6 mb-3">

                            <input
                                className="form-control"
                                placeholder="Test Results"
                                value={record.testResults}
                                onChange={(e) =>
                                    setRecord({
                                        ...record,
                                        testResults: e.target.value
                                    })
                                }
                            />

                        </div>

                        <div className="col-md-6 mb-3">

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
                            className="btn btn-success"
                            onClick={saveRecord}
                        >
                            Save Medical Record
                        </button>

                    )}

                </div>

            </div>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>
                        <th>ID</th>
                        <th>Patient</th>
                        <th>Diagnosis</th>
                        <th>Treatment</th>
                        <th>Allergies</th>
                        <th>Test Results</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {records.map((item) => (

                        <tr key={item.recordId}>

                            <td>{item.recordId}</td>
                            <td>{item.patient?.name}</td>
                            <td>{item.diagnosis}</td>
                            <td>{item.treatment}</td>
                            <td>{item.allergies}</td>
                            <td>{item.testResults}</td>
                            <td>{item.recordDate}</td>

                            <td>

                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => editRecord(item)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteRecord(item.recordId)}
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

export default MedicalRecords;