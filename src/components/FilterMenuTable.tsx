import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Table } from '@/components/common';
import { Demo } from '@/types/demo';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import {
  ColumnFilterElementTemplateOptions,
  ColumnProps
} from 'primereact/column';
import { CustomerService } from '@/_mock/service/CustomerService';
import { formatDate } from '@/utils/date';
import { formatCurrency } from '@/utils/formatNumber';
import { ProgressBar } from 'primereact/progressbar';
import { classNames } from 'primereact/utils';
import { Calendar } from 'primereact/calendar';
import { Slider } from 'primereact/slider';
import { Dropdown } from 'primereact/dropdown';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';

function FilterMenuTable() {
  const [customers1, setCustomers1] = useState<Demo.Customer[]>([]);

  const renderHeader = useMemo(() => {
    return (
      <div className='flex justify-content-between'>
        <Button
          type='button'
          icon='pi pi-filter-slash'
          label='Clear'
          outlined
        />
        <span className='p-input-icon-left'>
          <i className='pi pi-search' />
          <InputText placeholder='Keyword Search' />
        </span>
      </div>
    );
  }, []);

  const dateBodyTemplate = useCallback((rowData: Demo.Customer) => {
    return formatDate(rowData.date);
  }, []);

  const dateFilterTemplate = useCallback(
    (options: ColumnFilterElementTemplateOptions) => {
      return (
        <Calendar
          value={options.value}
          onChange={e => options.filterCallback(e.value, options.index)}
          dateFormat='mm/dd/yy'
          placeholder='mm/dd/yyyy'
          mask='99/99/9999'
        />
      );
    },
    []
  );

  const balanceBodyTemplate = useCallback((rowData: Demo.Customer) => {
    return formatCurrency(rowData.balance as number);
  }, []);

  const statusBodyTemplate = useCallback((rowData: Demo.Customer) => {
    return (
      <span className={`customer-badge status-${rowData.status}`}>
        {rowData.status}
      </span>
    );
  }, []);

  const statuses = useMemo(() => {
    return [
      'unqualified',
      'qualified',
      'new',
      'negotiation',
      'renewal',
      'proposal'
    ];
  }, []);

  const statusItemTemplate = useCallback((option: React.ReactNode) => {
    return <span className={`customer-badge status-${option}`}>{option}</span>;
  }, []);

  const statusFilterTemplate = useCallback(
    (options: ColumnFilterElementTemplateOptions) => {
      return (
        <Dropdown
          value={options.value}
          options={statuses}
          onChange={e => options.filterCallback(e.value, options.index)}
          itemTemplate={statusItemTemplate}
          placeholder='Select a Status'
          className='p-column-filter'
          showClear
        />
      );
    },
    [statusItemTemplate, statuses]
  );

  const activityBodyTemplate = useCallback((rowData: Demo.Customer) => {
    return (
      <ProgressBar
        value={rowData.activity}
        showValue={false}
        style={{ height: '.5rem' }}
      ></ProgressBar>
    );
  }, []);

  const activityFilterTemplate = useCallback(
    (options: ColumnFilterElementTemplateOptions) => {
      return (
        <React.Fragment>
          <Slider
            value={options.value}
            onChange={e => options.filterCallback(e.value)}
            range
            className='m-3'
          ></Slider>
          <div className='flex align-items-center justify-content-between px-2'>
            <span>{options.value ? options.value[0] : 0}</span>
            <span>{options.value ? options.value[1] : 100}</span>
          </div>
        </React.Fragment>
      );
    },
    []
  );

  const verifiedBodyTemplate = useCallback((rowData: Demo.Customer) => {
    return (
      <i
        className={classNames('pi', {
          'text-green-500 pi-check-circle': rowData.verified,
          'text-pink-500 pi-times-circle': !rowData.verified
        })}
      ></i>
    );
  }, []);

  const verifiedFilterTemplate = useCallback(
    (options: ColumnFilterElementTemplateOptions) => {
      return (
        <div className='w-full text-center'>
          <TriStateCheckbox
            value={options.value}
            onChange={e => options.filterCallback(e.value)}
          />
        </div>
      );
    },
    []
  );

  const column: ColumnProps[] = useMemo(() => {
    return [
      {
        header: 'Name',
        field: 'name',
        filter: true,
        filterPlaceholder: 'Search by name',
        sortable: true
      },
      {
        header: 'Country',
        field: 'country.name',
        filterField: 'country.name',
        filter: true,
        filterPlaceholder: 'Search by country'
      },
      {
        header: 'Agent',
        filterField: 'representative',
        field: 'representative.name',
        filter: true
      },
      {
        header: 'Date',
        filterField: 'date',
        dataType: 'date',
        filter: true,
        filterElement: dateFilterTemplate,
        body: dateBodyTemplate
      },
      {
        header: 'Balance',
        filterField: 'balance',
        dataType: 'numeric',
        filter: true,
        body: balanceBodyTemplate
      },
      {
        header: 'Status',
        field: 'status',
        filter: true,
        filterElement: statusFilterTemplate,
        body: statusBodyTemplate
      },
      {
        field: 'activity',
        header: 'Activity',
        showFilterMatchModes: false,
        style: { minWidth: '10rem' },
        body: activityBodyTemplate,
        filter: true,
        filterElement: activityFilterTemplate
      },
      {
        header: 'Verified',
        field: 'verified',
        dataType: 'boolean',
        filter: true,
        body: verifiedBodyTemplate,
        filterElement: verifiedFilterTemplate,
        className: 'text-center',
        alignHeader: 'center',
        style: { maxWidth: '6rem' }
      }
    ];
  }, [
    activityBodyTemplate,
    activityFilterTemplate,
    balanceBodyTemplate,
    dateBodyTemplate,
    dateFilterTemplate,
    statusBodyTemplate,
    statusFilterTemplate,
    verifiedBodyTemplate,
    verifiedFilterTemplate
  ]);

  const getCustomers = (data: Demo.Customer[]) => {
    return [...(data || [])].map(d => {
      d.date = new Date(d.date);
      return d;
    });
  };

  useEffect(() => {
    CustomerService.getCustomersLarge().then(data => {
      setCustomers1(getCustomers(data));
    });
  }, []);

  return (
    <div className='card'>
      <h5>Filter Menu</h5>
      <Table
        value={customers1}
        column={column}
        paginator
        className='p-datatable-gridlines'
        showGridlines
        rows={10}
        dataKey='id'
        filterDisplay='menu'
        responsiveLayout='scroll'
        emptyMessage='No customers found.'
        header={renderHeader}
      />
    </div>
  );
}

export default FilterMenuTable;
