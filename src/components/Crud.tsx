import React, { useRef } from 'react';
import { ColumnProps } from 'primereact/column';
import {
  DataTableProps,
  DataTableSelectionChangeEvent,
  DataTableValue
} from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Table } from './common';

interface CrudProps<T extends DataTableValue> extends DataTableProps<any> {
  header: JSX.Element;
  leftToolbar: JSX.Element;
  rightToolbar: JSX.Element;
  data: T[];
  onSelected: (e: DataTableSelectionChangeEvent<any>) => void;
  columnData: ColumnProps[];
}
function Crud<T extends DataTableValue>({
  data,
  header,
  leftToolbar,
  rightToolbar,
  globalFilter,
  selection,
  columnData,
  onSelected
}: CrudProps<T>) {
  const toast = useRef<Toast>(null);

  return (
    <div className='grid crud-demo'>
      <div className='col-12'>
        <div className='card'>
          <Toast ref={toast} />
          <Toolbar className='mb-4' left={leftToolbar} right={rightToolbar} />
          <Table
            value={data}
            selection={selection}
            onSelectionChange={onSelected}
            dataKey='id'
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className='datatable-responsive'
            paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
            currentPageReportTemplate='Showing {first} to {last} of {totalRecords} products'
            globalFilter={globalFilter}
            emptyMessage='No products found.'
            header={header}
            responsiveLayout='scroll'
            column={columnData}
          />
        </div>
      </div>
    </div>
  );
}

export default Crud;
