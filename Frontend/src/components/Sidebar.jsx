import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div
            className="bg-dark text-white p-3"
            style={{
                width: "250px",
                minHeight: "100vh"
            }}
        >
            <h3 className="text-center mb-4">
                Hospital
            </h3>

            <ul className="nav flex-column">

                <li className="nav-item">
                    <Link className="nav-link text-white" to="/dashboard">
                        Dashboard
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link text-white" to="/patients">
                        Patients
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link text-white" to="/doctors">
                        Doctors
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link text-white" to="/appointments">
                        Appointments
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link text-white" to="/bills">
                        Bills
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link text-white" to="/prescriptions">
                        Prescriptions
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link text-white" to="/medical-records">
                        Medical Records
                    </Link>
                </li>

                <li className="nav-item mt-4">
                    <Link className="nav-link text-danger" to="/login">
                        Logout
                    </Link>
                </li>

            </ul>
        </div>
    );
}

export default Sidebar;