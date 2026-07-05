import { useLocation } from "react-router-dom";

function Navbar() {

    const location = useLocation();

    const pageTitle = location.pathname
        .replace("/", "")
        .replace("-", " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()) || "Dashboard";

    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    return (

        <nav className="navbar bg-white shadow-sm px-4 py-3">

            <div>

                <h3 className="fw-bold mb-0">
                    {pageTitle}
                </h3>

                <small className="text-muted">
                    {today}
                </small>

            </div>

            <div className="d-flex align-items-center">

                <div className="input-group me-4" style={{ width: "300px" }}>

                    <span className="input-group-text bg-light border-end-0">

                        <i className="bi bi-search"></i>

                    </span>

                    <input
                        type="text"
                        className="form-control border-start-0"
                        placeholder="Search..."
                    />

                </div>

                <button className="btn btn-light position-relative me-3">

                    <i className="bi bi-bell fs-5"></i>

                    <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    >
                        3
                    </span>

                </button>

                <div className="d-flex align-items-center">

                    <div
                        className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-2"
                        style={{
                            width: "45px",
                            height: "45px",
                            fontWeight: "bold"
                        }}
                    >
                        A
                    </div>

                    <div>

                        <h6 className="mb-0">
                            Admin
                        </h6>

                        <small className="text-muted">
                            Administrator
                        </small>

                    </div>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;