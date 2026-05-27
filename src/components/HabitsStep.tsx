import React from 'react';
import { HabitItem } from '../types';
import { RefreshCw, Trash2, Calendar, Smile, Plus, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  habits: HabitItem[];
  gratitude: Record<string, string[]>;
  onHabitsChange: (updated: HabitItem[]) => void;
  onGratitudeChange: (updated: Record<string, string[]>) => void;
}

export default function HabitsStep({ habits, gratitude, onHabitsChange, onGratitudeChange }: Props) {
  const todayStr = new Date().toISOString().slice(0, 10);
  const currentGratitudes = gratitude[todayStr] || ['', '', ''];

  const addHabit = () => {
    const defaultDays = 30;
    const newHabit: HabitItem = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      name: 'Nuevo hábito transformador',
      days: defaultDays,
      done: Array(defaultDays).fill(false),
      startDate: todayStr
    };
    onHabitsChange([...habits, newHabit]);
  };

  const updateHabitDays = (id: number, val: string) => {
    const parsed = parseInt(val) || 30;
    const updated = habits.map((h) => {
      if (h.id === id) {
        // Adjust elements array
        const newDone = Array(parsed).fill(false);
        h.done.forEach((status, idx) => {
          if (idx < parsed) newDone[idx] = status;
        });
        return { ...h, days: parsed, done: newDone };
      }
      return h;
    });
    onHabitsChange(updated);
  };

  const updateHabitName = (id: number, name: string) => {
    const updated = habits.map((h) => {
      if (h.id === id) return { ...h, name };
      return h;
    });
    onHabitsChange(updated);
  };

  const toggleDay = (habitId: number, dayIndex: number) => {
    const updated = habits.map((h) => {
      if (h.id === habitId) {
        const newDone = [...h.done];
        newDone[dayIndex] = !newDone[dayIndex];
        return { ...h, done: newDone };
      }
      return h;
    });
    onHabitsChange(updated);
  };

  const markToday = (habitId: number) => {
    const updated = habits.map((h) => {
      if (h.id === habitId) {
        const newDone = [...h.done];
        // Find first unchecked index to check it off as "today"
        const nextIndex = newDone.findIndex(status => !status);
        if (nextIndex !== -1) {
          newDone[nextIndex] = true;
        }
        return { ...h, done: newDone };
      }
      return h;
    });
    onHabitsChange(updated);
  };

  const deleteHabit = (id: number) => {
    onHabitsChange(habits.filter((h) => h.id !== id));
  };

  const updateGratitude = (index: number, val: string) => {
    const updatedPoints = [...currentGratitudes];
    updatedPoints[index] = val;
    onGratitudeChange({
      ...gratitude,
      [todayStr]: updatedPoints
    });
  };

  return (
    <div className="space-y-8">
      {/* SECTION 1: HABITS LIST */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl font-bold text-stone-900 mb-1 flex items-center gap-2">
              <RefreshCw className="w-5.5 h-5.5 text-blue-800" />
              Ingeniería de Hábitos Transformadores
            </h3>
            <p className="text-stone-500 text-sm">
              La voluntad es un músculo. Define hábitos ridículamente fáciles y hazlos innegociables.
            </p>
          </div>
          <button
            type="button"
            onClick={addHabit}
            className="self-start sm:self-center px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-full text-xs font-bold shadow flex items-center gap-1 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            Nuevo Hábito
          </button>
        </div>

        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {habits.map((h) => {
              const streak = h.done.filter(Boolean).length;
              return (
                <motion.div
                  key={h.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-5 border border-stone-200 bg-stone-50/20 rounded-xl space-y-4"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="space-y-1.5 flex-1 w-full">
                      <input
                        type="text"
                        value={h.name}
                        onChange={(e) => updateHabitName(h.id, e.target.value)}
                        placeholder="Escribe el nombre del hábito..."
                        className="font-serif text-lg font-bold text-stone-900 outline-none border-b border-transparent hover:border-stone-250 focus:border-blue-700 bg-transparent w-full pb-0.5"
                      />
                      <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          Iniciado: {h.startDate}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span>Compromiso:</span>
                          <select
                            value={h.days}
                            onChange={(e) => updateHabitDays(h.id, e.target.value)}
                            className="bg-white border border-stone-200 rounded px-1.5 py-0.5 outline-none font-semibold text-stone-700 focus:border-blue-700 text-[11px] cursor-pointer"
                          >
                            <option value="15">15 días</option>
                            <option value="21">21 días (Integración)</option>
                            <option value="30">30 días</option>
                            <option value="66">66 días (Automatización)</option>
                            <option value="100">100 días (Dominio)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white px-3 py-1.5 rounded-lg border border-stone-200 text-center flex-shrink-0 self-end sm:self-auto shadow-sm">
                      <div className="font-serif text-3xl font-extrabold text-blue-800 leading-none">{streak}</div>
                      <div className="text-[9px] font-extrabold uppercase tracking-wide text-stone-400 mt-1">Días Logrados</div>
                    </div>
                  </div>

                  {/* Tracking Dots Grid */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Historial de cumplimiento ({h.days} días)</span>
                    <div className="flex flex-wrap gap-[5px] p-3 bg-white rounded-lg border border-stone-150/80">
                      {h.done.map((status, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => toggleDay(h.id, idx)}
                          title={`Día ${idx + 1}`}
                          className={`w-5.5 h-5.5 rounded-full border text-[9px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                            status
                              ? 'bg-blue-800 border-blue-900 text-white shadow-sm'
                              : 'bg-stone-50 border-stone-200 hover:border-blue-400 text-stone-450'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Actions bar */}
                  <div className="flex gap-2 justify-between">
                    <button
                      type="button"
                      onClick={() => markToday(h.id)}
                      className="px-4 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold rounded-lg text-xs flex items-center gap-1 cursor-pointer transition-all"
                    >
                      ✓ Marcar Siguiente Día
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteHabit(h.id)}
                      className="p-1.5 hover:bg-rose-50 text-stone-400 hover:text-rose-600 rounded-lg cursor-pointer"
                      title="Eliminar hábito"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {habits.length === 0 && (
            <div className="text-center py-8 border border-dashed border-stone-200 rounded-xl bg-stone-50/10">
              <span className="text-4xl text-stone-300">🔄</span>
              <p className="text-stone-450 mt-2 text-sm italic">Define tu primer hábito en el botón superior.</p>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: BASE HABIT GRATITUDE */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Smile className="w-6 h-6 text-amber-500" />
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900">Hábito de Enfoque Base: Registro de Gratitud</h3>
            <p className="text-stone-500 text-xs mt-0.5">La felicidad no es tener lo que quieres — es bendecir lo que tienes hoy.</p>
          </div>
        </div>

        <div className="border border-stone-200 bg-amber-50/10 rounded-xl p-4 md:p-5 space-y-4">
          <div className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center justify-between">
            <span>Las 3 gratitudes de hoy</span>
            <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-mono text-[10px]">{todayStr}</span>
          </div>

          <div className="space-y-3.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex gap-3 items-center">
                <span className="font-serif italic font-bold text-amber-700 text-lg w-4">{i + 1}.</span>
                <input
                  type="text"
                  value={currentGratitudes[i] || ''}
                  onChange={(e) => updateGratitude(i, e.target.value)}
                  placeholder="Ej: El aroma del café de la mañana, que mi familia despertó sana..."
                  className="flex-1 bg-white border border-stone-200 rounded-lg p-2.5 text-sm font-medium outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-100"
                />
              </div>
            ))}
          </div>

          <div className="text-[10px] text-stone-400 italic flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 flex-shrink-0" />
            Ingresa estos agradecimientos cada mañana. Tu cerebro se reprogramará para buscar oportunidades en lugar de fallas.
          </div>
        </div>
      </div>
    </div>
  );
}
