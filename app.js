// ========================================
// 💎 TREASURE DAY - app.js
// ========================================

// ==========================================
// 🎒 持ち物 CHECKLIST
// ==========================================

// 最初から入っている持ち物
const defaultItems = [
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

// 保存されている持ち物一覧を読み込む
let items = [];

try {
  const savedItems = JSON.parse(
    localStorage.getItem("treasure-items")
  );

  if (Array.isArray(savedItems)) {
    items = savedItems;
  } else {
    items = [...defaultItems];
  }
} catch (e) {
  items = [...defaultItems];
}

// 初回だけ持ち物一覧を保存
if (!localStorage.getItem("treasure-items")) {
  localStorage.setItem(
    "treasure-items",
    JSON.stringify(items)
  );
}


// チェック状態を読み込む
let savedChecklist = {};

try {
  savedChecklist =
    JSON.parse(
      localStorage.getItem("treasure-checklist")
    ) || {};
} catch (e) {
  savedChecklist = {};
}


// HTML取得
const checklist =
  document.getElementById("checklist");

const progressBar =
  document.getElementById("progress-bar");

const percent =
  document.querySelector(".percent");

const checkAllButton =
  document.getElementById("check-all");

const clearAllButton =
  document.getElementById("clear-all");

const newItemInput =
  document.getElementById("new-item");

const addItemButton =
  document.getElementById("add-item-btn");


// 保存
function saveItems() {
  localStorage.setItem(
    "treasure-items",
    JSON.stringify(items)
  );
}

function saveChecklist() {
  localStorage.setItem(
    "treasure-checklist",
    JSON.stringify(savedChecklist)
  );
}


// 持ち物一覧を表示
function renderChecklist() {

  if (!checklist) return;

  checklist.innerHTML = "";

  let checked = 0;

  items.forEach((item) => {

    const row = document.createElement("div");
    row.className = "item";


    // チェックボックス
    const label = document.createElement("label");

    const input =
      document.createElement("input");

    input.type = "checkbox";

    input.checked =
      savedChecklist[item] || false;

    if (input.checked) {
      checked++;
    }


    input.addEventListener(
      "change",
      () => {

        savedChecklist[item] =
          input.checked;

        saveChecklist();

        renderChecklist();
      }
    );


    // 持ち物名
    const span =
      document.createElement("span");

    span.textContent = item;


    label.appendChild(input);
    label.appendChild(span);


    // 削除ボタン
    const deleteButton =
      document.createElement("button");

    deleteButton.type = "button";
    deleteButton.textContent = "🗑️";
    deleteButton.className = "delete-item";


    deleteButton.addEventListener(
      "click",
      () => {

        const ok = confirm(
          "「" + item + "」を削除する？"
        );

        if (!ok) return;


        items = items.filter(
          (name) => name !== item
        );

        delete savedChecklist[item];

        saveItems();
        saveChecklist();

        renderChecklist();
      }
    );


    row.appendChild(label);
    row.appendChild(deleteButton);

    checklist.appendChild(row);

  });


  // 進捗率
  const value =
    items.length > 0
      ? Math.round(
          (checked / items.length) * 100
        )
      : 0;


  if (progressBar) {
    progressBar.style.width =
      value + "%";
  }


  if (percent) {
    percent.textContent =
      value + "%";
  }
}


// ==========================================
// ➕ 持ち物追加
// ==========================================

function addNewItem() {

  if (!newItemInput) return;

  const newItem =
    newItemInput.value.trim();


  if (!newItem) {
    alert("持ち物を入力してね💎");
    return;
  }


  if (items.includes(newItem)) {
    alert("その持ち物はもう入ってるよ💎");
    return;
  }


  items.push(newItem);

  savedChecklist[newItem] = false;

  saveItems();
  saveChecklist();

  newItemInput.value = "";

  renderChecklist();
}


if (addItemButton) {

  addItemButton.addEventListener(
    "click",
    addNewItem
  );

}


if (newItemInput) {

  newItemInput.addEventListener(
    "keydown",
    (e) => {

      if (e.key === "Enter") {
        addNewItem();
      }

    }
  );

}


// ==========================================
// ✅ 全部チェック
// ==========================================

if (checkAllButton) {

  checkAllButton.addEventListener(
    "click",
    () => {

      items.forEach((item) => {
        savedChecklist[item] = true;
      });

      saveChecklist();

      renderChecklist();
    }
  );

}


// ==========================================
// 🔄 リセット
// ==========================================

if (clearAllButton) {

  clearAllButton.addEventListener(
    "click",
    () => {

      items.forEach((item) => {
        savedChecklist[item] = false;
      });

      saveChecklist();

      renderChecklist();
    }
  );

}


// 最初に表示
renderChecklist();
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
      updateHomeEvent();
      alert("💎 NEXT EVENTを保存しました！");
    }
  );
}


// ========================================
// 💎 TREASURE DAY READY
// ========================================

console.log("💎 TREASURE DAY READY 💎");
// ===== HOME NEXT EVENT 表示 =====
const homeEventName = document.getElementById("home-event-name");
const homeEventPlace = document.getElementById("home-event-place");
const homeEventDate = document.getElementById("home-event-date");

function updateHomeEvent() {
  let eventData = null;

  try {
    eventData = JSON.parse(
      localStorage.getItem("treasure-next-event")
    );
  } catch (e) {
    eventData = null;
  }

  if (!eventData) return;

  if (homeEventName) {
    homeEventName.textContent = eventData.name || "NEXT EVENT";
  }

  if (homeEventPlace) {
    homeEventPlace.textContent = eventData.place || "";
  }

  if (homeEventDate) {
    homeEventDate.textContent = eventData.date
      ? eventData.date.replaceAll("-", ".")
      : "";
  }
}

