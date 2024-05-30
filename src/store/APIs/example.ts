import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "./base";
import { IExample } from "@/interfaces/example.interfaces";

export const exampleApi = createApi({
  reducerPath: "exampleApi",
  tagTypes: ["example"],
  baseQuery: getBaseQuery(),

  endpoints: (builder) => ({
    getExample: builder.query<IExample, void>({
      query: () => ({
        url: `/example`,
      }),
      providesTags: ["example"],
    }),
    updateExample: builder.mutation<void, IExample>({
      query: (data) => ({
        url: `/example`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["example"],
    }),
  }),
});

export const {
  useGetExampleQuery,
  useLazyGetExampleQuery,
  useUpdateExampleMutation,
} = exampleApi;
