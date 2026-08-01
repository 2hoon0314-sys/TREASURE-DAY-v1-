// ========================================
// 💎 TREASURE DAY - app.js
// ========================================


// ========================================
// 🎒 持ち物 CHECKLIST
// ========================================

const items = [
  "充電器",
  "AirPods",
  "ペンライト",
  "グッズ",
  "モバイルバッテリー",
  "財布",
  "スマホ",
  "メイク道具",
  "クレンジング",
  "スキンケア",
  "ヘアケア",
  "くし",
  "香水",
  "ハンディファン"
];

const checklist = document.getElementById("checklist");
const progressBar = document.getElementById("progress-bar");
const percent = document.querySelector(".percent");

let savedChecklist = {};

try {
  savedChecklist =
    JSON.parse(localStorage.getItem("treasure-checklist")) || {};
} catch (e) {
  savedChecklist = {};
}

function renderChecklist() {

  if (!checklist) return;

  checklist.innerHTML = "";

  let checked = 0;

  items.forEach((item) => {

    const row = document.createElement("label");
    row.className = "item";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = savedChecklist[item] || false;

    if (input.checked) {
      checked++;
    }

    input.addEventListener("change", () => {

      savedChecklist[item] = input.checked;

      localStorage.setItem(
        "treasure-checklist",
        JSON.stringify(savedChecklist)
      );

      renderChecklist();
    });

    const span = document.createElement("span");
    span.textContent = item;

    row.appendChild(input);
    row.appendChild(span);

    checklist.appendChild(row);
  });

  const value =
    items.length > 0
      ? Math.round((checked / items.length) * 100)
      : 0;

  if (progressBar) {
    progressBar.style.width = value + "%";
  }

  if (percent) {
    percent.textContent = value + "%";
  }
}

renderChecklist();


// ========================================
// ✅ 全部チェック
// ========================================

const checkAllButton = document.getElementById("check-all");

if (checkAllButton) {

  checkAllButton.addEventListener("click", () => {

    items.forEach((item) => {
      savedChecklist[item] = true;
    });

    localStorage.setItem(
      "treasure-checklist",
      JSON.stringify(savedChecklist)
    );

    renderChecklist();
  });
}


// ========================================
// 🔄 リセット
// ========================================

const clearAllButton = document.getElementById("clear-all");

if (clearAllButton) {

  clearAllButton.addEventListener("click", () => {

    items.forEach((item) => {
      savedChecklist[item] = false;
    });

    localStorage.setItem(
      "treasure-checklist",
      JSON.stringify(savedChecklist)
    );

    renderChecklist();
  });
}


// ========================================
// 💙 THE STAGE D-DAY
// ========================================

const dday = document.getElementById("dday");

if (dday) {

  const eventDate = new Date("2026-08-01T00:00:00");
  const today = new Date();

  eventDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diff = Math.ceil(
    (eventDate - today) / (1000 * 60 * 60 * 24)
  );

  if (diff > 0) {
    dday.textContent = "D-" + diff;
  } else if (diff === 0) {
    dday.textContent = "TODAY 💎";
  } else {
    dday.textContent = "THANK YOU 💙";
  }
}


// ========================================
// 💎 SPLASH
// ========================================

const splash = document.getElementById("splash");
const app = document.getElementById("app");

setTimeout(() => {

  if (splash) {
    splash.style.display = "none";
  }

  if (app) {
    app.style.display = "block";
  }

}, 1800);


// ========================================
// 📱 TAB
// ========================================

const homeTab = document.getElementById("home-tab");
const planTab = document.getElementById("plan-tab");
const memoryTab = document.getElementById("memory-tab");
const settingsTab = document.getElementById("settings-tab");

const homePage = document.querySelector("main");
const planPage = document.getElementById("plan-page");
const memoryPage = document.getElementById("memory-page");
const settingsPage = document.getElementById("settings-page");

function showPage(pageName) {

  if (homePage) {
    homePage.style.display =
      pageName === "home" ? "block" : "none";
  }

  if (planPage) {
    planPage.style.display =
      pageName === "plan" ? "block" : "none";
  }

  if (memoryPage) {
    memoryPage.style.display =
      pageName === "memory" ? "block" : "none";
  }

  if (settingsPage) {
    settingsPage.style.display =
      pageName === "settings" ? "block" : "none";
  }

  if (homeTab) {
    homeTab.classList.toggle(
      "active",
      pageName === "home"
    );
  }

  if (planTab) {
    planTab.classList.toggle(
      "active",
      pageName === "plan"
    );
  }

  if (memoryTab) {
    memoryTab.classList.toggle(
      "active",
      pageName === "memory"
    );
  }

  if (settingsTab) {
    settingsTab.classList.toggle(
      "active",
      pageName === "settings"
    );
  }
}

if (homeTab) {
  homeTab.addEventListener("click", () => {
    showPage("home");
    updateHomeMember();
  });
}

if (planTab) {
  planTab.addEventListener("click", () => {
    showPage("plan");
  });
}

if (memoryTab) {
  memoryTab.addEventListener("click", () => {
    showPage("memory");
  });
}

if (settingsTab) {
  settingsTab.addEventListener("click", () => {
    showPage("settings");
  });
}


// ========================================
// 📝 MEMORY
// ========================================

const memoryTitle =
  document.getElementById("memory-title");

const memoryText =
  document.getElementById("memory-text");

const saveMemoryBtn =
  document.getElementById("save-memory");

const memoryList =
  document.getElementById("memory-list");

let memories = [];

try {
  memories =
    JSON.parse(localStorage.getItem("treasure-memories")) || [];
} catch (e) {
  memories = [];
}

