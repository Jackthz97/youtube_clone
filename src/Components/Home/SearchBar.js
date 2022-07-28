import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function SearchBar({ search, setSearch }) {

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="filled-basic"
        label="Filled"
        variant="filled"
        onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), setSearch(e.target.value))}
      />
    </Box>
  );
}
