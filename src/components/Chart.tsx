import React from 'react';
import { Chart } from 'primereact/chart';
import { ChartProps } from '@/types/chart';

const BarChart = ({ data, options, type, label }: ChartProps) => {
  return (
    <div className='grid p-fluid'>
      <div className='card'>
        <h5>{label}</h5>
        <Chart type={type} data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
