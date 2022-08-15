import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Grid, Box } from "@mui/material";
import VideoList from "../Video/VideoList";
import TimeAgo from "javascript-time-ago";

import Navbar from "../Navbar/Navbar";
import "./HomePage.scss";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

export default function HomePage({
  width,
  setWidth,
  ulrtaWide,
  moniterBreakpoint,
  mobileBreakpoint,
  open,
  setOpen,
  search,
  setSearch,
  setVideoLink,
  videoLink,
  setVideoTitle,
  videoTitle,
  data,
  setData
}) {
  // const [data, setData] = useState([]);
  const key = "AIzaSyATJY6f0Ic4UpT_fPNyeOIpFgYOodgC0wk";
  const maxResults = 20;
  console.log("OPENNNNNNN: ", open);
  useEffect(() => {
    /* Inside of a "useEffect" hook add an event listener that updates
       the "width" state variable when the window size changes */
    window.addEventListener("resize", () => setWidth(window.innerWidth));

    /* passing an empty array as the dependencies of the effect will cause this
       effect to only run when the component mounts, and not each time it updates.
       We only want the listener to be added once */
  }, []);
  useMemo(() => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&order=relevance&q=${search}&type=video&videoType=any&key=${key}`
      )
      .then((res) => {
        setData(res.data.items);
      })
      .catch((err) => console.log("Error: ", err));
  }, [search]);
  console.log("Youtube API Data: ", data);

  const videos = data.map((e) => {
    return (
      <React.Fragment key={e.id.videoId}>
        <VideoList
          videoId={e.id.videoId}
          uploadTime={e.snippet.publishedAt}
          channelId={e.snippet.channelId}
          title={e.snippet.title}
          description={e.snippet.description}
          thumbnail={e.snippet.thumbnails.medium.url}
          channelTitle={e.snippet.channelTitle}
          search={search}
          setVideoLink={setVideoLink}
          videoLink={videoLink}
          videoTitle={videoTitle}
          setVideoTitle={setVideoTitle}
        />
      </React.Fragment>
    );
  });
  return (
    <Grid>
      <div className="top-nav"></div>
      <Navbar setSearch={setSearch} open={open} setOpen={setOpen} />
      <Grid container direction={"row"} justifyContent={"center"} mt={3}>
        {/* <Grid container direction={"row"} justifyContent={"center"}>
          <SearchBar search={search} setSearch={setSearch} />
        </Grid> */}
        <Grid
          className={open ? "video-box-open" : "video-box"}
          container
          display={"flex"}
          direction={"row"}
          justifyContent={open ? "center" : "start"}
        >
          {/* {width >= 1790 && width < ulrtaWide && ( */}
          <Box gridColumn="span 10">
            <Box
              sx={{
                display: "grid",
                alignContent: "space",
                gridTemplateColumns: open ? "repeat(4, 1fr)" : "repeat(5, 1fr)",
                gridAutoRows: "1fr",
              }}
            >
              {videos}
            </Box>
          </Box>
          {/* )} */}
          {/* {width < 1790 &&   (
            <Box gridColumn="span 10">
              <Box
                sx={{
                  display: "grid",
                  alignContent: "space",
                  gridTemplateColumns: open
                    ? "repeat(3, 1fr)"
                    : "repeat(4, 1fr)",
                  gridAutoRows: "1fr",
                }}
              >
                {videos}
              </Box>
            </Box>
          )} */}
        </Grid>
      </Grid>
    </Grid>
  );
}
