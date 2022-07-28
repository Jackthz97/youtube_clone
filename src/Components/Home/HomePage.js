import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Box } from "@mui/material";
import VideoList from "./VideoList";
import TimeAgo from "javascript-time-ago";
import SearchBar from "./SearchBar";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

export default function HomePage() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("trending");
  const key = "AIzaSyATJY6f0Ic4UpT_fPNyeOIpFgYOodgC0wk";
  const maxResults = 100;

  useEffect(() => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&order=relevance&q=${search}&key=${key}`
      )
      .then((res) => setData(res.data.items))
      .catch((err) => console.log("Error: ", err));
  }, [search]);
  // console.log("Youtube API Data: ", data);
  const videos = data.map((e) => {
    return (
      <React.Fragment key={e.id.videoId}>
        <VideoList
          APIkey={key}
          videoId={e.id.videoId}
          uploadTime={e.snippet.publishedAt}
          channelId={e.snippet.channelId}
          title={e.snippet.title}
          description={e.snippet.description}
          thumbnail={e.snippet.thumbnails.medium.url}
          channelTitle={e.snippet.channelTitle}
        />
      </React.Fragment>
    );
  });
  return (
    <Grid container direction={"column"} alignContent={"center"}>
      <Grid container direction={"row"} justifyContent={"center"}>
        <SearchBar search={search} setSearch={setSearch} />
      </Grid>
      <Box gridColumn="span 10">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "1fr",
          }}
        >
          {videos}
        </Box>
      </Box>
    </Grid>
  );
}
