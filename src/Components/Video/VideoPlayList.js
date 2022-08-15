import React, { useEffect, useState, useMemo } from "react";
import { Grid, Typography, Box } from "@mui/material";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import Num2Views from "../../Hooks/Num2Views";
import DurationConvert from "../../Hooks/DurationConvert";
import { Link } from "react-router-dom";
import "./Video.scss";

export default function VideoPlayList({
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
}) {
  const [channel, setChannel] = useState([]);
  const [views, setViews] = useState([]);
  const APIkey = "AIzaSyA2FjKL5XNYP8JtFhBc_au5dHbMMhuF4hQ";
  useMemo(() => {
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
    console.log(`videoId: ${videoId}, VideoLink: ${videoLink} `);
  };
  // const channleImg = channel.map((e) => {
  //   return (
  //     <React.Fragment key={videoId}>
  //       <img
  //         className="channel-img"
  //         src={e.snippet.thumbnails.default.url}
  //         alt={e.snippet.thumbnails.default.url}
  //         width={20}
  //         border-radius={"50%"}
  //       />
  //     </React.Fragment>
  //   );
  // });
  let view = 0;
  let duration = "PT0H0M0S";
  views.map((e) => {
    view = Number(e.statistics.viewCount);
    duration = e.contentDetails.duration;
  });

  title = title.replace("&amp;", "&");
  title = title.replace("&#39;", "'");
  return (
    <Box sx={{ width: "500px" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Link
            to={`/watch/${videoId}`}
            style={{
              textDecoration: "none",
            }}
            onClick={handleClick}
          >
            <img src={thumbnail} alt={title} width={"100%"} />
          </Link>
          <Grid container mb={-4.5}>
            <p className="ptl">{DurationConvert(duration)}</p>
          </Grid>
        </Grid>
        <Grid item xs={6}>
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
    </Box>
    // <Grid container direction={"row"}>
    //     <Link
    //       to={`/watch/${videoId}`}
    //       style={{
    //         textDecoration: "none",
    //       }}
    //       onClick={handleClick}
    //     >
    //       <img src={thumbnail} alt={title} width={"50%"} />
    //     </Link>
    //     {/* <Grid  mb={-4.5}>
    //     <p className="ptl">{DurationConvert(duration)}</p>
    //   </Grid> */}

    //   <Grid container justifyContent={"end"}>
    //     <Grid className="box">
    //       <Typography fontSize={13} fontWeight={"bold"}>
    //         {title.toString()}
    //       </Typography>
    //       <p className="channel-title">{channelTitle}</p>
    //       <p className="channel-time">
    //         {`${Num2Views(view)} views`}{" "}
    //         <ReactTimeAgo date={uploadTime} locale="en-US" />
    //       </p>
    //     </Grid>
    //   </Grid>
    // </Grid>
  );
}
