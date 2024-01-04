import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlices';
import editorReducer from './slices/editorSlices';

const rootReducer = combineReducers({
  user: userReducer,
  editor: editorReducer,
});

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('store');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('store', serializedState);
  } catch (error) {
    console.error(error);
  }
};

export const setupStore = () => {
  const initialState = loadState();
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });

  store.subscribe(() => {
    saveState(store.getState());
  });

  return store;
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
