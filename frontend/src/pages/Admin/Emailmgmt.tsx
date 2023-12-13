import Aheader from "../../components/admincomponents/Aheader";
import Anavbar from "../../components/admincomponents/Anavbar";
import "./responsive.css";
import "./style.css";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { BiExport } from "react-icons/bi";
import { IoAddCircleSharp } from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import EmailForm from "../../components/admincomponents/EmailForm";
import { useNavigate } from "react-router-dom";
// Define the type for your data object
interface EmailData {
  email: string;
}
const Emailmgmt = () => {
  const [searchText, setSearchText] = useState("");

  const [emailForm, setEmailForm] = useState<boolean>(false);
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
        <div className="manage">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => handleEdit(row)}
          >
            Edit
          </button>
          {""}
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(row)}
          >
            Delete
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
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/email mgmt");
    }
  }, []);
  return (
    <>
      <Aheader></Aheader>
      <div className="main-container">
        <Anavbar></Anavbar>
        <div className="main">
          <div className="plussign">
            <h1>
              <IoAddCircleSharp
                onClick={() => {
                  setEmailForm(!emailForm);
                }}
              />
            </h1>
            <h1>
              <BiExport />
            </h1>
          </div>
          <EmailForm isOpen={emailForm} />
          <div className="search-box">
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={handleSearch}
            />
            <h2>
              <FcSearch />
            </h2>
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
