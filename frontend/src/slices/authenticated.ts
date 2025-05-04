import { createSlice } from "@reduxjs/toolkit"

const userInfo: string = localStorage.getItem("userInfo") as string;
const initialState = {
  userInfo: userInfo ? JSON.parse(userInfo) : null,
  linkData: { data: [] },
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const userInfo = action?.payload?.data
      state.userInfo = userInfo
      localStorage.setItem("userInfo", JSON.stringify(userInfo))
      const token = action?.payload?.data?.token;
      localStorage.setItem('authToken', token)
    },
    logout: (state) => {
      state.userInfo = null
      localStorage.removeItem("userInfo")
      localStorage.removeItem("authToken")
      localStorage.clear()
    },
    setLinkData: (state, action) => {
      const linkData = action?.payload?.data
      state.linkData.data = linkData;
    },
  },
})

export const { setCredentials, logout, setLinkData } = authSlice.actions

export const authReducer = authSlice.reducer