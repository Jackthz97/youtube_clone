import React from "react";
import Navbar from "../Navbar/Navbar";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";

export default function VideoPlay({
  open,
  setOpen,
  search,
  setSearch,
  setVideoLink,
  videoLink,
  videoTitle,
}) {

  return (
    <div>
      <Navbar setSearch={setSearch} open={false} setOpen={setOpen} />
      <Grid
        className="video-container"
        container
        direction={"column"}
        alignContent={"center"}
        mt={20}
      >
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
    </div>
  );
}
