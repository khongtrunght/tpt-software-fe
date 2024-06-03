import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "./base";
import { IDepartment } from "@/interfaces/department.interface";
import { IContractType } from "@/interfaces/contract.interface";

export const contractsApi = createApi({
  reducerPath: "contractsApi",
  tagTypes: ["contracts"],
  baseQuery: getBaseQuery(),

  endpoints: (builder) => ({
    getContracts: builder.query<IContractType[], void>({
      query: () => ({
        url: `/contracts`,
      }),
      providesTags: ["contracts"],
    }),
    getContract: builder.query<
      IContractType,
      {
        id: string;
      }
    >({
      query: (args) => ({
        url: `/contracts/${args.id}`,
      }),
      providesTags: ["contracts"],
    }),
    createContract: builder.mutation<void, IContractType>({
      query: (data) => ({
        url: `/contracts`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["contracts"],
    }),
    updateContract: builder.mutation<void, IContractType>({
      query: (data) => ({
        url: `/contracts`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["contracts"],
    }),
    deleteContract: builder.mutation<
      void,
      {
        id: string;
      }
    >({
      query: (args) => ({
        url: `/contracts/${args.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contracts"],
    }),
  }),
});

export const {
  useGetContractsQuery,
  useGetContractQuery,
  //mutation
  useCreateContractMutation,
  useUpdateContractMutation,
  useDeleteContractMutation,
} = contractsApi;
