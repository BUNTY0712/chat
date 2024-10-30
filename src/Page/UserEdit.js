import { Box, Button, TextField, IconButton, Grid } from "@mui/material";
import React, { useState } from "react";
import config from "../config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { seteditId, setToggleSetting } from "../Reducers/UiReducer";

import Logout from "./Logout";
import Sidebar from "./Sidebar";
import Header from "./Header";
const UserEdit = () => {
  const adminbackendUrl = process.env.REACT_APP_ADMIN_URL;
  const { editId, togglesetting, username } = useSelector((state) => state.ui);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        const responseData = await response.json();
        dispatch(seteditId(responseData.data));
        console.log("response", response.data);
        alert("Update Successfully");
        navigate("/dashboard");
        dispatch(setToggleSetting(!togglesetting));
      } else {
        console.log("fail");
      }
    } catch (error) {
      console.error("An error occurred while logging", error);
    }
  };
  return (
    <Grid className="my-white-background-and-text" container>
      <Logout />
      <Sidebar />
      <Grid item lg={8.9} mx="auto">
        <Header />
        <Box className="centered-container password">
          <Box className="container-edit" mx="auto">
            <Box>
              <h4 className="textCenter">Edit User Details</h4>
            </Box>

            <Box style={{ fontWeight: "bold" }}>Username</Box>
            <Box mt={0} mb={1}>
              <TextField
                className="input-background"
                InputProps={{ style: { height: 40, padding: "0 0px" } }}
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                placeholder="Username"
                fullWidth
                type="text"
              />
            </Box>

            <Box mt={2} style={{ fontWeight: "bold" }}>
              Email
            </Box>
            <Box mt={0} mb={1}>
              <TextField
                className="input-background"
                InputProps={{ style: { height: 40, padding: "0 0px" } }}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Email"
                fullWidth
                type="email"
              />
            </Box>

            <Box mt={2} style={{ fontWeight: "bold" }}>
              Phone
            </Box>
            <Box mt={0} mb={1}>
              <TextField
                className="input-background"
                InputProps={{ style: { height: 40, padding: "0 0px" } }}
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Phone"
                fullWidth
                type="number"
              />
            </Box>
            <Box mt={1} className="bold-text-3">
              Note: If you update details, you will be go to dashboard.
            </Box>

            <Box mt={3} display="flex" justifyContent="flex-end">
              <Button
                onClick={() => {
                  navigate("/dashboard");
                  dispatch(setToggleSetting(togglesetting));
                }}
                style={{ fontWeight: "bold", marginRight: 8 }}
                variant="outlined"
                color="primary"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                style={{ fontWeight: "bold" }}
                variant="contained"
                color="primary"
              >
                Update
              </Button>
            </Box>
          </Box>
          <Box className="input-width-pass height-note">
            <ul>
              <li>
                <Box mt={1} className="bold-text-3">
                  Note: Ensure the username is unique and does not contain
                  spaces.
                </Box>
              </li>
              <li>
                <Box mt={1} className="bold-text-3">
                  Note: The email address must be valid and in the format
                  example@domain.com.
                </Box>
              </li>
              <li>
                <Box mt={1} className="bold-text-3">
                  Note: The phone number should include only digits, without any
                  spaces or special characters.
                </Box>
              </li>
              <li>
                <Box mt={1} className="bold-text-3">
                  Note: At least 1 number
                </Box>
              </li>
              <li>
                <Box mt={1} className="bold-text-3">
                  Note: At least 8 characters
                </Box>
              </li>
            </ul>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default UserEdit;
