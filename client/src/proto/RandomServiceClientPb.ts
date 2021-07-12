/**
 * @fileoverview gRPC-Web generated client stub for randomPackage
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as proto_random_pb from '../proto/random_pb';


export class RandomClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoChatInitiate = new grpcWeb.AbstractClientBase.MethodInfo(
    proto_random_pb.InitiateResponse,
    (request: proto_random_pb.InitiateRequest) => {
      return request.serializeBinary();
    },
    proto_random_pb.InitiateResponse.deserializeBinary
  );

  chatInitiate(
    request: proto_random_pb.InitiateRequest,
    metadata: grpcWeb.Metadata | null): Promise<proto_random_pb.InitiateResponse>;

  chatInitiate(
    request: proto_random_pb.InitiateRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: proto_random_pb.InitiateResponse) => void): grpcWeb.ClientReadableStream<proto_random_pb.InitiateResponse>;

  chatInitiate(
    request: proto_random_pb.InitiateRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: proto_random_pb.InitiateResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/randomPackage.Random/ChatInitiate',
        request,
        metadata || {},
        this.methodInfoChatInitiate,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/randomPackage.Random/ChatInitiate',
    request,
    metadata || {},
    this.methodInfoChatInitiate);
  }

  methodInfoSendMessage = new grpcWeb.AbstractClientBase.MethodInfo(
    google_protobuf_empty_pb.Empty,
    (request: proto_random_pb.MessageRequest) => {
      return request.serializeBinary();
    },
    google_protobuf_empty_pb.Empty.deserializeBinary
  );

  sendMessage(
    request: proto_random_pb.MessageRequest,
    metadata: grpcWeb.Metadata | null): Promise<google_protobuf_empty_pb.Empty>;

  sendMessage(
    request: proto_random_pb.MessageRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  sendMessage(
    request: proto_random_pb.MessageRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/randomPackage.Random/SendMessage',
        request,
        metadata || {},
        this.methodInfoSendMessage,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/randomPackage.Random/SendMessage',
    request,
    metadata || {},
    this.methodInfoSendMessage);
  }

  methodInfoUserStream = new grpcWeb.AbstractClientBase.MethodInfo(
    proto_random_pb.UserStreamResponse,
    (request: proto_random_pb.StreamRequest) => {
      return request.serializeBinary();
    },
    proto_random_pb.UserStreamResponse.deserializeBinary
  );

  userStream(
    request: proto_random_pb.StreamRequest,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/randomPackage.Random/UserStream',
      request,
      metadata || {},
      this.methodInfoUserStream);
  }

  methodInfoChatStream = new grpcWeb.AbstractClientBase.MethodInfo(
    proto_random_pb.StreamMessage,
    (request: proto_random_pb.StreamRequest) => {
      return request.serializeBinary();
    },
    proto_random_pb.StreamMessage.deserializeBinary
  );

  chatStream(
    request: proto_random_pb.StreamRequest,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/randomPackage.Random/ChatStream',
      request,
      metadata || {},
      this.methodInfoChatStream);
  }

}

