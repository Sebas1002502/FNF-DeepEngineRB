(function () {
  const categories = Array.isArray(window.psychCategories) ? window.psychCategories : [];
  const lang = document.body?.dataset?.lang === "es" ? "es" : "en";
  const pageId = document.body?.dataset?.page || "playstate";

  const ui = {
    en: {
      overview: "Overview",
      functions: "Functions",
      searchPages: "Search pages",
      searchPlaceholder: "PlayState, variables, snippets...",
      selectSection: "Choose a section",
      navLead: "Folder-based routes keep the URLs clean and make the docs easier to grow later.",
      introNote:
        "Videos will appear below each function when available. They stay closed by default.",
      noPage: "Page not found",
      noPageBody: "The requested section does not exist. Pick another page from the sidebar.",
      functionVideos: "Video examples",
      videoEmpty: "No video examples are available yet.",
      openReference: "Open reference",
      closeLabel: "Close",
      langName: "Español"
    },
    es: {
      overview: "Resumen",
      functions: "Funciones",
      searchPages: "Buscar páginas",
      searchPlaceholder: "PlayState, variables, snippets...",
      selectSection: "Elige una sección",
      navLead:
        "Las rutas por carpeta mantienen las URLs limpias y hacen más fácil crecer la documentación.",
      introNote:
        "Los videos aparecerán debajo de cada función cuando existan. Se mantienen cerrados por defecto.",
      noPage: "Página no encontrada",
      noPageBody: "La sección solicitada no existe. Elige otra página en la barra lateral.",
      functionVideos: "Videos de ejemplo",
      videoEmpty: "Aún no hay videos de ejemplo disponibles.",
      openReference: "Abrir referencia",
      closeLabel: "Cerrar",
      langName: "English"
    }
  };

  const categoryText = {
    playstate: {
      en: {
        title: "PlayState Functions",
        summary: "General functions related to game state, songs, and cutscenes."
      },
      es: {
        title: "Funciones de PlayState",
        summary: "Funciones generales relacionadas con el estado del juego, canciones y cinemáticas."
      }
    },
    reflection: {
      en: {
        title: "Reflection Functions",
        summary: "Get and set properties from objects and call their methods."
      },
      es: {
        title: "Funciones de Reflection",
        summary: "Obtiene y cambia propiedades de objetos y llama a sus métodos."
      }
    },
    spritesheet: {
      en: {
        title: "Spritesheet Functions",
        summary: "Display, animate, and manipulate images on screen using Lua Sprites."
      },
      es: {
        title: "Funciones de Spritesheet",
        summary: "Muestra, anima y manipula imágenes en pantalla usando Lua Sprites."
      }
    },
    flxanimate: {
      en: {
        title: "FlxAnimate Functions",
        summary: "Work with Adobe Animate Atlas and advanced animation symbols."
      },
      es: {
        title: "Funciones de FlxAnimate",
        summary: "Trabaja con atlases de Adobe Animate y símbolos de animación avanzados."
      }
    },
    text: {
      en: {
        title: "Text Functions",
        summary: "Create, style, and update Lua text objects on screen."
      },
      es: {
        title: "Funciones de Texto",
        summary: "Crea, da estilo y actualiza textos de Lua en pantalla."
      }
    },
    sound: {
      en: {
        title: "Sound Functions",
        summary: "Play and control sounds and music with volume and pitch control."
      },
      es: {
        title: "Funciones de Sonido",
        summary: "Reproduce y controla sonidos y música con volumen y tono."
      }
    },
    shaders: {
      en: {
        title: "Shaders Functions",
        summary: "Load and manage custom shaders with uniform updates."
      },
      es: {
        title: "Funciones de Shaders",
        summary: "Carga y administra shaders personalizados con actualización de uniforms."
      }
    },
    camera: {
      en: {
        title: "Camera Functions",
        summary: "Control camera movement, follow points, and apply effects like shake, flash, and fade."
      },
      es: {
        title: "Funciones de Cámara",
        summary: "Controla el movimiento de la cámara, puntos de seguimiento y efectos como sacudidas, flashes y fade."
      }
    },
    input: {
      en: {
        title: "Input Functions",
        summary: "Detect keyboard, mouse, and gamepad input."
      },
      es: {
        title: "Funciones de Entrada",
        summary: "Detecta entrada de teclado, mouse y gamepad."
      }
    },
    tween: {
      en: {
        title: "Tween Functions",
        summary: "Create smooth animations over time for objects and values."
      },
      es: {
        title: "Funciones de Tween",
        summary: "Crea animaciones suaves con el paso del tiempo para objetos y valores."
      }
    },
    timer: {
      en: {
        title: "Timer Functions",
        summary: "Schedule delayed callbacks and timed events."
      },
      es: {
        title: "Funciones de Timer",
        summary: "Programa callbacks retrasados y eventos temporizados."
      }
    },
    character: {
      en: {
        title: "Character Functions",
        summary: "Interact with character state, animation, and offsets."
      },
      es: {
        title: "Funciones de Personaje",
        summary: "Interactúa con el estado, animación y offsets de personajes."
      }
    },
    file: {
      en: {
        title: "File I/O Functions",
        summary: "Read, write, and inspect files from Lua."
      },
      es: {
        title: "Funciones de Archivos",
        summary: "Lee, escribe e inspecciona archivos desde Lua."
      }
    },
    translations: {
      en: {
        title: "Language/Translation Functions",
        summary: "Work with localized text and language data."
      },
      es: {
        title: "Funciones de Idioma/Traducción",
        summary: "Trabaja con texto localizado y datos de idioma."
      }
    },
    achievements: {
      en: {
        title: "Achievements Functions",
        summary: "Read and set achievement state and progress."
      },
      es: {
        title: "Funciones de Logros",
        summary: "Lee y ajusta el estado y progreso de los logros."
      }
    },
    substate: {
      en: {
        title: "Substate Functions",
        summary: "Manage substates and their lifecycle."
      },
      es: {
        title: "Funciones de Subestado",
        summary: "Administra substates y su ciclo de vida."
      }
    },
    precache: {
      en: {
        title: "Precache Functions",
        summary: "Warm up assets before they are needed."
      },
      es: {
        title: "Funciones de Precarga",
        summary: "Prepara recursos antes de que se necesiten."
      }
    },
    score: {
      en: {
        title: "Score Functions",
        summary: "Inspect score, rating, and performance data."
      },
      es: {
        title: "Funciones de Puntuación",
        summary: "Consulta puntaje, rating y datos de rendimiento."
      }
    },
    savedata: {
      en: {
        title: "Save Data Functions",
        summary: "Read and write persistent save values."
      },
      es: {
        title: "Funciones de Guardado",
        summary: "Lee y escribe valores persistentes del guardado."
      }
    },
    script: {
      en: {
        title: "Script Functions",
        summary: "Control script execution and callbacks."
      },
      es: {
        title: "Funciones de Script",
        summary: "Controla la ejecución de scripts y callbacks."
      }
    },
    discord: {
      en: {
        title: "Discord Functions",
        summary: "Update Discord rich presence and status."
      },
      es: {
        title: "Funciones de Discord",
        summary: "Actualiza la presencia enriquecida y estado de Discord."
      }
    },
    uncategorized: {
      en: {
        title: "Uncategorized Functions",
        summary: "Miscellaneous helpers that do not fit a single category."
      },
      es: {
        title: "Funciones sin categoría",
        summary: "Ayudas varias que no encajan en una sola categoría."
      }
    }
  };

  const specialPages = {
    variables: {
      title: "Variables",
      summary: "Directly accessible Lua and engine variables grouped by purpose.",
      intro:
        "All of these variables can be accessed directly in Lua without helper functions like getProperty. Changing them usually does not mutate unrelated scripts or the engine itself.",
      sections: [
        {
          title: "Lua Scripting Variables",
          items: [
            ["luaDebugMode", "Toggles showing errors. Default value: false."],
            ["luaDeprecatedWarnings", "Shows functions that should be replaced by newer ones."],
            ["scriptName", "Path of the running Lua script."],
            ["modFolder", "Mod folder the Lua script is running in."],
            ["currentModDirectory", "Active custom week folder, empty on base game weeks."]
          ]
        },
        {
          title: "Psych Engine Information Variables",
          items: [
            ["version", "Psych Engine version string."],
            ["buildTarget", "Build target such as windows, windows_x86, or linux."]
          ]
        },
        {
          title: "Function Return Variables",
          items: [
            ["Function_StopLua", "Stops the function only in the next Lua scripts."],
            ["Function_StopHScript", "Stops the function only in the next HScripts."],
            ["Function_StopAll", "Stops the function in the next Lua scripts and HScripts."],
            ["Function_Stop", "Cancels functions like startCountdown or endSong."],
            ["Function_Continue", "Continues like normal after your script runs."]
          ]
        },
        {
          title: "Song and Chart Variables",
          items: [
            ["songName", "Instrumental name, as seen in the pause screen."],
            ["songPath", "Formatted song name in lowercase with hyphens."],
            ["chartPath", "Directory of the chart, including the file extension."],
            ["curStage", "Song stage as seen in the Chart Editor."],
            ["scrollSpeed", "Starting scroll speed."]
          ]
        },
        {
          title: "Score and Gameplay",
          items: [
            ["score", "Current score."],
            ["misses", "Current notes missed."],
            ["combo", "Current note combo."],
            ["rating", "Rating percentage, from 0 to 1."],
            ["botPlay", "Whether bot play is enabled."]
          ]
        },
        {
          title: "Character and Preferences",
          items: [
            ["boyfriendName", "Current player character JSON name."],
            ["dadName", "Current opponent character JSON name."],
            ["gfName", "Current girlfriend character JSON name."],
            ["downscroll", "Client preference for downscroll."],
            ["noteSkin", "Current note skin selection."]
          ]
        }
      ]
    },
    snippets: {
      title: "Code Snippets",
      summary: "Small reference scripts and starter examples.",
      intro:
        "This page collects example scripts that help explain how Lua scripts are structured in Psych Engine.",
      groups: [
        {
          title: "Starter Files",
          links: [
            ["Mod Folder sample", "https://github.com/ShadowMario/FNF-PsychEngine/blob/main/example_mods/modTemplate.zip"],
            ["Sample Script with callbacks", "https://github.com/ShadowMario/FNF-PsychEngine/blob/main/docs/scripts/TemplateScript.lua"]
          ]
        },
        {
          title: "Cutscene Scripts",
          links: [
            ["Example Video/Dialogue on Bopeebo", "https://drive.google.com/file/d/1o6B9Vq00a8Jo8-PtSqSo6_3PSbT5HhXg"],
            ["Drag and Drop Dialogue Script", "https://drive.google.com/file/d/15SMMmz5xpNompGne6S7GgEjfqEOu48xx"]
          ]
        },
        {
          title: "Note Types and Events",
          links: [
            ["Custom Event example - Opponent Fade", "https://drive.google.com/file/d/1ysrKh-C7u9hb-uF2HUDs2fo8ch1QszPe"],
            ["Custom Note Type TXT example", "https://pastebin.com/raw/Uh3gs2db"]
          ]
        },
        {
          title: "Stages and Gameplay",
          links: [
            ["Week 1-6 stages recreated in Lua", "https://drive.google.com/file/d/1BRfDxMsImUYedF4wTRn0Y3HYU_hv7zrF"],
            ["Tween example - Boyfriend gets bigger", "https://pastebin.com/raw/qtNwJ3vu"],
            ["Animated Sprite example", "https://pastebin.com/raw/QcB5zXYx"],
            ["setPropertyFromClass example", "https://pastebin.com/raw/0bGRzRzA"]
          ]
        }
      ]
    }
  };

  function esc(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function pageRoute(id) {
    return `../${id}/index.html`;
  }

  function allPages() {
    const categoryPages = categories.map((category) => ({
      id: category.id,
      title: categoryText[category.id]?.[lang]?.title || category.title,
      summary: categoryText[category.id]?.[lang]?.summary || category.description,
      route: pageRoute(category.id)
    }));

    const specialPagesList = Object.entries(specialPages).map(([id, page]) => ({
      id,
      title: id === "variables" && lang === "es" ? "Variables" : page.title,
      summary: id === "variables" && lang === "es" ? "Variables directas del motor y Lua agrupadas por propósito." : page.summary,
      route: pageRoute(id)
    }));

    return [...categoryPages, ...specialPagesList];
  }

  function renderNav() {
    const nav = document.getElementById("pageNav");
    if (!nav) return;
    const searchInput = document.getElementById("pageSearch");
    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

    nav.innerHTML = allPages()
      .filter((item) => {
        if (!query) return true;
        return `${item.title} ${item.summary}`.toLowerCase().includes(query);
      })
      .map(
        (item) => `
          <a class="${item.id === pageId ? "is-active" : ""}" href="${esc(item.route)}">
            ${esc(item.title)}
            <small>${esc(item.summary || "")}</small>
          </a>
        `
      )
      .join("");
  }

  function functionVideos(fn) {
    if (!Array.isArray(fn.videos) || fn.videos.length === 0) {
      return "";
    }

    const items = fn.videos
      .map((video) => {
        if (typeof video === "string") {
          return `<li><video controls src="${esc(video)}"></video></li>`;
        }
        return `
          <li>
            <p>${esc(video.title || video.label || "")}</p>
            <video controls src="${esc(video.src || video.url || "")}"></video>
          </li>
        `;
      })
      .join("");

    return `
      <details class="function-videos">
        <summary>${esc(ui[lang].functionVideos)}</summary>
        <div class="inline-note">${esc(ui[lang].introNote)}</div>
        <ul class="video-list">${items}</ul>
      </details>
    `;
  }

  function renderFunctionCard(fn) {
    const params =
      fn.parameters && fn.parameters.length
        ? `
          <ul class="function-params">
            ${fn.parameters
              .map(
                (param) => `
                  <li>
                    <strong>${esc(param.name)}</strong>${param.optional ? " (Optional)" : ""} - <em>${esc(param.type)}</em><br />
                    ${esc(param.description)}
                  </li>
                `
              )
              .join("")}
          </ul>
        `
        : "";

    const examples =
      fn.examples && fn.examples.length
        ? `
          <div class="function-examples">
            <strong>Examples:</strong>
            ${fn.examples
              .map((example) => {
                if (typeof example === "string") {
                  return `<div class="example-item"><code>${esc(example)}</code></div>`;
                }
                return `
                  <div class="example-item">
                    <code>${esc(example.code)}</code>
                    ${example.description ? `<p>${esc(example.description)}</p>` : ""}
                  </div>
                `;
              })
              .join("")}
          </div>
        `
        : "";

    return `
      <div class="function-item">
        <h2 id="${esc(fn.name)}">${esc(fn.name)}</h2>
        <p class="function-sig"><code>${esc(fn.signature)}</code></p>
        <p class="function-desc">${esc(fn.description || "")}</p>
        ${params}
        ${examples}
        ${functionVideos(fn)}
      </div>
    `;
  }

  function renderCategoryPage(category, localized) {
    const title = localized?.title || category.title;
    const summary = localized?.summary || category.description || "";
    return `
      <article class="card section-card page-route-hero" id="page-top">
        <p class="eyebrow">Psych Engine</p>
        <h1>${esc(title)}</h1>
        <p>${esc(summary)}</p>
        <div class="page-route-meta">
          <span class="chip">${category.functions.length} functions</span>
          <span class="chip">Folder route</span>
        </div>
      </article>

      <section class="page-route-content">
        <article class="card section-card">
          <h2>${esc(ui[lang].overview)}</h2>
          <p>
            ${lang === "es"
              ? `Esta sección replica la página clásica de documentación de <strong>${esc(title)}</strong>, mientras mantiene una URL limpia basada en carpetas.`
              : `This section mirrors the classic Psych documentation page for <strong>${esc(title)}</strong>, while staying on a clean folder-based URL.`}
          </p>
        </article>

        <article class="card section-card">
          <h2>${esc(ui[lang].functions)}</h2>
          <div class="function-list">
            ${category.functions.map(renderFunctionCard).join("")}
          </div>
        </article>
      </section>
    `;
  }

  function renderVariablesPage(page) {
    const text =
      lang === "es"
        ? {
            title: "Variables",
            intro:
              "Todas estas variables se pueden leer directamente en Lua sin funciones auxiliares como getProperty. Cambiarlas normalmente no modifica scripts no relacionados ni el motor en sí.",
            groupsLabel: "grupos",
            directAccess: "Acceso directo"
          }
        : {
            title: "Variables",
            intro:
              "All of these variables can be accessed directly in Lua without helper functions like getProperty. Changing them usually does not mutate unrelated scripts or the engine itself.",
            groupsLabel: "groups",
            directAccess: "Direct access"
          };

    return `
      <article class="card section-card page-route-hero">
        <p class="eyebrow">Psych Engine</p>
        <h1>${esc(text.title)}</h1>
        <p>${esc(text.intro)}</p>
        <div class="page-route-meta">
          <span class="chip">${page.sections.length} ${esc(text.groupsLabel)}</span>
          <span class="chip">${esc(text.directAccess)}</span>
        </div>
      </article>

      <section class="page-route-content">
        ${page.sections
          .map(
            (section) => `
              <article class="card section-card">
                <h2>${esc(section.title)}</h2>
                <ul class="psych-list">
                  ${section.items
                    .map(
                      ([name, description]) => `
                        <li><span class="code-pill">${esc(name)}</span> - ${esc(description)}</li>
                      `
                    )
                    .join("")}
                </ul>
              </article>
            `
          )
          .join("")}
      </section>
    `;
  }

  function renderSnippetsPage(page) {
    const text =
      lang === "es"
        ? {
            title: "Fragmentos de código",
            intro:
              "Esta página recopila scripts de ejemplo que ayudan a explicar cómo están estructurados los scripts Lua en Psych Engine.",
            groupsLabel: "grupos",
            examples: "Ejemplos",
            reference: "Abrir referencia"
          }
        : {
            title: "Code Snippets",
            intro:
              "This page collects example scripts that help explain how Lua scripts are structured in Psych Engine.",
            groupsLabel: "groups",
            examples: "Examples",
            reference: "Open reference"
          };

    return `
      <article class="card section-card page-route-hero">
        <p class="eyebrow">Psych Engine</p>
        <h1>${esc(text.title)}</h1>
        <p>${esc(text.intro)}</p>
        <div class="page-route-meta">
          <span class="chip">${page.groups.length} ${esc(text.groupsLabel)}</span>
          <span class="chip">${esc(text.examples)}</span>
        </div>
      </article>

      <section class="page-route-content">
        ${page.groups
          .map(
            (group) => `
              <article class="card section-card">
                <h2>${esc(group.title)}</h2>
                <div class="page-links">
                  ${group.links
                    .map(
                      ([label, href]) => `
                        <a href="${esc(href)}" target="_blank" rel="noreferrer">
                          ${esc(label)}
                          <small>${esc(text.reference)}</small>
                        </a>
                      `
                    )
                    .join("")}
                </div>
              </article>
            `
          )
          .join("")}
      </section>
    `;
  }

  function renderNotFound() {
    return `
      <article class="card section-card page-route-hero">
        <p class="eyebrow">Psych Engine</p>
        <h1>Page not found</h1>
        <p>${esc(ui[lang].noPageBody)}</p>
      </article>
    `;
  }

  function renderPage() {
    const content = document.getElementById("pageContent");
    const searchInput = document.getElementById("pageSearch");
    if (!content) return;

    const category = categories.find((item) => item.id === pageId);
    const special = specialPages[pageId];

    if (category) {
      const localized = categoryText[category.id]?.[lang] || category;
      document.title = `Psych Engine - ${localized.title}`;
      content.innerHTML = renderCategoryPage(category, localized);
    } else if (special && special.sections) {
      document.title = `Psych Engine - ${lang === "es" ? "Variables" : "Variables"}`;
      content.innerHTML = renderVariablesPage(special);
    } else if (special && special.groups) {
      document.title = `Psych Engine - ${lang === "es" ? "Fragmentos de código" : "Code Snippets"}`;
      content.innerHTML = renderSnippetsPage(special);
    } else {
      document.title = `Psych Engine - ${ui[lang].noPage}`;
      content.innerHTML = renderNotFound();
    }

    renderNav();
    injectLanguageSwitch();

    if (searchInput) {
      searchInput.addEventListener("input", renderNav, { once: false });
    }
  }

  function injectLanguageSwitch() {
    const actions = document.querySelector(".top-actions");
    if (!actions || actions.querySelector(".lang-switch")) {
      return;
    }

    const link = document.createElement("a");
    link.className = "text-link lang-switch";
    link.textContent = ui[lang].langName;
    link.href =
      lang === "es"
        ? `../../../pages/${pageId}/index.html`
        : `../../es/pages/${pageId}/index.html`;
    actions.insertBefore(link, actions.querySelector("#themeToggle"));
  }

  renderPage();
})();

