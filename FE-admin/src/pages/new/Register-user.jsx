import "./register-user.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../configs/app.config";

const RegisterUser = ({ title }) => {
  const initialFormData = {
    MSSV: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    birthDay: "",
    gender: "",
    facultyId: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [faculties, setFaculties] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const token = sessionStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/faculty/get-faculties`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Faculties:', response.data.faculties);
        setFaculties(response.data.faculties);
      } catch (error) {
        console.error('Error fetching faculties:', error);
      }
    };

    fetchFaculties();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const token = sessionStorage.getItem('accessToken');
      const response = await axios.post(`${BASE_URL}/auth/register`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log('User registered successfully:', response.data);
      setFormData(initialFormData); // Clear form data after successful registration
      // Optionally reset the form or redirect the user
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="formContainer">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label>MSSV</label>
                <input
                  type="text"
                  name="MSSV"
                  placeholder="Enter MSSV"
                  value={formData.MSSV}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Birth Day</label>
                <input
                  type="date"
                  name="birthDay"
                  value={formData.birthDay}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="NAM">Nam</option>
                  <option value="NỮ">Nữ</option>
                </select>
              </div>

              <div className="formInput">
                <label>Faculty</label>
                <select
                  name="facultyId"
                  value={formData.facultyId}
                  onChange={handleInputChange}
                >
                  <option value="">Select Faculty</option>
                  {faculties.map((faculty) => (
                    <option key={faculty._id} value={faculty._id}>
                      {faculty.facultyName}
                    </option>
                  ))}
                </select>
              </div>

              {error && <div className="error">{error}</div>}

              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
