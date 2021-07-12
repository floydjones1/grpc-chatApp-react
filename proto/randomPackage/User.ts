// Original file: proto/random.proto

import type { Status as _randomPackage_Status } from '../randomPackage/Status';

export interface User {
  'id'?: (number);
  'name'?: (string);
  'status'?: (_randomPackage_Status | keyof typeof _randomPackage_Status);
  'avatar'?: (string);
}

export interface User__Output {
  'id'?: (number);
  'name'?: (string);
  'status'?: (_randomPackage_Status);
  'avatar'?: (string);
}
