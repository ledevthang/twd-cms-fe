import { ChartData, ChartOptions } from 'chart.js';

const barData: ChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      label: 'My Second dataset',
      data: [28, 48, 40, 19, 86, 27, 90]
    }
  ]
};

const barOptions: ChartOptions = {
  plugins: {
    legend: {
      labels: {}
    }
  },
  scales: {
    x: {
      ticks: {
        font: {
          weight: '500'
        }
      },
      grid: {
        display: false
      },
      border: {
        display: false
      }
    },
    y: {
      ticks: {},
      grid: {},
      border: {
        display: false
      }
    }
  }
};

const pieData: ChartData = {
  labels: ['A', 'B', 'C'],
  datasets: [
    {
      data: [540, 325, 702]
    }
  ]
};

const pieOptions: ChartOptions = {
  plugins: {
    legend: {
      labels: {
        usePointStyle: true
      }
    }
  }
};

const lineData: ChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      tension: 0.4
    },
    {
      label: 'Second Dataset',
      data: [28, 48, 40, 19, 86, 27, 90],
      fill: false,
      tension: 0.4
    }
  ]
};

const lineOptions: ChartOptions = {
  plugins: {
    legend: {
      labels: {}
    }
  },
  scales: {
    x: {
      ticks: {},
      grid: {},
      border: {
        display: false
      }
    },
    y: {
      ticks: {},
      grid: {},
      border: {
        display: false
      }
    }
  }
};

const polarData: ChartData = {
  datasets: [
    {
      data: [11, 16, 7, 3],
      label: 'My dataset'
    }
  ],
  labels: ['Indigo', 'Purple', 'Teal', 'Orange']
};

const polarOptions: ChartOptions = {
  plugins: {
    legend: {
      labels: {}
    }
  },
  scales: {
    r: {
      grid: {}
    }
  }
};

const radarData: ChartData = {
  labels: [
    'Eating',
    'Drinking',
    'Sleeping',
    'Designing',
    'Coding',
    'Cycling',
    'Running'
  ],
  datasets: [
    {
      label: 'My First dataset',
      data: [65, 59, 90, 81, 56, 55, 40]
    },
    {
      label: 'My Second dataset',
      data: [28, 48, 40, 19, 96, 27, 100]
    }
  ]
};

const radarOptions: ChartOptions = {
  plugins: {
    legend: {
      labels: {}
    }
  },
  scales: {
    r: {
      grid: {}
    }
  }
};

export {
  barData,
  barOptions,
  pieData,
  pieOptions,
  lineData,
  lineOptions,
  polarData,
  polarOptions,
  radarData,
  radarOptions
};
