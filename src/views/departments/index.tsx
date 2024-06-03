"use client";
import { memo } from "react";
import { DepartmentsTable } from "./DepartmentsTable";
import { useGetDeparmentsQuery } from "@/store/APIs/departments";
import { Skeleton } from "@/components/ui/skeleton";

export const DepartmentsView = memo(function DepartmentsView() {
  const { data: departments, isLoading, error } = useGetDeparmentsQuery();

  if (isLoading)
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />;

  return (
    <div>
      <DepartmentsTable departments={departments || []} />
    </div>
  );
});
