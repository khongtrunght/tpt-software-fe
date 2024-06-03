import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "./base";
import { IDepartment } from "@/interfaces/department.interface";

export const departmentsApi = createApi({
  reducerPath: "departmentsApi",
  tagTypes: ["deparments"],
  baseQuery: getBaseQuery(),

  endpoints: (builder) => ({
    getDeparments: builder.query<IDepartment[], void>({
      query: () => ({
        url: `/departments`,
      }),
      providesTags: ["deparments"],
    }),
    getDeparment: builder.query<
      IDepartment[],
      {
        id: string;
      }
    >({
      query: (args) => ({
        url: `/departments/${args.id}`,
      }),
      providesTags: ["deparments"],
    }),
    createDepartment: builder.mutation<
      void,
      {
        name: string;
        description: string;
      }
    >({
      query: (data) => ({
        url: `/departments`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["deparments"],
    }),
    updateDepartment: builder.mutation<void, IDepartment>({
      query: (data) => ({
        url: `/departments`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["deparments"],
    }),
    deleteDepartment: builder.mutation<
      void,
      {
        id: string;
      }
    >({
      query: (args) => ({
        url: `/departments/${args.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deparments"],
    }),
  }),
});

export const {
  useGetDeparmentsQuery,
  useGetDeparmentQuery,

  //mutation
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentsApi;
