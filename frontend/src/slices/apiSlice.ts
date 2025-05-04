import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({ baseUrl: "", 
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('authToken');
        if(token) {
            headers.set('x-auth-token', token)
        }
        return headers;
} })

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Api"],
  endpoints: () => ({}),
})