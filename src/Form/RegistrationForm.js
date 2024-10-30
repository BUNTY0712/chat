import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Grid,
  Modal,
  IconButton,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";

import "../Css/RegistrationFrom.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

const RegistrationForm = () => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    dob: dayjs("1999-03-19").format("YYYY-MM-DD"), // Set initial date
  });
  const [registerOpen, setRegisterOpen] = useState(false);
  const [error, setError] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [dateErr, setDateErr] = useState("");

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const phoneRef = useRef(null);
  const dobRef = useRef(null);

  useEffect(() => {
    if (registerOpen) {
      usernameRef.current?.focus(); // Focus on the username field when modal opens
    }
  }, [registerOpen]);

  const handleRegisterOpen = () => {
    setRegisterOpen(true);
  };

  const handleRegisterClose = () => {
    setRegisterOpen(false);
    setFormData({
      username: "",
      email: "",
      password: "",
      phone: "",
      dob: dayjs("2002-03-19").format("YYYY-MM-DD"), // Reset to initial date
    });
    setError("");
    setNameErr("");
    setEmailErr("");
    setPhoneErr("");
    setPassErr("");
    setDateErr("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear errors related to this field
    if (name === "username") setNameErr("");
    if (name === "email") setEmailErr("");
    if (name === "phone") setPhoneErr("");
    if (name === "password") setPassErr("");
    if (name === "dob") setDateErr(""); // Clear date error
  };

  const handleAddUser = async () => {
    let valid = true;

    // Clear all errors before validation
    setNameErr("");
    setEmailErr("");
    setPassErr("");
    setPhoneErr("");
    setDateErr("");

    // Username validation
    if (formData.username === "") {
      setNameErr("Please fill username");
      valid = false;
    }

    // Email validation
    if (formData.email === "") {
      setEmailErr("Please fill email");
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setEmailErr("Please enter a valid email address");
        valid = false;
      }
    }

    // Password validation
    if (formData.password === "") {
      setPassErr("Please fill password");
      valid = false;
    }

    // Phone validation
    if (formData.phone === "") {
      setPhoneErr("Please fill phone number");
      valid = false;
    } else {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(formData.phone)) {
        setPhoneErr("Please enter a valid 10-digit phone number");
        valid = false;
      }
    }

    // Date of Birth validation
    if (formData.dob === "") {
      setDateErr("Please fill date of birth");
      valid = false;
    }

    if (!valid) return;

    const form = new FormData();
    form.append("username", formData.username);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("phone", formData.phone);
    form.append("dob", formData.dob); // Format date if needed

    try {
      const response = await fetch(`${backendUrl}/registration.php`, {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        alert("Registration Successful");
        handleRegisterClose();
      } else {
        setError("Invalid User");
      }
    } catch (error) {
      console.error("An error occurred while registering", error);
      setError("Please Enter Valid Information");
    }
  };

  return (
    <Box mt={1} ml={-0.5}>
      <Button
        style={{ color: "black", textTransform: "uppercase" }}
        onClick={handleRegisterOpen}
      >
        <Box className="adduser custom-button">Add User</Box>
      </Button>
      <Modal
        open={registerOpen}
        onClose={handleRegisterClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={{ borderRadius: "8px", position: "relative" }} sx={style}>
          <IconButton
            onClick={handleRegisterClose}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "black",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Grid container>
            <Grid
              style={{
                background: "white",
              }}
              item
              lg={12}
              mx="auto"
            >
              <Grid container>
                <Grid item lg={5}>
                  <Box>
                    <img
                      src="https://stimg.cardekho.com/pwa/img/my-account/pic/login-banner.svg"
                      alt="Registration Banner"
                    />
                  </Box>
                </Grid>
                <Grid style={{ padding: "10px" }} item lg={7}>
                  <Box>
                    <Typography variant="h5"> Create User</Typography>
                  </Box>
                  {/* <Box style={{ color: "grey" }}>for Better Experience,</Box> */}

                  <Box mt={2}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      name="username"
                      label="Username"
                      value={formData.username}
                      onChange={handleInputChange}
                      autoComplete="off"
                      InputProps={{
                        style: { height: 40, padding: "0 0px" },
                      }}
                      InputLabelProps={{
                        style: { top: "-6px" },
                      }}
                      style={{ marginBottom: 16 }}
                      inputRef={usernameRef}
                    />
                  </Box>
                  <Box className="validation-style">{nameErr}</Box>
                  <Box mt={2}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      name="email"
                      label="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      type="email"
                      autoComplete="off"
                      InputProps={{
                        style: { height: 40, padding: "0 0px" },
                      }}
                      InputLabelProps={{
                        style: { top: "-6px" },
                      }}
                      style={{ marginBottom: 16 }}
                      inputRef={emailRef}
                    />
                  </Box>
                  <Box className="validation-style">{emailErr}</Box>

                  <Box mt={2}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      name="password"
                      label="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      type="password"
                      autoComplete="off"
                      InputProps={{
                        style: { height: 40, padding: "0 0px" },
                      }}
                      InputLabelProps={{
                        style: { top: "-6px" },
                      }}
                      style={{ marginBottom: 16 }}
                      inputRef={passwordRef}
                    />
                  </Box>
                  <Box className="validation-style">{passErr}</Box>

                  <Box mt={2}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      name="phone"
                      label="Phone No"
                      value={formData.phone}
                      onChange={handleInputChange}
                      type="text"
                      autoComplete="off"
                      InputProps={{
                        style: { height: 40, padding: "0 0px" },
                      }}
                      InputLabelProps={{
                        style: { top: "-6px" },
                      }}
                      style={{ marginBottom: 16 }}
                      inputRef={phoneRef}
                    />
                  </Box>
                  <Box className="validation-style">{phoneErr}</Box>
                  <form action="">
                    <Box mt={2}>
                      <TextField
                        autoFocus
                        fullWidth
                        variant="outlined"
                        name="dob"
                        label="Date of Birth"
                        type="date"
                        value={formData.dob}
                        onChange={handleInputChange}
                        InputProps={{
                          style: { height: 40, padding: "0 0px" },
                        }}
                        InputLabelProps={{
                          style: { top: "-6px" },
                        }}
                        style={{ marginBottom: 16 }}
                        inputRef={dobRef}
                      />
                    </Box>
                  </form>

                  <Box className="validation-style">{dateErr}</Box>

                  <Box mt={3} style={{ textAlign: "center" }}>
                    <Button
                      className="btnuser"
                      onClick={handleAddUser}
                      variant="contained"
                    >
                      Add User
                    </Button>
                  </Box>
                  <Box mt={1} style={{ fontSize: "12px", color: "grey" }}>
                    By continuing, I agree with the Privacy Policy, Terms &
                    Conditions
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
};

export default RegistrationForm;
