import { Link, useLocation } from "react-router-dom";

function Sidebar() {

    const location = useLocation();

    const menuItems = [

        { name: "Dashboard", path: "/dashboard", icon: "bi-speedometer2" },

        { name: "Patients", path: "/patients", icon: "bi-people-fill" },

        { name: "Doctors", path: "/doctors", icon: "bi-person-badge-fill" },

        { name: "Appointments", path: "/appointments", icon: "bi-calendar-check-fill" },

        { name: "Bills", path: "/bills", icon: "bi-cash-stack" },

        { name: "Prescriptions", path: "/prescriptions", icon: "bi-capsule-pill" },

        { name: "Medical Records", path: "/medical-records", icon: "bi-file-earmark-medical-fill" }

    ];

    return (

        <div
            className="sidebar bg-white shadow-lg d-flex flex-column"
            style={{
                width: "260px",
                minHeight: "100vh",
                borderRight: "1px solid #e5e7eb"
            }}
        >

            {/* Logo */}

            <div className="text-center py-4 border-bottom">

                <div
                    className="mx-auto mb-3 d-flex justify-content-center align-items-center rounded-circle"
                    style={{
                        width: "60px",
                        height: "60px",
                        background: "#0d6efd",
                        color: "white",
                        fontSize: "28px"
                    }}
                >
                    <i className="bi bi-hospital-fill"></i>
                </div>

                <h4 className="fw-bold mb-0">
                    MediCare
                </h4>

                <small className="text-muted">
                    Hospital System
                </small>

            </div>

            {/* Menu */}

            <ul className="nav flex-column p-3">

                {menuItems.map((item) => (

                    <li className="nav-item mb-2" key={item.path}>

                        <Link

                            to={item.path}

                            className={`nav-link d-flex align-items-center sidebar-link ${
                                location.pathname === item.path
                                    ? "active-link"
                                    : ""
                            }`}

                        >

                            <i className={`${item.icon} me-3 fs-5`}></i>

                            {item.name}

                        </Link>

                    </li>

                ))}

            </ul>
                        {/* Bottom */}

            <div className="mt-auto p-3 border-top">

                <div className="card border-0 bg-light mb-3">

                    <div className="card-body text-center">

                        <div
                            className="mx-auto rounded-circle bg-primary text-white d-flex justify-content-center align-items-center mb-2"
                            style={{
                                width: "55px",
                                height: "55px",
                                fontSize: "22px"
                            }}
                        >
                            <i className="bi bi-person-fill"></i>
                        </div>

                        <h6 className="mb-0">
                            Admin
                        </h6>

                        <small className="text-muted">
                            Hospital Administrator
                        </small>

                    </div>

                </div>

                <Link
                    to="/login"
                    className="btn btn-danger w-100 d-flex align-items-center justify-content-center"
                >
                    <i className="bi bi-box-arrow-right me-2"></i>

                    Logout
                </Link>

            </div>

        </div>

    );

}

export default Sidebar;