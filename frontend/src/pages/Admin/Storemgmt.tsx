import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import Aheader from "../../components/admincomponents/Aheader";
import Anavbar from "../../components/admincomponents/Anavbar";
import plus from "../../assets/admin/plus.png";
import { useEffect, useState } from "react";
import StoreForm from "../../components/admincomponents/StoreForm";
import {
  getStore,
  StoreData,
  searchStoreByname,
  deleteStore,
} from "./controller.admin";
import { IoAddCircleSharp } from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Storemgmt = () => {
  const [searchText, setSearchText] = useState("");
  const [storeData, setStoreData] = useState<StoreData[]>([]);
  const [filteredData, setSearchData] = useState<StoreData[]>([]);
  const [getId, setId] = useState("");
  const [addStore, setAddstore] = useState<boolean>(false);
  const columns = [
    {
      name: "Store Name",
      selector: (row: StoreData): string => row.name,
    },
    // {
    //   id: "Store id",
    //   selector: (row: StoreData): number => row.id,
    // },
    {
      name: "City",
      selector: (row: StoreData): string => {
        const firstAddress = row.addresses[0];
        return firstAddress && firstAddress.location
          ? firstAddress.location.city.mapAttribute.name
          : "";
      },
    },
    {
      name: "Country",
      selector: (row: StoreData): string => {
        const firstAddress = row.addresses[0];
        return firstAddress && firstAddress.location
          ? firstAddress.location.city.countryName
          : "";
      },
    },
    {
      name: "Manage",
      cell: (row: StoreData) => (
        <div className="manage">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => handleEdit(row)}
          >
            Edit
          </button>{" "}
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

  const handleEdit = (row: StoreData) => {
    console.log("Edit clicked for row:", row.id);
    // Add your edit logic here
  };

  const handleDelete = (row: StoreData) => {
    console.log("Delete clicked for row:", row.name);
    setId(`${row.id}`);
    console.log("Deleted", row.name);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    // Debugging
    console.log("Search Text:", e.target.value);
    console.log("Filtered Data:", filteredData);
  };
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (isAuthenticated !== null && isAuthenticated !== "false") {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        getStore(authToken)
          .then((response: any) => {
            const responseData = response.data as unknown as StoreData[];
            setStoreData(responseData);
          })
          .catch((error) => {
            console.error("Error fetching store data:", error);
          });
      }
    } else {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== null && isAuthenticated !== "false") {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        searchStoreByname(authToken, searchText)
          .then((response: any) => {
            const filteredData = response.data;
            setSearchData(filteredData);
          })
          .catch((error) => {
            console.error("Error fetching search data:", error);
          });
      }
    }
  });
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== null && isAuthenticated !== "false") {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        deleteStore(authToken, getId)
          .then((response: any) => {
            console.log("store deleted");
          })
          .catch((error: any) => {
            console.error("Error deleting store:", error);
          });
      }
    }
  });
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
