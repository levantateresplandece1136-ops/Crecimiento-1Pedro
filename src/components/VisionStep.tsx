import React from 'react';
import { VisionState } from '../types';
import { Compass, Calendar, ArrowRight, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  state: VisionState;
  onChange: (updated: VisionState) => void;
}

export default function VisionStep({ state, onChange }: Props) {
  
  const updateField = (field: keyof VisionState, value: string) => {
    onChange({
      ...state,
      [field]: value
    });
  };

  const updateTimeframe = (timeframe: 'short' | 'mid' | 'long', value: string) => {
    onChange({
      ...state,
      timeframes: {
        ...state.timeframes,
        [timeframe]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
        <div>
          <h3 className="font-serif text-2xl font-bold text-stone-900 mb-1 flex items-center gap-2">
            <Compass className="w-6 h-6 text-teal-700" />
            La Secuencia Vital: Ser → Hacer → Tener
          </h3>
          <p className="text-stone-500 text-sm">
            Para que una visión material sea sustentable, debe nacer de tu ser interior. Responde a estas preguntas con autenticidad.
          </p>
        </div>

        {/* Trilogía grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Qué */}
          <div className="p-4 border border-stone-200 bg-white rounded-xl space-y-2">
            <div className="flex items-center gap-1.5 text-teal-850 font-bold text-sm">
              <span className="text-teal-700">1.</span> ¿Qué quiero lograr? (Hacer / Tener)
            </div>
            <textarea
              value={state.what}
              onChange={(e) => updateField('what', e.target.value)}
              rows={4}
              placeholder="Ej: Quiero cambiar de carrera hacia el área tecnológica o comprar un terreno familiar."
              className="w-full text-xs bg-stone-50/50 p-2.5 outline-none border border-stone-200 focus:border-teal-600 rounded-lg resize-none text-stone-850"
            />
          </div>

          {/* Para qué */}
          <div className="p-4 border border-stone-200 bg-white rounded-xl space-y-2">
            <div className="flex items-center gap-1.5 text-teal-850 font-bold text-sm">
              <span className="text-teal-700">2.</span> ¿Para qué lo quiero? (Propósito)
            </div>
            <textarea
              value={state.forWhat}
              onChange={(e) => updateField('forWhat', e.target.value)}
              rows={4}
              placeholder="Ej: Para tener flexibilidad de horarios y pasar más tiempo de calidad con mis hijos."
              className="w-full text-xs bg-stone-50/50 p-2.5 outline-none border border-stone-200 focus:border-teal-600 rounded-lg resize-none text-stone-850"
            />
          </div>

          {/* Por qué */}
          <div className="p-4 border border-stone-200 bg-white rounded-xl space-y-2">
            <div className="flex items-center gap-1.5 text-teal-850 font-bold text-sm">
              <span className="text-teal-700">3.</span> ¿Por qué importa? (Motor de Valor)
            </div>
            <textarea
              value={state.why}
              onChange={(e) => updateField('why', e.target.value)}
              rows={4}
              placeholder="Ej: Porque mi mayor valor es mi familia y deseo ser un ejemplo de superación constante."
              className="w-full text-xs bg-stone-50/50 p-2.5 outline-none border border-stone-200 focus:border-teal-600 rounded-lg resize-none text-stone-850"
            />
          </div>

        </div>

        <div className="divider"></div>

        {/* Sensory Vision Area */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h4 className="font-serif text-xl font-bold text-stone-900">Mi Declaración de Visión Sensorial</h4>
            <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded font-semibold border border-teal-100">Largo Plazo (5+ años)</span>
          </div>
          <p className="text-stone-500 text-xs mt-0.5 max-w-2xl">
            Toma un respiro, cierra tus ojos e imagínate dentro de 5 años. ¿Cómo te sientes? ¿Con quién estás? ¿Dónde vives? Describe esta experiencia involucrando tus sentidos (vista, tacto, sonido).
          </p>

          <textarea
            value={state.vision}
            onChange={(e) => updateField('vision', e.target.value)}
            rows={5}
            placeholder="Me veo sentado en un estudio con luz natural, sintiendo una profunda paz en el pecho. Escucho la risa de mis hijos jugando afuera. He logrado construir tres fuentes de ingresos pasivas y mi tiempo me pertenece plenamente..."
            className="w-full border border-stone-200 p-4 rounded-xl text-sm leading-relaxed text-stone-850 font-medium focus:border-teal-600 focus:ring-1 focus:ring-teal-100"
          />
          <div className="flex items-center gap-1.5 text-[11px] text-stone-400 italic">
            <HelpCircle className="w-3.5 h-3.5" />
            "El sistema de activación reticular de tu cerebro filtra el mundo según tu visión. Si defines el 'qué' con claridad sensorial, tu mente enfocará los 'cómos'."
          </div>
        </div>

        <div className="divider"></div>

        {/* Milestones / Timeframes */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-800" />
            <h4 className="font-serif text-lg font-bold text-stone-900">Hitos Temporales (Dividiendo el Camino)</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Corto Plazo */}
            <div className="p-4 border border-stone-150 rounded-xl bg-stone-50/20 space-y-2">
              <span className="text-[10px] font-bold text-teal-800 uppercase tracking-widest block bg-teal-50 w-max px-1.5 py-0.5 rounded">3 a 6 Meses</span>
              <label className="block text-xs font-semibold text-stone-800">Metas de Corto Plazo</label>
              <textarea
                value={state.timeframes?.short || ''}
                onChange={(e) => updateTimeframe('short', e.target.value)}
                rows={3}
                placeholder="Ej: Completar un curso básico y ahorrar un fondo de emergencias de un mes."
                className="w-full text-xs bg-white p-2 outline-none border border-stone-200 focus:border-teal-600 rounded-lg resize-none text-stone-700"
              />
            </div>

            {/* Mediano Plazo */}
            <div className="p-4 border border-stone-150 rounded-xl bg-stone-50/20 space-y-2">
              <span className="text-[10px] font-bold text-teal-800 uppercase tracking-widest block bg-teal-50 w-max px-1.5 py-0.5 rounded">1 a 3 Años</span>
              <label className="block text-xs font-semibold text-stone-800">Metas de Mediano Plazo</label>
              <textarea
                value={state.timeframes?.mid || ''}
                onChange={(e) => updateTimeframe('mid', e.target.value)}
                rows={3}
                placeholder="Ej: Lograr mi primera contratación remota y consolidar un flujo alternativo de ingresos."
                className="w-full text-xs bg-white p-2 outline-none border border-stone-200 focus:border-teal-600 rounded-lg resize-none text-stone-700"
              />
            </div>

            {/* Largo Plazo */}
            <div className="p-4 border border-stone-150 rounded-xl bg-stone-50/20 space-y-2">
              <span className="text-[10px] font-bold text-teal-800 uppercase tracking-widest block bg-teal-50 w-max px-1.5 py-0.5 rounded">5+ Años</span>
              <label className="block text-xs font-semibold text-stone-800">Metas de Largo Plazo</label>
              <textarea
                value={state.timeframes?.long || ''}
                onChange={(e) => updateTimeframe('long', e.target.value)}
                rows={3}
                placeholder="Ej: Tener libertad financiera absoluta, viajar por el mundo y apoyar fundaciones benéficas activamente."
                className="w-full text-xs bg-white p-2 outline-none border border-stone-200 focus:border-teal-600 rounded-lg resize-none text-stone-700"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
