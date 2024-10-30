import React, { useState } from "react";
import {
  Box,
  Modal,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { setToggleSetting } from "../Reducers/UiReducer";
import { useNavigate } from "react-router-dom";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ChangePassword = () => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const { id, togglesetting } = useSelector((state) => state.ui);
  const [formData, setFormData] = useState({
    oldpassword: "",
    confirmpassword: "",
    newpassword: "",
  });
  const [toggle, setToggle] = useState(false);
  const [mess, setMess] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    if (formData.newpassword !== formData.confirmpassword) {
      setMess("New password and confirm password do not match");
      return;
    }
    if (formData.newpassword === "" || formData.confirmpassword === "") {
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
        if (data.message === "Password successfully updated") {
          handleClose();
          navigate("/adminlogin");
        }
      } else {
        setMess(data.message);
      }
    } catch (error) {
      console.error("An error occurred while changing the password", error);
    }
  };

  return (
    <>
      <Box
        mt={2}
        style={{
          border: "1px solid #139cec",
          background: "#ebf4fb",
          padding: "15px 30px",
        }}
      >
        <Box
          style={{
            display: "flex",
          }}
        >
          <Box
            onClick={() => {
              setMess("");
              handleOpen();
            }}
            ml={1}
            style={{
              padding: "5px 10px",
              background: "#efefef",
              width: "150px",
              border: "1px solid grey",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            Change Password
          </Box>
        </Box>
        <Box
          onClick={() => navigate("/useredit")}
          ml={1}
          mt={1}
          style={{
            padding: "5px 10px",
            background: "#efefef",
            width: "150px",
            border: "1px solid grey",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          Edit User
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="change-password-modal-title"
        aria-describedby="change-password-modal-description"
      >
        <Box sx={modalStyle}>
          <IconButton
            onClick={handleClose}
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            id="change-password-modal-title"
            variant="h6"
            component="h2"
            style={{ marginBottom: 16 }}
          >
            Change Password
          </Typography>
          <Box mt={2}>
            <TextField
              fullWidth
              variant="outlined"
              value={formData.oldpassword}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  oldpassword: e.target.value,
                });
                setMess("");
              }}
              placeholder="Old Password"
              type="password"
              style={{ marginBottom: 16 }}
            />
          </Box>
          <Box mt={2}>
            <TextField
              fullWidth
              variant="outlined"
              value={formData.newpassword}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  newpassword: e.target.value,
                });
                setMess("");
              }}
              placeholder="New Password"
              type="password"
              style={{ marginBottom: 16 }}
            />
          </Box>
          <Box mt={2}>
            <TextField
              fullWidth
              variant="outlined"
              value={formData.confirmpassword}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  confirmpassword: e.target.value,
                });
                setMess("");
              }}
              placeholder="Confirm Password"
              type="password"
              style={{ marginBottom: 16 }}
            />
          </Box>
          <Box mt={1} style={{ fontSize: "12px", fontWeight: "bold" }}>
            Note: If you change the password, you will be logged out.
          </Box>
          <Box
            mt={0.8}
            style={{
              color: mess === "Password successfully updated" ? "green" : "red",
            }}
          >
            {mess}
          </Box>
          <Box mt={2} style={{ textAlign: "right" }}>
            <Button
              onClick={handleClose}
              variant="outlined"
              style={{ marginRight: 8 }}
            >
              Close
            </Button>
            <Button onClick={handleSubmit} variant="contained">
              Save changes
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ChangePassword;
