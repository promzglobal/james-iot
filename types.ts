export interface SensorData {
  temperature: number;
  humidity: number;
  pressure: number;
}

export interface Metric {
  current: number;
  max: number;
}

export interface MacroData {
  voltage: Metric;
  current: Metric;
  power: Metric;
}

export interface DeviceControl {
  id: string;
  label: string;
  value: number;
  unit: string;
  icon: string;
}

export type Recurrence = 'Once' | 'Daily' | 'Weekdays' | 'Weekends';

export interface Alarm {
  id: string;
  time: string;
  label: string;
  enabled: boolean;
  recurrence: Recurrence;
  sound: string;
}