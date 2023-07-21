import React from 'react';
import { Chart } from 'primereact/chart';
import {
  barData,
  barOptions,
  lineData,
  lineOptions,
  pieData,
  pieOptions,
  polarData,
  polarOptions,
  radarData,
  radarOptions
} from '@/_mock/dataChart';

const ChartPage = () => {
  return (
    <div className='grid p-fluid'>
      <div className='col-12 xl:col-6'>
        <div className='card'>
          <h5>Linear Chart</h5>
          <Chart type='line' data={lineData} options={lineOptions} />
        </div>
      </div>
      <div className='col-12 xl:col-6'>
        <div className='card'>
          <h5>Bar Chart</h5>
          <Chart type='bar' data={barData} options={barOptions} />
        </div>
      </div>
      <div className='col-12 xl:col-6'>
        <div className='card flex flex-column align-items-center'>
          <h5 className='text-left w-full'>Pie Chart</h5>
          <Chart type='pie' data={pieData} options={pieOptions} />
        </div>
      </div>
      <div className='col-12 xl:col-6'>
        <div className='card flex flex-column align-items-center'>
          <h5 className='text-left w-full'>Doughnut Chart</h5>
          <Chart type='doughnut' data={pieData} options={pieOptions} />
        </div>
      </div>
      <div className='col-12 xl:col-6'>
        <div className='card flex flex-column align-items-center'>
          <h5 className='text-left w-full'>Polar Area Chart</h5>
          <Chart type='polarArea' data={polarData} options={polarOptions} />
        </div>
      </div>
      <div className='col-12 xl:col-6'>
        <div className='card flex flex-column align-items-center'>
          <h5 className='text-left w-full'>Radar Chart</h5>
          <Chart type='radar' data={radarData} options={radarOptions} />
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
