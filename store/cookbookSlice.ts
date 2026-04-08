import { createSlice } from "@reduxjs/toolkit";

interface CookbookState {
  savedIds: string[];
}

const initialState: CookbookState = {
  savedIds: [],
};

const cookbookSlice = createSlice({
  name: "cookbook",
  initialState,
  reducers: {
    saveRecipe(state, action) {
      if (!state.savedIds.includes(action.payload)) {
        state.savedIds.push(action.payload);
      }
    },
    unsaveRecipe(state, action) {
      state.savedIds = state.savedIds.filter(
        (id) => id !== action.payload
      );
    },
    setSavedIds(state, action) {
      state.savedIds = action.payload;
    },
  },
});

export const { saveRecipe, unsaveRecipe, setSavedIds } =
  cookbookSlice.actions;

export default cookbookSlice.reducer;