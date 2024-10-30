import React from "react";
import { Grid, useMediaQuery } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import "../App.css";
import Notify from "./Notify";
import Logout from "./Logout";
import Sidebar from "./Sidebar";
import SingleUserMessage from "./SingleUserMessage";
import MobSingleUserMessage from "../Mobile/MobSingleUserMessage";

function App() {
  const small = useMediaQuery("(max-width:600px)");

  return (
    <>
      <Grid className="my-white-background-and-text" container>
        <Notify />
        <Logout />
        <Sidebar />
        <SingleUserMessage />
        {/* {small ? <SingleUserMessage /> : <MobSingleUserMessage />} */}
      </Grid>
    </>
  );
}

export default App;
