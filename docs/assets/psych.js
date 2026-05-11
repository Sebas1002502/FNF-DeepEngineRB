const psychCategories = [
  {
    id: "playstate",
    title: "PlayState Functions",
    description: "General functions related to game state, songs, and cutscenes.",
    functions: ["startCountdown", "endSong", "getSongPosition", "restartSong", "triggerEvent"]
  },
  {
    id: "reflection",
    title: "Reflection Functions",
    description: "Get and set properties and call methods from objects and classes.",
    functions: ["getProperty", "setProperty", "callMethod", "createInstance", "addToGroup"]
  },
  {
    id: "spritesheet",
    title: "Spritesheet Functions",
    description: "Display and animate images on screen.",
    functions: ["makeLuaSprite", "makeAnimatedLuaSprite", "addLuaSprite", "playAnim", "removeLuaSprite"]
  },
  {
    id: "flxanimate",
    title: "FlxAnimate Functions",
    description: "Work with Animate Atlas and advanced animation symbols.",
    functions: ["makeFlxAnimateSprite", "loadAnimateAtlas", "addAnimationBySymbol"]
  },
  {
    id: "text",
    title: "Text Functions",
    description: "Create, style, and update Lua text objects.",
    functions: ["makeLuaText", "setTextString", "setTextSize", "setTextFont", "addLuaText"]
  },
  {
    id: "sound",
    title: "Sound Functions",
    description: "Play and control sounds and music.",
    functions: ["playSound", "playMusic", "setSoundVolume", "setSoundTime", "stopSound"]
  },
  {
    id: "shaders",
    title: "Shaders Functions",
    description: "Load shaders and update their uniforms.",
    functions: ["initLuaShader", "setSpriteShader", "setShaderFloat", "setShaderSampler2D"]
  },
  {
    id: "camera",
    title: "Camera Functions",
    description: "Control camera movement and effects.",
    functions: ["setCameraScroll", "cameraSetTarget", "cameraShake", "cameraFlash", "cameraFade"]
  },
  {
    id: "input",
    title: "Input Functions",
    description: "Keyboard, mouse, and gamepad input helpers.",
    functions: ["mouseClicked", "keyJustPressed", "keyboardPressed", "anyGamepadJustPressed"]
  },
  {
    id: "tween",
    title: "Tween Functions",
    description: "Create tween effects on objects and values.",
    functions: ["startTween", "doTweenX", "doTweenY", "doTweenAlpha", "cancelTween"]
  },
  {
    id: "timer",
    title: "Timer Functions",
    description: "Schedule logic by time and loops.",
    functions: ["runTimer", "cancelTimer"]
  },
  {
    id: "character",
    title: "Character Functions",
    description: "Control character positions and dance behavior.",
    functions: ["getCharacterX", "setCharacterY", "characterDance"]
  },
  {
    id: "substate",
    title: "Substate Functions",
    description: "Open custom substates for menus and mechanics.",
    functions: ["openCustomSubstate", "closeCustomSubstate", "insertToCustomSubstate"]
  },
  {
    id: "discord",
    title: "Discord Functions",
    description: "Update Discord rich presence.",
    functions: ["changeDiscordPresence", "changeDiscordClientID"]
  },
  {
    id: "achievements",
    title: "Achievements Functions",
    description: "Read and update softcoded achievements.",
    functions: ["getAchievementScore", "unlockAchievement", "achievementExists"]
  },
  {
    id: "translations",
    title: "Language/Translation Functions",
    description: "Build translatable mods with phrase lookups.",
    functions: ["getTranslationPhrase", "getFileTranslation"]
  },
  {
    id: "precache",
    title: "Precache Functions",
    description: "Preload assets and reduce stutter.",
    functions: ["precacheImage", "precacheSound", "precacheMusic", "addCharacterToList"]
  },
  {
    id: "score",
    title: "Score Functions",
    description: "Control score, misses, hits, and rating values.",
    functions: ["addScore", "setMisses", "setHealth", "setRatingPercent", "updateScoreText"]
  },
  {
    id: "savedata",
    title: "Save Data Functions",
    description: "Initialize and manipulate save slots.",
    functions: ["initSaveData", "flushSaveData", "getDataFromSave", "setDataFromSave"]
  },
  {
    id: "file",
    title: "File I/O Functions",
    description: "Read, write, and manage external files.",
    functions: ["getTextFromFile", "checkFileExists", "saveFile", "deleteFile"]
  },
  {
    id: "script",
    title: "Script Functions",
    description: "Communicate between Lua scripts and HScript.",
    functions: ["getRunningScripts", "callScript", "setVar", "callOnScripts", "runHaxeCode"]
  },
  {
    id: "uncategorized",
    title: "Uncategorized Functions",
    description: "Utility helpers that do not fit a single category.",
    functions: ["FlxColor", "stringSplit", "getRandomInt", "debugPrint", "getModSetting"]
  }
];

function normalize(value) {
  return value.toLowerCase().trim();
}

function renderNavigation(categories) {
  const nav = document.getElementById("categoryNav");
  nav.innerHTML = categories
    .map((cat) => `<a href="#${cat.id}">${cat.title}</a>`)
    .join("");
}

function renderSections(categories, filterText = "") {
  const container = document.getElementById("functionSections");
  const query = normalize(filterText);
  const filtered = categories.filter((category) => {
    if (!query) {
      return true;
    }

    const haystack = `${category.title} ${category.description} ${category.functions.join(" ")}`.toLowerCase();
    return haystack.includes(query);
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <article class="card function-group">
        <h3>No matches found</h3>
        <p>Try another keyword, like setProperty, runTimer, or playSound.</p>
      </article>
    `;
    return;
  }

  container.innerHTML = filtered
    .map(
      (category) => `
      <article class="card function-group" id="${category.id}">
        <h3>${category.title}</h3>
        <p>${category.description}</p>
        <div class="function-tags">
          ${category.functions.map((fn) => `<span class="tag">${fn}</span>`).join("")}
        </div>
      </article>
    `
    )
    .join("");
}

(function initPsychPage() {
  const searchInput = document.getElementById("functionSearch");
  if (!searchInput) {
    return;
  }

  renderNavigation(psychCategories);
  renderSections(psychCategories);

  searchInput.addEventListener("input", (event) => {
    renderSections(psychCategories, event.target.value);
  });
})();
