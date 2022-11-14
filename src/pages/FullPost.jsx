import React from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [comment, setComment] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const [isLoadingComments, setLoadingComments] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert("Error");
      });
    axios
      .get(`/posts/${id}/comments`)
      .then((res) => {
        setComment(res.data);
        setLoadingComments(false);
      })
      .catch((err) => {
        alert("Error");
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock items={comment} isLoading={isLoadingComments}>
        <Index />
      </CommentsBlock>
    </>
  );
};
