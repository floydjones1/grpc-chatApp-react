import * as jspb from 'google-protobuf'

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';


export class InitiateRequest extends jspb.Message {
  getName(): string;
  setName(value: string): InitiateRequest;

  getAvatarUrl(): string;
  setAvatarUrl(value: string): InitiateRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InitiateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: InitiateRequest): InitiateRequest.AsObject;
  static serializeBinaryToWriter(message: InitiateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InitiateRequest;
  static deserializeBinaryFromReader(message: InitiateRequest, reader: jspb.BinaryReader): InitiateRequest;
}

export namespace InitiateRequest {
  export type AsObject = {
    name: string,
    avatarUrl: string,
  }
}

export class InitiateResponse extends jspb.Message {
  getId(): number;
  setId(value: number): InitiateResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InitiateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: InitiateResponse): InitiateResponse.AsObject;
  static serializeBinaryToWriter(message: InitiateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InitiateResponse;
  static deserializeBinaryFromReader(message: InitiateResponse, reader: jspb.BinaryReader): InitiateResponse;
}

export namespace InitiateResponse {
  export type AsObject = {
    id: number,
  }
}

export class MessageRequest extends jspb.Message {
  getId(): number;
  setId(value: number): MessageRequest;

  getMessage(): string;
  setMessage(value: string): MessageRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MessageRequest): MessageRequest.AsObject;
  static serializeBinaryToWriter(message: MessageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageRequest;
  static deserializeBinaryFromReader(message: MessageRequest, reader: jspb.BinaryReader): MessageRequest;
}

export namespace MessageRequest {
  export type AsObject = {
    id: number,
    message: string,
  }
}

export class User extends jspb.Message {
  getId(): number;
  setId(value: number): User;

  getName(): string;
  setName(value: string): User;

  getStatus(): Status;
  setStatus(value: Status): User;

  getAvatar(): string;
  setAvatar(value: string): User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    id: number,
    name: string,
    status: Status,
    avatar: string,
  }
}

export class UserStreamResponse extends jspb.Message {
  getUsersList(): Array<User>;
  setUsersList(value: Array<User>): UserStreamResponse;
  clearUsersList(): UserStreamResponse;
  addUsers(value?: User, index?: number): User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserStreamResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserStreamResponse): UserStreamResponse.AsObject;
  static serializeBinaryToWriter(message: UserStreamResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserStreamResponse;
  static deserializeBinaryFromReader(message: UserStreamResponse, reader: jspb.BinaryReader): UserStreamResponse;
}

export namespace UserStreamResponse {
  export type AsObject = {
    usersList: Array<User.AsObject>,
  }
}

export class StreamRequest extends jspb.Message {
  getId(): number;
  setId(value: number): StreamRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StreamRequest): StreamRequest.AsObject;
  static serializeBinaryToWriter(message: StreamRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StreamRequest;
  static deserializeBinaryFromReader(message: StreamRequest, reader: jspb.BinaryReader): StreamRequest;
}

export namespace StreamRequest {
  export type AsObject = {
    id: number,
  }
}

export class StreamMessage extends jspb.Message {
  getId(): number;
  setId(value: number): StreamMessage;

  getSenderName(): string;
  setSenderName(value: string): StreamMessage;

  getSenderAvatar(): string;
  setSenderAvatar(value: string): StreamMessage;

  getMessage(): string;
  setMessage(value: string): StreamMessage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamMessage.AsObject;
  static toObject(includeInstance: boolean, msg: StreamMessage): StreamMessage.AsObject;
  static serializeBinaryToWriter(message: StreamMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StreamMessage;
  static deserializeBinaryFromReader(message: StreamMessage, reader: jspb.BinaryReader): StreamMessage;
}

export namespace StreamMessage {
  export type AsObject = {
    id: number,
    senderName: string,
    senderAvatar: string,
    message: string,
  }
}

export enum Status { 
  UNKOWN = 0,
  ONLINE = 1,
  OFFLINE = 2,
}
