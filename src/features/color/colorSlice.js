import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import colorService from "./colorService";

const initialState = {
  colors: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const getColor = createAsyncThunk("color/get-colors", async (thunkAPI) => {
  try {
    return await colorService.getColor();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const addColor = createAsyncThunk("color/add-color", async (data,thunkAPI) => {
  try {
    return await colorService.addColor(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const delColor = createAsyncThunk("color/delete-color", async (id,thunkAPI) => {
  try {
    return await colorService.delColor(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const updateColor = createAsyncThunk("color/update-color", async (data,thunkAPI) => {
  try {
    return await colorService.editColor(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const resetMessage = createAction("color/reset-message")

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.colors = action.payload;
      })
      .addCase(getColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.colors = [];
        state.message = action.payload;
      })
      .addCase(addColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError=false;
        state.colors.push(action.payload.color);
        state.message=action.payload.message
      })
      .addCase(addColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(delColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError=false;
        state.colors = state.colors.filter((color)=>color._id!==action.payload._id);
      })
      .addCase(delColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message=action.payload
      })
      .addCase(updateColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError=false;
        state.colors = state.colors.map((color)=>color._id===action.payload.color._id?color=action.payload.color:color)
        state.message=action.payload.message
      })
      .addCase(updateColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message=action.payload
      }).addCase(resetMessage,(state)=>{
        state.message=""
      })
  },
});
export { getColor,addColor,delColor,updateColor };
export default colorSlice.reducer;
