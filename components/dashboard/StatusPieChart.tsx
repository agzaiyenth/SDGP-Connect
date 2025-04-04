
'use client'
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface Props {
    
}

const StatusPieChart = (props: Props) => {
    // Sample data for pie chart
  const statusData = [
    { name: 'Approved', value: 785, color: '#16a34a' },
    { name: 'Pending', value: 245, color: '#054afc' },
    { name: 'Rejected', value: 228, color: '#dc2626' },
  ];
    return (
        <Card className="neo-card overflow-hidden w-full h-[350px]">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Projects by Status</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              innerRadius={50}
              paddingAngle={5}
              dataKey="value"
              animationBegin={0}
              animationDuration={1500}
              className="animate-fade-in"
            >
              {statusData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke="transparent"
                  className="hover:opacity-90 transition-opacity cursor-pointer"
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px', 
                backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }} 
              itemStyle={{ color: '#fff' }}
              formatter={(value: number) => [`${value} projects`, '']}
            />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
              formatter={(value) => <span style={{ color: '#fff' }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
    )
}

export default StatusPieChart
