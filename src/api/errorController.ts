import { ErrorCode } from '../models/enum/common';
import i18n from '../i18n/index';
import { store } from '../utils/store/store';
import StatusNotificationType from '../models/enum/statusNotificationType';
import { setOpenNotification } from '../utils/store/commonSlice';

const ErrorController = (error: any) => {
  let errMessage = '';
  if (error.response !== undefined) {
    switch (error.response.status) {
      case ErrorCode.BadRequest:
        errMessage = 'Bad Request';
        break;
      case ErrorCode.Unauthorized:
        errMessage = 'Unauthorized';
        break;
      case ErrorCode.Forbidden:
        errMessage = 'Forbidden';
        break;
      case ErrorCode.NotFound:
        errMessage = i18n.t('NotFound');
        break;
      case ErrorCode.UnSupportedMediaType:
        errMessage = 'UnSupportedMediaType';
        break;
      case ErrorCode.InternalServerError:
        errMessage = 'InternalServerError';
        break;
      default:
        errMessage = i18n.t('UNKNOWN_ERROR');
        break;
    }
    if (errMessage !== '') {
      store.dispatch(
        setOpenNotification({
          isShow: true,
          message: errMessage,
          type: StatusNotificationType.Error
        })
      );
    }
  }
};

export default ErrorController;
