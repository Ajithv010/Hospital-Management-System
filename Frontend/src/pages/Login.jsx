import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {

        try {

            const response = await api.post("/users/login", {
                username,
                password,
            });

            localStorage.setItem("token", response.data.token);

            alert("Login Successful");

            navigate("/dashboard");

        } catch (error) {
    console.log(error);
    console.log(error.response);
    console.log(error.response?.data);
    alert("Login Failed");
}
    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-4">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2 className="text-center mb-4">
                                Hospital Login
                            </h2>

                            <div className="mb-3">

                                <label className="form-label">
                                    Username
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                            </div>

                            <button
                                className="btn btn-primary w-100"
                                onClick={handleLogin}
                            >
                                Login
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Login;