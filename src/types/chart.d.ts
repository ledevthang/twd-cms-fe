import { ChartData, ChartOptions } from 'chart.js';

export interface ChartProps {
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'polarArea' | 'radar';
  label: string;
  data: ChartData;
  options: ChartOptions;
}
