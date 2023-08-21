
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from "faker"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options:any = {
  responsive: true,
  scales:{
 
    yAxes: [
      {
        beginAtZero: false,
        ticks: {
          min: 0,
          max: 8,
          stepSize:1
        }
      }
    ]
  },
  plugins: {
    legend: {
      position: 'top' as const,

    },
    title: {
      display: true,
      text: 'Date',
      position: 'bottom' as const,
    },
    tooltip: {
      enabled: true
    }
  },
  animations: {
    radius: {
      duration: 400,
      easing: 'linear',
      loop: (context: any) => context.active
    }
  },
  hoverRadius: 12,
  hoverBackgroundColor: 'yellow',
  interaction: {
    mode: "nearest",
    intersect: false,
    axis: 'x'
  },
};



const labels = [   "Jan",
"Feb",
"Mar",
"Apr",
"May",
"Jun",
"Jul",
"Aug",
"Sept",
"Oct",
"Nov",
"Dec"];

export const data = {
  labels,
  datasets: [
    {
      label: 'Total Contribution',
      data: [0, 1.5, 4,5,3.7,6,3,4.5, 2],
      borderColor: 'rgba(27, 89, 248, 1)',
      backgroundColor: 'rgba(27, 89, 248, 1)',
      lineTension: 0.8,
      tension: 1,
    }
  ],
};

export function ChartData() {
  return (
    <section className=''>
      <br />
      
      <div className='md:flex items-center gap-5 '>
      <h2 className='cursor-pointer'>SOL</h2>
      <Line options={options} data={data}  />
      </div>
    </section>
  )
}

