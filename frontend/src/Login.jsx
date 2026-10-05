function Login({ onBack, onRegister }) {
    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f5f5f5",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <div
                style={{
                    width: "350px",
                    backgroundColor: "white",
                    padding: "35px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                }}
            >
                <h2 style={{ textAlign: "center" }}>
                    Login 🔐
                </h2>

                <p
                    style={{
                        textAlign: "center",
                        color: "#666",
                        marginBottom: "25px",
                    }}
                >
                    Welcome back to Kinna's Shopping App
                </p>

                <label>Email</label>

                <input
                    type="email"
                    placeholder="Enter your email"
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "8px",
                        marginBottom: "20px",
                        boxSizing: "border-box",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                    }}
                />

                <label>Password</label>

                <input
                    type="password"
                    placeholder="Enter your password"
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "8px",
                        marginBottom: "20px",
                        boxSizing: "border-box",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                    }}
                />

                <button
                    onClick={() => alert("Login feature coming soon!")}
                    style={{
                        width: "100%",
                        padding: "12px",
                        border: "none",
                        borderRadius: "6px",
                        backgroundColor: "#222",
                        color: "white",
                        fontSize: "16px",
                        cursor: "pointer",
                    }}
                >
                    Login
                </button>

                <p
                    style={{
                        textAlign: "center",
                        marginTop: "20px",
                        color: "#666",
                    }}
                >
                    Don't have an account?
                </p>

                <button
                    onClick={onRegister}
                    style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #222",
                        borderRadius: "6px",
                        backgroundColor: "white",
                        color: "#222",
                        fontSize: "15px",
                        cursor: "pointer",
                    }}
                >
                    Sign Up
                </button>

                <button
                    onClick={onBack}
                    style={{
                        width: "100%",
                        marginTop: "12px",
                        padding: "10px",
                        border: "none",
                        backgroundColor: "transparent",
                        color: "#666",
                        cursor: "pointer",
                    }}
                >
                    ← Back to Shopping
                </button>
            </div>
        </div>
    );
}

export default Login;