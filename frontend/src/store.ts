import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice'
import { authReducer } from './slices/authenticated'

// Custom middleware to check for 401 errors and redirect
const redirectOn401Middleware = () => (next: any) => (action: any) => {
    if (action.payload?.status === 401) {
      // Redirect to homepage if the response status is 401
      // Clear local storage
      localStorage.removeItem("userInfo")
      localStorage.removeItem("authToken")
      window.location.href = "/"
    }
    return next(action)
}


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware).concat(redirectOn401Middleware),
  devTools: true,
})