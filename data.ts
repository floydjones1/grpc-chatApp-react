import redis from "redis";
import NRP from "node-redis-pubsub";
import { StreamMessage } from "./proto/randomPackage/StreamMessage";
import { User } from "./proto/randomPackage/User";

const REDIST_KEYS = {
  broadcastRoom: "room:0:messages",
  users: "users",
};

const client = redis.createClient();

client.on("error", console.error);
client.on("connect", console.log);
type errCB = (err: Error | null) => void;
type replyCB<T> = (err: Error | null, reply: T) => void;


export const listMessagesFromMainRoom = (
  done?: (data: Array<StreamMessage>) => void
) => {
  client.lrange(REDIST_KEYS.broadcastRoom, 0, -1, (err, reply) => {
    const msgs: Array<StreamMessage> = [];
    for (const res of reply) {
      msgs.push(JSON.parse(res));
    }
    done && done(msgs);
  });
};
export const addChatToMainRoom = (msg: StreamMessage, fn: errCB) => {
  client.rpush(REDIST_KEYS.broadcastRoom, JSON.stringify(msg), fn);
};

export const addUser = (user: User, fn: errCB) => {
  client.rpush(REDIST_KEYS.users, JSON.stringify(user), fn);
};
export const listUsers = (fn: replyCB<User[]>) => {
  client.lrange(REDIST_KEYS.users, 0, -1, (err, reply) => {
    if (err) return fn(err, []);
    const users: Array<User> = [];
    for (const r of reply) {
      users.push(JSON.parse(r));
    }
    fn(null, users);
  });
};

export const findUser = (userId: number, fn: replyCB<User>) => {
  listUsers((err, users) => {
    if(err) return fn(err, {} as User)
    const i = users.findIndex((e) => e.id === userId)
    fn(null, users[i])
  })
}

export const updateUser = (user: User, fn: errCB) => {
  listUsers((err, users) => {
    if(err) return fn(err)
    const i = users.findIndex((e) => e.id === user.id)
    if(i === -1) return fn(Error('cannot find user'))
    client.lset(REDIST_KEYS.users, i, JSON.stringify(user), fn)
  })
}

export default client;
export const nrp = NRP({
  emitter: redis.createClient(),
  receiver: redis.createClient(),
});
