import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GuruState {
  id: string | null;
  role: "Guru" | "Partner" | "User" | null;
  kycStatus: "pending" | "verified" | "not_started" | null;
}

const initialState: GuruState = {
  id: null,
  role: null,
  kycStatus: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setGuru: (state, action: PayloadAction<GuruState>) => {
      return action.payload;
    },
    clearGuru: () => initialState,
  },
});

export const { setGuru, clearGuru } = userSlice.actions;
export default userSlice.reducer;
