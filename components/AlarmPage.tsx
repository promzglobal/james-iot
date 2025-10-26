import React, { useState } from 'react';
import { AlarmClock, Trash2, ChevronDown, ChevronUp, Plus, X, Save } from 'lucide-react';
import { Alarm, Recurrence } from '../types';

const initialAlarms: Alarm[] = [
  { id: '1', time: '07:00', label: 'Wake Up', enabled: true, recurrence: 'Weekdays', sound: 'Radar' },
  { id: '2', time: '12:30', label: 'Lunch Meeting', enabled: false, recurrence: 'Once', sound: 'Chimes' },
];

const alarmSounds = ['Radar', 'Chimes', 'Signal', 'Waves', 'Sonar'];
const recurrences: Recurrence[] = ['Once', 'Daily', 'Weekdays', 'Weekends'];

const AlarmItem: React.FC<{
  alarm: Alarm;
  onToggle: (id: string) => void;
  onEdit: (alarm: Alarm) => void;
  onDelete: (id: string) => void;
}> = ({ alarm, onToggle, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between bg-white/50 p-3 rounded-xl shadow-sm w-full">
      <div className="flex-grow cursor-pointer pr-4" onClick={() => onEdit(alarm)}>
        <p className={`text-2xl font-bold ${alarm.enabled ? 'text-slate-700' : 'text-slate-400'}`}>{alarm.time}</p>
        <p className={`text-sm ${alarm.enabled ? 'text-slate-600' : 'text-slate-400'}`}>{alarm.label} - <span className="text-xs">{alarm.recurrence}</span></p>
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor={`toggle-${alarm.id}`} className="flex items-center cursor-pointer">
          <div className="relative">
            <input type="checkbox" id={`toggle-${alarm.id}`} className="sr-only" checked={alarm.enabled} onChange={() => onToggle(alarm.id)} />
            <div className={`block w-12 h-6 rounded-full ${alarm.enabled ? 'bg-[#C8A8E9]' : 'bg-slate-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${alarm.enabled ? 'transform translate-x-6' : ''}`}></div>
          </div>
        </label>
        <button onClick={() => onDelete(alarm.id)} className="p-2 rounded-full text-slate-500 hover:bg-red-100 hover:text-red-600 transition-colors">
            <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

const InputField: React.FC<{label: string, name: string, type: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = ({label, name, type, value, onChange}) => (
    <div>
        <label className="text-sm font-medium text-slate-600">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-2 mt-1 bg-white/70 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#C8A8E9] focus:outline-none"
        />
    </div>
);

const SelectField: React.FC<{label: string, name: string, value: string, options: string[], onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void}> = ({label, name, value, options, onChange}) => (
     <div>
        <label className="text-sm font-medium text-slate-600">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-2 mt-1 bg-white/70 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#C8A8E9] focus:outline-none"
        >
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

export const AlarmPage: React.FC = () => {
    const [alarms, setAlarms] = useState<Alarm[]>(initialAlarms);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    
    const [editingAlarmId, setEditingAlarmId] = useState<string | null>(null);
    const [editedAlarmData, setEditedAlarmData] = useState<Omit<Alarm, 'id' | 'enabled'> | null>(null);

    const [newAlarm, setNewAlarm] = useState({
        time: '08:00',
        label: 'New Alarm',
        recurrence: 'Once' as Recurrence,
        sound: 'Radar',
    });

    const handleToggle = (id: string) => {
        const alarmToToggle = alarms.find(a => a.id === id);
        if (alarmToToggle && alarmToToggle.enabled) {
            const isCritical = /wake up|meeting/i.test(alarmToToggle.label);
            if (isCritical) {
                if (!window.confirm(`This seems like a critical alarm. Are you sure you want to disable "${alarmToToggle.label}"?`)) {
                    return;
                }
            }
        }
        setAlarms(prevAlarms => prevAlarms.map(alarm => alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm));
    };
    
    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this alarm?')) {
            setAlarms(prevAlarms => prevAlarms.filter(alarm => alarm.id !== id));
            if (id === editingAlarmId) {
                handleCancelEdit();
            }
        }
    };

    const handleStartEdit = (alarm: Alarm) => {
        setEditingAlarmId(alarm.id);
        const { id, enabled, ...editableData } = alarm;
        setEditedAlarmData(editableData);
        setShowAddForm(false);
    };

    const handleCancelEdit = () => {
        setEditingAlarmId(null);
        setEditedAlarmData(null);
    };
    
    const handleUpdateAlarm = () => {
        if (!editingAlarmId || !editedAlarmData) return;

        if (alarms.some(alarm => alarm.time === editedAlarmData.time && alarm.id !== editingAlarmId)) {
            alert(`An alarm for ${editedAlarmData.time} already exists. Please choose a different time.`);
            return;
        }
        
        setAlarms(prevAlarms => prevAlarms.map(alarm =>
            alarm.id === editingAlarmId
                ? { ...alarm, ...editedAlarmData }
                : alarm
        ));
        handleCancelEdit();
    };
    
    const handleAddAlarm = () => {
        if (!newAlarm.time || !newAlarm.label) {
            alert('Please fill in both time and label for the new alarm.');
            return;
        }

        if (alarms.some(alarm => alarm.time === newAlarm.time)) {
            alert(`An alarm for ${newAlarm.time} already exists. Please choose a different time.`);
            return;
        }

        const alarmToAdd: Alarm = {
            id: new Date().toISOString(),
            ...newAlarm,
            enabled: true,
        };
        setAlarms(prevAlarms => [...prevAlarms, alarmToAdd]);
        setShowAddForm(false);
        setShowAdvanced(false);
        setNewAlarm({
            time: '08:00',
            label: 'New Alarm',
            recurrence: 'Once' as Recurrence,
            sound: 'Radar',
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewAlarm(prev => ({ ...prev, [name]: value }));
    };

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedAlarmData(prev => prev ? { ...prev, [name]: value as Recurrence } : null);
    };

    return (
        <div className="flex flex-col h-full text-slate-700">
            <div className="flex justify-between items-center mb-6">
                 <h1 className="text-2xl font-bold text-center flex-1">Alarms</h1>
                 <button 
                    onClick={() => setShowAddForm(!showAddForm)} 
                    disabled={editingAlarmId !== null}
                    className="p-2 rounded-full bg-[#E3AADD] text-white hover:bg-[#D998D0] transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                    {showAddForm ? <X size={20}/> : <Plus size={20} />}
                 </button>
            </div>
            
            {showAddForm && (
                <div className="bg-white/50 rounded-xl shadow-sm p-4 mb-4 space-y-3">
                    <h2 className="text-lg font-semibold">Add New Alarm</h2>
                    <InputField label="Time" name="time" type="time" value={newAlarm.time} onChange={handleInputChange} />
                    <InputField label="Label" name="label" type="text" value={newAlarm.label} onChange={handleInputChange} />
                    
                    <button onClick={() => setShowAdvanced(!showAdvanced)} className="text-sm font-semibold text-[#C8A8E9] flex items-center">
                        Advanced Options {showAdvanced ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
                    </button>
                    
                    {showAdvanced && (
                        <div className="space-y-3 pt-2 border-t border-slate-200">
                           <SelectField label="Recurrence" name="recurrence" value={newAlarm.recurrence} options={recurrences} onChange={handleInputChange} />
                           <SelectField label="Sound" name="sound" value={newAlarm.sound} options={alarmSounds} onChange={handleInputChange} />
                        </div>
                    )}

                    <button onClick={handleAddAlarm} className="w-full mt-2 py-2 bg-[#C8A8E9] text-white font-bold rounded-lg shadow-md hover:bg-[#B794E0] transition-colors">
                        Save Alarm
                    </button>
                </div>
            )}

            {alarms.length > 0 ? (
                <div className="flex-1 space-y-2 overflow-y-auto">
                    {alarms.map(alarm => (
                        editingAlarmId === alarm.id && editedAlarmData ? (
                            <div key={alarm.id} className="bg-white/50 rounded-xl shadow-sm p-4 mb-4 space-y-3 border-2 border-[#C8A8E9]">
                                <h2 className="text-lg font-semibold">Edit Alarm</h2>
                                <InputField label="Time" name="time" type="time" value={editedAlarmData.time} onChange={handleEditInputChange} />
                                <InputField label="Label" name="label" type="text" value={editedAlarmData.label} onChange={handleEditInputChange} />
                                <div className="space-y-3 pt-2 border-t border-slate-200">
                                   <SelectField label="Recurrence" name="recurrence" value={editedAlarmData.recurrence} options={recurrences} onChange={handleEditInputChange} />
                                   <SelectField label="Sound" name="sound" value={editedAlarmData.sound} options={alarmSounds} onChange={handleEditInputChange} />
                                </div>
                                <div className="flex items-center justify-between mt-4 space-x-2">
                                    <button onClick={() => handleDelete(alarm.id)} className="p-2 rounded-full text-slate-500 hover:bg-red-100 hover:text-red-600 transition-colors">
                                        <Trash2 size={20} />
                                    </button>
                                    <div className="flex items-center space-x-2">
                                        <button onClick={handleCancelEdit} className="px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition-colors">Cancel</button>
                                        <button onClick={handleUpdateAlarm} className="px-4 py-2 bg-[#C8A8E9] text-white font-bold rounded-lg shadow-md hover:bg-[#B794E0] transition-colors flex items-center">
                                            <Save size={16} className="mr-2"/> Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                           <AlarmItem key={alarm.id} alarm={alarm} onToggle={handleToggle} onEdit={handleStartEdit} onDelete={handleDelete} />
                        )
                    ))}
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center bg-white/50 rounded-xl shadow-sm p-6 space-y-4">
                    <AlarmClock size={64} className="text-[#C8A8E9]" />
                    <h2 className="text-xl font-semibold">No Alarms Set</h2>
                    <p className="text-slate-500 text-center max-w-xs">You can set alarms to be notified about important sensor readings or device states.</p>
                </div>
            )}
        </div>
    );
};