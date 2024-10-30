import { Box, Button, TextField, IconButton, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToggleSetting } from "../Reducers/UiReducer";
import "../Css/ChangePassword.css";
import Sidebar from "./Sidebar";
import { FaUser } from "react-icons/fa";
import Logout from "./Logout";
import Header from "./Header";

const PasswordChange = () => {
  const backendUrl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();
  const { id, togglesetting, username } = useSelector((state) => state.ui);
  const [formData, setFormData] = useState({
    oldpassword: "",
    confirmpassword: "",
    newpassword: "",
  });
  const [toggle, setToggle] = useState(false);
  const [mess, setMess] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (formData.newpassword !== formData.confirmpassword) {
      setMess("New password and confirm password do not match");
      return;
    }
    if (formData.newpassword === "" && formData.confirmpassword === "") {
      setMess("Please fill password");
      return;
    }
    const form = new FormData();
    form.append("oldpassword", formData.oldpassword);
    form.append("newpassword", formData.newpassword);
    form.append("id", id);

    try {
      const response = await fetch(`${backendUrl}/changepass.php`, {
        method: "POST",
        body: form,
      });

      const data = await response.json();
      setToggle(data.success);
      if (response.ok) {
        setMess(data.message);
        setFormData({
          oldpassword: "",
          confirmpassword: "",
          newpassword: "",
        });
        navigate("/");
      } else {
        setMess(data.message);
      }
    } catch (error) {
      console.error("An error occurred while changing the password", error);
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
              <h4 className="textCenter">Change Password</h4>
            </Box>
            <Box mt={2} style={{ fontWeight: "bold" }}>
              Old Password
            </Box>
            <Box mt={0} mb={1}>
              <TextField
                className="input-background"
                InputProps={{
                  style: { height: 40, padding: "0 0px" },
                }}
                value={formData.oldpassword}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    oldpassword: e.target.value,
                  });
                  setMess("");
                }}
                placeholder="Old Password"
                fullWidth
                type="password"
              />
            </Box>
            <Box mt={2} style={{ fontWeight: "bold" }}>
              New Password
            </Box>
            <Box mt={0} mb={1}>
              <TextField
                className="input-background"
                InputProps={{
                  style: { height: 40, padding: "0 0px" },
                }}
                value={formData.newpassword}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    newpassword: e.target.value,
                  });
                  setMess("");
                }}
                placeholder="New Password"
                fullWidth
                type="password"
              />
            </Box>
            <Box mt={2} style={{ fontWeight: "bold" }}>
              Confirm Password
            </Box>
            <Box mt={0} mb={1}>
              <TextField
                className="input-background"
                InputProps={{
                  style: { height: 40, padding: "0 0px" },
                }}
                value={formData.confirmpassword}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    confirmpassword: e.target.value,
                  });
                  setMess("");
                }}
                placeholder="Confirm Password"
                fullWidth
                type="password"
              />
            </Box>
            <Box mt={1} className="bold-text-3">
              Note: If you change the password, you will be logged out.
            </Box>
            <Box mt={1} style={{ color: "red" }}>
              {mess}
            </Box>
            <Box mt={3} display="flex" justifyContent="flex-end">
              <Button
                onClick={() => navigate("/dashboard")}
                style={{ marginRight: 8 }}
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
              >
                Update Password
              </Button>
            </Box>
          </Box>
          <Box className="input-width-pass height-note">
            <ul>
              <li>
                <Box mt={1} className="bold-text-3">
                  Note: For Strong Password Must Contain: i.e. @xRd136_csdA0
                </Box>
              </li>
              <li>
                <Box mt={1} className="bold-text-3">
                  Note: Do not use sequential numbers or letters
                </Box>
              </li>
              <li>
                <Box mt={1} className="bold-text-3">
                  Note: i.e. 1234, qwerty, jklm, 6789, etc
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

export default PasswordChange;
