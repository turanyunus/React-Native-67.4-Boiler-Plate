import { setLoading, setOpenNotification } from '../utils/store/commonSlice';
import { store } from '../utils/store/store';
import { ErrorCode } from '../models/enum/common';
import StatusNotificationType from '../models/enum/statusNotificationType';
import ErrorController from './errorController';
import { STORAGE_MANAGE } from '../utils/storage/storage_manage';
import axios, { AxiosResponse } from 'axios';
import { HttpOptionModel, ResponseModel, Response } from '../models/dto/responseDto';

const SERVICE_BASE_URL = `https://www.RN-0.67.4-Boiler-Plate.com/en`;

const _headers = () => ({
  Authorization: STORAGE_MANAGE.accessToken.get(),
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
});

export const _POST = async (url: string, request?: any, option?: HttpOptionModel): Promise<ResponseModel<any>> => {
  let response: Response<any> = new ResponseModel();

  // isLoading true ise, Loading'i aktif hale getiriyoruz.
  if (option?.isLoading) {
    store.dispatch(setLoading(true));
  }

  try {
    const requestJSON = JSON.stringify(request);
    // İstek yapılıyor.
    const axiosResponse: AxiosResponse<any> = await axios.post(SERVICE_BASE_URL + url, requestJSON, {
      headers: _headers()
    });

    // Response işlemlerimizi yapıyoruz.
    if (axiosResponse.status === ErrorCode.Success) {
      // Success true ve isNotification true ise, Notification'i açıyoruz.
      if (option?.isNotification) {
        store.dispatch(
          setOpenNotification({
            isShow: true,
            message: 'İşlem tamamlandı...',
            type: StatusNotificationType.Success
          })
        );
      }
    } else {
      ErrorController(axiosResponse);
    }
    response = axiosResponse.data;
  } catch (error) {
    // Hata durumunda, Hata kontrolü yapılıyor.
    if (error) {
      ErrorController(error);
    }
  } finally {
    // isLoading true ise, Loading'i kapatıyoruz.
    if (option?.isLoading) {
      store.dispatch(setLoading(false));
    }
  }

  return response;
};

export const _GET = async (url: string, option?: HttpOptionModel): Promise<ResponseModel<any>> => {
  let response: Response<any> = new ResponseModel();

  // isLoading true ise, Loading'i aktif hale getiriyoruz.
  if (option?.isLoading) {
    store.dispatch(setLoading(true));
  }

  try {
    // İstek yapılıyor.
    const axiosResponse: AxiosResponse<any> = await axios.get(SERVICE_BASE_URL + url, { headers: _headers() });

    // Response işlemlerimizi yapıyoruz.
    if (axiosResponse.status === ErrorCode.Success) {
      // Success true ve isNotification true ise, Notification'i açıyoruz.
      if (option?.isNotification) {
        store.dispatch(
          setOpenNotification({
            isShow: true,
            message: 'İşlem tamamlandı...',
            type: StatusNotificationType.Success
          })
        );
      }
    } else {
      ErrorController(axiosResponse);
    }
    response = axiosResponse.data;
  } catch (error) {
    // Hata durumunda, Hata kontrolü yapılıyor.
    if (error) {
      ErrorController(error);
    }
  } finally {
    // isLoading true ise, Loading'i kapatıyoruz.
    if (option?.isLoading) {
      store.dispatch(setLoading(false));
    }
  }

  return response;
};
