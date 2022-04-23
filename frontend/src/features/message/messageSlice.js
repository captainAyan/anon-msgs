import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import messageService from "./messageService";

const initialState = {
  messages: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get messages
export const getMessages = createAsyncThunk(
  "message/get",
  async (page, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await messageService.getMessages(page, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.message);
    }
  }
);

// Delete messages
export const deleteMessage = createAsyncThunk(
  "message/delete",
  async (messageId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await messageService.deleteMessage(messageId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.message);
    }
  }
);

export const messageSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = action.payload.messages;
        state.skip = action.payload.skip;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.message = action.payload;
      })

      .addCase(deleteMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = state.messages.filter(
          (message) => message.id !== action.payload.id
        );
        state.total = state.total - 1;
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.message = action.payload;
      });
  },
});

export const { reset } = messageSlice.actions;
export default messageSlice.reducer;
