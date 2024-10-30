import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";

const OnlineStatus = () => {
  const {
    id,
    user = [],
    receiverId,
    allUser,
    grp_message,
    grp_id,
    sel_mess,
    sel_messId,
    media,
    username,
    status,
    filtermsg,
    replymess,
    messChange,
    ids,
    onlinestatus,
    toggle,
    togglescroll,
  } = useSelector((state) => state.ui);
  return (
    <>
      <Box>
        <Box ml={1} className="capitalize-text">
          {username}
        </Box>
        {status && (
          <Box className="sum-status">
            {onlinestatus == "1" ? (
              <Box ml={1} className="sum-active-box">
                Online
              </Box>
            ) : (
              <Box ml={1} className="sum-active-box">
                Offline
              </Box>
            )}
            {onlinestatus == "1" ? (
              <Box ml={0.6} mt={0.6} className="styled-element"></Box>
            ) : null}
          </Box>
        )}

        <Box className="custom-stylee">
          {!status && (
            <Box className="sum-alluser">
              {allUser.data
                .filter((item) => ids.includes(item.id))
                .map((item, i) => (
                  <Box className="sum-username">
                    <Box className="custom-text3" key={i}>
                      {item.username},&nbsp;
                    </Box>
                  </Box>
                ))}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default OnlineStatus;
