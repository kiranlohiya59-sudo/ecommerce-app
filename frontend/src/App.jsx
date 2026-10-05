import { useEffect, useState } from "react";
import Login from "./Login";

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8084/api/products")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                return response.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, []);

    const addToCart = (product) => {
        setCart((currentCart) => {
            const existingProduct = currentCart.find(
                (item) => item.id === product.id
            );

            if (existingProduct) {
                return currentCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...currentCart, { ...product, quantity: 1 }];
        });
    };

    const increaseQuantity = (id) => {
        setCart((currentCart) =>
            currentCart.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decreaseQuantity = (id) => {
        setCart((currentCart) =>
            currentCart
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeFromCart = (id) => {
        setCart((currentCart) =>
            currentCart.filter((item) => item.id !== id)
        );
    };

    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const cartTotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    // Login screen
    if (showLogin) {
        return (
            <div>
                <div
                    style={{
                        backgroundColor: "#222",
                        padding: "15px 40px",
                    }}
                >
                    <button
                        onClick={() => setShowLogin(false)}
                        style={{
                            padding: "10px 18px",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                        }}
                    >
                        ← Back to Shopping
                    </button>
                </div>

                <Login />
            </div>
        );
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f5f5f5",
                fontFamily: "Arial, sans-serif",
            }}
        >
            {/* Navbar */}
            <nav
                style={{
                    backgroundColor: "#222",
                    color: "white",
                    padding: "18px 40px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "15px",
                }}
            >
                <h2 style={{ margin: 0 }}>
                    Kinna's Shopping App 🛒
                </h2>

                <div>
                    <a
                        href="#home"
                        style={{
                            color: "white",
                            textDecoration: "none",
                            marginRight: "25px",
                        }}
                    >
                        Home
                    </a>

                    <a
                        href="#products"
                        style={{
                            color: "white",
                            textDecoration: "none",
                            marginRight: "25px",
                        }}
                    >
                        Products
                    </a>

                    <a
                        href="#cart"
                        style={{
                            color: "white",
                            textDecoration: "none",
                            marginRight: "25px",
                        }}
                    >
                        Cart 🛒 ({cartCount})
                    </a>

                    <button
                        onClick={() => setShowLogin(true)}
                        style={{
                            background: "none",
                            border: "none",
                            color: "white",
                            fontSize: "16px",
                            cursor: "pointer",
                        }}
                    >
                        Login
                    </button>
                </div>
            </nav>

            <main
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "40px 20px",
                }}
            >
                {/* Home */}
                <section id="home">
                    <h1
                        style={{
                            textAlign: "center",
                            marginBottom: "10px",
                        }}
                    >
                        Welcome to Kinna's Shopping App 🛍️
                    </h1>

                    <p
                        style={{
                            textAlign: "center",
                            color: "#666",
                            marginBottom: "40px",
                        }}
                    >
                        Find the best products at the best prices.
                    </p>
                </section>

                {/* Products */}
                <section id="products">
                    <h2 style={{ marginBottom: "25px" }}>
                        Our Products
                    </h2>

                    {loading && (
                        <p style={{ textAlign: "center" }}>
                            Loading products...
                        </p>
                    )}

                    {!loading && products.length === 0 && (
                        <p style={{ textAlign: "center" }}>
                            No products available.
                        </p>
                    )}

                    {!loading && products.length > 0 && (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(250px, 1fr))",
                                gap: "25px",
                            }}
                        >
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    style={{
                                        backgroundColor: "white",
                                        borderRadius: "12px",
                                        padding: "20px",
                                        boxShadow:
                                            "0 4px 12px rgba(0, 0, 0, 0.1)",
                                    }}
                                >
                                    <div
                                        style={{
                                            height: "180px",
                                            backgroundColor: "#eeeeee",
                                            borderRadius: "10px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "60px",
                                            marginBottom: "20px",
                                        }}
                                    >
                                        💻
                                    </div>

                                    <h3>{product.name}</h3>

                                    <p
                                        style={{
                                            color: "#666",
                                            minHeight: "45px",
                                        }}
                                    >
                                        {product.description}
                                    </p>

                                    <h3>
                                        ₹{product.price.toLocaleString("en-IN")}
                                    </h3>

                                    <button
                                        onClick={() => addToCart(product)}
                                        style={{
                                            width: "100%",
                                            padding: "12px",
                                            border: "none",
                                            borderRadius: "8px",
                                            backgroundColor: "#222",
                                            color: "white",
                                            fontSize: "16px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Add to Cart 🛒
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Cart */}
                <section
                    id="cart"
                    style={{
                        marginTop: "60px",
                        backgroundColor: "white",
                        padding: "30px",
                        borderRadius: "12px",
                        boxShadow:
                            "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <h2>Shopping Cart 🛒</h2>

                    {cart.length === 0 ? (
                        <p style={{ color: "#666" }}>
                            Your cart is empty.
                        </p>
                    ) : (
                        <>
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "20px 0",
                                        borderBottom: "1px solid #ddd",
                                        gap: "20px",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <div>
                                        <h3 style={{ margin: 0 }}>
                                            {item.name}
                                        </h3>

                                        <p>
                                            ₹{item.price.toLocaleString("en-IN")}
                                        </p>
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                        }}
                                    >
                                        <button
                                            onClick={() =>
                                                decreaseQuantity(item.id)
                                            }
                                            style={{
                                                padding: "6px 12px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            −
                                        </button>

                                        <strong>{item.quantity}</strong>

                                        <button
                                            onClick={() =>
                                                increaseQuantity(item.id)
                                            }
                                            style={{
                                                padding: "6px 12px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <strong>
                                        ₹
                                        {(
                                            item.price * item.quantity
                                        ).toLocaleString("en-IN")}
                                    </strong>

                                    <button
                                        onClick={() =>
                                            removeFromCart(item.id)
                                        }
                                        style={{
                                            padding: "8px 14px",
                                            border: "none",
                                            borderRadius: "6px",
                                            backgroundColor: "#dc3545",
                                            color: "white",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}

                            <div
                                style={{
                                    textAlign: "right",
                                    marginTop: "25px",
                                }}
                            >
                                <h2>
                                    Total: ₹
                                    {cartTotal.toLocaleString("en-IN")}
                                </h2>

                                <button
                                    style={{
                                        padding: "14px 25px",
                                        border: "none",
                                        borderRadius: "8px",
                                        backgroundColor: "#222",
                                        color: "white",
                                        fontSize: "16px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        alert("Checkout feature coming soon!")
                                    }
                                >
                                    Proceed to Checkout 💳
                                </button>
                            </div>
                        </>
                    )}
                </section>
            </main>
        </div>
    );
}

export default App;