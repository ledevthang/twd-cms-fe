import React, { useMemo, useRef, useState } from 'react';
import { Column, ColumnProps } from 'primereact/column';
import {
  DataTable,
  DataTableProps,
  DataTableSelectionChangeEvent
} from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { KycUserData } from '@/types/kyc';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { defaultPageSize } from '@/constants/common';

interface TableProps extends DataTableProps<any> {
  header: JSX.Element;
  leftToolbar?: JSX.Element;
  rightToolbar?: JSX.Element;
  data: KycUserData[];
  onSelected: (e: DataTableSelectionChangeEvent<any>) => void;
  columnData: ColumnProps[];
  totalElement?: number;
  setPage?: (v: number) => void;
  currentPage?: number;
  pageSize?: number;
}
function Table({
  data,
  header,
  leftToolbar,
  rightToolbar,
  globalFilter,
  selection,
  columnData,
  onSelected,
  setPage,
  totalElement,
  pageSize = defaultPageSize
}: TableProps) {
  const toast = useRef<Toast>(null);
  const [first, setFirst] = useState(0);
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setPage && setPage(event.page + 1);
    setFirst(event.first);
  };

  const isShowPagination = useMemo(
    () => (totalElement || 0) > pageSize,
    [totalElement, pageSize]
  );

  return (
    <div className='grid crud-demo'>
      <div className='col-12'>
        <div className='card'>
          <Toast ref={toast} />
          {(leftToolbar || rightToolbar) && (
            <Toolbar className='mb-4' left={leftToolbar} right={rightToolbar} />
          )}

          <DataTable
            value={data}
            selection={selection}
            onSelectionChange={onSelected}
            dataKey='id'
            className='datatable-responsive'
            globalFilter={globalFilter}
            emptyMessage='No products found.'
            header={header}
            responsiveLayout='scroll'
            rows={pageSize}
          >
            {columnData.map((item, index) => (
              <Column key={index} {...item} />
            ))}
          </DataTable>

          {isShowPagination && (
            <Paginator
              first={first}
              rows={pageSize}
              totalRecords={totalElement}
              onPageChange={onPageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Table;
