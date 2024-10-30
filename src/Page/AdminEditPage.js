import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import config from "../config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminMenu from "./Admin/AdminMenu";
import { TextField, Button } from "@mui/material";
import AdminHeader from "./Admin/AdminHeader";
import "../Css/AdminPage.css";

const AdminEditPage = () => {
  const adminbackendUrl = process.env.REACT_APP_ADMIN_URL;
  const { editId } = useSelector((state) => state.ui);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: editId.username,
    password: editId.password,
    phone: editId.phone,
    dob: editId.dob,
    email: editId.email,
    id: editId.id,
  });
  const handleSubmit = async () => {
    const form = new FormData();
    form.append("username", formData.username);
    // form.append("password", formData.password);
    form.append("phone", formData.phone);
    form.append("dob", formData.dob);
    form.append("email", formData.email);
    form.append("id", formData.id);

    try {
      const response = await fetch(
        // "http://localhost/chatting-app-php-react/adminbackend/edit.php",
        `${adminbackendUrl}/edit.php`,
        {
          method: "POST",
          body: form,
          // credentials: "include",
        }
      );

      if (response.ok) {
        console.log("response", response.data);
        alert("Update Successfully");
        navigate("/admin");
      } else {
        console.log("fail");
      }
    } catch (error) {
      console.error("An error occurred while logging", error);
    }
  };
  return (
    <>
      <Grid className="admin-body" container>
        <AdminMenu />
        <Grid className="custom-container-right" item lg={9} mx="auto">
          <AdminHeader />
          <Box className="centered-container">
            <Box className="container-admin-edit" mx="auto">
              <h4 className="textCenter">Edit User Detail</h4>
              <Box className="flex-box-3">
                {/* Username  */}
                <Box className="input-width">
                  <Box mt={2} style={{ fontWeight: "bold" }}>
                    UserName
                  </Box>
                  <Box mt={0} mb={1}>
                    <TextField
                      className="input-background"
                      InputProps={{
                        style: { height: 40, padding: "0 0px" },
                      }}
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                      placeholder="UserName"
                      fullWidth
                      type="text"
                    />
                  </Box>
                </Box>
                {/* password  */}
                <Box className="input-width">
                  <Box mt={2} style={{ fontWeight: "bold" }}>
                    Email
                  </Box>
                  <Box mt={0} mb={1}>
                    <TextField
                      className="input-background"
                      InputProps={{
                        style: { height: 40, padding: "0 0px" },
                      }}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Email"
                      fullWidth
                      type="email"
                    />
                  </Box>
                </Box>
              </Box>

              <Box className="flex-box-3">
                {/* phone  */}
                <Box className="input-width">
                  <Box mt={2} style={{ fontWeight: "bold" }}>
                    Phone
                  </Box>
                  <Box mt={0} mb={1}>
                    <TextField
                      className="input-background"
                      InputProps={{
                        style: { height: 40, padding: "0 0px" },
                      }}
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="Phone"
                      fullWidth
                      type="number"
                    />
                  </Box>
                </Box>
                {/* DOB  */}
                <Box className="input-width ">
                  <Box mt={2} style={{ fontWeight: "bold" }}>
                    Date of Birth
                  </Box>
                  <Box mt={0} mb={1}>
                    <TextField
                      className="input-background"
                      InputProps={{
                        style: { height: 40, padding: "0 0px" },
                      }}
                      value={formData.dob}
                      onChange={(e) =>
                        setFormData({ ...formData, dob: e.target.value })
                      }
                      placeholder="Date of Birth"
                      fullWidth
                      type="date"
                    />
                  </Box>
                </Box>
              </Box>

              <Box mt={3} display="flex" justifyContent="flex-end">
                <Button
                  onClick={() => navigate("/admin")}
                  style={{ marginRight: 8 }}
                  variant="outlined"
                  color="primary"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                >
                  Update
                </Button>
              </Box>
            </Box>
          </Box>

          {/* <Grid
            style={{
              boxShadow: "0 0 2px",
              padding: "40px 70px",
              marginTop: "60px",
            }}
            item
            lg={4}
            mx="auto"
          >
            <Box style={{ fontWeight: "bold" }}>UserName</Box>
            <Box mt={0} mb={1}>
              <input
                className="form-control"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                type="text"
              />
            </Box>
            <Box mt={2} style={{ fontWeight: "bold" }}>
              Email
            </Box>
            <Box mt={0} mb={1}>
              <input
                className="form-control"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                type="email"
              />
            </Box>
            {/* <Box style={{ fontWeight: "bold" }}>Password</Box> */}
          {/* <Box mt={0} mb={1}>
            <input
              className="form-control"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              type="password"
            />
          </Box> */}
          {/* <Box mt={2} style={{ fontWeight: "bold" }}>
              Phone
            </Box>
            <Box mt={0} mb={1}>
              <input
                className="form-control"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                type="number"
              />
            </Box>
            <Box mt={2} style={{ fontWeight: "bold" }}>
              Date of Birth
            </Box>
            <Box mt={0} mb={1}>
              <input
                className="form-control"
                value={formData.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
                type="date"
              />
            </Box>
            <Box mt={2}>
              <button
                style={{ fontWeight: "bold" }}
                className="btn btn-primary form-control"
                onClick={handleSubmit}
              >
                Update
              </button>
            </Box>
            <Box mt={1}>
              <button
                onClick={() => navigate("/admin")}
                style={{ fontWeight: "bold" }}
                className="btn btn-outline-primary form-control"
              >
                Back
              </button>
            </Box> */}
          {/* </Grid> */}
        </Grid>
      </Grid>
    </>
  );
};

export default AdminEditPage;
