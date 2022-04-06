export enum ErrorCode {
  // 2xx
  Success = 200,

  // 4xx
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  UnSupportedMediaType = 415,

  // 5xx
  InternalServerError = 500
}
