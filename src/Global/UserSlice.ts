import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  role: "Guru" | "Partner" | "User" | null;
  kycStatus: "pending" | "verified" | "not_started" | null;
}

const initialState: UserState = {
  id: null,
  role: null,
  kycStatus: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
