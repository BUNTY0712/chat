import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { setMedia } from "../../Reducers/UiReducer";
import { useDispatch, useSelector } from "react-redux";
import { BiDownload } from "react-icons/bi";
import pdfLogo from "../../image/pdfLogo.png";

const Media = () => {
  const imgUrl = process.env.REACT_APP_IMG_URL;

  const {
    id,
    user = [],
    receiverId,
    allUser,
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
  } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [mediaType, setMediatype] = useState("media");
  return (
    <>
      <Grid container>
        <Grid item lg={12}>
          <Box className="sidebar">
            <Box className="flex-container-5">
              <Box className="flex-padding-container">
                <Box>
                  {" "}
                  <img
                    className="rounded-box-9"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVpX6V5vW3sw6xZd0OojjdzPVBNQxZOR8iqALSVhkCtmGXsgW9IDx6o2MFEZAsMlTx0BQ&usqp=CAU"
                    alt=""
                  />
                </Box>

                <Box ml={1}>
                  {" "}
                  <h5>{username}</h5>
                </Box>
              </Box>

              <Box onClick={() => dispatch(setMedia(false))} mr={4}>
                <RxCross2 className="clickable-text" />
              </Box>
            </Box>

            <hr />

            <Box className="flex-evenly-container">
              <Box
                onClick={() => setMediatype("media")}
                style={{
                  borderBottom: mediaType == "media" ? "3px solid #139cec" : "",
                  paddingBottom: "0px",
                }}
              >
                Media
              </Box>
              <Box
                onClick={() => setMediatype("doc")}
                style={{
                  borderBottom: mediaType == "doc" ? "3px solid #139cec" : "",
                  paddingBottom: "0px",
                }}
              >
                Doc
              </Box>
              <Box
                style={{
                  borderBottom: mediaType == "link" ? "3px solid #139cec" : "",
                  paddingBottom: "0px",
                }}
                onClick={() => setMediatype("link")}
              >
                Link
              </Box>
            </Box>
            {mediaType === "media" ? (
              <Box
                style={{ overflowY: "scroll", height: "400px" }}
                mt={2}
                ml={2}
              >
                {user.some(
                  (item) =>
                    item.pdf.endsWith(".jpg") ||
                    item.pdf.endsWith(".jpeg") ||
                    item.pdf.endsWith(".png") ||
                    item.pdf.endsWith(".webp") ||
                    item.pdf.endsWith(".PNG")
                ) ? (
                  user.map((item, i) =>
                    item.pdf &&
                    (item.pdf.endsWith(".jpg") ||
                      item.pdf.endsWith(".jpeg") ||
                      item.pdf.endsWith(".png") ||
                      item.pdf.endsWith(".webp") ||
                      item.pdf.endsWith(".PNG")) ? (
                      <Box key={i}>
                        <Box
                          ml={1}
                          style={{
                            display: "flex",
                            float: "left",
                            padding: "10px",
                          }}
                        >
                          <Box>
                            <a
                              target="_blank"
                              href={`${imgUrl}/files/${item.pdf}`}
                              rel="noopener noreferrer"
                            >
                              <img
                                style={{
                                  width: "100px",
                                  height: "80px",
                                }}
                                src={`${imgUrl}/files/${item.pdf}`}
                                alt=""
                              />
                            </a>
                            <Box style={{ fontSize: "15px" }}>
                              {/* {item.pdf.split("_").pop()} */}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    ) : null
                  )
                ) : (
                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    <Box mt={2} style={{ textAlign: "center" }} ml={3}>
                      No Image Found !!!
                    </Box>
                  </Box>
                )}
              </Box>
            ) : mediaType === "doc" ? (
              <Box
                mt={2}
                ml={2}
                style={{ overflowY: "scroll", height: "400px" }}
              >
                {user.some((item) => item.pdf.endsWith(".pdf")) ? (
                  user.map((item, i) =>
                    item.pdf && item.pdf.endsWith(".pdf") ? (
                      <Box key={i}>
                        <Box
                          ml={1}
                          style={{
                            display: "flex",
                            float: "left",
                            padding: "10px",
                          }}
                        >
                          <Box>
                            <a
                              target="_blank"
                              href={`${imgUrl}/files/${item.pdf}`}
                              rel="noopener noreferrer"
                            >
                              <img
                                style={{
                                  width: "100px",
                                  height: "120px",
                                }}
                                src={pdfLogo}
                                alt=""
                              />
                            </a>
                            <Box style={{ fontSize: "15px" }}>
                              {item.pdf.split("_").pop()}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    ) : null
                  )
                ) : (
                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    <Box mt={2} style={{ textAlign: "center" }} ml={3}>
                      No Pdf Found !!!
                    </Box>
                  </Box>
                )}
              </Box>
            ) : (
              <Box
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  // overflowX: "scroll",
                }}
                mt={2}
              >
                {user.some(
                  (item) => item.message && item.message.startsWith("https://")
                ) ? (
                  user.map(
                    (item, i) =>
                      item.message &&
                      item.message.startsWith("https://") && (
                        <Box
                          key={i}
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            marginRight: "8px",
                            marginLeft: "8px",
                          }}
                        >
                          <Box
                            style={{
                              wordBreak: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            <a target="_blank" href={item.message}>
                              {item.message}
                            </a>
                          </Box>
                        </Box>
                      )
                  )
                ) : (
                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    <Box
                      mt={2}
                      style={{ textAlign: "center", margin: "10px 80px" }}
                      ml={3}
                    >
                      No Link Found !!!
                    </Box>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Media;
