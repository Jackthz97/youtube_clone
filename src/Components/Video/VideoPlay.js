import React from "react";
import Navbar from "../Navbar/Navbar";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import VideoPlayList from "./VideoPlayList";

export default function VideoPlay({
  open,
  setOpen,
  search,
  setSearch,
  setVideoLink,
  videoLink,
  videoTitle,
  setVideoTitle,
  data,
}) {
  const videos = data.map((e) => {
    return (
      <React.Fragment key={e.id.videoId}>
        <VideoPlayList
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
    <div>
      <Navbar setSearch={setSearch} open={false} setOpen={setOpen} />
      <Grid container direction={"column"} alignContent={"center"} mt={20}>
        <Grid item xs={6}>
          <iframe
            className="video-frame"
            src={`https://www.youtube.com/embed/${videoLink}`}
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
            title="video"
            width={650 + 650}
            height={650}
          />
          <Typography className="video-frame">{videoTitle}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid container direction={"column"} alignContent={"end"}>

          {videos}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
