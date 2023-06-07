import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import brandService from "./brandService";

const initialState = {
  brands: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const getBrand = createAsyncThunk("brand/get-brands", async (thunkAPI) => {
  try {
    return await brandService.getBrand();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const addBrand = createAsyncThunk("brand/add-brand", async (data,thunkAPI) => {
  try {
    return await brandService.addBrand(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const delBrand = createAsyncThunk("brand/del-brand", async (id,thunkAPI) => {
  try {
    return await brandService.delBrand(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const updateBrand = createAsyncThunk("brand/update-brand", async (data,thunkAPI) => {
  try {
    return await brandService.editBrand(data);
    
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const resetMessage = createAction("brand/reset-message")

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brands = action.payload;
      })
      .addCase(getBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.brands = [];
        state.message = action.payload;
      })
      .addCase(addBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError=false;
        state.brands.push(action.payload.brand);
        state.message=action.payload.message
      })
      .addCase(addBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(delBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError=false;
        state.brands=state.brands.filter((brand)=>brand._id!==action.payload._id);
      })
      .addCase(delBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError=false;
        state.brands = state.brands.map((brand)=>brand._id===action.payload.brand._id?brand=action.payload.brand:brand)
        state.message = action.payload.message
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(resetMessage,(state)=>{
        state.message=""
      })
  },
});
export { getBrand ,addBrand,delBrand,updateBrand};
export default brandSlice.reducer;
