"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


interface CampaignData {
    id: number;
    active: boolean;
    title: string;
    campaign_timezone: string;
    triggered_by: string;
    days: string[];
    start_at: string;
    per_day_limit: number;
    maximum_limit: number;
    contact_pointer: number;
    template_pointer: number;
    followup_template_pointer: number;
    waiting_time: number;
    primary_reply_to: string;
    executing: boolean;
    last_execution_date: string;
}

export const columns: ColumnDef<CampaignData>[] = [
     {
        accessorKey: 'title',
        header: "Name",
        cell: ({ row }) => (
            <div>
              <h3 className="capitalize font-semibold text-xl" >{row.getValue('title')} </h3> 
              <p className="text-slate-400 ">{row.original.primary_reply_to}</p>
            </div>
          ),
      },
    //   {
    //     accessorKey: 'primary_reply_to',
    //     header: "email",
    //     cell: ({ row }) => (
    //         <div>
    //           {row.getValue('primary_reply_to')}
    //         </div>
    //       ),
    //   },
      {
        accessorKey: 'active',
        header: "Status",
        cell: ({ row }) => (
          <div className="capitalize">

            
              {row.getValue('active') ? (<span className="text-green-500 font-semibold">Active</span>) : (
                <span className="text-red-500 font-semibold">Paused</span>
              )}
            </div>
        ),
      },
];



interface campaignParams {
    campaignsComponentData: CampaignData[]
}

const CustomDataTable : React.FC<campaignParams> = ({campaignsComponentData})=>{
// export function CustomDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  console.log(campaignsComponentData)


  

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: campaignsComponentData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search Campaign..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CustomDataTable
