import { Box, Grid } from "@mui/material";
import axios from "axios";
import React, { useDebugValue, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { seteditId } from "../Reducers/UiReducer";
import RegistrationForm from "../Form/RegistrationForm";
import { MdDashboard } from "react-icons/md";

import { lightBlue } from "@mui/material/colors";
import AdminChangePassword from "../Form/AdminChangePassword";

import "../Css/AdminPage.css";
import AdminMenu from "./Admin/AdminMenu";
import AdminHeader from "./Admin/AdminHeader";
const AdminPage = () => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const adminbackendUrl = process.env.REACT_APP_ADMIN_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  // const [blockId, setBlockId] = useState(null);

  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const getCountries = async () => {
    try {
      const response = await axios.get(
        // "http://localhost/chatting-app-php-react/backend/getallusers.php"
        `${backendUrl}/getallusers.php`
      );

      if (Array.isArray(response.data.data)) {
        // Ensure that the response is an array
        setCountries(response.data.data);
        setFilteredCountries(response.data.data);
      } else {
        console.error("Invalid data format from the API.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleBlock = async (item) => {
    const form = new FormData();
    form.append("id", item);

    try {
      const response = await fetch(
        // "http://localhost/chatting-app-php-react/adminbackend/block.php",
        `${adminbackendUrl}/block.php`,
        {
          method: "POST",
          body: form,
          // credentials: "include",
        }
      );

      if (response.ok) {
        console.log("response", response.data);
        alert("block Successfully");
        navigate("/admin");
      } else {
        console.log("fail");
      }
    } catch (error) {
      console.error("An error occurred while logging", error);
    }
  };
  const handleUnBlock = async (item) => {
    const form = new FormData();
    form.append("id", item);

    try {
      const response = await fetch(
        // "http://localhost/chatting-app-php-react/adminbackend/unblock.php",
        `${adminbackendUrl}/unblock.php`,
        {
          method: "POST",
          body: form,
          // credentials: "include",
        }
      );

      if (response.ok) {
        console.log("response", response.data);
        alert("Unblock Successfully");
        navigate("/admin");
      } else {
        console.log("fail");
      }
    } catch (error) {
      console.error("An error occurred while logging", error);
    }
  };
  const handleDelete = async (item) => {
    const form = new FormData();
    form.append("id", item);

    try {
      const response = await fetch(
        // "http://localhost/chatting-app-php-react/adminbackend/delete.php",
        `${adminbackendUrl}/delete.php`,
        {
          method: "POST",
          body: form,
          // credentials: "include",
        }
      );

      if (response.ok) {
        console.log("response", response.data);
        alert("Delete Successfully");
        navigate("/admin");
      } else {
        console.log("fail");
      }
    } catch (error) {
      console.error("An error occurred while logging", error);
    }
  };
  const columns = [
    {
      name: "S. No.",
      // selector: (row) => row.id,
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Username",
      cell: (row) => (
        <div>
          {row.online === "1" ? (
            <span className="green-text">●</span>
          ) : (
            <span className="yellow-text">●</span>
          )}
          <span style={{ textTransform: "capitalize" }}>{row.username}</span>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/adminedit");
              dispatch(seteditId(row));
            }}
          >
            Edit
          </button>
          <button
            style={{ marginLeft: "10px" }}
            className="btn btn-danger"
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this item?")
              ) {
                handleDelete(row.id);
              }
            }}
          >
            Delete
          </button>
          {row.status == "0" ? (
            <button
              style={{ marginLeft: "10px" }}
              className="btn btn-warning"
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to block this item?")
                ) {
                  handleBlock(row.id);
                }
              }}
            >
              Block
            </button>
          ) : (
            <button
              style={{ marginLeft: "10px" }}
              className="btn btn-warning"
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to unblock this item?")
                ) {
                  handleUnBlock(row.id);
                }
              }}
            >
              Unblock
            </button>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    getCountries();
  }, [handleUnBlock, handleBlock]);

  useEffect(() => {
    const result = countries.filter((country) => {
      return country.username.toLowerCase().match(search.toLowerCase());
    });
    setFilteredCountries(result);
  }, [search]);

  const customStyles = {
    rows: {
      style: {
        fontSize: "16px",
      },
    },
    headCells: {
      style: {
        fontSize: "18px",
        fontWeight: "bold",
      },
    },
  };

  return (
    <Grid className="admin-body" container>
      <AdminMenu />
      <Grid className="custom-container-right" item lg={9} mx="auto">
        <AdminHeader />
        <Box className="data-table-user">
          <DataTable
            columns={columns}
            data={filteredCountries}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="500px"
            selectableRowsHighlight
            highlightOnHover
            subHeader
            subHeaderAlign="right"
            customStyles={customStyles}
          />
        </Box>
        {/* <AdminChangePassword /> */}
      </Grid>
    </Grid>
  );
};

export default AdminPage;
