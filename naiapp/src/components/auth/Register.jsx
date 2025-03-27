import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState("");
    const [salonName, setSalonName] = useState("");
    const [name, setName] = useState("");
    const [password, setPass] = useState("");
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState({});
    const [userType, setUserType] = useState("");
    const [showAdditionalFields, setShowAdditionalFields] = useState(false);

    const navigate = useNavigate();

    const handleUserTypeChange = (selectedType) => {
        setUserType(selectedType.target.value);
        setShowAdditionalFields(true);
    };

    const handleFormValidate = async () => {
        const error = {};

        // ✅ Field Validations
        if (!name) error.name = "Name is required";
        if (!email) {
            error.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            error.email = "Invalid email address";
        }
        if (!phone) {
            error.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(phone)) {
            error.phone = "Invalid phone number";
        }
        if (!password) {
            error.password = "Password is required";
        } else if (password.length < 6) {
            error.password = "Password must be at least 6 characters";
        }
        if (userType === 'company' && !salonName) {
            error.salonName = "Salon name is required";
        }

        setErrors(error);

        if (Object.keys(error).length === 0) {
            // ✅ Send data to backend
            const credentials = {
                name,
                email,
                phone,
                password,
                isAdmin: userType === 'company',
                salonName: userType === 'company' ? salonName : ''
            };

            try {
                const res = await axios.post(
                    userType === 'company' ? "http://localhost:5000/salon/register" : "http://localhost:5000/salon/registeruser",
                    JSON.stringify(credentials), // 🔴 Ensure data is sent as JSON string
                    { 
                        headers: { 
                            "Content-Type": "application/json" 
                        } 
                    }
                );

                if (res.status === 201) {
                    alert("✅ Successfully Registered!");
                    localStorage.setItem('isLogin', true);
                    localStorage.setItem('email', email);
                    localStorage.setItem('isAdmin', userType === 'company');
                    navigate('/');
                } else {
                    alert("⚠️ Registration failed: " + res.data.message);
                }
            } catch (error) {
                alert("❌ Registration Error: " + (error.response?.data?.message || "Server Error"));
            }
        }
    };

    return (
        <Row>
            <Col md={12}>
                <div className="modal show" style={{ display: 'block', position: 'initial' }}>
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>Register</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form>
                                <Row>
                                    <Col md={4}><b>Register as </b></Col>
                                    <Col md={4}>
                                        <Form.Check type="radio" onChange={handleUserTypeChange} checked={userType === 'user'} label="User" value="user" />
                                    </Col>
                                    <Col md={4}>
                                        <Form.Check type="radio" onChange={handleUserTypeChange} checked={userType === 'company'} label="Admin" value="company" />
                                    </Col>
                                </Row>
                                <br />
                                {showAdditionalFields && (
                                    <>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
                                            <Form.Text className="text-muted">{errors.name}</Form.Text>
                                        </Form.Group>

                                        {userType === 'company' && (
                                            <Form.Group className="mb-3">
                                                <Form.Label>Salon Name</Form.Label>
                                                <Form.Control type="text" value={salonName} onChange={(e) => setSalonName(e.target.value)} placeholder="Enter Salon Name" />
                                                <Form.Text className="text-muted">{errors.salonName}</Form.Text>
                                            </Form.Group>
                                        )}

                                        <Form.Group className="mb-3">
                                            <Form.Label>Phone number</Form.Label>
                                            <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone number" />
                                            <Form.Text className="text-muted">{errors.phone}</Form.Text>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                                            <Form.Text className="text-muted">{errors.email}</Form.Text>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" value={password} onChange={(e) => setPass(e.target.value)} placeholder="Password" />
                                            <Form.Text className="text-muted">{errors.password}</Form.Text>
                                        </Form.Group>
                                    </>
                                )}
                            </Form>
                        </Modal.Body>

                        {showAdditionalFields && (
                            <Modal.Footer>
                                <Button variant="secondary">Close</Button>
                                <Button variant="success" onClick={handleFormValidate}>Register</Button>
                            </Modal.Footer>
                        )}
                    </Modal.Dialog>
                </div>
            </Col>
        </Row>
    );
};

export default Register;
