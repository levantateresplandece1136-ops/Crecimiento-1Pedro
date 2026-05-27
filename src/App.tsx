import React, { useState, useEffect } from 'react';
import { ApplicationState } from './types';
import { STEPS, INITIAL_STATE } from './data';
import { 
  BookOpen, 
  Heart, 
  Smile, 
  RefreshCw, 
  Compass, 
  Award, 
  Target, 
  Eye, 
  Sparkles, 
  Home, 
  ArrowLeft, 
  Check, 
  RotateCcw, 
  Clock,
  User,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Subcomponents
import AssessmentStep from './components/AssessmentStep';
import IdentityStep from './components/IdentityStep';
import VisionStep from './components/VisionStep';
import HabitsStep from './components/HabitsStep';
import GoalsStep from './components/GoalsStep';
import ActionsStep from './components/ActionsStep';
import AttitudeStep from './components/AttitudeStep';
import VisualizationStep from './components/VisualizationStep';

export default function App() {
  const [state, setState] = useState<ApplicationState>(() => {
    try {
      const saved = localStorage.getItem('escalones_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure defaults are merged
        return { ...INITIAL_STATE, ...parsed };
      }
    } catch (e) {
      console.error('Failed to parse local state: ', e);
    }
    return INITIAL_STATE;
  });

  const [splashVisible, setSplashVisible] = useState(() => {
    return !state.userName; // Hide if user already established
  });

  const [toast, setToast] = useState<string | null>(null);

  // Sync state changes with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('escalones_v2', JSON.stringify(state));
    } catch (e) {
      console.error('Failed to sync state to storage: ', e);
    }
  }, [state]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  const updateUserName = (name: string) => {
    setState(prev => ({ ...prev, userName: name }));
  };

  const setStep = (stepId: number) => {
    setState(prev => ({ ...prev, currentStep: stepId }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const markStepComplete = (id: number) => {
    setState(prev => {
      const alreadyCompleted = prev.completedSteps.includes(id);
      const newCompleted = alreadyCompleted 
        ? prev.completedSteps 
        : [...prev.completedSteps, id].sort((a,b) => a - b);
      
      const nextStep = id < 8 ? id + 1 : 0; // go back home if fully complete

      return {
        ...prev,
        completedSteps: newCompleted,
        currentStep: nextStep
      };
    });
    
    showToast(`¡Excelente! Has consolidado el Escalón ${id} 🌟`);
  };

  const resetJourney = () => {
    if (window.confirm('¿Estás seguro de que deseas reiniciar toda tu jornada? Esto limpiará tus hábitos, metas y registros por completo.')) {
      setState(INITIAL_STATE);
      setSplashVisible(true);
      showToast('Jornada reiniciada con éxito.');
    }
  };

  // State updaters for each step
  const updateAssessment = (assessment: any) => {
    setState(prev => ({ ...prev, assessment }));
  };

  const updateIdentity = (identity: any) => {
    setState(prev => ({ ...prev, identity }));
  };

  const updateVision = (vision: any) => {
    setState(prev => ({ ...prev, vision }));
  };

  const updateHabits = (habits: any) => {
    setState(prev => ({ ...prev, habits }));
  };

  const updateGratitude = (gratitude: any) => {
    setState(prev => ({ ...prev, gratitude }));
  };

  const updateGoals = (goals: any) => {
    setState(prev => ({ ...prev, goals }));
  };

  const updateActions = (actions: any) => {
    setState(prev => ({ ...prev, actions }));
  };

  const updateAttitude = (attitude: any) => {
    setState(prev => ({ ...prev, attitude }));
  };

  const updateVisualization = (visualization: any) => {
    setState(prev => ({ ...prev, visualization }));
  };

  // Helper selectors
  const totalCompleted = state.completedSteps.length;
  const currentStepData = STEPS.find(s => s.id === state.currentStep);

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#1C1917] font-sans flex antialiased">
      
      {/* SPLASH SCREEN overlay */}
      <AnimatePresence>
        {splashVisible && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-[#1C1917] flex flex-col items-center justify-center text-[#FAF7F2] text-center p-6 z-[99999]"
          >
            {/* Ambient Background Radial Blur */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-700/10 blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-rose-900/10 blur-[80px] pointer-events-none"></div>

            <div className="max-w-md w-full space-y-8 relative z-10 flex flex-col items-center">
              <motion.div 
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="w-16 h-16 rounded-full border border-stone-700 flex items-center justify-center text-4xl text-amber-500 shadow-xl"
              >
                ✝
              </motion.div>

              <div className="space-y-4">
                <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-stone-100 to-stone-400">
                  Escalones
                </h1>
                <p className="text-stone-400 font-serif font-medium text-sm border-y border-stone-800 py-3.5 italic leading-relaxed">
                  "Añadid a vuestra fe virtud; a la virtud, conocimiento; al conocimiento, dominio propio; al dominio propio, paciencia; a la piedad, afecto fraternal; y al afecto fraternal, amor."
                  <span className="block text-amber-500 font-sans font-bold text-xs mt-2 not-italic uppercase tracking-wider">
                    — 2 Pedro 1:5-8
                  </span>
                </p>
                <p className="text-stone-400 text-xs leading-relaxed max-w-sm mx-auto">
                  Un workbook y tracker interactivo creado para sistematizar tu autodisciplina espiritual, mental y emocional a través de la sabiduría milenaria.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSplashVisible(false)}
                className="w-full sm:w-auto px-10 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-full shadow-lg text-sm cursor-pointer transition-colors"
              >
                Comenzar mi jornada →
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOAST POPUP */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 bg-[#1C1917] border border-stone-850 text-[#FAF7F2] px-6 py-3.5 rounded-xl shadow-2xl z-[999] text-xs font-bold font-sans flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SIDEBAR NAVIGATION PANEL */}
      <aside className="hidden lg:flex flex-col w-72 bg-[#1C1917] border-r border-[#1C1917]/20 text-[#FAF7F2] shrink-0 sticky top-0 h-screen overflow-y-auto">
        
        {/* Brand signature header */}
        <div className="p-6 border-b border-stone-800/80 space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-stone-100 to-amber-250">
              Escalones
            </span>
            <span className="text-[10px] font-bold text-amber-500 bg-amber-950 px-1.5 py-0.5 rounded border border-amber-900/40">
              2 Pedro 5-8
            </span>
          </div>
          <p className="text-stone-500 text-[10px] uppercase font-bold tracking-wider">Arquitectura de Crecimiento</p>
        </div>

        {/* User profile focus area */}
        <div className="p-5 border-b border-stone-850/50 bg-stone-900/10 space-y-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-xs text-stone-200 uppercase font-bold">
              {state.userName ? state.userName[0] : <User className="w-4 h-4 text-stone-400" />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-stone-200 truncate leading-snug">
                {state.userName || 'Visitante Solitario'}
              </h4>
              <p className="text-[11px] text-stone-400 uppercase tracking-wide font-semibold mt-0.5">
                {totalCompleted} de 8 escalones
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Navigation button scroll items */}
        <nav className="flex-1 p-4 space-y-1">
          {/* Home button */}
          <button
            onClick={() => setStep(0)}
            className={`w-full group px-3 py-2.5 rounded-lg flex items-center gap-3 transition-all cursor-pointer ${
              state.currentStep === 0 
                ? 'bg-stone-800 text-white font-bold border-l-3 border-amber-500' 
                : 'text-stone-450 hover:bg-stone-850 hover:text-white'
            }`}
          >
            <Home className="w-4 h-4 text-stone-400" />
            <span className="text-xs font-semibold">Dashboard Principal</span>
          </button>

          <div className="pt-4 pb-2 text-[10px] font-bold uppercase text-stone-500 tracking-wider px-3">
            Escalera de Virtudes
          </div>

          {STEPS.map((s) => {
            const isCompleted = state.completedSteps.includes(s.id);
            const isActive = state.currentStep === s.id;
            
            return (
              <button
                key={s.id}
                onClick={() => setStep(s.id)}
                className={`w-full px-3 py-2.5 rounded-lg flex items-center justify-between gap-2.5 transition-all cursor-pointer text-left ${
                  isActive 
                    ? 'bg-stone-800 text-white font-bold border-l-3' 
                    : 'text-stone-400 hover:bg-stone-850 hover:text-white'
                }`}
                style={{ borderLeftColor: isActive ? s.textHex : undefined }}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`w-5.5 h-5.5 rounded-full border text-[10px] font-bold flex items-center justify-center shrink-0 ${
                    isCompleted 
                      ? 'bg-amber-600 border-amber-700 text-white' 
                      : 'border-stone-700 text-stone-500 bg-stone-900/20'
                  }`}>
                    {isCompleted ? '✓' : s.id}
                  </span>
                  <div className="truncate">
                    <span className="text-[10px] font-extrabold block leading-none uppercase" style={{ color: s.textHex }}>
                      {s.virtue}
                    </span>
                    <span className="text-[11px] block text-stone-300 mt-1 truncate">{s.name}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Global Progress indicators */}
        <div className="p-4 border-t border-stone-850 space-y-2">
          <div className="flex justify-between items-center text-[10px] font-extrabold uppercase text-stone-500 tracking-wider">
            <span>Progreso Integral</span>
            <span>{Math.round((totalCompleted / 8) * 100)}%</span>
          </div>
          <div className="w-full bg-stone-850 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-amber-600 h-full rounded-full transition-all duration-500" 
              style={{ width: `${(totalCompleted / 8) * 100}%` }}
            ></div>
          </div>

          <button
            onClick={resetJourney}
            className="w-full mt-4 py-1.5 border border-stone-800 hover:border-stone-700 text-stone-500 hover:text-stone-300 text-[10px] font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reiniciar Jornada
          </button>
        </div>
      </aside>

      {/* MOBILE HEADER BAR */}
      <div className="lg:hidden fixed top-0 inset-x-0 h-14 bg-[#1C1917] border-b border-stone-800 text-[#FAF7F2] flex items-center justify-between px-4 z-50">
        <button
          onClick={() => setStep(0)}
          className="flex items-center gap-1.5 text-xs text-amber-500 font-bold"
        >
          <Home className="w-4 h-4 text-stone-300" />
          <span>Inicio</span>
        </button>
        
        <span className="font-serif text-md font-bold tracking-wider">
          {state.currentStep > 0 ? `Escalón ${state.currentStep}` : 'Escalones'}
        </span>

        <span className="text-[10.5px] font-bold text-stone-400">
          {totalCompleted}/8 Completado
        </span>
      </div>

      {/* CENTRAL AREA SCROLL PANEL */}
      <main className="flex-1 min-h-screen flex flex-col pt-14 lg:pt-0 overflow-y-auto">
        <div className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
          
          <AnimatePresence mode="wait">
            
            {state.currentStep === 0 ? (
              /* DASHBOARD SCREEN PANEL */
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8 py-4"
              >
                {/* Hero block */}
                <div className="bg-[#1C1917] text-[#FAF7F2] rounded-2xl p-6 md:p-10 relative overflow-hidden shadow-xl space-y-4">
                  <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-amber-700/10 blur-[80px] pointer-events-none"></div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500">Un plan de vida ordenado</span>
                    <h2 className="font-serif text-3xl md:text-5xl font-semibold leading-tight">
                      Los Escalones de Pedro
                    </h2>
                  </div>

                  <p className="font-serif italic text-stone-300 border-l border-amber-600/60 pl-4 leading-relaxed text-sm md:text-[15px] max-w-2xl py-1 md:py-2">
                    "Añadid a vuestra fe virtud; a la virtud, conocimiento; al conocimiento, dominio propio; al dominio propio, paciencia; a la piedad, afecto fraternal; y al afecto fraternal, amor."
                  </p>

                  <div className="pt-2">
                    <span className="text-stone-500 text-xs font-mono">Lectura: 2 Pedro 1:5-8 · Versión Reina Valera 1960</span>
                  </div>
                </div>

                {/* Dashboard steps flow matrix */}
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-stone-904">Estado de mis Escalones</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {STEPS.map((s) => {
                      const completed = state.completedSteps.includes(s.id);
                      const isNextToDo = s.id === (state.completedSteps.length + 1);

                      return (
                        <div
                          key={s.id}
                          onClick={() => setStep(s.id)}
                          style={{ borderColor: s.borderHex }}
                          className={`p-5 rounded-xl border-t-3 bg-white border cursor-pointer hover:shadow-md transition-all space-y-2 relative group ${
                            isNextToDo 
                              ? 'bg-amber-50/20 shadow-sm border-amber-500/50' 
                              : ''
                          }`}
                        >
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#A8A29E]">Escalón {s.id}</span>
                              <h4 className="font-serif text-xl font-bold mt-0.5" style={{ color: s.textHex }}>
                                {s.virtue}
                              </h4>
                            </div>

                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                              completed 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : isNextToDo
                                ? 'bg-amber-500 text-white animate-pulse'
                                : 'bg-stone-50 text-stone-400 border border-stone-200'
                            }`}>
                              {completed ? '✓' : s.id}
                            </span>
                          </div>

                          <p className="text-stone-800 font-bold text-xs">{s.name}</p>
                          <p className="text-stone-400 text-[11px] leading-relaxed line-clamp-2 italic pr-6 group-hover:text-stone-600 transition-colors">
                            {s.intro}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Name collector & onboarding CTA */}
                <div className="p-6 bg-white border border-stone-200 rounded-2xl flex flex-col sm:flex-row items-center gap-6 justify-between">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-xl text-amber-700 shrink-0">
                      👤
                    </div>
                    <div className="space-y-1 w-full">
                      <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">¿Cuál es tu nombre?</label>
                      <input
                        type="text"
                        value={state.userName}
                        onChange={(e) => updateUserName(e.target.value)}
                        placeholder="Escribe tu nombre para personalizar..."
                        className="bg-transparent border-b border-stone-200 outline-none text-sm font-semibold max-w-sm w-full pb-0.5 focus:border-amber-700"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (!state.userName.trim()) {
                        alert('Por favor ingresa tu nombre primero para orientar tu manual.');
                        return;
                      }
                      const nextUncompleted = STEPS.find(s => !state.completedSteps.includes(s.id));
                      setStep(nextUncompleted ? nextUncompleted.id : 1);
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-full text-xs font-bold shadow-md transition-colors shrink-0 cursor-pointer text-center"
                  >
                    {totalCompleted === 8 
                      ? 'Revisar miWorkbook' 
                      : totalCompleted > 0 
                      ? `Continuar en Escalón ${totalCompleted + 1}` 
                      : 'Empezar Escalón 1 →'}
                  </motion.button>
                </div>

                {/* Dashboard Summary Sheet if they have progress */}
                {totalCompleted > 0 && (
                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-6">
                    <h3 className="font-serif text-2xl font-bold">Bitácora Personal de Crecimiento</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Identity declared brief */}
                      {state.identity.declaration && (
                        <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2">
                          <label className="text-[10px] font-bold text-rose-800 uppercase tracking-widest block">Mi Manifiesto Declarado</label>
                          <p className="font-serif text-sm italic text-stone-700 line-clamp-4 leading-relaxed">
                            "{state.identity.declaration}"
                          </p>
                        </div>
                      )}

                      {/* Vision brief */}
                      {state.vision.vision && (
                        <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2">
                          <label className="text-[10px] font-bold text-teal-800 uppercase tracking-widest block font-sans">Mi Visión Sensorial (5 Años)</label>
                          <p className="text-xs text-stone-700 line-clamp-4 leading-relaxed font-serif italic">
                            "{state.vision.vision}"
                          </p>
                        </div>
                      )}

                    </div>

                    {/* Simple summary stats row */}
                    <div className="grid grid-cols-3 gap-2.5 text-center bg-white p-3 border border-stone-150 rounded-xl">
                      <div>
                        <div className="font-serif text-2xl font-bold text-blue-800">
                          {state.habits.length}
                        </div>
                        <div className="text-[9px] font-bold text-stone-400 uppercase">Hábitos</div>
                      </div>
                      <div className="border-x border-stone-150">
                        <div className="font-serif text-2xl font-bold text-violet-850">
                          {state.goals.length}
                        </div>
                        <div className="text-[9px] font-bold text-stone-400 uppercase">Metas SMART</div>
                      </div>
                      <div>
                        <div className="font-serif text-2xl font-bold text-amber-800">
                          {state.visualization.entries.length}
                        </div>
                        <div className="text-[9px] font-bold text-[#A8A29E] uppercase">Visualizaciones</div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              /* RENDERING ACTIVE STEPS IN ACTION MODE */
              <motion.div
                key={`step-${state.currentStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.18 }}
                className="space-y-6"
              >
                {/* Back Link to Home */}
                <div className="flex justify-between items-center bg-white/40 p-1.5 rounded-lg border border-stone-250/20 max-w-full">
                  <button
                    onClick={() => setStep(0)}
                    className="flex items-center gap-1.5 text-xs text-stone-450 hover:text-stone-900 font-semibold cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Regresar al Dashboard
                  </button>
                  <span className="text-[10px] font-extrabold text-stone-420 font-serif italic">
                    "Fortaleciendo mi hombre interior..."
                  </span>
                </div>

                {/* Sub-component step container delegation */}
                {state.currentStep === 1 && (
                  <AssessmentStep state={state.assessment} onChange={updateAssessment} />
                )}
                {state.currentStep === 2 && (
                  <IdentityStep state={state.identity} userName={state.userName} onChange={updateIdentity} />
                )}
                {state.currentStep === 3 && (
                  <VisionStep state={state.vision} onChange={updateVision} />
                )}
                {state.currentStep === 4 && (
                  <HabitsStep 
                    habits={state.habits} 
                    gratitude={state.gratitude} 
                    onHabitsChange={updateHabits} 
                    onGratitudeChange={updateGratitude} 
                  />
                )}
                {state.currentStep === 5 && (
                  <GoalsStep goals={state.goals} onChange={updateGoals} />
                )}
                {state.currentStep === 6 && (
                  <ActionsStep state={state.actions} onChange={updateActions} />
                )}
                {state.currentStep === 7 && (
                  <AttitudeStep state={state.attitude} onChange={updateAttitude} />
                )}
                {state.currentStep === 8 && (
                  <VisualizationStep state={state.visualization} onChange={updateVisualization} />
                )}

                {/* Navigation Buttons Row at bottom of step panels */}
                <div className="divider"></div>
                <div className="flex flex-wrap sm:flex-row gap-3 items-center justify-between bg-white text-[#1C1917] hover:border-stone-250 p-5 rounded-2xl border border-stone-200 shadow-sm mt-8">
                  <div className="text-xs text-stone-450 font-medium">
                    Escalón {state.currentStep} de 8
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {state.currentStep > 1 && (
                      <button
                        type="button"
                        onClick={() => setStep(state.currentStep - 1)}
                        className="px-4 py-2 border border-stone-200 text-stone-650 hover:bg-stone-50 font-bold rounded-full text-xs cursor-pointer inline-flex items-center gap-1 transition-all"
                      >
                        ← Anterior
                      </button>
                    )}
                    
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      className="px-4 py-2 border border-stone-200 text-stone-650 hover:bg-stone-50 font-bold rounded-full text-xs cursor-pointer inline-flex items-center gap-1.5 transition-all"
                    >
                      <Home className="w-3.5 h-3.5" />
                      Dashboard
                    </button>

                    <button
                      type="button"
                      onClick={() => markStepComplete(state.currentStep)}
                      className="px-5 py-2 text-white font-bold rounded-full text-xs cursor-pointer shadow hover:shadow-md transition-all inline-flex items-center gap-1.5"
                      style={{ backgroundColor: currentStepData?.textHex || '#B45309' }}
                    >
                      Completar Escalón {state.currentStep} →
                    </button>
                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

    </div>
  );
}
