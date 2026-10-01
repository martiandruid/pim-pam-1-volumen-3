document.addEventListener('DOMContentLoaded', () => {
  const selectRegion = document.getElementById('select-region');
  const selectCirugia = document.getElementById('select-cirugia');
  const checklistContainer = document.getElementById('checklist-container');
  const itemsList = document.getElementById('items-list');
  const testsList = document.getElementById('tests-list');
  const romContainer = document.getElementById('rom-container');
  const danielsContainer = document.getElementById('daniels-container');

  const db = [
    // --- COLUMNA VERTEBRAL ---
    {
      "id": "microdiscectomia_lumbar",
      "region": "columna",
      "nombre": "Microdiscectomía Lumbar L4-L5/L5-S1 (Semanas 2 - 8)",
      "rom": [
        { "movimiento": "Flexión lumbar activa", "fisiologico": "0° - 60°", "objetivo_fase": "30° - 40° (sin dolor radicular)" },
        { "movimiento": "Extensión lumbar activa", "fisiologico": "0° - 25°", "objetivo_fase": "10° - 15° (bloqueo neutro)" }
      ],
      "musculos_daniels": [
        { "musculo": "Extensores lumbares (Multífidos/Erector columna)", "minimo_esperado": "3/5" },
        { "musculo": "Tibial anterior (L4)", "minimo_esperado": "4/5" },
        { "musculo": "Extensor largo del hálux (L5)", "minimo_esperado": "3/5" },
        { "musculo": "Gastrocnemios/Sóleo (S1)", "minimo_esperado": "4/5" }
      ],
      "items": [
        {
          "id": "marcha_talon_punta",
          "criterio": "Capacidad de realizar marcha sobre talones (L5) y de puntillas (S1) sin claudicación",
          "causas_no_cumplimiento": [
            "Paresia o radiculopatía residual por compresión nerviosa prolongada previa.",
            "Edema/inflamación en la raíz nerviosa perirradicular.",
            "Espasmo defensivo de la musculatura paravertebral e isquiotibial."
          ]
        },
        {
          "id": "ausencia_centralizacion_dolor",
          "criterio": "Ausencia de radiculalgia distal por debajo de la rodilla en AVD",
          "causas_no_cumplimiento": [
            "Atrapamiento o fibrosis epidural postquirúrgica (adherencias durales).",
            "Recidiva discal precoz por esfuerzo flexor no controlado.",
            "Inestabilidad segmentaria no fijada."
          ]
        }
      ],
      "tests": [
        {
          "id": "test_lasegue",
          "nombre": "Test de Lasègue (Elevación de la Pierna Recta - SLR)",
          "descripcion": "Valoración de irritación dural/radicular L4-S1. Positivo si reproduce dolor radicular < 60°."
        },
        {
          "id": "test_bragard",
          "nombre": "Test de Bragard",
          "descripcion": "Sensibilización con dorsiflexión pasiva del tobillo sobre el punto de dolor del Lasègue."
        }
      ]
    },

    // --- MIEMBRO SUPERIOR ---
    {
      "id": "manguito_rotador_fase1",
      "region": "miembro_superior",
      "nombre": "Reparación de Manguito Rotador (Semanas 0 - 6)",
      "rom": [
        { "movimiento": "Flexión anterior pasiva", "fisiologico": "0° - 180°", "objetivo_fase": "90° (pasivo asistido)" },
        { "movimiento": "Rotación externa pasiva", "fisiologico": "0° - 90°", "objetivo_fase": "20° - 30°" },
        { "movimiento": "Abducción pasiva", "fisiologico": "0° - 180°", "objetivo_fase": "70° - 80°" }
      ],
      "musculos_daniels": [
        { "musculo": "Trapecio inferior y Serrato anterior", "minimo_esperado": "3/5 (estabilizadores)" },
        { "musculo": "Supraespinoso / Deltoides", "minimo_esperado": "0-1/5 (Contraindicada contracción activa forzada)" }
      ],
      "items": [
        {
          "id": "flexion_pasiva_90",
          "criterio": "Alcanzar 90° de flexión pasiva sin dolor agudo punzante",
          "causas_no_cumplimiento": [
            "Rigidez capsular o capsulitis adhesiva secundaria a inmovilización rígida.",
            "Apresamiento subacromial por edema persistente en la bursa.",
            "Baja adherencia del paciente al protocolo de ejercicios pasivos en domicilio.",
            "Espasmo muscular antálgico de la musculatura periescapular y pectoral mayor."
          ]
        },
        {
          "id": "rotacion_externa_20",
          "criterio": "Alcanzar al menos 20° de rotación externa pasiva",
          "causas_no_cumplimiento": [
            "Excesiva tensión estructural de la sutura quirúrgica (reparación a tensión).",
            "Contractura o acortamiento del músculo subescapular.",
            "Temor o falta de tolerancia del paciente a la movilización pasiva."
          ]
        }
      ],
      "tests": [
        {
          "id": "test_hawkins_kennedy",
          "nombre": "Test de Hawkins-Kennedy",
          "descripcion": "Flexión a 90° y rotación interna forzada. Evalúa compromiso del espacio subacromial."
        },
        {
          "id": "test_jobe",
          "nombre": "Test de Jobe (Empty Can Test)",
          "descripcion": "Abducción 90° en plano de la escápula y rotación interna. Valora integridad del supraespinoso."
        }
      ]
    },
    {
      "id": "radio_distal_placa",
      "region": "miembro_superior",
      "nombre": "Osteosíntesis de Radio Distal con Placa Volar (Semanas 2 - 6)",
      "rom": [
        { "movimiento": "Flexión de muñeca", "fisiologico": "0° - 80°", "objetivo_fase": "40°" },
        { "movimiento": "Extensión de muñeca", "fisiologico": "0° - 70°", "objetivo_fase": "40°" },
        { "movimiento": "Pronosupinación", "fisiologico": "80° - 90°", "objetivo_fase": "50° / 50°" }
      ],
      "musculos_daniels": [
        { "musculo": "Flexor/Extensor carpi radialis", "minimo_esperado": "3/5" },
        { "musculo": "Flexor pollicis longus", "minimo_esperado": "3/5" }
      ],
      "items": [
        {
          "id": "flexoextension_muneca_40",
          "criterio": "Alcanzar 40° de flexión y 40° de extensión activa a la semana 4",
          "causas_no_cumplimiento": [
            "Tenosinovitis reactiva o conflicto mecánico del flexor largo/extensores.",
            "Síndrome Doloroso Regional Complejo (SDRC Tipo I) de inicio temprano.",
            "Rigidez de la articulación radiocubital distal (ARCD)."
          ]
        }
      ],
      "tests": [
        {
          "id": "test_finkelstein",
          "nombre": "Test de Finkelstein",
          "descripcion": "Inclinación cubital de muñeca con pulgar atrapado. Evalúa tenosinovitis de De Quervain."
        }
      ]
    },

    // --- MIEMBRO INFERIOR ---
    {
      "id": "lca_fase1",
      "region": "miembro_inferior",
      "nombre": "Reconstrucción de LCA (Semanas 0 - 4)",
      "rom": [
        { "movimiento": "Extensión de rodilla", "fisiologico": "0°", "objetivo_fase": "0° (Extensión completa pasiva obligatoria)" },
        { "movimiento": "Flexión de rodilla", "fisiologico": "0° - 135°", "objetivo_fase": "90° (Semana 2) -> 110° (Semana 4)" }
      ],
      "musculos_daniels": [
        { "musculo": "Cuádriceps (Vasto Medial Interno - VMO)", "minimo_esperado": "3/5 (conseguir SLR sin rezago extensor)" },
        { "musculo": "Isquiotibial / Glúteo medio", "minimo_esperado": "3/5" }
      ],
      "items": [
        {
          "id": "extension_completa",
          "criterio": "Extensión completa pasiva y activa de rodilla (0° respecto al lado sano)",
          "causas_no_cumplimiento": [
            "Bloqueo mecánico por edema intraarticular / derrame grave (hemartros).",
            "Síndrome de Cyclops (proliferación de tejido fibroso en el injerto).",
            "Uso prolongado de almohadas bajo el hueco poplíteo durante el reposo.",
            "Inhibición del cuádriceps que impide el bloqueo activo terminal."
          ]
        }
      ],
      "tests": [
        {
          "id": "test_lachman",
          "nombre": "Test de Lachman",
          "descripcion": "Translación anterior de tibia a 20-30° de flexión. Evalúa traslación e tope de la plastia de LCA."
        },
        {
          "id": "test_cajon_anterior",
          "nombre": "Test de Cajón Anterior de Rodilla",
          "descripcion": "Tracción anterior de tibia a 90° de flexión de rodilla."
        }
      ]
    },
    {
      "id": "tendon_aquiles_quirurgico",
      "region": "miembro_inferior",
      "nombre": "Reparación Quirúrgica del Tendón de Aquiles (Semanas 2 - 8)",
      "rom": [
        { "movimiento": "Dorsiflexión de tobillo", "fisiologico": "0° - 20°", "objetivo_fase": "0° (Posición neutra a la Sem 6)" },
        { "movimiento": "Flexión plantar", "fisiologico": "0° - 50°", "objetivo_fase": "20° - 30° (sin estiramiento activo)" }
      ],
      "musculos_daniels": [
        { "musculo": "Tríceps sural (Gastrocnemios/Sóleo)", "minimo_esperado": "2/5 (Sin resistencia activa forzada)" },
        { "musculo": "Tibial anterior y Peroneos", "minimo_esperado": "4/5" }
      ],
      "items": [
        {
          "id": "dorsiflexion_neutra_semana6",
          "criterio": "Alcanzar 0° de dorsiflexión en tobillo (posición neutra) a la semana 6",
          "causas_no_cumplimiento": [
            "Elongación excesiva de la sutura por carga o estiramiento prematuro.",
            "Adherencia del complejo tendinoso al tejido cutáneo y paratendón.",
            "Espasmo o acortamiento adaptativo defensivo del complejo sóleo-gemelar."
          ]
        }
      ],
      "tests": [
        {
          "id": "test_thompson",
          "nombre": "Test de Thompson",
          "descripcion": "Compresión manual de la pantorrilla en decúbito prono. Valora continuidad estructural del tendón de Aquiles."
        }
      ]
    }
  ];

  // Filtro 1: Cambio de Región
  selectRegion.addEventListener('change', (e) => {
    const region = e.target.value;
    selectCirugia.innerHTML = '<option value="">-- Seleccionar Intervención --</option>';

    if (!region) {
      selectCirugia.disabled = true;
      checklistContainer.classList.add('hidden');
      return;
    }

    const cirugiasFiltradas = db.filter(c => c.region === region);
    cirugiasFiltradas.forEach(cirugia => {
      const option = document.createElement('option');
      option.value = cirugia.id;
      option.textContent = cirugia.nombre;
      selectCirugia.appendChild(option);
    });

    selectCirugia.disabled = false;
    checklistContainer.classList.add('hidden');
  });

  // Filtro 2: Cambio de Cirugía
  selectCirugia.addEventListener('change', (e) => {
    const idSeleccionado = e.target.value;
    const cirugiaData = db.find(c => c.id === idSeleccionado);

    if (!cirugiaData) {
      checklistContainer.classList.add('hidden');
      return;
    }

    renderROM(cirugiaData.rom || []);
    renderDaniels(cirugiaData.musculos_daniels || []);
    renderChecklist(cirugiaData.items || []);
    renderTests(cirugiaData.tests || []);

    checklistContainer.classList.remove('hidden');
  });

  // Renderizar Rangos de Movilidad
  function renderROM(romData) {
    romContainer.innerHTML = '';
    if (romData.length === 0) {
      romContainer.innerHTML = '<p class="text-xs text-slate-400">Sin rangos específicos parametrizados.</p>';
      return;
    }

    romData.forEach(r => {
      const div = document.createElement('div');
      div.className = 'bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/50 flex flex-col justify-between gap-1';
      div.innerHTML = `
        <span class="font-medium text-slate-200">${r.movimiento}</span>
        <div class="flex items-center justify-between text-xs mt-1">
          <span class="text-slate-400">Fisiológico: <strong class="text-slate-300">${r.fisiologico}</strong></span>
          <span class="text-amber-400 font-semibold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">Objetivo Fase: ${r.objetivo_fase}</span>
        </div>
      `;
      romContainer.appendChild(div);
    });
  }

  // Renderizar Balance Muscular Daniels
  function renderDaniels(musculosData) {
    danielsContainer.innerHTML = '';
    if (musculosData.length === 0) {
      danielsContainer.innerHTML = '<p class="text-xs text-slate-400">Sin grupos musculares específicos.</p>';
      return;
    }

    musculosData.forEach((m, idx) => {
      const div = document.createElement('div');
      div.className = 'bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/50 space-y-2';
      div.innerHTML = `
        <div class="flex items-center justify-between text-xs">
          <span class="font-medium text-slate-200">${m.musculo}</span>
          <span class="text-slate-400">Mín. esperado: <strong class="text-emerald-400">${m.minimo_esperado}</strong></span>
        </div>
        <div class="flex items-center gap-2">
          <label class="text-xs text-slate-400">Evaluación actual:</label>
          <select class="bg-slate-800 border border-slate-600 text-xs text-slate-200 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-emerald-500">
            <option value="0">0 - Ausencia de contracción</option>
            <option value="1">1 - Contracción perceptible sin movimiento</option>
            <option value="2">2 - Movimiento completo sin gravedad</option>
            <option value="3">3 - Movimiento completo contra gravedad</option>
            <option value="4">4 - Movimiento contra resistencia moderada</option>
            <option value="5">5 - Fuerza normal (resistencia máxima)</option>
          </select>
        </div>
      `;
      danielsContainer.appendChild(div);
    });
  }

  // Renderizar Criterios de Progresión
  function renderChecklist(items) {
    itemsList.innerHTML = '';
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'bg-slate-800 p-4 rounded-xl border border-slate-700 transition-all';
      card.innerHTML = `
        <div class="flex items-start justify-between gap-4">
          <label class="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" data-id="${item.id}" class="item-checkbox w-5 h-5 text-sky-500 rounded bg-slate-900 border-slate-600 focus:ring-sky-500" checked>
            <span class="text-slate-200 font-medium">${item.criterio}</span>
          </label>
          <span id="badge-${item.id}" class="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Completado</span>
        </div>
        <div id="causas-${item.id}" class="mt-4 pt-3 border-t border-slate-700/60 hidden">
          <p class="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2">Causas probables de no consecución (según GPC):</p>
          <ul class="list-disc list-inside text-sm text-slate-300 space-y-1">
            ${item.causas_no_cumplimiento.map(causa => `<li>${causa}</li>`).join('')}
          </ul>
        </div>
      `;
      itemsList.appendChild(card);

      const checkbox = card.querySelector(`.item-checkbox`);
      const badge = card.querySelector(`#badge-${item.id}`);
      const causasDiv = card.querySelector(`#causas-${item.id}`);

      checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
          badge.textContent = 'Completado';
          badge.className = 'text-xs font-semibold px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800';
          causasDiv.classList.add('hidden');
        } else {
          badge.textContent = 'No Conseguió Objetivo';
          badge.className = 'text-xs font-semibold px-2.5 py-1 rounded bg-rose-950 text-rose-400 border border-rose-800';
          causasDiv.classList.remove('hidden');
        }
      });
    });
  }

  // Renderizar Tests Ortopédicos
  function renderTests(tests) {
    testsList.innerHTML = '';
    if (tests.length === 0) {
      testsList.innerHTML = '<p class="text-sm text-slate-400 italic">No hay tests específicos asociados a esta fase quirúrgica.</p>';
      return;
    }

    tests.forEach(test => {
      const card = document.createElement('div');
      card.className = 'bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 space-y-3';
      card.innerHTML = `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 class="font-medium text-slate-200">${test.nombre}</h3>
            <p class="text-xs text-slate-400 mt-0.5">${test.descripcion}</p>
          </div>
          <select class="test-select bg-slate-900 border border-slate-600 text-xs rounded-lg p-2 text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="negativo">Negativo (Normal)</option>
            <option value="positivo">Positivo (Hallazgo)</option>
            <option value="no_evaluable">No Evaluable / Contraindicado</option>
          </select>
        </div>
      `;
      testsList.appendChild(card);
    });
  }
});