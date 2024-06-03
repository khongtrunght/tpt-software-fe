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
import { memo, useMemo, useState } from "react";
import { ModalUpdateDepartment } from "./ModalUpdateDepartment";
import { CustomAlert } from "@/components/CustomAlert";
import { useDeleteDepartmentMutation } from "@/store/APIs/departments";

export const DepartmentsTable = memo(function DepartmentsTable({
  departments,
}: {
  departments: IDepartment[];
}) {
  const [visible, setVisible] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);

  const [selectedDepartment, setSelectedDepartment] =
    useState<IDepartment | null>(null);

  const [deleteDepartment, { isLoading: isDeleting, error: deleteError }] =
    useDeleteDepartmentMutation();
  const _departments: IDepartment[] = [
    {
      name: "Daisy Becker",
      code: "12334",
      description: "Dynamic",
      created_at: "2078-12-06T13:20:57.480Z",
      created_by: "Investment Account",
      id: "1",
    },
    {
      name: "Miss Ed Witting",
      code: "123124",
      description: "Corporate",
      created_at: "2059-12-05T13:18:18.497Z",
      created_by: "Investment Account",
      id: "2",
    },
    {
      name: "Willard Koepp",
      code: "454325",
      description: "International",
      created_at: "1991-11-17T16:08:56.950Z",
      created_by: "Personal Loan Account",
      id: "3",
    },
    {
      name: "Daryl Dietrich",
      code: "123123333",
      description: "Senior",
      created_at: "2055-08-03T01:55:51.124Z",
      created_by: "Auto Loan Account",
      id: "4",
    },
    {
      name: "Lillie Wyman",
      code: "123125553",
      description: "Principal",
      created_at: "2092-10-11T15:05:48.229Z",
      created_by: "Credit Card Account",
      id: "5",
    },
    {
      name: "Mrs. Veronica Hirthe MD",
      code: "12312399",
      description: "Direct",
      created_at: "2047-02-04T08:31:29.674Z",
      created_by: "Money Market Account",
      id: "6",
    },
    {
      name: "Jana Daugherty",
      code: "123123777",
      description: "International",
      created_at: "2001-07-17T17:35:02.091Z",
      created_by: "Investment Account",
      id: "7",
    },
  ];
  const columns: ColumnDef<IDepartment>[] = useMemo(() => {
    return [
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
        accessorKey: "code",
        header: "Mã phòng ban",
        cell: ({ row }) => <div>{row.original.code}</div>,
      },
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Tên phòng ban
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="capitalize">{row.original.name}</div>
        ),
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
          <div className="capitalize">
            {new Date(row.original.created_at).toLocaleDateString()}
          </div>
        ),
      },
      {
        accessorKey: "created_by",
        header: "Người tạo",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("created_by")}</div>
        ),
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const department = row.original;

          return (
            <DropdownMenu>
              <CustomAlert
                open={dialogDelete}
                onSubmit={() => {
                  deleteDepartment({
                    id: department.id,
                  });
                  setDialogDelete(false);
                }}
                setVisible={setDialogDelete}
              />
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedDepartment(department);
                    setVisible(true);
                  }}
                >
                  Chỉnh sửa
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    console.log(department);
                    setDialogDelete(true);
                  }}
                >
                  Xóa
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ];
  }, [deleteDepartment, dialogDelete]);
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
          <div className="flex items-center justify-between gap-4 w-full mr-3">
            <Input placeholder="Lọc..." value={""} className="max-w-sm" />
            <Button
              variant="default"
              onClick={() => {
                setVisible(true);
                setSelectedDepartment(null);
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
