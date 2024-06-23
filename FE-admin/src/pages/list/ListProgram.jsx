import "./listprogram.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DataProgram from "../../components/datatable/DataProgram";

const ListProgram = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DataProgram />
      </div>
    </div>
  );
};

export default ListProgram;
