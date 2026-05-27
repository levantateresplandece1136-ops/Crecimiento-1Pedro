import React, { useState } from 'react';
import { AssessmentState, AreaData, BeliefItem } from '../types';
import { LIFE_AREAS } from '../data';
import { Sparkles, Trash2, HelpCircle, Check, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  state: AssessmentState;
  onChange: (updated: AssessmentState) => void;
}

export default function AssessmentStep({ state, onChange }: Props) {
  const [activeArea, setActiveArea] = useState<string | null>(null);
  
  // Temporary editor state
  const [vision, setVision] = useState('');
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState('');

  const openEditor = (area: string) => {
    setActiveArea(area);
    const existing = state.areas[area] || { score: 0, vision: '', current: '' };
    setVision(existing.vision || '');
    setScore(existing.score || 0);
    setCurrent(existing.current || '');
  };

  const saveArea = () => {
    if (!activeArea) return;
    const updatedAreas = {
      ...state.areas,
      [activeArea]: { score, vision, current }
    };
    onChange({
      ...state,
      areas: updatedAreas
    });
    setActiveArea(null);
  };

  const addBelief = () => {
    const updatedBeliefs = [
      ...state.beliefs,
      { belief: '', impact: '', reframe: '' }
    ];
    onChange({
      ...state,
      beliefs: updatedBeliefs
    });
  };

  const updateBelief = (index: number, field: keyof BeliefItem, value: string) => {
    const updatedBeliefs = [...state.beliefs];
    updatedBeliefs[index] = {
      ...updatedBeliefs[index],
      [field]: value
    };
    onChange({
      ...state,
      beliefs: updatedBeliefs
    });
  };

  const deleteBelief = (index: number) => {
    const updatedBeliefs = state.beliefs.filter((_, i) => i !== index);
    onChange({
      ...state,
      beliefs: updatedBeliefs
    });
  };

  return (
    <div className="space-y-8">
      {/* SECTION 1: AREAS ASSESSMENT */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <h3 className="font-serif text-2xl font-bold text-stone-900 mb-1 flex items-center gap-2">
          <Compass className="w-6 h-6 text-amber-700" />
          Rueda de Autoevaluación
        </h3>
        <p className="text-stone-500 text-sm mb-6">
          Haz clic en cada área para calificar tu nivel actual del 1 al 10 y definir tu visión de plenitud.
        </p>

        {/* Life areas grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {LIFE_AREAS.map((area) => {
            const data = state.areas[area] || { score: 0, vision: '', current: '' };
            const sc = data.score;
            const isEditing = activeArea === area;
            
            let scoreColor = 'text-stone-400 bg-stone-50 border-stone-200';
            if (sc >= 8) {
              scoreColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
            } else if (sc >= 5) {
              scoreColor = 'text-amber-700 bg-amber-50 border-amber-200';
            } else if (sc > 0) {
              scoreColor = 'text-rose-700 bg-rose-50 border-rose-200';
            }

            return (
              <motion.button
                key={area}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openEditor(area)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all ${
                  isEditing 
                    ? 'border-amber-600 bg-amber-50/50 ring-2 ring-amber-600/25' 
                    : 'border-stone-200 hover:border-stone-300 bg-stone-50/40'
                }`}
              >
                <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">{area}</span>
                <span className={`w-12 h-12 rounded-full border flex items-center justify-center font-serif text-xl font-bold transition-all ${scoreColor}`}>
                  {sc > 0 ? sc : '—'}
                </span>
                {data.vision && (
                  <span className="text-[10px] text-stone-400 mt-2 truncate max-w-full italic px-1">
                    "{data.vision}"
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Dynamic Scale Editor */}
        <AnimatePresence mode="wait">
          {activeArea && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="border border-stone-200 bg-amber-50/30 rounded-xl p-5 mt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-serif text-lg font-bold text-stone-950 flex items-center gap-1.5">
                    Configurando Área: <span className="text-amber-800">{activeArea}</span>
                  </h4>
                  <button 
                    onClick={() => setActiveArea(null)}
                    className="text-stone-450 hover:text-stone-700 text-xs font-medium cursor-pointer"
                  >
                    Cerrar
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide">
                    ¿Qué sería un 10 para ti en esta área?
                  </label>
                  <input
                    type="text"
                    value={vision}
                    onChange={(e) => setVision(e.target.value)}
                    placeholder="Ej: Conciliar el sueño sin pesadez, hacer ejercicio 4 veces por semana, estar en mi peso ideal."
                    className="w-full bg-white text-sm border border-stone-200 rounded-lg p-2.5 outline-none focus:border-amber-600"
                  />
                  <p className="text-[11px] text-stone-400 italic">Describe cómo se ve la plenitud ideal en este ámbito de tu vida.</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide">
                    Calificación actual: {score > 0 ? `${score} / 10` : 'Selecciona una'}
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setScore(num)}
                        className={`w-9 h-9 rounded-lg border text-sm font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                          score === num
                            ? 'bg-amber-700 border-amber-750 text-white shadow-sm'
                            : 'bg-white border-stone-200 hover:border-amber-400 hover:bg-amber-50 text-stone-700'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide">
                    ¿Cómo se ve tu situación actual?
                  </label>
                  <textarea
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                    rows={3}
                    placeholder="Ej: Tengo buenos hábitos alimenticios pero falta constancia. Duermo pocas horas por el estrés..."
                    className="w-full bg-white text-sm border border-stone-200 rounded-lg p-2.5 outline-none focus:border-amber-600 resize-none"
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveArea(null)}
                    className="px-4 py-2 border border-stone-200 text-stone-600 rounded-full hover:bg-stone-50 text-xs font-bold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={saveArea}
                    className="px-5 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-full text-xs font-bold shadow-sm transition-all cursor-pointer inline-flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SECTION 2: BELIEFS REFRAMING */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
        <div>
          <h3 className="font-serif text-2xl font-bold text-stone-900 mb-1 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-rose-700" />
            Creencias Limitantes y Reencuadre
          </h3>
          <p className="text-stone-500 text-sm">
            Detecta las mentiras intelectuales que te han frenado y conviértelas en afirmaciones de verdad.
          </p>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {state.beliefs.map((belief, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-5 border border-stone-200 rounded-xl space-y-3 bg-stone-50/20 relative group"
              >
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => deleteBelief(i)}
                    className="p-1.5 hover:bg-rose-550/10 text-stone-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                    title="Eliminar creencia"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1 pr-8">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-800">Creencia Limitante</span>
                  <input
                    type="text"
                    value={belief.belief}
                    onChange={(e) => updateBelief(i, 'belief', e.target.value)}
                    placeholder="Ej: No tengo tiempo para emprender o educarme."
                    className="w-full bg-white text-sm border border-stone-200 rounded-lg p-2 outline-none focus:border-stone-400 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-600 uppercase tracking-wider">Impacto Negativo</label>
                    <textarea
                      value={belief.impact}
                      onChange={(e) => updateBelief(i, 'impact', e.target.value)}
                      rows={2}
                      placeholder="Me hace procrastinar cuando tengo tiempo libre y quedarme viendo series..."
                      className="w-full bg-white text-xs border border-stone-200 rounded-lg p-2 outline-none focus:border-stone-400 resize-none text-stone-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-600 uppercase tracking-wider text-emerald-800">Verdad / Reencuadre</label>
                    <textarea
                      value={belief.reframe}
                      onChange={(e) => updateBelief(i, 'reframe', e.target.value)}
                      rows={2}
                      placeholder="Tengo el tiempo que priorizo. Si recorto 30 minutos de redes sociales, puedo leer un libro."
                      className="w-full bg-emerald-50/10 focus:bg-white text-xs border border-emerald-150/80 rounded-lg p-2 outline-none focus:border-emerald-600 resize-none text-emerald-950 font-medium"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {state.beliefs.length === 0 && (
            <div className="text-center py-8 border border-dashed border-stone-200 rounded-xl bg-stone-50/10">
              <span className="text-4xl">💭</span>
              <p className="text-stone-450 mt-2 text-sm italic">No has agregado ninguna creencia limitante aún.</p>
            </div>
          )}
        </div>

        <div className="flex justify-start">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="button"
            onClick={addBelief}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-sm font-semibold rounded-full shadow-sm hover:shadow transition-all inline-flex items-center gap-1.5 cursor-pointer"
          >
            + Agregar creencia limitante
          </motion.button>
        </div>
      </div>
    </div>
  );
}
