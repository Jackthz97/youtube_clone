import React, { useEffect, useState, useMemo } from "react";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import Num2Views from "../../Hooks/Num2Views";
import DurationConvert from "../../Hooks/DurationConvert";
import { Link } from "react-router-dom";
import "./Video.scss";

export default function VideoList({
  videoId,
  uploadTime,
  channelId,
  title,
  description,
  thumbnail,
  channelTitle,
  search,
  setVideoLink,
  videoLink,
  setVideoTitle,
  videoTitle,
  // setChannel,
  // channel,
  setViews,
  views,
}) {
  const [channel, setChannel] = useState([]);
  // const [views, setViews] = useState([]);
  const APIkey = "AIzaSyA2FjKL5XNYP8JtFhBc_au5dHbMMhuF4hQ";
  useMemo(() => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${APIkey}`
      )
      .then((res) => setChannel(res.data.items))
      .catch((err) => console.log("Error: ", err));
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails%2Cstatistics&id=${videoId}&key=${APIkey}`
      )
      .then((res) => setViews(res.data.items))
      .catch((err) => console.log("Error: ", err));
  }, [channelId, videoId]);
  const handleClick = () => {
    setVideoLink(videoId);
    setVideoTitle(title);
    console.log(`videoId: ${videoId}, VideoLink: ${videoLink} `)
  };
  const channleImg = channel.map((e) => {
    return (
      <React.Fragment key={videoId}>
        <img
          className="channel-img"
          src={e.snippet.thumbnails.default.url}
          alt={e.snippet.thumbnails.default.url}
          width={20}
          border-radius={"50%"}
        />
      </React.Fragment>
    );
  });
  let view = 0;
  let duration = "PT0H0M0S";
  views.map((e) => {
    view = Number(e.statistics.viewCount);
    duration = e.contentDetails.duration;
  });

  title = title.replace("&amp;", "&");
  title = title.replace("&#39;", "'");
  return (
    <Grid mr={2}>
      <Link
        to={`/watch/${videoId}`}
        style={{
          textDecoration: "none",
        }}
        onClick={handleClick}
      >
        <img src={thumbnail} alt={title} width={"100%"} />
      </Link>
      <Grid container direction={"row"} justifyContent={"end"} mb={-4.5}>
        <p className="pt">{DurationConvert(duration)}</p>
      </Grid>
      <Grid container>
        <Grid item xs={2}>
          {channleImg}
        </Grid>
        <Grid item xs={10}>
          <Grid className="box">
            <Typography fontSize={13} fontWeight={"bold"}>
              {title.toString()}
            </Typography>
            <p className="channel-title">{channelTitle}</p>
            <p className="channel-time">
              {`${Num2Views(view)} views`}{" "}
              <ReactTimeAgo date={uploadTime} locale="en-US" />
            </p>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
