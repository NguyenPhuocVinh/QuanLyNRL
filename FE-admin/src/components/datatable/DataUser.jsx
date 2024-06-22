import "./datauser.scss"; // Import CSS/SCSS file
import { DataGrid } from "@mui/x-data-grid"; // Import DataGrid component from MUI
import { Link } from "react-router-dom"; // Import Link component from React Router
import { useState, useEffect } from "react"; // Import useState and useEffect hooks from React
import axios from "axios"; // Import axios for HTTP requests
import { BASE_URL } from "../../configs/app.config"; // Import BASE_URL from config file

const userColumns = [
  { field: "_id", headerName: "ID", width: 150 },
  { field: "MSSV", headerName: "MSSV", width: 150 },
  { field: "fullName", headerName: "Full Name", width: 200 },
  { field: "point", headerName: "Point", width: 150, align: 'center' },
  { field: "birthDay", headerName: "Birth Day", width: 150 },
  { field: "gender", headerName: "Gender", width: 150 },
  { field: "facultyId", headerName: "Faculty ID", width: 150 },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "date",
  },
];

const DataUser = () => {
  const [userRows, setUserRows] = useState([]); // State to hold user data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(''); // State to manage error message

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = sessionStorage.getItem('accessToken');
        const response = await axios.get(`${BASE_URL}/system/get-all-user`, {
          headers: {
            Authorization: `Bearer ${token}`, // Use token from sessionStorage
            'Cache-Control': 'no-cache', // Add cache control header
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });
        setUserRows(response.data.users); 
      } catch (error) {
        console.error('Error fetching user data:', error); // Log error if fetch fails
        setError('Error fetching user data');
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchUsers(); // Call fetchUsers function on component mount
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  if (loading) {
    return <div>Loading...</div>; // Render loading indicator while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Render error message if fetch fails
  }

  const handleDelete = async (userId) => {
    try {
      const token = sessionStorage.getItem('accessToken');
      await axios.delete(`${BASE_URL}/system/delete-user`, {
        headers: {
          Authorization: `Bearer ${token}`, // Use token from sessionStorage
        },
        params: { userId }, // Pass userId as a query parameter
      });
      setUserRows(userRows.filter((row) => row._id !== userId)); // Remove deleted user from state
      console.log(`User with ID ${userId} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
      setError(`Error deleting user with ID ${userId}`);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/users/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        All Users
        <Link to="/users/register-user" className="link">
          Register New User
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={userRows}
        columns={userColumns.concat(actionColumn)}
        pageSize={10} // Increase pageSize if needed
        rowsPerPageOptions={[10, 20, 50]} // Add more options as needed
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default DataUser;
