/*
 * Diagnóstico ESG para pymes
 * © 2026 Yel Martínez — https://yel-martinez-portfolio.com
 * SPDX-License-Identifier: GPL-2.0-or-later
 * Software libre, sin garantía de ningún tipo. Licencia: https://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * Herramienta independiente y orientativa; no es oficial ni sustituye asesoramiento profesional.
 */
/**
 * Diagnostico ESG Crece Sostenible - WordPress Plugin JS
 * Scoped under DESG namespace to avoid global conflicts.
 *
 * @package DiagnosticoESG
 * @version 1.0.0
 */
(function() {
"use strict";

// Scoped DOM helpers
var $wrap = document.getElementById('desg-wrap');
if (!$wrap) return;

// Override document methods for scoped queries
var _origById = document.getElementById.bind(document);

// Read default language from data attribute
var defaultLang = $wrap.getAttribute('data-default-lang') || 'es';

// ===================== i18n =====================
let currentLang = 'es';

const I18N = {
  es: {
    hero_badge: 'DIAGNOSTICO ESG  /  FASE 1  /  GRATUITO',
    hero_title: 'Conoce el nivel <span>ESG</span> de tu empresa en 5 minutos',
    hero_sub: 'Evalua tu desempeno en sostenibilidad y obten un informe personalizado con tus areas criticas de mejora y recomendaciones accionables.',
    stat_questions: 'Preguntas',
    stat_modules: 'Modulos ESG',
    stat_free: 'Gratuito',
    stat_download: 'Descargable',
    card1_title: 'Registro SIR Valencia',
    card1_desc: 'Alineate con el sistema de indicadores del Registro de Entidades Valencianas Socialmente Responsables.',
    card2_title: 'Informe de madurez',
    card2_desc: 'Obten tu puntuacion en 5 dimensiones ESG con analisis de areas criticas, moderadas y positivas.',
    card3_title: 'Hoja de ruta',
    card3_desc: 'Observaciones concretas para mejorar cada area y acceder a ayudas y subvenciones publicas.',
    card4_title: 'Confidencial',
    card4_desc: 'Tus datos son exclusivamente para generar tu informe personalizado. Sin spam, ni cesion a terceros.',
    form_title: 'Comencemos con tu diagnostico',
    form_sub: 'Introduce los datos de tu empresa para personalizar el informe. Todos los campos son opcionales excepto el nombre.',
    label_company: 'Nombre de la empresa *',
    ph_company: 'Ej. TechGreen Solutions S.L.',
    label_sector: 'Sector de actividad',
    opt_select_sector: 'Selecciona tu sector',
    sector_tech: 'Tecnologia y software',
    sector_consulting: 'Consultoria y servicios',
    sector_retail: 'Comercio minorista',
    sector_industry: 'Industria y manufactura',
    sector_construction: 'Construccion y arquitectura',
    sector_hospitality: 'Hosteleria y turismo',
    sector_food: 'Alimentacion y agricultura',
    sector_health: 'Salud y bienestar',
    sector_education: 'Educacion y formacion',
    sector_marketing: 'Comunicacion y marketing',
    sector_logistics: 'Logistica y transporte',
    sector_other: 'Otro',
    label_size: 'Numero de empleados',
    opt_select_size: 'Selecciona tamano',
    label_ccaa: 'Comunidad autonoma',
    opt_select_ccaa: 'Selecciona',
    opt_other: 'Otra',
    label_contact: 'Tu nombre y apellido',
    ph_contact: 'Persona responsable del diagnostico',
    label_email: 'Email (para recibir el informe)',
    label_phone: 'Telefono (opcional)',
    consent_text: 'Acepto la politica de privacidad y el uso de mis datos para recibir el informe de diagnostico ESG y comunicaciones relacionadas con el programa. Puedo darme de baja en cualquier momento.',
    btn_start: 'Iniciar diagnostico ESG',
    start_note: 'Tiempo estimado: 5-8 minutos / Sin registro obligatorio',
    opt_no: 'No',
    opt_partial: 'En proceso',
    opt_yes: 'Si',
    btn_next: 'Siguiente modulo',
    btn_prev: 'Modulo anterior',
    btn_results: 'Ver mi diagnostico',
    answered_of: 'respondidas',
    question: 'Pregunta',
    of: 'de',
    level_critical: 'Critico',
    level_moderate: 'Moderado',
    level_good: 'Bueno',
    level_initial: 'Inicial',
    level_developing: 'En desarrollo',
    level_intermediate: 'Intermedio',
    level_advanced: 'Avanzado',
    results_completed: 'Diagnostico ESG completado',
    results_level: 'Nivel',
    radar_title: 'Mapa de madurez ESG',
    analysis_title: 'Analisis por areas',
    maturity_of: 'de madurez',
    points: 'puntos',
    disclaimer_title: 'Nota metodologica',
    disclaimer_text: 'Este diagnostico esta basado en el cuestionario ESG para PYMEs del programa Crece Sostenible 2025 y los indicadores del Registro SIR de la Comunitat Valenciana (DECRETO 200/2022). Es una herramienta de autoconocimiento orientativa.',
    btn_print: 'Imprimir informe',
    btn_pdf: 'Descargar PDF',
    cta_tag: 'PROXIMO PASO',
    cta_title: 'Listo para mejorar tu desempeno ESG y acceder a ayudas publicas?',
    cta_desc: 'Nuestro equipo de consultoria ESG disena para ti un plan de accion personalizado para superar las areas criticas detectadas, prepararte para el Registro SIR y mejorar tu puntuacion en convocatorias de subvenciones y licitaciones publicas.',
    cta_b1: 'Plan de mejora personalizado',
    cta_b2: 'Politicas y documentacion ESG',
    cta_b3: 'Preparacion Registro SIR',
    cta_b4: 'Acceso a ayudas y subvenciones',
    cta_b5: 'Estrategia de reporting',
    cta_submit: 'Quiero asesoramiento',
    cta_note: 'Sin compromiso / Primera sesion de diagnostico gratuita / Respondemos en 24h',
    btn_restart: 'Repetir diagnostico',
    toast_name_required: 'Por favor, introduce el nombre de tu empresa para continuar.',
    toast_unanswered: 'pregunta(s) sin responder en este modulo.',
    toast_sent: 'Solicitud recibida. Revisaremos tu diagnostico pronto.',
    toast_email_required: 'Por favor, introduce tu nombre y email para continuar.',
    toast_email_invalid: 'Introduce un email valido.',
    toast_print: 'Abriendo vista de impresion para guardar como PDF...',
    sent_title: 'Solicitud recibida!',
    sent_desc: 'Nos pondremos en contacto en menos de 24 horas.',
    global_desc_initial: 'Tu empresa da sus primeros pasos en ESG. Hay mucho camino por recorrer, pero empezar es lo mas dificil.',
    global_desc_developing: 'Tienes bases, pero necesitas sistematizar y documentar tus practicas ESG para alcanzar un nivel competitivo.',
    global_desc_intermediate: 'Tu empresa tiene un perfil ESG positivo. Con mejoras concretas en las areas moderadas, podras acceder al Registro SIR.',
    global_desc_advanced: 'Excelente desempeno ESG. Estas en condiciones de reportar formalmente y acceder a reconocimientos y ayudas publicas.',
    // Module names
    mod0_name: 'Modulo 1', mod0_title: 'Gobernanza y Estrategia ESG',
    mod0_desc: 'Evalua la integracion de la sostenibilidad en la estrategia, gestion de riesgos y estructura organizativa de tu empresa.',
    mod1_name: 'Modulo 2A', mod1_title: 'Medioambiente',
    mod1_desc: 'Evalua tus practicas ambientales: huella de carbono, gestion de residuos, consumo energetico e hidrico, y compromisos climaticos.',
    mod2_name: 'Modulo 2B', mod2_title: 'Social y Laboral',
    mod2_desc: 'Examina tus politicas laborales, igualdad, bienestar, seguridad, derechos humanos y compromiso comunitario.',
    mod3_name: 'Modulo 2C', mod3_title: 'Gobernanza Corporativa',
    mod3_desc: 'Analiza tus controles internos, codigo etico, anticorrupcion, diversidad directiva, compliance y gestion de grupos de interes.',
    mod4_name: 'Modulo 3', mod4_title: 'Cadena de Valor',
    mod4_desc: 'Evalua la integracion ESG en tu cadena de suministro, exigencias de clientes e inversores y transparencia en reporting.',
    // Short labels for radar
    radar_gov: 'Gobernanza ESG', radar_env: 'Medioambiente', radar_soc: 'Social', radar_corp: 'Gob. Corporativa', radar_chain: 'Cadena Valor',
    // Observations
    obs_m0_crit: 'Tu empresa carece de una base estrategica en sostenibilidad. Es urgente definir un proposito ESG y asignar responsabilidades formales. Sin esto, el acceso al Registro SIR y a subvenciones publicas es inviable.',
    obs_m0_mod: 'Tienes algunas bases de gobernanza ESG pero sin sistematizacion completa. Documenta tus politicas, define KPIs y establece un responsable de sostenibilidad para avanzar.',
    obs_m0_good: 'Tu estructura de gobernanza ESG es solida. Asegurate de actualizar periodicamente tu politica y mantener la alineacion estrategica con los objetivos de impacto.',
    obs_m1_crit: 'El area ambiental es la mas debil en tu diagnostico. Ni mides emisiones ni tienes un plan de reduccion energetica. Comienza por una auditoria energetica basica y formaliza una politica ambiental.',
    obs_m1_mod: 'Realizas algunas acciones ambientales pero de forma reactiva. Establece un plan formal con objetivos SMART de reduccion de huella, consumo de agua y gestion de residuos.',
    obs_m1_good: 'Demuestras madurez ambiental relevante. Profundiza en la medicion de alcance 3 y considera la certificacion de tu gestion ambiental para mayor visibilidad ante clientes e instituciones.',
    obs_m2_crit: 'Las politicas sociales y laborales presentan brechas significativas. Prioriza: plan de igualdad, politica de conciliacion, seguridad laboral documentada y proteccion de datos de empleados.',
    obs_m2_mod: 'Cumples con los requisitos basicos laborales pero te faltan politicas proactivas. Implementa evaluaciones de satisfaccion, formacion continua y metricas de igualdad para superar el nivel minimo.',
    obs_m2_good: 'Tu gestion social es un punto fuerte. Considera publicarlo como ventaja competitiva en licitaciones publicas y comunicaciones a clientes sobre tu responsabilidad social.',
    obs_m3_crit: 'La gobernanza corporativa es el area mas critica. Sin codigo etico, canal de denuncias ni controles anticorrupcion, no cumples los requisitos minimos del Registro SIR. Actua con urgencia.',
    obs_m3_mod: 'Tienes controles basicos pero te faltan elementos clave: canal anonimo de denuncias, politica formal anticorrupcion y evaluaciones periodicas de compliance.',
    obs_m3_good: 'La gobernanza corporativa esta bien desarrollada. Asegurate de mantener actualizado el mapeo de grupos de interes y el codigo de conducta de proveedores.',
    obs_m4_crit: 'Tu cadena de valor no integra criterios ESG. Esto te excluye de proveedores y clientes con politicas de compra responsable. Implementa un cuestionario ESG basico para proveedores clave.',
    obs_m4_mod: 'Empiezas a integrar ESG en tu cadena de valor pero de forma incompleta. Formaliza los criterios de evaluacion de proveedores y publica un primer informe de sostenibilidad, aunque sea simplificado.',
    obs_m4_good: 'Tu gestion de la cadena de valor ESG es positiva. Considera certificaciones como EcoVadis para potenciar la ventaja competitiva con grandes clientes y acceso a contratos publicos.',
    // Questions
    q1: 'Ha desarrollado o actualizado su proposito empresarial alineando la estrategia con sus compromisos de impacto ESG?',
    q2: 'Dispone la empresa de una politica o compromiso escrito sobre sostenibilidad?',
    q3: 'Tiene un sistema de gestion de riesgos que identifica, evalua y aborda los riesgos relacionados con la sostenibilidad?',
    q4: 'Se han identificado los riesgos y oportunidades ESG mas relevantes para el negocio?',
    q5: 'Integra la sostenibilidad en la estrategia empresarial a largo plazo?',
    q6: 'Se asignan responsabilidades claras sobre sostenibilidad (ej. Consejo, Direccion, area especifica)?',
    q7: 'Tiene la empresa elaborada una politica ambiental que establezca objetivos y metas alineadas con su estrategia corporativa?',
    q8: 'Conoce y mide la empresa el impacto medioambiental? Existe alguna evaluacion de riesgos ambientales?',
    q9: 'Establece objetivos ambientales basados en ciencia?',
    q10: 'Ha implementado un marco de sistemas para lograr una mejor gestion y desempeno ambiental?',
    q11: 'Mide la empresa sus emisiones de GEI (alcance 1 y 2)?',
    q12: 'Tiene objetivos de reduccion de emisiones o de eficiencia energetica?',
    q13: 'Ha establecido programas para reducir el uso de recursos, consumos y desperdicio?',
    q14: 'Evalua impactos en agua, residuos, materiales o biodiversidad?',
    q15: 'Forma o sensibiliza a tus empleados/as en materia de cambio climatico?',
    q16: 'Apuesta por las energias renovables?',
    q17: 'Implanta acciones de economia circular dentro de tu organizacion?',
    q18: 'Cumple con las regulaciones ambientales locales y forma regularmente a sus empleados en estas regulaciones?',
    q19: 'Sus condiciones laborales estan totalmente alineadas con toda la legislacion relevante con procesos robustos para garantizar su cumplimiento?',
    q20: 'Tiene politicas en vigor que apoyan el bienestar de los empleados?',
    q21: 'Dispone de politica de igualdad y diversidad en la plantilla?',
    q22: 'Fomenta la igualdad y la diversidad en tu organizacion?',
    q23: 'Realiza auditorias de igualdad salarial y de genero?',
    q24: 'Mide tu brecha salarial?',
    q25: 'Realiza formacion en sostenibilidad/etica para empleados?',
    q26: 'Proporciona condiciones de trabajo seguras y saludables?',
    q27: 'Monitorea la seguridad y salud laboral?',
    q28: 'Dispone la empresa de una politica de conciliacion laboral y familiar?',
    q29: 'Mejora la conciliacion laboral?',
    q30: 'Evalua periodicamente la satisfaccion de los empleados/as?',
    q31: 'Promueve la formacion continua y el desarrollo de carrera de sus empleados/as?',
    q32: 'Colabora con la comunidad local en proyectos sociales o educativos?',
    q33: 'Incorpora los derechos humanos y las normas laborales en tu gestion empresarial?',
    q34: 'Forma o sensibiliza a tus empleados/as en derechos humanos y normas laborales?',
    q35: 'Se compromete contra el trabajo forzoso e infantil?',
    q36: 'Integra a personas con discapacidad en el ambito laboral?',
    q37: 'Tienes politicas para la proteccion de datos de los consumidores e informacion precisa sobre productos/servicios?',
    q38: 'Tienes practicas modernas de gobernanza, controles internos robustos y politicas para conflictos de intereses, denuncias y anticorrupcion?',
    q39: 'Dispone de un codigo etico o de conducta?',
    q40: 'Tiene politica contra la corrupcion y soborno?',
    q41: 'Cuenta con un organo de gobierno diverso (genero, experiencia, independencia)?',
    q42: 'Publica informacion sobre la remuneracion y criterios de desempeno de la alta direccion?',
    q43: 'Realiza evaluaciones periodicas de riesgos de cumplimiento (compliance)?',
    q44: 'Dispone de un canal etico anonimo y accesible para todos los grupos de interes?',
    q45: 'Tiene identificado a sus principales grupos de interes y analizado el impacto e influencia de cada uno?',
    q46: 'La direccion y los empleados estan plenamente comprometidos en la configuracion y el apoyo de sus objetivos de sostenibilidad?',
    q47: 'Cuenta con un codigo de conducta de proveedores?',
    q48: 'Sus sistemas de TI cumplen con las regulaciones de privacidad de datos y forma regularmente a los empleados sobre privacidad?',
    q49: 'Solicitan sus clientes o inversores informacion ESG (ej. EcoVadis, CDP, CSRD)?',
    q50: 'Evalua ESG en sus proveedores (criterios ambientales/sociales)?',
    q51: 'Evalua su cadena de suministro por los riesgos relacionados con la esclavitud moderna y el trabajo infantil?',
    q52: 'Publica la empresa un informe de sostenibilidad o similar?',
  },
  ca: {
    hero_badge: 'DIAGNOSTIC ESG  /  FASE 1  /  GRATUIT',
    hero_title: 'Coneix el nivell <span>ESG</span> de la teua empresa en 5 minuts',
    hero_sub: 'Avalua el teu acompliment en sostenibilitat i obtin un informe personalitzat amb les teues arees critiques de millora i recomanacions accionables.',
    stat_questions: 'Preguntes',
    stat_modules: 'Moduls ESG',
    stat_free: 'Gratuit',
    stat_download: 'Descarregable',
    card1_title: 'Registre SIR Valencia',
    card1_desc: "Alinea't amb el sistema d'indicadors del Registre d'Entitats Valencianes Socialment Responsables.",
    card2_title: 'Informe de maduresa',
    card2_desc: 'Obtin la teua puntuacio en 5 dimensions ESG amb analisi d\'arees critiques, moderades i positives.',
    card3_title: 'Full de ruta',
    card3_desc: 'Observacions concretes per a millorar cada area i accedir a ajudes i subvencions publiques.',
    card4_title: 'Confidencial',
    card4_desc: 'Les teues dades son exclusivament per a generar el teu informe personalitzat. Sense spam, ni cessio a tercers.',
    form_title: 'Comencem amb el teu diagnostic',
    form_sub: "Introdueix les dades de la teua empresa per a personalitzar l'informe. Tots els camps son opcionals excepte el nom.",
    label_company: 'Nom de l\'empresa *',
    ph_company: 'Ex. TechGreen Solutions S.L.',
    label_sector: 'Sector d\'activitat',
    opt_select_sector: 'Selecciona el teu sector',
    sector_tech: 'Tecnologia i programari',
    sector_consulting: 'Consultoria i serveis',
    sector_retail: 'Comerc minorista',
    sector_industry: 'Industria i manufactura',
    sector_construction: 'Construccio i arquitectura',
    sector_hospitality: 'Hostaleria i turisme',
    sector_food: 'Alimentacio i agricultura',
    sector_health: 'Salut i benestar',
    sector_education: 'Educacio i formacio',
    sector_marketing: 'Comunicacio i marketing',
    sector_logistics: 'Logistica i transport',
    sector_other: 'Altre',
    label_size: 'Nombre d\'empleats',
    opt_select_size: 'Selecciona grandaria',
    label_ccaa: 'Comunitat autonoma',
    opt_select_ccaa: 'Selecciona',
    opt_other: 'Altra',
    label_contact: 'El teu nom i cognom',
    ph_contact: 'Persona responsable del diagnostic',
    label_email: 'Email (per a rebre l\'informe)',
    label_phone: 'Telefon (opcional)',
    consent_text: "Accepte la politica de privacitat i l'us de les meues dades per a rebre l'informe de diagnostic ESG i comunicacions relacionades amb el programa. Puc donar-me de baixa en qualsevol moment.",
    btn_start: 'Iniciar diagnostic ESG',
    start_note: 'Temps estimat: 5-8 minuts / Sense registre obligatori',
    opt_no: 'No',
    opt_partial: 'En proces',
    opt_yes: 'Si',
    btn_next: 'Seguent modul',
    btn_prev: 'Modul anterior',
    btn_results: 'Veure el meu diagnostic',
    answered_of: 'respostes',
    question: 'Pregunta',
    of: 'de',
    level_critical: 'Critic',
    level_moderate: 'Moderat',
    level_good: 'Bo',
    level_initial: 'Inicial',
    level_developing: 'En desenvolupament',
    level_intermediate: 'Intermedi',
    level_advanced: 'Avancat',
    results_completed: 'Diagnostic ESG completat',
    results_level: 'Nivell',
    radar_title: 'Mapa de maduresa ESG',
    analysis_title: 'Analisi per arees',
    maturity_of: 'de maduresa',
    points: 'punts',
    disclaimer_title: 'Nota metodologica',
    disclaimer_text: "Este diagnostic esta basat en el questionari ESG per a PIMEs del programa Creix Sostenible 2025 i els indicadors del Registre SIR de la Comunitat Valenciana (DECRET 200/2022). Es una ferramenta d'autoconeixement orientativa.",
    btn_print: 'Imprimir informe',
    btn_pdf: 'Descarregar PDF',
    cta_tag: 'PROXIM PAS',
    cta_title: 'Preparat per a millorar el teu acompliment ESG i accedir a ajudes publiques?',
    cta_desc: "El nostre equip de consultoria ESG dissenya per a tu un pla d'accio personalitzat per a superar les arees critiques detectades, preparar-te per al Registre SIR i millorar la teua puntuacio en convocatories de subvencions i licitacions publiques.",
    cta_b1: 'Pla de millora personalitzat',
    cta_b2: 'Politiques i documentacio ESG',
    cta_b3: 'Preparacio Registre SIR',
    cta_b4: 'Acces a ajudes i subvencions',
    cta_b5: 'Estrategia de reporting',
    cta_submit: 'Vull assessorament',
    cta_note: 'Sense compromis / Primera sessio de diagnostic gratuita / Responem en 24h',
    btn_restart: 'Repetir diagnostic',
    toast_name_required: 'Per favor, introdueix el nom de la teua empresa per a continuar.',
    toast_unanswered: 'pregunta/es sense respondre en este modul.',
    toast_sent: 'Sol-licitud rebuda. Revisarem el teu diagnostic prompte.',
    toast_email_required: 'Per favor, introdueix el teu nom i email per a continuar.',
    toast_email_invalid: 'Introdueix un email valid.',
    toast_print: 'Obrint vista d\'impressio per a guardar com a PDF...',
    sent_title: 'Sol-licitud rebuda!',
    sent_desc: 'Ens posarem en contacte en menys de 24 hores.',
    global_desc_initial: 'La teua empresa dona els primers passos en ESG. Hi ha molt cami per recorrer, pero comencar es el mes dificil.',
    global_desc_developing: 'Tens bases, pero necessites sistematitzar i documentar les teues practiques ESG per a aconseguir un nivell competitiu.',
    global_desc_intermediate: 'La teua empresa te un perfil ESG positiu. Amb millores concretes en les arees moderades, podras accedir al Registre SIR.',
    global_desc_advanced: 'Excel-lent acompliment ESG. Estas en condicions de reportar formalment i accedir a reconeixements i ajudes publiques.',
    mod0_name: 'Modul 1', mod0_title: 'Governanca i Estrategia ESG',
    mod0_desc: "Avalua la integracio de la sostenibilitat en l'estrategia, gestio de riscos i estructura organitzativa de la teua empresa.",
    mod1_name: 'Modul 2A', mod1_title: 'Medi ambient',
    mod1_desc: "Avalua les teues practiques ambientals: petjada de carboni, gestio de residus, consum energetic i hidric, i compromisos climatics.",
    mod2_name: 'Modul 2B', mod2_title: 'Social i Laboral',
    mod2_desc: 'Examina les teues politiques laborals, igualtat, benestar, seguretat, drets humans i compromis comunitari.',
    mod3_name: 'Modul 2C', mod3_title: 'Governanca Corporativa',
    mod3_desc: "Analitza els teus controls interns, codi etic, anticorrupcio, diversitat directiva, compliance i gestio de grups d'interes.",
    mod4_name: 'Modul 3', mod4_title: 'Cadena de Valor',
    mod4_desc: "Avalua la integracio ESG en la teua cadena de subministrament, exigencies de clients i inversors i transparencia en reporting.",
    radar_gov: 'Governanca ESG', radar_env: 'Medi ambient', radar_soc: 'Social', radar_corp: 'Gov. Corporativa', radar_chain: 'Cadena Valor',
    obs_m0_crit: 'La teua empresa no te una base estrategica en sostenibilitat. Es urgent definir un proposit ESG i assignar responsabilitats formals.',
    obs_m0_mod: 'Tens algunes bases de governanca ESG pero sense sistematitzacio completa. Documenta les teues politiques i defineix KPIs.',
    obs_m0_good: 'La teua estructura de governanca ESG es solida. Assegura\'t d\'actualitzar periodicament la teua politica.',
    obs_m1_crit: 'L\'area ambiental es la mes debil. Ni mesures emissions ni tens un pla de reduccio energetica. Comenca per una auditoria energetica basica.',
    obs_m1_mod: 'Realitzes algunes accions ambientals pero de forma reactiva. Estableix un pla formal amb objectius SMART.',
    obs_m1_good: 'Demostres maduresa ambiental rellevant. Aprofundeix en la mesura d\'abast 3 i considera la certificacio ambiental.',
    obs_m2_crit: 'Les politiques socials i laborals presenten bretxes significatives. Prioritza: pla d\'igualtat, conciliacio i seguretat laboral.',
    obs_m2_mod: 'Compleixes amb els requisits basics laborals pero et falten politiques proactives. Implementa avaluacions de satisfaccio.',
    obs_m2_good: 'La teua gestio social es un punt fort. Considera publicar-ho com a avantatge competitiu en licitacions publiques.',
    obs_m3_crit: 'La governanca corporativa es l\'area mes critica. Sense codi etic, canal de denuncies ni controls anticorrupcio.',
    obs_m3_mod: 'Tens controls basics pero et falten elements clau: canal anonim de denuncies i politica formal anticorrupcio.',
    obs_m3_good: 'La governanca corporativa esta ben desenvolupada. Mante actualitzat el mapa de grups d\'interes.',
    obs_m4_crit: 'La teua cadena de valor no integra criteris ESG. Implementa un questionari ESG basic per a proveidors clau.',
    obs_m4_mod: 'Comences a integrar ESG en la teua cadena de valor pero de forma incompleta. Formalitza els criteris d\'avaluacio de proveidors.',
    obs_m4_good: 'La teua gestio de la cadena de valor ESG es positiva. Considera certificacions com EcoVadis.',
    q1: "Ha desenvolupat o actualitzat el seu proposit empresarial alineant l'estrategia amb els seus compromisos d'impacte ESG?",
    q2: "Disposa l'empresa d'una politica o compromis escrit sobre sostenibilitat?",
    q3: "Te un sistema de gestio de riscos que identifica, avalua i aborda els riscos relacionats amb la sostenibilitat?",
    q4: "S'han identificat els riscos i oportunitats ESG mes rellevants per al negoci?",
    q5: "Integra la sostenibilitat en l'estrategia empresarial a llarg termini?",
    q6: "S'assignen responsabilitats clares sobre sostenibilitat (ex. Consell, Direccio, area especifica)?",
    q7: "Te l'empresa elaborada una politica ambiental que establisca objectius i metes alineades amb la seua estrategia corporativa?",
    q8: "Coneix i mesura l'empresa l'impacte mediambiental? Existeix alguna avaluacio de riscos ambientals?",
    q9: "Estableix objectius ambientals basats en ciencia?",
    q10: "Ha implementat un marc de sistemes per a aconseguir una millor gestio i acompliment ambiental?",
    q11: "Mesura l'empresa les seues emissions de GEH (abast 1 i 2)?",
    q12: "Te objectius de reduccio d'emissions o d'eficiencia energetica?",
    q13: "Ha establert programes per a reduir l'us de recursos, consums i malbaratament?",
    q14: "Avalua impactes en aigua, residus, materials o biodiversitat?",
    q15: "Forma o sensibilitza als teus empleats/des en materia de canvi climatic?",
    q16: "Aposta per les energies renovables?",
    q17: "Implanta accions d'economia circular dins de la teua organizacio?",
    q18: "Compleix amb les regulacions ambientals locals i forma regularment als seus empleats en estes regulacions?",
    q19: "Les seues condicions laborals estan totalment alineades amb tota la legislacio rellevant amb processos robustos per a garantir el seu compliment?",
    q20: "Te politiques en vigor que donen suport al benestar dels empleats?",
    q21: "Disposa de politica d'igualtat i diversitat en la plantilla?",
    q22: "Fomenta la igualtat i la diversitat en la teua organizacio?",
    q23: "Realitza auditories d'igualtat salarial i de genere?",
    q24: "Mesura la teua bretxa salarial?",
    q25: "Realitza formacio en sostenibilitat/etica per a empleats?",
    q26: "Proporciona condicions de treball segures i saludables?",
    q27: "Monitoritza la seguretat i salut laboral?",
    q28: "Disposa l'empresa d'una politica de conciliacio laboral i familiar?",
    q29: "Millora la conciliacio laboral?",
    q30: "Avalua periodicament la satisfaccio dels empleats/des?",
    q31: "Promou la formacio continua i el desenvolupament de carrera dels seus empleats/des?",
    q32: "Col-labora amb la comunitat local en projectes socials o educatius?",
    q33: "Incorpora els drets humans i les normes laborals en la teua gestio empresarial?",
    q34: "Forma o sensibilitza als teus empleats/des en drets humans i normes laborals?",
    q35: "Es compromet contra el treball forcos i infantil?",
    q36: "Integra a persones amb discapacitat en l'ambit laboral?",
    q37: "Tens politiques per a la proteccio de dades dels consumidors i informacio precisa sobre productes/serveis?",
    q38: "Tens practiques modernes de governanca, controls interns robustos i politiques per a conflictes d'interessos, denuncies i anticorrupcio?",
    q39: "Disposa d'un codi etic o de conducta?",
    q40: "Te politica contra la corrupcio i suborn?",
    q41: "Compta amb un organ de govern divers (genere, experiencia, independencia)?",
    q42: "Publica informacio sobre la remuneracio i criteris d'acompliment de l'alta direccio?",
    q43: "Realitza avaluacions periodiques de riscos de compliment (compliance)?",
    q44: "Disposa d'un canal etic anonim i accessible per a tots els grups d'interes?",
    q45: "Te identificat als seus principals grups d'interes i analitzat l'impacte i influencia de cadascun?",
    q46: "La direccio i els empleats estan plenament compromesos en la configuracio i el suport dels seus objectius de sostenibilitat?",
    q47: "Compta amb un codi de conducta de proveidors?",
    q48: "Els seus sistemes de TI compleixen amb les regulacions de privacitat de dades i forma regularment als empleats sobre privacitat?",
    q49: "Sol-liciten els seus clients o inversors informacio ESG (ex. EcoVadis, CDP, CSRD)?",
    q50: "Avalua ESG en els seus proveidors (criteris ambientals/socials)?",
    q51: "Avalua la seua cadena de subministrament pels riscos relacionats amb l'esclavitud moderna i el treball infantil?",
    q52: "Publica l'empresa un informe de sostenibilitat o similar?",
  },
  en: {
    hero_badge: 'ESG DIAGNOSTIC  /  PHASE 1  /  FREE',
    hero_title: 'Discover your company\'s <span>ESG</span> level in 5 minutes',
    hero_sub: 'Assess your sustainability performance and get a personalized report with your critical improvement areas and actionable recommendations.',
    stat_questions: 'Questions',
    stat_modules: 'ESG Modules',
    stat_free: 'Free',
    stat_download: 'Downloadable',
    card1_title: 'SIR Registry Valencia',
    card1_desc: 'Align with the indicator system of the Valencian Registry of Socially Responsible Entities.',
    card2_title: 'Maturity Report',
    card2_desc: 'Get your score across 5 ESG dimensions with analysis of critical, moderate and positive areas.',
    card3_title: 'Roadmap',
    card3_desc: 'Specific observations to improve each area and access public grants and subsidies.',
    card4_title: 'Confidential',
    card4_desc: 'Your data is used exclusively to generate your personalized report. No spam, no third-party sharing.',
    form_title: 'Let\'s start your diagnostic',
    form_sub: 'Enter your company details to personalize the report. All fields are optional except the name.',
    label_company: 'Company name *',
    ph_company: 'E.g. TechGreen Solutions S.L.',
    label_sector: 'Industry sector',
    opt_select_sector: 'Select your sector',
    sector_tech: 'Technology & software',
    sector_consulting: 'Consulting & services',
    sector_retail: 'Retail',
    sector_industry: 'Industry & manufacturing',
    sector_construction: 'Construction & architecture',
    sector_hospitality: 'Hospitality & tourism',
    sector_food: 'Food & agriculture',
    sector_health: 'Health & wellness',
    sector_education: 'Education & training',
    sector_marketing: 'Communication & marketing',
    sector_logistics: 'Logistics & transport',
    sector_other: 'Other',
    label_size: 'Number of employees',
    opt_select_size: 'Select size',
    label_ccaa: 'Region',
    opt_select_ccaa: 'Select',
    opt_other: 'Other',
    label_contact: 'Your full name',
    ph_contact: 'Person responsible for the diagnostic',
    label_email: 'Email (to receive the report)',
    label_phone: 'Phone (optional)',
    consent_text: 'I accept the privacy policy and the use of my data to receive the ESG diagnostic report and related communications. I can unsubscribe at any time.',
    btn_start: 'Start ESG diagnostic',
    start_note: 'Estimated time: 5-8 minutes / No registration required',
    opt_no: 'No',
    opt_partial: 'In progress',
    opt_yes: 'Yes',
    btn_next: 'Next module',
    btn_prev: 'Previous module',
    btn_results: 'View my diagnostic',
    answered_of: 'answered',
    question: 'Question',
    of: 'of',
    level_critical: 'Critical',
    level_moderate: 'Moderate',
    level_good: 'Good',
    level_initial: 'Initial',
    level_developing: 'Developing',
    level_intermediate: 'Intermediate',
    level_advanced: 'Advanced',
    results_completed: 'ESG Diagnostic completed',
    results_level: 'Level',
    radar_title: 'ESG Maturity Map',
    analysis_title: 'Analysis by areas',
    maturity_of: 'maturity',
    points: 'points',
    disclaimer_title: 'Methodological note',
    disclaimer_text: 'This diagnostic is based on the ESG questionnaire for SMEs from the Crece Sostenible 2025 program and the SIR Registry indicators of the Valencian Community (DECREE 200/2022). It is an indicative self-assessment tool.',
    btn_print: 'Print report',
    btn_pdf: 'Download PDF',
    cta_tag: 'NEXT STEP',
    cta_title: 'Ready to improve your ESG performance and access public grants?',
    cta_desc: 'Our ESG consulting team designs a personalized action plan for you to overcome the critical areas detected, prepare for the SIR Registry and improve your score in grant calls and public tenders.',
    cta_b1: 'Personalized improvement plan',
    cta_b2: 'ESG policies & documentation',
    cta_b3: 'SIR Registry preparation',
    cta_b4: 'Access to grants & subsidies',
    cta_b5: 'Reporting strategy',
    cta_submit: 'I want advisory',
    cta_note: 'No commitment / Free first diagnostic session / We respond in 24h',
    btn_restart: 'Restart diagnostic',
    toast_name_required: 'Please enter your company name to continue.',
    toast_unanswered: 'unanswered question(s) in this module.',
    toast_sent: 'Request received. We will review your diagnostic soon.',
    toast_email_required: 'Please enter your name and email to continue.',
    toast_email_invalid: 'Please enter a valid email.',
    toast_print: 'Opening print view to save as PDF...',
    sent_title: 'Request received!',
    sent_desc: 'We will contact you within 24 hours.',
    global_desc_initial: 'Your company is taking its first steps in ESG. There is a long way to go, but starting is the hardest part.',
    global_desc_developing: 'You have foundations, but you need to systematize and document your ESG practices to reach a competitive level.',
    global_desc_intermediate: 'Your company has a positive ESG profile. With concrete improvements in moderate areas, you can access the SIR Registry.',
    global_desc_advanced: 'Excellent ESG performance. You are ready to formally report and access public recognitions and grants.',
    mod0_name: 'Module 1', mod0_title: 'ESG Governance & Strategy',
    mod0_desc: 'Assess the integration of sustainability into the strategy, risk management and organizational structure of your company.',
    mod1_name: 'Module 2A', mod1_title: 'Environment',
    mod1_desc: 'Assess your environmental practices: carbon footprint, waste management, energy and water consumption, and climate commitments.',
    mod2_name: 'Module 2B', mod2_title: 'Social & Labour',
    mod2_desc: 'Examine your labour policies, equality, wellbeing, safety, human rights and community engagement.',
    mod3_name: 'Module 2C', mod3_title: 'Corporate Governance',
    mod3_desc: 'Analyze your internal controls, code of ethics, anti-corruption, board diversity, compliance and stakeholder management.',
    mod4_name: 'Module 3', mod4_title: 'Value Chain',
    mod4_desc: 'Assess ESG integration in your supply chain, client and investor requirements and reporting transparency.',
    radar_gov: 'ESG Governance', radar_env: 'Environment', radar_soc: 'Social', radar_corp: 'Corp. Governance', radar_chain: 'Value Chain',
    obs_m0_crit: 'Your company lacks a strategic foundation in sustainability. It is urgent to define an ESG purpose and assign formal responsibilities.',
    obs_m0_mod: 'You have some ESG governance foundations but without complete systematization. Document your policies and define KPIs.',
    obs_m0_good: 'Your ESG governance structure is solid. Make sure to periodically update your policy and maintain strategic alignment.',
    obs_m1_crit: 'The environmental area is the weakest. You neither measure emissions nor have an energy reduction plan. Start with a basic energy audit.',
    obs_m1_mod: 'You carry out some environmental actions but reactively. Establish a formal plan with SMART reduction targets.',
    obs_m1_good: 'You demonstrate relevant environmental maturity. Deepen scope 3 measurement and consider environmental certification.',
    obs_m2_crit: 'Social and labour policies show significant gaps. Prioritize: equality plan, work-life balance, documented workplace safety.',
    obs_m2_mod: 'You meet basic labour requirements but lack proactive policies. Implement satisfaction surveys and continuous training.',
    obs_m2_good: 'Your social management is a strong point. Consider publishing it as a competitive advantage in public tenders.',
    obs_m3_crit: 'Corporate governance is the most critical area. Without a code of ethics, whistleblower channel or anti-corruption controls.',
    obs_m3_mod: 'You have basic controls but lack key elements: anonymous whistleblower channel and formal anti-corruption policy.',
    obs_m3_good: 'Corporate governance is well developed. Keep your stakeholder mapping and supplier code of conduct updated.',
    obs_m4_crit: 'Your value chain does not integrate ESG criteria. Implement a basic ESG questionnaire for key suppliers.',
    obs_m4_mod: 'You are beginning to integrate ESG into your value chain but incompletely. Formalize supplier evaluation criteria.',
    obs_m4_good: 'Your ESG value chain management is positive. Consider certifications like EcoVadis for competitive advantage.',
    q1: 'Has the company developed or updated its corporate purpose aligning the strategy with its ESG impact commitments?',
    q2: 'Does the company have a written sustainability policy or commitment?',
    q3: 'Does it have a risk management system that identifies, assesses and addresses sustainability-related risks?',
    q4: 'Have the most relevant ESG risks and opportunities for the business been identified?',
    q5: 'Does it integrate sustainability into the long-term business strategy?',
    q6: 'Are clear sustainability responsibilities assigned (e.g. Board, Management, specific area)?',
    q7: 'Does the company have an environmental policy with objectives and targets aligned with its corporate strategy?',
    q8: 'Does the company know and measure its environmental impact? Is there an environmental risk assessment?',
    q9: 'Does it set science-based environmental targets?',
    q10: 'Has it implemented a management systems framework for better environmental performance?',
    q11: 'Does the company measure its GHG emissions (scope 1 and 2)?',
    q12: 'Does it have emissions reduction or energy efficiency targets?',
    q13: 'Has it established programs to reduce resource use, consumption and waste?',
    q14: 'Does it assess impacts on water, waste, materials or biodiversity?',
    q15: 'Does it train or raise awareness among employees on climate change?',
    q16: 'Does it commit to renewable energy?',
    q17: 'Does it implement circular economy actions within the organization?',
    q18: 'Does it comply with local environmental regulations and regularly train employees on them?',
    q19: 'Are labour conditions fully aligned with all relevant legislation with robust compliance processes?',
    q20: 'Does it have policies that support employee wellbeing?',
    q21: 'Does it have an equality and diversity policy for staff?',
    q22: 'Does it promote equality and diversity in the organization?',
    q23: 'Does it conduct pay and gender equality audits?',
    q24: 'Does it measure its pay gap?',
    q25: 'Does it provide sustainability/ethics training for employees?',
    q26: 'Does it provide safe and healthy working conditions?',
    q27: 'Does it monitor occupational health and safety?',
    q28: 'Does the company have a work-life balance policy?',
    q29: 'Does it improve work-life balance?',
    q30: 'Does it regularly assess employee satisfaction?',
    q31: 'Does it promote continuous training and career development?',
    q32: 'Does it collaborate with the local community on social or educational projects?',
    q33: 'Does it incorporate human rights and labour standards into business management?',
    q34: 'Does it train employees on human rights and labour standards?',
    q35: 'Is it committed against forced and child labour?',
    q36: 'Does it integrate people with disabilities in the workplace?',
    q37: 'Do you have consumer data protection policies and accurate product/service information?',
    q38: 'Do you have modern governance practices, robust internal controls and policies for conflicts of interest, whistleblowing and anti-corruption?',
    q39: 'Does it have a code of ethics or conduct?',
    q40: 'Does it have an anti-corruption and bribery policy?',
    q41: 'Does it have a diverse governing body (gender, experience, independence)?',
    q42: 'Does it publish information on senior management remuneration and performance criteria?',
    q43: 'Does it conduct periodic compliance risk assessments?',
    q44: 'Does it have an anonymous and accessible ethical channel for all stakeholders?',
    q45: 'Has it identified its main stakeholders and analyzed the impact and influence of each?',
    q46: 'Are management and employees fully committed to shaping and supporting sustainability objectives?',
    q47: 'Does it have a supplier code of conduct?',
    q48: 'Do IT systems comply with data privacy regulations and are employees regularly trained on privacy?',
    q49: 'Do clients or investors request ESG information (e.g. EcoVadis, CDP, CSRD)?',
    q50: 'Does it assess ESG in its suppliers (environmental/social criteria)?',
    q51: 'Does it assess its supply chain for risks related to modern slavery and child labour?',
    q52: 'Does the company publish a sustainability report or similar?',
  }
};

function t(key) {
  return I18N[currentLang][key] || I18N['es'][key] || key;
}

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.lang-btn[onclick="DESG.setLang('${lang}')"]`).classList.add('active');
  document.documentElement.lang = lang === 'ca' ? 'ca' : lang === 'en' ? 'en' : 'es';
  applyTranslations();
  buildModules();
  // Re-select answers in current module
  Object.keys(answers).forEach(qid => {
    const val = answers[qid];
    const card = document.getElementById('qcard-' + qid);
    if (card) {
      card.querySelectorAll('.q-opt').forEach(o => o.className = 'q-opt');
      const opts = card.querySelectorAll('.q-opt');
      if (opts[val]) opts[val].classList.add('selected-' + val);
      card.classList.add('answered');
    }
  });
  updateProgress();
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (val) el.innerHTML = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const val = t(key);
    if (val) el.placeholder = val;
  });
}

// ===================== DATA =====================
const QUESTION_IDS = {
  m0: [1,2,3,4,5,6],
  m1: [7,8,9,10,11,12,13,14,15,16,17,18],
  m2: [19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37],
  m3: [38,39,40,41,42,43,44,45,46,47,48],
  m4: [49,50,51,52]
};

const MODULE_KEYS = ['m0','m1','m2','m3','m4'];
const MAX_SCORES = [12, 24, 38, 22, 8];

function getModules() {
  return MODULE_KEYS.map((key, i) => ({
    id: key,
    name: t(`mod${i}_name`),
    title: t(`mod${i}_title`),
    desc: t(`mod${i}_desc`),
    questions: QUESTION_IDS[key].map(qid => ({
      id: qid,
      text: t('q' + qid)
    }))
  }));
}

function getObs(mi, level) {
  const key = MODULE_KEYS[mi];
  if (level === 'critical') return t('obs_' + key + '_crit');
  if (level === 'moderate') return t('obs_' + key + '_mod');
  return t('obs_' + key + '_good');
}

const RADAR_LABELS_KEYS = ['radar_gov','radar_env','radar_soc','radar_corp','radar_chain'];

// ===================== STATE =====================
let answers = {};
let currentModule = 0;
let companyData = {};

// ===================== SVG ICONS =====================
const ICON_NO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
const ICON_PARTIAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>';
const ICON_YES = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';

// ===================== BUILD MODULES =====================
function buildModules() {
  const modules = getModules();
  modules.forEach((mod, mi) => {
    const wrap = document.getElementById('screen-' + mod.id);
    let html = `
      <div class="module-header fade-up">
        <div class="module-pill">${mod.name}</div>
        <h2>${mod.title}</h2>
        <p>${mod.desc}</p>
      </div>
    `;
    mod.questions.forEach((q, qi) => {
      html += `
        <div class="question-card" id="qcard-${q.id}" data-qid="${q.id}">
          <div class="q-number">${mod.name} &middot; ${t('question')} ${qi+1} ${t('of')} ${mod.questions.length}</div>
          <div class="q-text">${q.text}</div>
          <div class="q-options">
            <div class="q-opt" onclick="DESG.answer(${q.id}, 0, this)" data-val="0">
              <div class="opt-icon icon-no">${ICON_NO}</div>
              <span class="opt-val">0</span>
              <span class="opt-label">${t('opt_no')}</span>
            </div>
            <div class="q-opt" onclick="DESG.answer(${q.id}, 1, this)" data-val="1">
              <div class="opt-icon icon-partial">${ICON_PARTIAL}</div>
              <span class="opt-val">1</span>
              <span class="opt-label">${t('opt_partial')}</span>
            </div>
            <div class="q-opt" onclick="DESG.answer(${q.id}, 2, this)" data-val="2">
              <div class="opt-icon icon-yes">${ICON_YES}</div>
              <span class="opt-val">2</span>
              <span class="opt-label">${t('opt_yes')}</span>
            </div>
          </div>
        </div>
      `;
    });

    const isLast = mi === modules.length - 1;
    html += `
      <div class="nav-buttons">
        ${mi > 0 ? `<button class="btn-secondary" onclick="DESG.prevModule()">&larr; ${t('btn_prev')}</button>` : '<div></div>'}
        <span class="step-info" id="step-info-${mi}">0 / ${mod.questions.length} ${t('answered_of')}</span>
        ${isLast
          ? `<button class="btn-primary" id="btn-next-${mi}" onclick="DESG.showResults()">${t('btn_results')} &rarr;</button>`
          : `<button class="btn-primary" id="btn-next-${mi}" onclick="DESG.nextModule()">${t('btn_next')} <span class="arrow">&rarr;</span></button>`
        }
      </div>
    `;
    wrap.innerHTML = html;
  });
}

// ===================== ANSWER =====================
function answer(qid, val, el) {
  const card = document.getElementById('qcard-' + qid);
  card.querySelectorAll('.q-opt').forEach(o => o.className = 'q-opt');
  el.classList.add('selected-' + val);
  answers[qid] = val;
  card.classList.add('answered');
  updateProgress();
}

function updateProgress() {
  const modules = getModules();
  const mod = modules[currentModule];
  const answered = mod.questions.filter(q => answers[q.id] !== undefined).length;
  const total = mod.questions.length;
  const si = document.getElementById('step-info-' + currentModule);
  if (si) si.textContent = `${answered} / ${total} ${t('answered_of')}`;
  const totalQ = modules.reduce((s, m) => s + m.questions.length, 0);
  const totalAns = Object.keys(answers).length;
  const pct = Math.round((totalAns / totalQ) * 100);
  document.getElementById('prog-fill').style.width = pct + '%';
  document.getElementById('prog-q-label').textContent = `${t('question')} ${totalAns} ${t('of')} ${totalQ}`;
  document.getElementById('prog-module-label').textContent = modules[currentModule].name + ': ' + modules[currentModule].title;
}

// ===================== NAVIGATION =====================
function startDiagnostic() {
  const nombre = document.getElementById('empresa-nombre').value.trim();
  if (!nombre) {
    showToast(t('toast_name_required'));
    return;
  }
  companyData = {
    nombre,
    date: new Date().toLocaleDateString(currentLang === 'en' ? 'en-GB' : 'es-ES', {day:'2-digit',month:'long',year:'numeric'})
  };
  showScreen('screen-m0');
  currentModule = 0;
  document.getElementById('progress-wrap').classList.add('visible');
  updateProgress();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextModule() {
  const modules = getModules();
  const mod = modules[currentModule];
  const unanswered = mod.questions.filter(q => answers[q.id] === undefined).length;
  if (unanswered > 0) {
    showToast(`${unanswered} ${t('toast_unanswered')}`);
  }
  currentModule++;
  showScreen('screen-' + modules[currentModule].id);
  updateProgress();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevModule() {
  const modules = getModules();
  if (currentModule > 0) {
    currentModule--;
    showScreen('screen-' + modules[currentModule].id);
    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ===================== CALCULATE =====================
function calcResults() {
  const modules = getModules();
  return modules.map((mod, mi) => {
    const score = mod.questions.reduce((s, q) => s + (answers[q.id] || 0), 0);
    const max = MAX_SCORES[mi];
    const pct = Math.round((score / max) * 100);
    let level;
    if (pct < 40) level = 'critical';
    else if (pct < 70) level = 'moderate';
    else level = 'good';
    return { mod, score, max, pct, level };
  });
}

function levelLabel(l) {
  if (l === 'critical') return t('level_critical');
  if (l === 'moderate') return t('level_moderate');
  return t('level_good');
}

function levelDot(l) {
  if (l === 'critical') return '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--case-red);margin-right:4px;"></span>';
  if (l === 'moderate') return '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--case-orange);margin-right:4px;"></span>';
  return '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--case-green);margin-right:4px;"></span>';
}

function globalLevel(pct) {
  if (pct < 35) return { label: t('level_initial'), desc: t('global_desc_initial') };
  if (pct < 55) return { label: t('level_developing'), desc: t('global_desc_developing') };
  if (pct < 75) return { label: t('level_intermediate'), desc: t('global_desc_intermediate') };
  return { label: t('level_advanced'), desc: t('global_desc_advanced') };
}

// ===================== RADAR CHART (Pure Canvas) =====================
function drawRadar(canvasId, values, labels) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  const cx = W / 2;
  const cy = H / 2;
  const R = Math.min(cx, cy) - 60;
  const n = values.length;
  const angles = values.map((_, i) => (Math.PI * 2 * i / n) - Math.PI / 2);

  ctx.clearRect(0, 0, W, H);

  // Grid circles
  for (let ring = 1; ring <= 4; ring++) {
    const r = R * ring / 4;
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const a = (Math.PI * 2 * (i % n) / n) - Math.PI / 2;
      const x = cx + r * Math.cos(a);
      const y = cy + r * Math.sin(a);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = '#e0dfe6';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Percentage labels on first axis
    ctx.fillStyle = '#999';
    ctx.font = '11px Inter';
    ctx.textAlign = 'left';
    ctx.fillText((ring * 25) + '%', cx + 4, cy - r + 4);
  }

  // Axis lines
  for (let i = 0; i < n; i++) {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + R * Math.cos(angles[i]), cy + R * Math.sin(angles[i]));
    ctx.strokeStyle = '#e0dfe6';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Data polygon
  ctx.beginPath();
  values.forEach((v, i) => {
    const r = R * (v / 100);
    const x = cx + r * Math.cos(angles[i]);
    const y = cy + r * Math.sin(angles[i]);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = 'rgba(51, 30, 182, 0.12)';
  ctx.fill();
  ctx.strokeStyle = '#331eb6';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Data points
  values.forEach((v, i) => {
    const r = R * (v / 100);
    const x = cx + r * Math.cos(angles[i]);
    const y = cy + r * Math.sin(angles[i]);
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#331eb6';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  // Labels
  ctx.fillStyle = '#1A1A1A';
  ctx.font = '600 12px "DM Sans"';
  labels.forEach((label, i) => {
    const lr = R + 30;
    let x = cx + lr * Math.cos(angles[i]);
    let y = cy + lr * Math.sin(angles[i]);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (Math.cos(angles[i]) < -0.1) ctx.textAlign = 'right';
    else if (Math.cos(angles[i]) > 0.1) ctx.textAlign = 'left';
    if (Math.sin(angles[i]) < -0.5) y -= 4;
    if (Math.sin(angles[i]) > 0.5) y += 4;
    // Wrap long labels
    const words = label.split(' ');
    if (words.length > 1 && label.length > 12) {
      const mid = Math.ceil(words.length / 2);
      ctx.fillText(words.slice(0, mid).join(' '), x, y - 7);
      ctx.fillText(words.slice(mid).join(' '), x, y + 7);
    } else {
      ctx.fillText(label, x, y);
    }

    // Value percentage next to label
    ctx.font = '700 11px "DM Sans"';
    const color = values[i] < 40 ? '#d32f2f' : values[i] < 70 ? '#e67e22' : '#2e7d32';
    ctx.fillStyle = color;
    const valY = (words.length > 1 && label.length > 12) ? y + 20 : y + 14;
    ctx.fillText(values[i] + '%', x, valY);
    ctx.fillStyle = '#1A1A1A';
    ctx.font = '600 12px "DM Sans"';
  });
}

// ===================== SHOW RESULTS =====================
function showResults() {
  const results = calcResults();
  const totalScore = results.reduce((s, r) => s + r.score, 0);
  const totalMax = MAX_SCORES.reduce((a, b) => a + b, 0);
  const globalPct = Math.round((totalScore / totalMax) * 100);
  const gl = globalLevel(globalPct);
  const circumference = 345;
  const offset = circumference - (circumference * globalPct / 100);

  const sortedResults = [...results].sort((a, b) => {
    const order = { critical: 0, moderate: 1, good: 2 };
    return order[a.level] - order[b.level];
  });

  let moduleScoreCards = results.map((r, i) => `
    <div class="mod-score-card ${r.level}">
      <div class="mod-name">${r.mod.name}</div>
      <div class="mod-score-val">${r.pct}<span>%</span></div>
      <div class="mod-mini-bar"><div class="mod-mini-fill" id="mbar-${i}" style="width:0%"></div></div>
      <div class="mod-level-tag">${levelDot(r.level)} ${levelLabel(r.level)}</div>
    </div>
  `).join('');

  let findingCards = sortedResults.map(r => {
    const mi = results.indexOf(r);
    return `
      <div class="finding-card ${r.level === 'critical' ? 'crit' : r.level === 'moderate' ? 'mod' : 'good'}">
        <div class="f-header">
          <span class="f-tag">${levelLabel(r.level)}</span>
          <span class="f-title">${r.mod.title}</span>
        </div>
        <div class="f-module">${r.pct}% ${t('maturity_of')} &middot; ${r.score}/${r.max} ${t('points')}</div>
        <div class="f-obs">${getObs(mi, r.level)}</div>
      </div>
    `;
  }).join('');

  const companyName = companyData.nombre || '';
  const today = companyData.date;

  const html = `
    <div class="results-hero fade-up">
      <div style="font-size:11px;color:rgba(255,255,255,0.35);margin-bottom:8px;position:relative;letter-spacing:0.5px;">
        ${companyName} &middot; ${today}
      </div>
      <div class="score-ring">
        <svg class="ring" width="130" height="130" viewBox="0 0 130 130">
          <circle class="ring-bg" cx="65" cy="65" r="55"/>
          <circle class="ring-fill" id="ring-fill-el" cx="65" cy="65" r="55"
            style="stroke-dashoffset:${circumference}"/>
        </svg>
        <div class="score-number">${globalPct}<span>%</span></div>
      </div>
      <div class="level-badge">${t('results_level')} ${gl.label}</div>
      <h2>${t('results_completed')}</h2>
      <p>${gl.desc}</p>
    </div>

    <div class="radar-section">
      <h3>${t('radar_title')}</h3>
      <div class="radar-canvas-wrap">
        <canvas id="radar-chart" width="440" height="400"></canvas>
      </div>
    </div>

    <div class="module-scores">
      ${moduleScoreCards}
    </div>

    <div class="analysis-section">
      <h3>${t('analysis_title')}</h3>
      ${findingCards}
    </div>

    <div class="disclaimer">
      <h4>${t('disclaimer_title')}</h4>
      <p>${t('disclaimer_text')}</p>
    </div>

    <div class="download-area">
      <button class="btn-primary" onclick="DESG.printReport()">
        ${t('btn_print')}
      </button>
      <button class="btn-secondary" onclick="DESG.downloadPDF()">
        ${t('btn_pdf')}
      </button>
    </div>

    <div class="cta-lead">
      <div class="cta-tag">${t('cta_tag')}</div>
      <h3>${t('cta_title')}</h3>
      <p>${t('cta_desc')}</p>
      <div class="cta-benefits">
        <div class="cta-benefit">${t('cta_b1')}</div>
        <div class="cta-benefit">${t('cta_b2')}</div>
        <div class="cta-benefit">${t('cta_b3')}</div>
        <div class="cta-benefit">${t('cta_b4')}</div>
        <div class="cta-benefit">${t('cta_b5')}</div>
      </div>
      <div class="cta-form" id="cta-form-wrap" style="justify-content:center;">
        <a class="btn-gold" href="mailto:contacto@yel-martinez-portfolio.com" style="text-decoration:none;display:inline-block;">${t('cta_submit')} &rarr;</a>
      </div>
    </div>

    <div style="text-align:center;padding-bottom:20px;">
      <button class="btn-secondary" onclick="DESG.restartDiagnostic()">&larr; ${t('btn_restart')}</button>
    </div>
  `;

  document.getElementById('screen-results').innerHTML = html;
  showScreen('screen-results');
  document.getElementById('progress-wrap').classList.remove('visible');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Animate
  setTimeout(() => {
    const ring = document.getElementById('ring-fill-el');
    if (ring) ring.style.strokeDashoffset = offset;
    results.forEach((r, i) => {
      const bar = document.getElementById('mbar-' + i);
      if (bar) bar.style.width = r.pct + '%';
    });
    // Draw radar
    const radarLabels = RADAR_LABELS_KEYS.map(k => t(k));
    const radarValues = results.map(r => r.pct);
    drawRadar('radar-chart', radarValues, radarLabels);
  }, 300);
}

// ===================== PRINT / PDF =====================
function printReport() { window.print(); }
function downloadPDF() {
  showToast(t('toast_print'));
  setTimeout(() => window.print(), 500);
}

// ===================== RESTART =====================
function restartDiagnostic() {
  answers = {};
  currentModule = 0;
  companyData = {};
  document.getElementById('empresa-nombre').value = '';
  buildModules();
  showScreen('screen-start');
  document.getElementById('progress-wrap').classList.remove('visible');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===================== TOAST =====================
function showToast(msg) {
  const t = document.getElementById('desg-toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

// ===================== INIT =====================
applyTranslations();
buildModules();


// Set default language from shortcode attribute
if (defaultLang !== 'es') {
  setLang(defaultLang);
}

// ===================== PUBLIC API =====================
window.DESG = {
  setLang: setLang,
  startDiagnostic: startDiagnostic,
  nextModule: nextModule,
  prevModule: prevModule,
  showResults: showResults,
  answer: answer,
  printReport: printReport,
  downloadPDF: downloadPDF,
  restartDiagnostic: restartDiagnostic,
};

})();