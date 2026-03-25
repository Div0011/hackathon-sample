import React from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  ScatterChart, Scatter, ZAxis, Cell
} from 'recharts';

const data = [
  { name: 'Jan', value: 400, growth: 240, density: 100 },
  { name: 'Feb', value: 300, growth: 139, density: 200 },
  { name: 'Mar', value: 200, growth: 980, density: 300 },
  { name: 'Apr', value: 278, growth: 390, density: 400 },
  { name: 'May', value: 189, growth: 480, density: 500 },
];

const bubbleData = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
];

export const AnalyticsDashboardView = () => {
  return (
    <section className="relative min-h-screen w-full pt-40 p-12 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-6xl font-bold mb-12">Neural Analytics</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Line Chart */}
          <div className="glass p-8 rounded-3xl h-[400px] border border-white/5 snow-cap">
            <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-6">User Velocity</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="name" stroke="#666" />
                <Tooltip 
                  contentStyle={{ background: '#0e0e0e', border: '1px solid #333', borderRadius: '12px' }}
                />
                <Line type="monotone" dataKey="growth" stroke="#00e3fd" strokeWidth={4} dot={{ fill: '#00e3fd' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="glass p-8 rounded-3xl h-[400px] border border-white/5 snow-cap">
            <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-6">Engagement Density</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#666" />
                <Bar dataKey="value" fill="#bc00ff" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Bubble Chart */}
          <div className="glass p-8 rounded-3xl h-[400px] border border-white/5 snow-cap col-span-1 lg:col-span-2">
            <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-6">Cluster Distribution</h3>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <XAxis type="number" dataKey="x" name="Density" stroke="#666" />
                <YAxis type="number" dataKey="y" name="Velocity" stroke="#666" />
                <ZAxis type="number" dataKey="z" range={[60, 400]} name="Volume" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Clusters" data={bubbleData} fill="#00e3fd">
                  {bubbleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#00e3fd' : '#bc00ff'} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};
