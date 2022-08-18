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
  const [full, setFull] = useState(false);
  const [state, setState] = useState({
    direction: "row",
    alignContent: "start",
    width: 1245,
    height: 700,
    xs1: 8,
    xs2: 4,
  });
  let w = window.innerWidth - 15;
  let h = window.innerHeight * 0.8;
  const handleClick = () => {
    full ? setFull(false) : setFull(true);
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
    <Grid>
      <Grid container>
        <NavTest setSearch={setSearch} open={false} setOpen={setOpen} />
      </Grid>

      {full ? (
        <>
          <Grid container mt={7.5}>
            <iframe
              className="video-frame"
              src={`https://www.youtube.com/embed/${videoLink}`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="video"
              width={w}
              height={h}
            />
          </Grid>
          <Grid container direction={"row"} justifyContent={"center"}>
            <Box sx={{ width: "1920px" }}>
            <Typography>
              {videoTitle}
              <Button onClick={handleClick}>
                {state.direction === "column" ? (
                  <FullscreenIcon />
                ) : (
                  <FullscreenExitIcon />
                )}
              </Button>
            </Typography>
              <Grid container direction="column" alignContent="end" pr={10}>
                {videos}
              </Grid>
            </Box>
          </Grid>
        </>
      ) : (<Grid container justifyContent="center">

        <Box gridColumn="span 10" style={{ width: "1920px" }}>
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
                width={1245}
                height={700}
              />
              <Typography>
                {videoTitle}{" "}
                <Button onClick={handleClick}>
                  {full ? <FullscreenExitIcon /> : <FullscreenIcon />}
                </Button>
              </Typography>
            </Grid>
            <Grid item ml={3} mt={10}>
              {videos}
            </Grid>
          </Box>
        </Box>
      </Grid>
      )}

      {/*  */}
    </Grid>
  );
}
