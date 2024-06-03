"use client";

import { ColumnDef } from "@tanstack/react-table";
CustomAlert;

import { CustomAlert } from "@/components/CustomAlert";
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
import { IPosition } from "@/interfaces/positions.interface";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { memo, useMemo, useState } from "react";
import { ModalUpdatePosition } from "./ModalUpdatePosition";

export const PositionsTable = memo(function PositionsTable({
  positions,
}: {
  positions: IPosition[];
}) {
  const [visible, setVisible] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);

  const [selectedPosition, setSelectedPosition] = useState<IPosition | null>(
    null,
  );

  // const [deletePosition, { isLoading: isDeleting, error: deleteError }] =
  //   useDeletePositionMutation();

  const _positions: IPosition[] = [
    {
      created_at: "1997-02-25T10:16:49.107Z",
      name: "3095",
      code: "EE",
      note: "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
      created_by: "Ms. Tricia Gleichner",
      id: "1",
    },
    {
      created_at: "2067-10-20T09:29:12.604Z",
      name: "608",
      code: "SK",
      note: "The Football Is Good For Training And Recreational Purposes",
      created_by: "Kirk Kutch",
      id: "2",
    },
    {
      created_at: "2050-12-18T00:28:07.670Z",
      name: "26688",
      code: "DK",
      note: "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
      created_by: "Patrick Cartwright",
      id: "3",
    },
    {
      created_at: "1991-07-07T13:35:31.498Z",
      name: "53311",
      code: "BG",
      note: "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
      created_by: "Mona McDermott",
      id: "4",
    },
    {
      created_at: "2024-03-23T21:38:38.042Z",
      name: "940",
      code: "PL",
      note: "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
      created_by: "Christine Yost",
      id: "5",
    },
    {
      created_at: "2016-11-05T23:43:48.319Z",
      name: "6237",
      code: "WS",
      note: "The Football Is Good For Training And Recreational Purposes",
      created_by: "Alex Green",
      id: "6",
    },
    {
      created_at: "2062-12-06T09:14:33.790Z",
      name: "68146",
      code: "IS",
      note: "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
      created_by: "Nichole Smith",
      id: "7",
    },
  ];

  const columns: ColumnDef<IPosition>[] = useMemo(() => {
    return [
      {
        accessorKey: "code",
        header: "Mã chức vụ",
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
              Tên chức vụ
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="capitalize">{row.original.name}</div>
        ),
      },
      {
        accessorKey: "note",
        header: "Mô tả",
        cell: ({ row }) => <div>{row.original.note}</div>,
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
                onSubmit={() => {}}
                // onSubmit={() => {
                //   deletePosition({
                //     id: department.id,
                //   });
                //   setDialogDelete(false);
                // }}
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
                    setSelectedPosition(department);
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
  }, [dialogDelete]);

  return (
    <>
      <ModalUpdatePosition
        open={visible}
        setVisible={setVisible}
        selectedPosition={selectedPosition}
      />
      <DataTable
        columns={columns}
        data={_positions}
        filterComponent={
          <div className="flex items-center justify-between gap-4 w-full mr-3">
            <Input placeholder="Lọc..." value={""} className="max-w-sm" />
            <Button
              variant="default"
              onClick={() => {
                setVisible(true);
                setSelectedPosition(null);
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
