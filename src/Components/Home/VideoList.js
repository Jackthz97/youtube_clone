import React, { useEffect, useState, useMemo } from "react";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import './Video.scss'

export default function VideoList({
  videoId,
  uploadTime,
  channelId,
  title,
  description,
  thumbnail,
  channelTitle,
  search,
}) {
  const [channel, setChannel] = useState([]);
  const APIkey = "AIzaSyA2FjKL5XNYP8JtFhBc_au5dHbMMhuF4hQ";
  useMemo(() => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${APIkey}`
      )
      .then((res) => setChannel(res.data.items))
      .catch((err) => console.log("Error: ", err));
  }, [search]);
  // console.log("channrl data: ", channel);
  const channleImg = channel.map((e) => {
    // console.log("image: ", e.snippet.thumbnails.default.url); 2022-01-24T22:59:55Z
    return (
      <React.Fragment key={videoId}>
        <img
        className="channel-img"
          src={e.snippet.thumbnails.default.url}
          alt={e.snippet.thumbnails.default.url}
          width={20}
          border-radius={'50%'}
        />
      </React.Fragment>
    );
  });
  // console.log("react time ago: ", uploadTime, title)
  title = title.replace("&amp;", "&");
  title = title.replace("&#39;", "'");
  return (
    <Grid>
      <img src={thumbnail} alt={title} />
      <Grid className="box">
        <Typography>{title.toString()}</Typography>
      <Typography>{channleImg} &nbsp; {channelTitle}</Typography>
      <ReactTimeAgo date={uploadTime} locale="en-US" />
      </Grid>
    </Grid>
  );
}
