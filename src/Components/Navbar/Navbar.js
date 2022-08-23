import React, { useState, useMemo } from "react";
import { Grid, Typography } from "@mui/material";
import { AppBar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import youtubeLogo from "./youtube-logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import "./Navbar.scss";
import { Fab } from "@mui/material";
import { Avatar } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import MicIcon from "@mui/icons-material/Mic";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";

export default function Navbar({ setSearch, open, setOpen, search }) {
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const location = useLocation();
  let navigate = useNavigate();
  let w = window.innerWidth;
  const exampleTags = [
    "Gaming",
    "Lofi",
    "CS:GO",
    "Mix",
    "Cooking",
    "Trending",
    "News",
    "Travel",
    "Space",
    "JavaScript",
    "Movies",
    "Gym",
    "How To Videos",
    "Learn A New Language",
    "Action Adventure Games",
    "Top Music",
    "Talk Show",
    "Pop Music",
  ];
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      e.preventDefault();
      setSearch(e.target.value);
    }
  };
  useMemo(() => {
    navigate("/");
  }, [search]);
  const tags = exampleTags.map((e) => {
    return (
      <React.Fragment key={e}>
        <Typography
          className="tags"
          style={{ fontSize: "14px", fontWeight: "bolder" }}
          mr={2}
          ml={2}
          mt={2}
        >
          {e}
        </Typography>
      </React.Fragment>
    );
  });
  return (
    <Grid>
      <AppBar style={{ height: "60px" }}>
        <Grid container direction="row">
          <Grid item xs={5}>
            <Fab
              style={{
                position: "fixed",
                marginLeft: "15px",
                marginTop: "10px",
                width: "40px",
                height: "40px",
                backgroundColor: "rgba(0, 0, 0, 0)",
              }}
            >
              <MenuIcon style={{ color: "white" }} />
            </Fab>
            <Link
              to="/"
              style={{
                textDecoration: "none",
              }}
            >
              <img
                className="youtube-logo"
                src={youtubeLogo}
                alt="youtube-logo.png"
                // onClick={setSearch("Trending")}
              />
            </Link>
          </Grid>
          <Grid item xs={7}>
            <input
              className="input-bar"
              type="text"
              placeholder={"Search"}
              onFocus={onFocus}
              onBlur={onBlur}
              onKeyPress={(e) => handleKeyPress(e)}
            />
            <button className="search-button">
              <SearchIcon />
            </button>
            <Fab
              style={{
                width: "40px",
                height: "40px",
                marginLeft: "20px",
                marginTop: "5px",
                backgroundColor: "rgb(34, 34, 34)",
              }}
            >
              <MicIcon style={{ color: "white" }} />
            </Fab>
          </Grid>
          <Grid
            container
            direction={"row"}
            justifyContent="end"
            position={"relative"}
            top={-77}
            right={35}
            zIndex={-1}
          >
            <VideoCallIcon
              style={{
                fontSize: "30px",
                marginRight: "20px",
                marginTop: "5px",
              }}
            />
            <NotificationsNoneIcon
              style={{
                fontSize: "30px",
                marginRight: "20px",
                marginTop: "5px",
              }}
            />
            <Avatar size="sm" src="profilepicyoutube.jpeg" />
          </Grid>
        </Grid>
      </AppBar>

      {location.pathname === "/" && (
        <Grid className="sidebar">
          {" "}
          <Grid
            container
            direction={"column"}
            alignContent={"center"}
            className="tabs"
            mt={5}
          >
            <HomeIcon />
            <Typography style={{ fontSize: "10px" }}>Home</Typography>
          </Grid>
          <Grid
            container
            direction={"column"}
            alignContent={"center"}
            className="tabs"
          >
            <ExploreIcon />
            <Typography style={{ fontSize: "10px" }} align="center">
              Explore
            </Typography>
          </Grid>
          <Grid
            container
            direction={"column"}
            alignContent={"center"}
            className="tabs"
          >
            <HomeIcon />
            <Typography style={{ fontSize: "10px" }}>Home</Typography>
          </Grid>
        </Grid>
      )}
      {location.pathname === "/" && (
        <AppBar
          style={{
            height: "60px",
            position: "fixed",
            top: 60,
            right: -55,
            zIndex: 1,
            borderTopColor: "white",
            borderTop: 2,
          }}
        >
          <Grid className="tag-style" container>
            {tags}
          </Grid>
        </AppBar>
      )}
    </Grid>
  );
}
