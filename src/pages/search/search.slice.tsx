import { createSlice } from '@reduxjs/toolkit';
import { DataSearchLocationTourDto } from './search-list';

export enum SearchType {
  NONE,
  PICK,
  DROP
}

interface sliceGeneralDto {
  tourLocationPickState: DataSearchLocationTourDto;
  tourLocationDropState: DataSearchLocationTourDto;
  searchType: SearchType;
}

const initialState: sliceGeneralDto = {
  searchType: SearchType.NONE,
  tourLocationPickState: {
    id: 0,
    text: ''
  },
  tourLocationDropState: {
    id: 0,
    text: ''
  }
};

const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    setTourLocationPickState: (state, action) => {
      state.tourLocationPickState = action.payload;
    },
    setTourLocationDropState: (state, action) => {
      state.tourLocationDropState = action.payload;
    },
    setSearchType: (state, action) => {
      state.searchType = action.payload;
    }
  }
});

export const { setTourLocationPickState, setTourLocationDropState, setSearchType } = searchSlice.actions;
export default searchSlice.reducer;
