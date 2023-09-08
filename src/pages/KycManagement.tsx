import React, { useCallback, useMemo, useState } from 'react';
import { Demo } from '@/types/demo';
import { ColumnProps } from 'primereact/column';
import { DataTableSelectionChangeEvent } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';

import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { statusOptions } from '@/constants/common';
import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '@/types/query';
import { getKycUserList } from '@/services/kyc.service';
import { KycUserData } from '@/types/kyc';
import dayjs from 'dayjs';
import Table from '@/components/common/Table';

function KycManagement() {
  const [selectedProducts, setSelectedProducts] = useState<Demo.Product[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [startDate] = useState(null);
  const [endDate] = useState(null);
  const [page, setPage] = useState(1);

  const { data } = useQuery({
    queryKey: [QueryKey.KycUserList, { page }],
    queryFn: () =>
      getKycUserList({
        page: page,
        size: 10
      })
  });

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
    (rowData: KycUserData) => {
      return (
        <>
          <Dropdown
            value={rowData.status}
            options={options}
            optionLabel='name'
            className='w-full md:w-14rem'
            placeholder={rowData.status || ''}
            defaultValue={rowData.status}
          />
        </>
      );
    },
    [options]
  );

  const column: ColumnProps[] = useMemo(() => {
    return [
      {
        field: 'user.displayName',
        header: 'User Name',
        sortable: true,
        className: 'text-black'
      },
      {
        field: 'risk',
        header: 'Risk',
        sortable: true,
        className: 'text-black'
      },
      {
        field: 'submittedAt',
        header: 'Date of submission',
        sortable: true,
        body: (rowData: KycUserData) => (
          <span className='text-black'>
            {rowData.submittedAt &&
              dayjs(rowData.submittedAt).format('DD/MM/YYYY')}
          </span>
        )
      },
      {
        field: 'status',
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
  return (
    <Table
      data={data?.data as KycUserData[]}
      header={header}
      columnData={column}
      selection={selectedProducts}
      onSelected={handleSelectRow}
      globalFilter={globalFilter}
      totalElement={data?.totalElement as number}
      setPage={setPage}
      currentPage={page}
    />
  );
}

export default KycManagement;
