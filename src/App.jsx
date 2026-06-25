import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, RadialBarChart, RadialBar } from 'recharts';
import './App.css'; // Kita hubungkan ke file CSS terpisah

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
  ]
  return (
    <div className="dashboard-bg">
      <div className="dashboard-container">
        
        {/* KOTAK 1: TEMPERATUR */}
        <div className="card">
          <h2 className="card-title">Temperatur</h2>
          <div className="gauge-container">
            <div className="gauge-chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="100%" innerRadius="90%" outerRadius="130%" barSize={14} data={tempData} startAngle={180} endAngle={0}>
                  <RadialBar dataKey="value" cornerRadius={10} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="gauge-value">{temperature}°C</div>
            </div>
            <div className="gauge-labels">
              <span>0</span>
              <span>100</span>
            </div>
          </div>
        </div>

        {/* KOTAK 2: HUMIDITY */}
        <div className="card">
          <h2 className="card-title">Humidity</h2>
          <div className="gauge-container">
            <div className="gauge-chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="100%" innerRadius="90%" outerRadius="130%" barSize={14} data={humidityData} startAngle={180} endAngle={0}>
                  <RadialBar dataKey="value" cornerRadius={10} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="gauge-value">{humidity}%</div>
            </div>
            <div className="gauge-labels">
              <span>0</span>
              <span>100</span>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: KIPAS & GERAKAN */}
        <div className="right-column">
          <div className="card small-card">
            <h2 className="card-sub-title">Fan Button</h2>
            <div className="btn-group">
              {['AUTO', 'ON', 'OFF'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setFanMode(mode)}
                  className={`btn ${fanMode === mode ? 'btn-active' : ''}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="card small-card flex-grow">
            <h2 className="card-sub-title">Status Gerakan</h2>
            <div className="motion-text">{motionStatus}</div>
          </div>
        </div>

        {/* KOTAK 5: RIWAYAT KIPAS */}
        <div className="card wide-card">
          <h2 className="card-title">Riwayat Aktivitas Kipas</h2>
          <div className="placeholder-text">Grafik Status Kipas (ON/OFF)</div>
        </div>

        {/* KOTAK 6: RATA-RATA SUHU */}
        <div className="card wide-card-2x">
          <h2 className="card-title">Rata-rata Suhu</h2>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={11} stroke="#718096" />
                <YAxis domain={[20, 30]} fontSize={11} stroke="#718096" />
                <Tooltip />
                <Area type="monotone" dataKey="suhu" stroke="#4a5568" fill="#cbd5e1" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}