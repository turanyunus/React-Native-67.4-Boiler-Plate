import { ErrorCode } from '../enum/common';

export interface IError {
  code: ErrorCode;
  status: ErrorCode;
  message: string;
}

export class Error implements IError {
  code: ErrorCode = ErrorCode.Success;
  status: ErrorCode = ErrorCode.Success;
  message: string = '';
}
