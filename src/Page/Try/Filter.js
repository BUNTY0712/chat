import { Box } from "@mui/system";
import React from "react";

const Self = () => {
  const ids = "1,2"; // ids in string format

  const arr = [
    {
      receiverId: "1",
      name: "suraj",
    },
    {
      receiverId: "2",
      name: "raj",
    },
  ];

  // Convert the ids string to an array
  const idsArray = ids.split(",");

  // Filter the array based on whether the receiverId is in the idsArray
  const filteredArr = arr.filter((item) => idsArray.includes(item.receiverId));

  return (
    <>
      <Box>
        {filteredArr.map((item, i) => (
          <Box key={i}>{item.name}</Box>
        ))}
      </Box>

      {/* {item.id === sel_messId && toggle ? (
            <Box style={{display: "flex"}}>

            <Box
              onClick={() => dispatch(setSel_MessId(null))}
              mt={1}
              style={{ background: "#23262f", padding: "5px 12px", color: "white", cursor: "pointer", marginLeft: "100px", borderRadius: "8px"}}
            >
              <span><MdOutlineReplyAll /> &nbsp;
              </span>
              Reply 
            </Box>
            </Box>
          ) : (
            null
          )} */}
    </>
  );
};

export default Self;
