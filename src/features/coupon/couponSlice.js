import { createSlice,createAsyncThunk, createAction } from "@reduxjs/toolkit";
import couponService from "./couponService";

const initialState = {
    coupons:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

const getAllCoupons = createAsyncThunk("coupon/get-coupons",async(thunkAPI)=>{
    try {
        return couponService.getAllCoupons()
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

const addCoupon = createAsyncThunk("coupon/add-coupon", async (data,thunkAPI) => {
    try {
      return await couponService.addCoupon(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

const delCoupon = createAsyncThunk("coupon/del-coupon", async (id,thunkAPI) => {
  try {
    return await couponService.delCoupon(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const updateCoupon = createAsyncThunk("coupon/update-coupon", async (data,thunkAPI) => {
  try {
    return await couponService.editCoupon(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const resetMessage = createAction("coupon/reset-message")

const couponSlice = createSlice({
    name:"coupon",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllCoupons.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getAllCoupons.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.message="";
            state.coupons = action.payload
        })
        .addCase(getAllCoupons.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.coupons = [];
            state.message = action.payload;
        })
         .addCase(addCoupon.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(addCoupon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError=false;
            state.coupons.push(action.payload.coupon);
            state.message=action.payload.message
          })
          .addCase(addCoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
          })
          .addCase(delCoupon.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(delCoupon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError=false;
            state.coupons = state.coupons.filter((coupon)=>coupon._id!==action.payload._id);
          })
          .addCase(delCoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message=action.payload
          })
          .addCase(updateCoupon.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updateCoupon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError=false;
            state.coupons = state.coupons.map((coupon)=>coupon._id===action.payload.coupon._id?coupon=action.payload.coupon:coupon);
            state.message = action.payload.message
          })
          .addCase(updateCoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message=action.payload
          })
          .addCase(resetMessage,(state)=>{
            state.message=""
          })
    }
})

export {getAllCoupons,addCoupon,delCoupon,updateCoupon}
export default couponSlice.reducer