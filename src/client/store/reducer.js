import { createSlice } from '@reduxjs/toolkit';

export const INITIAL_STATE = {
  welcomeMessage: 'This is a Frontend Foundation Server based application',
};

const appStateSlice = createSlice({
  name: 'appState',
  initialState: INITIAL_STATE,
  reducers: {
    setWelcomeMessage: (state, action) => {
      state.welcomeMessage = action.payload;
    },
  },
});

export const { actions, reducer } = appStateSlice;
export default reducer;