function renderMemories() {

  if (!memoryList) return;

  memoryList.innerHTML = "";

  memories.forEach((memory) => {

    const card = document.createElement("div");
    card.className = "memory-card";

    const title = document.createElement("h3");
    title.textContent =
      memory.title || "TREASURE MEMORY 💎";

    const text = document.createElement("p");
    text.textContent = memory.text || "";

    card.appendChild(title);
    card.appendChild(text);

    memoryList.appendChild(card);
  });
}

if (saveMemoryBtn) {

  saveMemoryBtn.addEventListener("click", () => {

    const title =
      memoryTitle ? memoryTitle.value.trim() : "";

    const text =
      memoryText ? memoryText.value.trim() : "";

    if (title === "" && text === "") {
      alert("思い出を書いてね💎");
      return;
    }

    memories.unshift({
      title: title || "TREASURE MEMORY 💎",
      text: text
    });

    localStorage.setItem(
      "treasure-memories",
      JSON.stringify(memories)
    );

    if (memoryTitle) {
      memoryTitle.value = "";
    }

    if (memoryText) {
      memoryText.value = "";
    }

    renderMemories();
  });
}

renderMemories();


// ========================================
// 🌙 THEME
// ========================================

const themeToggle =
  document.getElementById("theme-toggle");

const savedTheme =
  localStorage.getItem("treasure-theme") || "dark";

function applyTheme(theme) {

  if (theme === "light") {

    document.body.classList.add("light-mode");

    if (themeToggle) {
      themeToggle.textContent = "DARK MODE";
    }

  } else {

    document.body.classList.remove("light-mode");

    if (themeToggle) {
      themeToggle.textContent = "LIGHT MODE";
    }
  }
}

applyTheme(savedTheme);

if (themeToggle) {

  themeToggle.addEventListener("click", () => {

    const isLight =
      document.body.classList.contains("light-mode");

    const newTheme =
      isLight ? "dark" : "light";

    localStorage.setItem(
      "treasure-theme",
      newTheme
    );

    applyTheme(newTheme);
  });
}


// ========================================
// 💎 推しメン設定
// ========================================

const memberSelect =
  document.getElementById("member-select");

const homeMember =
  document.getElementById("home-member");

function updateHomeMember() {

  const member =
    localStorage.getItem("treasure-member") || "JIHOON";

  if (homeMember) {
    homeMember.textContent = member;
  }
}

const savedMember =
  localStorage.getItem("treasure-member");

if (memberSelect && savedMember) {
  memberSelect.value = savedMember;
}

if (memberSelect) {

  memberSelect.addEventListener("change", () => {

    localStorage.setItem(
      "treasure-member",
      memberSelect.value
    );

    updateHomeMember();
  });
}

updateHomeMember();


// ========================================
// 🎉 TREASURE DAY 設定
// ========================================

const treasureDayInput =
  document.getElementById("treasure-day-input");

const treasureCountdown =
  document.getElementById("treasure-countdown");

const savedTreasureDay =
  localStorage.getItem("treasure-day-date");

if (treasureDayInput && savedTreasureDay) {
  treasureDayInput.value = savedTreasureDay;
}

function updateTreasureCountdown() {

  if (!treasureCountdown) return;

  const savedDate =
    localStorage.getItem("treasure-day-date");

  if (!savedDate) {
    treasureCountdown.textContent = "D-DAY";
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const treasureDate =
    new Date(savedDate + "T00:00:00");

  const diff = Math.ceil(
    (treasureDate - today) /
    (1000 * 60 * 60 * 24)
  );

  if (diff > 0) {

    treasureCountdown.textContent =
      `D-${diff}`;

  } else if (diff === 0) {

    treasureCountdown.textContent =
      "🎉 TODAY IS TREASURE DAY 💎";

  } else {

    treasureCountdown.textContent =
      "💎 TREASURE DAY 💎";
  }
}

if (treasureDayInput) {

  treasureDayInput.addEventListener(
    "change",
    () => {

      localStorage.setItem(
        "treasure-day-date",
        treasureDayInput.value
      );

      updateTreasureCountdown();
    }
  );
}

updateTreasureCountdown();


// ========================================
// 🎫 NEXT EVENT
// ========================================

const eventNameInput =
  document.getElementById("event-name");

const eventPlaceInput =
  document.getElementById("event-place");

const eventDateInput =
  document.getElementById("event-date");

const saveEventButton =
  document.getElementById("save-event");


// 保存済みイベントを読み込む
let savedEvent = null;

try {
  savedEvent =
    JSON.parse(
      localStorage.getItem("treasure-next-event")
    );
} catch (e) {
  savedEvent = null;
}

if (savedEvent) {

  if (eventNameInput) {
    eventNameInput.value =
      savedEvent.name || "";
  }

  if (eventPlaceInput) {
    eventPlaceInput.value =
      savedEvent.place || "";
  }

  if (eventDateInput) {
    eventDateInput.value =
      savedEvent.date || "";
  }
}


// 保存ボタン
if (saveEventButton) {

  saveEventButton.addEventListener(
    "click",
    () => {

      const eventData = {

        name:
          eventNameInput
            ? eventNameInput.value.trim()
            : "",

        place:
          eventPlaceInput
            ? eventPlaceInput.value.trim()
            : "",

        date:
          eventDateInput
            ? eventDateInput.value
            : ""
      };

      if (
        eventData.name === "" &&
        eventData.place === "" &&
        eventData.date === ""
      ) {
        alert("イベント情報を入力してね💎");
        return;
      }

      localStorage.setItem(
        "treasure-next-event",
        JSON.stringify(eventData)
      );

      alert("💎 NEXT EVENTを保存しました！");
    }
  );
}


// ========================================
// 💎 TREASURE DAY READY
// ========================================

console.log("💎 TREASURE DAY READY 💎");
