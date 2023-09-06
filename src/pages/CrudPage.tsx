import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ProductService } from '@/_mock/service/ProductService';
import { Crud } from '@/components';
import { Demo } from '@/types/demo';
import { ColumnProps } from 'primereact/column';
import { DataTableSelectionChangeEvent } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';

import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { statusOptions } from '@/constants/common';

function CrudPage() {
  const [products, setProducts] = useState<Demo.Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Demo.Product[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [startDate] = useState(null);
  const [endDate] = useState(null);
  const options = useMemo(
    () => [
      {
        name: 'Pendding',
        code: 'pendding'
      },
      {
        name: 'Approved',
        code: 'approved'
      },
      {
        name: 'Rejected',
        code: 'rejected'
      }
    ],
    []
  );
  const header = useMemo(() => {
    return (
      <div className='flex flex-column md:flex-row md:justify-content-between md:align-items-center'>
        <span className='block mt-2 md:mt-0 p-input-icon-left flex-1'>
          <i className='pi pi-search' />
          <InputText
            type='search'
            onInput={e => setGlobalFilter(e.currentTarget.value)}
            placeholder='Search...'
          />
        </span>
        <div className='flex justify-content-center w-3'>
          <Dropdown
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.value)}
            options={statusOptions}
            optionLabel='name'
            placeholder='Status'
            className='w-full md:w-14rem'
          />
        </div>
        <div className='flex text-600 text-2xl justify-content-center align-items-center w-5'>
          <span className='text-700 text-2xl mr-4'>Date</span>
          <Calendar value={startDate} />
          <p className='mx-3'>-</p>
          <Calendar value={endDate} />
        </div>
      </div>
    );
  }, [setSelectedStatus, selectedStatus, startDate, endDate]);

  const statusBodyTemplate = useCallback(
    (rowData: Demo.Product) => {
      return (
        <>
          <Dropdown
            value={rowData.inventoryStatus}
            options={options}
            optionLabel='name'
            className='w-full md:w-14rem'
            placeholder={rowData.inventoryStatus || ''}
            defaultValue={rowData.inventoryStatus}
          />
        </>
      );
    },
    [options]
  );

  const column: ColumnProps[] = useMemo(() => {
    return [
      {
        field: 'name',
        header: 'User Name',
        sortable: true
      },
      {
        field: 'quantity',
        header: 'Risk',
        sortable: true
      },
      {
        field: 'description',
        header: 'Date of submission',
        sortable: true
      },
      {
        field: 'inventoryStatus',
        header: 'Status',
        body: statusBodyTemplate,
        sortable: true
      }
    ];
  }, [statusBodyTemplate]);

  const handleSelectRow = useCallback(
    (e: DataTableSelectionChangeEvent<any>) => {
      setSelectedProducts(e.value as any);
    },
    []
  );

  useEffect(() => {
    ProductService.getProducts().then(data => {
      setProducts(data);
    });
  }, []);

  return (
    <Crud
      data={products}
      header={header}
      columnData={column}
      selection={selectedProducts}
      onSelected={handleSelectRow}
      globalFilter={globalFilter}
    />
  );
}

export default CrudPage;
