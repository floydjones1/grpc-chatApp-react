import React, { useEffect, useState } from "react";
import "./App.css";
import { RandomClient } from "./proto/RandomServiceClientPb";
import {
  StreamRequest,
  InitiateRequest,
  StreamMessage,
  UserStreamResponse,
  User,
  MessageRequest,
} from "./proto/random_pb";
import Greeting from "./components/Greeting";
import Chat from "./components/Chat";

export const client = new RandomClient("http://localhost:8080");

export type Session = { id: number; name: string; avatar: string };

function App() {
  const [user, setUser] = useState<Session>();
  const [messages, setMessages] = useState<Array<StreamMessage.AsObject>>([]);
  const [userList, setUserList] = useState<Array<User.AsObject>>([]);

  const handleEnterChat = (name: string, avatar: string) => {
    const intiateReq = new InitiateRequest();
    intiateReq.setName(name);
    intiateReq.setAvatarUrl(avatar);
    client.chatInitiate(intiateReq, {}, (err, resp) => {
      if (err) throw err;
      const id = resp.getId();
      setUser({ id, name, avatar });
    });
  };

  const handleSendMessage = (msg: string, onSuccess: () => void) => {
    console.log(user, !user);
    if (!user) return;
    const req = new MessageRequest();
    req.setId(user.id);
    req.setMessage(msg);
    console.log("here we go");
    client.sendMessage(req, {}, (err, resp) => {
      if (err) throw err;
      onSuccess();
    });
  };

  useEffect(() => {
    if (!user) return;

    const chatReq = new StreamRequest();
    (() => {
      chatReq.setId(user.id);
      const chatStream = client.chatStream(chatReq);
      chatStream.on("data", (chunk) => {
        const msg = (chunk as StreamMessage).toObject();
        console.log(msg);
        setMessages((prev) => [...prev, msg]);
      });
    })();

    (() => {
      const userListStream = client.userStream(chatReq);
      userListStream.on("data", (chunk) => {
        const { usersList } = (chunk as UserStreamResponse).toObject();
        console.log(usersList);
        setUserList(usersList);
      });
    })();
  }, [user]);

  return (
    <div className="App">
      {user ? (
        <Chat
          user={user}
          userList={userList}
          messages={messages}
          onMessageSubmit={handleSendMessage}
        />
      ) : (
        <Greeting onUsernameEnter={handleEnterChat} />
      )}
    </div>
  );
}

export default App;
