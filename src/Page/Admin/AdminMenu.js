import React from "react";
import { Box, Grid } from "@mui/material";
import { BiSolidDashboard } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiLogoutCircleLine } from "react-icons/ri";
import AdminChangePassword from "../../Form/AdminChangePassword";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setChangeSection } from "../../Reducers/UiReducer";
const AdminMenu = () => {
  const { id, replyid, selectedUsers, changesection } = useSelector(
    (state) => state.ui
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    dispatch(setChangeSection("logout"));
    navigate("/adminlogin");
  };

  const handleDashboard = () => {
    dispatch(setChangeSection("dashboard"));
    navigate("/admin");
  };

  const handleChangePasword = () => {
    dispatch(setChangeSection("changepassword"));
    navigate("/changePassword");
  };
  return (
    <>
      <Grid className="custom-container-2" item lg={2.5} mx="auto">
        <Box style={{}} mt={2} pl={1} pr={1}>
          <img
            style={{ width: "100%" }}
            src="https://atypicalsoftware.com/images/logo.png"
            alt=""
          />
        </Box>

        {/* Dashboard  */}
        <Box
          className={
            changesection === "dashboard" ? "custom-style-2" : "custom-style-3"
          }
          ml={2}
          mr={2}
          mt={4}
          onClick={() => handleDashboard()}
        >
          <Box
            className={
              changesection === "dashboard"
                ? "custom-button-3"
                : "custom-button-4"
            }
          >
            <BiSolidDashboard />
          </Box>
          <Box ml={2} className="bold-blue-text">
            Dashboard
          </Box>
        </Box>

        {/* Change password  */}
        <Box
          className={
            changesection === "changepassword"
              ? "custom-style-2 top-css"
              : "custom-style-3"
          }
          ml={2}
          mr={2}
          onClick={() => handleChangePasword()}
        >
          <Box
            className={
              changesection === "changepassword"
                ? "custom-button-3"
                : "custom-button-4"
            }
          >
            <RiLockPasswordFill />
          </Box>

          <Box ml={1.2} className="bold-blue-text">
            Change Password
          </Box>
          {/* <AdminChangePassword /> */}
        </Box>

        {/* logout  */}
        <Box
          // mt={3}
          className={
            changesection === "logout"
              ? "custom-style-2 top-css"
              : "custom-style-3"
          }
          ml={2.6}
          mr={2}
          // mt={2}
        >
          <Box
            className={
              changesection === "logout" ? "custom-button-3" : "custom-button-4"
            }
          >
            <RiLogoutCircleLine />
          </Box>
          <Box
            onClick={() => handleLogout()}
            ml={1.2}
            className="bold-blue-text"
          >
            Logout
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default AdminMenu;
