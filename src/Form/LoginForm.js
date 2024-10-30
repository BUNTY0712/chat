import {
  Grid,
  Box,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  setHeader,
  setId,
  setallUser,
  seteditId,
  setuserLogin,
} from "../Reducers/UiReducer";
import axios from "axios";
import "../Css/Login.css";

const LoginForm = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const backendUrl = process.env.REACT_APP_API_URL;
  const handleSubmit = async () => {
    setLoading(true);
    const form = new FormData();
    form.append("username", formData.username);
    form.append("password", formData.password);

    try {
      const response = await fetch(`${backendUrl}/login.php`, {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        const responseData = await response.json();
        dispatch(setHeader("Welcome to ASPL"));
        console.log("responseDatalogin", responseData.id);
        dispatch(seteditId(responseData));

        sessionStorage.setItem("userData", JSON.stringify(responseData));

        dispatch(setId(responseData.id));
        dispatch(setuserLogin(responseData.username));
        if (responseData.status == "0") {
          setLoading(false);
          if (isSmallScreen) {
            navigate("/moblandingpage");
          } else {
            navigate("/dashboard");
          }
        } else {
          setError("Wrong email or password! ");
        }
      } else {
        setError("Invalid User");
      }
    } catch (error) {
      console.error("An error occurred while logging", error);
      setError("Wrong email or password!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/getallusers.php`);
        dispatch(setallUser(response.data));
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
              className="centered-box"
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
                <Box style={{ fontSize: "14px" }}>User Login Panel</Box>
                <Box mt={1}>
                  <input
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      setFormData({ ...formData, username: e.target.value });
                      setError("");
                    }}
                    value={formData.username}
                    className="styled-input"
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
                    className="styled-input"
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
                    className="styled-button"
                  >
                    Login
                  </Box>
                </Box>

                <Box mt={2} style={{ fontSize: "14px" }}>
                  <Link to="/forget">Forget Password ?</Link>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginForm;
