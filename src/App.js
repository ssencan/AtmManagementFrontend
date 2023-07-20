import React, { Fragment, useState } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import * as colors from "@mui/material/colors";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [displayValue, setDisplayValue] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAxiosRequest = async () => {
    try {
      const response = await axios.get("https://localhost:44334/api/Atm");
      console.log(response.data);
      setDisplayValue(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = () => {
    if (inputValue === "") {
      alert("No input was entered");
    } else if (window.confirm("Are you sure you want to submit?")) {
      setDisplayValue([inputValue]);
      console.log(inputValue);
    }
  };

  return (
    <div>
      <TextField
        id="textField1"
        label="Enter Input"
        variant="filled"
        style={{ backgroundColor: colors.common.white }}
        value={inputValue}
        onChange={handleInputChange}
      />
      <IconButton
        aria-label="delete"
        style={{ backgroundColor: colors.amber[600], color: colors.teal[500] }}
        onClick={handleButtonClick}
      >
        <SendIcon />
      </IconButton>
      <Button variant="contained" color="primary" onClick={handleAxiosRequest}>
        Send Request
      </Button>
      <div>
        {displayValue.map((item, index) => (
          <Fragment key={index}>
            <p>{item.id}</p>
            <p>{item.atmName}</p>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default App;
