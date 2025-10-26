
import { SensorData, MacroData, DeviceControl } from './types';

export const INITIAL_SENSORS: SensorData = {
  temperature: 21,
  humidity: 45,
  pressure: 1012,
};

export const INITIAL_MACROS: MacroData = {
  voltage: { current: 230, max: 240 },
  current: { current: 5, max: 15 },
  power: { current: 1150, max: 3000 },
};

export const INITIAL_CONTROLS: DeviceControl[] = [
  { id: 'fan', label: 'Fan Speed', value: 44, unit: 'RPM', icon: 'Breakfast' },
  { id: 'light', label: 'Light Intensity', value: 60, unit: 'Lux', icon: 'Lunch' },
  { id: 'motor', label: 'Motor Speed', value: 75, unit: '%', icon: 'Dinner' },
];
