import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from 'primereact/button';
import { ColumnProps } from 'primereact/column';
import { DataTableSelectionChangeEvent } from 'primereact/datatable';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { Rating } from 'primereact/rating';
import { ProductService } from '@/_mock/service/ProductService';
import { Demo } from '@/types/demo';
import { formatCurrency } from '@/utils/formatNumber';
import { useAppDispatch } from '@/hooks/redux.hook';
import { updateDialogState } from '@/store/slices/dialogSlice';
import { ConfirmDialog, ProductDialog } from '@/components/Dialog';
import { Crud } from '@/components';

import { isEmpty } from 'lodash';

function CrudPage() {
  const dispatch = useAppDispatch();

  const [products, setProducts] = useState<Demo.Product[]>([]);
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
      <React.Fragment>
        <FileUpload
          mode='basic'
          accept='image/*'
          maxFileSize={1000000}
          chooseLabel='Import'
          className='mr-2 inline-block'
        />
        <Button label='Export' icon='pi pi-upload' severity='help' />
      </React.Fragment>
    );
  }, []);

  const header = useMemo(() => {
    return (
      <div className='flex flex-column md:flex-row md:justify-content-between md:align-items-center'>
        <h5 className='m-0'>Manage Products</h5>
        <span className='block mt-2 md:mt-0 p-input-icon-left'>
          <i className='pi pi-search' />
          <InputText
            type='search'
            onInput={e => setGlobalFilter(e.currentTarget.value)}
            placeholder='Search...'
          />
        </span>
      </div>
    );
  }, []);

  const priceBodyTemplate = (rowData: Demo.Product) => {
    return (
      <>
        <span className='p-column-title'>Price</span>
        {formatCurrency(rowData.price as number)}
      </>
    );
  };

  const ratingBodyTemplate = (rowData: Demo.Product) => {
    return (
      <>
        <span className='p-column-title'>Reviews</span>
        <Rating value={rowData.rating} readOnly cancel={false} />
      </>
    );
  };

  const statusBodyTemplate = (rowData: Demo.Product) => {
    return (
      <>
        <span className='p-column-title'>Status</span>
        <span
          className={`product-badge status-${rowData.inventoryStatus?.toLowerCase()}`}
        >
          {rowData.inventoryStatus?.toLowerCase()}
        </span>
      </>
    );
  };

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
        field: 'code',
        header: 'Code',
        sortable: true
      },
      {
        field: 'name',
        header: 'Name',
        sortable: true
      },
      {
        field: 'price',
        header: 'Price',
        body: priceBodyTemplate,
        sortable: true
      },
      {
        field: 'category',
        header: 'Category',
        sortable: true
      },
      {
        field: 'rating',
        header: 'Reviews',
        body: ratingBodyTemplate,
        sortable: true
      },
      {
        field: 'inventoryStatus',
        header: 'Status',
        body: statusBodyTemplate,
        sortable: true
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

  useEffect(() => {
    ProductService.getProducts().then(data => {
      setProducts(data);
    });
  }, []);

  return (
    <Crud
      data={products}
      header={header}
      leftToolbar={leftToolbar}
      rightToolbar={rightToolbar}
      columnData={column}
      selection={selectedProducts}
      onSelected={handleSelectRow}
      globalFilter={globalFilter}
    />
  );
}

export default CrudPage;
