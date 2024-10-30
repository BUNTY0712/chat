import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { IoCallOutline } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHeader, setToggleSetting } from "../Reducers/UiReducer";
const MobLogout = () => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, editId, togglesetting } = useSelector((state) => state.ui);
  const [select, setSelect] = useState("");
  const handleLogout = async () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");

    const form = new FormData();
    form.append("sender_id", id);

    // console.log("form", formData);
    try {
      const response = await fetch(
        // "http://localhost/sir/chating-app/backend/upload.php",
        // `${config.REACT_APP_BACKEND_URL}/logout.php`,
        `${backendUrl}/logout.php`,
        {
          method: "POST",
          body: form,
        }
      );
    } catch (error) {
      console.error("An error occurred while sending the message:", error);
    }
  };

  return (
    <>
      <Grid
        className="fullscreen-background"
        item
        lg={0.6}
        md={0.6}
        sm={2}
        xs={2}
      >
        <Box>
          {" "}
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
            onClick={() => navigate("/dashboard")}
            mt={2}
            style={{
              fontSize: "12px",
              textAlign: "center",
              textTransform: "capitalize",
              letterSpacing: "2px",
              // lineHeight: "2ppx",
            }}
          >
            {editId.username}
          </Box>
        </Box>

        <Box mt={3} className="centered-text-large">
          {/* <Box>
            <IoSettingsSharp />
          </Box> */}
          {/* 
          <Box mt={2}>
            <IoCallOutline />
           
          </Box> */}
          <Box
            onClick={() => {
              {
                navigate("/password-change");
                dispatch(setHeader("Change Password"));
              }
              // dispatch(setToggleSetting(!togglesetting));
              // setSelect("setting");
            }}
            className="padding-background-margintop-cursor"
            style={{
              background:
                select == "setting" ? "hsl(220deg 31.03% 11.37%)" : "",
            }}
          >
            <IoSettingsSharp />
          </Box>
          <Box
            mt={2}
            onClick={handleLogout}
            className="padding-background-margintop-cursor"
            style={{
              background:
                select == "setting" ? "" : "hsl(220deg 31.03% 11.37%)",
            }}
          >
            <BiLogOutCircle />
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default MobLogout;
