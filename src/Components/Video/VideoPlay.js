import React, { useState, useMemo } from "react";
import axios from "axios";
import { Grid, Box } from "@mui/material";
import { Typography } from "@mui/material";
import VideoPlayList from "./VideoPlayList";
import { Button } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import Navbar from "../Navbar/Navbar";
import Num2Views from "../../Hooks/Num2Views";

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
  const [channel, setChannel] = useState([]);

  const APIkey = process.env.REACT_APP_VIDEO_KEY;

  const channelId = JSON.parse(localStorage.getItem("channeImgs"));
  const viewCount = JSON.parse(localStorage.getItem("views"));
  console.log("channelId", channelId);
  let w = window.innerWidth - 15;
  let h = window.innerHeight * 0.82;

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

  useMemo(() => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${APIkey}`
      )
      .then((res) => {
        setChannel(res.data.items);
      })
      .catch((err) => console.log("Error: ", err));
  }, [channelId]);

  const channleImg = channel.map((e) => {
    return (
      <React.Fragment key={channelId}>
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

  return (
    <Grid>
      <Grid container>
        <Navbar setSearch={setSearch} open={false} setOpen={setOpen} />
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
          <Grid container direction={"row"} justifyContent={"center"} mt={2}>
            <Box sx={{ width: "1920px" }}>
              <Grid container direction="column" pl={10}>
                <Typography style={{ fontWeight: "bold" }}>
                  {videoTitle}
                  <Button onClick={handleClick}>
                    {full ? <FullscreenExitIcon /> : <FullscreenIcon />}
                  </Button>
                </Typography>
                <Typography fontSize={"15px"} fontWeight={"bold"}>
                  {`${viewCount} views`}
                </Typography>
                <Grid mt={1}>{channleImg}</Grid>
              </Grid>
              <Grid container direction="column" alignContent="end" pr={10}>
                {videos}
              </Grid>
            </Box>
          </Grid>
        </>
      ) : (
        <Grid container justifyContent="center">
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
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="video"
                  width={1245}
                  height={700}
                />
                <Grid container direction="column">
                  <Typography style={{ fontWeight: "bold" }}>
                    {videoTitle}
                    <Button onClick={handleClick}>
                      {full ? <FullscreenExitIcon /> : <FullscreenIcon />}
                    </Button>
                  </Typography>
                  <Typography fontSize={"15px"} fontWeight={"bold"}>
                    {`${viewCount} views`}
                  </Typography>
                  <Grid mt={1}>{channleImg}</Grid>
                </Grid>
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
