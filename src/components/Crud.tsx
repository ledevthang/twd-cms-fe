import React, { useRef, useState } from 'react';
import { ColumnProps } from 'primereact/column';
import {
  DataTableProps,
  DataTableSelectionChangeEvent
} from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Table } from './common';
import { KycUserData } from '@/types/kyc';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';

interface CrudProps extends DataTableProps<any> {
  header: JSX.Element;
  leftToolbar?: JSX.Element;
  rightToolbar?: JSX.Element;
  data: KycUserData[];
  onSelected: (e: DataTableSelectionChangeEvent<any>) => void;
  columnData: ColumnProps[];
  totalElement?: number;
  setPage?: (v: number) => void;
  currentPage?: number;
}
function Crud({
  data,
  header,
  leftToolbar,
  rightToolbar,
  globalFilter,
  selection,
  columnData,
  onSelected,
  setPage,
  totalElement
}: CrudProps) {
  const toast = useRef<Toast>(null);
  const [first, setFirst] = useState(0);
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setPage && setPage(event.page + 1);
    setFirst(event.first);
  };

  return (
    <div className='grid crud-demo'>
      <div className='col-12'>
        <div className='card'>
          <Toast ref={toast} />
          {(leftToolbar || rightToolbar) && (
            <Toolbar className='mb-4' left={leftToolbar} right={rightToolbar} />
          )}
          <Table
            value={data}
            selection={selection}
            onSelectionChange={onSelected}
            dataKey='id'
            className='datatable-responsive'
            globalFilter={globalFilter}
            emptyMessage='No products found.'
            header={header}
            responsiveLayout='scroll'
            column={columnData}
            rows={10}
          />
          <Paginator
            first={first}
            rows={10}
            totalRecords={totalElement}
            onPageChange={onPageChange}
            currentPageReportTemplate='Showing {first} to {last} of {totalRecords} products'
          />
        </div>
      </div>
    </div>
  );
}

export default Crud;
