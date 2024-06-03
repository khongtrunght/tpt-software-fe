"use client";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { IDepartment } from "@/interfaces/department.interface";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { memo, useState } from "react";
import { ModalUpdateDepartment } from "./ModalUpdateDepartment";

export const DepartmentsTable = memo(function DepartmentsTable({
  departments,
}: {
  departments: IDepartment[];
}) {
  const [visible, setVisible] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<IDepartment | null>(null);
  const _departments: IDepartment[] = [
    {
      name: "Daisy Becker",
      description: "Dynamic",
      created_at: "2078-12-06T13:20:57.480Z",
      created_by: "Investment Account",
      id: "1",
    },
    {
      name: "Miss Ed Witting",
      description: "Corporate",
      created_at: "2059-12-05T13:18:18.497Z",
      created_by: "Investment Account",
      id: "2",
    },
    {
      name: "Willard Koepp",
      description: "International",
      created_at: "1991-11-17T16:08:56.950Z",
      created_by: "Personal Loan Account",
      id: "3",
    },
    {
      name: "Daryl Dietrich",
      description: "Senior",
      created_at: "2055-08-03T01:55:51.124Z",
      created_by: "Auto Loan Account",
      id: "4",
    },
    {
      name: "Lillie Wyman",
      description: "Principal",
      created_at: "2092-10-11T15:05:48.229Z",
      created_by: "Credit Card Account",
      id: "5",
    },
    {
      name: "Mrs. Veronica Hirthe MD",
      description: "Direct",
      created_at: "2047-02-04T08:31:29.674Z",
      created_by: "Money Market Account",
      id: "6",
    },
    {
      name: "Jana Daugherty",
      description: "International",
      created_at: "2001-07-17T17:35:02.091Z",
      created_by: "Investment Account",
      id: "7",
    },
  ];
  const columns: ColumnDef<IDepartment>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && "indeterminate")
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tên phòng ban
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
    },
    {
      accessorKey: "description",
      header: "Mô tả",
      cell: ({ row }) => <div>{row.original.description}</div>,
    },
    {
      accessorKey: "created_at",
      header: "Ngày tạo",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("requiredSeats")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const department = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedDepartment(department);
                  setVisible(true);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return (
    <>
      <ModalUpdateDepartment
        open={visible}
        setVisible={setVisible}
        selectedDepartment={selectedDepartment}
      />
      <DataTable
        columns={columns}
        data={_departments}
        filterComponent={
          <div className="flex items-center gap-4 w-full">
            <Input placeholder="Filter ..." value={""} className="max-w-sm" />
            <Button
              variant="default"
              onClick={() => {
                setVisible(true);
              }}
            >
              Tạo mới
            </Button>
          </div>
        }
      />
    </>
  );
});
