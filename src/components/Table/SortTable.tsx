"use client";

import { useState, useMemo } from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Edit,
  Trash,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type SortDirection = "asc" | "desc" | null;

interface Column<T> {
  key: keyof T;
  label: string;
}

interface SortableTableProps<T extends { id: string | number }> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (id: T["id"]) => void;
  onDelete?: (id: T["id"]) => void;
}

function useSortableData<T>(
  items: T[],
  config: { key: keyof T; direction: SortDirection } | null = null
) {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    const sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: keyof T) => {
    let direction: SortDirection = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
}

export function SortableTable<T extends { id: string | number }>({
  data,
  columns,
}: SortableTableProps<T>) {
  const { items, requestSort, sortConfig } = useSortableData(data);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 text-black">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="bg-gray-100 font-bold text-black">
              No
            </TableHead>
            {columns.map((column) => (
              <TableHead
                key={column.key as string}
                className="bg-gray-100 font-bold text-black cursor-pointer hover:bg-gray-200"
                onClick={() => requestSort(column.key)}
              >
                <div className="flex items-center justify-between">
                  {column.label}
                  <span className="ml-2">
                    {sortConfig?.key === column.key ? (
                      sortConfig.direction === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    ) : (
                      <ChevronsUpDown className="h-4 w-4 text-gray-400" />
                    )}
                  </span>
                </div>
              </TableHead>
            ))}
            <TableHead className="bg-gray-100 font-bold text-black">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow
              key={item.id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <TableCell className="text-center">{index + 1}</TableCell>
              {columns.map((column) => (
                <TableCell key={column.key as string}>
                  {item[column.key] as React.ReactNode}
                </TableCell>
              ))}
              <TableCell className="text-center space-x-2">
                <button
                  onClick={() => alert(item.id)}
                  className="p-1 text-blue-600 hover:text-blue-800"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => alert(item.id)}
                  className="p-1 text-red-600 hover:text-red-800"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
