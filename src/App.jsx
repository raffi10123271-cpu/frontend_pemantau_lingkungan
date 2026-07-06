import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, RadialBarChart, RadialBar } from 'recharts';

export default function App() {
  const [temperature, setTemperature] = useState(26.4);
  const [humidity, setHumidity] = useState(47);
  const [motionStatus, setMotionStatus] = useState("Tidak ada status gerakan");
  const [fanMode, setFanMode] = useState("AUTO");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const mockData = [
      { name: '00:00', suhu: 24 },
      { name: '04:00', suhu: 25 },
      { name: '08:00', suhu: 26.4 },
      { name: '12:00', suhu: 27 },
      { name: '16:00', suhu: 25.8 },
      { name: '20:00', suhu: 24.8 },
    ];
    setChartData(mockData);
  }, []);

  const tempData = [
    { value: 100, fill: '#E2E8F0' },
    { value: temperature, fill: '#C6B1F9' }
  ];

  const humidityData = [
    { value: 100, fill: '#E2E8F0' },
    { value: humidity, fill: '#0B2914' }
  ];

  return (
    <div className="min-h-screen w-full bg-[#cbd5e1] py-10 px-4 md:px-6 font-sans overflow-x-hidden flex items-center justify-center">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mx-auto">
        
        {/* KOTAK 1: TEMPERATUR */}
        <div className="bg-white border border-gray-800 rounded-2xl p-6 min-h-[240px] flex flex-col justify-between shadow-sm">
          <h2 className="text-xl font-bold text-center text-gray-900">Temperatur</h2>
          <div className="flex flex-col items-center justify-center w-full my-auto">
            <div className="relative w-[180px] h-24 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="100%" innerRadius="90%" outerRadius="130%" barSize={12} data={tempData} startAngle={180} endAngle={0}>
                  <RadialBar dataKey="value" cornerRadius={10} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-2xl font-bold text-gray-900">{temperature}°C</div>
            </div>
            <div className="flex justify-between w-[180px] mt-2 text-xs text-gray-500 font-semibold">
              <span>0</span>
              <span>100</span>
            </div>
          </div>
        </div>

        {/* KOTAK 2: HUMIDITY */}
        <div className="bg-white border border-gray-800 rounded-2xl p-6 min-h-[240px] flex flex-col justify-between shadow-sm">
          <h2 className="text-xl font-bold text-center text-gray-900">Humidity</h2>
          <div className="flex flex-col items-center justify-center w-full my-auto">
            <div className="relative w-[180px] h-24 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="100%" innerRadius="90%" outerRadius="130%" barSize={12} data={humidityData} startAngle={180} endAngle={0}>
                  <RadialBar dataKey="value" cornerRadius={10} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-2xl font-bold text-gray-900">{humidity}%</div>
            </div>
            <div className="flex justify-between w-[180px] mt-2 text-xs text-gray-500 font-semibold">
              <span>0</span>
              <span>100</span>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: KIPAS & GERAKAN */}
        <div className="flex flex-col gap-4 justify-between h-full">
          <div className="bg-white border border-gray-800 rounded-2xl p-4 shadow-sm">
            <h2 className="text-xs font-bold text-gray-500 text-center mb-2 uppercase tracking-wider">Fan Button</h2>
            <div className="grid grid-cols-3 border border-gray-800 rounded-lg overflow-hidden">
              {['AUTO', 'ON', 'OFF'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setFanMode(mode)}
                  className={`py-2 text-xs font-bold transition-all duration-200 ${
                    fanMode === mode 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-800 rounded-2xl p-5 shadow-sm flex-1 flex flex-col justify-center min-h-[110px]">
            <h2 className="text-xs font-bold text-gray-500 text-center mb-1 uppercase tracking-wider">Status Gerakan</h2>
            <div className="text-center my-auto text-gray-700 text-sm font-semibold">{motionStatus}</div>
          </div>
        </div>

        {/* KOTAK 4: RIWAYAT KIPAS */}
        <div className="bg-white border border-gray-800 rounded-2xl p-6 min-h-[220px] flex flex-col justify-between shadow-sm">
          <h2 className="text-lg font-bold text-center text-gray-900">Riwayat Aktivitas Kipas</h2>
          <div className="text-center my-auto text-gray-400 text-xs italic">Grafik Status Kipas (ON/OFF)</div>
        </div>

        {/* KOTAK 5: RATA-RATA SUHU */}
        <div className="bg-white border border-gray-800 rounded-2xl p-6 min-h-[220px] flex flex-col justify-between shadow-sm md:col-span-2">
          <h2 className="text-lg font-bold text-center text-gray-900 mb-2">Rata-rata Suhu</h2>
          <div className="w-full h-36 mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" fontSize={10} stroke="#94a3b8" />
                <YAxis domain={[20, 30]} fontSize={10} stroke="#94a3b8" />
                <Tooltip />
                <Area type="monotone" dataKey="suhu" stroke="#475569" fill="#e2e8f0" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}