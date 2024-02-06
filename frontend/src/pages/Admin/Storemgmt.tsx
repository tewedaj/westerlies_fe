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
import EditStoreForm from "../../components/admincomponents/EditStoreForm";

const Storemgmt = () => {
  const [searchText, setSearchText] = useState("");
  const [, setStoreData] = useState<StoreData[]>([]);
  const [filteredData2, setSearchData] = useState<StoreData[]>([]);
  const [getId, setId] = useState("");
  const [getIdEdit, setIdEdit] = useState(0);
  const [addStore, setAddstore] = useState<boolean>(false);
  const [editStore, setEditStore] = useState<boolean>(false);
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
    // Check if row.id is defined before setting the state
    if (row.id !== undefined) {
      setIdEdit(row.id);
    } else {
      console.error("Row ID is undefined");
      // Handle the case where row.id is undefined, such as showing an error message
    }
    setEditStore(!editStore);
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
    console.log("Filtered Data:", filteredData2);
  };
  const performSearch = () => {
    if (searchText.trim() !== "") {
      searchStoreByname(searchText)
        .then((response: any) => {
          const filteredData = response.data;
          setSearchData(filteredData);
        })
        .catch((error) => {
          console.error("Error fetching search data:", error);
        });
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (isAuthenticated !== null && isAuthenticated !== "false") {
      getStore()
        .then((response: any) => {
          const responseData = response.data as unknown as StoreData[];
          setStoreData(responseData);
        })
        .catch((error) => {
          console.error("Error fetching store data:", error);
        });
    } else {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== null && isAuthenticated !== "false") {
      performSearch();
    }
  }, [searchText]);
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== null && isAuthenticated !== "false") {
      deleteStore(getId)
        .then((response: any) => {
          console.log(response, "store deleted");
        })
        .catch((error: any) => {
          console.error("Error deleting store:", error);
        });
    }
  }, [getId]);

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
          <EditStoreForm isOpen={editStore} id={getIdEdit} />
          <div className="search-box">
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={handleSearch}
            />{" "}
            <h2>
              <FcSearch onClick={performSearch} />
            </h2>
          </div>
          <div className="storedata">
            <DataTable
              title="Store Data"
              columns={columns}
              data={filteredData2}
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
