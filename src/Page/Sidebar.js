import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, Paper } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import axios from "axios";
import ChangePassword from "./ChangePassword";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setReceiverId,
  setUser,
  setselecteMem,
  setgrp_receiverId,
  setgrp_message,
  setgrp_id,
  setuserName,
  setStatus,
  setMessChange,
  setIds,
  setChannel,
  setHeader,
  setOnlineStatus,
  setSel_Mess,
  setSel_MessId,
  setToggle,
  SetToggleScroll,
  setPhoneNo,
} from "../Reducers/UiReducer";
import { MdDelete } from "react-icons/md";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    id,
    user = [],
    receiverId,
    allUser,
    grp_id,
    togglesetting,
    messChange,
    channel,
  } = useSelector((state) => state.ui);
  let { idss, idd } = useParams();
  const containerRef = useRef(null);
  const [scroll, setScroll] = useState(true);
  // const [channel, setChannel] = useState([]);

  const [grpshadow, setgrpshadow] = useState("");
  // const [messChange, setMessChange] = useState("one");
  const [selectId, setSelectId] = useState("");
  const [selectParticular, setSelectParticular] = useState("");
  const [formData, setFormData] = useState({
    sender_id: id,
    receiver_id: messChange == "one" ? idss : null,
    message: "",
    image: null,
    pdf: null,
  });

  const [formNoti, setFormNoti] = useState({
    sender_id: id,
    receiver_id: receiverId,
  });

  const [formRead, setFormRead] = useState({
    sender_id: id,
    receiver_id: receiverId,
  });

  const [UserUpdate, setUserUpdate] = useState({
    sender_id: id,
    receiver_id: id,
  });

  const [selectIdd, setSelectIdd] = useState([]);
  const [showId, setShowId] = useState([]);
  const [channelData, setChannelData] = useState({
    sender_id: id,
    receiver_id: [],
    message: "",
    image: null,
    pdf: null,
    grp_name: "",
  });
  const [timeoutCountt, setTimeoutCountt] = useState(false);
  const [timeoutCount, setTimeoutCount] = useState(false);

  const backendUrl = process.env.REACT_APP_API_URL;
  const [shadow, setShadow] = useState("");
  const [shadow2, setShadow2] = useState("");
  const [err, setErr] = useState("");

  const [selectedUsers, setSelectedUsers] = useState([]);
  // const [ids, setId] = useState("");
  const [grpidd, setgrpid] = useState("");
  const handleGetChannel = async () => {
    console.log("group");
    try {
      const response = await axios({
        method: "get",
        url: `${backendUrl}/getallgroup.php`,
      });
      dispatch(setChannel(response.data.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlegrpDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this channel?"
    );

    if (!isConfirmed) {
      return;
    }

    const form = new FormData();
    form.append("id", id);

    try {
      const response = await fetch(`${backendUrl}/grpdelete.php`, {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        console.log("response", response.data);
        alert("Delete Successfully");
      } else {
        console.log("fail");
      }
    } catch (error) {
      console.error("An error occurred while logging", error);
    }
  };

  const handleGrpGet = async () => {
    dispatch(setMessChange("many"));
    const form = new FormData();
    form.append("sender_id", id);
    form.append("grp_id", idd);
    // }

    try {
      const response = await fetch(
        `${backendUrl}/getpttgrpmessage.php`,

        {
          method: "POST",
          body: form,
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        const { usermessages } = responseData;

        dispatch(setgrp_message(usermessages));
        dispatch(setUser(usermessages));

        setTimeoutCount(true);
      } else {
        console.error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("An error occurred while fetching messages:", error);
    }
  };

  const handleGrpBoxClick = (item) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    const idsss = item.receiver_id;
    const idsArray = idsss
      .split(",")
      .map((id) => id.trim().replace(/^"|"$/g, ""));
    dispatch(setToggle("replyoff"));
    dispatch(setSel_Mess(null));
    dispatch(setSel_MessId(!null));
    dispatch(setIds(idsArray));
    dispatch(setOnlineStatus(item.status));

    dispatch(setStatus(false));
    dispatch(setuserName(item.grp_name));

    setShadow("");
    setgrpid(item.sender_id);
    dispatch(setMessChange("many"));
    setgrpshadow(item.id);
    dispatch(setgrp_id(item.id));
    dispatch(setgrp_receiverId(item.receiver_id));

    handleGrpGet(item);
    navigate(`/group/${item.id}`);
  };

  const toggleUserSelection = (userId) => {
    dispatch(setselecteMem(userId));
    let updatedSelectId;
    if (selectIdd.includes(userId)) {
      updatedSelectId = selectIdd.filter((item) => item !== userId);
    } else {
      updatedSelectId = [...selectIdd, userId];
    }
    setSelectIdd(updatedSelectId);
    setShowId(updatedSelectId);

    setChannelData((prevChannelData) => ({
      ...prevChannelData,
      receiver_id: updatedSelectId,
    }));

    console.log("receiver_id", channelData.receiver_id);
  };

  const handleChannel = async (e) => {
    if (channelData.grp_name === "") {
      setErr("Please Enter Group Name");
      return; // Exit the function if the group name is empty
    }
    const form = new FormData();
    form.append("sender_id", channelData.sender_id);
    form.append("receiver_id", channelData.receiver_id);
    form.append("message", channelData.message);
    form.append("image", channelData.image);
    form.append("grp_name", channelData.grp_name);
    form.append("pdf", channelData.pdf);
    try {
      const response = await fetch(`${backendUrl}/createchannel.php`, {
        method: "POST",
        body: form,
      });
      const responseData = await response.json();
      console.log("responseData", responseData.data);
      dispatch(setChannel(responseData.data));
      if (responseData.success == true) {
        setSelectIdd([]);
        setShowId([]);
        setSelectedUsers([]);
        setChannelData({
          ...channelData,
          message: "",
          image: null,
          pdf: null,
          grp_name: "",
        });
        handleGetChannel();
        const responseData = await response.json();
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("An error occurred while sending the message:", error);
    }
  };

  const handleReadUpdate = async (item) => {
    const form = new FormData();
    form.append("sender_id", id);
    form.append("receiver_id", item.id);
    setTimeoutCountt(true);

    try {
      const response = await fetch(`${backendUrl}/update_is_read.php`, {
        method: "POST",
        body: form,
      });
    } catch (error) {
      console.error("An error occurred while sending the message:", error);
    }
  };

  useEffect(() => {
    handleGetChannel();
  }, []);

  const handleBoxClick = (item) => {
    dispatch(setPhoneNo(item.phone));
    dispatch(setOnlineStatus(item.online));
    // console.log("phoneno", phoneno);
    // console.log("onlinestatus", item.online);
    dispatch(SetToggleScroll((prev) => !prev));
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    dispatch(setToggle("replyoff"));
    dispatch(setSel_Mess(null));
    dispatch(setSel_MessId(!null));
    setScroll(!true);
    setgrpshadow("");

    // alert("sd", item.status);
    dispatch(setMessChange("one"));
    dispatch(setReceiverId(item.id));
    dispatch(setuserName(item.username));
    dispatch(setStatus(true));

    setSelectId(item.id);
    setSelectParticular(item);
    setFormData({
      ...formData,
      receiver_id: item.id,
    });
    setFormNoti({
      ...formNoti,
      receiver_id: item.id,
    });
    setFormRead({
      ...formRead,
      receiver_id: item.id,
    });
    setUserUpdate({
      sender_id: 0,
      receiver_id: item.id,
    });
    handleReadUpdate(item);
    navigate(`/user/${item.id}`);
  };
  return (
    <>
      <Grid
        style={{
          background: "hsl(206.25deg 66.67% 95.29%)",
          height: "auto",
          color: "black",
        }}
        item
        lg={2.5}
        mx="auto"
      >
        <Box
          onClick={() => {
            navigate("/dashboard");
            dispatch(setHeader("Welcome to the ASPL"));
          }}
          className="padded-colored-background"
        >
          <img
            style={{ width: "100%" }}
            src="https://atypicalsoftware.com/images/logo.png"
            alt=""
          />
        </Box>

        <Box
          style={{
            background: "hsl(206.25deg 66.67% 95.29%)",
            height: "auto",
            color: "black",
            backgroundSize: "100%",
          }}
        >
          {/* {togglesetting ? <ChangePassword /> : null} */}
          <Box className="scrollable-container">
            {Array.isArray(allUser.data) &&
              allUser.data.map((item, i) => (
                <>
                  {item.id !== id.toString() && (
                    <Box
                      className="my-class"
                      key={i}
                      onClick={() => {
                        handleBoxClick(item);
                        setShadow(item.id);
                      }}
                      style={{
                        borderLeft: idss === item.id ? "4px solid #139cec" : "",
                        color: idss === item.id ? "#139cec" : "",
                        background:
                          idss === item.id
                            ? "linear-gradient(to right, white, #7ccfff)"
                            : "  hsl(206.25deg 66.67% 95.29%)",
                      }}
                      mt={0}
                    >
                      <Box style={{ display: "flex" }}>
                        <Box className="my-flex-white-text" mr={2}>
                          <Box></Box>
                        </Box>

                        <Box mt={1}>
                          <Box style={{ display: "flex" }}>
                            <Box style={{ fontWeight: "500" }}>
                              {" "}
                              {item.username}{" "}
                            </Box>

                            {item.online === "1" ? (
                              <Box ml={1} mt={1} className="custom-style"></Box>
                            ) : null}
                          </Box>

                          <Box style={{ fontSize: "12px" }}>Send message </Box>
                        </Box>

                        {item.s_seen === "1" && item.r_seen === "0" && (
                          <Box key={i} mt={1} style={{ marginLeft: "140px" }}>
                            <Box className="my-styled-button">New</Box>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  )}
                </>
              ))}
          </Box>

          <Box mt={2} ml={3.5} className="flex-style">
            <button
              style={{ fontWeight: 500, fontSize: "11px" }}
              type="button"
              className="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Create Channel{" "}
              <span style={{ marginTop: "-1px", marginLeft: "2px" }}>
                {" "}
                <FaPlus />{" "}
              </span>
            </button>

            <div
              className="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Create Channel
                    </h5>
                    <button
                      onClick={() => setErr("")}
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <Box>Name of Channel</Box>
                    <Box>
                      <input
                        onChange={(e) => {
                          setChannelData({
                            ...channelData,
                            grp_name: e.target.value,
                          });
                          setErr("");
                        }}
                        value={channelData.grp_name}
                        className="form-control"
                        type="text"
                      />
                    </Box>
                    <Box className="err-style">{err}</Box>
                    <Box mt={1}>
                      <h5>Add Member </h5>
                    </Box>
                    <Box>
                      {Array.isArray(allUser.data) &&
                        allUser.data
                          .filter((item) => item.id !== id)
                          .map((item) => (
                            <Box
                              className="new-class"
                              key={item.id}
                              onClick={async () => {
                                setShadow2(item.id);
                                toggleUserSelection(item.id);
                              }}
                              style={{
                                boxShadow:
                                  shadow2 === item.id ? "0 0 5px" : "0 0 1px",
                              }}
                              mt={3}
                            >
                              <Box style={{ display: "flex" }}>
                                <Box
                                  style={{
                                    color: "black",
                                    marginRight: "8px",
                                  }}
                                >
                                  <img
                                    className="circle-button"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVpX6V5vW3sw6xZd0OojjdzPVBNQxZOR8iqALSVhkCtmGXsgW9IDx6o2MFEZAsMlTx0BQ&usqp=CAU"
                                    alt=""
                                  />
                                </Box>
                                <Box>
                                  <h5>{item.username}</h5>
                                </Box>
                                {item.online === "1" && (
                                  <Box className="green-circle"></Box>
                                )}
                              </Box>
                              <Box>
                                {selectIdd.includes(item.id) ? (
                                  <Box>
                                    <TiTick />
                                  </Box>
                                ) : (
                                  <Box className="center-flex">
                                    <Box style={{ marginTop: "1px" }}>Add</Box>
                                    <Box style={{ marginLeft: "4px" }}>
                                      <FaPlus />
                                    </Box>
                                  </Box>
                                )}
                              </Box>
                            </Box>
                          ))}
                    </Box>
                  </div>
                  <div className="modal-footer">
                    <button
                      onClick={async () => {
                        dispatch(setselecteMem([]));
                      }}
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      onClick={handleChannel}
                      type="button"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      className="btn btn-primary"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Box>
          <Box style={{ display: "flex" }}>
            <Box className="my-new-style" mt={2} ml={3.5}>
              Created{" "}
              <span style={{ borderBottom: "2px solid grey" }}> Channels </span>{" "}
            </Box>
          </Box>
          <Box className="custom-stylee channel-box">
            {Array.isArray(channel) &&
              channel
                .filter((item) => {
                  const receiverIds = item.receiver_id ? item.receiver_id : [];
                  return receiverIds.includes(Number(id));
                })
                .map((item, i) => (
                  <Box
                    key={i}
                    onClick={async () => {
                      await handleGrpBoxClick(item);
                    }}
                    className="my-styled-component"
                    style={{
                      background:
                        idss === item.id
                          ? "linear-gradient(to right, white, #7CCFFF)"
                          : "hsl(206.25deg 66.67% 95.29%)",
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box style={{ color: "white" }} mr={2}>
                        <img
                          className="rounded-box"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcW9DNhn-g9K9RKPSjBnolksTrOZU6u2Z-RQ&shttps://media.licdn.com/dms/image/D4E12AQHHMdfFMwm3YA/article-cover_image-shrink_720_1280/0/1661728501609?e=2147483647&v=beta&t=3T_AsYyTEklBTggqfGki846L1ksRNavSq-499aWFKII"
                          alt=""
                        />
                      </Box>
                      <Box mt={0.5}>
                        <Box>
                          <h6>{item.grp_name}</h6>
                        </Box>
                      </Box>
                      <Box
                        onClick={() => handlegrpDelete(item.id)}
                        style={{ marginLeft: "20px", display: "none" }}
                      >
                        <MdDelete />
                      </Box>
                    </Box>
                  </Box>
                ))}
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default Sidebar;
