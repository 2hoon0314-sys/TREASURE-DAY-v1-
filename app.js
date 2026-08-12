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
    sortedEvents.forEach((event) => {
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
