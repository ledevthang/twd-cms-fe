import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { ColumnProps } from 'primereact/column';
import { DataTableSelectionChangeEvent } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Demo } from '@/types/demo';
import { useAppDispatch } from '@/hooks/redux.hook';
import { updateDialogState } from '@/store/slices/dialogSlice';
import { ConfirmDialog, ProductDialog } from '@/components/Dialog';

import { isEmpty } from 'lodash';
import { Table } from '@/components/common';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/services/user.service';
import { QueryKeys } from '@/types/queryKey.enum';

function UserPage() {
  const dispatch = useAppDispatch();
  const toast = useRef<Toast>(null);
  const [selectedProducts, setSelectedProducts] = useState<Demo.Product[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const openNew = useCallback(() => {
    dispatch(
      updateDialogState({
        open: true,
        component: <ProductDialog />,
        minWidth: '450px',
        header: 'Product Details',
        footerLabelLeft: 'Cancel',
        footerLabelRight: 'Save'
      })
    );
  }, [dispatch]);

  const confirmDeleteProduct = useCallback(() => {
    dispatch(
      updateDialogState({
        open: true,
        component: (
          <ConfirmDialog description='Are you sure you want to delete this product!' />
        ),
        minWidth: '450px',
        header: 'Product Details',
        footerLabelLeft: 'Cancel',
        footerLabelRight: 'Save'
      })
    );
  }, [dispatch]);

  const confirmDeleteSelected = useCallback(() => {
    dispatch(
      updateDialogState({
        open: true,
        component: (
          <ConfirmDialog description='Are you sure you want to delete the selected products?' />
        ),
        minWidth: '450px',
        header: 'Confirm',
        footerLabelLeft: 'No',
        footerLabelRight: 'Yes'
      })
    );
  }, [dispatch]);

  const leftToolbar = useMemo(() => {
    return (
      <div className='my-2'>
        <Button
          label='New'
          icon='pi pi-plus'
          severity='success'
          className=' mr-2'
          onClick={openNew}
        />
        <Button
          label='Delete'
          icon='pi pi-trash'
          severity='danger'
          onClick={confirmDeleteSelected}
          disabled={isEmpty(selectedProducts)}
        />
      </div>
    );
  }, [confirmDeleteSelected, openNew, selectedProducts]);

  const rightToolbar = useMemo(() => {
    return (
      <span className='block mt-2 md:mt-0 p-input-icon-left'>
        <i className='pi pi-search' />
        <InputText
          type='search'
          onInput={e => setGlobalFilter(e.currentTarget.value)}
          placeholder='Search...'
        />
      </span>
    );
  }, [setGlobalFilter]);

  const header = useMemo(() => {
    return (
      <div className='flex flex-column md:flex-row md:justify-content-between md:align-items-center'>
        <h5 className='m-0'>Manage User</h5>
      </div>
    );
  }, []);

  const actionBodyTemplate = useCallback(() => {
    return (
      <>
        <Button
          icon='pi pi-pencil'
          rounded
          severity='success'
          className='mr-2'
        />
        <Button
          icon='pi pi-trash'
          rounded
          severity='warning'
          onClick={() => confirmDeleteProduct()}
        />
      </>
    );
  }, [confirmDeleteProduct]);

  const column: ColumnProps[] = useMemo(() => {
    return [
      {
        selectionMode: 'multiple'
      },
      {
        header: 'ID',
        field: 'id'
      },
      {
        header: 'Username',
        field: 'username'
      },
      {
        header: 'Role',
        field: 'role'
      },
      {
        body: actionBodyTemplate
      }
    ];
  }, [actionBodyTemplate]);

  const handleSelectRow = useCallback(
    (e: DataTableSelectionChangeEvent<any>) => {
      setSelectedProducts(e.value as any);
    },
    []
  );

  const { data: UserData } = useQuery({
    queryKey: [QueryKeys.user],
    queryFn: () =>
      getUsers({
        page: 1,
        limit: 10
      })
  });

  return (
    <div className='card'>
      <Toast ref={toast} />
      <Toolbar className='mb-4' left={leftToolbar} right={rightToolbar} />
      <Table
        value={UserData?.data}
        selection={selectedProducts}
        onSelectionChange={handleSelectRow}
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
        column={column}
      />
    </div>
  );
}

export default UserPage;
