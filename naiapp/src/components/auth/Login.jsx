import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [userEmail, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [userType, setUserType] = useState(null); // ✅ Fix: Avoid empty string issue
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleUserTypeChange = (selectedType) => {
        setUserType(selectedType.target.value);
    };

    const handleFormValidate = async () => {
        const error = {};

        if (!userEmail) {
            error.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(userEmail)) {
            error.email = "Invalid email address";
        }

        if (!pass) {
            error.password = "Password is required";
        }

        if (!userType) {
            error.userType = "Please select a user type";
        }

        setErrors(error);

        if (Object.keys(error).length === 0) {
            try {
                const credentials = {
                    email: userEmail,
                    password: pass,
                    isAdmin: userType === 'company'
                };

                const res = await axios.post(
                    "http://localhost:5000/salon/login",
                    credentials,
                    { headers: { "Content-Type": "application/json" } }
                );

                if (res.status === 200) {
                    alert("✅ Login Successful!");
                    localStorage.setItem('isLogin', "true"); // ✅ Fix: Store as string
                    localStorage.setItem('email', userEmail);
                    localStorage.setItem('isAdmin', String(userType === 'company')); // ✅ Fix: Convert boolean to string
                    navigate('/');
                    window.location.reload();
                } else {
                    alert("⚠️ Login failed: " + res.data.message);
                }
            } catch (error) {
                alert("❌ Login Error: " + (error.response?.data?.message || "Server Error"));
            }
        }
    };

    return (
        <Row>
            <Col md={12}>
                <div className="modal show" style={{ display: 'block', position: 'initial' }}>
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>Login</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Row>
                                    <Col md={4}>
                                        <b>Login as </b>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Check
                                            type="radio"
                                            onChange={handleUserTypeChange}
                                            checked={userType === 'user'} // ✅ Fix: Ensure correct state mapping
                                            label="User"
                                            value="user"
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Form.Check
                                            type="radio"
                                            onChange={handleUserTypeChange}
                                            checked={userType === 'company'} // ✅ Fix: Ensure correct state mapping
                                            label="Admin"
                                            value="company"
                                        />
                                    </Col>
                                </Row>
                                <br />
                                <Form.Group className="mb-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        autoComplete="off" // ✅ Fix: Prevent autofill
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter email"
                                    />
                                    <Form.Text className="text-danger">{errors.email}</Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        autoComplete="off" // ✅ Fix: Prevent autofill
                                        onChange={(e) => setPass(e.target.value)}
                                        placeholder="Password"
                                    />
                                    <Form.Text className="text-danger">{errors.password}</Form.Text>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary">Close</Button>
                            <Button variant="success" onClick={handleFormValidate}>Log In</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            </Col>
        </Row>
    );
};

export default Login;
