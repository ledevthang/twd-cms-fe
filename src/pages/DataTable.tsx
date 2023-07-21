import React from 'react';
import FilterMenuTable from '@/components/FilterMenuTable';
import FrozenColumnsTable from '@/components/FrozenColumnsTable';

function DataTable() {
  return (
    <div className='grid'>
      <div className='col-12'>
        <FilterMenuTable />
      </div>
      <div className='col-12'>
        <FrozenColumnsTable />
      </div>
    </div>
  );
}

export default DataTable;
