import { apiSlice } from "./apiSlice"

export const linkApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    list: builder.mutation({
      query: (data) => ({
        url: '/list',
        method: "GET",
        params: { ...data, page: data.page, q: data.q },
      }),
    }),
    encode: builder.mutation({
      query: (data) => ({
        url: '/encode',
        method: "POST",
        body: data,
      }),
    }),
    decode: builder.mutation({
      query: (data) => ({
        url: '/decode',
        method: "POST",
        body: data,
      }),
    }),
    statistic: builder.mutation({
      query: (data) => ({
        url: `/statistic/${data._id}`,
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