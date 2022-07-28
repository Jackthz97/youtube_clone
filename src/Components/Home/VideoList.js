import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import ReactTimeAgo from 'react-time-ago'


export default function VideoList({
  videoId,
  uploadTime,
  channelId,
  title,
  description,
  thumbnail,
  channelTitle,
  APIkey
}) {
  const [channel, setChannel] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${APIkey}`
      )
      .then((res) => setChannel(res.data.items))
      .catch((err) => console.log("Error: ", err));
  }, []);
  console.log("channrl data: ", channel);
  const channleImg = channel.map((e) => {
    // console.log("image: ", e.snippet.thumbnails.default.url); 2022-01-24T22:59:55Z
    return (
      <img
        src={e.snippet.thumbnails.default.url}
        alt={e.snippet.thumbnails.default.url}
      />
    );
  });
  return (
    <Grid>
      <img src={thumbnail} alt={title} />
      <Typography>{title.replace("&amp;", "&")}</Typography>
      {channleImg}
      <Typography>{channelTitle}</Typography>
      <ReactTimeAgo date={uploadTime} locale="en-US"/>
    </Grid>
  );
}
