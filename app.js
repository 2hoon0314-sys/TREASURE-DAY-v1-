// ========================================
// 💎 TREASURE DAY - app.js
// ========================================

// ==========================================
// 🎒 持ち物 CHECKLIST
// ==========================================

// 最初に入っている持ち物
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

// 保存済みの持ち物を読み込む
let items = [];

try {
  const savedItems = JSON.parse(
    localStorage.getItem("treasure-items")
  );

  items =
    Array.isArray(savedItems) && savedItems.length > 0
      ? savedItems
      : [...defaultItems];
} catch (e) {
  items = [...defaultItems];
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


// HTMLのパーツ
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


// 持ち物リストを保存
function saveItems() {
  localStorage.setItem(
    "treasure-items",
    JSON.stringify(items)
  );
}


// チェック状態を保存
function saveChecklist() {
  localStorage.setItem(
    "treasure-checklist",
    JSON.stringify(savedChecklist)
  );
}


// 持ち物を画面に表示
function renderChecklist() {

  if (!checklist) return;

  checklist.innerHTML = "";

  let checked = 0;

  items.forEach((item) => {

    const row =
      document.createElement("div");

    row.className = "item";


    // チェックボックス
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


    // 削除ボタン
    const deleteButton =
      document.createElement("button");

    deleteButton.type = "button";
    deleteButton.textContent = "🗑️";

    deleteButton.style.marginLeft = "auto";
    deleteButton.style.width = "auto";
    deleteButton.style.padding = "6px 10px";
    deleteButton.style.background = "transparent";


    deleteButton.addEventListener(
      "click",
      () => {

        items =
          items.filter(
            (savedItem) =>
              savedItem !== item
          );

        delete savedChecklist[item];

        saveItems();
        saveChecklist();
        renderChecklist();

      }
    );


    row.appendChild(input);
    row.appendChild(span);
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


// 最初の表示
renderChecklist();


// ==========================================
// ➕ 持ち物追加
// ==========================================

function addNewItem() {

  if (!newItemInput) return;

  const newItem =
    newItemInput.value.trim();

  if (!newItem) return;


  // 同じ名前の持ち物は追加しない
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


// キーボードのEnterでも追加
if (newItemInput) {

  newItemInput.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Enter") {
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
const pastEventsPage = document.getElementById("past-events-page");
const notificationPage = document.getElementById("notification-page");
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
if (pastEventsPage) {
  pastEventsPage.style.display =
    pageName === "past-events" ? "block" : "none";
}
  if (notificationPage) {
  notificationPage.style.display =
    pageName === "notifications" ? "block" : "none";
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
const notificationSetting = document.getElementById("notification-setting");

if (notificationSetting) {
  notificationSetting.addEventListener("click", () => {
    showPage("notifications");
    window.scrollTo(0, 0);
  });
}
const backToSettingsBtn = document.getElementById("back-to-settings-btn");

if (backToSettingsBtn) {
  backToSettingsBtn.addEventListener("click", () => {
    showPage("settings");
    window.scrollTo(0, 0);
  });
}
const pastEventsBtn = document.getElementById("past-events-btn");

if (pastEventsBtn) {
  pastEventsBtn.addEventListener("click", () => {
    tdRenderPastEvents();
    showPage("past-events");
    window.scrollTo(0, 0);
  });
}
const backToPlanBtn = document.getElementById("back-to-plan-btn");

if (backToPlanBtn) {
  backToPlanBtn.addEventListener("click", () => {
    showPage("plan");
    window.scrollTo(0, 0);
  });
}
function tdRenderPastEvents() {
  const pastEventsList = document.getElementById("past-events-list");
  if (!pastEventsList) return;

  pastEventsList.innerHTML = "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
const savedPlanEvents =
  JSON.parse(localStorage.getItem("treasure-plan-events") || "[]");
const pastEvents = savedPlanEvents
    .filter((event) => {
      const eventDate = new Date(event.date + "T00:00:00");
      return eventDate < today;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  if (pastEvents.length === 0) {
    pastEventsList.innerHTML = "<p>まだ過去のイベントはありません💎</p>";
    return;
  }

  pastEvents.forEach((event) => {
    const card = document.createElement("div");
    card.className = "plan-item";
const pastBadge = document.createElement("div");
pastBadge.className = "past-badge";
pastBadge.textContent = "PAST 💎";
    const info = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = event.name;

    const place = document.createElement("p");
    place.textContent = "📍 " + event.place;

    const date = document.createElement("p");
    date.textContent = "📅 " + event.date.replaceAll("-", ".");

    info.appendChild(title);
    info.appendChild(place);
    info.appendChild(date);
card.appendChild(pastBadge);
    card.appendChild(info);
    pastEventsList.appendChild(card);
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
const memoryPhoto =
  document.getElementById("memory-photo");
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

  memories.forEach((memory, index) => {
    const card = document.createElement("div");
    card.className = "memory-card";

    const title = document.createElement("h3");
    title.textContent =
      memory.title || "TREASURE MEMORY 💎";

    const text = document.createElement("p");
    text.textContent = memory.text || "";
// 📸 MEMORY写真
const photo = document.createElement("img");
photo.className = "memory-photo";

if (memory.photo) {
  photo.src = memory.photo;
}
    // ボタンエリア
    const actions = document.createElement("div");
    actions.className = "memory-actions";

    // ✏️ 編集
    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.textContent = "編集";

    editBtn.addEventListener("click", () => {
      const newTitle = prompt(
        "タイトルを編集",
        memory.title || ""
      );

      if (newTitle === null) return;

      const newText = prompt(
        "感想を編集",
        memory.text || ""
      );

      if (newText === null) return;

      memory.title =
        newTitle.trim() || "TREASURE MEMORY 💎";

      memory.text = newText.trim();
// 📸 写真をあとから追加・変更
const changePhoto = confirm("写真を追加・変更する？📸");

if (changePhoto) {
  const photoInput = document.createElement("input");
  photoInput.type = "file";
  photoInput.accept = "image/*";

  photoInput.onchange = async () => {
    if (photoInput.files && photoInput.files[0]) {
      memory.photo = await resizeMemoryPhoto(photoInput.files[0]);

      localStorage.setItem(
        "treasure-memories",
        JSON.stringify(memories)
      );

      renderMemories();
    }
  };

  photoInput.click();
}
      localStorage.setItem(
        "treasure-memories",
        JSON.stringify(memories)
      );

      renderMemories();
    });

    // 🗑️ 削除
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "削除";

    deleteBtn.addEventListener("click", () => {
      const ok = confirm(
        "このMEMORYを削除する？"
      );

      if (!ok) return;

      memories.splice(index, 1);

      localStorage.setItem(
        "treasure-memories",
        JSON.stringify(memories)
      );

      renderMemories();
    });

    // ⬆️ 上へ
    const upBtn = document.createElement("button");
    upBtn.type = "button";
    upBtn.textContent = "↑";

    upBtn.disabled = index === 0;

    upBtn.addEventListener("click", () => {
      if (index === 0) return;

      [memories[index - 1], memories[index]] =
        [memories[index], memories[index - 1]];

      localStorage.setItem(
        "treasure-memories",
        JSON.stringify(memories)
      );

      renderMemories();
    });

    // ⬇️ 下へ
    const downBtn = document.createElement("button");
    downBtn.type = "button";
    downBtn.textContent = "↓";

    downBtn.disabled =
      index === memories.length - 1;

    downBtn.addEventListener("click", () => {
      if (index === memories.length - 1) return;

      [memories[index], memories[index + 1]] =
        [memories[index + 1], memories[index]];

      localStorage.setItem(
        "treasure-memories",
        JSON.stringify(memories)
      );

      renderMemories();
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    actions.appendChild(upBtn);
    actions.appendChild(downBtn);

    card.appendChild(title);
    card.appendChild(text);
    if (memory.photo) {
  card.appendChild(photo);
}
    card.appendChild(actions);

    memoryList.appendChild(card);
  });
}
function resizeMemoryPhoto(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 1000;

        const scale = Math.min(1, maxWidth / img.width);

        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        resolve(canvas.toDataURL("image/jpeg", 0.75));
      };

      img.src = reader.result;
    };

    reader.readAsDataURL(file);
  });
}
if (saveMemoryBtn) {

saveMemoryBtn.addEventListener("click", async () => {

    const title =
      memoryTitle ? memoryTitle.value.trim() : "";

    const text =
      memoryText ? memoryText.value.trim() : "";

    if (title === "" && text === "") {
      alert("思い出を書いてね💎");
      return;
    }
let photo = "";

if (
  memoryPhoto &&
  memoryPhoto.files &&
  memoryPhoto.files[0]
) {
  photo = await resizeMemoryPhoto(
    memoryPhoto.files[0]
  );
}
memories.unshift({
  title: title || "TREASURE MEMORY 💎",
  text: text,
  photo: photo
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

  const dday = document.getElementById("dday");

  // PLANに未来の予定がないとき
  if (!eventData) {
    if (homeEventName) {
      homeEventName.textContent = "予定なし";
    }

    if (homeEventPlace) {
      homeEventPlace.textContent = "PLANに予定を追加してね💎";
    }

    if (homeEventDate) {
      homeEventDate.textContent = "";
    }

    if (dday) {
      dday.textContent = "NO PLAN";
    }

    return;
  }

  // NEXT EVENTを表示
  if (homeEventName) {
    homeEventName.textContent = eventData.name || "";
  }

  if (homeEventPlace) {
    homeEventPlace.textContent = eventData.place || "";
  }

  if (homeEventDate) {
    homeEventDate.textContent = eventData.date
      ? eventData.date.replaceAll("-", ".")
      : "";
  }

  // D-DAYを自動計算
  if (dday && eventData.date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const eventDate = new Date(
      eventData.date + "T00:00:00"
    );

    const diff = Math.round(
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
}
updateHomeEvent();

// ========================================
// 📅 PLAN イベント追加・保存機能
// ========================================

(() => {
  const tdPlanName = document.getElementById("plan-name");
  const tdPlanPlace = document.getElementById("plan-place");
  const tdPlanDate = document.getElementById("plan-date");
  const tdPlanAddBtn = document.getElementById("add-plan-btn");
  const tdPlanList = document.getElementById("plan-list");

  if (
    !tdPlanName ||
    !tdPlanPlace ||
    !tdPlanDate ||
    !tdPlanAddBtn ||
    !tdPlanList
  ) {
    return;
  }

  let tdPlanEvents = [];

  try {
    const saved = JSON.parse(
      localStorage.getItem("treasure-plan-events")
    );

    if (Array.isArray(saved)) {
      tdPlanEvents = saved;
    }
  } catch (e) {
    tdPlanEvents = [];
  }

  function tdSavePlanEvents() {
    localStorage.setItem(
      "treasure-plan-events",
      JSON.stringify(tdPlanEvents)
    );
  }

function tdUpdateNextEvent() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = tdPlanEvents
    .filter((event) => {
      const eventDate = new Date(
        event.date + "T00:00:00"
      );

      return eventDate >= today;
    })
    .sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

  // 未来の予定が0件
  if (upcoming.length === 0) {
    localStorage.removeItem("treasure-next-event");

    if (typeof updateHomeEvent === "function") {
      updateHomeEvent();
    }

    return;
  }

  // 一番近い未来イベント
  const next = upcoming[0];

  localStorage.setItem(
    "treasure-next-event",
    JSON.stringify({
      name: next.name,
      place: next.place,
      date: next.date
    })
  );

  // HOMEを即更新
  if (typeof updateHomeEvent === "function") {
    updateHomeEvent();
  }
}
  function tdRenderPlanEvents() {
    tdPlanList.innerHTML = "";

    const sortedEvents = [...tdPlanEvents].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
// 過去イベントかどうか判定
const today = new Date();
today.setHours(0, 0, 0, 0);
const nextEvent = sortedEvents.find((event) => {
  const eventDate = new Date(event.date + "T00:00:00");
  return eventDate >= today;
});
// 💎 PLANには今日以降のイベントだけ表示
const upcomingEvents = sortedEvents.filter((event) => {
  const eventDate = new Date(event.date + "T00:00:00");
  return eventDate >= today;
});

upcomingEvents.forEach((event) => {
      const originalIndex = tdPlanEvents.findIndex(
        (item) =>
          item.id === event.id
      );
const eventDate = new Date(event.date + "T00:00:00");
const isPast = eventDate < today;
      const card = document.createElement("div");
      card.className = "plan-item";
if (isPast) {
  card.classList.add("past-event");
}
    // 💎 一番近いイベントにNEXTバッジ
if (nextEvent && event.id === nextEvent.id) {
  const nextBadge = document.createElement("span");
  nextBadge.className = "plan-next-badge";
  nextBadge.textContent = "NEXT 💎";
  card.appendChild(nextBadge);
}
      const info = document.createElement("div");

      const title = document.createElement("strong");
      title.textContent = event.name;

      const place = document.createElement("div");
      place.textContent = "📍 " + event.place;

      const date = document.createElement("div");
      date.textContent =
        "📅 " + event.date.replaceAll("-", ".");

      info.appendChild(title);
      info.appendChild(place);
      info.appendChild(date);

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.textContent = "削除";

      deleteBtn.addEventListener("click", () => {
        if (originalIndex < 0) return;

        tdPlanEvents.splice(originalIndex, 1);

        tdSavePlanEvents();
        tdRenderPlanEvents();
        tdUpdateNextEvent();
      });
// ✏️ 編集ボタン
const editBtn = document.createElement("button");
editBtn.type = "button";
editBtn.textContent = "編集";

editBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  const newName = prompt("イベント名", event.name);
  if (newName === null) return;

  const newPlace = prompt("会場", event.place);
  if (newPlace === null) return;

  const newDate = prompt("日付（YYYY-MM-DD）", event.date);
  if (newDate === null) return;

  if (!newName.trim() || !newPlace.trim() || !newDate) {
    alert("イベント情報を全部入力してね💎");
    return;
  }

  tdPlanEvents[originalIndex] = {
    ...tdPlanEvents[originalIndex],
    name: newName.trim(),
    place: newPlace.trim(),
    date: newDate
  };

  tdSavePlanEvents();
  tdRenderPlanEvents();
  tdUpdateNextEvent();
});
card.appendChild(info);
card.appendChild(editBtn);
card.appendChild(deleteBtn);
card.addEventListener("click", (e) => {
if (e.target === deleteBtn || e.target === editBtn) return;

  localStorage.setItem(
    "treasure-selected-event",
    JSON.stringify(event)
  );

  window.location.href = "event.html";
});
      tdPlanList.appendChild(card);
    });
  }

  tdPlanAddBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const name = tdPlanName.value.trim();
    const place = tdPlanPlace.value.trim();
    const date = tdPlanDate.value;

    if (!name || !place || !date) {
      alert("イベント情報を全部入力してね💎");
      return;
    }

    tdPlanEvents.push({
      id: Date.now(),
      name: name,
      place: place,
      date: date
    });

    tdSavePlanEvents();
    tdRenderPlanEvents();
    tdUpdateNextEvent();

    tdPlanName.value = "";
    tdPlanPlace.value = "";
    tdPlanDate.value = "";

    alert("💎 PLANに追加しました！");
  });

  tdRenderPlanEvents();
  tdUpdateNextEvent();
})();
// ========================================
// 🔔 NOTIFICATION SETTINGS SAVE
// ========================================

const notificationSwitches = [
  "event-notification",
  "treasure-day-notification",
  "memory-notification"
];

notificationSwitches.forEach((id) => {
  const toggle = document.getElementById(id);

  if (!toggle) return;

  // 💎 保存されている設定を読み込む
  const savedValue = localStorage.getItem(`treasure-notification-${id}`);

  if (savedValue !== null) {
    toggle.checked = savedValue === "true";
  }

  // 💎 ON / OFFが変わったら保存
  toggle.addEventListener("change", () => {
    localStorage.setItem(
      `treasure-notification-${id}`,
      toggle.checked
    );
  });
});
// ========================================
// 💎 EVENT REMINDER
// ========================================

function checkEventReminder() {
  const enabled =
    localStorage.getItem(
      "treasure-notification-event-notification"
    ) === "true";

  if (!enabled) return;

  const events = JSON.parse(
    localStorage.getItem("treasure-plan-events") || "[]"
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  events.forEach((event) => {
    const eventDate = new Date(event.date + "T00:00:00");

    const diff = Math.round(
      (eventDate - today) / (1000 * 60 * 60 * 24)
    );

if (diff === 1) {

  // 今日このイベントを通知済みか確認
  const reminderKey =
    `treasure-event-reminder-${event.date}`;

  const lastReminder =
    localStorage.getItem(reminderKey);

  const todayKey =
    today.toISOString().split("T")[0];

  // 今日まだ通知していない場合だけ表示
  if (lastReminder !== todayKey) {

    alert(
      `💎 明日は ${event.name}！\n📍 ${event.place}\n楽しんできてね✨`
    );

    // 今日通知したことを保存
    localStorage.setItem(
      reminderKey,
      todayKey
    );
  }
}
  });
}

checkEventReminder();
// ========================================
// 📅 TREASURE DAY REMINDER
// ========================================

function checkTreasureDayReminder() {

  const enabled =
    localStorage.getItem(
      "treasure-notification-treasure-day-notification"
    ) === "true";

  if (!enabled) return;

  const treasureDay =
    localStorage.getItem("treasure-day-date");

  if (!treasureDay) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayKey =
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0");

  // TREASURE DAY当日だけ
  if (todayKey === treasureDay) {

    const reminderKey =
      `treasure-day-reminder-${treasureDay}`;

    const alreadyShown =
      localStorage.getItem(reminderKey);

    // 今日まだ表示してなければ通知
    if (alreadyShown !== todayKey) {

      alert(
        "💎 TODAY IS TREASURE DAY 💎\n今日は待ちに待った日！楽しんできてね🩵✨"
      );

      localStorage.setItem(
        reminderKey,
        todayKey
      );
    }
  }
}

checkTreasureDayReminder();
// ========================================
// 📸 MEMORY REMINDER
// ========================================

function checkMemoryReminder() {

  const enabled =
    localStorage.getItem(
      "treasure-notification-memory-notification"
    ) === "true";

  if (!enabled) return;

  const treasureDay =
    localStorage.getItem("treasure-day-date");

  if (!treasureDay) return;

  const now = new Date();

  const todayKey =
    now.getFullYear() +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0");

  // TREASURE DAY当日だけ
  if (todayKey === treasureDay && now.getHours() >= 18) {

    const reminderKey =
      `treasure-memory-reminder-${treasureDay}`;

    const alreadyShown =
      localStorage.getItem(reminderKey);

    // 今日まだ表示していなければ1回だけ
    if (alreadyShown !== todayKey) {

      alert(
        "📸 今日の思い出、MEMORYに残した？💎\n最高だった瞬間を忘れないうちに残しておこ🩵"
      );

      localStorage.setItem(
        reminderKey,
        todayKey
      );
    }
  }
}

checkMemoryReminder();
// ========================================
// 🎤 EVENT MEMORY / 💎 TREASURE DIARY 切替
// ========================================

const eventMemoryTab =
  document.getElementById("event-memory-tab");

const treasureDiaryTab =
  document.getElementById("treasure-diary-tab");

const photoMemoryTab =
  document.getElementById("photo-memory-tab");

const eventMemoryArea =
  document.getElementById("event-memory-area");

const treasureDiaryArea =
  document.getElementById("treasure-diary-area");

const photoMemoryArea =
  document.getElementById("photo-memory-area");


function switchMemoryMode(mode) {

  if (
    !eventMemoryTab ||
    !treasureDiaryTab ||
    !photoMemoryTab ||
    !eventMemoryArea ||
    !treasureDiaryArea ||
    !photoMemoryArea
  ) {
    return;
  }

  const isEvent = mode === "event";
  const isDiary = mode === "diary";
  const isPhoto = mode === "photo";

  eventMemoryTab.classList.toggle("active", isEvent);
  treasureDiaryTab.classList.toggle("active", isDiary);
  photoMemoryTab.classList.toggle("active", isPhoto);

  eventMemoryArea.classList.toggle("active", isEvent);
  treasureDiaryArea.classList.toggle("active", isDiary);
  photoMemoryArea.classList.toggle("active", isPhoto);

  // PHOTO MEMORYには今style="display:none;"があるのでここで切替
  photoMemoryArea.style.display =
    isPhoto ? "block" : "none";

  localStorage.setItem(
    "treasure-memory-mode",
    mode
  );
}


if (
  eventMemoryTab &&
  treasureDiaryTab &&
  photoMemoryTab
) {

  eventMemoryTab.addEventListener("click", () => {
    switchMemoryMode("event");
  });

  treasureDiaryTab.addEventListener("click", () => {
    switchMemoryMode("diary");
  });

  photoMemoryTab.addEventListener("click", () => {
    switchMemoryMode("photo");
  });

  const savedMemoryMode =
    localStorage.getItem("treasure-memory-mode");

  switchMemoryMode(savedMemoryMode || "event");
}
// ========================================
// 💎 TREASURE DIARY
// ========================================

const diaryText = document.getElementById("diary-text");
const saveDiaryBtn = document.getElementById("save-diary");
const diaryList = document.getElementById("diary-list");
const diaryFilterAllBtn =
  document.getElementById("diary-filter-all");

const diaryFilterFavoritesBtn =
  document.getElementById("diary-filter-favorites");
let diaryPosts = [];

try {
  diaryPosts =
    JSON.parse(
      localStorage.getItem("treasure-diary") || "[]"
    );
} catch (e) {
  diaryPosts = [];
}

let diaryFilter = "all";
if (diaryFilterAllBtn) {
  diaryFilterAllBtn.addEventListener("click", () => {
    diaryFilter = "all";

    diaryFilterAllBtn.classList.add("active");
    diaryFilterFavoritesBtn?.classList.remove("active");

    renderDiaryPosts();
  });
}

if (diaryFilterFavoritesBtn) {
  diaryFilterFavoritesBtn.addEventListener("click", () => {
    diaryFilter = "favorites";

    diaryFilterFavoritesBtn.classList.add("active");
    diaryFilterAllBtn?.classList.remove("active");

    renderDiaryPosts();
  });
}
function renderDiaryPosts() {

  if (!diaryList) return;

  diaryList.innerHTML = "";

  const postsToShow =
  diaryFilter === "favorites"
    ? diaryPosts.filter(post => post.favorite)
    : diaryPosts;

postsToShow.forEach((post) => {

  const index = diaryPosts.indexOf(post);

    const card = document.createElement("div");
    card.className = "diary-post";

    const date = document.createElement("div");
    date.className = "diary-post-date";
    date.textContent = post.date;

    const text = document.createElement("p");
    text.className = "diary-post-text";
    text.textContent = post.text;

    const actions = document.createElement("div");
    actions.className = "diary-post-actions";
const favoriteBtn = document.createElement("button");
favoriteBtn.type = "button";
favoriteBtn.className = "diary-favorite-btn";

favoriteBtn.textContent =
  post.favorite ? "♥" : "♡";

favoriteBtn.addEventListener("click", () => {

  post.favorite = !post.favorite;

  localStorage.setItem(
    "treasure-diary",
    JSON.stringify(diaryPosts)
  );

  renderDiaryPosts();
});
    const editBtn = document.createElement("button");
editBtn.type = "button";
editBtn.className = "diary-edit-btn";
editBtn.textContent = "編集";

editBtn.addEventListener("click", () => {

  const newText = prompt(
    "DIARYを編集💎",
    post.text
  );

  if (newText === null) return;

  const trimmedText = newText.trim();

  if (!trimmedText) return;

  post.text = trimmedText;

  localStorage.setItem(
    "treasure-diary",
    JSON.stringify(diaryPosts)
  );

  renderDiaryPosts();
});
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "削除";

    deleteBtn.addEventListener("click", () => {

      diaryPosts.splice(index, 1);

      localStorage.setItem(
        "treasure-diary",
        JSON.stringify(diaryPosts)
      );

      renderDiaryPosts();
    });
actions.appendChild(favoriteBtn);
actions.appendChild(editBtn);
actions.appendChild(deleteBtn);

    card.appendChild(date);
    card.appendChild(text);
    card.appendChild(actions);

    diaryList.appendChild(card);
  });
}


if (saveDiaryBtn && diaryText) {

  saveDiaryBtn.addEventListener("click", () => {

    const text = diaryText.value.trim();

    if (!text) return;

    const now = new Date();

    const dateText =
      now.getFullYear() +
      "." +
      String(now.getMonth() + 1).padStart(2, "0") +
      "." +
      String(now.getDate()).padStart(2, "0") +
      " " +
      String(now.getHours()).padStart(2, "0") +
      ":" +
      String(now.getMinutes()).padStart(2, "0");

    diaryPosts.unshift({
      text: text,
      date: dateText
    });

    localStorage.setItem(
      "treasure-diary",
      JSON.stringify(diaryPosts)
    );

    diaryText.value = "";

    renderDiaryPosts();
  });
}


renderDiaryPosts();
// ========================================
// 🎤 EVENT MEMORY LIST
// ========================================

const eventMemoryList =
  document.getElementById("event-memory-list");

function renderEventMemoryList() {

  if (!eventMemoryList) return;

  let planEvents = [];

  try {
    planEvents =
      JSON.parse(
        localStorage.getItem("treasure-plan-events") || "[]"
      );
  } catch (e) {
    planEvents = [];
  }

  eventMemoryList.innerHTML = "";

  if (planEvents.length === 0) {
    eventMemoryList.innerHTML =
      '<p class="event-memory-empty">まだイベントがないよ💎</p>';

    return;
  }

  const sortedEvents = [...planEvents].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  sortedEvents.forEach((event) => {

    const card = document.createElement("button");
    card.type = "button";
    card.className = "event-memory-card";

    const date = document.createElement("div");
    date.className = "event-memory-date";
    date.textContent =
      (event.date || "").replaceAll("-", ".");

    const name = document.createElement("div");
    name.className = "event-memory-name";
    name.textContent =
      event.name || "TREASURE EVENT 💎";

    const place = document.createElement("div");
    place.className = "event-memory-place";
    place.textContent =
      event.place ? `📍 ${event.place}` : "";

    const arrow = document.createElement("div");
    arrow.className = "event-memory-arrow";
    arrow.textContent = "MEMORYを書く →";

    card.appendChild(date);
    card.appendChild(name);
    card.appendChild(place);
    card.appendChild(arrow);
card.addEventListener("click", async () => {

  currentEventMemory = event;
const eventMemoryData = JSON.parse(
  localStorage.getItem("treasure-event-memories") || "{}"
);

const eventKey =
  `${event.date}_${event.name}_${event.place}`;

const savedMemory =
  eventMemoryData[eventKey] || {};
  const viewPhotos = await loadEventPhotos(eventKey);

const hasSavedMemory =
  !!savedMemory.visual ||
  !!savedMemory.stage ||
  !!savedMemory.moment ||
  !!savedMemory.thoughts ||
  viewPhotos.length > 0;

if (hasSavedMemory && eventMemoryViewPage) {

  eventMemoryViewDate.textContent =
    (event.date || "").replaceAll("-", ".");

  eventMemoryViewName.textContent =
    event.name || "TREASURE EVENT 💎";

  eventMemoryViewPlace.textContent =
    event.place ? `📍 ${event.place}` : "";

  eventMemoryViewVisual.textContent =
    savedMemory.visual || "";

  eventMemoryViewStage.textContent =
    savedMemory.stage || "";

  eventMemoryViewMoment.textContent =
    savedMemory.moment || "";

  eventMemoryViewThoughts.textContent =
    savedMemory.thoughts || "";

  eventMemoryViewPhotos.innerHTML = "";

  viewPhotos.forEach((photoSrc) => {
    const img = document.createElement("img");
    img.src = photoSrc;
    img.alt = "EVENT MEMORY";
    eventMemoryViewPhotos.appendChild(img);
  });

  const memoryPage =
    document.getElementById("memory-page");

  if (memoryPage) {
    memoryPage.style.display = "none";
  }

  eventMemoryDetailPage.style.display = "none";
  eventMemoryViewPage.style.display = "block";

  window.scrollTo(0, 0);

  return;
}
if (eventMemoryPhotoPreview) {
  eventMemoryPhotoPreview.innerHTML = "";

  const savedPhotos = await loadEventPhotos(eventKey);

savedPhotos.forEach((photoSrc) => {
  const photoItem = document.createElement("div");
  photoItem.className = "event-memory-photo-item";

  const img = document.createElement("img");
  img.src = photoSrc;
  img.alt = "EVENT MEMORY";

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "event-memory-photo-delete";
  deleteBtn.textContent = "×";

  deleteBtn.addEventListener("click", () => {
    photoItem.remove();
  });

  photoItem.appendChild(img);
  photoItem.appendChild(deleteBtn);

  eventMemoryPhotoPreview.appendChild(photoItem);
});  
}
if (eventMemoryVisual) {
  eventMemoryVisual.value =
    savedMemory.visual || "";
}

if (eventMemoryStage) {
  eventMemoryStage.value =
    savedMemory.stage || "";
}

if (eventMemoryMoment) {
  eventMemoryMoment.value =
    savedMemory.moment || "";
}

if (eventMemoryThoughts) {
  eventMemoryThoughts.value =
    savedMemory.thoughts || "";
}
  if (eventMemoryDetailDate) {
    eventMemoryDetailDate.textContent =
      (event.date || "").replaceAll("-", ".");
  }

  if (eventMemoryDetailName) {
    eventMemoryDetailName.textContent =
      event.name || "TREASURE EVENT 💎";
  }

  if (eventMemoryDetailPlace) {
    eventMemoryDetailPlace.textContent =
      event.place ? `📍 ${event.place}` : "";
  }

  const memoryPage =
    document.getElementById("memory-page");

  if (memoryPage) {
    memoryPage.style.display = "none";
  }

  if (eventMemoryDetailPage) {
    eventMemoryDetailPage.style.display = "block";
  }

  window.scrollTo(0, 0);
});
    eventMemoryList.appendChild(card);
  });
}

renderEventMemoryList();
// ========================================
// 🎤 EVENT MEMORY DETAIL OPEN
// ========================================

const eventMemoryDetailPage =
  document.getElementById("event-memory-detail-page");

const eventMemoryDetailDate =
  document.getElementById("event-memory-detail-date");

const eventMemoryDetailName =
  document.getElementById("event-memory-detail-name");

const eventMemoryDetailPlace =
  document.getElementById("event-memory-detail-place");

const backToEventMemoryBtn =
  document.getElementById("back-to-event-memory-btn");
// ===============================
// 💎 EVENT MEMORY VIEW PAGE
// ===============================

const eventMemoryViewPage =
  document.getElementById("event-memory-view-page");

const eventMemoryViewDate =
  document.getElementById("event-memory-view-date");

const eventMemoryViewName =
  document.getElementById("event-memory-view-name");

const eventMemoryViewPlace =
  document.getElementById("event-memory-view-place");

const eventMemoryViewPhotos =
  document.getElementById("event-memory-view-photos");

const eventMemoryViewVisual =
  document.getElementById("event-memory-view-visual");

const eventMemoryViewStage =
  document.getElementById("event-memory-view-stage");

const eventMemoryViewMoment =
  document.getElementById("event-memory-view-moment");

const eventMemoryViewThoughts =
  document.getElementById("event-memory-view-thoughts");

const editEventMemoryBtn =
  document.getElementById("edit-event-memory-btn");

const backFromEventMemoryViewBtn =
  document.getElementById("back-from-event-memory-view-btn");
if (backFromEventMemoryViewBtn) {
  backFromEventMemoryViewBtn.addEventListener("click", () => {
    if (eventMemoryViewPage) {
      eventMemoryViewPage.style.display = "none";
    }

    const memoryPage =
      document.getElementById("memory-page");

    if (memoryPage) {
      memoryPage.style.display = "block";
    }

    window.scrollTo(0, 0);
  });
}
if (editEventMemoryBtn) {
  editEventMemoryBtn.addEventListener("click", async () => {
    if (!currentEventMemory) return;

    const event = currentEventMemory;

    const eventKey =
      `${event.date}_${event.name}_${event.place}`;

    const eventMemoryData = JSON.parse(
      localStorage.getItem("treasure-event-memories") || "{}"
    );

    const savedMemory =
      eventMemoryData[eventKey] || {};

    if (eventMemoryVisual) {
      eventMemoryVisual.value = savedMemory.visual || "";
    }

    if (eventMemoryStage) {
      eventMemoryStage.value = savedMemory.stage || "";
    }

    if (eventMemoryMoment) {
      eventMemoryMoment.value = savedMemory.moment || "";
    }

    if (eventMemoryThoughts) {
      eventMemoryThoughts.value = savedMemory.thoughts || "";
    }

    if (eventMemoryPhotoPreview) {
      eventMemoryPhotoPreview.innerHTML = "";

      const savedPhotos =
        await loadEventPhotos(eventKey);

      savedPhotos.forEach((photoSrc) => {
        const photoItem = document.createElement("div");
        photoItem.className = "event-memory-photo-item";

        const img = document.createElement("img");
        img.src = photoSrc;
        img.alt = "EVENT MEMORY";

        photoItem.appendChild(img);
        eventMemoryPhotoPreview.appendChild(photoItem);
      });
    }

    if (eventMemoryViewPage) {
      eventMemoryViewPage.style.display = "none";
    }

    if (eventMemoryDetailPage) {
      eventMemoryDetailPage.style.display = "block";
    }

    window.scrollTo(0, 0);
  });
}
let currentEventMemory = null;
// EVENT MEMORY 入力欄
const eventMemoryVisual =
  document.getElementById("event-memory-visual");

const eventMemoryStage =
  document.getElementById("event-memory-stage");

const eventMemoryMoment =
  document.getElementById("event-memory-moment");

const eventMemoryThoughts =
  document.getElementById("event-memory-thoughts");
const eventMemoryPhoto =
  document.getElementById("event-memory-photo");

const eventMemoryPhotoPreview =
  document.getElementById("event-memory-photo-preview");
if (eventMemoryPhoto && eventMemoryPhotoPreview) {
  eventMemoryPhoto.addEventListener("change", () => {
    eventMemoryPhotoPreview.innerHTML = "";

    const files = Array.from(eventMemoryPhoto.files);

    files.forEach((file) => {
      const reader = new FileReader();

     reader.onload = (e) => {
  const photoItem = document.createElement("div");
  photoItem.className = "event-memory-photo-item";

  const img = document.createElement("img");
  img.src = e.target.result;
  img.alt = "EVENT MEMORY";

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "event-memory-photo-delete";
  deleteBtn.textContent = "×";

  deleteBtn.addEventListener("click", () => {
    photoItem.remove();
  });

  photoItem.appendChild(img);
  photoItem.appendChild(deleteBtn);

  eventMemoryPhotoPreview.appendChild(photoItem);
};
      reader.readAsDataURL(file);
    });
  });
}
const saveEventMemoryBtn =
  document.getElementById("save-event-memory-btn");
if (backToEventMemoryBtn) {
  backToEventMemoryBtn.addEventListener("click", () => {

    if (eventMemoryDetailPage) {
      eventMemoryDetailPage.style.display = "none";
    }

    const memoryPage =
      document.getElementById("memory-page");

    if (memoryPage) {
      memoryPage.style.display = "block";
    }

    window.scrollTo(0, 0);
  });
}
// ========================================
// 💎 EVENT MEMORY SAVE
// ========================================

if (saveEventMemoryBtn) {
saveEventMemoryBtn.addEventListener("click", async () => {
const eventMemoryPhotos = Array.from(
  eventMemoryPhotoPreview.querySelectorAll("img")
).map(img => img.src);
    if (!currentEventMemory) return;

    const eventMemoryData = JSON.parse(
      localStorage.getItem("treasure-event-memories") || "{}"
    );

    const eventKey =
      `${currentEventMemory.date}_${currentEventMemory.name}_${currentEventMemory.place}`;

    eventMemoryData[eventKey] = {
      visual: eventMemoryVisual ? eventMemoryVisual.value : "",
      stage: eventMemoryStage ? eventMemoryStage.value : "",
      moment: eventMemoryMoment ? eventMemoryMoment.value : "",
thoughts: eventMemoryThoughts ? eventMemoryThoughts.value : ""
    };

    localStorage.setItem(
      "treasure-event-memories",
      JSON.stringify(eventMemoryData)
    );
await saveEventPhotos(eventKey, eventMemoryPhotos);
    saveEventMemoryBtn.textContent = "保存しました ✓ 💎";
const savedToast = document.getElementById("event-memory-saved-toast");

if (savedToast) {
  savedToast.classList.add("show");

  setTimeout(() => {
    savedToast.classList.remove("show");
  }, 1800);
}
    setTimeout(() => {
      saveEventMemoryBtn.textContent = "保存する 💎";
    }, 1500);
  });
}
// ========================================
// 📸 EVENT MEMORY PHOTO DATABASE
// ========================================

const eventPhotoDBName = "treasure-event-photo-db";
const eventPhotoStoreName = "event-photos";

function openEventPhotoDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(eventPhotoDBName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(eventPhotoStoreName)) {
        db.createObjectStore(eventPhotoStoreName);
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}
// 📸 写真を保存
async function saveEventPhotos(eventKey, photos) {
  const db = await openEventPhotoDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      eventPhotoStoreName,
      "readwrite"
    );

    const store = transaction.objectStore(eventPhotoStoreName);

    const request = store.put(photos, eventKey);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
// 📸 保存した写真を読み出す
async function loadEventPhotos(eventKey) {
  const db = await openEventPhotoDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      eventPhotoStoreName,
      "readonly"
    );

    const store = transaction.objectStore(eventPhotoStoreName);

    const request = store.get(eventKey);

    request.onsuccess = () => {
      resolve(request.result || []);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}
