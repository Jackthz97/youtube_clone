import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import VideoPlayList from "./VideoPlayList";
import { Button } from "@mui/material";

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
  views,
  setViews,
}) {
  const [state, setState] = useState({
    direction: "row",
    alignContent: "start",
    width: 1200,
    height: 600,
    xs1: 8,
    xs2: 4
  });
  const handleClick = () => {
    state.direction === "row"
      ? setState({ direction: "column", alignContent: "end", width: 1600, height: 800, xs1: 6, xs2: 6 })
      : setState({ direction: "row", alignContent: "start", width: 1200, height: 600, xs1: 8, xs2: 4});
  };
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
          views={views}
          setViews={setViews}
        />
      </React.Fragment>
    );
  });

  return (
    <div>
      <Navbar setSearch={setSearch} open={false} setOpen={setOpen} />
      <Grid
        container
        direction={state.direction}
        alignContent={"center"}
        mt={10}
        spacing={1}
      >
        <Grid item xs={state.xs1}>
          <Grid container direction="column" justifyContent="end" alignContent="end">
            <iframe
              className="video-frame"
              src={`https://www.youtube.com/embed/${videoLink}`}
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
              title="video"
              width={state.width}
              height={state.height}
            />
              <Typography>{videoTitle}</Typography>
              <Button onClick={handleClick}>full</Button>
            {/* <Grid container direction="column" ml={9}>

            </Grid> */}
          </Grid>
        </Grid>
        <Grid item xs={state.xs2}>
          <Grid
            container
            direction={"column"}
            alignContent={state.alignContent}
          >
            {videos}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
