"use client";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { memo, useMemo, useState } from "react";
import { ModalUpdateContract } from "./ModalUpdateContract";
import { CustomAlert } from "@/components/CustomAlert";
import { IContractType } from "@/interfaces/contract.interface";
import { useDeleteContractMutation } from "@/store/APIs/contracts";

export const ContractsTable = memo(function ContractsTable({
  contracts,
}: {
  contracts: IContractType[];
}) {
  const [visible, setVisible] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);

  const [selected, setSelected] = useState<IContractType | null>(null);

  const [deleteContract, { isLoading: isDeleting, error: deleteError }] =
    useDeleteContractMutation();
  const _contracts: IContractType[] = [
    {
      description: "Direct",
      number_of_months: 37,
      created_at: "2027-11-19T11:34:02.960Z",
      note: "balloon",
      created_by: "Home Loan Account",
      is_probation: false,
      tax_policy: "tax_policy 1",
      insurance_policy: "insurance_policy 1",
      template: "template 1",
      name: "Senior Quality Analyst",
      code: "5eiaIUMM*I",
      id: "1",
    },
    {
      description: "Principal",
      number_of_months: 12,
      created_at: "1999-05-15T17:42:54.093Z",
      note: "approach",
      created_by: "Checking Account",
      is_probation: false,
      tax_policy: "tax_policy 2",
      insurance_policy: "insurance_policy 2",
      template: "template 2",
      name: "Regional Branding Facilitator",
      code: "ING+Y.W=v?",
      id: "2",
    },
    {
      description: "Internal",
      number_of_months: 43,
      created_at: "2010-03-05T01:14:37.446Z",
      note: "Chair",
      created_by: "Savings Account",
      is_probation: false,
      tax_policy: "tax_policy 3",
      insurance_policy: "insurance_policy 3",
      template: "template 3",
      name: "Dynamic Data Officer",
      code: "}z}vmuf6HH",
      id: "3",
    },
    {
      description: "Internal",
      number_of_months: 9,
      created_at: "2077-12-12T04:27:05.161Z",
      note: "firsthand",
      created_by: "Savings Account",
      is_probation: false,
      tax_policy: "tax_policy 4",
      insurance_policy: "insurance_policy 4",
      template: "template 4",
      name: "Customer Interactions Specialist",
      code: "jCeYkpdVW+",
      id: "4",
    },
    {
      description: "Principal",
      number_of_months: 17,
      created_at: "1992-06-01T03:10:45.457Z",
      note: "handy",
      created_by: "Home Loan Account",
      is_probation: false,
      tax_policy: "tax_policy 5",
      insurance_policy: "insurance_policy 5",
      template: "template 5",
      name: "Central Accounts Assistant",
      code: "tVC0&Z&=bD",
      id: "5",
    },
    {
      description: "District",
      number_of_months: 14,
      created_at: "2001-09-07T16:35:51.945Z",
      note: "Tennessine",
      created_by: "Personal Loan Account",
      is_probation: false,
      tax_policy: "tax_policy 6",
      insurance_policy: "insurance_policy 6",
      template: "template 6",
      name: "National Identity Developer",
      code: "#q%2cl`TZl",
      id: "6",
    },
    {
      description: "Lead",
      number_of_months: 96,
      created_at: "2098-04-24T03:06:07.515Z",
      note: "withdrawal",
      created_by: "Investment Account",
      is_probation: false,
      tax_policy: "tax_policy 7",
      insurance_policy: "insurance_policy 7",
      template: "template 7",
      name: "Global Directives Specialist",
      code: "x,[n%edKIr",
      id: "7",
    },
  ];
  const columns: ColumnDef<IContractType>[] = useMemo(() => {
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
              Tên hợp đồng
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
        accessorKey: "number_of_months",
        header: "Số tháng",
        cell: ({ row }) => <div>{row.original.number_of_months}</div>,
      },
      {
        accessorKey: "note",
        header: "Ghi chú",
        cell: ({ row }) => <div>{row.original.note}</div>,
      },
      {
        accessorKey: "is_probation",
        header: "Thử việc",
        cell: ({ row }) => (
          <div>{row.original.is_probation ? "Có" : "Không"}</div>
        ),
      },
      {
        accessorKey: "tax_policy",
        header: "Chính sách thuế",
        cell: ({ row }) => <div>{row.original.tax_policy}</div>,
      },
      {
        accessorKey: "insurance_policy",
        header: "Chính sách bảo hiểm",
        cell: ({ row }) => <div>{row.original.insurance_policy}</div>,
      },
      {
        accessorKey: "template",
        header: "Mẫu",
        cell: ({ row }) => <div>{row.original.template}</div>,
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
          const contract = row.original;

          return (
            <DropdownMenu>
              <CustomAlert
                open={dialogDelete}
                onSubmit={() => {
                  deleteContract({
                    id: contract.id,
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
                    setSelected(contract);
                    setVisible(true);
                  }}
                >
                  Chỉnh sửa
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
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
  }, [deleteContract, dialogDelete]);
  return (
    <>
      <ModalUpdateContract
        open={visible}
        setVisible={setVisible}
        selected={selected}
      />
      <DataTable
        columns={columns}
        data={_contracts}
        filterComponent={
          <div className="flex items-center justify-between gap-4 w-full mr-3">
            <Input placeholder="Lọc..." value={""} className="max-w-sm" />
            <Button
              variant="default"
              onClick={() => {
                setVisible(true);
                setSelected(null);
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
