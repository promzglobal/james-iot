import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { SummaryCard } from './components/SummaryCard';
import { MetricBar } from './components/MetricBar';
import { ControlItem } from './components/ControlItem';
import { ToggleSwitch } from './components/ToggleSwitch';
import { BottomNav } from './components/BottomNav';
import { AlarmPage } from './components/AlarmPage';
import { ProfilePage } from './components/ProfilePage';
import { SettingsPage } from './components/SettingsPage';
import { DeviceControl, SensorData, MacroData } from './types';
import { INITIAL_CONTROLS, INITIAL_MACROS, INITIAL_SENSORS } from './constants';
import { Coffee, Sandwich, Salad, Apple, Zap, RefreshCw } from 'lucide-react';

const App: React.FC = () => {
  const [date, setDate] = useState<string>('');
  const [sensorData, setSensorData] = useState<SensorData>(INITIAL_SENSORS);
  const [macroData, setMacroData] = useState<MacroData>(INITIAL_MACROS);
  const [controls, setControls] = useState<DeviceControl[]>(INITIAL_CONTROLS);
  const [lightOn, setLightOn] = useState<boolean>(true);
  
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [activePage, setActivePage] = useState('HOME');

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setSensorData({
        temperature: Math.floor(Math.random() * 20 + 15),
        humidity: Math.floor(Math.random() * 40 + 30),
        pressure: Math.floor(Math.random() * 100 + 950),
      });
      setMacroData({
        voltage: { current: Math.floor(Math.random() * 230), max: 240 },
        current: { current: Math.floor(Math.random() * 10), max: 15 },
        power: { current: Math.floor(Math.random() * 2000), max: 3000 },
      });
      setIsRefreshing(false);
    }, 1500);
  }, []);

  useEffect(() => {
    setDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    handleRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSend = () => {
    setIsSending(true);
    console.log("Sending data to Firebase:", { controls, lightOn });
    setTimeout(() => {
      setIsSending(false);
      alert('Data sent to IoT device successfully!');
    }, 1500);
  };

  const handleControlChange = (id: string, newValue: number) => {
    setControls(prevControls =>
      prevControls.map(control =>
        control.id === id ? { ...control, value: Math.max(0, newValue) } : control
      )
    );
  };
  
  const getIcon = (iconName: string) => {
    const iconClass = "w-6 h-6 text-[#A38ABF]";
    switch (iconName) {
      case 'Breakfast': return <Coffee className={iconClass} />;
      case 'Lunch': return <Sandwich className={iconClass} />;
      case 'Dinner': return <Salad className={iconClass} />;
      case 'Light': return <Apple className={iconClass} />;
      default: return <Zap className={iconClass} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAE7FB] to-[#C3C7F3] flex justify-center p-4 font-sans">
      <div className="w-full max-w-sm bg-[#FEFAFE]/80 backdrop-blur-sm rounded-3xl shadow-lg flex flex-col overflow-hidden">
        <main className="flex-1 p-4 space-y-4 overflow-y-auto">
          {activePage === 'HOME' && (
            <>
              <Header date={date} />
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <SummaryCard label="Temperature" value={`${sensorData.temperature}°C`} />
                <SummaryCard label="Humidity" value={`${sensorData.humidity}%`} />
                <SummaryCard label="Pressure" value={`${sensorData.pressure}hPa`} />
              </div>

              <div className="grid grid-cols-3 gap-4 py-2">
                <MetricBar label="Voltage" current={macroData.voltage.current} max={macroData.voltage.max} unit="V" />
                <MetricBar label="Current" current={macroData.current.current} max={macroData.current.max} unit="A" />
                <MetricBar label="Power" current={macroData.power.current} max={macroData.power.max} unit="W" />
              </div>

              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="w-full bg-[#E3AADD] text-white font-bold py-3 rounded-lg flex items-center justify-center transition-all hover:bg-[#D998D0] disabled:bg-[#EBC4E4] shadow-md hover:shadow-lg"
              >
                <RefreshCw className={`w-5 h-5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'REFRESHING...' : 'REFRESH'}
              </button>

              <div className="space-y-2">
                {controls.map(control => (
                  <ControlItem
                    key={control.id}
                    icon={getIcon(control.label)}
                    label={control.label}
                    value={control.value}
                    unit={control.unit}
                    onChange={(newValue) => handleControlChange(control.id, newValue)}
                  />
                ))}
                <ToggleSwitch
                  icon={getIcon('Light')}
                  label="System Power"
                  isOn={lightOn}
                  onToggle={() => setLightOn(!lightOn)}
                />
              </div>

              <button
                onClick={handleSend}
                disabled={isSending}
                className="w-full bg-[#E3AADD] text-white font-bold py-3 rounded-lg flex items-center justify-center transition-all hover:bg-[#D998D0] disabled:bg-[#EBC4E4] shadow-md hover:shadow-lg"
              >
                {isSending ? 'SENDING...' : 'SEND'}
              </button>
            </>
          )}

          {activePage === 'ALARM' && <AlarmPage />}
          {activePage === 'PROFILE' && <ProfilePage />}
          {activePage === 'SETTINGS' && <SettingsPage />}
          
        </main>
        <BottomNav activePage={activePage} onNavChange={setActivePage} />
      </div>
    </div>
  );
};

export default App;