import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Grid from "@mui/material/Grid";

import { useDispatch, useSelector } from "react-redux";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import {
  fetchPosts,
  fetchTags,
  fetchComments,
  fetchTopPosts,
} from "../redux/slices/posts.js";

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags, comments, topPosts } = useSelector(
    (state) => state.posts
  );
  const userData = useSelector((state) => state.auth.data);
  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  const isCommentsLoading = comments.status === "loading";
  const isTopLoading = topPosts.status === "loading";
  const [value, setValue] = React.useState("1");

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchComments());
    dispatch(fetchTopPosts());
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="All posts" value="1" />
            <Tab label="Top posts" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Grid container spacing={4}>
            <Grid xs={8} item>
              {(isPostsLoading ? [...Array(5)] : posts.items).map(
                (obj, index) =>
                  isPostsLoading ? (
                    <Post key={index} isLoading={true} />
                  ) : (
                    <Post
                      key={index}
                      id={obj._id}
                      title={obj.title}
                      imageUrl={
                        obj.imageUrl
                          ? `http://localhost:4444${obj.imageUrl}`
                          : ""
                      }
                      user={obj.user}
                      createdAt={obj.createdAt}
                      viewsCount={obj.viewsCount}
                      commentsCount={3}
                      tags={obj.tags}
                      isEditable={userData?._id === obj.user?._id}
                    />
                  )
              )}
            </Grid>
            <Grid xs={4} items>
              <TagsBlock items={tags.items} isLoading={isTagsLoading} />
              <CommentsBlock items={comments.items} isLoading={isCommentsLoading} />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value="2">
          <div style={{ textAlign: "center" }}>
            <h1>The most popular posts</h1>
          </div>
          <Grid xs={8} item>
            {(isTopLoading ? [...Array(10)] : topPosts.items).map(
              (item, index) =>
                isTopLoading ? (
                  <Post key={index} isLoading={true} />
                ) : (
                  <Post
                    key={index}
                    id={item._id}
                    title={item.title}
                    imageUrl={
                      item.imageUrl
                        ? `http://localhost:4444${item.imageUrl}`
                        : ""
                    }
                    user={item.user}
                    createdAt={item.createdAt}
                    viewsCount={item.viewsCount}
                    commentsCount={3}
                    tags={item.tags}
                  />
                )
            )}
          </Grid>
        </TabPanel>
      </TabContext>
    </Box>
  );
};
