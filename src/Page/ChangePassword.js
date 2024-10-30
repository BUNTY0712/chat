import { Box, Modal, Button, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToggleSetting } from "../Reducers/UiReducer";
import { useNavigate } from "react-router-dom";
import "../Css/ChangePassword.css";

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
        setOpen(false);
        navigate("/");
      } else {
        setMess(data.message);
      }
    } catch (error) {
      console.error("An error occurred while changing the password", error);
    }
  };

  return (
    <>
      <Box mt={2} className="custom-box-14">
        <Box
          style={{
            display: "flex",
          }}
        >
          <Box onClick={() => setOpen(true)} ml={1} className="custom-button-9">
            Change Password
          </Box>
        </Box>
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="centered-box-8">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box className="Change-Password"> Change Password </Box>
            <IconButton
              onClick={() => {
                setOpen(false);
                dispatch(setToggleSetting(!togglesetting));
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box mt={2}>
            <TextField
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
          <Box mt={2}>
            <TextField
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
          <Box mt={2}>
            <TextField
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
            <Button onClick={() => setOpen(false)} style={{ marginRight: 8 }}>
              Close
            </Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Update Password
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ChangePassword;
