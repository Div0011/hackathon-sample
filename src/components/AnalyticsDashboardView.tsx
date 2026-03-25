import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  ScatterChart, Scatter, ZAxis, Cell
} from 'recharts';

interface AnalyticsDashboardViewProps {
  onNavigate?: (view: any) => void;
}

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

export const AnalyticsDashboardView: React.FC<AnalyticsDashboardViewProps> = () => {
  return (
    <section className="relative min-h-screen w-full pt-48 pb-32 px-12 overflow-hidden bg-[#fffdf2]">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h1 
           initial={{ x: -50, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           className="text-7xl md:text-9xl font-black italic tracking-tighter text-stroke mb-20 lowercase"
        >
           neural <span className="bg-[#ffb703] not-italic px-6 text-black">analytics//</span>
        </motion.h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Line Chart */}
          <div className="bg-white border-4 border-black p-10 shadow-[15px_15px_0px_#000] h-[450px]">
            <h3 className="text-xl font-black mb-8 italic border-b-4 border-black pb-4 uppercase">User Velocity //</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" stroke="#000" strokeWidth={2} />
                <YAxis stroke="#000" strokeWidth={2} />
                <Tooltip 
                  contentStyle={{ background: '#fff', border: '4px solid #000', borderRadius: '0px', fontWeight: 'bold' }}
                />
                <Line type="stepAfter" dataKey="growth" stroke="#e63946" strokeWidth={6} dot={{ fill: '#000', r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white border-4 border-black p-10 shadow-[15px_15px_0px_#000] h-[450px]">
            <h3 className="text-xl font-black mb-8 italic border-b-4 border-black pb-4 uppercase">Sync Density //</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" stroke="#000" strokeWidth={2} />
                <YAxis stroke="#000" strokeWidth={2} />
                <Bar dataKey="value" fill="#ffb703" stroke="#000" strokeWidth={2} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Bubble Chart */}
          <div className="bg-white border-4 border-black p-10 shadow-[20px_20px_0px_#000] h-[500px] col-span-1 lg:col-span-2">
            <div className="flex justify-between items-center mb-10">
               <h3 className="text-xl font-black italic border-b-4 border-black pb-4 uppercase">Cluster Distribution //</h3>
               <div className="bg-black text-white px-4 py-1 text-xs font-black">MODE: VINTAGE_SCAN</div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid stroke="#eee" />
                <XAxis type="number" dataKey="x" name="Density" stroke="#000" strokeWidth={2} />
                <YAxis type="number" dataKey="y" name="Velocity" stroke="#000" strokeWidth={2} />
                <ZAxis type="number" dataKey="z" range={[100, 800]} name="Volume" />
                <Tooltip cursor={{ strokeDasharray: '4 4', stroke: '#000' }} />
                <Scatter name="Clusters" data={bubbleData}>
                  {bubbleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#e63946' : '#219ebc'} stroke="#000" strokeWidth={2} />
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
