function Register() {
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
                    width: "380px",
                    backgroundColor: "white",
                    padding: "35px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                }}
            >
                <h2 style={{ textAlign: "center" }}>
                    Create Account 📝
                </h2>

                <p
                    style={{
                        textAlign: "center",
                        color: "#666",
                        marginBottom: "25px",
                    }}
                >
                    Join Kinna's Shopping App
                </p>

                <label>Full Name</label>

                <input
                    type="text"
                    placeholder="Enter your full name"
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "8px",
                        marginBottom: "18px",
                        boxSizing: "border-box",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                    }}
                />

                <label>Email</label>

                <input
                    type="email"
                    placeholder="Enter your email"
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "8px",
                        marginBottom: "18px",
                        boxSizing: "border-box",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                    }}
                />

                <label>Password</label>

                <input
                    type="password"
                    placeholder="Create a password"
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "8px",
                        marginBottom: "18px",
                        boxSizing: "border-box",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                    }}
                />

                <label>Confirm Password</label>

                <input
                    type="password"
                    placeholder="Confirm your password"
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "8px",
                        marginBottom: "22px",
                        boxSizing: "border-box",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                    }}
                />

                <button
                    onClick={() => alert("Registration feature coming soon!")}
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
                    Create Account
                </button>

                <p
                    style={{
                        textAlign: "center",
                        marginTop: "20px",
                        color: "#666",
                    }}
                >
                    Already have an account? Login
                </p>
            </div>
        </div>
    );
}

export default Register;