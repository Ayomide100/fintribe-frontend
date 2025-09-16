import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PartnerState {
  id: string | null;
  role: "Guru" | "Partner" | "User" | null;
  kycStatus: "pending" | "verified" | "not_started" | null;
}

const initialState: PartnerState = {
  id: null,
  role: null,
  kycStatus: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPartner: (state, action: PayloadAction<PartnerState>) => {
      return action.payload;
    },
    clearPartner: () => initialState,
  },
});

export const { setPartner, clearPartner } = userSlice.actions;
export default userSlice.reducer;
