import React from "react";

import { useNavigate, Navigate, useParams } from "react-router-dom";
import { selectIsAuth } from "../../redux/slices/auth";
import { useSelector } from "react-redux";
import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import axios from "../../axios";

export const Index = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("");

 
  const onSubmit = async () => {
    try {
      setLoading(true);
      const fields = {
        text,
      };
      await axios.post(`/posts/${id}/comments`, fields);
      setText("");
      window.location.reload();
    } catch (err) {
      console.warn(err);
      alert("Failed to create comment");
    }
  };

  if (!window.localStorage.getItem("token") && !isAuth) {
    return;
  }

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src=" " />
        <div className={styles.form}>
          <TextField
            label="Write the comment"
            variant="outlined"
            maxRows={10}
            multiline
            onChange={(e) => setText(e.target.value)}
            fullWidth
            value={text}
          />
          <Button onClick={onSubmit} variant="contained">
            Send
          </Button>
        </div>
      </div>
    </>
  );
};
