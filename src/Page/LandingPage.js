import React, { useEffect } from "react";

// import ChannelName from "./smallComponent/ChannelName";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsChatText } from "react-icons/bs";
import { Box, Grid } from "@mui/material";
import Logout from "./Logout";
import ChangePassword from "./ChangePassword";
import axios from "axios";
import {
  setgrpshadow,
  setMessChange,
  setReceiverId,
  setStatus,
  setUser,
  setuserName,
} from "../Reducers/UiReducer";
import Sidebar from "./Sidebar";
import Header from "./Header";

const LandingPage = () => {
  const {
    id,
    user = [],
    receiverId,
    allUser = {}, // Default to an empty object to avoid undefined errors
    selectemem,
    grp_receiverId,
    grp_message,
    grp_id,
    sel_mess,
    sel_messId,
    media,
    username,
    status,
    togglesetting,
    filtermsg,
    channel,
    messChange,
    grpshadow,
    ids,
    shadow,
    selectId,
    toggle,
    isScrollAtBottom,
    replyid,
    selectedUsers,
  } = useSelector((state) => state.ui);
  const backendUrl = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/getallusers.php`);
        // dispatch(setallUser(response.data));
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [backendUrl, dispatch]);

  return (
    <>
      <Grid className="my-white-background-and-text" container>
        <Logout />
        <Sidebar />
        <Grid
          style={{
            height: "100vh",
            backgroundColor: "rgb(247 250 255)",
          }}
          item
          lg={8.9}
          mx="auto"
        >
          <Header />
          <Box>
            <Box
              style={{
                color: "#139cec",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "150px",
                cursor: "pointer",
              }}
            >
              <Box
                style={{
                  boxShadow: "0 0 15px",
                  color: "#139cec",
                  padding: "50px",
                }}
              >
                <h1>Welcome to the chat section</h1>

                <Box style={{ textAlign: "center" }}>
                  <BsChatText style={{ fontSize: "55px" }} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default LandingPage;
