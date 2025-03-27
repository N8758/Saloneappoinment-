import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AppointmentsTable.css';

const YourAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [email, setEmail] = useState(localStorage.getItem('email'));

    useEffect(() => {
        setEmail(localStorage.getItem('email'));

        const fetchUserAppointments = async (email) => {
            try {
                const response = await axios.get(`http://localhost:8000/api/appointments/${email}`);
                setAppointments(response.data.appointments || []);
                console.log(response.data.appointments);
            } catch (error) {
                console.error("Error fetching user appointments:", error);
            }
        };

        if (email) {
            fetchUserAppointments(email);
        }
    }, [email]);

    return (
        <div className="table-container">
            {appointments.length === 0 ? (
                <h3>No Appointments</h3>
            ) : (
                <table className="appointments-table">
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{appointment.name}</td>
                                <td>{appointment.phone}</td>
                                <td>{appointment.bookingDate.slice(0, 10)}</td>
                                <td>{appointment.bookingDate.slice(11, 16)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default YourAppointments;
