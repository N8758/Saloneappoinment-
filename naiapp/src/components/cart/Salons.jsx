import React, { useEffect, useState } from "react";
import CustomSalonCard from "./CustomSalonCard";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

export const Salons = () => {
  const [salons, setSalons] = useState([]); // ✅ Initialize as an empty array
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const [error, setError] = useState(null); // ✅ Error state

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const res = await axios.get("http://localhost:5000/salon/getsalons");

        console.log("Salon API Response:", res.data);

        // ✅ Ensure response contains an array
        if (res.status === 200 && Array.isArray(res.data.data)) {
          setSalons(res.data.data);
        } else {
          console.error("Unexpected response format:", res.data);
          setSalons([]); // ✅ Prevents errors
        }
      } catch (err) {
        console.error("Error fetching salons:", err);
        setError("Failed to load salons. Please try again.");
      } finally {
        setLoading(false); // ✅ Stop loading
      }
    };

    fetchSalons();
  }, []);

  return (
    <div className="container mt-4">
      {loading ? (
        <h3>Loading salons...</h3> // ✅ Show loading message
      ) : error ? (
        <h3 style={{ color: "red" }}>{error}</h3> // ✅ Show error message
      ) : salons.length === 0 ? (
        <h3>No Salons Available</h3> // ✅ Handle empty data
      ) : (
        <Row>
          {salons.map((salon, index) => (
            <Col key={index} md="4">
              <CustomSalonCard data={salon} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};
