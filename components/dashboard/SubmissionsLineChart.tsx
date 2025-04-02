
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

interface SubmissionsChartProps {
  data: Array<{
    name: string;
    submissions: number;
  }>;
}

const SubmissionsLineChart: React.FC<SubmissionsChartProps> = ({ data }) => {
  // Calculate the average to show as reference line
  const average = data.reduce((sum, item) => sum + item.submissions, 0) / data.length;

  return (
    <Card className="neo-card overflow-hidden w-full h-[350px]">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Submissions Over Time</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: 0,
              bottom: 5,
            }}
            className="animate-fade-in"
          >
            <defs>
              <linearGradient id="colorSubmissions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#054afc" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#054afc" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#64748b" 
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px', 
                backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }} 
              itemStyle={{ color: '#fff' }}
              labelStyle={{ color: '#64748b' }}
            />
            <ReferenceLine 
              y={average} 
              stroke="rgba(255,255,255,0.3)" 
              strokeDasharray="3 3"
              label={{ 
                position: 'right', 
                value: 'Average', 
                fill: 'rgba(255,255,255,0.6)',
                fontSize: 12 
              }} 
            />
            <Line
              type="monotone"
              dataKey="submissions"
              stroke="#054afc"
              activeDot={{ r: 6, fill: '#054afc', stroke: '#fff', strokeWidth: 2 }}
              strokeWidth={2}
              dot={{ r: 4, fill: '#054afc', stroke: '#fff', strokeWidth: 1 }}
              fillOpacity={1}
              fill="url(#colorSubmissions)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SubmissionsLineChart;
