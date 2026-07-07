import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
function Patients() {

    const [patients, setPatients] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

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

    const loadPatients = async () => {

        try {

            setLoading(true);

            const response = await api.get("/patients");

            setPatients(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

   const savePatient = async () => {
    if (!patient.name.trim()) {
    toast.error("Patient name is required");
    return;
}

if (!patient.age || patient.age <= 0) {
    toast.error("Enter a valid age");
    return;
}

if (!patient.gender) {
    toast.error("Select gender");
    return;
}

if (!patient.phone || patient.phone.length !== 10) {
    toast.error("Phone number must be 10 digits");
    return;
}

if (!patient.email.includes("@")) {
    toast.error("Enter a valid email");
    return;
}

if (!patient.address.trim()) {
    toast.error("Address is required");
    return;
}

    try {

        await api.post("/patients", patient);

        toast.success("Patient Added Successfully");

        clearForm();

        loadPatients();

    } catch (error) {

        console.error(error);

        toast.error("Failed to Add Patient");

    }

};

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

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };

    const updatePatient = async () => {

    try {

        await api.put(`/patients/${editingId}`, patient);

        toast.success("Patient Updated Successfully");

        clearForm();

        loadPatients();

    } catch (error) {

        console.error(error);

        toast.error("Failed to Update Patient");

    }

};

  const deletePatient = async (id) => {

    const result = await Swal.fire({
    title: "Delete Patient?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc3545",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel"
});

if (!result.isConfirmed) return;

try {

    await api.delete(`/patients/${id}`);

    toast.success("Patient Deleted Successfully");

    loadPatients();

} catch (error) {

    console.error(error);

    toast.error("Failed to Delete Patient");

}

};

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

    const filteredPatients = patients.filter((patient) =>

        patient.name.toLowerCase().includes(search.toLowerCase()) ||

        patient.email.toLowerCase().includes(search.toLowerCase()) ||

        patient.phone.includes(search)

    );

    return (

        <MainLayout>

<div className="container-fluid">

    {/* Header */}

    <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

            <h2 className="fw-bold mb-1">
                Patients
            </h2>

            <p className="text-muted mb-0">
                Manage all registered patients
            </p>

        </div>

        <div style={{ width: "300px" }}>

            <input
                type="text"
                className="form-control"
                placeholder="🔍 Search patient..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

        </div>

    </div>

    {/* Patient Form */}

    <div className="card shadow border-0 mb-4">

        <div className="card-header bg-white">

            <h4 className="mb-0">

                {isEditing ? "Update Patient" : "Add New Patient"}

            </h4>

        </div>

        <div className="card-body">

            <div className="row g-3">

                <div className="col-md-6">

                    <label className="form-label">
                        Full Name
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Name"
                        value={patient.name}
                        onChange={(e) =>
                            setPatient({
                                ...patient,
                                name: e.target.value
                            })
                        }
                    />

                </div>

                <div className="col-md-2">

                    <label className="form-label">
                        Age
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        placeholder="Age"
                        value={patient.age}
                        onChange={(e) =>
                            setPatient({
                                ...patient,
                                age: e.target.value
                            })
                        }
                    />

                </div>

                <div className="col-md-4">

                    <label className="form-label">
                        Gender
                    </label>

                    <select
                        className="form-select"
                        value={patient.gender}
                        onChange={(e) =>
                            setPatient({
                                ...patient,
                                gender: e.target.value
                            })
                        }
                    >

                        <option value="">Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>

                    </select>

                </div>

                <div className="col-md-6">

                    <label className="form-label">
                        Phone
                    </label>

                    <input
                        className="form-control"
                        placeholder="Phone Number"
                        value={patient.phone}
                        onChange={(e) =>
                            setPatient({
                                ...patient,
                                phone: e.target.value
                            })
                        }
                    />

                </div>

                <div className="col-md-6">

                    <label className="form-label">
                        Email
                    </label>

                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email Address"
                        value={patient.email}
                        onChange={(e) =>
                            setPatient({
                                ...patient,
                                email: e.target.value
                            })
                        }
                    />

                </div>

                <div className="col-12">

                    <label className="form-label">
                        Address
                    </label>

                    <textarea
                        rows="3"
                        className="form-control"
                        placeholder="Patient Address"
                        value={patient.address}
                        onChange={(e) =>
                            setPatient({
                                ...patient,
                                address: e.target.value
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
                        className="btn btn-primary"
                        onClick={savePatient}
                    >
                        Save Patient
                    </button>

                )}

            </div>

        </div>

    </div>
    {/* Patient Table */}

<div className="card shadow border-0">

    <div className="card-header bg-white d-flex justify-content-between align-items-center">

        <h4 className="mb-0">
            Patient List
        </h4>

        <span className="badge bg-primary">
            {filteredPatients.length} Patients
        </span>

    </div>

    <div className="table-responsive">

        <table className="table table-hover align-middle mb-0">

            <thead className="table-light">

                <tr>

                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Address</th>
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

                ) : filteredPatients.length === 0 ? (

                    <tr>

                        <td
                            colSpan="8"
                            className="text-center py-5 text-muted"
                        >

                            No Patients Found

                        </td>

                    </tr>

                ) : (

                    filteredPatients.map((patient) => (

                        <tr key={patient.patientId}>

                            <td>

                                #{patient.patientId}

                            </td>

                            <td className="fw-semibold">

                                {patient.name}

                            </td>

                            <td>

                                {patient.age}

                            </td>

                            <td>

                                <span
                                    className={`badge ${
                                        patient.gender === "Male"
                                            ? "bg-primary"
                                            : patient.gender === "Female"
                                            ? "bg-danger"
                                            : "bg-secondary"
                                    }`}
                                >

                                    {patient.gender}

                                </span>

                            </td>

                            <td>

                                {patient.phone}

                            </td>

                            <td>

                                {patient.email}

                            </td>

                            <td>

                                {patient.address}

                            </td>

                            <td className="text-center">

                                <button
                                    className="btn btn-outline-warning btn-sm me-2"
                                    onClick={() => editPatient(patient)}
                                >

                                    ✏️ Edit

                                </button>

                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() =>
                                        deletePatient(patient.patientId)
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

export default Patients;