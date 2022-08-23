import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import HomePage from "./Components/Home/HomePage";
import VideoPlay from "./Components/Video/VideoPlay";
import "./App.css";

function App() {
  const [mode, setMode] = useState("dark");
  const [videoLink, setVideoLink] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [data, setData] = useState([]);
  const [views, setViews] = useState([]);
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  const [width, setWidth] = useState(window.innerWidth);
  const [search, setSearch] = useState("trending");
  const [open, setOpen] = useState(true);
  const ulrtaWide = 3440;
  const moniterBreakpoint = 1920;
  const notePadBreakpoint = 1320;
  const mobileBreakpoint = 360;

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              width={width}
              setWidth={setWidth}
              ulrtaWide={ulrtaWide}
              moniterBreakpoint={moniterBreakpoint}
              mobileBreakpoint={mobileBreakpoint}
              open={open}
              setOpen={setOpen}
              search={search}
              setSearch={setSearch}
              setVideoLink={setVideoLink}
              videoLink={videoLink}
              videoTitle={videoTitle}
              setVideoTitle={setVideoTitle}
              data={data}
              setData={setData}
              setViews={setViews}
              views={views}
            />
          }
        />
        <Route
          path="/watch/:id"
          element={
            <VideoPlay
              open={open}
              setOpen={setOpen}
              search={search}
              setSearch={setSearch}
              setVideoLink={setVideoLink}
              videoLink={videoLink}
              videoTitle={videoTitle}
              setVideoTitle={setVideoTitle}
              data={data}
              moniterBreakpoint={moniterBreakpoint}
              setViews={setViews}
              views={views}
            />
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
