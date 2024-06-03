// store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Import your APIs and global slice
import { authApi } from "./APIs/auth";
import { globalSlice } from "./modules/global";
import { exampleApi } from "./APIs/example";
import { departmentsApi } from "./APIs/departments";

// Root reducer combining all the reducers
const rootReducer = combineReducers({
  [globalSlice.name]: globalSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [exampleApi.reducerPath]: exampleApi.reducer,
  [departmentsApi.reducerPath]: departmentsApi.reducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: [globalSlice.name], // Add slices you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        authApi.middleware,
        exampleApi.middleware,
        departmentsApi.middleware
      ),
  });
  const persistor = persistStore(store);
  return { store, persistor };
};

// Reset all API actions
export const resetAllApiActions = [authApi, exampleApi].map((api) =>
  api.util.resetApiState()
);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>["store"];
export type AppDispatch = AppStore["dispatch"];
