export interface HttpOptionModel {
  isLoading?: boolean;
  isNotification?: boolean;
}

export interface Response<T> {
  success: boolean;
  data: T;
  error: Error;
}

export class ResponseModel<T = {}> implements Response<T> {
  success: boolean = false;
  data: any = null;
  error: Error = new Error();

  constructor(initialData?: T) {
    if (typeof initialData !== 'undefined') {
      this.data = initialData;
    }
  }
}
