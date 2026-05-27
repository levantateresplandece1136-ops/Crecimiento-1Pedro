import React from 'react';
import { ActionsState, ActionItem } from '../types';
import { Sparkles, CheckSquare, Plus, Trash2, Shield, CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  state: ActionsState;
  onChange: (updated: ActionsState) => void;
}

export default function ActionsStep({ state, onChange }: Props) {

  const addAction = (type: 'today' | 'daily') => {
    // Max 3 today actions to keep hyper-focus
    if (type === 'today' && (state.today || []).length >= 3) {
      alert('Se recomienda limitar las acciones diarias a 3 para mantener un enfoque absoluto de alta efectividad.');
      return;
    }

    const text = prompt(
      type === 'today'
        ? '¿Qué acción de alto impacto vas a realizar hoy?'
        : '¿Qué compromiso recurrente diario vas a contraer?'
    );

    if (!text || !text.trim()) return;

    const newItem: ActionItem = {
      id: Date.now(),
      text: text.trim(),
      done: false
    };

    onChange({
      ...state,
      [type]: [...(state[type] || []), newItem]
    });
  };

  const toggleAction = (type: 'today' | 'daily', id: number) => {
    const updatedList = (state[type] || []).map((item) => {
      if (item.id === id) return { ...item, done: !item.done };
      return item;
    });

    onChange({
      ...state,
      [type]: updatedList
    });
  };

  const deleteAction = (type: 'today' | 'daily', id: number) => {
    onChange({
      ...state,
      [type]: (state[type] || []).filter((item) => item.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
        
        {/* Reflexive frame */}
        <div className="p-5 border-l-4 border-emerald-800 bg-emerald-50/20 rounded-r-xl space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800">Pregunta de Poder Diaria</span>
          <h4 className="font-serif text-lg md:text-xl font-bold text-stone-900 italic leading-snug">
            "¿Qué puedo hacer HOY que, al estar hecho, hará que todo lo demás sea más fácil o innecesario?"
          </h4>
          <p className="text-stone-500 text-xs">
            La disciplina no es hacer mil cosas. Es hacer la única cosa correcta que abre el camino a tus propósitos.
          </p>
        </div>

        {/* Triple Action Column */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-1.5">
                <CalendarDays className="w-5 h-5 text-emerald-800" />
                Mis 3 Acciones Clave de Hoy
              </h4>
              <p className="text-stone-450 text-xs">Limítate a un máximo de 3 para asegurar enfoque absoluto e impacto real.</p>
            </div>
            
            {(state.today || []).length < 3 && (
              <button
                type="button"
                onClick={() => addAction('today')}
                className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-full text-xs shadow-sm transition-all inline-flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Nueva Acción
              </button>
            )}
          </div>

          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {(state.today || []).map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`flex items-center justify-between p-3.5 border rounded-xl shadow-sm transition-all ${
                    item.done
                      ? 'bg-stone-50 border-stone-150 text-stone-400'
                      : 'bg-white border-stone-200 hover:border-emerald-300'
                  }`}
                >
                  <div
                    onClick={() => toggleAction('today', item.id)}
                    className="flex items-start gap-3 cursor-pointer flex-1 select-none mr-4"
                  >
                    <input
                      type="checkbox"
                      checked={item.done}
                      readOnly
                      className="accent-emerald-750 mt-1 cursor-pointer"
                    />
                    <span className={`text-sm ${item.done ? 'line-through' : 'font-semibold text-stone-850'}`}>
                      {item.text}
                    </span>
                  </div>

                  <button
                    onClick={() => deleteAction('today', item.id)}
                    className="p-1 hover:bg-stone-100 text-stone-400 hover:text-stone-650 rounded cursor-pointer"
                    title="Eliminar tarea"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {(state.today || []).length === 0 && (
              <div className="text-center py-6 border border-dashed border-stone-200 rounded-xl bg-stone-50/10">
                <span className="text-2xl">📋</span>
                <p className="text-stone-450 mt-1 text-sm italic">Define tus 3 objetivos prioritarios hoy.</p>
              </div>
            )}
          </div>
        </div>

        <div className="divider"></div>

        {/* Recurring Tasks Stack */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-1.5">
                <Shield className="w-5 h-5 text-emerald-800" />
                Compromisos Recurrentes de Disciplina
              </h4>
              <p className="text-stone-450 text-xs">Acciones pequeñas que se repiten con frecuencia para forjar la conducta diaria.</p>
            </div>

            <button
              type="button"
              onClick={() => addAction('daily')}
              className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-850 font-bold rounded-full text-xs transition-all inline-flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Nuevo Compromiso
            </button>
          </div>

          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {(state.daily || []).map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`flex items-center justify-between p-3 border rounded-xl transition-all ${
                    item.done
                      ? 'bg-stone-50 border-stone-150 text-stone-400'
                      : 'bg-white border-stone-200'
                  }`}
                >
                  <div
                    onClick={() => toggleAction('daily', item.id)}
                    className="flex items-center gap-2.5 cursor-pointer flex-1 select-none mr-4"
                  >
                    <input
                      type="checkbox"
                      checked={item.done}
                      readOnly
                      className="accent-emerald-750 cursor-pointer"
                    />
                    <span className={`text-xs ${item.done ? 'line-through' : 'font-medium text-stone-800'}`}>
                      {item.text}
                    </span>
                  </div>

                  <button
                    onClick={() => deleteAction('daily', item.id)}
                    className="p-1 hover:bg-stone-100 text-stone-450 hover:text-rose-600 rounded cursor-pointer"
                    title="Eliminar compromiso"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {(state.daily || []).length === 0 && (
              <div className="text-center py-6 border border-dashed border-stone-200 rounded-xl bg-stone-50/10">
                <span className="text-2xl">🔄</span>
                <p className="text-stone-455 mt-1 text-xs italic">Registra un hábito disciplinado (Ej: Levantarse a las 6:00 AM).</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
