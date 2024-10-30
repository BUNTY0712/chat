import React from "react";
import { Grid } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import "../App.css";
import Notify from "../Page/Notify";
import MobSingleUserMessage from "./MobSingleUserMessage";
import { useSelector } from "react-redux";
import MobLogout from "./MobLogout";
import MobSideBar from "./MobSideBar";

function MobDashboard() {
  const { mobileselect } = useSelector((state) => state.ui);
  return (
    <>
      <Grid className="my-white-background-and-text" container>
        <Notify />
        {mobileselect === "desktop" ? null : <MobLogout />}
        {mobileselect === "desktop" ? <MobSingleUserMessage /> : <MobSideBar />}
      </Grid>
    </>
  );
}

export default MobDashboard;
