import "./program-detail.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../configs/app.config";

const ProgramDetail = () => {
  const [program, setProgram] = useState(null);
  const [error, setError] = useState("");

  // Example program ID for demonstration
  const programId = "667705067cadcc15ea842a70";

  // Function to fetch program details by ID
  const fetchProgramDetails = async (id) => {
    try {
      const token = sessionStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No access token found');
      }

      const response = await axios.get(`${BASE_URL}/program/get-program/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Program details:', response.data);
      setProgram(response.data.program);
      setError(""); // Clear any previous error
    } catch (error) {
      console.error('Error fetching program details:', error);
      setError('Failed to fetch program details');
      setProgram(null); // Clear program state on error
    }
  };

  // Fetch program details on component mount (optional)
  useEffect(() => {
    fetchProgramDetails(programId);
  }, []);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="programDetails">
          <h1 className="title">Program Details</h1>
          {program ? (
            <div className="programInfo">
              <div className="imageContainer">
                <img src={program.image} alt={program.programName} className="programImg" />
              </div>
              <div className="infoContainer">
                <h2 className="programName">{program.programName}</h2>
                <p className="description">{program.description}</p>
                <div className="details">
                  <div className="detailItem">
                    <span className="itemKey">Quantity:</span>
                    <span className="itemValue">{program.quantity}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Start Date:</span>
                    <span className="itemValue">{new Date(program.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Register Date:</span>
                    <span className="itemValue">{new Date(program.registerDate).toLocaleDateString()}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Point:</span>
                    <span className="itemValue">{program.point}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Status:</span>
                    <span className="itemValue">{program.status}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Minus Point:</span>
                    <span className="itemValue">{program.minusPoint ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="loading">Loading program details...</p>
          )}
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;
