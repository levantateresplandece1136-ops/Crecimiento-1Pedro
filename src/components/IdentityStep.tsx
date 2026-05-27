import React, { useState } from 'react';
import { IdentityState } from '../types';
import { ShieldAlert, BookOpen, Heart, Award, Sparkles, Volume2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  state: IdentityState;
  userName: string;
  onChange: (updated: IdentityState) => void;
}

export default function IdentityStep({ state, userName, onChange }: Props) {
  const [declareMode, setDeclareMode] = useState(false);
  const [breathePhase, setBreathePhase] = useState<'breathe' | 'declare' | 'hold'>('breathe');

  const updateField = (field: keyof IdentityState, value: string) => {
    onChange({
      ...state,
      [field]: value
    });
  };

  // Guide user through a mini visualization of speaking of declarations
  const startDeclarationCycle = () => {
    setDeclareMode(true);
    setBreathePhase('breathe');
    const timer1 = setTimeout(() => setBreathePhase('hold'), 4000);
    const timer2 = setTimeout(() => setBreathePhase('declare'), 7000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
        <div>
          <h3 className="font-serif text-2xl font-bold text-stone-900 mb-1 flex items-center gap-2">
            <Award className="w-6 h-6 text-rose-700" />
            Ancla tu Identidad Tridimensional
          </h3>
          <p className="text-stone-500 text-sm">
            Antes de planificar metas, ancla tu autopercepción en principios inamovibles. Tu identidad determina tus acciones.
          </p>
        </div>

        {/* Tridimensional panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Spiritual Identity */}
          <div className="p-5 rounded-xl border border-rose-150 bg-rose-50/10 space-y-3">
            <div className="flex items-center gap-2 text-rose-800 font-serif font-bold">
              <span className="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center text-xs">✝</span>
              Identidad Espiritual
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider">
                ¿Quién soy espiritualmente?
              </label>
              <textarea
                value={state.spiritual}
                onChange={(e) => updateField('spiritual', e.target.value)}
                rows={4}
                placeholder="Ej: Soy hijo de Dios, escogido y redimido. Tengo un propósito eterno y mi valor no depende de mi desempeño."
                className="w-full bg-white text-xs border border-stone-200 rounded-lg p-2.5 outline-none focus:border-rose-600 resize-none"
              />
              <p className="text-[10px] text-stone-400 italic">Identifica promesas y verdades sobre tu alma.</p>
            </div>
          </div>

          {/* Family Identity */}
          <div className="p-5 rounded-xl border border-rose-150 bg-rose-50/10 space-y-3">
            <div className="flex items-center gap-2 text-rose-800 font-serif font-bold">
              <span className="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center text-xs">👨‍👩‍👧</span>
              Identidad Familiar
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider">
                ¿Quién soy en mi hogar?
              </label>
              <textarea
                value={state.family}
                onChange={(e) => updateField('family', e.target.value)}
                rows={4}
                placeholder="Ej: Soy un líder de amor y paciencia para mis hijos y un esposo protector en quien mi pareja puede descansar plenamente."
                className="w-full bg-white text-xs border border-stone-200 rounded-lg p-2.5 outline-none focus:border-rose-600 resize-none"
              />
              <p className="text-[10px] text-stone-400 italic">Describe tu rol de valor con tus seres queridos.</p>
            </div>
          </div>

          {/* Professional/Purpose Identity */}
          <div className="p-5 rounded-xl border border-rose-150 bg-rose-50/10 space-y-3">
            <div className="flex items-center gap-2 text-rose-800 font-serif font-bold">
              <span className="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center text-xs">💼</span>
              Identidad de Propósito
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wider">
                ¿Cuál es mi llamado laboral?
              </label>
              <textarea
                value={state.professional}
                onChange={(e) => updateField('professional', e.target.value)}
                rows={4}
                placeholder="Ej: Soy un canal de crecimiento para mi comunidad, ejerciendo mi profesión con excelencia y honestidad ejemplar."
                className="w-full bg-white text-xs border border-stone-200 rounded-lg p-2.5 outline-none focus:border-rose-600 resize-none"
              />
              <p className="text-[10px] text-stone-400 italic">Declara tu talento puesto al servicio de los demás.</p>
            </div>
          </div>
        </div>

        {/* Daily Manifesto Builder */}
        <div className="border-2 border-rose-800 rounded-xl p-5 md:p-6 space-y-4 bg-stone-50/45 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-rose-100/30 blur-xl pointer-events-none"></div>
          
          <div className="flex justify-between items-start gap-4">
            <div>
              <span className="text-[10px] font-bold text-rose-800 uppercase tracking-widest bg-rose-50 px-2 py-0.5 rounded">Recomendado</span>
              <h4 className="font-serif text-xl font-bold text-stone-900 mt-1.5">Mi Declaración de Identidad</h4>
              <p className="text-stone-500 text-xs mt-0.5">Fusiona tus tres identidades en una afirmación central para leerla cada mañana en voz alta.</p>
            </div>
            <button
              type="button"
              onClick={startDeclarationCycle}
              className="px-4 py-2 bg-rose-850 hover:bg-rose-900 text-white rounded-full text-xs font-bold shadow transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0"
            >
              <Volume2 className="w-3.5 h-3.5" />
              Declarar hoy
            </button>
          </div>

          <textarea
            value={state.declaration}
            onChange={(e) => updateField('declaration', e.target.value)}
            rows={5}
            placeholder={`Yo, ${userName || '[Tu Nombre]'}, soy... estoy llamado a... y mi vida tiene un peso eterno de gloria porque...`}
            className="w-full bg-white text-sm font-medium border border-rose-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-rose-200 text-stone-850 leading-relaxed font-serif"
          />

          <div className="flex items-center gap-1.5 text-xs text-rose-800 font-semibold bg-rose-50/50 p-2.5 rounded-lg border border-rose-100 italic">
            <Sparkles className="w-4 h-4 flex-shrink-0" />
            "El cambio duradero comienza con la convicción del espíritu. Cree en la verdad sobre tu vida antes de verla manifestada."
          </div>
        </div>
      </div>

      {/* Guided spoken breathing modal overlay */}
      <AnimatePresence>
        {declareMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#FAF7F2] max-w-lg w-full rounded-2xl border border-rose-800 shadow-2xl p-6 md:p-8 text-center space-y-6 relative"
            >
              <div className="absolute top-4 right-4">
                <button
                  type="button"
                  onClick={() => setDeclareMode(false)}
                  className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center text-sm font-semibold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Breathing animations logic */}
              <div className="flex flex-col items-center space-y-2">
                <span className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">Ejercitando mi convicción</span>
                
                <AnimatePresence mode="wait">
                  {breathePhase === 'breathe' && (
                    <motion.div
                      key="breathe"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1.15 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ repeat: Infinity, duration: 4, repeatType: 'reverse' }}
                      className="w-24 h-24 rounded-full bg-rose-100 flex items-center justify-center border border-rose-200"
                    >
                      <span className="text-xs text-rose-850 font-bold">Inhala profundo</span>
                    </motion.div>
                  )}
                  {breathePhase === 'hold' && (
                    <motion.div
                      key="hold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center border border-amber-200 animate-pulse"
                    >
                      <span className="text-xs text-amber-805 font-bold">Sostén el aire</span>
                    </motion.div>
                  )}
                  {breathePhase === 'declare' && (
                    <motion.div
                      key="declare"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1.05 }}
                      exit={{ opacity: 0 }}
                      className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200"
                    >
                      <span className="text-xs text-emerald-850 font-bold">Declara en voz alta</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <p className="text-xs text-stone-500 italic max-w-xs mt-3 h-8">
                  {breathePhase === 'breathe' && "Exhala la creencia limitante anterior e inhala pureza celular..."}
                  {breathePhase === 'hold' && "Consolida la paz de tu mente."}
                  {breathePhase === 'declare' && "Exhala tu voz con convicción, creyendo en tus palabras."}
                </p>
              </div>

              {/* Spoken content */}
              <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-inner max-h-48 overflow-y-auto">
                <p className="font-serif text-lg text-stone-850 italic font-medium leading-relaxed">
                  "{state.declaration || `Yo, ${userName || 'Mi Alma'}, declaro que mi vida se mueve hacia arriba y que mis pasos están bendecidos.`}"
                </p>
              </div>

              <div className="flex gap-2 justify-center">
                <button
                  type="button"
                  onClick={() => setDeclareMode(false)}
                  className="px-6 py-2 bg-stone-900 text-stone-100 rounded-full text-xs font-bold hover:bg-stone-800 transition-all cursor-pointer"
                >
                  He finalizado la declaración ✓
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
