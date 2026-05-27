import React from 'react';
import { AttitudeState, ReframedThought } from '../types';
import { Sparkles, Trash2, Heart, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  state: AttitudeState;
  onChange: (updated: AttitudeState) => void;
}

export default function AttitudeStep({ state, onChange }: Props) {

  const addThought = () => {
    onChange({
      ...state,
      thoughts: [
        ...(state.thoughts || []),
        { negative: '', positive: '' }
      ]
    });
  };

  const updateThought = (index: number, field: keyof ReframedThought, value: string) => {
    const updatedThoughts = [...(state.thoughts || [])];
    updatedThoughts[index] = {
      ...updatedThoughts[index],
      [field]: value
    };
    onChange({
      ...state,
      thoughts: updatedThoughts
    });
  };

  const deleteThought = (index: number) => {
    onChange({
      ...state,
      thoughts: (state.thoughts || []).filter((_, i) => i !== index)
    });
  };

  const updateReframeText = (reframe: string) => {
    onChange({
      ...state,
      reframe
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
        <div>
          <h3 className="font-serif text-2xl font-bold text-stone-900 mb-1 flex items-center gap-2">
            <Heart className="w-5.5 h-5.5 text-pink-700" />
            Renovación Mental e Inteligencia Afectiva
          </h3>
          <p className="text-stone-500 text-sm">
            Los problemas son circunstancias; la actitud es el color de los lentes con los que eliges interpretarlos. Reencuadra quejas recurrentes en afirmaciones pro-propósito.
          </p>
        </div>

        {/* Thoughts Deck */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {(state.thoughts || []).map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-5 border border-stone-200 bg-stone-50/20 rounded-xl space-y-3 relative group"
              >
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => deleteThought(idx)}
                    className="p-1.5 hover:bg-rose-50 text-stone-400 hover:text-rose-600 rounded transition-all cursor-pointer"
                    title="Eliminar patrón"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-rose-800 uppercase tracking-widest block">Pensamiento Limitante / Queja</span>
                    <textarea
                      value={t.negative}
                      onChange={(e) => updateThought(idx, 'negative', e.target.value)}
                      rows={2}
                      placeholder="Ej: Odio mi trabajo actual, es insoportable soportar a mi jefe cada mañana."
                      className="w-full bg-white text-xs border border-stone-200 rounded-lg p-2.5 outline-none focus:border-stone-400 resize-none font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-teal-800 uppercase tracking-widest block">Reencuadre Constructivo / Oportunidad</span>
                    <textarea
                      value={t.positive}
                      onChange={(e) => updateThought(idx, 'positive', e.target.value)}
                      rows={2}
                      placeholder="Ej: Mi trabajo actual financia mi sustento y me enseña templanza de carácter mientras construyo mi propio camino tecnológico."
                      className="w-full bg-emerald-50/10 focus:bg-white text-xs border border-emerald-150 rounded-lg p-2.5 outline-none focus:border-emerald-600 resize-none font-medium text-emerald-950"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {(state.thoughts || []).length === 0 && (
            <div className="text-center py-8 border border-dashed border-stone-200 rounded-xl bg-stone-50/10">
              <span className="text-4xl">🧠</span>
              <p className="text-stone-450 mt-1 text-sm italic">No has agregado patrones de reencuadres mentales.</p>
            </div>
          )}
        </div>

        <div className="flex justify-start">
          <button
            type="button"
            onClick={addThought}
            className="px-4 py-2 bg-pink-50 hover:bg-pink-100 text-pink-900 border border-pink-100 text-sm font-semibold rounded-full shadow-sm transition-all inline-flex items-center gap-1 cursor-pointer"
          >
            + Agregar Patrón de Pensamiento
          </button>
        </div>

        <div className="divider"></div>

        {/* Declaration area */}
        <div className="space-y-2">
          <h4 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-1.5">
            <Smile className="w-5 h-5 text-pink-700" />
            Mi Declaración de Actitud Frente al Desafío
          </h4>
          <p className="text-stone-500 text-xs">Redacta una regla mental sagrada que dirija tu respuesta cuando surjan adversidades o imprevistos.</p>
          <textarea
            value={state.reframe}
            onChange={(e) => updateReframeText(e.target.value)}
            rows={4}
            placeholder="Cuando enfrente un obstáculo hoy, no voy a quejarme. Me detendré, respiraré hondo, recordaré que soy un solucionador y buscaré tres alternativas antes de reaccionar emocionalmente..."
            className="w-full text-sm leading-relaxed border border-stone-200 p-4 rounded-xl text-stone-850 font-medium focus:border-pink-600 focus:ring-1 focus:ring-pink-100"
          />
        </div>

      </div>
    </div>
  );
}
