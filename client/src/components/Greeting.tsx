import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typopgraphy from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import { IconButton, Tooltip } from "@material-ui/core";
import ImageGalleryDialog from "./ImageGallery";

const style: { [key: string]: React.CSSProperties } = {
  paper: {
    height: "30vh",
    width: "30%",
    backgroundColor: "lightslategrey",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  input: {
    marginTop: "50px",
    width: "50%",
    color: "white",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    height: 80,
    width: 80,
    margin: "2rem 0rem",
  },
};

interface Props {
  onUsernameEnter: (name: string, avatar: string) => void;
}

const Greeting: React.FC<Props> = (props) => {
  const [name, setName] = useState("");
  const [img, setImage] = useState("");
  const [open, setOpen] = useState(false);
  const { onUsernameEnter } = props;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name && !img) return;
    onUsernameEnter(name, img);
  };

  const handleImageSelect = (imgURL: string) => {
    if (!imgURL) return;
    setImage(imgURL);
    setOpen(false);
  };

  return (
    <>
      <Paper style={style.paper}>
        <form onSubmit={handleSubmit} style={style.form}>
          <Typopgraphy variant="h5">
            Please enter your name before joining the chat
          </Typopgraphy>
          <IconButton
            style={style.avatar}
            onClick={() => setOpen((prev) => !prev)}
          >
            <Tooltip title="Add Image">
              <Avatar src={img} style={style.avatar} sizes="large" />
            </Tooltip>
          </IconButton>
          <TextField
            style={style.input}
            placeholder="Enter Username..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputLabelProps={{
              style: {
                color: "white",
              },
            }}
            InputProps={{
              style: {
                color: "white",
              },
            }}
          />
        </form>
      </Paper>
      <ImageGalleryDialog isOpen={open} onImageSelect={handleImageSelect} />
    </>
  );
};

export default Greeting;
