import React, { useState } from 'react';
import { SmartGoal } from '../types';
import { LIFE_AREAS } from '../data';
import { Target, Trash2, Calendar, Pencil, LayoutGrid, CheckSquare, Plus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  goals: SmartGoal[];
  onChange: (updated: SmartGoal[]) => void;
}

export default function GoalsStep({ goals, onChange }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [area, setArea] = useState(LIFE_AREAS[0]);
  const [specific, setSpecific] = useState('');
  const [current, setCurrent] = useState(0);
  const [target, setTarget] = useState(0);
  const [unit, setUnit] = useState('');
  const [achievable, setAchievable] = useState('');
  const [related, setRelated] = useState('');
  const [deadline, setDeadline] = useState('');
  const [stepsText, setStepsText] = useState('');

  const openNewForm = () => {
    setEditingIndex(null);
    setName('');
    setArea(LIFE_AREAS[0]);
    setSpecific('');
    setCurrent(0);
    setTarget(100);
    setUnit('%');
    setAchievable('');
    setRelated('');
    setDeadline('');
    setStepsText('');
    setShowForm(true);
  };

  const openEditForm = (idx: number) => {
    const g = goals[idx];
    setEditingIndex(idx);
    setName(g.name || '');
    setArea(g.area || LIFE_AREAS[0]);
    setSpecific(g.specific || '');
    setCurrent(g.current || 0);
    setTarget(g.target || 100);
    setUnit(g.unit || '');
    setAchievable(g.achievable || '');
    setRelated(g.related || '');
    setDeadline(g.deadline || '');
    setStepsText((g.steps || []).join('\n'));
    setShowForm(true);
  };

  const saveGoal = () => {
    if (!name.trim()) return;

    const stepsArray = stepsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const goalObj: SmartGoal = {
      id: editingIndex !== null ? goals[editingIndex].id : Date.now(),
      name,
      area,
      specific,
      current,
      target,
      unit,
      achievable,
      related,
      deadline,
      steps: stepsArray,
      stepsDone: stepsArray.map((_, i) => {
        if (editingIndex !== null && goals[editingIndex].stepsDone) {
          return goals[editingIndex].stepsDone[i] || false;
        }
        return false;
      })
    };

    let updatedGoals = [...goals];
    if (editingIndex !== null) {
      updatedGoals[editingIndex] = goalObj;
    } else {
      updatedGoals.push(goalObj);
    }

    onChange(updatedGoals);
    setShowForm(false);
  };

  const deleteGoal = (idx: number) => {
    onChange(goals.filter((_, i) => i !== idx));
  };

  const toggleStepCheckbox = (goalIdx: number, stepIdx: number) => {
    const updated = [...goals];
    const goal = { ...updated[goalIdx] };
    const newStepsDone = [...(goal.stepsDone || [])];
    newStepsDone[stepIdx] = !newStepsDone[stepIdx];
    goal.stepsDone = newStepsDone;
    updated[goalIdx] = goal;
    onChange(updated);
  };

  const addVisualProgress = (goalIdx: number) => {
    const g = goals[goalIdx];
    const promptVal = prompt(`¿Cuántos ${g.unit || 'puntos'} adicionales quieres registrar? Actual: ${g.current}/${g.target}`);
    if (promptVal === null) return;
    const added = parseFloat(promptVal) || 0;
    
    const updated = [...goals];
    updated[goalIdx] = {
      ...g,
      current: Math.min(g.current + added, g.target)
    };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl font-bold text-stone-900 mb-1 flex items-center gap-2">
              <Target className="w-6 h-6 text-violet-800" />
              Ingeniería de Metas SMART
            </h3>
            <p className="text-stone-500 text-sm">
              Un sueño se vuelve un objetivo real cuando posee especificidad, medición y deadline.
            </p>
          </div>
          <button
            type="button"
            onClick={openNewForm}
            className="self-start sm:self-center px-4 py-2 bg-violet-850 hover:bg-violet-900 text-white rounded-full text-xs font-bold shadow flex items-center gap-1 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            Nueva Meta SMART
          </button>
        </div>

        {/* Goal editor form block */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-stone-50/50 p-5 rounded-xl border border-stone-200 mt-2 space-y-4 overflow-hidden"
            >
              <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                <span className="font-serif text-lg font-bold text-stone-900">
                  {editingIndex !== null ? 'Editar' : 'Componer Nueva'} Meta SMART
                </span>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-stone-400 hover:text-stone-700 text-xs font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider">Nombre de la Meta</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: Ahorrar enganche de casa o Certificarme en SQL"
                    className="w-full text-sm bg-white p-2.5 outline-none border border-stone-200 rounded-lg focus:border-violet-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider">Área de Vida Relacionada</label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full text-sm bg-white p-2.5 outline-none border border-stone-200 rounded-lg focus:border-violet-600 cursor-pointer"
                  >
                    {LIFE_AREAS.map(a => <option key={a}>{a}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider">S · ¿Qué quieres específicamente?</label>
                  <textarea
                    value={specific}
                    onChange={(e) => setSpecific(e.target.value)}
                    rows={2}
                    placeholder="Ej: Obtener el nivel B2 de inglés fluido en la prueba IELTS"
                    className="w-full text-xs bg-white p-2.5 outline-none border border-stone-200 rounded-lg focus:border-violet-600 resize-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider">M · ¿Cómo lo vas a medir?</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={current}
                      onChange={(e) => setCurrent(parseFloat(e.target.value) || 0)}
                      placeholder="Actual"
                      className="w-16 text-xs bg-white p-2.5 outline-none border border-stone-200 rounded-lg focus:border-violet-600"
                    />
                    <span className="self-center text-xs text-stone-400">de</span>
                    <input
                      type="number"
                      value={target}
                      onChange={(e) => setTarget(parseFloat(e.target.value) || 0)}
                      placeholder="Meta"
                      className="w-16 text-xs bg-white p-2.5 outline-none border border-stone-200 rounded-lg focus:border-violet-600"
                    />
                    <input
                      type="text"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      placeholder="Ud. (Ej: USD, kg, h)"
                      className="flex-1 text-xs bg-white p-2.5 outline-none border border-stone-200 rounded-lg focus:border-violet-600"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider">A + R · Alcanzable y Relevante</label>
                  <div className="grid grid-cols-1 gap-2">
                    <input
                      type="text"
                      value={achievable}
                      onChange={(e) => setAchievable(e.target.value)}
                      placeholder="¿Por qué es realista? (Ej: Dispongo de 1 hora libre al día)"
                      className="w-full text-xs bg-white p-2.5 outline-none border border-stone-200 rounded-lg focus:border-violet-600"
                    />
                    <input
                      type="text"
                      value={related}
                      onChange={(e) => setRelated(e.target.value)}
                      placeholder="¿Cómo se conecta con tu propósito? (Ej: Me dará libertad profesional)"
                      className="w-full text-xs bg-white p-2.5 outline-none border border-stone-200 rounded-lg focus:border-violet-600"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider">T · Fecha Límite (Time-bound)</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full text-sm bg-white p-2.5 outline-none border border-stone-200 rounded-lg focus:border-violet-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider">Pasos pequeñitos (Uno por línea)</label>
                <textarea
                  value={stepsText}
                  onChange={(e) => setStepsText(e.target.value)}
                  rows={3}
                  placeholder="Ej:&#15;Comprar el examen preparatorio&#15;Completar 1 módulo diario&#15;Incribirme antes de fin de mes"
                  className="w-full text-xs bg-white p-2.5 outline-none border border-stone-200 rounded-lg focus:border-violet-600 font-mono"
                />
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-stone-200 text-stone-600 rounded-full hover:bg-stone-100 text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={saveGoal}
                  className="px-5 py-2 bg-violet-850 hover:bg-violet-900 text-white rounded-full text-xs font-bold shadow-sm transition-all cursor-pointer inline-flex items-center gap-1"
                >
                  <Check className="w-4 h-4" />
                  Guardar Meta
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Goals Listing */}
        <div className="space-y-6">
          {goals.map((g, idx) => {
            const pct = g.target > 0 ? Math.min(Math.round((g.current / g.target) * 100), 100) : 0;
            
            let colorBar = 'bg-rose-500';
            if (pct >= 100) colorBar = 'bg-emerald-600';
            else if (pct >= 60) colorBar = 'bg-amber-600';
            else if (pct >= 30) colorBar = 'bg-violet-700';

            return (
              <div
                key={g.id}
                className="p-5 border border-stone-205 rounded-xl bg-white shadow-sm hover:shadow-md transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-violet-50 text-violet-800 px-2.5 py-0.5 rounded-full border border-violet-100">
                        {g.area}
                      </span>
                      {g.deadline && (
                        <span className="text-xs text-stone-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Límite: {g.deadline}
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif text-xl font-bold text-stone-900 mt-1.5 leading-tight">{g.name}</h4>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex gap-1.5 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => addVisualProgress(idx)}
                      className="px-3 py-1 bg-violet-50 hover:bg-violet-100 text-violet-800 rounded font-semibold text-xs cursor-pointer transition-all"
                    >
                      + Avance
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditForm(idx)}
                      className="p-1 hover:bg-stone-100 text-stone-400 hover:text-stone-700 rounded transition-colors cursor-pointer"
                      title="Editar meta"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteGoal(idx)}
                      className="p-1 hover:bg-rose-50 text-stone-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                      title="Eliminar meta"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Progress bar info */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-stone-500">
                    <span>Avance: {g.current} / {g.target} {g.unit}</span>
                    <span>{pct}%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div className={`h-full ${colorBar} transition-all duration-500`} style={{ width: `${pct}%` }}></div>
                  </div>
                </div>

                {/* Grid S-M-A-R */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-stone-650 text-xs">
                  <div className="p-2.5 bg-stone-50 rounded-lg">
                    <span className="font-bold text-violet-800 text-[10px] block uppercase tracking-wide">S · Específico</span>
                    <p className="mt-0.5 leading-snug">{g.specific || 'No especificado'}</p>
                  </div>
                  <div className="p-2.5 bg-stone-50 rounded-lg">
                    <span className="font-bold text-violet-800 text-[10px] block uppercase tracking-wide">M · Medible</span>
                    <p className="mt-0.5 leading-snug">Meta calculada en un total de {g.target} {g.unit || 'unidades'}.</p>
                  </div>
                  <div className="p-2.5 bg-stone-50 rounded-lg">
                    <span className="font-bold text-violet-800 text-[10px] block uppercase tracking-wide">A · Alcanzable</span>
                    <p className="mt-0.5 leading-snug">{g.achievable || 'No especificado'}</p>
                  </div>
                  <div className="p-2.5 bg-stone-50 rounded-lg">
                    <span className="font-bold text-violet-800 text-[10px] block uppercase tracking-wide">R · Conexión</span>
                    <p className="mt-0.5 leading-snug">{g.related || 'No especificado'}</p>
                  </div>
                </div>

                {/* Sub-steps checkboxes */}
                {g.steps && g.steps.length > 0 && (
                  <div className="border-t border-stone-150/80 pt-3 space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 block mb-2">Plan de pasos pequeños</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {g.steps.map((st, si) => {
                        const checked = (g.stepsDone || [])[si] || false;
                        return (
                          <div
                            key={si}
                            onClick={() => toggleStepCheckbox(idx, si)}
                            className={`flex items-center gap-2 p-2 rounded-lg border transition-all cursor-pointer ${
                              checked
                                ? 'bg-emerald-50/20 border-emerald-200/50 text-stone-400'
                                : 'bg-white border-stone-200 hover:border-stone-300 text-stone-750'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              readOnly
                              className="accent-emerald-700 cursor-pointer"
                            />
                            <span className={`text-xs select-none pr-1 truncate ${checked ? 'line-through' : 'font-medium'}`}>
                              {st}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {goals.length === 0 && (
            <div className="text-center py-12 border border-dashed border-stone-200 rounded-xl bg-stone-50/10">
              <span className="text-4xl text-stone-300">🎯</span>
              <p className="text-stone-450 mt-2 text-sm italic">Divide tu visión en metas SMART.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
