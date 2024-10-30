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
import MobLogout from "./MobLogout";
import MobSideBar from "./MobSideBar";

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
        <MobLogout />
        <MobSideBar />
      </Grid>
    </>
  );
};

export default LandingPage;