updateHomeEvent();
// ==========================================
// 📅 PLAN イベント管理
// ==========================================

const planName = document.getElementById("plan-name");
const planPlace = document.getElementById("plan-place");
const planDate = document.getElementById("plan-date");
const addPlanBtn = document.getElementById("add-plan-btn");
const planList = document.getElementById("plan-list");

let planEvents = [];

try {
  planEvents =
    JSON.parse(localStorage.getItem("treasure-plan-events")) || [];
} catch (e) {
  planEvents = [];
}


// PLANを保存
function savePlanEvents() {
  localStorage.setItem(
    "treasure-plan-events",
    JSON.stringify(planEvents)
  );
}


// 日付順に並べて表示
function renderPlanEvents() {

  if (!planList) return;

  planList.innerHTML = "";

  planEvents.sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  planEvents.forEach((event, index) => {

    const card = document.createElement("div");
    card.className = "plan-item";

    const info = document.createElement("div");

    const title = document.createElement("strong");
    title.textContent = "💎 " + event.name;

    const place = document.createElement("div");
    place.textContent = "📍 " + event.place;

    const date = document.createElement("div");
    date.textContent =
      "📅 " + event.date.replaceAll("-", ".");

    info.appendChild(title);
    info.appendChild(place);
    info.appendChild(date);


    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "🗑️";
    deleteBtn.className = "delete-plan";

    deleteBtn.addEventListener("click", () => {

      planEvents.splice(index, 1);

      savePlanEvents();
      renderPlanEvents();
      updateNextEventFromPlan();

    });


    card.appendChild(info);
    card.appendChild(deleteBtn);

    planList.appendChild(card);

  });

}


// 一番近い未来のイベントをHOMEへ送る
function updateNextEventFromPlan() {

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = planEvents
    .filter(event => {

      const eventDate =
        new Date(event.date + "T00:00:00");

      return eventDate >= today;

    })
    .sort((a, b) =>
      a.date.localeCompare(b.date)
    );


  if (upcoming.length === 0) {

    localStorage.removeItem(
      "treasure-next-event"
    );

    eventData = null;

    if (homeEventName) {
      homeEventName.textContent = "";
    }

    if (homeEventPlace) {
      homeEventPlace.textContent = "";
    }

    if (homeEventDate) {
      homeEventDate.textContent = "";
    }

    return;
  }


  const next = upcoming[0];

  const nextEvent = {
    name: next.name,
    place: next.place,
    date: next.date
  };


  localStorage.setItem(
    "treasure-next-event",
    JSON.stringify(nextEvent)
  );

  eventData = nextEvent;

  updateHomeEvent();

}

// PLANイベント保存用
let planEvents = [];

try {
  const savedPlanEvents = JSON.parse(
    localStorage.getItem("treasure-plan-events")
  );

  if (Array.isArray(savedPlanEvents)) {
    planEvents = savedPlanEvents;
  }
} catch (e) {
  planEvents = [];
}

function savePlanEvents() {
  localStorage.setItem(
    "treasure-plan-events",
    JSON.stringify(planEvents)
  );
}
// PLANイベント一覧を表示
function renderPlanEvents() {
  const planList = document.getElementById("plan-list");
  if (!planList) return;

  planList.innerHTML = "";

  planEvents.forEach((event, index) => {
    const card = document.createElement("div");
    card.className = "plan-event";

    card.innerHTML = `
      <div>
        <strong>${event.name}</strong><br>
        📍 ${event.place}<br>
        📅 ${event.date.replaceAll("-", ".")}
      </div>
      <button type="button" data-index="${index}">削除</button>
    `;

    const deleteBtn = card.querySelector("button");

    deleteBtn.addEventListener("click", () => {
      planEvents.splice(index, 1);
      savePlanEvents();
      renderPlanEvents();
      updateNextEventFromPlan();
    });

    planList.appendChild(card);
  });
}
// ＋イベントを追加
const addPlanBtn = document.getElementById("add-plan-btn");
const planName = document.getElementById("plan-name");
const planPlace = document.getElementById("plan-place");
const planDate = document.getElementById("plan-date");
if (addPlanBtn) {

  addPlanBtn.addEventListener("click", () => {

    const name = planName.value.trim();
    const place = planPlace.value.trim();
    const date = planDate.value;


    if (!name || !place || !date) {

      alert("イベント情報を全部入力してね💎");
      return;

    }


    planEvents.push({
      name: name,
      place: place,
      date: date
    });


    savePlanEvents();

    renderPlanEvents();

    updateNextEventFromPlan();


    planName.value = "";
    planPlace.value = "";
    planDate.value = "";


    alert("💎 PLANに追加しました！");

  });

}


// 最初に表示
renderPlanEvents();

// HOMEのNEXT EVENTも同期
updateNextEventFromPlan();
function updateNextEventFromPlan() {
  if (!Array.isArray(planEvents) || planEvents.length === 0) {
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = planEvents
    .filter((event) => {
      const eventDate = new Date(event.date + "T00:00:00");
      return eventDate >= today;
    })
    .sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

  if (upcomingEvents.length === 0) {
    return;
  }

  const nextEvent = upcomingEvents[0];

  localStorage.setItem(
    "treasure-next-event",
    JSON.stringify(nextEvent)
  );
}
