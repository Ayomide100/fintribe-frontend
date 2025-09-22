// features/uploadSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UploadState {
  file: File | null;
}

const initialState: UploadState = {
  file: null,
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    setFile: (state, action: PayloadAction<File | null>) => {
      state.file = action.payload;
    },
    clearFile: (state) => {
      state.file = null;
    },
  },
});

export const { setFile, clearFile } = uploadSlice.actions;
export default uploadSlice.reducer;
