document.addEventListener('DOMContentLoaded', () => {
  const selectRegion = document.getElementById('select-region');
  const selectCirugia = document.getElementById('select-cirugia');
  const checklistContainer = document.getElementById('checklist-container');
  const itemsList = document.getElementById('items-list');
  const testsList = document.getElementById('tests-list');

  const db = [
    // --- COLUMNA VERTEBRAL ---
    {
      "id": "microdiscectomia_lumbar",
      "region": "columna",
      "nombre": "Microdiscectomía Lumbar L4-L5/L5-S1 (Semanas 2 - 8)",
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
          "id": "test_lasègue",
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
    {
      "id": "artrodesis_cervical",
      "region": "columna",
      "nombre": "Artrodesis Cervical Anterior / ACDF (Semanas 4 - 12)",
      "items": [
        {
          "id": "control_cefálico_sin_dolor",
          "criterio": "Movilidad activa cervical > 50% sin radiculalgia braquial",
          "causas_no_cumplimiento": [
            "Espasmo severo del trapecio superior y elevador de la escápula.",
            "Iritación residual del plexo braquial por distracción intraoperatoria.",
            "Retraso en la consolidación ósea de la caja/placa."
          ]
        }
      ],
      "tests": [
        {
          "id": "test_spurling",
          "nombre": "Test de Spurling (Cierre Foraminal)",
          "descripcion": "Inclinación lateral y compresión axial para reproducir síntoma radicular cervical."
        },
        {
          "id": "test_distraccion_cervical",
          "nombre": "Test de Distracción Cervical",
          "descripcion": "Tracción manual axial. Positivo si disminuye o abole la radiculalgia."
        }
      ]
    },

    // --- MIEMBRO SUPERIOR ---
    {
      "id": "manguito_rotador_fase1",
      "region": "miembro_superior",
      "nombre": "Reparación de Manguito Rotador (Semanas 0 - 6)",
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
    {
      "id": "tunel_carpiano_abierto",
      "region": "miembro_superior",
      "nombre": "Liberación Abierta del Túnel Carpiano (Semanas 1 - 4)",
      "items": [
        {
          "id": "oposicion_pulgar_completa",
          "criterio": "Oposición completa del pulgar (Test de Kapandji >= 8)",
          "causas_no_cumplimiento": [
            "Atrofia o inhibición motora tenar por denervación previa prolongada.",
            "Dolor de pilar ('Pillar Pain') sobre el retináculo flexor cortado.",
            "Cicatriz hipertrófica sensible sobre la eminencia tenar."
          ]
        }
      ],
      "tests": [
        {
          "id": "test_phalen",
          "nombre": "Test de Phalen",
          "descripcion": "Flexión máxima de muñecas mantenida durante 60 segundos. Evalúa compresión del nervio mediano."
        },
        {
          "id": "signo_tinel_mediano",
          "nombre": "Signo de Tinel en Tunel Carpiano",
          "descripcion": "Percusión suave sobre el retináculo flexor para reproducir parestesias en 1º-3er dedo."
        }
      ]
    },

    // --- MIEMBRO INFERIOR ---
    {
      "id": "lca_fase1",
      "region": "miembro_inferior",
      "nombre": "Reconstrucción de LCA (Semanas 0 - 4)",
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
          "descripcion": "Translación anterior de tibia a 20-30° de flexión. Evalúa traslación e tope del plastia de LCA."
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

  // Filtro 1: Cambio de Región Corporal
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

    renderChecklist(cirugiaData.items);
    renderTests(cirugiaData.tests || []);
    checklistContainer.classList.remove('hidden');
  });

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

  // Renderizar Tests Clínicos
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