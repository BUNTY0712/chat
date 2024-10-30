import React, { useEffect, useState } from "react";
import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../Css/Forget.css";

const Forget = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_API_URL;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [resettingPassword, setResettingPassword] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");
    if (token) {
      setResettingPassword(true);
    }
  }, [location.search]);

  const handleSendForgetPasswordLink = async () => {
    if (formData.username.trim() === "") {
      setError("Please enter a username.");
      return;
    }

    const form = new FormData();
    form.append("username", formData.username);

    try {
      const response = await fetch(`${backendUrl}/forget.php`, {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("response", responseData);

        if (responseData.error) {
          setError(responseData.error);
        } else {
          console.log("responseData", responseData);
          setError("");
          setSuccessMessage(responseData.success);
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error("An error occurred while sending reset link", error);
      setError("Failed to send reset link. Please try again.");
    }
  };

  const handleResetPassword = async () => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");

    if (
      formData.password.trim() === "" ||
      formData.confirmPassword.trim() === ""
    ) {
      setError("Password fields cannot be empty.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const form = new FormData();
    form.append("password", formData.password);
    form.append("token", token);

    try {
      const response = await fetch(`${backendUrl}/forget.php`, {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("response", responseData.error);
        if (responseData.error) {
          setError(responseData.error);
        } else {
          alert("Password Updated successfully");
        }
      } else {
        setError("Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred while resetting password", error);
      setError("Failed to reset password. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
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
          <Box mt={5} className="centered-box">
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
                {resettingPassword ? (
                  <h3>Reset Password</h3>
                ) : (
                  <h3>Forget Password</h3>
                )}
              </Box>

              {!resettingPassword && (
                <Box style={{ fontSize: "14px", color: "red" }}>{error}</Box>
              )}

              <Box style={{ fontSize: "14px", color: "green" }}>
                {successMessage}
              </Box>
              {!resettingPassword && (
                <Box mt={1}>
                  <input
                    onChange={handleChange}
                    value={formData.username}
                    className="styled-input"
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                  />
                </Box>
              )}

              {resettingPassword && (
                <>
                  <Box style={{ fontSize: "14px", color: "red" }}>{error}</Box>
                  <Box mt={1}>
                    <input
                      onChange={handleChange}
                      value={formData.password}
                      onBlur={handleChange}
                      className="styled-input"
                      type="password"
                      name="password"
                      placeholder="Enter new password"
                    />
                  </Box>

                  <Box className="text"></Box>

                  <Box mt={1}>
                    <input
                      onChange={handleChange}
                      value={formData.confirmPassword}
                      onBlur={handleChange}
                      className="custom-input"
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm new password"
                    />
                  </Box>

                  <Box className="text"></Box>
                </>
              )}

              <Box style={{ display: "flex", justifyContent: "center" }} mt={3}>
                <Box
                  onClick={() => {
                    resettingPassword
                      ? handleResetPassword()
                      : handleSendForgetPasswordLink();
                  }}
                  className="button"
                >
                  {resettingPassword ? "Reset Password" : "Submit"}
                </Box>
              </Box>

              {!resettingPassword && (
                <Box mt={2} style={{ fontSize: "14px" }}>
                  <Link to="/">Login ?</Link>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Forget;
