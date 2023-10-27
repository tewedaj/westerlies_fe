import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import Aheader from "../../components/admincomponents/Aheader";
import Anavbar from "../../components/admincomponents/Anavbar";
import plus from "../../assets/admin/plus.png";
import { useState } from "react";

// Define the type for your data object
interface StoreData {
  storeName: string;
  city: string;
  country: string;
}

const Storemgmt = () => {
  const [searchText, setSearchText] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const columns = [
    {
      name: "Store Name",
      selector: (row: StoreData) => row.storeName,
    },
    {
      name: "City",
      selector: (row: StoreData) => row.city,
    },
    {
      name: "Country",
      selector: (row: StoreData) => row.country,
    },
    {
      name: "Manage",
      cell: (row: StoreData) => (
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

  const handleEdit = (row: StoreData) => {
    console.log("Edit clicked for row:", row);
    // Add your edit logic here
  };

  const handleDelete = (row: StoreData) => {
    console.log("Delete clicked for row:", row);
    // Add your delete logic here
  };

  const data: StoreData[] = [
    // Your data array goes here, each object should have storeName, city, and country properties
    // Add your data
    {
      storeName: "hsafg",
      city: "aa",
      country: "jhas",
    },
    {
      storeName: "hsafg",
      city: "aa",
      country: "jhas",
    },
    {
      storeName: "hsafg",
      city: "aa",
      country: "jhas",
    },
    {
      storeName: "hsafg",
      city: "aa",
      country: "jhas",
    },
    {
      storeName: "hsafg",
      city: "aa",
      country: "jhas",
    },
    {
      storeName: "hsafg",
      city: "aa",
      country: "jhas",
    },
    {
      storeName: "hsafg",
      city: "aa",
      country: "jhas",
    },
  ];
  const filteredData = data.filter((item) => {
    const rowValues = Object.values(item).join(" ").toLowerCase();
    return rowValues.includes(searchText.toLowerCase());
  });
  return (
    <>
      <Aheader />
      <div className="main-container">
        <Anavbar />
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
            title="Store Data"
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

export default Storemgmt;
