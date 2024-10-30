import React from "react";
import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import edit from "../image/edit.jpg";
import { FaUser } from "react-icons/fa";

const Header = () => {
  const { editId, togglesetting, username, header } = useSelector(
    (state) => state.ui
  );
  return (
    <>
      <Box className="edit-background">
        <Box className="edit-user-2 edit-name">
          <Box className="edit-name">{header} </Box>
          <Box>
            <span>
              <FaUser />
            </span>
            <span className="icon-css">{editId.username}</span>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Header;
