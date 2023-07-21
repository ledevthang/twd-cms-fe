import React from 'react';
import {
  DataTable,
  DataTableProps,
  DataTableValueArray
} from 'primereact/datatable';
import { Column, ColumnProps } from 'primereact/column';

export interface TableProps<T extends DataTableValueArray>
  extends DataTableProps<T> {
  column: ColumnProps[];
}

function Table<T extends DataTableValueArray>({
  column,
  ...props
}: TableProps<T>) {
  return (
    <DataTable {...props}>
      {column.map((props, index) => (
        <Column key={index} {...props} />
      ))}
    </DataTable>
  );
}

export default Table;
