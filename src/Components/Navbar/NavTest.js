import React, { useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { AppBar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import youtubeLogo from "./youtube-logo.png";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import "./Navbar.scss";
import { Fab } from "@mui/material";

export default function NavTest({ setSearch, open, setOpen }) {
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const location = useLocation();
console.log("location.pathname: ", location.pathname)
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
              <MenuIcon style={{color: "white"}}/>
            </Fab>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                // color: nav === "navbar-home" ? "white" : "black",
              }}
            >
              <img
                className="youtube-logo"
                src={youtubeLogo}
                alt="youtube-logo.png"
                onClick={setSearch("Trending")}
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
              onKeyPress={(e) =>
                e.key === "Enter" &&
                e.target.value !== "" &&
                (e.preventDefault(), setSearch(e.target.value))
              }
            />
            <button className="search-button">
              <SearchIcon />
            </button>
          </Grid>
        </Grid>
      </AppBar>
      {location.pathname === "/" && <Grid className="sidebar"></Grid>}
    </Grid>
  );
}
