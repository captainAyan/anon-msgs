import { configureStore } from "@reduxjs/toolkit";

import darkModeReducer from "../features/theme/themeSlice";
import authReducer from "../features/auth/authSlice";
import messageReducer from "../features/message/messageSlice";

export const store = configureStore({
  reducer: {
    theme: darkModeReducer,
    auth: authReducer,
    message: messageReducer,
  },
});
