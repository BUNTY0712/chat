import React, { useEffect, useRef, useState } from "react";
import axios from "axios"; // Removed unnecessary import { all }
import { Box, Grid, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MdDelete } from "react-icons/md";
import { BsChatText } from "react-icons/bs";
import {
  setReceiverId,
  setUser,
  setallUser,
  setselecteMem,
  toggleSelecteMem,
  setgrp_receiverId,
  setgrp_message,
  setgrp_id,
  setSel_MessId,
  setSel_Mess,
  setMedia,
  setuserName,
  setStatus,
  setFilterMsg,
} from "../Reducers/UiReducer"; // Removed unnecessary imports
import "../App.css";

import { FaRegFaceSmileWink } from "react-icons/fa6";
import { IoVideocamOutline } from "react-icons/io5";
import { IoArrowDownOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

import { BiLogOutCircle } from "react-icons/bi";

import { IoIosSend } from "react-icons/io";
import { ImAttachment } from "react-icons/im";
import { IoCallOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";

import { TiTick } from "react-icons/ti";
import { PiDotsThreeOutlineVerticalDuotone } from "react-icons/pi";
import { MdMessage, MdOutlineReplyAll } from "react-icons/md";
import dragDrop from "drag-drop";
import Notify from "./Notify";
import { BsFillImageFill } from "react-icons/bs";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";

import { BiDownload } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import sound from "../Component/mp3/notify.wav";
import InfiniteScroll from "react-infinite-scroll-component";
import pdfLogo from "../image/pdfLogo.png";
import excel from "../image/excel.png";

import php from "../image/php.png";

import sql from "../image/sql.png";

import config from "../config";
import { useRequireAuth } from "../auth";
import io from "socket.io-client";
import DisplaChannel from "./smallComponent/DisplaChannel";
import { GoFileDirectoryFill } from "react-icons/go";
import { RiCheckDoubleLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import Media from "./smallComponent/Media";
import zIndex from "@mui/material/styles/zIndex";
import Logout from "./Logout";
import ChangePassword from "./ChangePassword";

const fileTypes = ["JPEG", "PNG", "GIF"];
function App() {
  const backendUrl = process.env.REACT_APP_API_URL;
  const imgUrl = process.env.REACT_APP_IMG_URL;

  const [file, setFile] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const playCalled = useRef(false);
  function play() {
    if (receiverId == id && id == receiverId) new Audio(sound).play();
  }
  function pause() {
    new Audio(sound).pause();
  }

  // Bottom to top code
  const [scrollVal, setScrollVal] = useState(10);
  const [scrollVall, setScrollVall] = useState(10);

  const [hasMoreFilterData, setHasMoreFilterData] = useState(true);
  const [hasMoreFilterDataa, setHasMoreFilterDataa] = useState(true);
  const [scroll, setScroll] = useState(true);
  const [messtoggle, setMessToggle] = useState("false");

  const [ids, setId] = useState("");

  const [replyid, setReplyId] = useState(null);

  const [selectedTripID, setSelectedTripID] = useState(null);

  const containerRef = useRef(null);
  const [isScrollAtBottom, setIsScrollAtBottom] = useState(true);

  const handlegrpDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this channel?"
    );

    if (!isConfirmed) {
      return; // Exit the function if the user cancels the delete action
    }

    const form = new FormData();
    form.append("id", id);

    try {
      const response = await fetch(
        // "http://localhost/chatting-app-php-react/adminbackend/delete.php",
        `${backendUrl}/grpdelete.php`,
        {
          method: "POST",
          body: form,
          // credentials: "include",
        }
      );

      if (response.ok) {
        console.log("response", response.data);
        alert("Delete Successfully");
        // navigate("/admin");
      } else {
        console.log("fail");
      }
    } catch (error) {
      console.error("An error occurred while logging", error);
    }
  };
  const handleptmsgdelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this channel?"
    );

    if (!isConfirmed) {
      return; // Exit the function if the user cancels the delete action
    }

    const form = new FormData();
    form.append("id", id);

    try {
      const response = await fetch(
        // "http://localhost/chatting-app-php-react/adminbackend/delete.php",
        `${backendUrl}/ptmsgdelete.php`,
        {
          method: "POST",
          body: form,
          // credentials: "include",
        }
      );

      if (response.ok) {
        console.log("response", response.data);
        alert("Delete Successfully");
        // navigate("/admin");
      } else {
        console.log("fail");
      }
    } catch (error) {
      console.error("An error occurred while logging", error);
    }
  };

  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleQuillChange = (content, delta, source, editor) => {
    setFormData({ ...formData, message: content });
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

  const [selectParticular, setSelectParticular] = useState("");
  const [selectId, setSelectId] = useState("");
  const [shadow, setShadow] = useState("");
  const [shadow2, setShadow2] = useState("");

  const [grpshadow, setgrpshadow] = useState("");
  const [grpidd, setgrpid] = useState("");

  const [channel, setChannel] = useState([]);
  const [messChange, setMessChange] = useState("one");
  const [filter, setFilter] = useState(null);

  const [timeoutCount, setTimeoutCount] = useState(false);

  const [formData, setFormData] = useState({
    sender_id: id,
    receiver_id: !messChange ? receiverId : null,
    grpid: messChange ? grp_id : null,
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
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const [UserMessage, setUserMessage] = useState({
    sender_id: id,
    receiver_id: !messChange ? receiverId : null,
    grpid: messChange ? grp_id : null,
  });

  const [UserUpdate, setUserUpdate] = useState({
    sender_id: id,
    receiver_id: id,
  });

  const [LogOut, setLogOut] = useState({
    sender_id: id,
  });

  const trimUrl = (url) => {
    if (url.startsWith("https://")) {
      return url.substring(8);
    }
    return url;
  };

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
  const trimmedUrl = trimUrl(url);

  // useEffect(() => {
  //   play();
  // }, [num]);

  const [toggle, setToggle] = useState(true);

  const handleToggle = (id, mess) => {
    setReplyId(id);
    setToggle((prevToggle) => !prevToggle);
    if (toggle) {
      // dispatch(setSel_Mess(null));

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
    // Split text on highlight term, include term itself into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts
      .map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase()
          ? `<span key=${index} style="color: red;">${part}</span>`
          : part
      )
      .join("");
  };

  const toggleUserSelection = (userId) => {
    dispatch(setselecteMem(userId));
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId]
    );
    setChannelData((prevChannelData) => ({
      ...prevChannelData,
      receiver_id: prevChannelData.receiver_id.includes(userId)
        ? prevChannelData.receiver_id.filter((id) => id !== userId)
        : [...prevChannelData.receiver_id, userId],
    }));
  };

  const [channelData, setChannelData] = useState({
    sender_id: id,
    receiver_id: [],
    message: "",
    image: null,
    pdf: null,
    grp_name: null,
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/getallusers.php`
        // 'http://localhost/chatting-app-php-react/backend/getallusers.php'
      );
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
    let imageFile = null;
    let pdfFile = null;
    let sqlFile = null;
    // Iterate through dropped files to find image, pdf, and sql files
    Array.from(files).forEach((file) => {
      console.log("File type:", file.type);
      console.log("File name:", file.name);
      pdfFile = file;
    });
    // if (imageFile) formData.append("image", imageFile);
    if (pdfFile) formData.append("pdf", pdfFile);
    // if (sqlFile) formData.append("sql", sqlFile);
    // console.log("sqlFile", sqlFile);
    // Send data to backend
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

    // Initialize drag-and-drop functionality
    const removeDrop = dragDrop(dropElement, { onDrop: dropHandler });

    // Cleanup function
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
      const filteredData = user.filter((item) => item.message.includes(value));
      dispatch(setFilterMsg(filteredData));
    } else {
      setStop(true);
      setFilterStatus(false);
      dispatch(setFilterMsg([])); // Clear filtermsg if no value
    }

    // const filteredData = user.filter((item) => item.message(value));
  };

  const handleBoxClick = (item) => {
    // scrollToBottom();
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }

    setScroll(!true);
    setgrpshadow("");
    setMessChange("one");
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
    // handleUpdate();
    navigate(`/user/${item.id}`);
  };

  const handleGrpBoxClick = (item) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    const idss = item.receiver_id;
    const idsArray = idss
      .split(",")
      .map((id) => id.trim().replace(/^"|"$/g, ""));

    setId(idsArray);
    dispatch(setStatus(false));
    dispatch(setuserName(item.grp_name));
    setShadow("");
    setgrpid(item.sender_id);
    setMessChange("many");
    setgrpshadow(item.id);
    dispatch(setgrp_id(item.id));
    dispatch(setgrp_receiverId(item.receiver_id));

    handleGrpGet(item);
    navigate(`/group/${item.id}`);
  };

  const handleInputChange = (e) => {
    const message = e.target.value;
    setFormData({ ...formData, message });
  };

  const handlePdfChange = (e, fileType) => {
    setFormData({
      ...formData,
      [fileType]: e.target.files[0],
    });
  };
  let { idss } = useParams();

  const handleGetChannel = async () => {
    try {
      const response = await axios({
        method: "get",
        // url: 'http://localhost/chatting-app-php-react/backend/getallgroup.php',
        url: `${backendUrl}/getallgroup.php`,
      });
      setChannel(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChannel = async (e) => {
    handleGetChannel();
    // dispatch(setselecteMem([]));
    const form = new FormData();
    form.append("sender_id", channelData.sender_id);
    form.append("receiver_id", channelData.receiver_id);
    form.append("message", channelData.message);
    form.append("image", channelData.image);
    form.append("grp_name", channelData.grp_name);
    form.append("pdf", channelData.pdf);
    try {
      const response = await fetch(
        // "http://localhost/sir/chating-app/backend/upload.php",
        // `${config.REACT_APP_BACKEND_URL}/upload.php`,
        // `http://localhost/chatting-app-php-react/backend/createchannel.php`,
        `${backendUrl}/createchannel.php`,

        {
          method: "POST",
          body: form,
        }
      );
      if (response.ok) {
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

  const handleClick = async () => {
    handleChannel();
    handleGetChannel();
  };

  const handleClear = () => {
    setFormData({ ...formData, message: "" });
  };

  useEffect(() => {
    handleGetChannel();
  }, []);

  // new
  const handleSubmit = async (e) => {
    if (formData.message == "" && formData.image == "") {
      return;
    }
    e.preventDefault();
    scrollToBottom();
    setTimeoutCountt(true);
    handlenot();
    const form = new FormData();
    form.append("sender_id", formData.sender_id);
    form.append("receiver_id", formData.receiver_id);
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

  // old
  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter") {
  //     handleSubmit(e);
  //     scrollToBottom();
  //   }
  // };

  // new
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
      scrollToBottom();
    }
  };

  const handlenot = async (e) => {
    const form = new FormData();
    console.log("receiver", form);
    form.append("receiver_id", formData.receiver_id);

    form.append("msg", formData.message);
    // form.append("receiver", formData.message);
    form.append("receiver", usernames);

    try {
      const url =
        // "http://localhost/chatting-app-php-react/backend/getnotification.php";
        `${backendUrl}/getnotification.php`;

      const response = await fetch(url, {
        method: "POST",
        body: form,
      });
    } catch (error) {
      console.error("An error occurred while sending the message:", error);
    }
  };

  const handleReadUpdate = async (item) => {
    const form = new FormData();
    form.append("sender_id", id);
    form.append("receiver_id", item.id);
    setTimeoutCountt(true);
    // console.log("formnoti", formNoti);
    try {
      const response = await fetch(
        // "http://localhost/sir/chating-app/backend/notification.php",
        `${backendUrl}/update_is_read.php`,
        {
          method: "POST",
          body: form,
        }
      );
    } catch (error) {
      console.error("An error occurred while sending the message:", error);
    }
  };

  const handleUpdate = async (e) => {
    setUserUpdate({
      sender_id: id,
    });
    const form = new FormData();
    form.append("sender_id", UserUpdate.sender_id);
    // form.append("sender_id", UserUpdate.sender_id);

    // form.append("is_read", formData.is_read);
    // console.log("form", formData);
    try {
      const response = await fetch(
        // "http://localhost/sir/chating-app/backend/notification.php",
        `${config.REACT_APP_BACKEND_URL}/notification.php`,
        {
          method: "POST",
          body: form,
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        const { data } = responseData;

        if (data) {
          dispatch(setallUser(data));
        }
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("An error occurred while sending the message:", error);
    }
  };

  const handleGet = async () => {
    const form = new FormData();
    form.append("sender_id", UserMessage.sender_id);

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
          // console.log("usermessages", usermessages);
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

  const handleGrpGet = async () => {
    setMessChange("many");
    const form = new FormData();
    form.append("sender_id", id);
    console.log("grp_id", grp_id);
    form.append("grp_id", grp_id);
    // }

    try {
      const response = await fetch(
        // "http://localhost/sir/chating-app/backend/getptmessage.php",
        // `${config.REACT_APP_BACKEND_URL}/getptmessage.php`,
        // `http://localhost/chatting-app-php-react/backend/getpttgrpmessage.php`,
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

  // useEffect(() => {
  //   if (UserMessage.receiver_id !== null) {
  //     handleGet();
  //     // handleGrpGet();
  //   }
  // }, [UserMessage.receiver_id]);

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

  useEffect(() => {
    const timerId = setTimeout(() => {
      handleGetChannel();
    }, 1000);

    return () => clearTimeout(timerId);
  }, [channel]);

  const handleLogout = async () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");

    const form = new FormData();
    form.append("sender_id", LogOut.sender_id);

    // console.log("form", formData);
    try {
      const response = await fetch(
        // "http://localhost/sir/chating-app/backend/upload.php",
        // `${config.REACT_APP_BACKEND_URL}/logout.php`,
        `${backendUrl}/logout.php`,
        {
          method: "POST",
          body: form,
        }
      );
    } catch (error) {
      console.error("An error occurred while sending the message:", error);
    }
  };

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

      // Update the state using setFilteredMessagesArray
      setFilteredMessagesArray(uniqueUserMessages);
    }
  }, []);

  const formatDate = (createdAt) => {
    const dateObj = new Date(createdAt);

    // Format date
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("default", { month: "long" });
    const year = dateObj.getFullYear();

    // Format time
    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    // Format strings with leading zeros if necessary
    const formattedDate = `${day} ${month} ${year}`;
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;

    return { formattedDate, formattedTime };
  };
  return (
    <>
      <Notify />
      <Grid className="my-white-background-and-text" container>
        <Logout />

        <Grid
          style={{
            background: "hsl(206.25deg 66.67% 95.29%)",
            height: "auto",
            color: "black",
            // backgroundSize: "100%",
          }}
          item
          lg={2.5}
          mx="auto"
        >
          <Box className="padded-colored-background">
            <img
              style={{ width: "100%" }}
              src="https://atypicalsoftware.com/images/logo.png"
              alt=""
            />
          </Box>

          <Box
            // className="background-height-color"
            style={{
              background: "hsl(206.25deg 66.67% 95.29%)",
              height: "auto",
              color: "black",
              backgroundSize: "100%",
            }}
          >
            {togglesetting ? <ChangePassword /> : null}
            {Array.isArray(allUser.data) &&
              allUser.data.map((item, i) => (
                <>
                  {item.id !== id.toString() && (
                    <Box
                      className="my-class"
                      key={i}
                      onClick={() => {
                        // scrollToBottom();
                        handleBoxClick(item);

                        // handleReadUpdate(item);
                        setShadow(item.id);
                        setUserMessage((prevUserMessage) => ({
                          ...prevUserMessage,
                          receiver_id: item.id,
                        }));
                      }}
                      style={{
                        borderLeft:
                          shadow === item.id ? "4px solid #139cec" : "",
                        color: shadow === item.id ? "#139cec" : "",
                        background:
                          shadow === item.id
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
                              <Box
                                ml={1}
                                mt={1}
                                // ml={1}
                                className="custom-style"
                              >
                                {/* online */}
                              </Box>
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
                          onChange={(e) =>
                            setChannelData({
                              ...channelData,
                              grp_name: e.target.value,
                            })
                          }
                          value={channelData.grp_name}
                          className="form-control"
                          type="text"
                        />
                      </Box>
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
                                  {selectedUsers.includes(item.id) ? (
                                    <Box>
                                      <TiTick />
                                    </Box>
                                  ) : (
                                    <Box className="center-flex">
                                      <Box style={{ marginTop: "1px" }}>
                                        Add
                                      </Box>
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
                        onClick={handleClick}
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
                <span style={{ borderBottom: "2px solid grey" }}>
                  {" "}
                  Channels{" "}
                </span>{" "}
              </Box>
            </Box>
            <Box className="custom-stylee">
              {/* <Box></Box> */}
              {Array.isArray(channel) &&
                channel
                  .filter((item) => {
                    // Remove the surrounding quotes and then split the string
                    const receiverIds = item.receiver_id
                      .replace(/"/g, "")
                      .split(",");
                    return (
                      receiverIds.includes(String(id)) || item.sender_id == id
                    );
                  })
                  .map((item, i) => (
                    <Box
                      key={i}
                      onClick={async () => {
                        await handleGrpBoxClick(item);
                        // handleSetID(item)
                      }}
                      className="my-styled-component"
                      style={{
                        background:
                          grpshadow === item.id
                            ? "linear-gradient(to right, white, #7ccfff)"
                            : "  hsl(206.25deg 66.67% 95.29%)",
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

                            {/* <h5>{item.sender_id}</h5> */}
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
            {/* {togglesetting ? <ChangePassword /> : null} */}
          </Box>
        </Grid>
        {/* {messtoggle == "true" ? ( */}
        <Grid style={{ height: "auto" }} item lg={8.9} mx="auto">
          {/* {messtoggle ? ( */}
          <Paper className="full-height-container">
            <Box>
              <Box className="flex-space-between">
                <Box className="flex-container">
                  <Box>
                    <Box ml={1} className="capitalize-text">
                      {username}
                    </Box>
                    {status && (
                      <Box style={{ display: "flex" }}>
                        <Box
                          ml={1}
                          style={{ fontWeight: "400", fontSize: "12px" }}
                        >
                          Active
                        </Box>{" "}
                        <Box ml={0.6} mt={0.6} className="styled-element"></Box>
                      </Box>
                    )}

                    <Box className="custom-stylee">
                      {/* <Box></Box> */}

                      {!status && (
                        <Box style={{ display: "flex" }}>
                          {allUser.data
                            .filter((item) => ids.includes(item.id))
                            .map((item, i) => (
                              <Box style={{ display: "flex" }}>
                                <Box className="custom-text3" key={i}>
                                  {item.username},&nbsp;
                                </Box>
                              </Box>
                            ))}
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
                <Box style={{ display: "flex" }}>
                  <Box style={{ color: "grey" }} mt={1} mr={5}>
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
                    mr={2}
                    className="button-style"
                  >
                    <GoFileDirectoryFill />
                  </Box>

                  {media && <Media />}

                  <Box mr={2} className="styled-box">
                    <IoVideocamOutline />
                  </Box>
                </Box>
              </Box>
              {/* <hr /> */}

              {/* Bottom to top code */}
              {messChange == "one" ? (
                <Box
                  mt={1}
                  className="box-style"
                  ref={containerRef}
                  sx={{ height: "71vh", overflowY: "scroll" }}
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
                          const baseWidth = 60; // Base width for very short messages
                          const maxWidth = 600; // Maximum width for very long messages
                          const widthPerChar = 7; // Width increment per character
                          return Math.min(
                            baseWidth + charCount * widthPerChar,
                            maxWidth
                          );
                        };

                        const messageWidth = getWidth(charCount) + 10;
                        const defaultMediaWidth = "160px"; // Default width for images and PDFs
                        // const defaultMediaHeight = "auto"; // Default height for images and PDFs
                        const defaultMediaHeight = "100px"; // Default height for images and PDFs

                        return (
                          <React.Fragment key={index}>
                            <Box mt={2} mb={1}>
                              {item.receiver_id != selectId && (
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
                                  {/* <p>{item.message}</p> */}
                                </div>
                              )}
                            </Box>
                            {item.receiver_id === selectId && (
                              <Box className="flex-end">
                                <Box
                                  // mt={2}
                                  style={{
                                    // float: "right",
                                    // border: "1px solid red",
                                    fontSize: "12px",
                                    color: "#999999",
                                  }}
                                >
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
                                  style={{
                                    position: "absolute",
                                    zIndex: 99,
                                    display: "block",
                                  }}
                                >
                                  <Box
                                    onClick={() => {
                                      dispatch(setSel_MessId(null));
                                      scrollToBottom();
                                    }}
                                    style={{ display: "flex" }}
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
                                      <Box
                                        // mt={1}
                                        style={{}}
                                      >
                                        Reply
                                      </Box>
                                      <Box ml={1} mt={0}>
                                        <MdOutlineReplyAll /> &nbsp;
                                      </Box>
                                    </Box>
                                  </Box>

                                  <Box style={{ display: "flex" }}>
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
                              style={{
                                boxShadow: "3px 3px 16px -4px rgb(0 0 0 / 30%)",
                                width:
                                  item.message || item.rply_msg
                                    ? `${messageWidth}px`
                                    : defaultMediaWidth,
                                height: "auto",
                                color:
                                  item.receiver_id !== selectId
                                    ? "hsl(203.72deg 41.75% 20.2%)"
                                    : "black",
                                marginLeft:
                                  item.receiver_id === selectId.toString()
                                    ? "auto"
                                    : "2.4rem",
                                marginRight:
                                  item.receiver_id !== selectId.toString()
                                    ? "auto"
                                    : "1rem",
                                // paddingBottom: "-30px",
                                // paddingLeft: "20px",
                                paddingTop: "2px",
                                // paddingBottom: "2px",
                                borderRadius: "8px",
                                marginTop: index === 0 ? "" : 10,
                                background:
                                  item.receiver_id !== selectId
                                    ? "hsl(206.25deg 66.67% 95.29%)"
                                    : "#eee",
                                whiteSpace: "pre-wrap",
                                overflow: "hidden",
                                wordWrap: "break-word", // Add this line to handle long words
                              }}
                            >
                              <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                // mt={2}
                              >
                                <Grid container>
                                  <Grid item xs={12} lg={10}>
                                    <Box alignItems="center">
                                      <Box
                                        style={{
                                          textOverflow: "ellipsis",
                                        }}
                                      >
                                        {item.message && (
                                          <>
                                            <Box
                                              style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                              }}
                                            >
                                              <Box
                                                className="column-flex"
                                                style={{
                                                  width: "messageWidth",
                                                  height: "auto",
                                                }}
                                              >
                                                {item.rply_msg && (
                                                  <Box
                                                    mt={2}
                                                    className="custom-style3"
                                                    style={{
                                                      background:
                                                        item.receiver_id !==
                                                        selectId
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
                                                    style={{ height: "auto" }}
                                                    dangerouslySetInnerHTML={{
                                                      __html: filterstatus
                                                        ? getHighlightedText(
                                                            item.message,
                                                            search
                                                          )
                                                        : item.message,
                                                    }}
                                                  />

                                                  {/* <div
                                                    dangerouslySetInnerHTML={{
                                                      __html: item.message,
                                                    }}
                                                  /> */}
                                                  {item.receiver_id ===
                                                    receiverId && (
                                                    <span>
                                                      <RiCheckDoubleLine
                                                        style={{
                                                          color:
                                                            item.seen === "0"
                                                              ? "grey"
                                                              : "blue",
                                                          marginTop: "-30px",
                                                        }}
                                                      />
                                                    </span>
                                                  )}
                                                </Box>
                                              </Box>
                                              <Box>
                                                <Box
                                                  style={{
                                                    cursor: "pointer",
                                                    // background: toggle
                                                    //   ? "#bbbbb"
                                                    //   : "red",
                                                    background:
                                                      toggle &&
                                                      replyid == item.id
                                                        ? "#b9b9b9"
                                                        : "",
                                                    padding: "2px 5px",
                                                    borderRadius: "13px",
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
                                              style={{
                                                background: "white",
                                                padding: "20px",
                                                borderRadius: "5px",
                                              }}
                                              className="box"
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
                                                        item.receiver_id !==
                                                        selectId
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
                                                  >
                                                    {/* {item.message} */}
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
                                                "--message-width":
                                                  "messageWidth",
                                              }}
                                            >
                                              {item.rply_msg && (
                                                <Box
                                                  className="reply-box"
                                                  style={{
                                                    "--reply-background":
                                                      item.receiver_id !==
                                                      selectId
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
                                                    style={{
                                                      width: "100px",
                                                      // width: defaultMediaWidth,
                                                      // height: defaultMediaHeight,
                                                      // marginRight: "-20px"
                                                    }}
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
                                                  handleToggle(
                                                    item.id,
                                                    item.pdf
                                                  );
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
                                                "--message-width":
                                                  "messageWidth",
                                              }}
                                            >
                                              {item.rply_msg && (
                                                <Box
                                                  className="reply-box"
                                                  style={{
                                                    "--reply-background":
                                                      item.receiver_id !==
                                                      selectId
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
                                                  // href={`${backendUrl}/download.php?file=${item.files}`}
                                                  href={`${imgUrl}/files/${item.pdf}`}
                                                  download
                                                >
                                                  <img
                                                    style={{
                                                      width: "100px",
                                                      // width: defaultMediaWidth,
                                                      // height: defaultMediaHeight,
                                                      // marginRight: "-20px"
                                                    }}
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
                                                style={{ cursor: "pointer" }}
                                                className="pointer"
                                                onClick={() => {
                                                  handleToggle(
                                                    item.id,
                                                    item.pdf
                                                  );
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
                                                "--message-width":
                                                  "messageWidth",
                                              }}
                                            >
                                              {item.rply_msg && (
                                                <Box
                                                  className="reply-box"
                                                  style={{
                                                    "--reply-background":
                                                      item.receiver_id !==
                                                      selectId
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
                                                  // href={`${backendUrl}/download.php?file=${item.files}`}
                                                  href={`${imgUrl}/files/${item.pdf}`}
                                                  download
                                                >
                                                  <img
                                                    style={{
                                                      width: "100px",
                                                      // width: defaultMediaWidth,
                                                      // height: defaultMediaHeight,
                                                      // marginRight: "-20px"
                                                    }}
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
                                                  handleToggle(
                                                    item.id,
                                                    item.pdf
                                                  );
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
                                                "--message-width":
                                                  "messageWidth",
                                              }}
                                            >
                                              {item.rply_msg && (
                                                <Box
                                                  className="reply-box"
                                                  style={{
                                                    "--reply-background":
                                                      item.receiver_id !==
                                                      selectId
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
                                                  // href={`${backendUrl}/download.php?file=${item.files}`}
                                                  href={`${imgUrl}/files/${item.pdf}`}
                                                  download
                                                >
                                                  <img
                                                    style={{
                                                      width: "100px",
                                                      // width: defaultMediaWidth,
                                                      // height: defaultMediaHeight,
                                                      // marginRight: "-20px"
                                                    }}
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
                                                  handleToggle(
                                                    item.id,
                                                    item.pdf
                                                  );
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
                                                "--message-width":
                                                  "messageWidth",
                                              }}
                                            >
                                              {item.rply_msg && (
                                                <Box
                                                  className="reply-box"
                                                  style={{
                                                    "--reply-background":
                                                      item.receiver_id !==
                                                      selectId
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
                                                  // href={`${backendUrl}/download.php?file=${item.files}`}
                                                  href={`${imgUrl}/files/${item.pdf}`}
                                                  download
                                                >
                                                  <img
                                                    style={{
                                                      width: "100px",
                                                      // width: defaultMediaWidth,
                                                      // height: defaultMediaHeight,
                                                      // marginRight: "-20px"
                                                    }}
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
                                                  handleToggle(
                                                    item.id,
                                                    item.pdf
                                                  );
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
                            {/* {sel_mess} */}
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
              ) : (
                <Box
                  mt={1}
                  className="rounded-box1"
                  ref={containerRef}
                  sx={{
                    height: "71vh",
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
                      // loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
                      endMessage={
                        <p style={{ textAlign: "center" }}>
                          {/* <b>No New Message</b> */}
                        </p>
                      }
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
                            const baseWidth = 60; // Base width for very short messages
                            const maxWidth = 600; // Maximum width for very long messages
                            const widthPerChar = 7; // Width increment per character
                            return Math.min(
                              baseWidth + charCount * widthPerChar,
                              maxWidth
                            );
                          };

                          const messageWidth = getWidth(charCount) + 10;
                          const defaultMediaWidth = "160px"; // Default width for images and PDFs
                          // const defaultMediaHeight = "auto"; // Default height for images and PDFs
                          const defaultMediaHeight = "100px"; // Default height for images and PDFs

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
                                      {
                                        formatDate(item.created_at)
                                          .formattedDate
                                      }
                                      ,{" "}
                                      {
                                        formatDate(item.created_at)
                                          .formattedTime
                                      }
                                    </span>
                                    {/* <p>{item.message}</p> */}
                                  </div>
                                )}
                              </Box>
                              {item.sender_id === id.toString() && (
                                <Box className="flex-end">
                                  <Box
                                    // mt={2}
                                    className="my-text"
                                  >
                                    {formatDate(item.created_at).formattedDate},
                                    {formatDate(item.created_at).formattedTime}
                                  </Box>
                                </Box>
                              )}
                              {item.id === sel_messId && toggle ? (
                                <Box style={{ display: "flex" }}>
                                  <Box
                                    style={{
                                      marginLeft:
                                        item.sender_id == id
                                          ? "778px"
                                          : "150px",
                                    }}
                                    mt={2}
                                    className="custom-box"
                                  >
                                    <Box
                                      onClick={() => {
                                        dispatch(setSel_MessId(null));
                                        scrollToBottom();
                                      }}
                                      // mt={1}
                                      style={{}}
                                    >
                                      Reply
                                    </Box>
                                    <Box ml={1} mt={0}>
                                      <MdOutlineReplyAll /> &nbsp;
                                    </Box>
                                  </Box>
                                </Box>
                              ) : null}
                              <Box
                                style={{
                                  boxShadow:
                                    "3px 3px 16px -4px rgb(0 0 0 / 30%)",
                                  width:
                                    item.message || item.rply_msg
                                      ? `${messageWidth}px`
                                      : defaultMediaWidth,
                                  height: "auto",
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

                                  // paddingLeft: "20px",
                                  paddingBottom: "2px",
                                  borderRadius: "8px",
                                  marginTop: index === 0 ? "" : 10,
                                  background:
                                    item.sender_id !== id.toString()
                                      ? "hsl(206.25deg 66.67% 95.29%)"
                                      : "#eee",
                                  whiteSpace: "pre-wrap",
                                  overflow: "hidden",
                                  wordWrap: "break-word", // Add this line to handle long words
                                }}
                              >
                                <Box
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems="center"
                                  // mt={2}
                                >
                                  <Grid container>
                                    <Grid item xs={12} lg={10}>
                                      <Box alignItems="center">
                                        <Box
                                          style={{
                                            textOverflow: "ellipsis",
                                          }}
                                        >
                                          {item.message && (
                                            <>
                                              <Box
                                                style={{
                                                  display: "flex",
                                                  justifyContent:
                                                    "space-between",
                                                }}
                                              >
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
                                                          selectId
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

                                                    {/* <div
                                                    dangerouslySetInnerHTML={{
                                                      __html: item.message,
                                                    }}
                                                  /> */}
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
                                                    dispatch(
                                                      setSel_MessId(item.id)
                                                    );
                                                    dispatch(
                                                      setSel_Mess(item.message)
                                                    );
                                                    handleToggle();
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
                                              // href={`http://localhost/chatting-app-php-react/images/${item.image}`}
                                              // href={`${backendUrl}/images/${item.image}`}
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
                                                // src={`http://localhost/chatting-app-php-react/images/${item.image}`}
                                                // href={`${backendUrl}/images/${item.image}`}
                                                src={`${imgUrl}/images/${item.image}`}
                                                alt=""
                                              />
                                            </a>
                                          )}

                                          {item.pdf && (
                                            <div
                                              style={{ textAlign: "center" }}
                                            >
                                              <a
                                                style={{
                                                  textDecoration: "none",
                                                }}
                                                // href={`http://localhost/chatting-app-php-react/pdf/${item.pdf}`}
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
                  {/* <Box className="absolute-box" onClick={scrollToBottom}>
                    {" "}
                    <Box className="custom-button">
                      {" "}
                      <IoArrowDownOutline />
                    </Box>
                  </Box> */}
                  {sel_messId == null ? (
                    <Box mt={4} className="flex-containerr">
                      <Box className="reply-box">
                        <Box className="text">Reply Message Of</Box>
                        <Box pr={1} className="reply-msg">
                          <Box className="left-text">
                            {/* <div
                              dangerouslySetInnerHTML={{
                                __html: sel_mess.slice(0, 180),
                              }}
                            /> */}
                            {sel_mess}
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

            {/* <hr /> */}

            <Box mt={0.8} className="flex-start">
              <Box style={{ display: "flex" }}>
                <Box>
                  {/* <Box mr={2} className="custom-box2">
                    <FaRegFaceSmileWink />
                  </Box> */}
                  <Box
                    mt={0.5}
                    className="absolute-positioned"
                    onClick={scrollToBottom}
                  >
                    {" "}
                    <Box className="custom-box3">
                      {" "}
                      <IoArrowDownOutline />
                    </Box>
                  </Box>
                </Box>

                {/* <form onSubmit={handleSubmit}> */}
                <Box>
                  <ReactQuill
                    className="input-style"
                    theme="snow"
                    value={formData.message}
                    onChange={handleQuillChange}
                    onKeyDown={handleKeyDown}
                  />
                </Box>
              </Box>
              {/* send  */}

              <Box style={{ display: "flex" }}>
                <Box>
                  <Box
                    ml={3}
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                    className="btn btn-dark custom-button2"
                  >
                    <IoIosSend />
                    {/* Send */}
                  </Box>
                </Box>
                {/* </form> */}
                {/* attachment  */}
                <Box mt={0.1} ml={2}>
                  <div>
                    <div className="dropdown">
                      <button
                        className="btn btn-outline-danger dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <ImAttachment />
                        {/* Upload files */}
                      </button>
                      <ul
                        style={{
                          padding: "10px",
                          background: "#FFC0CB",
                        }}
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li
                          style={{
                            boxShadow: "0 0 5px",
                            background: "whitey",
                          }}
                        >
                          <label htmlFor="image">
                            <div className="centered-text">
                              <h6>
                                {" "}
                                Image <BsFillImageFill />
                              </h6>
                            </div>

                            <input
                              style={{ display: "none" }}
                              onChange={handleFileChange}
                              // value={formData.image}
                              type="file"
                              className="form-control"
                              id="image"
                            />
                          </label>
                        </li>
                        <li
                          style={{
                            boxShadow: "0 0 5px",
                            background: "white",
                          }}
                        >
                          <label htmlFor="pdf">
                            <div className="centered-text2">
                              <h6>
                                Pdf <BsFillFileEarmarkPdfFill />y
                              </h6>
                            </div>
                            <input
                              style={{ display: "none" }}
                              onChange={(e) => handlePdfChange(e, "pdf")}
                              type="file"
                              className="form-control"
                              id="pdf"
                            />
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
        {/* ) : ( */}
        {/* <Grid style={{ height: "auto" }} item lg={8.9} mx="auto">
            {" "}
            <Box style={{ height: "95vh" }}>
              <Box
                style={{
                  color: "#139cec",

                  display: "flex",
                  justifyContent: "center",
                  alginItems: "center",
                  marginTop: "150px",
                  cursor: "pointer",
                }}
              >
                <Box>
                  <Box style={{}}>
                    <h1>Welcome to the chat section</h1>
                  </Box>
                  <Box style={{ textAlign: "center" }}>
                    {" "}
                    <h1>Click To Open !!!</h1>{" "}
                  </Box>
                  <Box style={{ textAlign: "center" }}>
                    <BsChatText style={{ fontSize: "55px" }} />
                  </Box>
                </Box>
              </Box>
              <Box
                style={{
                  color: "black",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {allUser.data.map(
                  (item, i) =>
                    item.id !== id.toString() && (
                      <Box
                        key={item.id} // Use item.id as the key for better uniqueness
                        onClick={() => {
                          // scrollToBottom();
                          handleBoxClick(item);
                          setMessToggle("true");
                          // handleReadUpdate(item);
                          setShadow(item.id);
                          setUserMessage((prevUserMessage) => ({
                            ...prevUserMessage,
                            receiver_id: item.id,
                          }));
                        }}
                        ml={1}
                        mt={2}
                        style={{
                          padding: "5px 20px",
                          border: "1px solid #139cec",
                          textTransform: "capitalize",
                          cursor: "pointer",
                        }}
                      >
                        {item.username}
                      </Box>
                    )
                )}
              </Box>{" "}
            </Box>
          </Grid> */}
        {/* )} */}
      </Grid>
    </>
  );
}

export default App;
