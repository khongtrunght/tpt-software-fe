"use client";
import { memo } from "react";
import { ContractsTable } from "./ContractsTable";
import { useGetDeparmentsQuery } from "@/store/APIs/departments";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetContractsQuery } from "@/store/APIs/contracts";

export const ContractsView = memo(function ContractsView() {
  const { data: contracts, isLoading, error } = useGetContractsQuery();

  if (isLoading)
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />;

  return (
    <div>
      <ContractsTable contracts={contracts || []} />
    </div>
  );
});
