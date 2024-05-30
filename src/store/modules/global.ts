import { IExample } from "@/interfaces/example.interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ExampleState {
  exampleSelecting: IExample | null;
  // customSider: { title: string; href: string }[];
}

const initialState: ExampleState = {
  exampleSelecting: null,
  // customSider: [],
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setExampleSelecting: (state, action: PayloadAction<IExample>) => {
      state.exampleSelecting = action.payload;
    },
    // setCustomSider: (
    //   state,
    //   action: PayloadAction<{ title: string; href: string }[]>
    // ) => {
    //   state.customSider = action.payload;
    // },
    resetGlobalState: (state) => {
      state.exampleSelecting = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setExampleSelecting, resetGlobalState } = globalSlice.actions;

const globalReducer = globalSlice.reducer;

export default globalReducer;
