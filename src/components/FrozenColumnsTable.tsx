import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Table } from './common';
import { Demo } from '@/types/demo';
import { CustomerService } from '@/_mock/service/CustomerService';
import { ColumnProps } from 'primereact/column';
import { formatCurrency } from '@/utils/formatNumber';

function FrozenColumnsTable() {
  const [customers2, setCustomers2] = useState<Demo.Customer[]>([]);

  const dateBodyTemplate = useCallback((rowData: Demo.Customer) => {
    return rowData.date.toDateString();
  }, []);

  const statusBodyTemplate = useCallback((rowData: Demo.Customer) => {
    return (
      <span className={`customer-badge status-${rowData.status}`}>
        {rowData.status}
      </span>
    );
  }, []);

  const balanceTemplate = useCallback((rowData: Demo.Customer) => {
    return (
      <div>
        <span className='text-bold'>
          {formatCurrency(rowData.balance as number)}
        </span>
      </div>
    );
  }, []);

  const column: ColumnProps[] = useMemo(() => {
    return [
      {
        header: 'Name',
        field: 'name',
        className: 'font-bold'
      },
      {
        header: 'Id',
        field: 'id'
      },
      {
        header: 'Country',
        field: 'country.name'
      },
      {
        header: 'Date',
        field: 'date',
        body: dateBodyTemplate
      },
      {
        header: 'Company',
        field: 'company'
      },
      {
        header: 'Status',
        field: 'status',
        body: statusBodyTemplate
      },
      {
        header: 'Activity',
        field: 'activity'
      },
      {
        header: 'Representative',
        field: 'representative.name'
      },
      {
        header: 'Balance',
        field: 'balance',
        body: balanceTemplate
      }
    ];
  }, [balanceTemplate, dateBodyTemplate, statusBodyTemplate]);

  const getCustomers = useCallback((data: Demo.Customer[]) => {
    return [...(data || [])].map(d => {
      d.date = new Date(d.date);
      return d;
    });
  }, []);
  useEffect(() => {
    CustomerService.getCustomersLarge().then(data => {
      setCustomers2(getCustomers(data));
    });
  }, [getCustomers]);

  return (
    <div className='card'>
      <h5>Frozen Columns</h5>
      <Table
        value={customers2}
        column={column}
        paginator
        rows={30}
        scrollable
        scrollHeight='400px'
        className='mt-3'
      />
    </div>
  );
}

export default FrozenColumnsTable;
