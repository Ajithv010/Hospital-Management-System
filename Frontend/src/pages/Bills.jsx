import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

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

    const [bill, setBill] = useState(emptyBill);

    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadBills();
        loadPatients();
    }, []);

    const loadBills = async () => {
        try {
            const res = await api.get("/bills");
            setBills(res.data);
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

        setBill(emptyBill);

        setEditingId(null);

        setIsEditing(false);
    };

    const saveBill = async () => {

        try {

            await api.post("/bills", bill);

            alert("Bill Added Successfully");

            clearForm();

            loadBills();

        } catch (err) {

            console.error(err);

            alert("Failed to Add Bill");
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
    };

    const updateBill = async () => {

        try {

            await api.put(`/bills/${editingId}`, bill);

            alert("Bill Updated Successfully");

            clearForm();

            loadBills();

        } catch (err) {

            console.error(err);

            alert("Update Failed");
        }
    };

    const deleteBill = async (id) => {

        if (!window.confirm("Delete Bill?")) return;

        try {

            await api.delete(`/bills/${id}`);

            alert("Bill Deleted");

            loadBills();

        } catch (err) {

            console.error(err);

            alert("Delete Failed");
        }
    };

    return (

        <MainLayout>

            <h2 className="mb-4">
                Bills
            </h2>

            <div className="card mb-4">

                <div className="card-body">

                    <h5>
                        {isEditing ? "Update Bill" : "Add Bill"}
                    </h5>

                    <div className="row">

                        <div className="col-md-4 mb-3">

                            <select
                                className="form-control"
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

                        <div className="col-md-4 mb-3">

                            <input
                                type="number"
                                className="form-control"
                                placeholder="Amount"
                                value={bill.amount}
                                onChange={(e) =>
                                    setBill({
                                        ...bill,
                                        amount: e.target.value
                                    })
                                }
                            />

                        </div>
                                                <div className="col-md-4 mb-3">

                            <select
                                className="form-control"
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

                        <div className="col-md-4 mb-3">

                            <select
                                className="form-control"
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

                        <div className="col-md-4 mb-3">

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
                            className="btn btn-success"
                            onClick={saveBill}
                        >
                            Save Bill
                        </button>

                    )}

                </div>

            </div>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>
                        <th>ID</th>
                        <th>Patient</th>
                        <th>Amount</th>
                        <th>Payment Method</th>
                        <th>Payment Status</th>
                        <th>Bill Date</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {bills.map((item) => (

                        <tr key={item.billId}>

                            <td>{item.billId}</td>
                            <td>{item.patient?.name}</td>
                            <td>₹ {item.amount}</td>
                            <td>{item.paymentMethod}</td>
                            <td>{item.paymentStatus}</td>
                            <td>{item.billDate}</td>

                            <td>

                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => editBill(item)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteBill(item.billId)}
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

export default Bills;