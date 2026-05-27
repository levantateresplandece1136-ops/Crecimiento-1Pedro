import React, { useState, useEffect } from 'react';
import { VisualizationState, VisualEntry } from '../types';
import { Eye, BookOpen, Volume2, Sparkles, Play, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  state: VisualizationState;
  onChange: (updated: VisualizationState) => void;
}

export default function VisualizationStep({ state, onChange }: Props) {
  const [logText, setLogText] = useState('');
  const [activeSession, setActiveSession] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Breathing pacer state for guided session
  const [breatheCycle, setBreatheCycle] = useState<'Inhala' | 'Sostén' | 'Exhala'>('Inhala');
  const [secondsLeft, setSecondsLeft] = useState(4);

  const guideSteps = [
    { title: 'Prepárate', desc: 'Siéntate derecho, relaja los hombros y cierra los ojos. Conéctate con el momento presente.' },
    { title: 'Conéctate con tu logro', desc: 'Visualízate con tu visión de 5 años ya cumplida. ¿Dónde te encuentras físicamente en este preciso instante?' },
    { title: 'Involucra tu entorno', desc: '¿Qué personas están contigo? Mira las expresiones sinceras de orgullo de tu familia e hijos.' },
    { title: 'Enfoque Somático', desc: '¿Qué sientes en el cuerpo? Siente la vibración de alivio, gratitud y logro que inunda tu pecho.' },
    { title: 'El Legado', desc: '¿Cómo ha transformado tu constancia la vida de aquellos que te rodean y dependen de ti?' },
    { title: 'Decreto de Fe', desc: 'Declara audiblemente con amor: "Toda semilla que ha plantado el creador en mí florecerá a su tiempo si no desmayo."' },
    { title: 'Apertura y Registro', desc: 'Abre tus ojos calmadamente. Toma tu pluma o teclado y registra cada detalle experimentado.' }
  ];

  // Breathing pacer loop
  useEffect(() => {
    if (!activeSession) return;
    
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (breatheCycle === 'Inhala') {
            setBreatheCycle('Sostén');
            return 4;
          } else if (breatheCycle === 'Sostén') {
            setBreatheCycle('Exhala');
            return 4;
          } else {
            setBreatheCycle('Inhala');
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSession, breatheCycle]);

  const saveEntry = () => {
    if (!logText.trim()) return;

    const newEntry: VisualEntry = {
      id: Date.now(),
      date: new Date().toLocaleString('es-MX', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }),
      text: logText.trim()
    };

    onChange({
      ...state,
      entries: [...(state.entries || []), newEntry],
      lastDone: new Date().toISOString().slice(0, 10)
    });

    setLogText('');
  };

  const startGuidedSession = () => {
    setActiveSession(true);
    setCurrentSlide(0);
    setBreatheCycle('Inhala');
    setSecondsLeft(4);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
        
        {/* Entrance panel with Guided Session CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-xl border border-amber-200 bg-amber-50/20">
          <div className="space-y-1">
            <h4 className="font-serif text-lg font-bold text-amber-900 flex items-center gap-1.5">
              <Eye className="w-5 h-5 text-amber-800" />
              Gimnasio Mental de Visualización Activa
            </h4>
            <p className="text-stone-500 text-xs max-w-xl">
              La mente subconsciente no distingue entre fantasía emocional y realidad física. Al visualizar con amor, diriges tu enfoque hacia tu destino ideal.
            </p>
          </div>

          <button
            type="button"
            onClick={startGuidedSession}
            className="px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            Iniciar Sesión Guiada
          </button>
        </div>

        {/* Written static guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-stone-900">Pasos Recomendados de Visualización</h4>
            
            <div className="space-y-2.5">
              {guideSteps.slice(0, 4).map((step, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="w-5.5 h-5.5 rounded-full bg-stone-100 flex items-center justify-center font-bold text-xs text-stone-600 flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-stone-800 uppercase tracking-wide">{step.title}</h5>
                    <p className="text-stone-500 text-xs mt-0.5 leading-snug">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif text-md font-bold text-stone-400 uppercase tracking-widest pt-1 sm:pt-6">...</h4>
            
            <div className="space-y-2.5">
              {guideSteps.slice(4).map((step, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="w-5.5 h-5.5 rounded-full bg-stone-100 flex items-center justify-center font-bold text-xs text-stone-600 flex-shrink-0 mt-0.5">
                    {i + 5}
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-stone-800 uppercase tracking-wide">{step.title}</h5>
                    <p className="text-stone-500 text-xs mt-0.5 leading-snug">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="divider"></div>

        {/* Persistence log form */}
        <div className="bg-stone-900 text-stone-100 p-5 md:p-6 rounded-xl space-y-4">
          <h4 className="font-serif text-lg font-bold text-amber-250 flex items-center gap-1.5">
            <Volume2 className="w-5 h-5 text-amber-300" />
            Nueva Bitácora de Visualización
          </h4>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">¿Qué experimentaste en tu mente y tu espíritu hoy?</label>
            <textarea
              value={logText}
              onChange={(e) => setLogText(e.target.value)}
              rows={4}
              placeholder="Ej: Vi con claridad el porche de mi casa arreglado, el aroma del rosal. Sentí que el pecho se me ensanchaba al recordar que Dios respalda este gran esfuerzo..."
              className="w-full bg-white/10 text-stone-100 text-sm border border-stone-700 rounded-xl p-3.5 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/25 resize-none placeholder-stone-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={saveEntry}
              disabled={!logText.trim()}
              className="px-5 py-2 bg-amber-700 hover:bg-amber-800 disabled:opacity-40 text-black font-semibold rounded-full text-xs shadow cursor-pointer transition-all flex items-center gap-1 hover:shadow-lg"
            >
              <CheckCircle className="w-4 h-4 text-black" />
              Guardar Bitácora
            </button>
          </div>
        </div>

        {/* Existing logs list */}
        {state.entries && state.entries.length > 0 && (
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Registros Históricos Encontrados ({state.entries.length})</span>
            <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1">
              {[...state.entries].reverse().map((entry) => (
                <div key={entry.id} className="p-4 border border-stone-150 rounded-xl bg-stone-50/25 space-y-1.5 shadow-xs">
                  <span className="text-[10px] font-bold text-stone-400 block">{entry.date}</span>
                  <p className="text-stone-700 italic text-sm leading-relaxed">
                    "{entry.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* GUIDED SESSION OVERLAY FRAME */}
      <AnimatePresence>
        {activeSession && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#12100F] z-[9999] flex flex-col items-center justify-center p-4"
          >
            {/* Soft backdrop radial pulse */}
            <div className="absolute inset-0 bg-radial from-amber-950/15 via-transparent to-transparent pointer-events-none"></div>

            <div className="max-w-2xl w-full text-center space-y-10 relative z-10 p-6">
              
              {/* Header */}
              <div className="flex justify-between items-center text-stone-450 border-b border-stone-800/80 pb-4">
                <span className="font-serif text-lg font-bold text-amber-250 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Sesión Guiada de Trascendencia
                </span>
                <button
                  type="button"
                  onClick={() => setActiveSession(false)}
                  className="text-stone-500 hover:text-stone-300 text-xs font-bold bg-white/5 border border-stone-850 px-3 py-1.5 rounded-full cursor-pointer"
                >
                  Cerrar
                </button>
              </div>

              {/* Dynamic Breathing Bubble Ring */}
              <div className="flex flex-col items-center space-y-3">
                <motion.div
                  animate={{
                    scale: breatheCycle === 'Inhala' ? 1.3 : breatheCycle === 'Sostén' ? 1.3 : 0.85
                  }}
                  transition={{
                    duration: 4,
                    ease: 'easeInOut'
                  }}
                  className={`w-32 h-32 rounded-full flex flex-col items-center justify-center border transition-all ${
                    breatheCycle === 'Inhala'
                      ? 'bg-amber-100/10 border-amber-500/50 shadow-[0_0_40px_rgba(245,158,11,0.15)]'
                      : breatheCycle === 'Sostén'
                      ? 'bg-purple-100/10 border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.15)]'
                      : 'bg-emerald-105/10 border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.15)]'
                  }`}
                >
                  <span className="text-xl font-serif font-bold text-amber-150 leading-none">{breatheCycle}</span>
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1.5">
                    {secondsLeft}s
                  </span>
                </motion.div>
                <span className="text-[11px] text-stone-400 italic">Respira al ritmo del círculo dorado</span>
              </div>

              {/* Slideshow content */}
              <div className="p-6 bg-white/5 border border-stone-800 rounded-2xl shadow-xl min-h-48 flex flex-col items-center justify-center space-y-3 relative">
                <span className="text-[10px] font-bold text-amber-450 uppercase tracking-widest">Paso {currentSlide + 1} de {guideSteps.length}</span>
                <h4 className="font-serif text-xl font-bold text-white tracking-wide">{guideSteps[currentSlide].title}</h4>
                <p className="text-stone-300 text-sm leading-relaxed max-w-xl text-center">
                  {guideSteps[currentSlide].desc}
                </p>
              </div>

              {/* Slider nav controls */}
              <div className="flex justify-between items-center px-4">
                <button
                  type="button"
                  disabled={currentSlide === 0}
                  onClick={() => setCurrentSlide(prev => prev - 1)}
                  className="px-4 py-2 border border-stone-800 text-stone-400 font-bold rounded-full text-xs hover:text-white hover:bg-white/5 disabled:opacity-20 cursor-pointer"
                >
                  Anterior
                </button>
                
                {currentSlide < guideSteps.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentSlide(prev => prev + 1)}
                    className="px-5 py-2 bg-amber-700 hover:bg-amber-800 text-black font-semibold rounded-full text-xs cursor-pointer shadow-md"
                  >
                    Siguiente Paso
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveSession(false)}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full text-xs cursor-pointer shadow-md"
                  >
                    Completar Práctica 🎉
                  </button>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
