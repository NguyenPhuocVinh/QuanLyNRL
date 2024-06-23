import "./create-program.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../configs/app.config";

const CreateProgram = ({ title }) => {
  const initialFormData = {
    programName: "",
    description: "",
    quantity: "",
    startDate: "",
    registerDate: "",
    point: "",
    minusPoint: false,
    isPropose: false,
    categoryId: "",
    image: null, // Change to null for better handling of files
  };

  const [formData, setFormData] = useState(initialFormData);
  const [file, setFile] = useState(null); // Use null instead of empty string
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        if (!token) {
          throw new Error("No access token found");
        }

        const response = await axios.get(`${BASE_URL}/category/get-categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoryName") {
      const selectedCategory = categories.find(
        (category) => category.categoryName === value
      );
      if (selectedCategory) {
        setFormData({ ...formData, categoryId: selectedCategory._id });
      } else {
        setFormData({ ...formData, categoryId: "" }); // Clear categoryId if no matching category is found
      }
    } else if (name === "image") {
      // Handle image file selection
      setFormData({ ...formData, image: e.target.files[0] });
      setFile(e.target.files[0]); // Set file state for preview
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found");
      }

      // Prepare form data to send
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await axios.post(
        `${BASE_URL}/program/create-program`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Important to set this for file uploads
          },
        }
      );
      setFormData(initialFormData); // Clear form data after successful creation
      setFile(null); // Clear the file input
    } catch (error) {
      setError("Failed to create program");
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
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="Selected file preview"
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label>Program Name</label>
                <input
                  type="text"
                  name="programName"
                  placeholder="Enter Program Name"
                  value={formData.programName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  placeholder="Enter Description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Enter Quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Register Date</label>
                <input
                  type="date"
                  name="registerDate"
                  value={formData.registerDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Point</label>
                <input
                  type="number"
                  name="point"
                  placeholder="Enter Point"
                  value={formData.point}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput boolean">
                <label>
                  Minus Point
                  <input
                    type="checkbox"
                    name="minusPoint"
                    checked={formData.minusPoint}
                    onChange={(e) =>
                      setFormData({ ...formData, minusPoint: e.target.checked })
                    }
                  />
                </label>
              </div>

              <div className="formInput boolean">
                <label>
                  Is Propose
                  <input
                    type="checkbox"
                    name="isPropose"
                    checked={formData.isPropose}
                    onChange={(e) =>
                      setFormData({ ...formData, isPropose: e.target.checked })
                    }
                  />
                </label>
              </div>

              <div className="formInput">
                <label htmlFor="categoryName">Category</label>
                <select
                  id="categoryName"
                  name="categoryName"
                  value={formData.categoryName}
                  onChange={handleInputChange}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.categoryName}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="formInput">
                <label htmlFor="image">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleInputChange} 
                  style={{ display: "none" }}
                />
              </div>

              {error && <div className="error">{error}</div>}

              <button type="submit">Create Program</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProgram;
