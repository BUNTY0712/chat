import {
  Grid,
  Box,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setChangeSection, setId, setallUser } from "../Reducers/UiReducer";
import config from "../config";
import axios from "axios";
import "../Css/AdminLogin.css";

const AdminLogin = () => {
  const adminbackendUrl = process.env.REACT_APP_ADMIN_URL;
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [loading]);
  const handleSubmit = async () => {
    setLoading(true);
    if (formData.username == "" || formData.password == "") {
      return setError("Please fill username and password");
    }
    const form = new FormData();
    form.append("username", formData.username);
    form.append("password", formData.password);

    try {
      const response = await fetch(`${adminbackendUrl}/adminlogin.php`, {
        method: "POST",
        body: form,
        credentials: "include",
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.id) {
          sessionStorage.setItem("adminData", JSON.stringify(responseData));
          const storedAdminData = JSON.parse(
            sessionStorage.getItem("adminData")
          );
          dispatch(setId(storedAdminData.id));
          setError(responseData.message || "Login successful");
          console.log("responseAdminlogin", responseData.status);
          navigate("/admin");
          dispatch(setChangeSection("dashboard"));
          setLoading(false);
        } else {
          setError("Wrong email or password!");
        }
      } else {
        setError("Wrong email or password!");
      }
    } catch (error) {
      console.error("An error occurred while logging", error);
      setError("Wrong email or password!");
    }
  };

  const handleForget = async () => {
    const form = new FormData();
    form.append("username", formData.username);
    // form.append("password", formData.password);
    form.append("email", formData.email);

    try {
      const response = await fetch(
        "http://localhost/chatting-app-php-react/adminbackend/send_email.php",
        // `${backendUrl}/adminlogin.php`,
        {
          method: "POST",
          body: form,
          credentials: "include",
        }
      );

      if (response.ok) {
        setError("valid User");
      } else {
        setError("Invalid User");
      }
    } catch (error) {
      console.error("An error occurred while logging", error);
      setError("Please Enter Valid Information");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <>
      <Grid style={{ backgroundColor: "#e4e4e4", height: "100vh" }} container>
        <Grid
          style={{ padding: sm ? "80px 0px" : "40px 0px" }}
          item
          lg={6}
          md={6}
          sm={10}
          xs={10}
          mx="auto"
        >
          <Grid mx="auto" style={{}} item lg={6} md={12} sm={12} xs={12}>
            <Box
              mt={5}
              className="flex-centered"
              style={{
                padding: sm ? "0px 50px" : "0px 0px",
              }}
            >
              <Box
                style={{
                  padding: sm ? "30px 0px" : "50px 0px",
                  textAlign: "center",
                }}
              >
                <Box mb={5}>
                  <img
                    style={{ width: "150px" }}
                    src="https://atypicalsoftware.com/images/logo.png"
                    alt=""
                  />
                </Box>
                <Box style={{ marginTop: sm ? "70px" : "0px" }} mt={1}>
                  {" "}
                  <h3> Sign In </h3>{" "}
                </Box>
                <Box style={{ fontSize: "14px" }}>Admin Login Panel</Box>
                <Box mt={1}>
                  <input
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      setFormData({ ...formData, username: e.target.value });
                      setError("");
                    }}
                    value={formData.username}
                    style={{
                      padding: "7px 15px",
                      width: "250px",
                      border: "none",
                      outline: "none",
                      background: "#eeeeee",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                    type="text"
                    placeholder="Username"
                  />
                </Box>
                {loading ? ( // Conditionally render loader or form
                  <>
                    <CircularProgress
                      style={{
                        position: "absolute",
                        zIndex: 99,
                        bottom: "450px",
                      }}
                    />
                  </>
                ) : null}
                <Box mt={2}>
                  <input
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      setError("");
                    }}
                    value={formData.password}
                    style={{
                      padding: "7px 15px",
                      width: "250px",
                      border: "none",
                      outline: "none",
                      background: "#eeeeee",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                    type="password"
                    placeholder="Password"
                  />
                </Box>
                <Box mt={1} style={{ color: "red", fontSize: "15px" }}>
                  {error}
                </Box>
                <Box style={{ display: "flex", justifyContent: "center" }}>
                  <Box
                    mt={3}
                    onClick={() => {
                      handleSubmit();
                    }}
                    className="custom-button"
                  >
                    Login
                  </Box>
                </Box>

                {/* <Box mt={2} style={{ fontSize: "14px", cursor: "pointer" }}>
                  Forget Password ?
                </Box> */}

                {/* <Box style={{position: "absolute", zIndex: 55, background: "grey", padding: "50px"}}>
                  <h5> Forget Password </h5>
                </Box> */}

                <Box
                  mt={1}
                  style={{ fontSize: "14px", cursor: "pointer" }}
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Forget Password ?
                </Box>

                <div
                  className="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          Verify Username
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        {/* <Box>Enter Username</Box> */}
                        <Box>
                          <input
                            type="text"
                            placeholder="Enter Username"
                            className="form-control"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                username: e.target.value,
                              })
                            }
                            value={formData.username}
                          />
                        </Box>

                        {/* <Box>Enter Email</Box> */}
                        <Box mt={2}>
                          <input
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            value={formData.email}
                            type="text"
                            placeholder="Enter Email"
                            className="form-control"
                          />
                        </Box>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          onClick={handleForget}
                          type="button"
                          className="btn btn-primary"
                        >
                          Verfify
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminLogin;
