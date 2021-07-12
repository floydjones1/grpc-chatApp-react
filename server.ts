import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./proto/random";
import { RandomHandlers } from "./proto/randomPackage/Random";
import { StreamMessage } from "./proto/randomPackage/StreamMessage";
import { ChatConnectRequest } from "./proto/randomPackage/ChatConnectRequest";
import { UserStreamResponse } from "./proto/randomPackage/UserStreamResponse";
import { User } from "./proto/randomPackage/User";
import {
  addUser,
  listUsers,
  listMessagesFromMainRoom,
  addChatToMainRoom,
  findUser,
  updateUser,
} from "./data";
import {
  emitMainRoomChatUpdate,
  emitUserUpdateEvent,
  listenMainRoomChatUpdate,
  listenUserUpdateEvent,
} from "./pubsub";
import { Status } from "./proto/randomPackage/Status";

const PORT = 9090;
const PROTO_FILE = "./proto/random.proto";

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObj = grpc.loadPackageDefinition(
  packageDef
) as unknown as ProtoGrpcType;
const randomPackage = grpcObj.randomPackage;

function main() {
  const server = getServer();
  server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Your server as started on port ${port}`);
      server.start();
    }
  );
  runStreams();
}

const userIdToMsgStream = new Map<
  number,
  grpc.ServerWritableStream<ChatConnectRequest, StreamMessage>
>();
const userIdToUserListStream = new Map<
  number,
  grpc.ServerWritableStream<ChatConnectRequest, UserStreamResponse>
>();
function getServer() {
  const server = new grpc.Server();
  server.addService(randomPackage.Random.service, {
    ChatInitiate: (call, callback) => {
      const sessionName = (call.request.name || "").trim().toLowerCase();
      const avatar = call.request.avatarUrl || "";
      if (!sessionName || !avatar)
        callback(new Error("Name/Avatar is required"));
      listUsers((err, users) => {
        if (err) return callback(err);
        let idx = users.findIndex((u) => u?.name?.toLowerCase() === sessionName);
        if (idx !== -1 && users[idx].status === Status.ONLINE)
          return callback(new Error("User with name already exist"));
        if (idx !== -1) {
          const user = users[idx];
          updateUser(user, console.error);
          return callback(null, { id: user.id });
        } else {
          const user: User = {
            id: idx === -1 ? Math.floor(Math.random() * 10000000) : idx,
            name: sessionName,
            avatar,
            status: Status.ONLINE,
          };
          addUser(user, console.error);
          return callback(null, { id: user.id });
        }
      });
    },
    ChatStream: (call) => {
      const { id = 0 } = call.request;
      findUser(id, (err, user) => {
        if (err) return call.end();
        const {id: userId = 0} = user
        user.status = Status.ONLINE;
        updateUser(user, console.error);
        listMessagesFromMainRoom((msgs) => {
          userIdToMsgStream.set(userId, call);
          for (const msg of msgs) {
            call.write(msg);
          }
        });

        call.on("cancelled", () => {
          userIdToMsgStream.delete(id);
        });
      });
    },
    SendMessage: (call, callback) => {
      const { id = 0, message = "" } = call.request;
      if (!id) return callback(new Error("not valid id"));
      if (!message) return callback(new Error("no message"));

      findUser(id, (err, user) => {
        if (err) return callback(null, err);
        const msg: StreamMessage = {
          id,
          senderName: user.name,
          senderAvatar: user.avatar,
          message,
        };
        addChatToMainRoom(msg, (err) => {
          if (err) callback(null, err);
          emitMainRoomChatUpdate(msg);
          callback(null);
        });
      });
    },
    UserStream: (call) => {
      const { id = 0 } = call.request;
      if (!id) return call.end();
      findUser(id, (err, user) => {
        const {id: userId = 0} = user
        if (err) return call.end();
        user.status = Status.ONLINE;
        updateUser(user, () => {
          if(err) throw err
          listUsers((err, users) => {
            if (err) throw err;
            userIdToUserListStream.set(userId, call);
            for (const [, stream] of userIdToUserListStream) {
              stream.write({ users });
            }
          });
        });
        
        call.on("cancelled", () => {
          userIdToUserListStream.delete(id)
          user.status = Status.OFFLINE;
          updateUser(user, (err) => {
            if(err) throw err
            emitUserUpdateEvent(user)
          });
          
        });
      });
    },
  } as RandomHandlers);

  return server;
}

function runStreams() {
  listenMainRoomChatUpdate((data, channel) => {
    const msg = JSON.parse(data) as StreamMessage;
    for (const [, stream] of userIdToMsgStream) {
      stream.write(msg);
    }
  });
  listenUserUpdateEvent(() =>
    listUsers((err, users) => {
      if (err) throw err;
      for (const [, stream] of userIdToUserListStream) {
        stream.write({ users });
      }
    })
  );
}

main();
