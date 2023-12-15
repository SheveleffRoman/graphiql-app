import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlices';
import editorReducer from './slices/editorSlices';

export const store = configureStore({
  reducer: {
    user: userReducer,
    editor: editorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
