import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MdDelete } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";
import { HiRefresh } from "react-icons/hi";
import { IoArrowBack } from "react-icons/io5";
import {
  setUser,
  setallUser,
  setgrp_message,
  setSel_MessId,
  setSel_Mess,
  setMedia,
  setFilterMsg,
  setReplyMess,
  setMobileSelect,
} from "../Reducers/UiReducer";
import "../App.css";
import { IoVideocamOutline } from "react-icons/io5";
import { IoArrowDownOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { IoIosSend } from "react-icons/io";
import { ImAttachment } from "react-icons/im";
import { IoSearchSharp } from "react-icons/io5";
import { PiDotsThreeOutlineVerticalDuotone } from "react-icons/pi";
import { MdOutlineReplyAll } from "react-icons/md";
import dragDrop from "drag-drop";
import { BsFillImageFill } from "react-icons/bs";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { BiDownload } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import pdfLogo from "../image/pdfLogo.png";
import excel from "../image/excel.png";
import php from "../image/php.png";
import sql from "../image/sql.png";
import { GoFileDirectoryFill } from "react-icons/go";
import { RiCheckDoubleLine } from "react-icons/ri";

import { display } from "@mui/system";
import Media from "../Page/smallComponent/Media";

const SingleUserMessage = () => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const imgUrl = process.env.REACT_APP_IMG_URL;

  const dispatch = useDispatch();
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
  } = useSelector((state) => state.ui);

  const [scrollVal, setScrollVal] = useState(10);
  const [scrollVall, setScrollVall] = useState(10);

  const [hasMoreFilterData, setHasMoreFilterData] = useState(true);
  const [hasMoreFilterDataa, setHasMoreFilterDataa] = useState(true);
  const [scroll, setScroll] = useState(true);

  // const [ids, setId] = useState("");

  const [replyid, setReplyId] = useState(null);

  const [selectedTripID, setSelectedTripID] = useState(null);

  const containerRef = useRef(null);
  const [isScrollAtBottom, setIsScrollAtBottom] = useState(true);
  let { idss, idd } = useParams();

  const handleptmsgdelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this channel?"
    );

    if (!isConfirmed) {
      return;
    }

    const form = new FormData();
    form.append("id", id);

    try {
      const response = await fetch(`${backendUrl}/ptmsgdelete.php`, {
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

  const handleQuillChange = (content, delta, source, editor) => {
    setFormData({ ...formData, message: content });
  };
  const handleRefresh = () => {
    // Reload the entire page
    window.location.reload();
  };

  // new
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  //new
  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isAtBottom = scrollHeight - scrollTop <= clientHeight + 0; // Adjusted for minor inconsistencies
      setIsScrollAtBottom(isAtBottom);
    }
  };

  const fetchMoreData = () => {
    if (scrollVal >= user.length) {
      setHasMoreFilterData(false);
    }

    setTimeout(() => {
      setScrollVal((prevScrollVal) =>
        prevScrollVal < user.length ? prevScrollVal + 5 : prevScrollVal
      );
    }, 500);
  };

  const fetchMoreDataa = () => {
    if (!grp_message || grp_message.length === 0) return;

    if (scrollVal >= grp_message.length) {
      setHasMoreFilterDataa(false);
    }

    setTimeout(() => {
      setScrollVall((prevScrollVal) =>
        prevScrollVal < grp_message.length ? prevScrollVal + 5 : prevScrollVal
      );
    }, 500);
  };

  const [messageLength, setMessageLength] = useState([]);

  // const [idss, setidss] = useState("");
  const [channel, setChannel] = useState([]);
  // const [messChange, setMessChange] = useState("one");

  const [formData, setFormData] = useState({
    sender_id: id,
    receiver_id: messChange == "one" ? receiverId : null,
    grpid: messChange == "many" ? grp_id : null,
    message: "",
    image: null,
    pdf: null,
  });

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      pdf: e.target.files[0],
    });

    // formData.append("pdf", pdfFile);
  };

  const [UserMessage, setUserMessage] = useState({
    sender_id: id,
    receiver_id: !messChange ? receiverId : null,
    grpid: messChange ? grp_id : null,
  });

  const cleanMessage = (message) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = message;

    const paragraphs = Array.from(tempDiv.querySelectorAll("p"));
    paragraphs.forEach((p) => {
      if (p.innerHTML.trim() === "<br>") {
        p.remove();
      }
    });

    return tempDiv.innerHTML;
  };

  const url = "https://www.google.com/search?";

  const [toggle, setToggle] = useState(true);

  const handleToggle = (id, mess) => {
    dispatch(setReplyMess("color"));
    setReplyId(id);
    setToggle((prevToggle) => !prevToggle);
    if (toggle) {
      dispatch(setSel_Mess(null));
      dispatch(setSel_MessId(!null));
    } else {
      dispatch(setSel_MessId(id));
      dispatch(setSel_Mess(mess));
    }
  };

  const [selectedUsers, setSelectedUsers] = useState([]);

  const [search, setSearch] = useState("");

  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts
      .map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase()
          ? `<span key=${index} style="color: red;">${part}</span>`
          : part
      )
      .join("");
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/getallusers.php`);
      dispatch(setallUser(response.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [timeoutCountt, setTimeoutCountt] = useState(false);

  const handleDrop = (files) => {
    const formData = new FormData();
    formData.append("sender_id", id);
    formData.append("receiver_id", receiverId);
    let pdfFile = null;
    Array.from(files).forEach((file) => {
      console.log("File type:", file.type);
      console.log("File name:", file.name);
      pdfFile = file;
    });

    if (pdfFile) formData.append("pdf", pdfFile);

    fetch(`${backendUrl}/upload.php`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setTimeoutCountt(true);
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    const dropElement = document.body;

    const dropHandler = (files, pos, fileList, directories) => {
      console.log("Drop event triggered");
      handleDrop(files);
    };
    const removeDrop = dragDrop(dropElement, { onDrop: dropHandler });

    return () => {
      removeDrop();
    };
  }, [id, receiverId]);

  useEffect(() => {
    axios({
      method: "get",

      url: `${backendUrl}/getallusers.php`,
    })
      .then((response) => {
        dispatch(setallUser(response.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [stop, setStop] = useState(true);

  var userDataString = sessionStorage.getItem("userData");

  var userData = JSON.parse(userDataString);
  var usernames = userData.username;

  const [filterstatus, setFilterStatus] = useState(false);

  const handleFilter = (e) => {
    const value = e.target.value;
    if (value !== "") {
      setSearch(value);
      setFilterStatus(true);
      setStop(false);
      console.log("value", value);
      if (messChange == "one") {
        const filteredData = user.filter((item) =>
          item.message.includes(value)
        );
        dispatch(setFilterMsg(filteredData));
      } else {
        const filteredData = grp_message.filter((item) =>
          item.message.includes(value)
        );
        dispatch(setFilterMsg(filteredData));
      }
    } else {
      setStop(true);
      setFilterStatus(false);
      dispatch(setFilterMsg([]));
    }
  };

  const handlePdfChange = (e, fileType) => {
    setFormData({
      ...formData,
      [fileType]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = formData.message.trim();
    const image = formData.image;
    const pdf = formData.pdf;

    // Check if both message and image are empty
    if (message === "" && !image && !pdf) {
      console.log("Message, image, and PDF cannot all be empty.");
      return;
    }
    scrollToBottom();
    setTimeoutCountt(true);
    handlenot();
    const form = new FormData();
    form.append("sender_id", formData.sender_id);
    form.append("receiver_id", idss);
    form.append("grpid", grp_id);
    form.append("message", cleanMessage(formData.message));
    form.append("image", formData.image);
    form.append("pdf", formData.pdf);

    if (sel_mess) {
      form.append("rply_msg", sel_mess);
    } else {
      form.append("rply_msg", "");
    }

    try {
      const url =
        messChange == "one"
          ? `${backendUrl}/upload.php`
          : `${backendUrl}/grppupload.php`;

      const response = await fetch(url, {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        setFormData({
          ...formData,
          message: "",
          image: null,
          pdf: null,
        });
        setTimeoutCountt(true);
        dispatch(setSel_Mess(null));
        dispatch(setSel_MessId(!null));
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("An error occurred while sending the message:", error);
    }
  };

  const handleKeyDown = (e) => {
    // Extract the message and remove default ReactQuill content
    const message = formData.message.trim();
    const image = formData.image;
    const pdf = formData.pdf;

    // Function to check if the message contains only the default content
    const isMessageEmpty = (msg) => {
      // Remove all HTML tags
      const strippedMessage = msg.replace(/<[^>]*>/g, "").trim();
      // Check if the stripped message is empty or contains only the default ReactQuill content
      return strippedMessage === "";
    };

    if (e.key === "Enter") {
      e.preventDefault(); // Always prevent default behavior

      if (isMessageEmpty(message) && !image && !pdf) {
        // Do not proceed if all fields are empty or only default content is present
        console.log("Cannot submit empty message, image, and pdf.");
      } else {
        handleSubmit(e); // Only call handleSubmit if there's content
      }
    }
  };

  <Box>
    <ReactQuill
      className="input-style"
      theme="snow"
      value={formData.message}
      onChange={handleQuillChange}
      onKeyDown={handleKeyDown}
    />
  </Box>;

  const handlenot = async (e) => {
    const form = new FormData();
    console.log("receiver", form);
    form.append("receiver_id", formData.receiver_id);

    form.append("msg", formData.message);
    form.append("receiver", usernames);

    try {
      const url = `${backendUrl}/getnotification.php`;

      const response = await fetch(url, {
        method: "POST",
        body: form,
      });
    } catch (error) {
      console.error("An error occurred while sending the message:", error);
    }
  };

  const handleGet = async () => {
    const form = new FormData();
    form.append("sender_id", id);
    const url =
      messChange == "many"
        ? `${backendUrl}/getpttgrpmessage.php`
        : `${backendUrl}/getptmessage.php`;

    if (messChange == "many") {
      form.append("grp_id", grp_id);
    } else {
      form.append("receiver_id", idss);
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        const responseData = await response.json();
        const { usermessages } = responseData;

        if (messChange == "many") {
          dispatch(setgrp_message(usermessages));
        } else {
          dispatch(setUser(usermessages));
          setTimeoutCountt(false);
        }

        if (isScrollAtBottom) {
          scrollToBottom();
        }
        setTimeoutCountt(false);
      } else {
        console.error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("An error occurred while fetching messages:", error);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      handleGet();
    }, 100);

    return () => clearTimeout(timerId);
  }, [stop && user]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      handleGet();
    }, 100);

    return () => clearTimeout(timerId);
  }, [stop && grp_message]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      fetchData();
    }, 100);

    return () => clearTimeout(timerId);
  }, [user]);

  const [filteredMessagesArray, setFilteredMessagesArray] = useState([]);

  useEffect(() => {
    if (Array.isArray(messageLength)) {
      const uniqueUserMessages = messageLength.filter(
        (message, index, self) =>
          index ===
          self.findIndex(
            (m) =>
              m.sender_id === message.sender_id &&
              m.receiver_id === message.receiver_id
          )
      );

      setFilteredMessagesArray(uniqueUserMessages);
    }
  }, []);

  const formatDate = (createdAt) => {
    const dateObj = new Date(createdAt);

    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("default", { month: "long" });
    const year = dateObj.getFullYear();

    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedDate = `${day} ${month} ${year}`;
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;

    return { formattedDate, formattedTime };
  };
  return (
    <>
      <Grid
        className="singleusermessage-box"
        item
        lg={8.9}
        md={10}
        sm={11}
        xs={11}
        mx="auto"
      >
        <Box className="full-height-container">
          <Box>
            <Box className="flex-space-between">
              <Box className="flex-container">
                <Box onClick={() => dispatch(setMobileSelect("mobile"))}>
                  <IoArrowBack />
                </Box>
                <Box>
                  <Box ml={1} className="capitalize-text">
                    {username}
                  </Box>
                  {status && (
                    <Box className="sum-status">
                      <Box ml={1} className="sum-active-box">
                        Active
                      </Box>
                      <Box ml={0.6} mt={0.6} className="styled-element"></Box>
                    </Box>
                  )}

                  <Box className="custom-stylee">
                    {!status && (
                      <Box className="sum-alluser">
                        {allUser.data
                          .filter((item) => ids.includes(item.id))
                          .map((item, i) => (
                            <Box className="sum-username" key={i}>
                              <Box className="custom-text3">
                                {item.username},&nbsp;
                              </Box>
                            </Box>
                          ))}
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
              <Box className="sum-input-search">
                <Box className="sum-input-search-box" mt={1}>
                  <Box className="flex-box">
                    <Box>
                      <input
                        onChange={(e) => handleFilter(e)}
                        placeholder="Search"
                        className="custom-input5"
                        type="Search"
                      />
                    </Box>
                    <Box mr={2}>
                      <IoSearchSharp />
                    </Box>
                  </Box>
                </Box>

                <Box
                  onClick={() => dispatch(setMedia(true))}
                  className="button-style"
                >
                  <GoFileDirectoryFill />
                </Box>

                {media && <Media />}

                {/* Add the HiRefresh icon here */}
                <Box onClick={handleRefresh} className="refresh-icon">
                  <HiRefresh style={{ fontSize: "20px", color: "black" }} />
                </Box>
              </Box>
            </Box>

            {messChange == "one" ? (
              <Box
                mt={1}
                className="box-style"
                ref={containerRef}
                sx={{ height: "62.5vh", overflowY: "scroll" }}
                onScroll={(e) => {
                  const { scrollTop } = e.target;
                  if (scrollTop <= 20 && hasMoreFilterData) {
                    fetchMoreData();
                  }
                }}
              >
                <InfiniteScroll
                  dataLength={scrollVal}
                  next={fetchMoreData}
                  hasMore={hasMoreFilterData}
                  scrollableTarget={containerRef.current}
                >
                  {Array.isArray(user) &&
                    (filterstatus
                      ? filtermsg.slice(-scrollVal)
                      : user.slice(-scrollVal)
                    ).map((item, index) => {
                      const charCount = item.rply_msg
                        ? item.rply_msg.length
                        : item.message.length;

                      const getWidth = (charCount) => {
                        const baseWidth = 10;
                        const maxWidth = 90;
                        const widthPerChar = 2;
                        return Math.min(
                          baseWidth + charCount * widthPerChar,
                          maxWidth
                        );
                      };

                      const messageWidth = getWidth(charCount) + 10;
                      const defaultMediaWidth = "160px";
                      const defaultMediaHeight = "100px";

                      return (
                        <React.Fragment key={index}>
                          <Box mt={2} mb={1}>
                            {item.receiver_id != idss && (
                              <div className="small-text">
                                <img
                                  className="circle"
                                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVpX6V5vW3sw6xZd0OojjdzPVBNQxZOR8iqALSVhkCtmGXsgW9IDx6o2MFEZAsMlTx0BQ&amp;usqp=CAU"
                                  alt=""
                                />
                                <span style={{ paddingLeft: "5px" }}>
                                  {username},{" "}
                                  {formatDate(item.created_at).formattedDate},{" "}
                                  {formatDate(item.created_at).formattedTime}
                                </span>
                              </div>
                            )}
                          </Box>
                          {item.receiver_id === idss && (
                            <Box className="flex-end">
                              <Box
                                // mt={2}
                                className="sum-date-time"
                              >
                                {formatDate(item.created_at).formattedDate},
                                {formatDate(item.created_at).formattedTime}
                              </Box>
                            </Box>
                          )}
                          {item.id === sel_messId && toggle ? (
                            <Box className="sum-date-time-box">
                              <Box mt={4} mb={1} className="sum-date-time-box1">
                                <Box
                                  onClick={() => {
                                    dispatch(setSel_MessId(null));
                                    scrollToBottom();
                                  }}
                                  className="sum-date-time-box2"
                                >
                                  <Box
                                    mt={2}
                                    className="dynamic-box"
                                    style={{
                                      marginLeft:
                                        item.sender_id == id
                                          ? "250px"
                                          : "150px",
                                    }}
                                  >
                                    {/* <Box>Reply</Box> */}
                                    <Box ml={1} mt={0}>
                                      <MdOutlineReplyAll /> &nbsp;
                                    </Box>
                                  </Box>
                                </Box>

                                <Box className="sum-date-time-box2">
                                  <Box
                                    onClick={() => handleptmsgdelete(item.id)}
                                    mt={1}
                                    style={{
                                      marginLeft:
                                        item.sender_id == id
                                          ? "778px"
                                          : "150px",
                                      display: "none",
                                    }}
                                    className="dynamic-box"
                                  >
                                    Delete{" "}
                                    <span>
                                      <MdDelete />
                                    </span>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          ) : null}
                          <Box
                            className="sum-chat-box"
                            style={{
                              width:
                                item.message || item.rply_msg
                                  ? `${messageWidth}%`
                                  : defaultMediaWidth,
                              height: "auto",
                              color:
                                item.receiver_id !== idss
                                  ? "hsl(203.72deg 41.75% 20.2%)"
                                  : "black",
                              marginLeft:
                                item.receiver_id === idss ? "auto" : "2.4rem",
                              marginRight:
                                item.receiver_id !== idss ? "auto" : "1rem",
                              paddingTop: "2px",
                              marginTop: index === 0 ? "" : 10,
                              background:
                                item.receiver_id !== idss
                                  ? "hsl(206.25deg 66.67% 95.29%)"
                                  : "#eee",
                              // display: "flex",
                              // flexWrap: "wrap",
                            }}
                          >
                            <Box>
                              <Grid container>
                                <Grid item xs={12} lg={10}>
                                  <Box alignItems="center">
                                    <Box className="sum-chat-box1">
                                      {item.message && (
                                        <>
                                          <Box className="sum-chat-box2">
                                            <Box
                                              className="column-flex sum-chat-box3"
                                              style={{
                                                width: "messageWidth",
                                              }}
                                            >
                                              {item.rply_msg && (
                                                <Box
                                                  mt={2}
                                                  className="custom-style3"
                                                  style={{
                                                    background:
                                                      item.receiver_id !== idss
                                                        ? "rgb(19 156 236 / 41%)"
                                                        : "#7e7a7a",
                                                  }}
                                                >
                                                  <Box
                                                    style={{
                                                      display: "flex",
                                                      flexWrap: "wrap",
                                                    }}
                                                    className="sum-chat-box4"
                                                  >
                                                    <div
                                                      dangerouslySetInnerHTML={{
                                                        __html: item.rply_msg,
                                                      }}
                                                    />
                                                  </Box>
                                                </Box>
                                              )}
                                              <Box>
                                                <div
                                                  style={{
                                                    display: "flex",
                                                    flexWrap: "wrap",
                                                  }}
                                                  className="sum-chat-message-box"
                                                  dangerouslySetInnerHTML={{
                                                    __html: filterstatus
                                                      ? getHighlightedText(
                                                          item.message,
                                                          search
                                                        )
                                                      : item.message,
                                                  }}
                                                />

                                                {item.receiver_id ===
                                                  receiverId && (
                                                  <span>
                                                    <RiCheckDoubleLine
                                                      className="sum-chat-message-seen"
                                                      style={{
                                                        color:
                                                          item.seen === "0"
                                                            ? "grey"
                                                            : "blue",
                                                      }}
                                                    />
                                                  </span>
                                                )}
                                              </Box>
                                            </Box>
                                            <Box>
                                              <Box
                                                className="sum-chat-message-seen-box"
                                                style={{
                                                  background:
                                                    replymess == "color" &&
                                                    toggle &&
                                                    replyid == item.id
                                                      ? "#b9b9b9"
                                                      : "",
                                                }}
                                                onClick={() => {
                                                  handleToggle(
                                                    item.id,
                                                    item.message
                                                  );
                                                }}
                                              >
                                                <PiDotsThreeOutlineVerticalDuotone />
                                              </Box>
                                            </Box>
                                          </Box>
                                        </>
                                      )}

                                      {item.message.startsWith(
                                        "<p>https://"
                                      ) && (
                                        <>
                                          <Box
                                            // style={{}}
                                            ml={5}
                                            mb={1}
                                            className="box sum-chat-message-seen-box1"
                                          >
                                            <Box
                                              className="message-box"
                                              style={{
                                                "--message-width":
                                                  "messageWidth",
                                              }}
                                            >
                                              {item.rply_msg && (
                                                <Box
                                                  className="reply-box"
                                                  style={{
                                                    "--reply-background":
                                                      item.receiver_id !== idss
                                                        ? "yellow"
                                                        : "green",
                                                  }}
                                                >
                                                  <div
                                                    dangerouslySetInnerHTML={{
                                                      __html: item.rply_msg,
                                                    }}
                                                  />
                                                </Box>
                                              )}
                                              <Box>
                                                <a
                                                  target="_blank"
                                                  href={item.message}
                                                ></a>
                                                {item.receiver_id ===
                                                  receiverId && (
                                                  <span>
                                                    <RiCheckDoubleLine
                                                      style={{
                                                        color:
                                                          item.seen === "0"
                                                            ? "grey"
                                                            : "blue",
                                                      }}
                                                    />
                                                  </span>
                                                )}
                                              </Box>
                                            </Box>
                                            <Box
                                              className="pointer"
                                              onClick={() => {
                                                handleToggle(
                                                  item.id,
                                                  item.message
                                                );
                                              }}
                                            >
                                              <PiDotsThreeOutlineVerticalDuotone />
                                            </Box>
                                          </Box>
                                        </>
                                      )}

                                      {item.pdf &&
                                        item.pdf.endsWith(".sql") && (
                                          <Box
                                            className="message-box"
                                            style={{
                                              "--message-width": "messageWidth",
                                            }}
                                          >
                                            {item.rply_msg && (
                                              <Box
                                                className="reply-box"
                                                style={{
                                                  "--reply-background":
                                                    item.receiver_id !== idss
                                                      ? "yellow"
                                                      : "green",
                                                }}
                                              >
                                                <div
                                                  dangerouslySetInnerHTML={{
                                                    __html: item.rply_msg,
                                                  }}
                                                />
                                              </Box>
                                            )}
                                            <Box>
                                              <a
                                                target="_blank"
                                                href={`${backendUrl}/download.php?files=${item.files}`}
                                                download
                                              >
                                                <img
                                                  className="sum-chat-img-box"
                                                  src={sql}
                                                  alt=""
                                                />
                                                {item.pdf.split("_").pop()}
                                              </a>
                                              {item.receiver_id ===
                                                receiverId && (
                                                <span>
                                                  <RiCheckDoubleLine
                                                    style={{
                                                      color:
                                                        item.seen === "0"
                                                          ? "grey"
                                                          : "blue",
                                                    }}
                                                  />
                                                </span>
                                              )}
                                            </Box>

                                            <Box
                                              className="pointer"
                                              onClick={() => {
                                                handleToggle(item.id, item.pdf);
                                              }}
                                            >
                                              <PiDotsThreeOutlineVerticalDuotone />
                                            </Box>
                                          </Box>
                                        )}

                                      {item.pdf &&
                                        (item.pdf.endsWith(".jpg") ||
                                          item.pdf.endsWith(".jpeg") ||
                                          item.pdf.endsWith(".png") ||
                                          item.pdf.endsWith(".webp") ||
                                          item.pdf.endsWith(".PNG")) && (
                                          <Box
                                            className="message-box"
                                            style={{
                                              "--message-width": "messageWidth",
                                            }}
                                          >
                                            {item.rply_msg && (
                                              <Box
                                                className="reply-box"
                                                style={{
                                                  "--reply-background":
                                                    item.receiver_id !== idss
                                                      ? "yellow"
                                                      : "green",
                                                }}
                                              >
                                                <div
                                                  dangerouslySetInnerHTML={{
                                                    __html: item.rply_msg,
                                                  }}
                                                />
                                              </Box>
                                            )}
                                            <Box>
                                              <a
                                                target="_blank"
                                                href={`${imgUrl}/files/${item.pdf}`}
                                                download
                                              >
                                                <img
                                                  className="sum-chat-img-box"
                                                  src={`${imgUrl}/files/${item.pdf}`}
                                                  alt=""
                                                />
                                                {item.pdf.split("_").pop()}
                                              </a>
                                              {item.receiver_id ===
                                                receiverId && (
                                                <span>
                                                  <RiCheckDoubleLine
                                                    style={{
                                                      color:
                                                        item.seen === "0"
                                                          ? "grey"
                                                          : "blue",
                                                    }}
                                                  />
                                                </span>
                                              )}
                                            </Box>

                                            <Box
                                              className="pointer sum-chat-pdf-box1"
                                              onClick={() => {
                                                handleToggle(item.id, item.pdf);
                                              }}
                                            >
                                              <PiDotsThreeOutlineVerticalDuotone />
                                            </Box>
                                          </Box>
                                        )}

                                      {item.pdf &&
                                        item.pdf.endsWith(".pdf") && (
                                          <Box
                                            className="message-box"
                                            style={{
                                              "--message-width": "messageWidth",
                                            }}
                                          >
                                            {item.rply_msg && (
                                              <Box
                                                className="reply-box"
                                                style={{
                                                  "--reply-background":
                                                    item.receiver_id !== idss
                                                      ? "yellow"
                                                      : "green",
                                                }}
                                              >
                                                <div
                                                  dangerouslySetInnerHTML={{
                                                    __html: item.rply_msg,
                                                  }}
                                                />
                                              </Box>
                                            )}
                                            <Box>
                                              <a
                                                target="_blank"
                                                href={`${imgUrl}/files/${item.pdf}`}
                                                download
                                              >
                                                <img
                                                  className="sum-chat-img-box"
                                                  src={pdfLogo}
                                                  alt=""
                                                />
                                                {item.pdf.split("_").pop()}
                                              </a>
                                              {item.receiver_id ===
                                                receiverId && (
                                                <span>
                                                  <RiCheckDoubleLine
                                                    style={{
                                                      color:
                                                        item.seen === "0"
                                                          ? "grey"
                                                          : "blue",
                                                    }}
                                                  />
                                                </span>
                                              )}
                                            </Box>

                                            <Box
                                              className="pointer"
                                              onClick={() => {
                                                handleToggle(item.id, item.pdf);
                                              }}
                                            >
                                              <PiDotsThreeOutlineVerticalDuotone />
                                            </Box>
                                          </Box>
                                        )}

                                      {item.pdf &&
                                        item.pdf.endsWith(".php") && (
                                          <Box
                                            className="message-box"
                                            style={{
                                              "--message-width": "messageWidth",
                                            }}
                                          >
                                            {item.rply_msg && (
                                              <Box
                                                className="reply-box"
                                                style={{
                                                  "--reply-background":
                                                    item.receiver_id !== idss
                                                      ? "yellow"
                                                      : "green",
                                                }}
                                              >
                                                <div
                                                  dangerouslySetInnerHTML={{
                                                    __html: item.rply_msg,
                                                  }}
                                                />
                                              </Box>
                                            )}
                                            <Box>
                                              <a
                                                target="_blank"
                                                href={`${imgUrl}/files/${item.pdf}`}
                                                download
                                              >
                                                <img
                                                  className="sum-chat-img-box"
                                                  src={php}
                                                  alt=""
                                                />
                                                {item.pdf.split("_").pop()}
                                              </a>
                                              {item.receiver_id ===
                                                receiverId && (
                                                <span>
                                                  <RiCheckDoubleLine
                                                    style={{
                                                      color:
                                                        item.seen === "0"
                                                          ? "grey"
                                                          : "blue",
                                                    }}
                                                  />
                                                </span>
                                              )}
                                            </Box>

                                            <Box
                                              className="pointer"
                                              onClick={() => {
                                                handleToggle(item.id, item.pdf);
                                              }}
                                            >
                                              <PiDotsThreeOutlineVerticalDuotone />
                                            </Box>
                                          </Box>
                                        )}

                                      {/* for excel */}
                                      {item.pdf &&
                                        item.pdf.endsWith(".xlsx") && (
                                          <Box
                                            className="message-box"
                                            style={{
                                              "--message-width": "messageWidth",
                                            }}
                                          >
                                            {item.rply_msg && (
                                              <Box
                                                className="reply-box"
                                                style={{
                                                  "--reply-background":
                                                    item.receiver_id !== idss
                                                      ? "yellow"
                                                      : "green",
                                                }}
                                              >
                                                <div
                                                  dangerouslySetInnerHTML={{
                                                    __html: item.rply_msg,
                                                  }}
                                                />
                                              </Box>
                                            )}
                                            <Box>
                                              <a
                                                target="_blank"
                                                href={`${imgUrl}/files/${item.pdf}`}
                                                download
                                              >
                                                <img
                                                  className="sum-chat-img-box"
                                                  src={excel}
                                                  alt=""
                                                />
                                                {item.pdf.split("_").pop()}
                                              </a>
                                              {item.receiver_id ===
                                                receiverId && (
                                                <span>
                                                  <RiCheckDoubleLine
                                                    style={{
                                                      color:
                                                        item.seen === "0"
                                                          ? "grey"
                                                          : "blue",
                                                    }}
                                                  />
                                                </span>
                                              )}
                                            </Box>

                                            <Box
                                              className="pointer"
                                              onClick={() => {
                                                handleToggle(item.id, item.pdf);
                                              }}
                                            >
                                              <PiDotsThreeOutlineVerticalDuotone />
                                            </Box>
                                          </Box>
                                        )}
                                    </Box>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Box>

                            {item.id === selectedTripID && (
                              <Box display="flex"></Box>
                            )}
                          </Box>
                        </React.Fragment>
                      );
                    })}
                </InfiniteScroll>

                {sel_messId == null ? (
                  <Box mt={4} className="flex-containerr">
                    <Box className="reply-box">
                      <Box className="text">Reply Message Of</Box>
                      <Box pr={1} className="reply-msg">
                        <Box className="left-text">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: sel_mess.slice(0, 180),
                            }}
                          />
                        </Box>
                        <Box
                          onClick={() => {
                            dispatch(setSel_MessId(!null));
                            dispatch(setSel_Mess(null));
                            dispatch(setReplyMess("none"));
                          }}
                          style={{ fontWeight: "bold", cursor: "pointer" }}
                        >
                          <RxCross2 className="cross-design" />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ) : null}
              </Box>
            ) : (
              <Box
                mt={1}
                className="rounded-box1"
                ref={containerRef}
                sx={{
                  height: "62.5vh",
                  overflowY: "scroll",
                }}
                onScroll={(e) => {
                  const { scrollTop, clientHeight, scrollHeight } = e.target;
                  if (scrollTop <= 20 && hasMoreFilterDataa) {
                    fetchMoreDataa();
                  }
                }}
              >
                {Array.isArray(grp_message) && grp_message.length > 0 && (
                  <InfiniteScroll
                    dataLength={scrollVall}
                    next={fetchMoreDataa}
                    hasMore={hasMoreFilterDataa}
                    endMessage={<p style={{ textAlign: "center" }}></p>}
                    scrollableTarget={containerRef.current}
                  >
                    {Array.isArray(grp_message) &&
                      (filterstatus
                        ? filtermsg.slice(-scrollVal)
                        : grp_message.slice(-scrollVal)
                      ).map((item, index) => {
                        const charCount = item.rply_msg
                          ? item.rply_msg.length
                          : item.message.length;

                        const getWidth = (charCount) => {
                          const baseWidth = 10;
                          const maxWidth = 90;
                          const widthPerChar = 2;
                          return Math.min(
                            baseWidth + charCount * widthPerChar,
                            maxWidth
                          );
                        };

                        const messageWidth = getWidth(charCount) + 10;
                        const defaultMediaWidth = "160px";
                        const defaultMediaHeight = "100px";

                        return (
                          <React.Fragment key={index}>
                            <Box mt={2} mb={1}>
                              {item.sender_id != id.toString() && (
                                <div className="small-text">
                                  <img
                                    className="circle"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVpX6V5vW3sw6xZd0OojjdzPVBNQxZOR8iqALSVhkCtmGXsgW9IDx6o2MFEZAsMlTx0BQ&amp;usqp=CAU"
                                    alt=""
                                  />
                                  <span style={{ paddingLeft: "5px" }}>
                                    {username},{" "}
                                    {formatDate(item.created_at).formattedDate},{" "}
                                    {formatDate(item.created_at).formattedTime}
                                  </span>
                                </div>
                              )}
                            </Box>
                            {item.sender_id === id.toString() && (
                              <Box className="flex-end">
                                <Box className="my-text">
                                  {formatDate(item.created_at).formattedDate},
                                  {formatDate(item.created_at).formattedTime}
                                </Box>
                              </Box>
                            )}
                            {item.id === sel_messId && toggle ? (
                              <Box style={{ position: "relative" }}>
                                <Box
                                  mt={4}
                                  mb={1}
                                  className="sum-chat-reply-box"
                                >
                                  <Box
                                    onClick={() => {
                                      dispatch(setSel_MessId(null));
                                      scrollToBottom();
                                    }}
                                    className="sum-chat-reply-box1"
                                  >
                                    <Box
                                      mt={2}
                                      className="dynamic-box"
                                      style={{
                                        marginLeft:
                                          item.sender_id == id
                                            ? "778px"
                                            : "150px",
                                      }}
                                    >
                                      <Box ml={1} mt={0}>
                                        <MdOutlineReplyAll /> &nbsp;
                                      </Box>
                                    </Box>
                                  </Box>

                                  <Box className="sum-chat-reply-box">
                                    <Box
                                      onClick={() => handleptmsgdelete(item.id)}
                                      mt={1}
                                      style={{
                                        marginLeft:
                                          item.sender_id == id
                                            ? "778px"
                                            : "150px",
                                        display: "none",
                                      }}
                                      className="dynamic-box"
                                    >
                                      Delete{" "}
                                      <span>
                                        <MdDelete />
                                      </span>
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                            ) : null}
                            <Box
                              className="sum-text-chat-box"
                              style={{
                                width:
                                  item.message || item.rply_msg
                                    ? `${messageWidth}%`
                                    : defaultMediaWidth,

                                color:
                                  item.sender_id !== id.toString()
                                    ? "hsl(203.72deg 41.75% 20.2%)"
                                    : "black",
                                marginLeft:
                                  item.sender_id == id.toString()
                                    ? "auto"
                                    : "2.4rem",
                                marginRight:
                                  item.sender_id !== id.toString()
                                    ? "auto"
                                    : "1rem",

                                marginTop: index === 0 ? "" : 10,
                                background:
                                  item.sender_id !== id.toString()
                                    ? "hsl(206.25deg 66.67% 95.29%)"
                                    : "#eee",
                              }}
                            >
                              <Box>
                                <Grid container>
                                  <Grid item xs={12} lg={10}>
                                    <Box alignItems="center">
                                      <Box className="sum-text-chat-box1">
                                        {item.message && (
                                          <>
                                            <Box className="sum-text-chat-box2">
                                              <Box
                                                className="column-flex"
                                                style={{
                                                  width: "messageWidth",
                                                }}
                                              >
                                                {item.rply_msg && (
                                                  <Box
                                                    mt={2}
                                                    className="custom-style3"
                                                    style={{
                                                      background:
                                                        item.receiver_id !==
                                                        idss
                                                          ? "rgb(19 156 236 / 41%)"
                                                          : "#7e7a7a",
                                                    }}
                                                  >
                                                    <div
                                                      dangerouslySetInnerHTML={{
                                                        __html: item.rply_msg,
                                                      }}
                                                    />
                                                  </Box>
                                                )}
                                                <Box>
                                                  <div
                                                    dangerouslySetInnerHTML={{
                                                      __html: filterstatus
                                                        ? getHighlightedText(
                                                            item.message,
                                                            search
                                                          )
                                                        : item.message,
                                                    }}
                                                  />

                                                  {item.receiver_id ===
                                                    receiverId && (
                                                    <span>
                                                      <RiCheckDoubleLine
                                                        style={{
                                                          color:
                                                            item.seen === "0"
                                                              ? "grey"
                                                              : "blue",
                                                        }}
                                                      />
                                                    </span>
                                                  )}
                                                </Box>
                                              </Box>

                                              <Box
                                                style={{
                                                  cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                  handleToggle(
                                                    item.id,
                                                    item.message
                                                  );
                                                }}
                                              >
                                                <PiDotsThreeOutlineVerticalDuotone />
                                              </Box>
                                            </Box>
                                          </>
                                        )}

                                        {item.image && (
                                          <a
                                            style={{
                                              textDecoration: "none",
                                            }}
                                            href={`${imgUrl}/images/${item.image}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            <img
                                              style={{
                                                width: defaultMediaWidth,
                                                height: defaultMediaHeight,
                                                cursor: "pointer",
                                              }}
                                              src={`${imgUrl}/images/${item.image}`}
                                              alt=""
                                            />
                                          </a>
                                        )}

                                        {item.pdf && (
                                          <div style={{ textAlign: "center" }}>
                                            <a
                                              style={{
                                                textDecoration: "none",
                                              }}
                                              href={`${imgUrl}/pdf/${item.pdf}`}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              <img
                                                style={{
                                                  width: "100px",
                                                }}
                                                src={pdfLogo}
                                                alt=""
                                              />
                                              <span className="my-black-text">
                                                Download PDF <BiDownload />
                                              </span>
                                            </a>
                                          </div>
                                        )}
                                      </Box>
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Box>

                              {item.id === selectedTripID && (
                                <Box display="flex"></Box>
                              )}
                            </Box>
                          </React.Fragment>
                        );
                      })}
                  </InfiniteScroll>
                )}

                {sel_messId == null ? (
                  <Box mt={4} className="flex-containerr">
                    <Box className="reply-box">
                      <Box className="text">Reply Message Of</Box>
                      <Box pr={1} className="reply-msg">
                        <Box className="left-text">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: sel_mess.slice(0, 180),
                            }}
                          />
                        </Box>
                        <Box
                          onClick={() => {
                            dispatch(setSel_MessId(!null));
                            dispatch(setSel_Mess(null));
                          }}
                          style={{ fontWeight: "bold", cursor: "pointer" }}
                        >
                          <RxCross2 className="cross-design" />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ) : null}
              </Box>
            )}
          </Box>
        </Box>
        <Box className="rounded-box1 editors">
          <Box mt={0.8}>
            <Grid container>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Box
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Box style={{ display: "flex" }}>
                    <Box
                      ml={1}
                      className="absolute-positioned"
                      onClick={scrollToBottom}
                    >
                      {" "}
                      <Box className="custom-box3">
                        {" "}
                        <IoArrowDownOutline />
                      </Box>
                    </Box>
                    <Box mt={0.1} ml={2}>
                      <div className="dropdown">
                        <label
                          htmlFor="image"
                          className="btn btn-outline-danger"
                          style={{ cursor: "pointer" }}
                        >
                          <ImAttachment />
                        </label>
                        <input
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                          type="file"
                          className="form-control"
                          id="image"
                        />
                      </div>
                    </Box>
                  </Box>
                  <Box
                    mr={3}
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                    className="btn btn-dark custom-button2"
                  >
                    <IoIosSend />
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Box>
                  <ReactQuill
                    className="input-style"
                    theme="snow"
                    value={formData.message}
                    onChange={handleQuillChange}
                    onKeyDown={handleKeyDown}
                  />
                </Box>
              </Grid>
              <Grid item lg={1}></Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default SingleUserMessage;
