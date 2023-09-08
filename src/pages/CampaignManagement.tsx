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
import Table from '@/components/common/Table';
import { getCampaignList } from '@/services/campaign.service';
import { ICampaign } from '@/types/campaign';
import { formatDate } from '@/utils/date';

function CampaignManagement() {
  const [selectedProducts, setSelectedProducts] = useState<Demo.Product[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [startDate] = useState(null);
  const [endDate] = useState(null);
  const [page, setPage] = useState(1);

  const { data } = useQuery({
    queryKey: [QueryKey.CampaignList, { page }],
    queryFn: () =>
      getCampaignList({
        page: page,
        size: 10
      })
  });

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

  const column: ColumnProps[] = useMemo(() => {
    return [
      {
        field: 'title',
        header: 'Campaign',
        sortable: true,
        className: 'text-black'
      },
      {
        field: 'startAt',
        header: 'Created date',
        sortable: true,
        className: 'text-black',
        body: (rowData: ICampaign) => (
          <span className='text-black'>
            {rowData.startAt && formatDate(rowData.endAt)}
          </span>
        )
      },
      {
        field: 'submittedAt',
        header: 'Deadline',
        sortable: true,
        body: (rowData: ICampaign) => (
          <span className='text-black'>
            {rowData.endAt && formatDate(rowData.endAt)}
          </span>
        )
      },
      {
        field: 'progress',
        header: 'Progress',
        sortable: true
      },
      {
        field: 'goal',
        header: 'Goal',
        sortable: true
      },
      {
        field: 'investor',
        header: 'Backers',
        sortable: true
      },
      {
        field: 'status',
        header: 'Status',
        sortable: true,
        body: (rowData: ICampaign) => (
          <span className='text-black'>{rowData.status}</span>
        )
      },
      {
        field: 'submittedAt',
        header: 'action'
      }
    ];
  }, []);

  const handleSelectRow = useCallback(
    (e: DataTableSelectionChangeEvent<any>) => {
      setSelectedProducts(e.value as any);
    },
    []
  );
  return (
    <Table
      data={data?.data as ICampaign[]}
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

export default CampaignManagement;
