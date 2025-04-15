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
} from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

// Mock data for the chart
const data = [
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

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--primary))",
  },
};

const PerformanceChart: React.FC = () => {
  return (
    <Card className="w-full rounded-xl shadow-md overflow-hidden">
      <CardHeader className="flex items-center justify-between p-4 pb-1">
        <CardTitle className="text-lg font-semibold tracking-tighter">Performance</CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex justify-center">
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <LineChart data={data}>
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

export default function PerformancePage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Performance</h1>
      <PerformanceChart />
    </div>
  );
}
