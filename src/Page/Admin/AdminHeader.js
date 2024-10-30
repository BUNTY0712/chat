import React from "react";
import { Box, Grid } from "@mui/material";
import RegistrationForm from "../../Form/RegistrationForm";
const AdminHeader = () => {
  return (
    <>
      <Box mt={0} className="custom-box-5">
        <Grid container>
          <Grid item lg={3.5}></Grid>
          <Grid item lg={4.5} mx="auto">
            <Box mt={1} mr={5} className="custom-button-6">
              <Box>
                <h5> Welcome To Rohit Sir</h5>{" "}
              </Box>
            </Box>
          </Grid>
          <Grid item lg={2.5} mx="auto">
            {" "}
            <Box>
              <RegistrationForm />
            </Box>
          </Grid>
        </Grid>
        <Box className="flex-end-container">
          <Box></Box>

          <Box></Box>
        </Box>
      </Box>
    </>
  );
};

export default AdminHeader;
