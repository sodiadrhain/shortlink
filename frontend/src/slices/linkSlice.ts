import { apiSlice } from "./apiSlice"
const BASE_URL = "/api"

export const linkApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    list: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/list`,
        method: "GET",
        params: { ...data, limit: 100 },
      }),
    }),
    encode: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/encode`,
        method: "POST",
        body: data,
      }),
    }),
    decode: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/decode`,
        method: "POST",
        body: data,
      }),
    }),
    statistic: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/statistic/${data._id}`,
        method: "GET",
      }),
    }),
  }),
})

export const {
  useListMutation,
  useEncodeMutation,
  useDecodeMutation,
  useStatisticMutation,
} = linkApiSlice