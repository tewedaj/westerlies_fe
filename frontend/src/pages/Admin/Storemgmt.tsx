import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import Aheader from "../../components/admincomponents/Aheader";
import Anavbar from "../../components/admincomponents/Anavbar";
import plus from "../../assets/admin/plus.png";
import { useEffect, useState } from "react";
import StoreForm from "../../components/admincomponents/StoreForm";
import getAdminStores from "./controller.admin";
import { IoAddCircleSharp } from "react-icons/io5";
import { FcSearch } from "react-icons/fc";

// Define the type for your data object
interface StoreData {
  storeName: string;
  city: string;
  country: string;
}

const Storemgmt = () => {
  const [searchText, setSearchText] = useState("");
  // const [data, setData] = useState<StoreData[]>([]); // Define the setData function

  // useEffect(() => {
  //   getAdminStores(1, 10) // Replace page and size with the values you want
  //     .then((data) => {
  //       setData(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);
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
        <div className="manage">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => handleEdit(row)}
          >
            {" "}
            Edit
          </button>{" "}
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(row)}
          >
            {" "}
            Delete
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
  const [addStore, setAddstore] = useState<boolean>(false);
  return (
    <>
      <Aheader />
      <div className="main-container">
        <Anavbar />
        <div className="main">
          <div className="plussign">
            <h1>
              <IoAddCircleSharp
                onClick={() => {
                  setAddstore(!addStore);
                }}
                className="plussign"
                src={plus}
              />
            </h1>
          </div>
          <StoreForm isOpen={addStore} />
          <div className="search-box">
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={handleSearch}
            />{" "}
            <h2>
              <FcSearch />
            </h2>
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
