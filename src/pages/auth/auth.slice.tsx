import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthSlice: (state, action) => {
      state.isAuthenticated = action.payload;
    }
  }
});

export const { setAuthSlice } = authSlice.actions;
export default authSlice.reducer;
