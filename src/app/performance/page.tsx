'use client';

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

// Import recharts components
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

// Mock data for the charts
const lineData = [
  {name: 'Jan', value: 2400},
  {name: 'Feb', value: 1398},
  {name: 'Mar', value: 9800},
  {name: 'Apr', value: 3908},
  {name: 'May', value: 4800},
  {name: 'Jun', value: 3800},
  {name: 'Jul', value: 4300},
    {name: 'Aug', value: 5400},
    {name: 'Sep', value: 3200},
    {name: 'Oct', value: 6700},
    {name: 'Nov', value: 2100},
    {name: 'Dec', value: 7800},
];

const barData = [
  {name: 'BTC', value: 2400},
  {name: 'ETH', value: 1398},
  {name: 'LTC', value: 5000},
  {name: 'XRP', value: 3908},
  {name: 'ADA', value: 4800},
  {name: 'DOT', value: 3800},
];

const pieData = [
  {name: 'BTC', value: 400},
  {name: 'ETH', value: 300},
  {name: 'LTC', value: 300},
  {name: 'XRP', value: 200},
];

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--primary))",
  },
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PerformanceLineChart: React.FC = () => {
  return (
    <Card className="w-full rounded-xl shadow-md overflow-hidden">
      <CardHeader className="flex items-center justify-between p-4 pb-1">
        <CardTitle className="text-lg font-semibold tracking-tighter">Performance Over Time</CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex justify-center">
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))"/>
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <ChartTooltip>
              <ChartTooltipContent />
            </ChartTooltip>
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

const AssetAllocationBarChart: React.FC = () => {
  return (
    <Card className="w-full rounded-xl shadow-md overflow-hidden">
      <CardHeader className="flex items-center justify-between p-4 pb-1">
        <CardTitle className="text-lg font-semibold tracking-tighter">Asset Allocation</CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex justify-center">
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))"/>
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip />
            <Bar dataKey="value" fill="hsl(var(--primary))" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

const PortfolioCompositionPieChart: React.FC = () => {
  return (
    <Card className="w-full rounded-xl shadow-md overflow-hidden">
      <CardHeader className="flex items-center justify-between p-4 pb-1">
        <CardTitle className="text-lg font-semibold tracking-tighter">Portfolio Composition</CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex justify-center">
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default function PerformancePage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Performance</h1>
      <div className="grid grid-cols-1 gap-8">
        <PerformanceLineChart />
        <AssetAllocationBarChart />
        <PortfolioCompositionPieChart />
      </div>
    </div>
  );
}

