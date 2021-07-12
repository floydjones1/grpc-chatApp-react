import React, { useState } from "react";
import {
  Divider,
  Grid,
  Paper,
  Typography,
  Avatar,
  TextField,
  Chip,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import SendIcon from "@material-ui/icons/Send";
import UserList from "./UserList";
import ChatBubble from "./ChatBubble";
import { Status, StreamMessage, User } from "../proto/random_pb";
import { Session } from "../App";

const style: { [key: string]: React.CSSProperties } = {
  container: {
    height: "80vh",
    padding: "2rem",
    width: "85vw",
  },
  paper: {
    padding: "30px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    backgroundColor: "lightslategrey",
  },
  avatar: {
    margin: "20px",
  },
};

interface Props {
  user: Session;
  userList: Array<User.AsObject>;
  messages: Array<StreamMessage.AsObject>;
  onMessageSubmit: (msg: string, onSuccess: () => void) => void;
}

const Chat: React.FC<Props> = (props) => {
  const [msg, setMsg] = useState("");
  const { userList, messages, onMessageSubmit, user } = props;

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("called");
    e.preventDefault();
    if (!msg) return;
    console.log("here ", msg);
    onMessageSubmit(msg, () => setMsg(""));
  };

  return (
    <form onSubmit={handleSendMessage}>
      <Grid container style={style.container} spacing={3}>
        <Grid item xs={3}>
          <Paper style={style.paper}>
            <UserList
              users={userList.map((x) => ({
                ...x,
                isOnline: x.status === Status.ONLINE,
              }))}
            />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper style={style.paper}>
            <div
              style={{
                height: "100%",
                width: "100%",
                backgroundColor: "aliceblue",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* {name banner} */}
              <div
                style={{
                  height: "10%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar style={style.avatar} />
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <Typography variant="button">{user.name}</Typography>
                  <Chip
                    color="primary"
                    size="small"
                    style={{ width: "70px" }}
                    label="online"
                  />
                </Grid>
              </div>
              <Divider />
              <div style={{ height: "752px", overflowY: "auto" }}>
                {messages.map((msg, i) => (
                  <ChatBubble
                    key={i}
                    message={msg}
                    isCurrentUser={msg.id === user.id}
                  />
                ))}
              </div>
              <Divider />
              <div
                style={{ width: "100%", alignItems: "center", padding: "10px" }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Start Typing..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SendIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
};

export default Chat;
