import Aheader from "../../components/admincomponents/Aheader";
import Anavbar from "../../components/admincomponents/Anavbar";
import "./responsive.css";
import "./style.css";
import plus from "../../assets/admin/plus.png";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
// Define the type for your data object
interface EmailData {
  email: string;
}
const Emailmgmt = () => {
  const [searchText, setSearchText] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const columns = [
    {
      name: "Emails",
      selector: (row: EmailData) => row.email,
    },
    {
      name: "Manage",
      cell: (row: EmailData) => (
        <div>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => handleEdit(row)}
          >
            <i className="fa fa-pencil"></i> Edit
          </button>{" "}
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(row)}
          >
            <i className="fa fa-trash"></i> Delete
          </button>
        </div>
      ),
    },
  ];
  const handleEdit = (row: EmailData) => {
    console.log("Edit clicked for row:", row);
    // Add your edit logic here
  };

  const handleDelete = (row: EmailData) => {
    console.log("Delete clicked for row:", row);
    // Add your delete logic here
  };
  const data: EmailData[] = [
    // Your data array goes here, each object should have storeName, city, and country properties
    // Add your data
    {
      email: "asfya@ysqu.com",
    },
    {
      email: "asfya@ysqu.com",
    },
    {
      email: "asfya@ysqu.com",
    },
    {
      email: "asfya@ysqu.com",
    },
  ];
  const filteredData = data.filter((item) =>
    item.email.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <>
      <Aheader></Aheader>
      <div className="main-container">
        <Anavbar></Anavbar>
        <div className="main">
          <div className="plussign">
            <img className="plussign" src={plus} />
          </div>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={handleSearch}
            />
          </div>
          <DataTable
            title="Email Directory"
            columns={columns}
            data={filteredData}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[5, 10, 20, 30]}
            highlightOnHover
            responsive
            striped
          />
        </div>
      </div>
    </>
  );
};
export default Emailmgmt;
