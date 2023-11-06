import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import Aheader from "../../components/admincomponents/Aheader";
import Anavbar from "../../components/admincomponents/Anavbar";
import plus from "../../assets/admin/plus.png";
import { useEffect, useState } from "react";
import StoreForm from "../../components/admincomponents/StoreForm";
import getAdminStores from "./controller.admin";

// Define the type for your data object
interface StoreData {
  storeName: string;
  city: string;
  country: string;
}

const Storemgmt = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<StoreData[]>([]); // Define the setData function

  useEffect(() => {
    getAdminStores(100, 10) // Replace page and size with the values you want
      .then((data) => {
        console.log("Fetched data:", data); // Add this line to check the fetched data
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
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

  const filteredData = data.filter((item) => {
    const rowValues = Object.values(item).join(" ").toLowerCase();
    return rowValues.includes(searchText.toLowerCase());
  });
  const [addStore, setAddstore] = useState<boolean>(false);
  return (
    <>
      <Aheader />
      <div className="main-container">
        <Anavbar />
        <div className="main">
          <div className="plussign">
            <img
              onClick={() => {
                setAddstore(!addStore);
              }}
              className="plussign"
              src={plus}
            />
          </div>
          <StoreForm isOpen={addStore} />
          <div className="search-box">
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={handleSearch}
            />
          </div>
          <div className="storedata">
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
      </div>
    </>
  );
};

export default Storemgmt;
