import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface editorState {
  endpoint: string;
}

const initialState = {
  endpoint: 'https://rickandmortyapi.com/graphql',
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setAPI(state: editorState, action: PayloadAction<editorState>) {
      state.endpoint = action.payload.endpoint;
    },
  },
});

export const { setAPI } = editorSlice.actions;

export default editorSlice.reducer;
