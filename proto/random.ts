import type * as grpc from '@grpc/grpc-js';
import type { ServiceDefinition, EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { RandomClient as _randomPackage_RandomClient, RandomDefinition as _randomPackage_RandomDefinition } from './randomPackage/Random';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  google: {
    protobuf: {
      Empty: MessageTypeDefinition
    }
  }
  randomPackage: {
    InitiateRequest: MessageTypeDefinition
    InitiateResponse: MessageTypeDefinition
    MessageRequest: MessageTypeDefinition
    Random: SubtypeConstructor<typeof grpc.Client, _randomPackage_RandomClient> & { service: _randomPackage_RandomDefinition }
    Status: EnumTypeDefinition
    StreamMessage: MessageTypeDefinition
    StreamRequest: MessageTypeDefinition
    User: MessageTypeDefinition
    UserStreamResponse: MessageTypeDefinition
  }
}

