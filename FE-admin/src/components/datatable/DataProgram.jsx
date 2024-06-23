import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../configs/app.config"; // Assuming BASE_URL is correctly defined

const DataProgram = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [detailedProgram, setDetailedProgram] = useState(null); // State for detailed program info

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const token = sessionStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No access token found');
      }

      const response = await axios.get(`${BASE_URL}/program/get-all-program`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const programs = response.data.programs.map(program => ({
        id: program._id,
        programName: program.programName,
        description: program.description,
        quantity: program.quantity,
        status: program.status,
        createdAt: new Date(program.createdAt).toLocaleString(),
        updatedAt: new Date(program.updatedAt).toLocaleString(),
      }));

      setData(programs);
    } catch (error) {
      console.error('Error fetching programs:', error);
      setError('Failed to fetch programs');
    }
  };

  const handleViewDetails = async (id) => {
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

      setDetailedProgram(response.data.program);
    } catch (error) {
      console.error('Error fetching program details:', error);
      // Handle error or show error message
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = sessionStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No access token found');
      }

      const response = await axios.put(`${BASE_URL}/program/approve-program/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Update status in the local data state after approval
      const updatedData = data.map((item) =>
        item.id === id ? { ...item, status: 'APPROVED' } : item
      );
      setData(updatedData);

      console.log('Program approved successfully:', response.data);
    } catch (error) {
      console.error('Error approving program:', error);
      // Handle error or show error message
    }
  };

  const columns = [
    { field: 'programName', headerName: 'Program Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'quantity', headerName: 'Quantity', width: 120 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'createdAt', headerName: 'Created At', width: 180 },
    { field: 'updatedAt', headerName: 'Updated At', width: 180 },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
          <Link to={`/programs/${params.row.id}`} style={{ textDecoration: "none" }}>
            <div className="viewButton" onClick={() => handleViewDetails(params.row.id)}>
              View
            </div>
          </Link>
          <div className="approveButton" onClick={() => handleApprove(params.row.id)}>
            Approve
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Program
        <Link to="/programs/create-program" className="link">
          Add New
        </Link>
      </div>
      {error && <div className="error">{error}</div>}
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />

      {detailedProgram && (
        <div className="detailedProgram">
          <h3>Detailed Program Information</h3>
          <p><strong>Program Name:</strong> {detailedProgram.programName}</p>
          <p><strong>Description:</strong> {detailedProgram.description}</p>
          {/* Display other details as needed */}
        </div>
      )}
    </div>
  );
};

export default DataProgram;
