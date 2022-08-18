import React, { useState, useMemo } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { Grid, Box } from "@mui/material";
import { Typography } from "@mui/material";
import VideoPlayList from "./VideoPlayList";
import { Button } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import NavTest from "../Navbar/NavTest";

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
    width: 1245,
    height: 700,
    xs1: 8,
    xs2: 4,
  });
  let w = window.innerWidth;
  let h = window.innerHeight * 0.8;
  const handleClick = () => {
    state.direction === "row"
      ? setState({
          direction: "column",
          alignContent: "end",
          width: w,
          height: h,
          xs1: 6,
          xs2: 6,
        })
      : setState({
          direction: "row",
          alignContent: "start",
          width: 1245,
          height: 700,
          xs1: 8.5,
          xs2: 3.5,
        });
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
      <Grid container>
        <NavTest setSearch={setSearch} open={false} setOpen={setOpen} />
      </Grid>
      <Grid container justifyContent={"center"}>


      <Grid containter>
        <Box gridColumn="span 10" style={{maxWidth: "1920px"}} >
        <Box
              sx={{
                display: "grid",
                alignContent: "space",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridAutoRows: "1fr",
              }}
            >
              
          <Grid item ml={10} mt={10}>
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
            <Typography>
              {videoTitle}{" "}
              <Button onClick={handleClick}>
                {state.direction === "column" ? (
                  <FullscreenIcon />
                ) : (
                  <FullscreenExitIcon />
                )}
              </Button>
            </Typography>
          </Grid>
          <Grid item ml={3} mt={10}> {videos}</Grid>
            </Box>
            {/* <Box
              sx={{
                display: "grid",
                alignContent: "space",
                gridTemplateColumns: "repeat(1, 1fr)",
                gridAutoRows: "1fr",
              }}
            >
              

          <Grid container ml={3} mt={10} direction={"column"} alignContent={"end"}> {videos}</Grid>
            </Box> */}
        </Box>
      </Grid>
      </Grid>
      {/* <Grid container justifyContent={"center"} mt={10}>
        <Grid
          container
          direction={state.direction}
          alignContent={"center"}
          spacing={3}
          style={{ maxWidth: "1920px" }}
        >
          <Grid item xs={state.xs1}>
            <Grid
              container
              direction="column"
              justifyContent="end"
              alignContent="end"
            >
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
              <Typography>
                {videoTitle}{" "}
                <Button onClick={handleClick}>
                  {state.direction === "column" ? (
                    <FullscreenIcon />
                  ) : (
                    <FullscreenExitIcon />
                  )}
                </Button>
              </Typography>
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
      </Grid> */}
    </div>
  );
}
