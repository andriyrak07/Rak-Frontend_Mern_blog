import * as React from "react";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import Grid from "@mui/material/Grid";
import axios from "../axios";
import { useParams } from "react-router-dom";

import { Post } from "../components/Post";

export const SimilarTags = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { name } = useParams();

  const tagName = window.location.pathname.slice(6);

  React.useEffect(() => {
    axios
      .get(`/tags/${name}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert("Error");
      });
  }, []);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext>
        <div>
          <h1 style={{marginLeft: "20px", color:"rgb(155, 155, 155)"}}>#{tagName}</h1>
        </div>
        <Grid container spacing={4}>
          <Grid xs={12} item>
            {data?.map((obj, index) => (
              <Post
                key={index}
                id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ""
                }
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
              />
            ))}
          </Grid>
        </Grid>
      </TabContext>
    </Box>
  );
};
