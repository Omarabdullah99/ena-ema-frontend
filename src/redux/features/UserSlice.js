import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../api';

// Async Thunks
export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (formValue, { rejectWithValue }) => {
    try {
      const response = await api.signUp(formValue);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (formValue, { rejectWithValue }) => {
    try {
      const response = await api.signIn(formValue);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchUserByIdAsync=createAsyncThunk(
  'user/fetchUserById',
  async(userId)=>{
    const response= await api.findUserId(userId)
    return response.data

  }
)

// User Slice
const userSlice = createSlice({
  name: 'users',
  initialState: {
    user: null,
    error: '',
    loading: false,
    allusers: [],
    userByIdDetails:null,
  },
  reducers: {
    //! Register/Login করার পর refresh করলে data মুছে যায়, সেটার সমাধান
    setUser: (state, action) => {
      state.user = action.payload;
    },
    //! Logout Action
    setLogout: (state) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login Async Thunk
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.setItem('ecoomerce', JSON.stringify({ ...action.payload }));
        state.user = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false;
        console.log('loginaction', action.payload);
        state.error = action.payload;
      })

      // Create User Async Thunk
      .addCase(createUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.setItem('ecoomerce', JSON.stringify({ ...action.payload }));
        state.user = action.payload;
        console.log('registeraction', action.payload);
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //fetchUserById logic
      .addCase(fetchUserByIdAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userByIdDetails = action.payload;
      })
      .addCase(fetchUserByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
     
     

        
  },
});

export const { setUser, setLogout } = userSlice.actions;
export const selectLoggedInUser = (state) => state.users.user;
export const selectedUserDetails=(state)=> state.users.userByIdDetails;
export const selectError = (state) => state.users.error;
export default userSlice.reducer;
