import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  ScatterChart, Scatter, ZAxis, Cell
} from 'recharts';
import { Zap } from 'lucide-react';

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
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return (
      <section className="relative min-h-screen w-full flex items-center justify-center pt-32 pb-48 px-6 md:px-12 bg-[#fffdf2] overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:24px_24px]" />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-4xl w-full relative z-10 text-center"
        >
          <div className="bg-white border-4 md:border-8 border-black p-12 md:p-24 shadow-[20px_20px_0px_#000] md:shadow-[40px_40px_0px_#000] rotate-[-1deg]">
            <div className="w-24 h-24 bg-secondary border-4 border-black flex items-center justify-center text-white mx-auto mb-10 shadow-[8px_8px_0px_#000] rotate-[5deg]">
              <span className="font-black text-4xl leading-none">?</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black italic tracking-tighter text-stroke leading-none uppercase mb-8">
              DATA<br />RESTRICTED//
            </h1>
            
            <p className="font-black italic lowercase opacity-70 text-xl md:text-2xl mb-12 border-y-4 border-black py-8 max-w-2xl mx-auto">
              "analytics and high-level platform insights are only accessible to verified accounts. please sync your identity to proceed."
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => window.location.href = '/'} 
                className="btn-premium px-12 py-6 text-2xl italic flex items-center justify-center gap-4 shadow-[8px_8px_0px_#000]"
              >
                JOIN SCANECT <Zap size={24} />
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full pt-24 md:pt-48 pb-20 md:pb-32 px-6 md:px-12 overflow-hidden bg-[#fffdf2]">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h1 
           initial={{ x: -50, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           className="text-5xl md:text-9xl font-black italic tracking-tighter text-stroke mb-12 md:mb-20 lowercase"
        >
           platform <span className="bg-[#ffb703] not-italic px-4 md:px-6 text-black">analytics//</span>

        </motion.h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Line Chart */}
          <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[10px_10px_0px_#000] md:shadow-[15px_15px_0px_#000] h-[350px] md:h-[450px]">
            <h3 className="text-lg md:text-xl font-black mb-6 md:mb-8 italic border-b-4 border-black pb-4 uppercase">User Growth //</h3>

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
          <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[10px_10px_0px_#000] md:shadow-[15px_15px_0px_#000] h-[350px] md:h-[450px]">
            <h3 className="text-lg md:text-xl font-black mb-6 md:mb-8 italic border-b-4 border-black pb-4 uppercase">Event Density //</h3>

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
          <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[15px_15px_0px_#000] md:shadow-[20px_20px_0px_#000] h-[400px] md:h-[500px] col-span-1 lg:col-span-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-10 gap-4">
               <h3 className="text-lg md:text-xl font-black italic border-b-4 border-black pb-4 uppercase">Cluster Distribution //</h3>
               <div className="bg-black text-white px-3 md:px-4 py-1 text-[10px] md:text-xs font-black">MODE: GLOBAL_VIEW</div>

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
