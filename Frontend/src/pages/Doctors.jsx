import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
function Doctors() {

    const emptyDoctor = {
        name: "",
        specialization: "",
        phone: "",
        email: "",
        experience: ""
    };

    const [doctors, setDoctors] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [doctor, setDoctor] = useState(emptyDoctor);

    const [isEditing, setIsEditing] = useState(false);

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {

        loadDoctors();

    }, []);

    const loadDoctors = async () => {

        try {

            setLoading(true);

            const response = await api.get("/doctors");

            setDoctors(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const clearForm = () => {

        setDoctor(emptyDoctor);

        setEditingId(null);

        setIsEditing(false);

    };

    const saveDoctor = async () => {

        try {

            await api.post("/doctors", doctor);

            toast.success("Doctor Added Successfully");

            clearForm();

            loadDoctors();

        } catch (error) {

            console.error(error);

            toast.error("Failed to Add Doctor");

        }

    };

    const editDoctor = (doctor) => {

        setDoctor({

            name: doctor.name,

            specialization: doctor.specialization,

            phone: doctor.phone,

            email: doctor.email,

            experience: doctor.experience

        });

        setEditingId(doctor.doctorId);

        setIsEditing(true);

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };

    const updateDoctor = async () => {

        try {

            await api.put(`/doctors/${editingId}`, doctor);

            toast.success("Doctor Updated Successfully");

            clearForm();

            loadDoctors();

        } catch (error) {

            console.error(error);

            toast.error("Failed to Update Doctor");

        }

    };

    const deleteDoctor = async (id) => {

    const result = await Swal.fire({
        title: "Delete Doctor?",
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

        await api.delete(`/doctors/${id}`);

        toast.success("Doctor Deleted Successfully");

        loadDoctors();

    } catch (error) {

        console.error(error);

        toast.error("Failed to Delete Doctor");

    }

};

    const filteredDoctors = doctors.filter((doctor) =>

        doctor.name.toLowerCase().includes(search.toLowerCase()) ||

        doctor.specialization.toLowerCase().includes(search.toLowerCase()) ||

        doctor.phone.includes(search)

    );

    return (

        <MainLayout>
          <div className="container-fluid">

    {/* Header */}

    <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

            <h2 className="fw-bold mb-1">
                Doctors
            </h2>

            <p className="text-muted mb-0">
                Manage all registered doctors
            </p>

        </div>

        <div style={{ width: "300px" }}>

            <input
                type="text"
                className="form-control"
                placeholder="🔍 Search doctor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

        </div>

    </div>

    {/* Doctor Form */}

    <div className="card shadow border-0 mb-4">

        <div className="card-header bg-white">

            <h4 className="mb-0">

                {isEditing ? "Update Doctor" : "Add New Doctor"}

            </h4>

        </div>

        <div className="card-body">

            <div className="row g-3">

                <div className="col-md-6">

                    <label className="form-label">
                        Doctor Name
                    </label>

                    <input
                        className="form-control"
                        placeholder="Enter Doctor Name"
                        value={doctor.name}
                        onChange={(e) =>
                            setDoctor({
                                ...doctor,
                                name: e.target.value
                            })
                        }
                    />

                </div>

                <div className="col-md-6">

                    <label className="form-label">
                        Specialization
                    </label>

                    <input
                        className="form-control"
                        placeholder="Cardiology"
                        value={doctor.specialization}
                        onChange={(e) =>
                            setDoctor({
                                ...doctor,
                                specialization: e.target.value
                            })
                        }
                    />

                </div>

                <div className="col-md-6">

                    <label className="form-label">
                        Phone
                    </label>

                    <input
                        className="form-control"
                        placeholder="9876543210"
                        value={doctor.phone}
                        onChange={(e) =>
                            setDoctor({
                                ...doctor,
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
                        placeholder="doctor@gmail.com"
                        value={doctor.email}
                        onChange={(e) =>
                            setDoctor({
                                ...doctor,
                                email: e.target.value
                            })
                        }
                    />

                </div>

                <div className="col-md-12">

                    <label className="form-label">
                        Experience (Years)
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        placeholder="10"
                        value={doctor.experience}
                        onChange={(e) =>
                            setDoctor({
                                ...doctor,
                                experience: e.target.value
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
                            onClick={updateDoctor}
                        >
                            Update Doctor
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
                        onClick={saveDoctor}
                    >
                        Save Doctor
                    </button>

                )}

            </div>

        </div>

    </div>
    {/* Doctors Table */}

<div className="card shadow border-0">

    <div className="card-header bg-white d-flex justify-content-between align-items-center">

        <h4 className="mb-0">
            Doctor List
        </h4>

        <span className="badge bg-success">
            {filteredDoctors.length} Doctors
        </span>

    </div>

    <div className="table-responsive">

        <table className="table table-hover align-middle mb-0">

            <thead className="table-light">

                <tr>

                    <th>ID</th>
                    <th>Name</th>
                    <th>Specialization</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Experience</th>
                    <th className="text-center">Actions</th>

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

                ) : filteredDoctors.length === 0 ? (

                    <tr>

                        <td
                            colSpan="7"
                            className="text-center py-5 text-muted"
                        >

                            No Doctors Found

                        </td>

                    </tr>

                ) : (

                    filteredDoctors.map((doctor) => (

                        <tr key={doctor.doctorId}>

                            <td>

                                #{doctor.doctorId}

                            </td>

                            <td className="fw-semibold">

                                {doctor.name}

                            </td>

                            <td>

                                <span className="badge bg-info">

                                    {doctor.specialization}

                                </span>

                            </td>

                            <td>

                                {doctor.phone}

                            </td>

                            <td>

                                {doctor.email}

                            </td>

                            <td>

                                {doctor.experience} Years

                            </td>

                            <td className="text-center">

                                <button
                                    className="btn btn-outline-warning btn-sm me-2"
                                    onClick={() => editDoctor(doctor)}
                                >
                                    ✏️ Edit
                                </button>

                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() =>
                                        deleteDoctor(doctor.doctorId)
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

export default Doctors;
