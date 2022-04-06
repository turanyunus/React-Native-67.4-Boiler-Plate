import { createSlice } from '@reduxjs/toolkit';
import StatusNotificationType from '../../models/enum/statusNotificationType';

interface OpenNotificationDto {
  isShow: boolean;
  message: string;
  type: StatusNotificationType;
}

interface initType {
  isLoading: boolean;
  openNotification: OpenNotificationDto;
}

const initialState: initType = {
  isLoading: false,
  openNotification: {
    message: '',
    type: StatusNotificationType.None,
    isShow: false
  }
};

const commonSlice = createSlice({
  name: 'commonSlice',
  initialState,
  reducers: {
    setLoading: (state, action) => ({ ...state, isLoading: action.payload }),
    setOpenNotification: (state, action) => ({ ...state, openNotification: action.payload })
  }
});
export const { setLoading, setOpenNotification } = commonSlice.actions;
export default commonSlice.reducer;
