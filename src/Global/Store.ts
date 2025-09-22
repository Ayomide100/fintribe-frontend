import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import GuruReducer from "./GuruSlice";
import UserReducer from "./UserSlice";
import PartnerReducer from "./PartnerSlice";
import UploadReducer from "./uploadSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedGuruReducer = persistReducer(persistConfig, GuruReducer);
const persistedUserReducer = persistReducer(persistConfig, UserReducer);
const persistedPartnerReducer = persistReducer(persistConfig, PartnerReducer);
const persistedUploadReducer = persistReducer(persistConfig, UploadReducer);

export const store = configureStore({
  reducer: {
    guru: persistedGuruReducer,
    user: persistedUserReducer,
    partner: persistedPartnerReducer,
    upload: persistedUploadReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
