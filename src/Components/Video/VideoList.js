import React, { useEffect, useState, useMemo } from "react";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import Num2Views from "../../Hooks/Num2Views";
import DurationConvert from "../../Hooks/DurationConvert";
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
}) {
  const [channel, setChannel] = useState([]);
  const [views, setViews] = useState([]);
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
      <img src={thumbnail} alt={title} />
      <Grid container direction={"row"} justifyContent={"end"} mb={-4.5}>
        <p className="pt">{DurationConvert(duration)}</p>
      </Grid>
      <Grid container>
        <Grid item xs={2}>
          {channleImg}
        </Grid>
        <Grid item xs={10}>
          <Grid className="box">
            <Typography fontWeight={"bold"}>{title.toString()}</Typography>
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
// {
//   "kind": "youtube#videoListResponse",
//   "etag": "BpRwz9C1JR_SKhQvNGP-XeXLNiY",
//   "items": [
//     {
//       "kind": "youtube#video",
//       "etag": "N8StRtbiiq_8-QvbXKGpWBr51j4",
//       "id": "XjNmH7FCaIo",
//       "snippet": {
//         "publishedAt": "2022-07-31T15:58:24Z",
//         "channelId": "UC5eDiyFKURwCFAhOrA4wq-A",
//         "title": "Ovo Su Najbogatije Devojčice Na Svetu",
//         "description": "Ne zaboravite da se subskrabujete na Trending I da lajkujete ovaj video :)\n\nSubskrajbujte se na naš drugi kanał Trending News ovde: https://www.youtube.com/channel/UCrVcWIpO7vXzzr8f28dZJ_Q\n\nEmail (business inquiries only): trendingnjuz@gmail.com\n\nPratite nas na Instagramu: https://www.instagram.com/trending.rs/",
//         "thumbnails": {
//           "default": {
//             "url": "https://i.ytimg.com/vi/XjNmH7FCaIo/default.jpg",
//             "width": 120,
//             "height": 90
//           },
//           "medium": {
//             "url": "https://i.ytimg.com/vi/XjNmH7FCaIo/mqdefault.jpg",
//             "width": 320,
//             "height": 180
//           },
//           "high": {
//             "url": "https://i.ytimg.com/vi/XjNmH7FCaIo/hqdefault.jpg",
//             "width": 480,
//             "height": 360
//           },
//           "standard": {
//             "url": "https://i.ytimg.com/vi/XjNmH7FCaIo/sddefault.jpg",
//             "width": 640,
//             "height": 480
//           },
//           "maxres": {
//             "url": "https://i.ytimg.com/vi/XjNmH7FCaIo/maxresdefault.jpg",
//             "width": 1280,
//             "height": 720
//           }
//         },
//         "channelTitle": "TRENDING",
//         "tags": [
//           "trending",
//           "idjtv",
//           "blic poligraf",
//           "k1 televizija",
//           "grand show",
//           "Prva rs",
//           "paparazzo lov",
//           "mondo rs",
//           "Zvezde granda"
//         ],
//         "categoryId": "24",
//         "liveBroadcastContent": "none",
//         "localized": {
//           "title": "Ovo Su Najbogatije Devojčice Na Svetu",
//           "description": "Ne zaboravite da se subskrabujete na Trending I da lajkujete ovaj video :)\n\nSubskrajbujte se na naš drugi kanał Trending News ovde: https://www.youtube.com/channel/UCrVcWIpO7vXzzr8f28dZJ_Q\n\nEmail (business inquiries only): trendingnjuz@gmail.com\n\nPratite nas na Instagramu: https://www.instagram.com/trending.rs/"
//         },
//         "defaultAudioLanguage": "sr-Latn"
//       },
//       "contentDetails": {
//         "duration": "PT4M8S",
//         "dimension": "2d",
//         "definition": "hd",
//         "caption": "false",
//         "licensedContent": true,
//         "contentRating": {},
//         "projection": "rectangular"
//       },
//       "statistics": {
//         "viewCount": "9141",
//         "likeCount": "443",
//         "favoriteCount": "0",
//         "commentCount": "24"
//       }
//     }
//   ],
//   "pageInfo": {
//     "totalResults": 1,
//     "resultsPerPage": 1
//   }
// }
