import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Toggle = () => {
  const [value, setValue] = useState("");

  const handleChange = (content, delta, source, editor) => {
    setValue(content);
    console.log("value", content);
  };

  return (
    <>
      <ReactQuill theme="snow" value={value} onChange={handleChange} />
      <br />
      <div dangerouslySetInnerHTML={{ __html: value }} />
    </>
  );
};

export default Toggle;
{
  /* <Box mt={1}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Date of Birth"
                        value={formData.dob}
                        onChange={handleDateChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            autoComplete="off"
                            InputProps={{
                              style: { height: 40, padding: "0 14px" },
                            }}
                            InputLabelProps={{
                              style: { top: "-6px" },
                            }}
                            style={{ marginBottom: 16 }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Box> */
}
