import { StepConfig, ApplicationState } from './types';

export const STEPS: StepConfig[] = [
  {
    id: 1,
    virtue: 'Fe',
    color: 'text-amber-800',
    lightColor: 'bg-amber-50/70',
    bgHex: '#FEF3C7',
    textHex: '#B45309',
    borderHex: 'rgba(180, 83, 9, 0.2)',
    name: 'Reconoce tu punto de partida',
    verse: '"La fe es la certeza de lo que se espera, la convicción de lo que no se ve." — Hebreos 11:1',
    intro: 'No puedes transformar lo que no reconoces. El primer escalón es mirar con honestidad dónde estás hoy, desde la fe de que el cambio es posible. La fe no niega la realidad — la enfrenta con esperanza.',
    type: 'assessment'
  },
  {
    id: 2,
    virtue: 'Virtud',
    color: 'text-rose-800',
    lightColor: 'bg-rose-50/70',
    bgHex: '#FFE4E6',
    textHex: '#9F1239',
    borderHex: 'rgba(159, 18, 57, 0.2)',
    name: 'Ancla tu identidad',
    verse: '"Pero vosotros sois linaje escogido, real sacerdocio, nación santa, pueblo adquirido por Dios." — 1 Pedro 2:9',
    intro: 'Antes de definir metas, debes saber quién eres. La virtud no es lo que haces — es lo que eres. Tu identidad espiritual, familiar y personal es el fundamento sobre el cual se construye todo lo demás.',
    type: 'identity'
  },
  {
    id: 3,
    virtue: 'Conocimiento',
    color: 'text-teal-800',
    lightColor: 'bg-teal-50/70',
    bgHex: '#CCFBF1',
    textHex: '#0F766E',
    borderHex: 'rgba(15, 118, 110, 0.2)',
    name: 'Define tu visión y propósito',
    verse: '"Donde no hay visión, el pueblo perece." — Proverbios 29:18',
    intro: 'El conocimiento te da dirección. En este escalón defines a dónde vas: quién quieres ser, qué quieres hacer y qué quieres tener. La secuencia importa — el ser viene primero.',
    type: 'vision'
  },
  {
    id: 4,
    virtue: 'Dominio propio',
    color: 'text-blue-800',
    lightColor: 'bg-blue-50/70',
    bgHex: '#DBEAFE',
    textHex: '#1E40AF',
    borderHex: 'rgba(30, 64, 175, 0.2)',
    name: 'Construye hábitos transformadores',
    verse: '"Todo atleta se abstiene de todo. Ellos lo hacen para recibir una corona corruptible, pero nosotros, una incorruptible." — 1 Corintios 9:25',
    intro: 'El dominio propio se entrena con pequeños actos repetidos. No grandes cambios dramáticos — un hábito ridículamente sencillo, sostenido por 100 días, fortalece el músculo de la voluntad y redefine quién eres.',
    type: 'habits'
  },
  {
    id: 5,
    virtue: 'Paciencia',
    color: 'text-violet-800',
    lightColor: 'bg-violet-50/70',
    bgHex: '#EDE9FE',
    textHex: '#6D28D9',
    borderHex: 'rgba(109, 40, 217, 0.2)',
    name: 'Establece metas SMART',
    verse: '"La paciencia tiene su obra completa, para que seáis perfectos y cabales, sin que os falte cosa alguna." — Santiago 1:4',
    intro: 'La paciencia no es pasividad — es perseverancia con plan. Aquí tus sueños se convierten en objetivos concretos, medibles y con fecha. Un sueño sin fecha es solo un deseo.',
    type: 'goals'
  },
  {
    id: 6,
    virtue: 'Piedad',
    color: 'text-emerald-800',
    lightColor: 'bg-emerald-50/70',
    bgHex: '#D1FAE5',
    textHex: '#065F46',
    borderHex: 'rgba(6, 95, 70, 0.2)',
    name: 'Actúa con disciplina',
    verse: '"La piedad para todo aprovecha, pues tiene promesa de esta vida presente, y de la venidera." — 1 Timoteo 4:8',
    intro: 'La piedad es vivir cada día alineado con tus valores más profundos. La acción diaria —aunque sea pequeña— es el ingrediente que convierte la preocupación en ocupación. ¿Qué puedes hacer hoy?',
    type: 'actions'
  },
  {
    id: 7,
    virtue: 'Afecto fraternal',
    color: 'text-pink-800',
    lightColor: 'bg-pink-50/70',
    bgHex: '#FCE7F3',
    textHex: '#9D174D',
    borderHex: 'rgba(157, 23, 77, 0.2)',
    name: 'Renueva tu actitud',
    verse: '"Renovaos en el espíritu de vuestra mente." — Efesios 4:23',
    intro: 'El afecto fraternal cambia cómo ves a los demás — y eso cambia cómo te ves a ti mismo. Aquí reemplazas los patrones de pensamiento negativo por perspectivas constructivas vinculadas a tu propósito.',
    type: 'attitude'
  },
  {
    id: 8,
    virtue: 'Amor',
    color: 'text-amber-900',
    lightColor: 'bg-amber-100/40',
    bgHex: '#FEF3C7',
    textHex: '#92400E',
    borderHex: 'rgba(146, 64, 14, 0.2)',
    name: 'Visualiza y declara',
    verse: '"El amor nunca deja de ser." — 1 Corintios 13:8',
    intro: 'El amor es el motor más poderoso. Cuando visualizas con amor — por tu familia, tu propósito, tu legado — programas tu mente y tu corazón para buscar los "cómos". Visualiza, declara y actúa desde el amor.',
    type: 'visualization'
  }
];

export const LIFE_AREAS = [
  'Espiritual',
  'Familia',
  'Salud',
  'Economía',
  'Profesional',
  'Social',
  'Personal',
  'Propósito'
];

export const INITIAL_STATE: ApplicationState = {
  userName: '',
  currentStep: 0,
  completedSteps: [],
  assessment: {
    areas: {},
    beliefs: []
  },
  identity: {
    spiritual: '',
    family: '',
    professional: '',
    declaration: ''
  },
  vision: {
    what: '',
    forWhat: '',
    why: '',
    vision: '',
    timeframes: {
      short: '',
      mid: '',
      long: ''
    }
  },
  habits: [
    {
      id: 1,
      name: 'Escribir 3 agradecimientos cada mañana',
      days: 30,
      done: Array(30).fill(false),
      startDate: new Date().toISOString().slice(0, 10)
    },
    {
      id: 2,
      name: 'Leer la Biblia u otro texto inspirador por 15 min',
      days: 30,
      done: Array(30).fill(false),
      startDate: new Date().toISOString().slice(0, 10)
    }
  ],
  gratitude: {},
  goals: [],
  actions: {
    today: [],
    daily: []
  },
  attitude: {
    thoughts: [],
    reframe: ''
  },
  visualization: {
    entries: [],
    frequency: '3x/semana',
    lastDone: ''
  }
};
