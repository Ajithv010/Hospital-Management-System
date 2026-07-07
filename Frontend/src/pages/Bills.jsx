import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
function Bills() {

    const emptyBill = {
        patientId: "",
        amount: "",
        paymentMethod: "Cash",
        paymentStatus: "Pending",
        billDate: ""
    };

    const [bills, setBills] = useState([]);

    const [patients, setPatients] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [bill, setBill] = useState(emptyBill);

    const [isEditing, setIsEditing] = useState(false);

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {

        loadBills();

        loadPatients();

    }, []);

    const loadBills = async () => {

        try {

            setLoading(true);

            const response = await api.get("/bills");

            setBills(response.data);

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

        setBill(emptyBill);

        setEditingId(null);

        setIsEditing(false);

    };

    const saveBill = async () => {

        try {

            await api.post("/bills", bill);

            toast.success("Bill Added Successfully");

            clearForm();

            loadBills();

        } catch (error) {

            console.error(error);

            toast.error("Failed to Add Bill");

        }

    };

    const editBill = (item) => {

        setBill({

            patientId: item.patient.patientId,

            amount: item.amount,

            paymentMethod: item.paymentMethod,

            paymentStatus: item.paymentStatus,

            billDate: item.billDate

        });

        setEditingId(item.billId);

        setIsEditing(true);

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };

    const updateBill = async () => {

        try {

            await api.put(`/bills/${editingId}`, bill);

            toast.success("Bill Updated Successfully");

            clearForm();

            loadBills();

        } catch (error) {

            console.error(error);

            toast.error("Failed to Update Bill");

        }

    };

   const deleteBill = async (id) => {

    const result = await Swal.fire({
        title: "Delete Bill?",
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

        await api.delete(`/bills/${id}`);

        toast.success("Bill Deleted Successfully");

        loadBills();

    } catch (error) {

        console.error(error);

        toast.error("Failed to Delete Bill");

    }

};

    const filteredBills = bills.filter((item) =>

        item.patient?.name.toLowerCase().includes(search.toLowerCase()) ||

        item.paymentMethod.toLowerCase().includes(search.toLowerCase()) ||

        item.paymentStatus.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <MainLayout>
            <div className="container-fluid">

    {/* Header */}

    <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

            <h2 className="fw-bold mb-1">
                Bills
            </h2>

            <p className="text-muted mb-0">
                Manage billing and payment information
            </p>

        </div>

        <div style={{ width: "320px" }}>

            <input
                type="text"
                className="form-control"
                placeholder="🔍 Search bill..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

        </div>

    </div>

    {/* Bill Form */}

    <div className="card shadow border-0 mb-4">

        <div className="card-header bg-white">

            <h4 className="mb-0">

                {isEditing ? "Update Bill" : "Add New Bill"}

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
                        value={bill.patientId}
                        onChange={(e) =>
                            setBill({
                                ...bill,
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
                        Amount
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Amount"
                        value={bill.amount}
                        onChange={(e) =>
                            setBill({
                                ...bill,
                                amount: e.target.value
                            })
                        }
                    />

                </div>

                <div className="col-md-4">

                    <label className="form-label">
                        Payment Method
                    </label>

                    <select
                        className="form-select"
                        value={bill.paymentMethod}
                        onChange={(e) =>
                            setBill({
                                ...bill,
                                paymentMethod: e.target.value
                            })
                        }
                    >

                        <option>Cash</option>
                        <option>Card</option>
                        <option>UPI</option>
                        <option>Net Banking</option>

                    </select>

                </div>

                <div className="col-md-4">

                    <label className="form-label">
                        Payment Status
                    </label>

                    <select
                        className="form-select"
                        value={bill.paymentStatus}
                        onChange={(e) =>
                            setBill({
                                ...bill,
                                paymentStatus: e.target.value
                            })
                        }
                    >

                        <option>Pending</option>
                        <option>Paid</option>

                    </select>

                </div>

                <div className="col-md-4">

                    <label className="form-label">
                        Bill Date
                    </label>

                    <input
                        type="date"
                        className="form-control"
                        value={bill.billDate}
                        onChange={(e) =>
                            setBill({
                                ...bill,
                                billDate: e.target.value
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
                            onClick={updateBill}
                        >
                            Update Bill
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
                        onClick={saveBill}
                    >
                        Save Bill
                    </button>

                )}

            </div>

        </div>

    </div>
    {/* Bills Table */}

<div className="card shadow border-0">

    <div className="card-header bg-white d-flex justify-content-between align-items-center">

        <h4 className="mb-0">
            Bill List
        </h4>

        <span className="badge bg-success">
            {filteredBills.length} Bills
        </span>

    </div>

    <div className="table-responsive">

        <table className="table table-hover align-middle mb-0">

            <thead className="table-light">

                <tr>

                    <th>ID</th>
                    <th>Patient</th>
                    <th>Amount</th>
                    <th>Payment Method</th>
                    <th>Payment Status</th>
                    <th>Bill Date</th>
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

                ) : filteredBills.length === 0 ? (

                    <tr>

                        <td
                            colSpan="7"
                            className="text-center py-5 text-muted"
                        >

                            No Bills Found

                        </td>

                    </tr>

                ) : (

                    filteredBills.map((item) => (

                        <tr key={item.billId}>

                            <td>

                                #{item.billId}

                            </td>

                            <td className="fw-semibold">

                                {item.patient?.name}

                            </td>

                            <td>

                                ₹ {item.amount}

                            </td>

                            <td>

                                {item.paymentMethod}

                            </td>

                            <td>

                                <span
                                    className={`badge ${
                                        item.paymentStatus === "Paid"
                                            ? "bg-success"
                                            : "bg-warning text-dark"
                                    }`}
                                >

                                    {item.paymentStatus}

                                </span>

                            </td>

                            <td>

                                {item.billDate}

                            </td>

                            <td className="text-center">

                                <button
                                    className="btn btn-outline-warning btn-sm me-2"
                                    onClick={() => editBill(item)}
                                >

                                    ✏️ Edit

                                </button>

                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() =>
                                        deleteBill(item.billId)
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

export default Bills;
