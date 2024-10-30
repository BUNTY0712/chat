import { Box, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { IoSettingsSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHeader } from "../Reducers/UiReducer";

const Logout = () => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, editId } = useSelector((state) => state.ui);
  const [select, setSelect] = useState("");

  const handleLogout = async () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");

    const form = new FormData();
    form.append("sender_id", id);

    try {
      await fetch(`${backendUrl}/logout.php`, {
        method: "POST",
        body: form,
      });
    } catch (error) {
      console.error("An error occurred while logging out:", error);
    }
  };

  // useEffect(() => {
  //   const handleWindowClose = (event) => {
  //     event.preventDefault();
  //     handleLogout();
  //     event.returnValue = "";
  //   };

  //   window.addEventListener("beforeunload", handleWindowClose);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleWindowClose);
  //   };
  // }, []);

  return (
    <Grid className="fullscreen-background" item lg={0.6}>
      <Box>
        <Box
          onClick={() => {
            navigate("/useredit");
            dispatch(setHeader("Edit User"));
          }}
          className="centered-padding-background"
        >
          <img
            className="rounded-square"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVpX6V5vW3sw6xZd0OojjdzPVBNQxZOR8iqALSVhkCtmGXsgW9IDx6o2MFEZAsMlTx0BQ&usqp=CAU"
            alt=""
          />
        </Box>
        <Box
          mt={2}
          style={{
            fontSize: "12px",
            textAlign: "center",
            textTransform: "capitalize",
            letterSpacing: "2px",
          }}
        >
          {editId.username}
        </Box>
      </Box>

      <Box mt={3} className="centered-text-large">
        <Box
          onClick={() => {
            navigate("/password-change");
            dispatch(setHeader("Change Password"));
          }}
          className="padding-background-margintop-cursor"
          style={{
            background: select === "setting" ? "hsl(220deg 31.03% 11.37%)" : "",
          }}
        >
          <IoSettingsSharp />
        </Box>
        <Box
          mt={2}
          onClick={handleLogout}
          className="padding-background-margintop-cursor"
          style={{
            background: select === "setting" ? "" : "hsl(220deg 31.03% 11.37%)",
          }}
        >
          <BiLogOutCircle />
        </Box>
      </Box>
    </Grid>
  );
};

export default Logout;
