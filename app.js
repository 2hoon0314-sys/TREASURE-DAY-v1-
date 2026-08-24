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
// ========================================
// 📱 下タブ移動時：MEMBER系画面を全部閉じる
// ========================================

const openMemberBook =
  document.getElementById("member-book-detail");

if (openMemberBook) {
  openMemberBook.classList.remove("active");
}

const openJihoonBook =
  document.getElementById("jihoon-book-detail");

if (openJihoonBook) {
  openJihoonBook.classList.remove("active");
}

const openJihoonMemories =
  document.getElementById("jihoonMemoriesPage");

if (openJihoonMemories) {
  openJihoonMemories.style.display = "none";
}

const openJihoonChemistry =
  document.getElementById("jihoonChemistryPage");

if (openJihoonChemistry) {
  openJihoonChemistry.style.display = "none";
}
const openPhotoMemoryDetail =
  document.getElementById(
    "photo-memory-detail-page"
  );

if (openPhotoMemoryDetail) {
  openPhotoMemoryDetail.style.display =
    "none";
}
document.body.style.overflow = "";
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

    // 📷 JIHOON MEMORIESを閉じる
    const jihoonMemoriesPage =
      document.getElementById("jihoonMemoriesPage");

    if (jihoonMemoriesPage) {
      jihoonMemoriesPage.style.display = "none";
    }

    // 🐶 JIHOON BOOKを閉じる
    const jihoonBookDetail =
      document.getElementById("jihoon-book-detail");

    if (jihoonBookDetail) {
      jihoonBookDetail.classList.remove("active");
    }

    // 💎 MEMBER BOOK詳細も閉じる
    const memberBookDetail =
      document.getElementById("member-book-detail");

    if (memberBookDetail) {
      memberBookDetail.classList.remove("active");
    }

    document.body.style.overflow = "";

    showPage("memory");
    window.scrollTo(0, 0);
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
const memorySong =
  document.getElementById("memory-song");
const memoryLink =
  document.getElementById("memory-link");
const memoryMember =
  document.getElementById("memory-member");

const memoryTagsInput =
  document.getElementById("memory-tags");
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
// ========================================
// 🐶 OLD PHOTO MEMORY MEMBER MIGRATION
// 既存データ救済
// ========================================

let jihoonMemoryMigrationChanged = false;

memories.forEach((memory) => {

  // すでにMEMBER指定済みなら触らない
  if (memory.member) return;

  const tags =
    Array.isArray(memory.tags)
      ? memory.tags
      : [];

  const normalizedTags =
    tags.map((tag) =>
      String(tag)
        .replace(/^#/, "")
        .trim()
        .toUpperCase()
    );

  // 既存タグにJIHOON / ジフンがあれば自動認定
  if (
    normalizedTags.includes("JIHOON") ||
    tags.some((tag) =>
      String(tag)
        .replace(/^#/, "")
        .trim() === "ジフン"
    )
  ) {
    memory.member = "JIHOON";
    jihoonMemoryMigrationChanged = true;
  }
});

if (jihoonMemoryMigrationChanged) {
  localStorage.setItem(
    "treasure-memories",
    JSON.stringify(memories)
  );
}
// ========================================
// 📸 PHOTO MEMORY DETAIL
// ========================================

let currentPhotoMemoryIndex = null;

async function openPhotoMemoryDetail(index) {
  const memory = memories[index];
  if (!memory) return;

  currentPhotoMemoryIndex = index;

  const detailPage =
    document.getElementById("photo-memory-detail-page");

  const detailImage =
    document.getElementById("photo-memory-detail-image");

  const detailTitle =
    document.getElementById("photo-memory-detail-title");

  const detailText =
    document.getElementById("photo-memory-detail-text");

  const memoryPage =
    document.getElementById("memory-page");

  // タイトル
  if (detailTitle) {
    detailTitle.textContent =
      memory.title || "PHOTO MEMORY 💎";
  }

  // キャプション
  if (detailText) {
    detailText.textContent =
      memory.text || "";
  }
  // 🎧 MEMORY SONG表示
const songCard =
  document.getElementById("photo-memory-song-card");

const songTitle =
  document.getElementById("photo-memory-song-title");

if (songCard && songTitle) {
  if (memory.song) {
    songTitle.textContent = memory.song;
    songCard.style.display = "block";
  } else {
    songTitle.textContent = "";
    songCard.style.display = "none";
  }
}
  // 🔗 RELATED LINK表示
const linkCard =
  document.getElementById("photo-memory-link-card");

const linkAnchor =
  document.getElementById("photo-memory-link-anchor");

if (linkCard && linkAnchor) {
  if (memory.link) {
    let url = memory.link.trim();

    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }

    linkAnchor.href = url;
    linkAnchor.textContent = "🔗 LINKを開く";
    linkCard.style.display = "block";
  } else {
    linkAnchor.removeAttribute("href");
    linkCard.style.display = "none";
  }
}
// 🏷️ ハッシュタグ表示
if (photoMemoryTags) {
  photoMemoryTags.innerHTML = "";

  const tags = memory.tags || [];

  tags.forEach((tag) => {
    const tagButton = document.createElement("button");

    tagButton.type = "button";
    tagButton.className = "photo-memory-tag";
    tagButton.textContent = `#${tag}`;
    tagButton.addEventListener("click", () => {
  activePhotoMemoryTag = tag;

  // 詳細ページを閉じる
  const detailPage =
    document.getElementById("photo-memory-detail-page");

  if (detailPage) {
    detailPage.style.display = "none";
  }

  // MEMORYページを表示
  const memoryPage =
    document.getElementById("memory-page");

  if (memoryPage) {
    memoryPage.style.display = "block";
  }

  // PHOTO MEMORYモードへ
  switchMemoryMode("photo");




  window.scrollTo(0, 0);
});
tagButton.addEventListener("click", async () => {
  activePhotoMemoryTag = tag;

  const detailPage =
    document.getElementById("photo-memory-detail-page");

  const memoryPage =
    document.getElementById("memory-page");

  if (detailPage) {
    detailPage.style.display = "none";
  }

  if (memoryPage) {
    memoryPage.style.display = "block";
  }

  switchMemoryMode("photo");
  await renderMemories();

  window.scrollTo(0, 0);
});
    photoMemoryTags.appendChild(tagButton);
  });
}
  // 写真
  if (detailImage) {
    let photoSrc = "";

    if (memory.photoKey) {
      photoSrc =
        await loadPhotoMemoryImage(memory.photoKey);
    } else if (memory.photo) {
      photoSrc = memory.photo;
    }

    detailImage.src = photoSrc;
    detailImage.style.display =
      photoSrc ? "block" : "none";
  }

  // MEMORY一覧を隠す
  if (memoryPage) {
    memoryPage.style.display = "none";
  }

  // 詳細ページ表示
  if (detailPage) {
    detailPage.style.display = "block";
  }
renderPhotoMemoryComments();
  window.scrollTo(0, 0);
}
let photoMemoryReturnTarget = "photo";

// ← PHOTO MEMORY DETAILから戻る
const photoMemoryDetailBackBtn =
  document.getElementById(
    "photo-memory-detail-back"
  );

if (photoMemoryDetailBackBtn) {

  photoMemoryDetailBackBtn.addEventListener(
    "click",
    async () => {

      const detailPage =
        document.getElementById(
          "photo-memory-detail-page"
        );

      const memoryPage =
        document.getElementById(
          "memory-page"
        );


if (
  photoMemoryReturnTarget ===
  "jihoon"
) {

  // 🏠 HOME側を正式に復活
  showPage("home");

  // 💎 MEMBER BOOKを復活
  const memberBookDetail =
    document.getElementById(
      "member-book-detail"
    );

  if (memberBookDetail) {
    memberBookDetail.classList.add(
      "active"
    );
  }

  // 🐶 JIHOON BOOKを復活
  const jihoonBookDetail =
    document.getElementById(
      "jihoon-book-detail"
    );

  if (jihoonBookDetail) {
    jihoonBookDetail.classList.add(
      "active"
    );
  }

  // 📷 JIHOON MEMORIESを復活
  if (jihoonMemoriesPage) {
    jihoonMemoriesPage.style.display =
      "block";

    jihoonMemoriesPage.scrollTop = 0;

    await renderJihoonMemories();
  }

  document.body.style.overflow =
    "hidden";

} else if (
  photoMemoryReturnTarget ===
  "hyunsuk"
) {

  showPage("home");

  const memberBookDetail =
    document.getElementById(
      "member-book-detail"
    );

  if (memberBookDetail) {
    memberBookDetail.classList.add(
      "active"
    );
  }

  if (hyunsukBookDetail) {
    hyunsukBookDetail.classList.add(
      "active"
    );
  }

  if (hyunsukMemoriesPage) {

    hyunsukMemoriesPage.style.display =
      "block";

    hyunsukMemoriesPage.scrollTop = 0;

    await renderHyunsukMemories();
  }

  document.body.style.overflow =
    "hidden";
} else if (
  photoMemoryReturnTarget ===
  "yoshi"
) {

  showPage("home");

  const memberBookDetail =
    document.getElementById(
      "member-book-detail"
    );

  if (memberBookDetail) {
    memberBookDetail.classList.add(
      "active"
    );
  }

  if (yoshiBookDetail) {
    yoshiBookDetail.classList.add(
      "active"
    );
  }

  if (yoshiMemoriesPage) {

    yoshiMemoriesPage.style.display =
      "block";

    yoshiMemoriesPage.scrollTop =
      0;

    await yoshiMemoriesSystem
      .renderMemories();
  }

  document.body.style.overflow =
    "hidden";

} else {
        // 通常PHOTO MEMORYから来た場合
        if (memoryPage) {
          memoryPage.style.display =
            "block";
        }

        switchMemoryMode("photo");

        document.body.style.overflow =
          "";
      }


      photoMemoryReturnTarget =
        "photo";

      window.scrollTo(0, 0);
    }
  );
}
const photoMemoryTags =
  document.getElementById("photo-memory-tags");
// ✏️ PHOTO MEMORY 詳細ページから編集
const photoMemoryDetailEdit =
  document.getElementById("photo-memory-detail-edit");

if (photoMemoryDetailEdit) {
  photoMemoryDetailEdit.addEventListener("click", () => {
    if (currentPhotoMemoryIndex === null) return;

    const memory = memories[currentPhotoMemoryIndex];
    if (!memory) return;

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
const newSong = prompt(
  "MEMORY SONGを編集\n※空欄で削除",
  memory.song || ""
);

if (newSong === null) return;

const newLink = prompt(
  "RELATED LINKを編集\n※空欄で削除",
  memory.link || ""
);

if (newLink === null) return;
    const newTags = prompt(
  "ハッシュタグを編集（スペース区切り）",
  (memory.tags || []).join(" ")
);

if (newTags === null) return;
const newMember = prompt(
  "MEMBERを編集\n" +
  "HYUNSUK / JIHOON / YOSHI / JUNKYU / JAEHYUK / ASAHI / DOYOUNG / HARUTO / JEONGWOO / JUNGHWAN\n" +
  "※空欄でMEMBER指定なし",
  memory.member || ""
);

if (newMember === null) return;

const normalizedMember =
  newMember
    .trim()
    .toUpperCase();

const validMembers = [
  "",
  "HYUNSUK",
  "JIHOON",
  "YOSHI",
  "JUNKYU",
  "JAEHYUK",
  "ASAHI",
  "DOYOUNG",
  "HARUTO",
  "JEONGWOO",
  "JUNGHWAN"
];

if (!validMembers.includes(normalizedMember)) {
  alert("MEMBER名を確認してね💎");
  return;
}

memory.member = normalizedMember;
memory.tags = newTags
  .trim()
  .split(/\s+/)
  .filter(Boolean)
  .map(tag => tag.replace(/^#/, ""));
    memory.title =
      newTitle.trim() || "PHOTO MEMORY 💎";

    memory.text = newText.trim();
memory.song = newSong.trim();
memory.link = newLink.trim();
    localStorage.setItem(
      "treasure-memories",
      JSON.stringify(memories)
    );

    renderMemories();
    openPhotoMemoryDetail(currentPhotoMemoryIndex);
  });
}
// 🗑️ PHOTO MEMORY 詳細ページから削除
const photoMemoryDetailDelete =
  document.getElementById("photo-memory-detail-delete");

if (photoMemoryDetailDelete) {
  photoMemoryDetailDelete.addEventListener("click", async () => {
    if (currentPhotoMemoryIndex === null) return;

    const memory = memories[currentPhotoMemoryIndex];
    if (!memory) return;

    const ok = confirm(
      "このPHOTO MEMORYを削除しますか？📸"
    );

    if (!ok) return;

    // IndexedDBに保存した写真も削除
    if (memory.photoKey) {
      try {
        const db = await openPhotoMemoryDB();

        await new Promise((resolve, reject) => {
          const transaction = db.transaction(
            photoMemoryStoreName,
            "readwrite"
          );

          const store =
            transaction.objectStore(photoMemoryStoreName);

          const request = store.delete(memory.photoKey);

          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        });
      } catch (e) {
        console.log("写真削除エラー", e);
      }
    }

    // MEMORY本体を削除
    memories.splice(currentPhotoMemoryIndex, 1);

    localStorage.setItem(
      "treasure-memories",
      JSON.stringify(memories)
    );

    currentPhotoMemoryIndex = null;

    renderMemories();

    // 詳細ページを閉じる
    const detailPage =
      document.getElementById("photo-memory-detail-page");

    const memoryPage =
      document.getElementById("memory-page");

    if (detailPage) {
      detailPage.style.display = "none";
    }

    if (memoryPage) {
      memoryPage.style.display = "block";
    }

    switchMemoryMode("photo");
    window.scrollTo(0, 0);
  });
}
// ⬆️ PHOTO MEMORY を前の写真の上へ
const photoMemoryDetailUp =
  document.getElementById("photo-memory-detail-up");

if (photoMemoryDetailUp) {
  photoMemoryDetailUp.addEventListener("click", () => {
    if (currentPhotoMemoryIndex === null) return;

    const index = currentPhotoMemoryIndex;

    // 今より上にある「写真付きMEMORY」を探す
    let prevPhotoIndex = -1;

    for (let i = index - 1; i >= 0; i--) {
      if (memories[i].photoKey || memories[i].photo) {
        prevPhotoIndex = i;
        break;
      }
    }

    // 上に写真がなければ何もしない
    if (prevPhotoIndex === -1) return;

    [memories[prevPhotoIndex], memories[index]] =
      [memories[index], memories[prevPhotoIndex]];

    currentPhotoMemoryIndex = prevPhotoIndex;

    localStorage.setItem(
      "treasure-memories",
      JSON.stringify(memories)
    );

    renderMemories();
    openPhotoMemoryDetail(currentPhotoMemoryIndex);
  });
}
// ⬇️ PHOTO MEMORY を次の写真の下へ
const photoMemoryDetailDown =
  document.getElementById("photo-memory-detail-down");

if (photoMemoryDetailDown) {
  photoMemoryDetailDown.addEventListener("click", () => {
    if (currentPhotoMemoryIndex === null) return;

    const index = currentPhotoMemoryIndex;

    // 今より下にある「写真付きMEMORY」を探す
    let nextPhotoIndex = -1;

    for (let i = index + 1; i < memories.length; i++) {
      if (memories[i].photoKey || memories[i].photo) {
        nextPhotoIndex = i;
        break;
      }
    }

    // 下に写真がなければ何もしない
    if (nextPhotoIndex === -1) return;

    [memories[index], memories[nextPhotoIndex]] =
      [memories[nextPhotoIndex], memories[index]];

    currentPhotoMemoryIndex = nextPhotoIndex;

    localStorage.setItem(
      "treasure-memories",
      JSON.stringify(memories)
    );

    renderMemories();
    openPhotoMemoryDetail(currentPhotoMemoryIndex);
  });
}
// ========================================
// 💬 PHOTO MEMORY 追記コメント
// ========================================

const photoMemoryCommentAdd =
  document.getElementById("photo-memory-comment-add");

const photoMemoryCommentsList =
  document.getElementById("photo-memory-comments-list");

function renderPhotoMemoryComments() {
  if (!photoMemoryCommentsList) return;

  photoMemoryCommentsList.innerHTML = "";

  if (currentPhotoMemoryIndex === null) return;

  const memory = memories[currentPhotoMemoryIndex];
  if (!memory) return;

  const comments = memory.comments || [];

  comments.forEach((comment, index) => {
    const item = document.createElement("div");
    item.className = "photo-memory-comment-item";

    const text = document.createElement("p");
    text.textContent = comment.text || "";

    const date = document.createElement("span");
    date.textContent = comment.date || "";

    item.appendChild(text);
    item.appendChild(date);
// ✏️ 感想を編集
const editCommentBtn = document.createElement("button");
editCommentBtn.type = "button";
 editCommentBtn.className = "photo-memory-comment-edit";   
editCommentBtn.textContent = "編集";

editCommentBtn.addEventListener("click", () => {
  const newText = prompt(
    "感想を編集💎",
    comment.text || ""
  );

  if (newText === null) return;

  const trimmedText = newText.trim();
  if (!trimmedText) return;

  memory.comments[index].text = trimmedText;

  localStorage.setItem(
    "treasure-memories",
    JSON.stringify(memories)
  );

  renderPhotoMemoryComments();
});


    // 🗑️ 感想を削除
const deleteCommentBtn = document.createElement("button");
deleteCommentBtn.type = "button";
deleteCommentBtn.className = "photo-memory-comment-delete";
deleteCommentBtn.textContent = "🗑️ 削除";

deleteCommentBtn.addEventListener("click", () => {
  const ok = confirm("この感想を削除する？💎");

  if (!ok) return;

  memory.comments.splice(index, 1);

  localStorage.setItem(
    "treasure-memories",
    JSON.stringify(memories)
  );

  renderPhotoMemoryComments();
});

// ✏️🗑️ 編集・削除ボタンをまとめる
const commentActions = document.createElement("div");
commentActions.className = "photo-memory-comment-actions";

commentActions.appendChild(editCommentBtn);
commentActions.appendChild(deleteCommentBtn);

item.appendChild(commentActions);
    photoMemoryCommentsList.appendChild(item);
  });
}

if (photoMemoryCommentAdd) {
  photoMemoryCommentAdd.addEventListener("click", () => {
    if (currentPhotoMemoryIndex === null) return;

    const memory = memories[currentPhotoMemoryIndex];
    if (!memory) return;

    const newComment = prompt(
      "この思い出に感想を追加💎"
    );

    if (!newComment || !newComment.trim()) return;

    if (!Array.isArray(memory.comments)) {
      memory.comments = [];
    }

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

    memory.comments.push({
      text: newComment.trim(),
      date: dateText
    });

    localStorage.setItem(
      "treasure-memories",
      JSON.stringify(memories)
    );

    renderPhotoMemoryComments();
  });
}
let activePhotoMemoryTag = null;
async function renderMemories() {
  if (!memoryList) return;

  memoryList.innerHTML = "";
  const photoMemoryFilter =
  document.getElementById("photo-memory-filter");

const photoMemoryFilterLabel =
  document.getElementById("photo-memory-filter-label");

const photoMemoryFilterClear =
  document.getElementById("photo-memory-filter-clear");

if (photoMemoryFilter && photoMemoryFilterLabel) {
  if (activePhotoMemoryTag) {
    photoMemoryFilter.style.display = "flex";
    photoMemoryFilterLabel.textContent =
      `🏷️ #${activePhotoMemoryTag} のMEMORY`;
  } else {
    photoMemoryFilter.style.display = "none";
    photoMemoryFilterLabel.textContent = "";
  }
}
const memoryEntries = memories
  .map((memory, index) => [index, memory])
  .filter(([index, memory]) => {
    if (!activePhotoMemoryTag) return true;

    const tags = memory.tags || [];
    return tags.includes(activePhotoMemoryTag);
  });
for (const [index, memory] of memoryEntries) {
    const card = document.createElement("div");
    card.className = "memory-card";
card.addEventListener("click", () => {
  openPhotoMemoryDetail(index);
});
    const title = document.createElement("h3");
    title.textContent =
      memory.title || "TREASURE MEMORY 💎";

    const text = document.createElement("p");
    text.textContent = memory.text || "";
// 📸 PHOTO MEMORY 写真
const photo = document.createElement("img");
photo.className = "memory-photo";

if (memory.photoKey) {
  photo.src =
    await loadPhotoMemoryImage(memory.photoKey);
} else if (memory.photo) {
  // 以前に保存した写真もそのまま表示
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
const newSong = prompt(
  "MEMORY SONGを編集\n※空欄で削除",
  memory.song || ""
);

if (newSong === null) return;

const newLink = prompt(
  "RELATED LINKを編集\n※空欄で削除",
  memory.link || ""
);

if (newLink === null) return;
      memory.title =
        newTitle.trim() || "TREASURE MEMORY 💎";

      memory.text = newText.trim();
memory.song = newSong.trim();
memory.link = newLink.trim();
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
if (memory.photoKey || memory.photo) {
  card.appendChild(photo);
}
    card.appendChild(actions);

    memoryList.appendChild(card);
 }
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
const photoMemoryFilterClearBtn =
  document.getElementById("photo-memory-filter-clear");

if (photoMemoryFilterClearBtn) {
  photoMemoryFilterClearBtn.addEventListener("click", async () => {
    activePhotoMemoryTag = null;
    await renderMemories();
    window.scrollTo(0, 0);
  });
}
// ========================================
// 📸 PHOTO MEMORY DATABASE
// ========================================

const photoMemoryDBName = "treasure-photo-memory-db";
const photoMemoryStoreName = "photo-memory-images";

function openPhotoMemoryDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(photoMemoryDBName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(photoMemoryStoreName)) {
        db.createObjectStore(photoMemoryStoreName);
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
// 📸 PHOTO MEMORY 写真を保存
async function savePhotoMemoryImage(photoKey, photoData) {
  const db = await openPhotoMemoryDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      photoMemoryStoreName,
      "readwrite"
    );

    const store =
      transaction.objectStore(photoMemoryStoreName);

    const request =
      store.put(photoData, photoKey);

    request.onsuccess = () => resolve();

    request.onerror = () =>
      reject(request.error);
  });
}


// 📸 PHOTO MEMORY 写真を読み込む
async function loadPhotoMemoryImage(photoKey) {
  if (!photoKey) return "";

  const db = await openPhotoMemoryDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      photoMemoryStoreName,
      "readonly"
    );

    const store =
      transaction.objectStore(photoMemoryStoreName);

    const request =
      store.get(photoKey);

    request.onsuccess = () => {
      resolve(request.result || "");
    };

    request.onerror = () =>
      reject(request.error);
  });
}
if (saveMemoryBtn) {

saveMemoryBtn.addEventListener("click", async () => {

    const title =
      memoryTitle ? memoryTitle.value.trim() : "";

    const text =
      memoryText ? memoryText.value.trim() : "";
const song =
  memorySong ? memorySong.value.trim() : "";
const link =
  memoryLink ? memoryLink.value.trim() : ""; 
  const member =
  memoryMember ? memoryMember.value : "";

const tags =
  memoryTagsInput
    ? memoryTagsInput.value
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((tag) =>
          tag.replace(/^#/, "")
        )
    : [];
  if (title === "" && text === "") {
      alert("思い出を書いてね💎");
      return;
    }
// 📸 PHOTO MEMORYの写真を準備
let photoKey = "";

if (
  memoryPhoto &&
  memoryPhoto.files &&
  memoryPhoto.files[0]
) {
  const photoData = await resizeMemoryPhoto(
    memoryPhoto.files[0]
  );

  photoKey =
    "photo-" +
    Date.now() +
    "-" +
    Math.random().toString(36).slice(2);

  await savePhotoMemoryImage(
    photoKey,
    photoData
  );
}


// 💎 MEMORY本体には写真ではなくキーだけ保存
memories.unshift({
  title:
    title ||
    "TREASURE MEMORY 💎",

  text: text,

  song: song,

  link: link,

  member: member,

  tags: tags,

  photoKey: photoKey
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
  if (memorySong) {
  memorySong.value = "";
}
if (memoryLink) {
  memoryLink.value = "";
}

if (memoryMember) {
  memoryMember.value = "";
}

if (memoryTagsInput) {
  memoryTagsInput.value = "";
}
if (memoryPhoto) {
  memoryPhoto.value = "";
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

// ======================================
// 🎲 TODAY'S TREASURE
// ======================================

const todayMembers = [
  "HYUNSUK",
  "JIHOON",
  "YOSHI",
  "JUNKYU",
  "JAEHYUK",
  "ASAHI",
  "DOYOUNG",
  "HARUTO",
  "JEONGWOO",
  "JUNGHWAN"
];
const todaySongs = [
  "BOY",
  "COME TO ME",
  "I LOVE YOU",
  "B.L.T (BLING LIKE THIS)",
  "MMM",
  "ORANGE",
  "MY TREASURE",
  "BE WITH ME",
  "SLOWMOTION",
  "GOING CRAZY",
  "BEAUTIFUL",
  "EVERYDAY",
  "JIKJIN",
  "U",
  "DARARI",
  "IT’S OKAY",
  "BFF (Best Friend Forever)",
  "Gonna Be Fine",
  "HELLO",
  "VolKno",
  "CLAP!",
  "THANK YOU",
  "HOLD IT IN",
  "DARARI (ROCK REMIX)",
  "Here I Stand",
  "BEAUTIFUL (Ballad Ver.)",
  "MOVE (T5)",
  "BONA BONA",
  "I WANT YOUR LOVE",
  "RUN",
  "G.O.A.T",
  "STUPID",
  "THE WAY TO",
  "WONDERLAND",
  "B.O.M.B",
  "LOVESICK",
  "B.O.M.B (KABOOM ver.)",
  "病 (YAMAI)",
  "LET IT BURN",
  "KING KONG",
  "REVERSE",
  "LAST NIGHT",
  "YELLOW",
  "SARURU",
  "WHATEVER, WHENEVER",
  "EVERYTHING",
  "PARADISE",
  "NOW FOREVER",
  "BETTER THAN ME",
  "IF I",
  "ZOOM ZOOM",
  "NALLY-NA (HYUNHAYO)",
  "DANGER"
];
// 今日の日付を YYYY-MM-DD で取得
function getTodayKey() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// 今日の公式メンバーを取得
function getTodayMember() {
  const today = getTodayKey();

  const savedDate =
    localStorage.getItem("treasure-today-date");

  const savedMember =
    localStorage.getItem("treasure-today-member");

  if (savedDate === today && savedMember) {
    return savedMember;
  }

  return "???";
}
function drawTodayMember() {
  const today = getTodayKey();

  const randomIndex =
    Math.floor(Math.random() * todayMembers.length);

  const selectedMember =
    todayMembers[randomIndex];

  localStorage.setItem(
    "treasure-today-date",
    today
  );

  localStorage.setItem(
    "treasure-today-member",
    selectedMember
  );

  return selectedMember;
}
function getTodaySong() {
  const today = getTodayKey();

  const savedDate =
    localStorage.getItem("treasure-today-song-date");

  const savedSong =
    localStorage.getItem("treasure-today-song");

  if (savedDate === today && savedSong) {
    return savedSong;
  }

  return "???";
}
function drawTodaySong() {
  const today = getTodayKey();

  const randomIndex =
    Math.floor(Math.random() * todaySongs.length);

  const selectedSong =
    todaySongs[randomIndex];

  localStorage.setItem(
    "treasure-today-song-date",
    today
  );

  localStorage.setItem(
    "treasure-today-song",
    selectedSong
  );

  return selectedSong;
}
 


function updateTodayTreasure() {
  const todayMemberElement =
    document.getElementById("home-today-member");

  const todaySongElement =
    document.getElementById("home-today-song");

  if (!todayMemberElement || !todaySongElement) return;

  const member = getTodayMember();
  const song = getTodaySong();

  todayMemberElement.textContent = member;
  todaySongElement.textContent = song;
}

updateTodayTreasure();
const homeTodayOpen =
  document.getElementById("home-today-open");

const todayDetail =
  document.getElementById("today-detail");

const todayClose =
  document.getElementById("today-close");

const todayDetailMember =
  document.getElementById("today-detail-member");

const todayDetailSong =
  document.getElementById("today-detail-song");

if (
  homeTodayOpen &&
  todayDetail &&
  todayClose &&
  todayDetailMember &&
  todayDetailSong
) {
homeTodayOpen.addEventListener("click", () => {
  const finalMember =
  getTodayMember() === "???" ? drawTodayMember() : getTodayMember();

const finalSong =
  getTodaySong() === "???" ? drawTodaySong() : getTodaySong();
updateTodayTreasure();
  todayDetail.classList.add("active");
  document.body.style.overflow = "hidden";

  todayDetailMember.textContent = "WHO'S TODAY...?";
  todayDetailSong.textContent = "🎲 SELECTING...";

  let shuffleCount = 0;

  const memberShuffle = setInterval(() => {
    const randomMember =
      todayMembers[Math.floor(Math.random() * todayMembers.length)];

    todayDetailMember.textContent = randomMember;

    shuffleCount++;

    if (shuffleCount >= 18) {
      clearInterval(memberShuffle);

      todayDetailMember.textContent = `✨ ${finalMember} ✨`;

      setTimeout(() => {
        todayDetailSong.textContent = `🎧 ${finalSong}`;
      }, 500);
    }
  }, 90);
});

  todayClose.addEventListener("click", () => {
    todayDetail.classList.remove("active");
    document.body.style.overflow = "";
  });
}
// =====================================
// 🎲 BONUS DRAW 🎁
// =====================================
const bonusMessages = [
  "今日もTREASUREと一緒にファイティン💎",
  "今日は好きなものをいっぱい見て過ごそ🩵",
  "推しは今日もあなたの味方🫶",
  "今日もいいことありますように✨",
  "無理しすぎ禁止！TREASUREで充電しよ🔋",
  "今日のあなたも最高〜！💎",
  "ちょっと疲れたら推し補給しよ🎧",
  "今日も自分のペースでいこ〜！",
  "TREASURE DAYへようこそ💎 今日も楽しもう！",
  "今日の推し活が最高の思い出になりますように📸",
  "今日もTREASUREからいっぱいパワーもらおう💎",
  "好きな曲を聴いて気分上げてこ〜🎶",
  "今日頑張った分だけ推し補給してよし！🫶",
  "小さないいことがたくさん見つかる日になりますように✨",
  "会いたい気持ちも今日のパワーに変えちゃお💎"
];
const bonusMissions = [
  "TREASUREの曲を1曲フルで聴く🎧",
  "今日の推しの写真を1枚見る📸",
  "好きなTREASUREのMVを1本見る🎬",
  "推しの好きなところを1個思い出す💎",
  "今日の気分に合うTREASUREの曲を選ぶ🎶",
  "カメラロールから懐かしいTREASURE写真を発掘する📱",
  "推しの動画を1本だけ見る👀",
  "TREASUREの曲をシャッフルして最初に出た曲を聴く🎧",
  "今日いちばん見たいメンバーの写真を探す🔎",
  "過去のライブ写真を1枚見返す📸",
  "TREASUREに一言メッセージを考える💌",
  "今日の推し活を1枚写真に残す✨",
  "好きなステージを1本見る🔥",
  "TREASUREの好きな歌詞をひとつ思い出す🎤",
  "今日のラッキーメンバーを決める🎲"
];
const bonusLuck = [
  "💎 DIAMOND DAY｜今日はキラキラ最強DAY！",
  "🩵 BLUE DAY｜ゆったり自分のペースが吉",
  "✨ SHINING DAY｜嬉しいことが起こるかも！",
  "🔥 GOING CRAZY DAY｜全力で楽しんだもん勝ち！",
  "🌈 BEAUTIFUL DAY｜素敵なものに出会えそう",
  "🌻 HELLO DAY｜新しい出会いや発見に期待！",
  "🎧 MUSIC DAY｜TREASUREを聴くと運気UP",
  "📸 MEMORY DAY｜今日の思い出を残すと◎",
  "💌 LOVE DAY｜推しから幸せをもらえる日",
  "👑 TREASURE DAY｜今日は全部うまくいく予感！"
];
const bonusSpecials = [
  "👑 SUPER TREASURE DAY｜今日は超ラッキーDAY！",
  "💎 DOUBLE TREASURE｜ラッキーメンバーを2人GET！",
  "🎧 TREASURE TIME｜好きな曲を3曲連続で聴こう！",
  "📸 MEMORY BONUS｜お気に入りのTREASURE写真を1枚保存！",
  "💌 LOVE BONUS｜今日の推しに一言メッセージを残そう！",
  "✨ WISH BONUS｜TREASUREに叶えてほしい願いを1つ決めよう！"
];
const bonusOpen = document.getElementById("today-bonus-btn");
const bonusDetail = document.getElementById("bonus-detail");
const bonusClose = document.querySelector(".bonus-close");
const bonusDrawBtn = document.querySelector(".bonus-draw-button");
const bonusResult = document.getElementById("bonus-result");
if (bonusOpen && bonusDetail && bonusClose) {

  bonusOpen.addEventListener("click", () => {
    bonusDetail.classList.add("active");
    document.body.style.overflow = "hidden";
  });
if (bonusDrawBtn && bonusResult) {
  bonusDrawBtn.addEventListener("click", () => {

    bonusDrawBtn.disabled = true;

    let shuffleCount = 0;

    const bonusTypes = [
      "💌 MESSAGE",
      "📸 MISSION",
      "💎 TREASURE LUCK",
      "✨ SPECIAL BONUS"
    ];

    const bonusShuffle = setInterval(() => {
      const randomType =
        bonusTypes[Math.floor(Math.random() * bonusTypes.length)];

      bonusResult.textContent = `🎲 ${randomType}`;

      shuffleCount++;

      if (shuffleCount >= 18) {
        clearInterval(bonusShuffle);

        const roll = Math.random() * 100;

        let finalResult = "";

        if (roll < 35) {
          const message =
            bonusMessages[Math.floor(Math.random() * bonusMessages.length)];

          finalResult = `💌 MESSAGE\n\n${message}`;

        } else if (roll < 65) {
          const mission =
            bonusMissions[Math.floor(Math.random() * bonusMissions.length)];

          finalResult = `📸 MISSION\n\n${mission}`;

        } else if (roll < 90) {
          const luck =
            bonusLuck[Math.floor(Math.random() * bonusLuck.length)];

          finalResult = `💎 TREASURE LUCK\n\n${luck}`;

        } else {
          const special =
            bonusSpecials[Math.floor(Math.random() * bonusSpecials.length)];

          finalResult = `✨ SPECIAL BONUS ✨\n\n${special}`;
        }

        bonusResult.textContent = finalResult;

        bonusResult.classList.remove("is-winner");
        void bonusResult.offsetWidth;
        bonusResult.classList.add("is-winner");

        bonusDrawBtn.disabled = false;
      }

    }, 90);

  });
}
  bonusClose.addEventListener("click", () => {
    bonusDetail.classList.remove("active");
    document.body.style.overflow = "";
  });

}
// ========================================
// 📖 MEMBER BOOK
// ========================================

const memberBookOpen = document.getElementById("member-book-open");
const memberBookDetail = document.getElementById("member-book-detail");
const memberBookClose = document.getElementById("member-book-close");

if (memberBookOpen && memberBookDetail) {
  memberBookOpen.addEventListener("click", () => {
    memberBookDetail.classList.add("active");
    document.body.style.overflow = "hidden";
  });
}

if (memberBookClose && memberBookDetail) {
  memberBookClose.addEventListener("click", () => {
    memberBookDetail.classList.remove("active");
    document.body.style.overflow = "";
  });
}
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
const seatMemoryTab =
  document.getElementById("seat-memory-tab");
const eventMemoryArea =
  document.getElementById("event-memory-area");

const treasureDiaryArea =
  document.getElementById("treasure-diary-area");

const photoMemoryArea =
  document.getElementById("photo-memory-area");
const seatMemoryArea =
  document.getElementById("seat-memory-area");
// ========================================
// 📸 SEAT MEMORY PHOTO DATABASE
// ========================================

const seatPhotoDBName = "treasure-seat-photo-db";
const seatPhotoStoreName = "seat-photos";

function openSeatPhotoDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(seatPhotoDBName, 1);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(seatPhotoStoreName)) {
        db.createObjectStore(seatPhotoStoreName);
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
async function saveSeatPhotos(memoryId, files) {
  const db = await openSeatPhotoDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      seatPhotoStoreName,
      "readwrite"
    );

    const store = transaction.objectStore(seatPhotoStoreName);
for (let i = 0; i < 3; i++) {
  store.delete(`${memoryId}-${i}`);
}
    // 最大3枚まで保存
    Array.from(files)
      .slice(0, 3)
      .forEach((file, index) => {
        store.put(file, `${memoryId}-${index}`);
      });

    transaction.oncomplete = () => {
      db.close();
      resolve();
    };

    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
}
const seatMemoryEvent =
  document.getElementById("seat-memory-event");

const seatMemoryDate =
  document.getElementById("seat-memory-date");

const seatMemoryVenue =
  document.getElementById("seat-memory-venue");

const seatMemorySeat =
  document.getElementById("seat-memory-seat");

const seatMemoryNote =
  document.getElementById("seat-memory-note");

const seatMemoryPhoto =
  document.getElementById("seat-memory-photo");

const seatMemoryRating =
  document.getElementById("seat-memory-rating");

const seatMemorySave =
  document.getElementById("seat-memory-save");
// ================================
// 💺 SEAT MEMORY データ
// ================================

let seatMemories = JSON.parse(
  localStorage.getItem("treasure-seat-memories") || "[]"
);
const seatMemoryList =
  document.getElementById("seat-memory-list");
let seatMemorySortMode = "new";
function renderSeatMemories() {
  if (!seatMemoryList) return;

  seatMemoryList.innerHTML = "";

  if (seatMemories.length === 0) {
    seatMemoryList.innerHTML = `
      <div class="seat-memory-empty">
        💺 ここに座席の思い出が増えていくよ
      </div>
    `;
    return;
  }

let sortedSeatMemories = [...seatMemories];

if (seatMemorySortMode === "new") {
  // 新しい順
  sortedSeatMemories.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
}

if (seatMemorySortMode === "old") {
  // 古い順
  sortedSeatMemories.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
}

if (seatMemorySortMode === "tour") {
  // ツアー・公演名ごとにまとめる
  sortedSeatMemories.sort((a, b) => {
    const eventA = (a.eventName || "").toLowerCase();
    const eventB = (b.eventName || "").toLowerCase();

    if (eventA !== eventB) {
      return eventA.localeCompare(eventB);
    }

    // 同じツアー内では新しい日付を上
    return new Date(b.date) - new Date(a.date);
  });
}
if (seatMemorySortMode === "tour") {
  const tourGroups = {};

  sortedSeatMemories.forEach((memory) => {
    const tourName = memory.eventName || "EVENT";

    if (!tourGroups[tourName]) {
      tourGroups[tourName] = [];
    }

    tourGroups[tourName].push(memory);
  });

  Object.entries(tourGroups).forEach(([tourName, memories]) => {
    const group = document.createElement("div");
    group.className = "seat-tour-group";

    const title = document.createElement("div");
    title.className = "seat-tour-title";
    title.textContent = `💎 ${tourName}`;

    group.appendChild(title);

    memories.forEach((memory) => {
      const dateButton = document.createElement("button");
      dateButton.type = "button";
      dateButton.className = "seat-tour-date";
      dateButton.textContent = `📅 ${memory.date || "日付なし"}`;
dateButton.addEventListener("click", () => {
 seatMemorySortMode = "new";
renderSeatMemories();

const backButton = document.createElement("button");
backButton.type = "button";
backButton.className = "seat-tour-back-btn";
backButton.textContent = "← ツアー一覧に戻る";

backButton.addEventListener("click", () => {
  seatMemorySortMode = "tour";

  document
    .querySelectorAll(".seat-memory-sort-btn")
    .forEach((btn) => {
      btn.classList.toggle(
        "active",
        btn.dataset.sort === "tour"
      );
    });

  renderSeatMemories();

  seatMemoryList.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

seatMemoryList.prepend(backButton);
  setTimeout(() => {
    const cards = document.querySelectorAll(".seat-memory-card");

    const targetCard = [...cards].find((card) => {
      return (
        card.textContent.includes(memory.eventName || "") &&
        card.textContent.includes(memory.date || "")
      );
    });

    if (targetCard) {
      targetCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

      targetCard.classList.add("seat-memory-highlight");

      setTimeout(() => {
        targetCard.classList.remove("seat-memory-highlight");
      }, 1500);
    }
  }, 50);
});
      group.appendChild(dateButton);
    });

    seatMemoryList.appendChild(group);
  });

  return;
}
sortedSeatMemories.forEach((memory) => {
    const card = document.createElement("div");
    card.className = "seat-memory-card";

    const stars = "⭐".repeat(Number(memory.rating) || 1);

    card.innerHTML = `
      <div class="seat-memory-card-event">
        💎 ${memory.eventName || "EVENT"}
      </div>

      ${memory.date ? `
        <div class="seat-memory-card-date">
          📅 ${memory.date}
        </div>
      ` : ""}

      ${memory.venue ? `
        <div class="seat-memory-card-venue">
          🏟️ ${memory.venue}
        </div>
      ` : ""}

      ${memory.seat ? `
        <div class="seat-memory-card-seat">
          💺 ${memory.seat}
        </div>
      ` : ""}

      <div class="seat-memory-card-rating">
        ${stars}
      </div>

      ${memory.note ? `
        <div class="seat-memory-card-note">
          ${memory.note}
        </div>
      ` : ""}
<div class="seat-memory-card-actions">
  <button
    type="button"
    class="seat-memory-edit-btn"
    data-id="${memory.photoKey}"
  >
    ✏️ 編集
  </button>

  <button
    type="button"
    class="seat-memory-delete-btn"
    data-id="${memory.photoKey}"
  >
    🗑️ 削除
  </button>
</div>      
     ${memory.photoCount > 0 ? `
  <div
    class="seat-memory-card-photos"
    id="seat-photos-${memory.photoKey}"
  ></div>
` : ""}
    `;

seatMemoryList.appendChild(card);

// ✏️ SEAT MEMORY 編集
const editBtn = card.querySelector(".seat-memory-edit-btn");

if (editBtn) {
  editBtn.addEventListener("click", () => {
    seatMemoryEvent.value = memory.eventName || "";
    seatMemoryDate.value = memory.date || "";
    seatMemoryVenue.value = memory.venue || "";
    seatMemorySeat.value = memory.seat || "";
    seatMemoryNote.value = memory.note || "";
    seatMemoryRating.value = memory.rating || "1";

    // 写真は今あるものをそのまま保持
    seatMemoryPhoto.value = "";

    // どのSEAT MEMORYを編集中か記録
    seatMemorySave.dataset.editingId =
      memory.photoKey || memory.createdAt;

    // 保存ボタンを編集モードに
    seatMemorySave.textContent = "変更を保存 💺💎";

    // 入力欄まで戻る
    seatMemoryEvent.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });
}

const deleteBtn = card.querySelector(".seat-memory-delete-btn");
if (deleteBtn) {
  deleteBtn.addEventListener("click", () => {
    const ok = confirm("このSEAT MEMORYを削除する？💺");

    if (!ok) return;

    seatMemories = seatMemories.filter(
      (item) => item.photoKey !== memory.photoKey
    );

    localStorage.setItem(
      "treasure-seat-memories",
      JSON.stringify(seatMemories)
    );

    renderSeatMemories();
  });
}
 if (memory.photoCount > 0 && memory.photoKey) {
  loadSeatPhotos(memory);
}
  });
}
const seatMemorySortButtons =
  document.querySelectorAll(".seat-memory-sort-btn");

seatMemorySortButtons.forEach((button) => {
  button.addEventListener("click", () => {
    seatMemorySortMode = button.dataset.sort;

    seatMemorySortButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    renderSeatMemories();
  });
});
async function loadSeatPhotos(memory) {
  if (!memory.photoKey || !memory.photoCount) return;

  const container = document.getElementById(
    `seat-photos-${memory.photoKey}`
  );

  if (!container) return;

  try {
    const db = await openSeatPhotoDB();

    const transaction = db.transaction(
      seatPhotoStoreName,
      "readonly"
    );

    const store = transaction.objectStore(seatPhotoStoreName);

    for (let i = 0; i < memory.photoCount; i++) {
      const request = store.get(`${memory.photoKey}-${i}`);

      request.onsuccess = () => {
        const file = request.result;
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);

        const img = document.createElement("img");
        img.src = imageUrl;
        img.className = "seat-memory-card-photo";
        img.alt = "座席からの写真";

        img.onload = () => {
          URL.revokeObjectURL(imageUrl);
        };

        container.appendChild(img);
      };
    }

    transaction.oncomplete = () => {
      db.close();
    };
  } catch (error) {
    console.error("SEAT MEMORY写真の読み込みに失敗:", error);
  }
}
renderSeatMemories();
// ================================
// 💺 SEAT MEMORY 保存
// ================================

if (seatMemorySave) {
 seatMemorySave.addEventListener("click", async () => {
    const eventName = seatMemoryEvent.value.trim();
    const date = seatMemoryDate.value;
    const venue = seatMemoryVenue.value.trim();
    const seat = seatMemorySeat.value.trim();
    const note = seatMemoryNote.value.trim();
    const rating = seatMemoryRating.value;
const photoFiles = Array.from(seatMemoryPhoto.files).slice(0, 3);
    if (!eventName) {
      alert("公演名を入力してね💎");
      return;
    }
   const editingId = seatMemorySave.dataset.editingId;

   if (editingId) {
  const target = seatMemories.find(
    (item) =>
      item.photoKey === editingId ||
      item.createdAt === editingId
  );

  if (target) {
    target.eventName = eventName;
    target.date = date;
    target.venue = venue;
    target.seat = seat;
    target.note = note;
    target.rating = rating;
if (photoFiles.length > 0) {
  if (!target.photoKey) {
    target.photoKey =
      Date.now().toString() +
      "_" +
      Math.random().toString(36).slice(2);
  }

  await saveSeatPhotos(target.photoKey, photoFiles);
  target.photoCount = photoFiles.length;
}
    localStorage.setItem(
      "treasure-seat-memories",
      JSON.stringify(seatMemories)
    );

    delete seatMemorySave.dataset.editingId;
    seatMemorySave.textContent = "SEATを保存 💺💎";

    seatMemoryEvent.value = "";
    seatMemoryDate.value = "";
    seatMemoryVenue.value = "";
    seatMemorySeat.value = "";
    seatMemoryNote.value = "";
    seatMemoryRating.value = "1";
    seatMemoryPhoto.value = "";

    renderSeatMemories();

    alert("SEAT MEMORYを更新したよ💺💎");
    return;
  }
}
  const memoryId =
  Date.now().toString() +
  "_" +
  Math.random().toString(36).slice(2);

if (photoFiles.length > 0) {
  await saveSeatPhotos(memoryId, photoFiles);
} 
    const newSeatMemory = {
      eventName,
      date,
      venue,
      seat,
      note,
      rating,
 photoKey: memoryId,
photoCount: photoFiles.length,
      createdAt: new Date().toISOString()
    };

    seatMemories.unshift(newSeatMemory);

    localStorage.setItem(
      "treasure-seat-memories",
      JSON.stringify(seatMemories)
    );
renderSeatMemories();
    seatMemoryEvent.value = "";
    seatMemoryDate.value = "";
    seatMemoryVenue.value = "";
    seatMemorySeat.value = "";
    seatMemoryNote.value = "";
    seatMemoryRating.value = "1";
seatMemoryPhoto.value = "";
    alert("SEAT MEMORYに保存したよ💺💎");
  });
}
function switchMemoryMode(mode) {

if (
  !eventMemoryTab ||
  !treasureDiaryTab ||
  !photoMemoryTab ||
  !seatMemoryTab ||
  !eventMemoryArea ||
  !treasureDiaryArea ||
  !photoMemoryArea ||
  !seatMemoryArea
) {
  return;
}

  const isEvent = mode === "event";
  const isDiary = mode === "diary";
  const isPhoto = mode === "photo";
const isSeat = mode === "seat";
  eventMemoryTab.classList.toggle("active", isEvent);
  treasureDiaryTab.classList.toggle("active", isDiary);
  photoMemoryTab.classList.toggle("active", isPhoto);
seatMemoryTab.classList.toggle("active", isSeat);
  eventMemoryArea.classList.toggle("active", isEvent);
  treasureDiaryArea.classList.toggle("active", isDiary);
  photoMemoryArea.classList.toggle("active", isPhoto);
seatMemoryArea.classList.toggle("active", isSeat);
  // PHOTO MEMORYには今style="display:none;"があるのでここで切替
  photoMemoryArea.style.display =
    isPhoto ? "block" : "none";

  localStorage.setItem(
    "treasure-memory-mode",
    mode
  );
}
if (seatMemoryTab) {
  seatMemoryTab.addEventListener("click", () => {
    switchMemoryMode("seat");
  });
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
eventMemoryViewSong.textContent =
  savedMemory.song || "";
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
  if (eventMemorySong) {
  eventMemorySong.value =
    savedMemory.song || "";
}
  if (eventMemoryDetailDate) {
    eventMemoryDetailDate.textContent =
      (event.date || "").replaceAll("-", ".");
  }

  if (eventMemoryDetailName) {
    eventMemoryDetailName.textContent =
      event.name || "TREASURE EVENT 💎";
  }
if (eventMemoryDetailSong) {
  eventMemoryDetailSong.textContent =
    savedMemory.song || "";
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
const eventMemoryDetailSong =
  document.getElementById("event-memory-detail-song");
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
const eventMemoryViewSong =
  document.getElementById("event-memory-view-song");
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
if (eventMemorySong) {
  eventMemorySong.value = savedMemory.song || "";
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
const eventMemorySong =
  document.getElementById("event-memory-song");
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
thoughts: eventMemoryThoughts ? eventMemoryThoughts.value : "", 
 song: eventMemorySong ? eventMemorySong.value : ""
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
// ========================================
// 🐶 JIHOON BOOK OPEN / CLOSE
// ========================================

const memberCards = document.querySelectorAll(".member-card");
const jihoonBookDetail = document.getElementById("jihoon-book-detail");
const jihoonBookClose =
  document.getElementById("jihoon-book-close");

if (memberCards[1] && jihoonBookDetail) {
  memberCards[1].addEventListener("click", () => {
    jihoonBookDetail.classList.add("active");
    document.body.style.overflow = "hidden";
    jihoonBookDetail.scrollTop = 0;
  });
}

if (jihoonBookClose && jihoonBookDetail) {
  jihoonBookClose.addEventListener("click", () => {
    jihoonBookDetail.classList.remove("active");

    // MEMBER BOOKは開いたままにする
    document.body.style.overflow = "hidden";
  });
}
// ========================================
// 🦔 HYUNSUK BOOK OPEN / CLOSE
// ========================================

const hyunsukBookOpen =
  document.getElementById("hyunsuk-book-open");

const hyunsukBookDetail =
  document.getElementById("hyunsuk-book-detail");

const hyunsukBookClose =
  document.getElementById("hyunsuk-book-close");


// HYUNSUK BOOKを開く
if (hyunsukBookOpen && hyunsukBookDetail) {

  hyunsukBookOpen.addEventListener(
    "click",
    () => {

      hyunsukBookDetail.classList.add(
        "active"
      );

      hyunsukBookDetail.scrollTop = 0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// MEMBER BOOKへ戻る
if (hyunsukBookClose && hyunsukBookDetail) {

  hyunsukBookClose.addEventListener(
    "click",
    () => {

      hyunsukBookDetail.classList.remove(
        "active"
      );

      // MEMBER BOOKは後ろで開いたまま
      document.body.style.overflow =
        "hidden";

    }
  );
}
// ========================================
// 📸 HYUNSUK VISUAL BOOK OPEN / CLOSE
// ========================================

const hyunsukVisualBook =
  document.getElementById("hyunsukVisualBook");

const hyunsukVisualBookOpen =
  document.getElementById("hyunsukVisualBookOpen");

const hyunsukVisualClose =
  document.getElementById("hyunsukVisualClose");


// 📸 HYUNSUK VISUAL BOOKを開く
if (hyunsukVisualBookOpen && hyunsukVisualBook) {

  hyunsukVisualBookOpen.addEventListener(
    "click",
    () => {

      hyunsukVisualBook.classList.add("active");
      hyunsukVisualBook.scrollTop = 0;

      document.body.style.overflow = "hidden";
    }
  );
}


// ← HYUNSUK BOOKへ戻る
if (hyunsukVisualClose && hyunsukVisualBook) {

  hyunsukVisualClose.addEventListener(
    "click",
    () => {

      hyunsukVisualBook.classList.remove("active");

      // 後ろのHYUNSUK BOOKは開いたまま
      document.body.style.overflow = "hidden";
    }
  );
}
// ========================================
// 👑 HYUNSUK VISUAL RANKING OPEN / CLOSE
// ========================================

const hyunsukVisualRankingOpen =
  document.getElementById("hyunsukVisualRankingOpen");

const hyunsukVisualRankingPage =
  document.getElementById("hyunsukVisualRankingPage");

const hyunsukVisualRankingBack =
  document.getElementById("hyunsukVisualRankingBack");


// 👑 RANKINGを開く
if (
  hyunsukVisualRankingOpen &&
  hyunsukVisualRankingPage
) {

  hyunsukVisualRankingOpen.addEventListener(
  "click",
  async () => {

      hyunsukVisualRankingPage.style.display =
        "block";

      hyunsukVisualRankingPage.scrollTop = 0;
await loadHyunsukVisualRanking();
      document.body.style.overflow =
        "hidden";
    }
  );
}


// ← HYUNSUK BOOKへ戻る
if (
  hyunsukVisualRankingBack &&
  hyunsukVisualRankingPage
) {

  hyunsukVisualRankingBack.addEventListener(
    "click",
    () => {

      hyunsukVisualRankingPage.style.display =
        "none";

      document.body.style.overflow =
        "hidden";
    }
  );
}
// =========================================
// 📸 JIHOON VISUAL BOOK OPEN / CLOSE
// =========================================

const jihoonVisualBook = document.getElementById("jihoonVisualBook");
const jihoonVisualClose =
  document.getElementById("jihoonVisualClose");
const jihoonMenuCards =
  jihoonBookDetail
    ? jihoonBookDetail.querySelectorAll(".jihoon-book-menu-card")
    : [];


// 📸 VISUAL BOOKを開く
if (jihoonMenuCards[0] && jihoonVisualBook) {
  jihoonMenuCards[0].addEventListener("click", () => {

    jihoonVisualBook.classList.add("active");
    jihoonVisualBook.scrollTop = 0;

    document.body.style.overflow = "hidden";

  });
}


// ← JIHOON BOOKへ戻る
if (jihoonVisualClose && jihoonVisualBook) {
  jihoonVisualClose.addEventListener("click", () => {

    jihoonVisualBook.classList.remove("active");

    // 後ろのJIHOON BOOKはそのまま開いておく
    document.body.style.overflow = "hidden";

  });
}
// ========================================
// 📷 JIHOON MEMORIES
// PHOTO MEMORY LINK VIEW
// ========================================

const jihoonMemoriesOpen =
  document.getElementById("jihoonMemoriesOpen");

const jihoonMemoriesPage =
  document.getElementById("jihoonMemoriesPage");

const jihoonMemoriesBack =
  document.getElementById("jihoonMemoriesBack");

const jihoonMemoriesAdd =
  document.getElementById("jihoonMemoriesAdd");

const jihoonMemoriesList =
  document.getElementById("jihoonMemoriesList");


// ========================================
// 📷 OPEN
// ========================================

if (
  jihoonMemoriesOpen &&
  jihoonMemoriesPage &&
  jihoonBookDetail
) {

  jihoonMemoriesOpen.addEventListener(
    "click",
    async () => {

      // 🐶 JIHOON BOOKは閉じない！
      jihoonMemoriesPage.style.display =
        "block";

      jihoonMemoriesPage.scrollTop = 0;

      await renderJihoonMemories();

      document.body.style.overflow =
        "hidden";
    }
  );
}

// ========================================
// ← BACK TO JIHOON BOOK
// ========================================

if (
  jihoonMemoriesBack &&
  jihoonMemoriesPage &&
  jihoonBookDetail
) {

  jihoonMemoriesBack.addEventListener(
    "click",
    () => {

      jihoonMemoriesPage.style.display =
        "none";

      jihoonBookDetail.classList.add("active");

      jihoonBookDetail.scrollTop = 0;

      document.body.style.overflow =
        "hidden";
    }
  );
}


// ========================================
// ＋ ADD JIHOON MEMORY
// PHOTO MEMORYへ移動
// ========================================

if (jihoonMemoriesAdd) {

  jihoonMemoriesAdd.addEventListener(
    "click",
    () => {

      const memoryPage =
        document.getElementById("memory-page");


      // JIHOON MEMORYを閉じる
      if (jihoonMemoriesPage) {
        jihoonMemoriesPage.style.display =
          "none";
      }


      // JIHOON BOOKも閉じる
      if (jihoonBookDetail) {
        jihoonBookDetail.classList.remove(
          "active"
        );
      }


      // MEMBER BOOKも閉じる
      const memberBookDetail =
        document.getElementById(
          "member-book-detail"
        );

      if (memberBookDetail) {
        memberBookDetail.classList.remove(
          "active"
        );
      }


      // MEMORYページを表示
// MEMORYページへ正式に切り替え
showPage("memory");

// PHOTO MEMORYタブへ
switchMemoryMode("photo");

// MEMBERはJIHOONで自動セット
if (memoryMember) {
  memoryMember.value =
    "JIHOON";
}

document.body.style.overflow =
  "";

window.scrollTo(0, 0);
    }
  );
}


// ========================================
// 🐶 JIHOON MEMORY RENDER
// ========================================

async function renderJihoonMemories() {

  if (!jihoonMemoriesList) return;


  jihoonMemoriesList.innerHTML = "";


  const jihoonEntries =
    memories
      .map(
        (memory, index) => ({
          memory,
          index
        })
      )
      .filter(
        ({ memory }) =>
          String(
            memory.member || ""
          ).toUpperCase() ===
          "JIHOON"
      );


  if (jihoonEntries.length === 0) {

    jihoonMemoriesList.innerHTML = `
      <div class="jihoon-memories-empty">
        <span>📷</span>

        <strong>
          まだJIHOON MEMORYがありません
        </strong>

        <small>
          PHOTO MEMORYでMEMBERを
          JIHOONにして投稿してみよう 🐶💎
        </small>
      </div>
    `;

    return;
  }


  for (
    const { memory, index }
    of jihoonEntries
  ) {

    const card =
      document.createElement("article");

    card.className =
      "jihoon-memory-card";


    // ===============================
    // 📸 PHOTO
    // ===============================

    if (
      memory.photoKey ||
      memory.photo
    ) {

      const image =
        document.createElement("img");

      image.alt =
        memory.title ||
        "JIHOON MEMORY";


      if (memory.photoKey) {

        try {

          image.src =
            await loadPhotoMemoryImage(
              memory.photoKey
            );

        } catch (error) {

          console.error(
            "JIHOON MEMORY IMAGE LOAD ERROR",
            error
          );

          image.src = "";

        }

      } else {

        // 古いPHOTO MEMORY救済
        image.src =
          memory.photo || "";

      }


      if (image.src) {
        card.appendChild(image);
      }
    }


    // ===============================
    // 💎 INFO
    // ===============================

    const body =
      document.createElement("div");

    body.className =
      "jihoon-memory-card-body";


    const title =
      document.createElement("strong");

    title.textContent =
      memory.title ||
      "JIHOON MEMORY 💎";


    body.appendChild(title);


    if (memory.text) {

      const text =
        document.createElement("p");

      text.textContent =
        memory.text;

      body.appendChild(text);
    }


    // ===============================
    // 🏷 TAGS
    // ===============================

    if (
      Array.isArray(memory.tags) &&
      memory.tags.length > 0
    ) {

      const tags =
        document.createElement("div");

      tags.className =
        "jihoon-memory-tags";


      memory.tags.forEach(
        (tag) => {

          const span =
            document.createElement("span");

          span.textContent =
            "#" + tag;

          tags.appendChild(span);
        }
      );


      body.appendChild(tags);
    }


    card.appendChild(body);


    // PHOTO MEMORY詳細を共用
card.addEventListener(
  "click",
  async () => {

    // 戻り先はJIHOON MEMORIES
    photoMemoryReturnTarget =
      "jihoon";

    // HOME / MEMBER BOOK系を閉じて
    // 正式にMEMORYページへ移動
    showPage("memory");

    // PHOTO MEMORYモードにする
    switchMemoryMode("photo");

    // その上で詳細を開く
    await openPhotoMemoryDetail(index);

    window.scrollTo(0, 0);
  }
);
    jihoonMemoriesList.appendChild(
      card
    );
  }
}
// ========================================
// 👑 JIHOON VISUAL RANKING OPEN / CLOSE
// ========================================

const jihoonVisualRankingOpen =
  document.getElementById("jihoonVisualRankingOpen");

const jihoonVisualRankingPage =
  document.getElementById("jihoonVisualRankingPage");

const jihoonVisualRankingBack =
  document.getElementById("jihoonVisualRankingBack");
const jihoonVisualRankingList =
  document.getElementById("jihoonVisualRankingList");
const jihoonGrowthHistoryOpen =
  document.getElementById("jihoonGrowthHistoryOpen");

const jihoonGrowthHistoryPage =
  document.getElementById("jihoonGrowthHistoryPage");

const jihoonGrowthHistoryBack =
  document.getElementById("jihoonGrowthHistoryBack");
if (jihoonVisualRankingOpen && jihoonVisualRankingPage) {
  jihoonVisualRankingOpen.addEventListener("click", () => {
    jihoonVisualRankingPage.style.display = "block";
    jihoonVisualRankingPage.scrollTop = 0;
  loadJihoonVisualRanking();
    document.body.style.overflow = "hidden";
  });
}

if (jihoonVisualRankingBack && jihoonVisualRankingPage) {
  jihoonVisualRankingBack.addEventListener("click", () => {
    jihoonVisualRankingPage.style.display = "none";

    // 後ろのJIHOON BOOKはそのまま開いておく
    document.body.style.overflow = "hidden";
  });
}
// =========================================
// 🌱 GROWTH HISTORY OPEN / BACK
// =========================================

if (
  jihoonGrowthHistoryOpen &&
  jihoonGrowthHistoryPage &&
  jihoonGrowthHistoryBack
) {
  jihoonGrowthHistoryOpen.addEventListener("click", () => {
if (jihoonBookDetail) {
  jihoonBookDetail.classList.remove("active");
}
    jihoonGrowthHistoryPage.style.display = "block";
    jihoonGrowthHistoryPage.scrollTop = 0;

    document.body.style.overflow = "hidden";
  });

  jihoonGrowthHistoryBack.addEventListener("click", () => {
    jihoonGrowthHistoryPage.style.display = "none";

if (jihoonBookDetail) {
  jihoonBookDetail.classList.add("active");
}

    document.body.style.overflow = "hidden";
  });
}
// =========================================
// 🌱 HYUNSUK GROWTH HISTORY OPEN / BACK
// =========================================

const hyunsukGrowthHistoryOpen =
  document.getElementById("hyunsukGrowthHistoryOpen");

const hyunsukGrowthHistoryPage =
  document.getElementById("hyunsukGrowthHistoryPage");

const hyunsukGrowthHistoryBack =
  document.getElementById("hyunsukGrowthHistoryBack");

if (
  hyunsukGrowthHistoryOpen &&
  hyunsukGrowthHistoryPage &&
  hyunsukGrowthHistoryBack
) {

  hyunsukGrowthHistoryOpen.addEventListener(
    "click",
    () => {

      if (hyunsukBookDetail) {
        hyunsukBookDetail.classList.remove("active");
      }

      hyunsukGrowthHistoryPage.style.display =
        "block";

      hyunsukGrowthHistoryPage.scrollTop = 0;

      document.body.style.overflow =
        "hidden";
    }
  );


  hyunsukGrowthHistoryBack.addEventListener(
    "click",
    () => {

      hyunsukGrowthHistoryPage.style.display =
        "none";

      if (hyunsukBookDetail) {
        hyunsukBookDetail.classList.add("active");
      }

      document.body.style.overflow =
        "hidden";
    }
  );
}
// =========================================
// 🌱 HYUNSUK GROWTH YEAR OPEN / BACK
// 2020 - 2026 共通
// =========================================

const hyunsukGrowthYearPage =
  document.getElementById("hyunsukGrowthYearPage");

const hyunsukGrowthYearBack =
  document.getElementById("hyunsukGrowthYearBack");

const hyunsukGrowthYearNumber =
  document.getElementById("hyunsukGrowthYearNumber");

const hyunsukGrowthYearTitle =
  document.getElementById("hyunsukGrowthYearTitle");

const hyunsukGrowthYearSubtitle =
  document.getElementById("hyunsukGrowthYearSubtitle");

const hyunsukGrowthYearVisualTitle =
  document.getElementById("hyunsukGrowthYearVisualTitle");

const hyunsukGrowthYearCaption =
  document.getElementById("hyunsukGrowthYearCaption");

let currentHyunsukGrowthYear = 2020;

const hyunsukGrowthYearInfo = {
  2020: "DEBUT ERA 💎",
  2021: "OUR TREASURE ERA 💎",
  2022: "THE SECOND STEP ERA 💎",
  2023: "REBOOT ERA 💎",
  2024: "2024 MEMORIES 💎",
  2025: "2025 MEMORIES 💎",
  2026: "NOW ✨"
};


function openHyunsukGrowthYear(year) {

  currentHyunsukGrowthYear = year;

  if (hyunsukGrowthHistoryPage) {
    hyunsukGrowthHistoryPage.style.display =
      "none";
  }

  if (hyunsukGrowthYearNumber) {
    hyunsukGrowthYearNumber.textContent =
      year;
  }

  if (hyunsukGrowthYearTitle) {
    hyunsukGrowthYearTitle.textContent =
      hyunsukGrowthYearInfo[year] ||
      `${year} 💎`;
  }

  if (hyunsukGrowthYearSubtitle) {
    hyunsukGrowthYearSubtitle.textContent =
      `${year}年のヒョンソクを振り返ろう 💎`;
  }

  if (hyunsukGrowthYearVisualTitle) {
    hyunsukGrowthYearVisualTitle.textContent =
      `📸 ${year} VISUAL`;
  }

  if (hyunsukGrowthYearCaption) {
    hyunsukGrowthYearCaption.textContent =
      `${year}年のお気に入りヒョンソクを残そう 💎`;
  }

  if (hyunsukGrowthYearPage) {
    hyunsukGrowthYearPage.style.display =
      "block";

    hyunsukGrowthYearPage.scrollTop = 0;
  }
renderHyunsukGrowthVisuals();
  document.body.style.overflow =
    "hidden";
}


// 2020〜2026のボタンをまとめて接続
[
  2020,
  2021,
  2022,
  2023,
  2024,
  2025,
  2026
].forEach((year) => {

  const button =
    document.getElementById(
      `hyunsukGrowth${year}Open`
    );

  if (button) {

    button.addEventListener(
      "click",
      () => {
        openHyunsukGrowthYear(year);
      }
    );
  }
});


// ← GROWTH HISTORY一覧へ戻る
if (hyunsukGrowthYearBack) {

  hyunsukGrowthYearBack.addEventListener(
    "click",
    () => {

      if (hyunsukGrowthYearPage) {
        hyunsukGrowthYearPage.style.display =
          "none";
      }

      if (hyunsukGrowthHistoryPage) {
        hyunsukGrowthHistoryPage.style.display =
          "block";

        hyunsukGrowthHistoryPage.scrollTop = 0;
      }

      document.body.style.overflow =
        "hidden";
    }
  );
}
// ==========================================
// 💎 GROWTH HISTORY 2020 OPEN / BACK
// ==========================================

const jihoonGrowth2020Open =
  document.getElementById("jihoonGrowth2020Open");

const jihoonGrowth2020Page =
  document.getElementById("jihoonGrowth2020Page");

const jihoonGrowth2020Back =
  document.getElementById("jihoonGrowth2020Back");

if (
  jihoonGrowth2020Open &&
  jihoonGrowth2020Page &&
  jihoonGrowth2020Back
) {

  jihoonGrowth2020Open.addEventListener("click", () => {

    jihoonGrowthHistoryPage.style.display = "none";

    jihoonGrowth2020Page.style.display = "block";
    jihoonGrowth2020Page.scrollTop = 0;
renderJihoonGrowth2020Visuals();
    document.body.style.overflow = "hidden";
  });


  jihoonGrowth2020Back.addEventListener("click", () => {

    jihoonGrowth2020Page.style.display = "none";

    jihoonGrowthHistoryPage.style.display = "block";
    jihoonGrowthHistoryPage.scrollTop = 0;

    document.body.style.overflow = "hidden";
  });

}
// =========================================
// 📸 2020 VISUAL ADD MODAL
// =========================================

const jihoonGrowth2020VisualAdd =
  document.getElementById("jihoonGrowth2020VisualAdd");

const jihoonGrowth2020VisualModal =
  document.getElementById("jihoonGrowth2020VisualModal");

const jihoonGrowth2020VisualSelect =
  document.getElementById("jihoonGrowth2020VisualSelect");

const jihoonGrowth2020VisualInput =
  document.getElementById("jihoonGrowth2020VisualInput");

const jihoonGrowth2020VisualPreview =
  document.getElementById("jihoonGrowth2020VisualPreview");

const jihoonGrowth2020VisualPreviewImage =
  document.getElementById("jihoonGrowth2020VisualPreviewImage");

const jihoonGrowth2020VisualCancel =
  document.getElementById("jihoonGrowth2020VisualCancel");


// ＋ADD → モーダルを開く
if (jihoonGrowth2020VisualAdd && jihoonGrowth2020VisualModal) {
  jihoonGrowth2020VisualAdd.addEventListener("click", () => {
    jihoonGrowth2020VisualModal.style.display = "flex";
    jihoonGrowth2020VisualModal.scrollTop = 0;

    document.body.style.overflow = "hidden";
  });
}


// 「写真を選ぶ」→ ファイル選択
if (jihoonGrowth2020VisualSelect && jihoonGrowth2020VisualInput) {
  jihoonGrowth2020VisualSelect.addEventListener("click", () => {
    jihoonGrowth2020VisualInput.click();
  });
}


// 選んだ写真をプレビュー
if (
  jihoonGrowth2020VisualInput &&
  jihoonGrowth2020VisualPreview &&
  jihoonGrowth2020VisualPreviewImage
) {
  jihoonGrowth2020VisualInput.addEventListener("change", () => {
    const file = jihoonGrowth2020VisualInput.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      jihoonGrowth2020VisualPreviewImage.src = reader.result;
      jihoonGrowth2020VisualPreview.style.display = "block";
    };

    reader.readAsDataURL(file);
  });
}


// CANCEL → 閉じる
if (jihoonGrowth2020VisualCancel && jihoonGrowth2020VisualModal) {
  jihoonGrowth2020VisualCancel.addEventListener("click", () => {
    jihoonGrowth2020VisualModal.style.display = "none";

    jihoonGrowth2020VisualInput.value = "";
    jihoonGrowth2020VisualPreviewImage.src = "";
    jihoonGrowth2020VisualPreview.style.display = "none";
delete jihoonGrowth2020VisualSave.dataset.editId;

jihoonGrowth2020VisualSave.textContent = "💎 SAVE";
if (jihoonGrowth2020VisualDelete) {
  jihoonGrowth2020VisualDelete.style.display = "none";
  delete jihoonGrowth2020VisualDelete.dataset.deleteId;
}

   document.body.style.overflow = "";
  });
}
// =========================================
// 💾 2020 VISUAL SAVE
// =========================================

const jihoonGrowth2020VisualSave =
  document.getElementById("jihoonGrowth2020VisualSave");

const jihoonGrowth2020VisualHair =
  document.getElementById("jihoonGrowth2020VisualHair");

const jihoonGrowth2020VisualMemo =
  document.getElementById("jihoonGrowth2020VisualMemo");
const jihoonGrowth2020VisualDelete =
  document.getElementById("jihoonGrowth2020VisualDelete");
let jihoonGrowth2020EditingId = null;
// =========================================
// 💾 2020 VISUAL - IndexedDB
// =========================================

const JIHOON_GROWTH_2020_DB_NAME =
  "treasure-day-jihoon-growth-2020-db";

const JIHOON_GROWTH_2020_DB_VERSION = 1;

const JIHOON_GROWTH_2020_STORE =
  "visuals";

let jihoonGrowth2020DB;


function openJihoonGrowth2020DB() {
  return new Promise((resolve, reject) => {

    const request = indexedDB.open(
      JIHOON_GROWTH_2020_DB_NAME,
      JIHOON_GROWTH_2020_DB_VERSION
    );

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (
        !db.objectStoreNames.contains(
          JIHOON_GROWTH_2020_STORE
        )
      ) {
        db.createObjectStore(
          JIHOON_GROWTH_2020_STORE,
          {
            keyPath: "id"
          }
        );
      }
    };

    request.onsuccess = (event) => {
      jihoonGrowth2020DB =
        event.target.result;

      resolve(jihoonGrowth2020DB);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}


async function getJihoonGrowth2020Visuals() {

  if (!jihoonGrowth2020DB) {
    await openJihoonGrowth2020DB();
  }

  return new Promise((resolve, reject) => {

    const transaction =
      jihoonGrowth2020DB.transaction(
        JIHOON_GROWTH_2020_STORE,
        "readonly"
      );

    const store =
      transaction.objectStore(
        JIHOON_GROWTH_2020_STORE
      );

    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result || []);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}


async function deleteJihoonGrowth2020Visual(id) {
  if (!jihoonGrowth2020DB) {
    await openJihoonGrowth2020DB();
  }

  return new Promise((resolve, reject) => {
    const transaction =
      jihoonGrowth2020DB.transaction(
        JIHOON_GROWTH_2020_STORE,
        "readwrite"
      );

    const store =
      transaction.objectStore(
        JIHOON_GROWTH_2020_STORE
      );

    const request = store.delete(id);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

async function saveJihoonGrowth2020Visual(item) {
  if (!jihoonGrowth2020DB) {
    await openJihoonGrowth2020DB();
  }

  return new Promise((resolve, reject) => {
    const transaction =
      jihoonGrowth2020DB.transaction(
        JIHOON_GROWTH_2020_STORE,
        "readwrite"
      );

    const store =
      transaction.objectStore(
        JIHOON_GROWTH_2020_STORE
      );

    const request = store.put(item);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

if (jihoonGrowth2020VisualSave) {

  jihoonGrowth2020VisualSave.addEventListener(
    "click",
    async () => {

      try {

      const imageData =
        jihoonGrowth2020VisualPreviewImage.src;
      if (!imageData) {
        alert("先に写真を選んでね 📸");
        return;
      }

 const editId =
  jihoonGrowth2020VisualSave.dataset.editId
    ? Number(jihoonGrowth2020VisualSave.dataset.editId)
    : null;

const itemToSave = {
  id: editId || Date.now(),
  imageData: imageData,
  hairColor:
    jihoonGrowth2020VisualHair?.value || "OTHER",
  memo:
    jihoonGrowth2020VisualMemo?.value.trim() || "",
  createdAt: editId
    ? (
        (await getJihoonGrowth2020Visuals())
          .find((item) => item.id === editId)
          ?.createdAt || Date.now()
      )
    : Date.now()
};

await saveJihoonGrowth2020Visual(itemToSave);

await renderJihoonGrowth2020Visuals();

        jihoonGrowth2020VisualModal.style.display =
          "none";

        jihoonGrowth2020VisualInput.value = "";

        jihoonGrowth2020VisualPreviewImage.src =
          "";

        jihoonGrowth2020VisualPreview.style.display =
          "none";

        if (jihoonGrowth2020VisualMemo) {
          jihoonGrowth2020VisualMemo.value =
            "";
        }

        document.body.style.overflow =
          "hidden";

      } catch (error) {

        console.error(
          "2020 VISUAL SAVE ERROR",
          error
        );

        alert(
          "保存に失敗しました😭"
        );
  }
});
}
if (jihoonGrowth2020VisualDelete) {
  jihoonGrowth2020VisualDelete.addEventListener(
    "click",
    async () => {
      const id =
        Number(
          jihoonGrowth2020VisualDelete.dataset.deleteId
        );

      if (!id) return;

      const ok =
        confirm("この2020 VISUALを削除する？🥲");

      if (!ok) return;

      try {
        await deleteJihoonGrowth2020Visual(id);

        await renderJihoonGrowth2020Visuals();

        jihoonGrowth2020VisualModal.style.display =
          "none";

        delete jihoonGrowth2020VisualSave.dataset.editId;
        delete jihoonGrowth2020VisualDelete.dataset.deleteId;

        jihoonGrowth2020VisualSave.textContent =
          "💎 SAVE";

        jihoonGrowth2020VisualDelete.style.display =
          "none";

        jihoonGrowth2020VisualInput.value = "";
        jihoonGrowth2020VisualPreviewImage.src = "";
        jihoonGrowth2020VisualPreview.style.display =
          "none";

        if (jihoonGrowth2020VisualMemo) {
          jihoonGrowth2020VisualMemo.value = "";
        }

        document.body.style.overflow = "hidden";

      } catch (error) {
        console.error(
          "2020 VISUAL DELETE ERROR",
          error
        );

        alert("削除に失敗しました😭");
      }
    }
  );
}
// =========================================
// 🖼️ 2020 VISUAL RENDER
// =========================================

const jihoonGrowth2020VisualGrid =
  document.getElementById("jihoonGrowth2020VisualGrid");

async function renderJihoonGrowth2020Visuals() {
  if (!jihoonGrowth2020VisualGrid) return;

  const items =
  await getJihoonGrowth2020Visuals();

items.sort(
  (a, b) =>
    (b.createdAt || 0) -
    (a.createdAt || 0)
);

  // まだ何も保存されてないとき
  if (items.length === 0) {
    jihoonGrowth2020VisualGrid.innerHTML = `
      <div class="jihoon-growth-visual-empty">
        <span>📷</span>
        <strong>まだ写真がありません</strong>
        <small>好きな2020ジフンを追加してみよう 🐶</small>
      </div>
    `;
    return;
  }

  // 保存済み写真を表示
  jihoonGrowth2020VisualGrid.innerHTML = items
    .map((item) => `
      <article
        class="jihoon-growth-visual-card"
        data-id="${item.id}"
      >
        <div class="jihoon-growth-visual-photo">
          <img
            src="${item.imageData}"
            alt="2020 JIHOON"
          >
        </div>

        <div class="jihoon-growth-visual-info">
          <span class="jihoon-growth-visual-hair">
            ${item.hairColor || "OTHER"}
          </span>

          ${
            item.memo
              ? `<p>${item.memo}</p>`
              : `<p class="jihoon-growth-visual-no-note">
                   NO NOTE
                 </p>`
          }
        </div>
      </article>
    `)
    .join("");
const cards =
  jihoonGrowth2020VisualGrid.querySelectorAll(
    ".jihoon-growth-visual-card"
  );

cards.forEach((card) => {
  card.addEventListener("click", async () => {

    const id = Number(card.dataset.id);

    const items =
      await getJihoonGrowth2020Visuals();

    const item =
      items.find((visual) => visual.id === id);

    if (!item) return;

    jihoonGrowth2020VisualModal.style.display = "flex";
jihoonGrowth2020VisualModal.scrollTop = 0;

jihoonGrowth2020VisualPreviewImage.src = item.imageData;
jihoonGrowth2020VisualPreview.style.display = "block";

if (jihoonGrowth2020VisualHair) {
  jihoonGrowth2020VisualHair.value =
    item.hairColor || "OTHER";
}

if (jihoonGrowth2020VisualMemo) {
  jihoonGrowth2020VisualMemo.value =
    item.memo || "";
}

jihoonGrowth2020VisualSave.textContent = "💎 UPDATE";

jihoonGrowth2020VisualSave.dataset.editId =
  String(item.id);
if (jihoonGrowth2020VisualDelete) {
  jihoonGrowth2020VisualDelete.style.display = "block";
  jihoonGrowth2020VisualDelete.dataset.deleteId =
    String(item.id);
}
document.body.style.overflow = "hidden";
  });
});
}
// =========================================
// 🌱 JIHOON GROWTH YEAR VISUAL ENGINE
// 2021〜2026 共通
// =========================================

function setupJihoonGrowthYear(year) {

  const prefix = `jihoonGrowth${year}`;

  const open =
    document.getElementById(`${prefix}Open`);

  const page =
    document.getElementById(`${prefix}Page`);

  const back =
    document.getElementById(`${prefix}Back`);

  const visualAdd =
    document.getElementById(`${prefix}VisualAdd`);

  const visualModal =
    document.getElementById(`${prefix}VisualModal`);

  const visualSelect =
    document.getElementById(`${prefix}VisualSelect`);

  const visualInput =
    document.getElementById(`${prefix}VisualInput`);

  const visualPreview =
    document.getElementById(`${prefix}VisualPreview`);

  const visualPreviewImage =
    document.getElementById(`${prefix}VisualPreviewImage`);

  const visualHair =
    document.getElementById(`${prefix}VisualHair`);

  const visualMemo =
    document.getElementById(`${prefix}VisualMemo`);

  const visualSave =
    document.getElementById(`${prefix}VisualSave`);

  const visualDelete =
    document.getElementById(`${prefix}VisualDelete`);

  const visualCancel =
    document.getElementById(`${prefix}VisualCancel`);

  const visualGrid =
    document.getElementById(`${prefix}VisualGrid`);


  // =========================================
  // 🌱 YEAR PAGE OPEN / BACK
  // =========================================

  if (open && page && back) {

    open.addEventListener("click", async () => {

      if (jihoonGrowthHistoryPage) {
        jihoonGrowthHistoryPage.style.display = "none";
      }

      page.style.display = "block";
      page.scrollTop = 0;

      await renderVisuals();

      document.body.style.overflow = "hidden";
    });


    back.addEventListener("click", () => {

      page.style.display = "none";

      if (jihoonGrowthHistoryPage) {
        jihoonGrowthHistoryPage.style.display = "block";
        jihoonGrowthHistoryPage.scrollTop = 0;
      }

      document.body.style.overflow = "hidden";
    });
  }


  // =========================================
  // 📸 ADD MODAL
  // =========================================

  if (visualAdd && visualModal) {

    visualAdd.addEventListener("click", () => {

      delete visualSave?.dataset.editId;

      if (visualSave) {
        visualSave.textContent = "💎 SAVE";
      }

      if (visualDelete) {
        visualDelete.style.display = "none";
        delete visualDelete.dataset.deleteId;
      }

      if (visualInput) {
        visualInput.value = "";
      }

      if (visualPreviewImage) {
        visualPreviewImage.src = "";
      }

      if (visualPreview) {
        visualPreview.style.display = "none";
      }

      if (visualMemo) {
        visualMemo.value = "";
      }

      visualModal.style.display = "flex";
      visualModal.scrollTop = 0;

      document.body.style.overflow = "hidden";
    });
  }


  // =========================================
  // 📷 FILE SELECT
  // =========================================

  if (visualSelect && visualInput) {

    visualSelect.addEventListener("click", () => {
      visualInput.click();
    });
  }


  if (
    visualInput &&
    visualPreview &&
    visualPreviewImage
  ) {

    visualInput.addEventListener("change", () => {

      const file = visualInput.files[0];

      if (!file) return;

      const reader = new FileReader();

      reader.onload = () => {
        visualPreviewImage.src = reader.result;
        visualPreview.style.display = "block";
      };

      reader.readAsDataURL(file);
    });
  }


  // =========================================
  // ❌ CANCEL
  // =========================================

  if (visualCancel && visualModal) {

    visualCancel.addEventListener("click", () => {

      visualModal.style.display = "none";

      if (visualInput) {
        visualInput.value = "";
      }

      if (visualPreviewImage) {
        visualPreviewImage.src = "";
      }

      if (visualPreview) {
        visualPreview.style.display = "none";
      }

      if (visualMemo) {
        visualMemo.value = "";
      }

      if (visualSave) {
        delete visualSave.dataset.editId;
        visualSave.textContent = "💎 SAVE";
      }

      if (visualDelete) {
        visualDelete.style.display = "none";
        delete visualDelete.dataset.deleteId;
      }

      document.body.style.overflow = "";
    });
  }


  // =========================================
  // 💾 IndexedDB
  // =========================================

  const DB_NAME =
    `treasure-day-jihoon-growth-${year}-db`;

  const DB_VERSION = 1;

  const STORE = "visuals";

  let db = null;


  function openDB() {

    return new Promise((resolve, reject) => {

      const request =
        indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {

        const database =
          event.target.result;

        if (
          !database.objectStoreNames.contains(STORE)
        ) {

          database.createObjectStore(
            STORE,
            {
              keyPath: "id"
            }
          );
        }
      };


      request.onsuccess = (event) => {

        db = event.target.result;

        resolve(db);
      };


      request.onerror = () => {

        reject(request.error);
      };
    });
  }


  async function getVisuals() {

    if (!db) {
      await openDB();
    }

    return new Promise((resolve, reject) => {

      const transaction =
        db.transaction(
          STORE,
          "readonly"
        );

      const store =
        transaction.objectStore(STORE);

      const request =
        store.getAll();

      request.onsuccess = () => {
        resolve(request.result || []);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }


  async function saveVisual(item) {

    if (!db) {
      await openDB();
    }

    return new Promise((resolve, reject) => {

      const transaction =
        db.transaction(
          STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(STORE);

      const request =
        store.put(item);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }


  async function deleteVisual(id) {

    if (!db) {
      await openDB();
    }

    return new Promise((resolve, reject) => {

      const transaction =
        db.transaction(
          STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(STORE);

      const request =
        store.delete(id);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }


  // =========================================
  // 💎 SAVE / UPDATE
  // =========================================

  if (visualSave) {

    visualSave.addEventListener(
      "click",
      async () => {

        try {

          const imageData =
            visualPreviewImage?.src || "";

          if (!imageData) {

            alert("先に写真を選んでね 📸");

            return;
          }


          const editId =
            visualSave.dataset.editId
              ? Number(
                  visualSave.dataset.editId
                )
              : null;


          let createdAt =
            Date.now();

          if (editId) {

            const existing =
              (await getVisuals())
                .find(
                  (item) =>
                    item.id === editId
                );

            createdAt =
              existing?.createdAt ||
              Date.now();
          }


          const itemToSave = {

            id:
              editId ||
              Date.now(),

            imageData,

            hairColor:
              visualHair?.value ||
              "OTHER",

            memo:
              visualMemo?.value.trim() ||
              "",

            createdAt
          };


          await saveVisual(
            itemToSave
          );

          await renderVisuals();


          visualModal.style.display =
            "none";


          if (visualInput) {
            visualInput.value = "";
          }

          if (visualPreviewImage) {
            visualPreviewImage.src = "";
          }

          if (visualPreview) {
            visualPreview.style.display =
              "none";
          }

          if (visualMemo) {
            visualMemo.value = "";
          }

          delete visualSave.dataset.editId;

          visualSave.textContent =
            "💎 SAVE";


          if (visualDelete) {

            visualDelete.style.display =
              "none";

            delete visualDelete.dataset.deleteId;
          }


          document.body.style.overflow =
            "hidden";


        } catch (error) {

          console.error(
            `${year} VISUAL SAVE ERROR`,
            error
          );

          alert(
            "保存に失敗しました😭"
          );
        }
      }
    );
  }


  // =========================================
  // 🗑 DELETE
  // =========================================

  if (visualDelete) {

    visualDelete.addEventListener(
      "click",
      async () => {

        const id =
          Number(
            visualDelete.dataset.deleteId
          );

        if (!id) return;


        const ok =
          confirm(
            `この${year} VISUALを削除する？🥲`
          );

        if (!ok) return;


        try {

          await deleteVisual(id);

          await renderVisuals();

          visualModal.style.display =
            "none";


          if (visualSave) {

            delete visualSave.dataset.editId;

            visualSave.textContent =
              "💎 SAVE";
          }


          delete visualDelete.dataset.deleteId;

          visualDelete.style.display =
            "none";


          if (visualInput) {
            visualInput.value = "";
          }

          if (visualPreviewImage) {
            visualPreviewImage.src = "";
          }

          if (visualPreview) {
            visualPreview.style.display =
              "none";
          }

          if (visualMemo) {
            visualMemo.value = "";
          }


          document.body.style.overflow =
            "hidden";


        } catch (error) {

          console.error(
            `${year} VISUAL DELETE ERROR`,
            error
          );

          alert(
            "削除に失敗しました😭"
          );
        }
      }
    );
  }


  // =========================================
  // 🖼️ RENDER
  // =========================================

  async function renderVisuals() {

    if (!visualGrid) return;


    const items =
      await getVisuals();


    items.sort(
      (a, b) =>
        (b.createdAt || 0) -
        (a.createdAt || 0)
    );


    if (items.length === 0) {

      visualGrid.innerHTML = `
        <div class="jihoon-growth-visual-empty">
          <span>📷</span>
          <strong>まだ写真がありません</strong>
          <small>
            好きな${year}ジフンを追加してみよう 🐶
          </small>
        </div>
      `;

      return;
    }


    visualGrid.innerHTML =
      items
        .map(
          (item) => `
            <article
              class="jihoon-growth-visual-card"
              data-id="${item.id}"
            >

              <div class="jihoon-growth-visual-photo">

                <img
                  src="${item.imageData}"
                  alt="${year} JIHOON"
                >

              </div>

              <div class="jihoon-growth-visual-info">

                <span class="jihoon-growth-visual-hair">
                  ${item.hairColor || "OTHER"}
                </span>

                ${
                  item.memo
                    ? `<p>${item.memo}</p>`
                    : `
                      <p class="jihoon-growth-visual-no-note">
                        NO NOTE
                      </p>
                    `
                }

              </div>

            </article>
          `
        )
        .join("");


    const cards =
      visualGrid.querySelectorAll(
        ".jihoon-growth-visual-card"
      );


    cards.forEach((card) => {

      card.addEventListener(
        "click",
        async () => {

          const id =
            Number(card.dataset.id);


          const item =
            (await getVisuals())
              .find(
                (visual) =>
                  visual.id === id
              );

          if (!item) return;


          visualModal.style.display =
            "flex";

          visualModal.scrollTop = 0;


          visualPreviewImage.src =
            item.imageData;

          visualPreview.style.display =
            "block";


          if (visualHair) {

            visualHair.value =
              item.hairColor ||
              "OTHER";
          }


          if (visualMemo) {

            visualMemo.value =
              item.memo ||
              "";
          }


          visualSave.textContent =
            "💎 UPDATE";

          visualSave.dataset.editId =
            String(item.id);


          if (visualDelete) {

            visualDelete.style.display =
              "block";

            visualDelete.dataset.deleteId =
              String(item.id);
          }


          document.body.style.overflow =
            "hidden";
        }
      );
    });
  }
}


// =========================================
// 🌱 ACTIVE YEARS
// =========================================

setupJihoonGrowthYear(2021);
setupJihoonGrowthYear(2022);
setupJihoonGrowthYear(2023);
setupJihoonGrowthYear(2024);
setupJihoonGrowthYear(2025);
setupJihoonGrowthYear(2026);
// =========================================
// 🎧 JIHOON'S SONG
// =========================================

const jihoonSongOpen =
  document.getElementById("jihoonSongOpen");

const jihoonSongPage =
  document.getElementById("jihoonSongPage");

const jihoonSongBack =
  document.getElementById("jihoonSongBack");

const jihoonSongTitle =
  document.getElementById("jihoonSongTitle");

const jihoonSongMemo =
  document.getElementById("jihoonSongMemo");

const jihoonSongSave =
  document.getElementById("jihoonSongSave");

const jihoonSongCancel =
  document.getElementById("jihoonSongCancel");

const jihoonSongList =
  document.getElementById("jihoonSongList");


let jihoonSongs = [];

try {
  jihoonSongs =
    JSON.parse(
      localStorage.getItem("treasure-jihoon-songs")
    ) || [];
} catch (error) {
  jihoonSongs = [];
}


// =========================================
// 🎧 OPEN / BACK
// =========================================

if (
  jihoonSongOpen &&
  jihoonSongPage &&
  jihoonBookDetail
) {
  jihoonSongOpen.addEventListener("click", () => {

    jihoonBookDetail.classList.remove("active");

    jihoonSongPage.style.display = "block";
    jihoonSongPage.scrollTop = 0;

    renderJihoonSongs();

    document.body.style.overflow = "hidden";
  });
}


if (
  jihoonSongBack &&
  jihoonSongPage &&
  jihoonBookDetail
) {
  jihoonSongBack.addEventListener("click", () => {

    jihoonSongPage.style.display = "none";

    jihoonBookDetail.classList.add("active");
    jihoonBookDetail.scrollTop = 0;

    resetJihoonSongForm();

    document.body.style.overflow = "hidden";
  });
}


// =========================================
// 💾 SAVE / UPDATE
// =========================================

if (jihoonSongSave) {

  jihoonSongSave.addEventListener("click", () => {

    const title =
      jihoonSongTitle?.value.trim() || "";

    const memo =
      jihoonSongMemo?.value.trim() || "";

    if (!title) {
      alert("曲名を入力してね 🎧");
      return;
    }


    const editId =
      jihoonSongSave.dataset.editId
        ? Number(jihoonSongSave.dataset.editId)
        : null;


    if (editId) {

      const item =
        jihoonSongs.find(
          (song) => song.id === editId
        );

      if (!item) return;

      item.title = title;
      item.memo = memo;

    } else {

      jihoonSongs.unshift({
        id: Date.now(),
        title,
        memo,
        favorite: false,
        createdAt: Date.now()
      });
    }


    saveJihoonSongs();

    renderJihoonSongs();

    resetJihoonSongForm();
  });
}


// =========================================
// ❌ CANCEL EDIT
// =========================================

if (jihoonSongCancel) {

  jihoonSongCancel.addEventListener(
    "click",
    () => {
      resetJihoonSongForm();
    }
  );
}


// =========================================
// 💎 LOCAL STORAGE SAVE
// =========================================

function saveJihoonSongs() {

  localStorage.setItem(
    "treasure-jihoon-songs",
    JSON.stringify(jihoonSongs)
  );
}


// =========================================
// 🔄 FORM RESET
// =========================================

function resetJihoonSongForm() {

  if (jihoonSongTitle) {
    jihoonSongTitle.value = "";
  }

  if (jihoonSongMemo) {
    jihoonSongMemo.value = "";
  }

  if (jihoonSongSave) {
    delete jihoonSongSave.dataset.editId;
    jihoonSongSave.textContent =
      "💎 SAVE SONG";
  }

  if (jihoonSongCancel) {
    jihoonSongCancel.style.display =
      "none";
  }
}


// =========================================
// 🎧 SONG LIST RENDER
// =========================================

function renderJihoonSongs() {

  if (!jihoonSongList) return;


  if (jihoonSongs.length === 0) {

    jihoonSongList.innerHTML = `
      <div class="jihoon-song-empty">
        <span>🎧</span>
        <strong>まだ曲がありません</strong>
        <small>
          ジフンを思い浮かべる曲を追加してみよう 🐶
        </small>
      </div>
    `;

    return;
  }


  const sortedSongs =
    [...jihoonSongs].sort(
      (a, b) => {

        if (a.favorite !== b.favorite) {
          return Number(b.favorite) -
                 Number(a.favorite);
        }

        return (
          (b.createdAt || 0) -
          (a.createdAt || 0)
        );
      }
    );


  jihoonSongList.innerHTML =
    sortedSongs
      .map(
        (song) => `
          <article
            class="jihoon-song-card ${
              song.favorite
                ? "is-favorite"
                : ""
            }"
            data-id="${song.id}"
          >

            <button
              type="button"
              class="jihoon-song-favorite"
              data-action="favorite"
            >
              ${
                song.favorite
                  ? "⭐️ JIHOON'S SONG"
                  : "☆ FAVORITE"
              }
            </button>

            <div class="jihoon-song-card-title">
              🎧 ${escapeJihoonSongHTML(song.title)}
            </div>

            ${
              song.memo
                ? `
                  <p>
                    ${escapeJihoonSongHTML(song.memo)}
                  </p>
                `
                : `
                  <p class="jihoon-song-no-note">
                    NO NOTE
                  </p>
                `
            }

            <div class="jihoon-song-actions">

              <button
                type="button"
                data-action="edit"
              >
                ✏️ EDIT
              </button>

              <button
                type="button"
                data-action="delete"
              >
                🗑 DELETE
              </button>

            </div>

          </article>
        `
      )
      .join("");


  const cards =
    jihoonSongList.querySelectorAll(
      ".jihoon-song-card"
    );


  cards.forEach((card) => {

    const id =
      Number(card.dataset.id);


    card.addEventListener(
      "click",
      (event) => {

        const button =
          event.target.closest(
            "button[data-action]"
          );

        if (!button) return;


        const action =
          button.dataset.action;


        // ⭐️ FAVORITE
        if (action === "favorite") {

          jihoonSongs.forEach(
            (song) => {
              song.favorite =
                song.id === id
                  ? !song.favorite
                  : false;
            }
          );

          saveJihoonSongs();

          renderJihoonSongs();

          return;
        }


        // ✏️ EDIT
        if (action === "edit") {

          const song =
            jihoonSongs.find(
              (item) => item.id === id
            );

          if (!song) return;


          if (jihoonSongTitle) {
            jihoonSongTitle.value =
              song.title || "";
          }

          if (jihoonSongMemo) {
            jihoonSongMemo.value =
              song.memo || "";
          }

          if (jihoonSongSave) {

            jihoonSongSave.dataset.editId =
              String(song.id);

            jihoonSongSave.textContent =
              "💎 UPDATE SONG";
          }

          if (jihoonSongCancel) {
            jihoonSongCancel.style.display =
              "block";
          }

          jihoonSongPage.scrollTop = 0;

          return;
        }


        // 🗑 DELETE
        if (action === "delete") {

          const ok =
            confirm(
              "この曲を削除する？🎧"
            );

          if (!ok) return;


          jihoonSongs =
            jihoonSongs.filter(
              (song) =>
                song.id !== id
            );


          saveJihoonSongs();

          renderJihoonSongs();

          resetJihoonSongForm();
        }
      }
    );
  });
}


// =========================================
// 🛡 HTML ESCAPE
// =========================================

function escapeJihoonSongHTML(text) {

  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


// 最初の表示
renderJihoonSongs();
// ========================================
// 🐶 JIHOON CHEMISTRY
// Shared engine integration is initialized at the end of this file.
// ========================================

// =========================================
// 📸 JIHOON VISUAL BOOK - IndexedDB SAVE
// =========================================

const jihoonVisualAdd = document.getElementById("jihoonVisualAdd");
const jihoonVisualInput = document.getElementById("jihoonVisualInput");
const jihoonVisualGrid = document.getElementById("jihoonVisualGrid");

const JIHOON_VISUAL_DB_NAME = "treasure-day-visual-db";
const JIHOON_VISUAL_DB_VERSION = 1;
const JIHOON_VISUAL_STORE = "jihoonVisuals";

let jihoonVisualDB;


// =========================================
// IndexedDB OPEN
// =========================================

function openJihoonVisualDB() {
  return new Promise((resolve, reject) => {

    const request = indexedDB.open(
      JIHOON_VISUAL_DB_NAME,
      JIHOON_VISUAL_DB_VERSION
    );

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(JIHOON_VISUAL_STORE)) {
        db.createObjectStore(
          JIHOON_VISUAL_STORE,
          {
            keyPath: "id",
            autoIncrement: true
          }
        );
      }
    };

    request.onsuccess = (event) => {
      jihoonVisualDB = event.target.result;
      resolve(jihoonVisualDB);
    };

    request.onerror = () => {
      reject(request.error);
    };

  });
}


// =========================================
// 写真保存
// =========================================

// =========================================
// 📸 画像を安定保存用DataURLへ変換
// =========================================

function jihoonImageToDataURL(file) {
  return new Promise((resolve, reject) => {

    const reader = new FileReader();

    reader.onload = () => {

      const img = new Image();

      img.onload = () => {

        const MAX_SIZE = 1600;

        let width = img.naturalWidth;
        let height = img.naturalHeight;

        if (width > height && width > MAX_SIZE) {
          height = Math.round(height * MAX_SIZE / width);
          width = MAX_SIZE;
        } else if (height >= width && height > MAX_SIZE) {
          width = Math.round(width * MAX_SIZE / height);
          height = MAX_SIZE;
        }

        const canvas = document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Canvas is not available"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        const imageData =
          canvas.toDataURL("image/jpeg", 0.86);

        resolve(imageData);

      };

      img.onerror = () => {
        reject(new Error("Image decode failed"));
      };

      img.src = reader.result;

    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsDataURL(file);

  });
}


// =========================================
// 📸 写真保存
// =========================================

async function saveJihoonVisual(file, hairColor) {

  if (!jihoonVisualDB) {
    throw new Error("Database is not ready");
  }

  const imageData =
    await jihoonImageToDataURL(file);

  return new Promise((resolve, reject) => {

    const transaction = jihoonVisualDB.transaction(
      JIHOON_VISUAL_STORE,
      "readwrite"
    );

    const store =
      transaction.objectStore(JIHOON_VISUAL_STORE);

    const data = {
      imageData: imageData,
      hairColor: hairColor,
      favorite: false,
      createdAt: Date.now()
    };

    const request = store.add(data);

    request.onsuccess = () => {

      data.id = request.result;

      resolve(data);

    };

    request.onerror = () => {
      reject(request.error);
    };

  });
}
// =========================================
// 写真一覧取得
// =========================================

function getJihoonVisuals() {
  return new Promise((resolve, reject) => {

    if (!jihoonVisualDB) {
      resolve([]);
      return;
    }

    const transaction = jihoonVisualDB.transaction(
      JIHOON_VISUAL_STORE,
      "readonly"
    );

    const store = transaction.objectStore(JIHOON_VISUAL_STORE);

    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result || []);
    };

    request.onerror = () => {
      reject(request.error);
    };

  });
}
// 👑 FAVORITEのジフンだけ取得
async function getJihoonFavoriteVisuals() {
  const visuals = await getJihoonVisuals();
  return visuals.filter(item => item.favorite === true);
}
// =====================================
// 👑 VISUAL RANKING 表示
// =====================================

async function loadJihoonVisualRanking() {
  if (!jihoonVisualRankingList) return;

  jihoonVisualRankingList.innerHTML = "";

  try {
    const favorites = await getJihoonFavoriteVisuals();
favorites.sort((a, b) => {
  const orderA = a.rankOrder ?? Number.MAX_SAFE_INTEGER;
  const orderB = b.rankOrder ?? Number.MAX_SAFE_INTEGER;

  return orderA - orderB;
});
// 👑 まだ順位がない写真に初期順位をつける
for (let i = 0; i < favorites.length; i++) {
  if (favorites[i].rankOrder == null) {
    favorites[i].rankOrder = i;
    await updateJihoonVisual(favorites[i]);
  }
}    
    if (favorites.length === 0) {
      jihoonVisualRankingList.innerHTML =
        '<div class="jihoon-ranking-empty">♡ FAVORITEした写真がまだありません</div>';
      return;
    }

    favorites.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "jihoon-visual-ranking-item";

      const rank = document.createElement("div");
      rank.className = "jihoon-visual-ranking-number";
     const rankLabels = ["🥇 1ST", "🥈 2ND", "🥉 3RD"];

rank.textContent =
  rankLabels[index] || `#${index + 1}`;
      const img = document.createElement("img");
      img.alt = "JIHOON VISUAL";
      img.loading = "lazy";
      img.decoding = "async";

      if (item.imageData) {
        img.src = item.imageData;
      }

card.appendChild(rank);
card.appendChild(img);

// 👑 順位変更ボタン
const controls = document.createElement("div");
controls.className = "jihoon-visual-ranking-controls";

const upButton = document.createElement("button");
upButton.type = "button";
upButton.textContent = "↑  UP";
upButton.className = "jihoon-ranking-move-button";

const downButton = document.createElement("button");
downButton.type = "button";
downButton.textContent = "DOWN  ↓";
downButton.className = "jihoon-ranking-move-button";

controls.appendChild(upButton);
controls.appendChild(downButton);
// ↑ ひとつ上へ
upButton.addEventListener("click", async () => {
  if (index === 0) return;

  const previousItem = favorites[index - 1];

  const currentOrder = item.rankOrder ?? index;
  const previousOrder = previousItem.rankOrder ?? index - 1;

  item.rankOrder = previousOrder;
  previousItem.rankOrder = currentOrder;

  await updateJihoonVisual(item);
  await updateJihoonVisual(previousItem);

  loadJihoonVisualRanking();
});

// ↓ ひとつ下へ
downButton.addEventListener("click", async () => {
  if (index === favorites.length - 1) return;

  const nextItem = favorites[index + 1];

  const currentOrder = item.rankOrder ?? index;
  const nextOrder = nextItem.rankOrder ?? index + 1;

  item.rankOrder = nextOrder;
  nextItem.rankOrder = currentOrder;

  await updateJihoonVisual(item);
  await updateJihoonVisual(nextItem);

  loadJihoonVisualRanking();
});
card.appendChild(controls);
jihoonVisualRankingList.appendChild(card);
    });
  } catch (error) {
    console.error("JIHOON VISUAL RANKING LOAD ERROR:", error);
  }
}
// =========================================
// 🔄 旧VISUALデータを新形式へ移行
// =========================================

async function migrateLegacyJihoonVisuals() {

  const visuals = await getJihoonVisuals();

  for (const item of visuals) {

    // すでに新形式なら何もしない
    if (item.imageData) continue;

    // 旧形式の画像がなければスキップ
    if (!item.image) continue;

    try {

      const imageData =
        await jihoonImageToDataURL(item.image);

      const updatedItem = {
        ...item,
        imageData: imageData
      };

      // 旧Blob/Fileは保存データから外す
      delete updatedItem.image;

      await updateJihoonVisual(updatedItem);

    } catch (error) {

      console.error(
        "JIHOON VISUAL MIGRATION ERROR:",
        item.id,
        error
      );

    }

  }
}
// =========================================
// 写真カード作成
// =========================================

function createJihoonVisualCard(item) {

  if (!jihoonVisualGrid) return;

  const card = document.createElement("div");
  card.className = "jihoon-visual-card";

  const hairColor = item.hairColor || "UNTAGGED";

  card.dataset.hair = hairColor;

const img = document.createElement("img");

img.alt = "JIHOON VISUAL";
img.decoding = "async";
img.loading = "lazy";

if (item.imageData) {
  img.src = item.imageData;
}
// 📸 写真タップ → EDIT画面を開く
card.addEventListener("click", () => {
  openJihoonVisualEdit(item);
});

  const hairTag = document.createElement("div");
  hairTag.className = "jihoon-visual-hair-tag";

  const hairLabels = {
    BLACK: "🖤 BLACK",
    BROWN: "🤎 BROWN",
    RED: "❤️ RED",
    PINK: "🩷 PINK",
    BLONDE: "💛 BLONDE",
    GRAY: "🩶 GRAY",
    OTHER: "✨ OTHER",
    UNTAGGED: "💎 UNTAGGED"
  };

hairTag.textContent =
  hairLabels[hairColor] || "✨ OTHER";

const favoriteBadge = document.createElement("div");
favoriteBadge.className = "jihoon-visual-favorite-badge";

if (item.favorite === true) {
  favoriteBadge.textContent = "♥";
  favoriteBadge.classList.add("show");
}

card.appendChild(img);
card.appendChild(hairTag);
card.appendChild(favoriteBadge);

jihoonVisualGrid.prepend(card);
}
// =========================================
// 📸 JIHOON VISUAL EDIT OPEN / CLOSE
// =========================================

const jihoonVisualEditModal =
  document.getElementById("jihoonVisualEditModal");

const jihoonVisualEditImage =
  document.getElementById("jihoonVisualEditImage");

const jihoonVisualEditCancel =
  document.getElementById("jihoonVisualEditCancel");
const jihoonVisualFavorite =
  document.getElementById("jihoonVisualFavorite");

const jihoonVisualChangeHair =
  document.getElementById("jihoonVisualChangeHair");
const jihoonVisualDelete =
  document.getElementById("jihoonVisualDelete");
let currentJihoonVisualItem = null;


// EDIT画面を開く
function openJihoonVisualEdit(item) {

  if (
    !jihoonVisualEditModal ||
    !jihoonVisualEditImage
  ) {
    return;
  }

  currentJihoonVisualItem = item;
if (jihoonVisualFavorite) {
  const isFavorite = item.favorite === true;

  jihoonVisualFavorite.textContent =
    isFavorite
      ? "♥ FAVORITED"
      : "♡ FAVORITE";

  jihoonVisualFavorite.classList.toggle(
    "active",
    isFavorite
  );
}


jihoonVisualEditImage.src =
  item.imageData || "";

jihoonVisualEditModal.classList.add("active");
}


// EDIT画面を閉じる
function closeJihoonVisualEdit() {

  if (!jihoonVisualEditModal) return;

  jihoonVisualEditModal.classList.remove("active");


  jihoonVisualEditImage.src = "";
  currentJihoonVisualItem = null;
}


// CANCEL
if (jihoonVisualEditCancel) {

  jihoonVisualEditCancel.addEventListener(
    "click",
    () => {
      closeJihoonVisualEdit();
    }
  );

}
// =========================================
// 🎨 JIHOON VISUAL CHANGE HAIR COLOR
// =========================================

const JIHOON_HAIR_OPTIONS = [
  ["BLACK", "🖤 BLACK"],
  ["BROWN", "🤎 BROWN"],
  ["RED", "❤️ RED"],
  ["PINK", "💗 PINK"],
  ["BLONDE", "💛 BLONDE"],
  ["GRAY", "🩶 GRAY"],
  ["OTHER", "✨ OTHER"],
  ["UNTAGGED", "💎 UNTAGGED"]
];
const jihoonHairChangeModal =
  document.getElementById("jihoonHairChangeModal");

const jihoonHairChangeCancel =
  document.getElementById("jihoonHairChangeCancel");

const jihoonHairChangeButtons =
  document.querySelectorAll(
    "#jihoonHairChangeModal [data-hair]"
  );
if (jihoonVisualChangeHair) {

  jihoonVisualChangeHair.addEventListener(
    "click",
    () => {

      if (!currentJihoonVisualItem) return;
      if (!jihoonHairChangeModal) return;

      jihoonHairChangeModal.classList.add("active");

    }
  );

}

jihoonHairChangeButtons.forEach((button) => {

  button.addEventListener(
    "click",
    async () => {

      if (!currentJihoonVisualItem) return;

      const newHairColor =
        button.dataset.hair;

      currentJihoonVisualItem.hairColor =
        newHairColor;

      try {

        await updateJihoonVisual(
          currentJihoonVisualItem
        );

        jihoonHairChangeModal.classList.remove(
          "active"
        );

        closeJihoonVisualEdit();

        await loadJihoonVisuals();

      } catch (error) {

        console.error(
          "JIHOON HAIR COLOR UPDATE ERROR:",
          error
        );

        alert("髪色の変更に失敗しました🥲");

      }

    }
  );

});

if (jihoonHairChangeCancel) {

  jihoonHairChangeCancel.addEventListener(
    "click",
    () => {

      jihoonHairChangeModal.classList.remove(
        "active"
      );

    }
  );

}
// =========================================
// ♡ JIHOON VISUAL FAVORITE
// =========================================

function updateJihoonVisual(item) {
  return new Promise((resolve, reject) => {

    if (!jihoonVisualDB || !item) {
      reject(new Error("Database or item is not ready"));
      return;
    }

    const transaction = jihoonVisualDB.transaction(
      JIHOON_VISUAL_STORE,
      "readwrite"
    );

    const store =
      transaction.objectStore(JIHOON_VISUAL_STORE);

    const request = store.put(item);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };

  });
}
// ==============================
// 🗑️ JIHOON VISUAL DELETE
// ==============================

function deleteJihoonVisual(item) {
  return new Promise((resolve, reject) => {

    if (!jihoonVisualDB || !item) {
      reject(new Error("Database or item is not ready"));
      return;
    }

    const transaction = jihoonVisualDB.transaction(
      JIHOON_VISUAL_STORE,
      "readwrite"
    );

    const store = transaction.objectStore(JIHOON_VISUAL_STORE);
    const request = store.delete(item.id);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };

  });
}

if (jihoonVisualFavorite) {

  jihoonVisualFavorite.addEventListener(
    "click",
    async () => {

      if (!currentJihoonVisualItem) return;

      currentJihoonVisualItem.favorite =
        currentJihoonVisualItem.favorite !== true;

      try {

        await updateJihoonVisual(
          currentJihoonVisualItem
        );

        const isFavorite =
          currentJihoonVisualItem.favorite === true;

        jihoonVisualFavorite.textContent =
          isFavorite
            ? "♥ FAVORITED"
            : "♡ FAVORITE";

        jihoonVisualFavorite.classList.toggle(
          "active",
          isFavorite
        );

      } catch (error) {

        console.error(
          "JIHOON FAVORITE ERROR:",
          error
        );

      }

    }
  );

}
// ==============================
// 🗑️ JIHOON VISUAL DELETE CLICK
// ==============================

if (jihoonVisualDelete) {

  jihoonVisualDelete.addEventListener(
    "click",
    async () => {

      if (!currentJihoonVisualItem) return;

      const ok = confirm(
        "このジフンをVISUAL BOOKから削除しますか？🥲"
      );

      if (!ok) return;

      try {

        await deleteJihoonVisual(
          currentJihoonVisualItem
        );

        closeJihoonVisualEdit();

        await loadJihoonVisuals();

      } catch (error) {

        console.error(
          "JIHOON VISUAL DELETE ERROR:",
          error
        );

        alert("削除に失敗しました🥲");

      }

    }
  );

}
// =========================================
// 保存済み写真を表示
// =========================================

async function loadJihoonVisuals() {

  if (!jihoonVisualGrid) return;

  jihoonVisualGrid.innerHTML = "";

  try {

    const visuals = await getJihoonVisuals();

    visuals
      .sort((a, b) => a.createdAt - b.createdAt)
      .forEach((item) => {
        createJihoonVisualCard(item);
      });

  } catch (error) {
    console.error("JIHOON VISUAL LOAD ERROR:", error);
  }

}


// =========================================
// ＋ ADD VISUAL
// =========================================

if (jihoonVisualAdd && jihoonVisualInput) {

  jihoonVisualAdd.addEventListener("click", () => {
    jihoonVisualInput.click();
  });

}


// =========================================
// 🎨 JIHOON HAIR COLOR SELECT
// =========================================

const jihoonHairModal =
  document.getElementById("jihoonHairModal");

const jihoonHairButtons =
  document.querySelectorAll(".jihoon-hair-options button");

const jihoonHairCancel =
  document.getElementById("jihoonHairCancel");

let pendingJihoonVisualFile = null;


// 写真を選んだら髪色選択へ
if (jihoonVisualInput) {

  jihoonVisualInput.addEventListener("change", () => {

    const file = jihoonVisualInput.files[0];

    if (!file) return;

    pendingJihoonVisualFile = file;

    if (jihoonHairModal) {
      jihoonHairModal.classList.add("active");
    }

  });

}


// 髪色を選択 → 保存
jihoonHairButtons.forEach((button) => {

  button.addEventListener("click", async () => {

    if (!pendingJihoonVisualFile) return;

    const hairColor = button.dataset.hair;

    try {

const savedItem =
  await saveJihoonVisual(
    pendingJihoonVisualFile,
    hairColor
  );

createJihoonVisualCard(savedItem);

    } catch (error) {

      console.error(
        "JIHOON VISUAL SAVE ERROR:",
        error
      );

      alert("写真の保存に失敗しました🥲");

    }

    pendingJihoonVisualFile = null;
    jihoonVisualInput.value = "";

    jihoonHairModal.classList.remove("active");

  });

});


// CANCEL
if (jihoonHairCancel) {

  jihoonHairCancel.addEventListener("click", () => {

    pendingJihoonVisualFile = null;
    jihoonVisualInput.value = "";

    jihoonHairModal.classList.remove("active");

  });

}


// =========================================
// 初期化
// =========================================

openJihoonVisualDB()
  .then(async () => {

    // 旧写真を一度だけ新形式へ移行
    await migrateLegacyJihoonVisuals();

    // 移行後のデータを表示
    await loadJihoonVisuals();

  })
  .catch((error) => {
    console.error(
      "JIHOON VISUAL DB ERROR:",
      error
    );
  });
// =========================================
// 🎨 JIHOON HAIR FILTER
// =========================================

const jihoonHairFilters =
  document.querySelectorAll(".jihoon-hair-filter button");


jihoonHairFilters.forEach((button) => {

  button.addEventListener("click", () => {

    const selectedHair = button.dataset.hair;

    jihoonHairFilters.forEach((filterButton) => {
      filterButton.classList.remove("active");
    });

    button.classList.add("active");


    const cards =
      document.querySelectorAll(".jihoon-visual-card");


    cards.forEach((card) => {

      if (
        selectedHair === "ALL" ||
        card.dataset.hair === selectedHair
      ) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }

    });

  });

});
// =========================================
// 💎 HYUNSUK VISUAL BOOK
// SAVE / FILTER / FAVORITE / EDIT / DELETE
// =========================================

const hyunsukVisualAdd =
  document.getElementById("hyunsukVisualAdd");

const hyunsukVisualInput =
  document.getElementById("hyunsukVisualInput");

const hyunsukVisualGrid =
  document.getElementById("hyunsukVisualGrid");

const hyunsukHairModal =
  document.getElementById("hyunsukHairModal");

const hyunsukHairCancel =
  document.getElementById("hyunsukHairCancel");

const hyunsukVisualEditModal =
  document.getElementById("hyunsukVisualEditModal");

const hyunsukVisualEditImage =
  document.getElementById("hyunsukVisualEditImage");

const hyunsukVisualEditCancel =
  document.getElementById("hyunsukVisualEditCancel");

const hyunsukVisualFavorite =
  document.getElementById("hyunsukVisualFavorite");

const hyunsukVisualChangeHair =
  document.getElementById("hyunsukVisualChangeHair");

const hyunsukVisualDelete =
  document.getElementById("hyunsukVisualDelete");

const hyunsukHairChangeModal =
  document.getElementById("hyunsukHairChangeModal");

const hyunsukHairChangeCancel =
  document.getElementById("hyunsukHairChangeCancel");


// =========================================
// 💾 HYUNSUK専用 IndexedDB
// =========================================

const HYUNSUK_VISUAL_DB_NAME =
  "treasure-day-hyunsuk-visual-db";

const HYUNSUK_VISUAL_DB_VERSION = 1;

const HYUNSUK_VISUAL_STORE =
  "hyunsukVisuals";

let hyunsukVisualDB;


// DB OPEN
function openHyunsukVisualDB() {

  return new Promise((resolve, reject) => {

    const request =
      indexedDB.open(
        HYUNSUK_VISUAL_DB_NAME,
        HYUNSUK_VISUAL_DB_VERSION
      );

    request.onupgradeneeded = (event) => {

      const db = event.target.result;

      if (
        !db.objectStoreNames.contains(
          HYUNSUK_VISUAL_STORE
        )
      ) {

        db.createObjectStore(
          HYUNSUK_VISUAL_STORE,
          {
            keyPath: "id",
            autoIncrement: true
          }
        );
      }
    };

    request.onsuccess = (event) => {

      hyunsukVisualDB =
        event.target.result;

      resolve(hyunsukVisualDB);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}


// =========================================
// 📸 IMAGE → DataURL
// =========================================

function hyunsukImageToDataURL(file) {

  return new Promise((resolve, reject) => {

    const reader = new FileReader();

    reader.onload = () => {

      const img = new Image();

      img.onload = () => {

        const MAX_SIZE = 1600;

        let width = img.naturalWidth;
        let height = img.naturalHeight;

        if (
          width > height &&
          width > MAX_SIZE
        ) {

          height =
            Math.round(
              height * MAX_SIZE / width
            );

          width = MAX_SIZE;

        } else if (
          height >= width &&
          height > MAX_SIZE
        ) {

          width =
            Math.round(
              width * MAX_SIZE / height
            );

          height = MAX_SIZE;
        }

        const canvas =
          document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;

        const ctx =
          canvas.getContext("2d");

        if (!ctx) {
          reject(
            new Error(
              "Canvas is not available"
            )
          );
          return;
        }

        ctx.drawImage(
          img,
          0,
          0,
          width,
          height
        );

        const imageData =
          canvas.toDataURL(
            "image/jpeg",
            0.86
          );

        resolve(imageData);
      };

      img.onerror = () => {
        reject(
          new Error(
            "Image decode failed"
          )
        );
      };

      img.src = reader.result;
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsDataURL(file);
  });
}


// =========================================
// 💾 SAVE
// =========================================

async function saveHyunsukVisual(
  file,
  hairColor
) {

  if (!hyunsukVisualDB) {
    throw new Error(
      "Database is not ready"
    );
  }

  const imageData =
    await hyunsukImageToDataURL(file);

  return new Promise(
    (resolve, reject) => {

      const transaction =
        hyunsukVisualDB.transaction(
          HYUNSUK_VISUAL_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          HYUNSUK_VISUAL_STORE
        );

      const data = {
        imageData: imageData,
        hairColor: hairColor,
        favorite: false,
        createdAt: Date.now()
      };

      const request =
        store.add(data);

      request.onsuccess = () => {

        data.id = request.result;
        resolve(data);
      };

      request.onerror = () => {
        reject(request.error);
      };
    }
  );
}


// =========================================
// 📚 GET ALL
// =========================================

function getHyunsukVisuals() {

  return new Promise(
    (resolve, reject) => {

      if (!hyunsukVisualDB) {
        resolve([]);
        return;
      }

      const transaction =
        hyunsukVisualDB.transaction(
          HYUNSUK_VISUAL_STORE,
          "readonly"
        );

      const store =
        transaction.objectStore(
          HYUNSUK_VISUAL_STORE
        );

      const request =
        store.getAll();

      request.onsuccess = () => {
        resolve(
          request.result || []
        );
      };

      request.onerror = () => {
        reject(request.error);
      };
    }
  );
}


// =========================================
// ✏️ UPDATE
// =========================================

function updateHyunsukVisual(item) {

  return new Promise(
    (resolve, reject) => {

      if (
        !hyunsukVisualDB ||
        !item
      ) {
        reject(
          new Error(
            "Database or item is not ready"
          )
        );
        return;
      }

      const transaction =
        hyunsukVisualDB.transaction(
          HYUNSUK_VISUAL_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          HYUNSUK_VISUAL_STORE
        );

      const request =
        store.put(item);

      request.onsuccess =
        () => resolve();

      request.onerror =
        () => reject(
          request.error
        );
    }
  );
}


// =========================================
// 🗑️ DELETE
// =========================================

function deleteHyunsukVisual(item) {

  return new Promise(
    (resolve, reject) => {

      if (
        !hyunsukVisualDB ||
        !item
      ) {
        reject(
          new Error(
            "Database or item is not ready"
          )
        );
        return;
      }

      const transaction =
        hyunsukVisualDB.transaction(
          HYUNSUK_VISUAL_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          HYUNSUK_VISUAL_STORE
        );

      const request =
        store.delete(item.id);

      request.onsuccess =
        () => resolve();

      request.onerror =
        () => reject(
          request.error
        );
    }
  );
}


// =========================================
// 📸 CARD
// =========================================

let currentHyunsukVisualItem = null;

function createHyunsukVisualCard(item) {

  if (!hyunsukVisualGrid) return;

  const card =
    document.createElement("div");

  card.className =
    "jihoon-visual-card hyunsuk-visual-card";

  const hairColor =
    item.hairColor || "UNTAGGED";

  card.dataset.hair =
    hairColor;

  const img =
    document.createElement("img");

  img.alt =
    "HYUNSUK VISUAL";

  img.decoding = "async";
  img.loading = "lazy";

  if (item.imageData) {
    img.src = item.imageData;
  }

  const hairTag =
    document.createElement("div");

  hairTag.className =
    "jihoon-visual-hair-tag";

  const hairLabels = {
    BLACK: "🖤 BLACK",
    BROWN: "🤎 BROWN",
    RED: "❤️ RED",
    PINK: "🩷 PINK",
    BLONDE: "💛 BLONDE",
    GRAY: "🩶 GRAY",
    OTHER: "✨ OTHER",
    UNTAGGED: "💎 UNTAGGED"
  };

  hairTag.textContent =
    hairLabels[hairColor] ||
    "✨ OTHER";

  const favoriteBadge =
    document.createElement("div");

  favoriteBadge.className =
    "jihoon-visual-favorite-badge";

  if (item.favorite === true) {

    favoriteBadge.textContent =
      "♥";

    favoriteBadge.classList.add(
      "show"
    );
  }

  card.addEventListener(
    "click",
    () => {
      openHyunsukVisualEdit(item);
    }
  );

  card.appendChild(img);
  card.appendChild(hairTag);
  card.appendChild(favoriteBadge);

  hyunsukVisualGrid.prepend(card);
}


// =========================================
// 📚 LOAD
// =========================================

async function loadHyunsukVisuals() {

  if (!hyunsukVisualGrid) return;

  hyunsukVisualGrid.innerHTML = "";

  try {

    const visuals =
      await getHyunsukVisuals();

    visuals
      .sort(
        (a, b) =>
          a.createdAt - b.createdAt
      )
      .forEach(
        (item) => {
          createHyunsukVisualCard(
            item
          );
        }
      );

  } catch (error) {

    console.error(
      "HYUNSUK VISUAL LOAD ERROR:",
      error
    );
  }
}


// =========================================
// ＋ ADD VISUAL
// =========================================

if (
  hyunsukVisualAdd &&
  hyunsukVisualInput
) {

  hyunsukVisualAdd.addEventListener(
    "click",
    () => {
      hyunsukVisualInput.click();
    }
  );
}


// =========================================
// 🎨 ADD時 HAIR SELECT
// =========================================

const hyunsukHairButtons =
  hyunsukHairModal
    ? hyunsukHairModal.querySelectorAll(
        "[data-hair]"
      )
    : [];

let pendingHyunsukVisualFile =
  null;


if (hyunsukVisualInput) {

  hyunsukVisualInput.addEventListener(
    "change",
    () => {

      const file =
        hyunsukVisualInput.files[0];

      if (!file) return;

      pendingHyunsukVisualFile =
        file;

      if (hyunsukHairModal) {
        hyunsukHairModal.classList.add(
          "active"
        );
      }
    }
  );
}


hyunsukHairButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      async () => {

        if (
          !pendingHyunsukVisualFile
        ) {
          return;
        }

        const hairColor =
          button.dataset.hair;

        try {

          const savedItem =
            await saveHyunsukVisual(
              pendingHyunsukVisualFile,
              hairColor
            );

          createHyunsukVisualCard(
            savedItem
          );

        } catch (error) {

          console.error(
            "HYUNSUK VISUAL SAVE ERROR:",
            error
          );

          alert(
            "写真の保存に失敗しました🥲"
          );
        }

        pendingHyunsukVisualFile =
          null;

        hyunsukVisualInput.value =
          "";

        if (hyunsukHairModal) {
          hyunsukHairModal.classList.remove(
            "active"
          );
        }
      }
    );
  }
);


// CANCEL
if (hyunsukHairCancel) {

  hyunsukHairCancel.addEventListener(
    "click",
    () => {

      pendingHyunsukVisualFile =
        null;

      if (hyunsukVisualInput) {
        hyunsukVisualInput.value =
          "";
      }

      if (hyunsukHairModal) {
        hyunsukHairModal.classList.remove(
          "active"
        );
      }
    }
  );
}


// =========================================
// ✏️ EDIT OPEN / CLOSE
// =========================================

function openHyunsukVisualEdit(item) {

  if (
    !hyunsukVisualEditModal ||
    !hyunsukVisualEditImage
  ) {
    return;
  }

  currentHyunsukVisualItem =
    item;

  hyunsukVisualEditImage.src =
    item.imageData || "";

  if (hyunsukVisualFavorite) {

    const isFavorite =
      item.favorite === true;

    hyunsukVisualFavorite.textContent =
      isFavorite
        ? "♥ FAVORITED"
        : "♡ FAVORITE";

    hyunsukVisualFavorite.classList.toggle(
      "active",
      isFavorite
    );
  }

  hyunsukVisualEditModal.classList.add(
    "active"
  );
}


function closeHyunsukVisualEdit() {

  if (!hyunsukVisualEditModal) {
    return;
  }

  hyunsukVisualEditModal.classList.remove(
    "active"
  );

  if (hyunsukVisualEditImage) {
    hyunsukVisualEditImage.src =
      "";
  }

  currentHyunsukVisualItem =
    null;
}


if (hyunsukVisualEditCancel) {

  hyunsukVisualEditCancel.addEventListener(
    "click",
    closeHyunsukVisualEdit
  );
}


// =========================================
// ♡ FAVORITE
// =========================================

if (hyunsukVisualFavorite) {

  hyunsukVisualFavorite.addEventListener(
    "click",
    async () => {

      if (
        !currentHyunsukVisualItem
      ) {
        return;
      }

      currentHyunsukVisualItem.favorite =
        currentHyunsukVisualItem.favorite
          !== true;

      await updateHyunsukVisual(
        currentHyunsukVisualItem
      );

      const isFavorite =
        currentHyunsukVisualItem.favorite
          === true;

      hyunsukVisualFavorite.textContent =
        isFavorite
          ? "♥ FAVORITED"
          : "♡ FAVORITE";

      hyunsukVisualFavorite.classList.toggle(
        "active",
        isFavorite
      );

      await loadHyunsukVisuals();
    }
  );
}


// =========================================
// 🎨 CHANGE HAIR
// =========================================

const hyunsukHairChangeButtons =
  hyunsukHairChangeModal
    ? hyunsukHairChangeModal.querySelectorAll(
        "[data-hair]"
      )
    : [];


if (hyunsukVisualChangeHair) {

  hyunsukVisualChangeHair.addEventListener(
    "click",
    () => {

      if (
        !currentHyunsukVisualItem ||
        !hyunsukHairChangeModal
      ) {
        return;
      }

      hyunsukHairChangeModal.classList.add(
        "active"
      );
    }
  );
}


hyunsukHairChangeButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      async () => {

        if (
          !currentHyunsukVisualItem
        ) {
          return;
        }

        currentHyunsukVisualItem.hairColor =
          button.dataset.hair;

        await updateHyunsukVisual(
          currentHyunsukVisualItem
        );

        if (hyunsukHairChangeModal) {
          hyunsukHairChangeModal.classList.remove(
            "active"
          );
        }

        closeHyunsukVisualEdit();

        await loadHyunsukVisuals();
      }
    );
  }
);


if (hyunsukHairChangeCancel) {

  hyunsukHairChangeCancel.addEventListener(
    "click",
    () => {

      if (hyunsukHairChangeModal) {
        hyunsukHairChangeModal.classList.remove(
          "active"
        );
      }
    }
  );
}


// =========================================
// 🗑️ DELETE
// =========================================

if (hyunsukVisualDelete) {

  hyunsukVisualDelete.addEventListener(
    "click",
    async () => {

      if (
        !currentHyunsukVisualItem
      ) {
        return;
      }

      const ok =
        confirm(
          "このヒョンソクをVISUAL BOOKから削除しますか？🥲"
        );

      if (!ok) return;

      try {

        await deleteHyunsukVisual(
          currentHyunsukVisualItem
        );

        closeHyunsukVisualEdit();

        await loadHyunsukVisuals();

      } catch (error) {

        console.error(
          "HYUNSUK VISUAL DELETE ERROR:",
          error
        );

        alert(
          "削除に失敗しました🥲"
        );
      }
    }
  );
}


// =========================================
// 🎨 FILTER
// =========================================

const hyunsukHairFilters =
  document.querySelectorAll(
    ".hyunsuk-hair-filter button"
  );


hyunsukHairFilters.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const selectedHair =
          button.dataset.hair;

        hyunsukHairFilters.forEach(
          (filterButton) => {
            filterButton.classList.remove(
              "active"
            );
          }
        );

        button.classList.add(
          "active"
        );

        const cards =
          document.querySelectorAll(
            ".hyunsuk-visual-card"
          );

        cards.forEach(
          (card) => {

            if (
              selectedHair === "ALL" ||
              card.dataset.hair ===
                selectedHair
            ) {
              card.style.display = "";
            } else {
              card.style.display =
                "none";
            }
          }
        );
      }
    );
  }
);


// =========================================
// 🚀 INITIALIZE
// =========================================

openHyunsukVisualDB()
  .then(async () => {

    await loadHyunsukVisuals();

  })
  .catch((error) => {

    console.error(
      "HYUNSUK VISUAL DB ERROR:",
      error
    );
  });
// =========================================
// 👑 HYUNSUK VISUAL RANKING
// =========================================

const hyunsukVisualRankingList =
  document.getElementById("hyunsukVisualRankingList");


// FAVORITEだけ取得
async function getHyunsukFavoriteVisuals() {

  const visuals =
    await getHyunsukVisuals();

  return visuals.filter(
    (item) => item.favorite === true
  );
}


// ランキング表示
async function loadHyunsukVisualRanking() {

  if (!hyunsukVisualRankingList) return;

  hyunsukVisualRankingList.innerHTML = "";

  try {

    const favorites =
      await getHyunsukFavoriteVisuals();

    favorites.sort(
      (a, b) => {

        const orderA =
          a.rankOrder ??
          Number.MAX_SAFE_INTEGER;

        const orderB =
          b.rankOrder ??
          Number.MAX_SAFE_INTEGER;

        return orderA - orderB;
      }
    );


    // まだ順位がない写真に初期順位
    for (
      let i = 0;
      i < favorites.length;
      i++
    ) {

      if (
        favorites[i].rankOrder == null
      ) {

        favorites[i].rankOrder = i;

        await updateHyunsukVisual(
          favorites[i]
        );
      }
    }


    if (favorites.length === 0) {

      hyunsukVisualRankingList.innerHTML =
        '<div class="jihoon-ranking-empty">♡ FAVORITEした写真がまだありません</div>';

      return;
    }


    favorites.forEach(
      (item, index) => {

        const card =
          document.createElement("div");

        card.className =
          "jihoon-visual-ranking-item";


        const rank =
          document.createElement("div");

        rank.className =
          "jihoon-visual-ranking-number";


        const rankLabels = [
          "🥇 1ST",
          "🥈 2ND",
          "🥉 3RD"
        ];

        rank.textContent =
          rankLabels[index] ||
          `#${index + 1}`;


        const img =
          document.createElement("img");

        img.alt =
          "HYUNSUK VISUAL";

        img.loading = "lazy";
        img.decoding = "async";

        if (item.imageData) {
          img.src = item.imageData;
        }


        card.appendChild(rank);
        card.appendChild(img);


        // =========================
        // ↑↓ 順位変更
        // =========================

        const controls =
          document.createElement("div");

        controls.className =
          "jihoon-visual-ranking-controls";


        const upButton =
          document.createElement("button");

        upButton.type = "button";
        upButton.textContent = "↑  UP";
        upButton.className =
          "jihoon-ranking-move-button";


        const downButton =
          document.createElement("button");

        downButton.type = "button";
        downButton.textContent =
          "DOWN  ↓";

        downButton.className =
          "jihoon-ranking-move-button";


        controls.appendChild(
          upButton
        );

        controls.appendChild(
          downButton
        );


        // ↑ 1つ上へ
        upButton.addEventListener(
          "click",
          async () => {

            if (index === 0) return;

            const previousItem =
              favorites[index - 1];

            const currentOrder =
              item.rankOrder ?? index;

            const previousOrder =
              previousItem.rankOrder ??
              index - 1;

            item.rankOrder =
              previousOrder;

            previousItem.rankOrder =
              currentOrder;

            await updateHyunsukVisual(
              item
            );

            await updateHyunsukVisual(
              previousItem
            );

            loadHyunsukVisualRanking();
          }
        );


        // ↓ 1つ下へ
        downButton.addEventListener(
          "click",
          async () => {

            if (
              index ===
              favorites.length - 1
            ) {
              return;
            }

            const nextItem =
              favorites[index + 1];

            const currentOrder =
              item.rankOrder ?? index;

            const nextOrder =
              nextItem.rankOrder ??
              index + 1;

            item.rankOrder =
              nextOrder;

            nextItem.rankOrder =
              currentOrder;

            await updateHyunsukVisual(
              item
            );

            await updateHyunsukVisual(
              nextItem
            );

            loadHyunsukVisualRanking();
          }
        );


        card.appendChild(
          controls
        );

        hyunsukVisualRankingList.appendChild(
          card
        );
      }
    );

  } catch (error) {

    console.error(
      "HYUNSUK VISUAL RANKING LOAD ERROR:",
      error
    );
  }
}
// =========================================
// 🌱 HYUNSUK GROWTH VISUAL
// 2020 - 2026 COMMON SYSTEM
// =========================================

const hyunsukGrowthVisualAdd =
  document.getElementById("hyunsukGrowthYearVisualAdd");

const hyunsukGrowthVisualGrid =
  document.getElementById("hyunsukGrowthYearVisualGrid");

const hyunsukGrowthVisualModal =
  document.getElementById("hyunsukGrowthVisualModal");

const hyunsukGrowthVisualInput =
  document.getElementById("hyunsukGrowthVisualInput");

const hyunsukGrowthVisualSelect =
  document.getElementById("hyunsukGrowthVisualSelect");

const hyunsukGrowthVisualPreview =
  document.getElementById("hyunsukGrowthVisualPreview");

const hyunsukGrowthVisualPreviewImage =
  document.getElementById("hyunsukGrowthVisualPreviewImage");

const hyunsukGrowthVisualHair =
  document.getElementById("hyunsukGrowthVisualHair");

const hyunsukGrowthVisualMemo =
  document.getElementById("hyunsukGrowthVisualMemo");

const hyunsukGrowthVisualSave =
  document.getElementById("hyunsukGrowthVisualSave");

const hyunsukGrowthVisualDelete =
  document.getElementById("hyunsukGrowthVisualDelete");

const hyunsukGrowthVisualCancel =
  document.getElementById("hyunsukGrowthVisualCancel");

const hyunsukGrowthVisualModalKicker =
  document.getElementById("hyunsukGrowthVisualModalKicker");


// =========================================
// 💾 INDEXED DB
// =========================================

const HYUNSUK_GROWTH_DB_NAME =
  "treasure-day-hyunsuk-growth-db";

const HYUNSUK_GROWTH_DB_VERSION = 1;

const HYUNSUK_GROWTH_STORE =
  "growthVisuals";

let hyunsukGrowthDB = null;

let pendingHyunsukGrowthFile = null;

let currentHyunsukGrowthVisualItem = null;


// DB OPEN
function openHyunsukGrowthDB() {

  return new Promise((resolve, reject) => {

    const request =
      indexedDB.open(
        HYUNSUK_GROWTH_DB_NAME,
        HYUNSUK_GROWTH_DB_VERSION
      );

    request.onupgradeneeded = (event) => {

      const db =
        event.target.result;

      if (
        !db.objectStoreNames.contains(
          HYUNSUK_GROWTH_STORE
        )
      ) {

        db.createObjectStore(
          HYUNSUK_GROWTH_STORE,
          {
            keyPath: "id",
            autoIncrement: true
          }
        );
      }
    };

    request.onsuccess = () => {

      hyunsukGrowthDB =
        request.result;

      resolve(hyunsukGrowthDB);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}


// =========================================
// 📸 IMAGE → DATA URL
// =========================================

function hyunsukGrowthImageToDataURL(file) {

  return new Promise((resolve, reject) => {

    const reader =
      new FileReader();

    reader.onload = () => {

      const img =
        new Image();

      img.onload = () => {

        const MAX_SIZE = 1600;

        let width =
          img.naturalWidth;

        let height =
          img.naturalHeight;

        if (
          width > height &&
          width > MAX_SIZE
        ) {

          height =
            Math.round(
              height * MAX_SIZE / width
            );

          width = MAX_SIZE;

        } else if (
          height >= width &&
          height > MAX_SIZE
        ) {

          width =
            Math.round(
              width * MAX_SIZE / height
            );

          height = MAX_SIZE;
        }

        const canvas =
          document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;

        const ctx =
          canvas.getContext("2d");

        if (!ctx) {
          reject(
            new Error(
              "Canvas unavailable"
            )
          );
          return;
        }

        ctx.drawImage(
          img,
          0,
          0,
          width,
          height
        );

        resolve(
          canvas.toDataURL(
            "image/jpeg",
            0.86
          )
        );
      };

      img.src =
        reader.result;
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsDataURL(file);
  });
}


// =========================================
// 💾 SAVE / UPDATE / DELETE
// =========================================

async function saveHyunsukGrowthVisual(
  file,
  year,
  hairColor,
  memo
) {

  if (!hyunsukGrowthDB) return;

  const imageData =
    await hyunsukGrowthImageToDataURL(
      file
    );

  return new Promise(
    (resolve, reject) => {

      const transaction =
        hyunsukGrowthDB.transaction(
          HYUNSUK_GROWTH_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          HYUNSUK_GROWTH_STORE
        );

      const item = {
        year: Number(year),
        imageData,
        hairColor,
        memo,
        createdAt: Date.now()
      };

      const request =
        store.add(item);

      request.onsuccess = () => {

        item.id =
          request.result;

        resolve(item);
      };

      request.onerror = () => {
        reject(request.error);
      };
    }
  );
}


function updateHyunsukGrowthVisual(
  item
) {

  return new Promise(
    (resolve, reject) => {

      const transaction =
        hyunsukGrowthDB.transaction(
          HYUNSUK_GROWTH_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          HYUNSUK_GROWTH_STORE
        );

      const request =
        store.put(item);

      request.onsuccess =
        () => resolve();

      request.onerror =
        () => reject(
          request.error
        );
    }
  );
}


function deleteHyunsukGrowthVisual(
  item
) {

  return new Promise(
    (resolve, reject) => {

      const transaction =
        hyunsukGrowthDB.transaction(
          HYUNSUK_GROWTH_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          HYUNSUK_GROWTH_STORE
        );

      const request =
        store.delete(item.id);

      request.onsuccess =
        () => resolve();

      request.onerror =
        () => reject(
          request.error
        );
    }
  );
}


// =========================================
// 📚 GET YEAR VISUALS
// =========================================

function getHyunsukGrowthVisuals(
  year
) {

  return new Promise(
    (resolve, reject) => {

      if (!hyunsukGrowthDB) {
        resolve([]);
        return;
      }

      const transaction =
        hyunsukGrowthDB.transaction(
          HYUNSUK_GROWTH_STORE,
          "readonly"
        );

      const store =
        transaction.objectStore(
          HYUNSUK_GROWTH_STORE
        );

      const request =
        store.getAll();

      request.onsuccess = () => {

        const items =
          (request.result || [])
            .filter(
              item =>
                Number(item.year) ===
                Number(year)
            );

        resolve(items);
      };

      request.onerror = () => {
        reject(request.error);
      };
    }
  );
}


// =========================================
// 📸 CARD
// =========================================

function createHyunsukGrowthCard(
  item
) {

  const card =
    document.createElement("div");

  card.className =
    "jihoon-growth-visual-card";


  // =========================
  // 📸 PHOTO
  // =========================

  const photo =
    document.createElement("div");

  photo.className =
    "jihoon-growth-visual-photo";


  const img =
    document.createElement("img");

  img.src =
    item.imageData || "";

  img.alt =
    `${item.year} HYUNSUK`;

  img.loading =
    "lazy";

  img.decoding =
    "async";


  photo.appendChild(img);


  // =========================
  // 💎 INFO
  // =========================

  const info =
    document.createElement("div");

  info.className =
    "jihoon-growth-visual-info";


  const hair =
    document.createElement("span");

  const hairLabels = {
    BLACK: "🖤 BLACK",
    BROWN: "🤎 BROWN",
    RED: "❤️ RED",
    PINK: "🩷 PINK",
    BLONDE: "💛 BLONDE",
    GRAY: "🩶 GRAY",
    OTHER: "✨ OTHER"
  };


  hair.textContent =
    hairLabels[item.hairColor] ||
    "✨ OTHER";

  hair.className =
    "jihoon-growth-visual-hair";


  info.appendChild(hair);


  // =========================
  // 📝 MEMO
  // =========================

  const memo =
    document.createElement("p");

  if (item.memo) {

    memo.textContent =
      item.memo;

  } else {

    memo.textContent =
      "NO NOTE";

    memo.className =
      "jihoon-growth-visual-no-note";
  }


  info.appendChild(memo);


  // =========================
  // CARD
  // =========================

  card.appendChild(photo);

  card.appendChild(info);


  card.addEventListener(
    "click",
    () => {

      openHyunsukGrowthEdit(
        item
      );
    }
  );


  return card;
}

// =========================================
// 📚 RENDER CURRENT YEAR
// =========================================

async function renderHyunsukGrowthVisuals() {

  if (!hyunsukGrowthVisualGrid) {
    return;
  }

  hyunsukGrowthVisualGrid.innerHTML =
    "";

  const visuals =
    await getHyunsukGrowthVisuals(
      currentHyunsukGrowthYear
    );

  visuals
    .sort(
      (a, b) =>
        a.createdAt - b.createdAt
    )
    .forEach(
      item => {

        hyunsukGrowthVisualGrid.appendChild(
          createHyunsukGrowthCard(
            item
          )
        );
      }
    );


  if (visuals.length === 0) {

    hyunsukGrowthVisualGrid.innerHTML =
      `
      <div class="jihoon-growth-visual-empty">
        <span>📷</span>
        <strong>まだ写真がありません</strong>
        <small>
          好きな${currentHyunsukGrowthYear}ヒョンソクを追加してみよう 💎
        </small>
      </div>
      `;
  }
}


// =========================================
// ＋ ADD
// =========================================

if (hyunsukGrowthVisualAdd) {

  hyunsukGrowthVisualAdd.addEventListener(
    "click",
    () => {

      currentHyunsukGrowthVisualItem =
        null;

      pendingHyunsukGrowthFile =
        null;

      if (hyunsukGrowthVisualInput) {
        hyunsukGrowthVisualInput.value =
          "";
      }

      if (hyunsukGrowthVisualMemo) {
        hyunsukGrowthVisualMemo.value =
          "";
      }

      if (hyunsukGrowthVisualHair) {
        hyunsukGrowthVisualHair.value =
          "BLACK";
      }

      if (hyunsukGrowthVisualPreview) {
        hyunsukGrowthVisualPreview.style.display =
          "none";
      }

      if (hyunsukGrowthVisualDelete) {
        hyunsukGrowthVisualDelete.style.display =
          "none";
      }

      if (hyunsukGrowthVisualModalKicker) {
        hyunsukGrowthVisualModalKicker.textContent =
          `📸 ${currentHyunsukGrowthYear} VISUAL`;
      }

      if (hyunsukGrowthVisualModal) {
        hyunsukGrowthVisualModal.style.display =
          "flex";
      }
    }
  );
}


// =========================================
// 📷 SELECT PHOTO
// =========================================

if (
  hyunsukGrowthVisualSelect &&
  hyunsukGrowthVisualInput
) {

  hyunsukGrowthVisualSelect.addEventListener(
    "click",
    () => {

      hyunsukGrowthVisualInput.click();
    }
  );
}


if (hyunsukGrowthVisualInput) {

  hyunsukGrowthVisualInput.addEventListener(
    "change",
    () => {

      const file =
        hyunsukGrowthVisualInput.files[0];

      if (!file) return;

      pendingHyunsukGrowthFile =
        file;

      const reader =
        new FileReader();

      reader.onload = () => {

        if (
          hyunsukGrowthVisualPreviewImage
        ) {

          hyunsukGrowthVisualPreviewImage.src =
            reader.result;
        }

        if (
          hyunsukGrowthVisualPreview
        ) {

          hyunsukGrowthVisualPreview.style.display =
            "block";
        }
      };

      reader.readAsDataURL(file);
    }
  );
}


// =========================================
// 💾 SAVE
// =========================================

if (hyunsukGrowthVisualSave) {

  hyunsukGrowthVisualSave.addEventListener(
    "click",
    async () => {

      try {

        const hairColor =
          hyunsukGrowthVisualHair
            ? hyunsukGrowthVisualHair.value
            : "OTHER";

        const memo =
          hyunsukGrowthVisualMemo
            ? hyunsukGrowthVisualMemo.value.trim()
            : "";


        // EDIT
        if (
          currentHyunsukGrowthVisualItem
        ) {

          currentHyunsukGrowthVisualItem.hairColor =
            hairColor;

          currentHyunsukGrowthVisualItem.memo =
            memo;

          if (
            pendingHyunsukGrowthFile
          ) {

            currentHyunsukGrowthVisualItem.imageData =
              await hyunsukGrowthImageToDataURL(
                pendingHyunsukGrowthFile
              );
          }

          await updateHyunsukGrowthVisual(
            currentHyunsukGrowthVisualItem
          );

        }

        // NEW
        else {

          if (
            !pendingHyunsukGrowthFile
          ) {

            alert(
              "写真を選んでね📸"
            );

            return;
          }

          await saveHyunsukGrowthVisual(
            pendingHyunsukGrowthFile,
            currentHyunsukGrowthYear,
            hairColor,
            memo
          );
        }


        closeHyunsukGrowthModal();

        await renderHyunsukGrowthVisuals();

      } catch (error) {

        console.error(
          "HYUNSUK GROWTH SAVE ERROR:",
          error
        );

        alert(
          "保存に失敗しました🥲"
        );
      }
    }
  );
}


// =========================================
// ✏️ EDIT
// =========================================

function openHyunsukGrowthEdit(
  item
) {

  currentHyunsukGrowthVisualItem =
    item;

  pendingHyunsukGrowthFile =
    null;

  if (hyunsukGrowthVisualHair) {

    hyunsukGrowthVisualHair.value =
      item.hairColor ||
      "OTHER";
  }

  if (hyunsukGrowthVisualMemo) {

    hyunsukGrowthVisualMemo.value =
      item.memo || "";
  }

  if (
    hyunsukGrowthVisualPreviewImage
  ) {

    hyunsukGrowthVisualPreviewImage.src =
      item.imageData || "";
  }

  if (hyunsukGrowthVisualPreview) {

    hyunsukGrowthVisualPreview.style.display =
      "block";
  }

  if (hyunsukGrowthVisualDelete) {

    hyunsukGrowthVisualDelete.style.display =
      "block";
  }

  if (
    hyunsukGrowthVisualModalKicker
  ) {

    hyunsukGrowthVisualModalKicker.textContent =
      `📸 ${item.year} VISUAL EDIT`;
  }

  if (hyunsukGrowthVisualModal) {

    hyunsukGrowthVisualModal.style.display =
      "flex";
  }
}


// =========================================
// 🗑️ DELETE
// =========================================

if (hyunsukGrowthVisualDelete) {

  hyunsukGrowthVisualDelete.addEventListener(
    "click",
    async () => {

      if (
        !currentHyunsukGrowthVisualItem
      ) {
        return;
      }

      const ok =
        confirm(
          "この写真を削除しますか？🥲"
        );

      if (!ok) return;

      await deleteHyunsukGrowthVisual(
        currentHyunsukGrowthVisualItem
      );

      closeHyunsukGrowthModal();

      await renderHyunsukGrowthVisuals();
    }
  );
}


// =========================================
// CANCEL / CLOSE
// =========================================

function closeHyunsukGrowthModal() {

  pendingHyunsukGrowthFile =
    null;

  currentHyunsukGrowthVisualItem =
    null;

  if (hyunsukGrowthVisualInput) {
    hyunsukGrowthVisualInput.value =
      "";
  }

  if (hyunsukGrowthVisualModal) {
    hyunsukGrowthVisualModal.style.display =
      "none";
  }
}


if (hyunsukGrowthVisualCancel) {

  hyunsukGrowthVisualCancel.addEventListener(
    "click",
    closeHyunsukGrowthModal
  );
}


// =========================================
// 🚀 DB INITIALIZE
// =========================================

openHyunsukGrowthDB()
  .catch((error) => {

    console.error(
      "HYUNSUK GROWTH DB ERROR:",
      error
    );
  });
// =========================================
// 🎧 HYUNSUK'S SONG
// =========================================

const hyunsukSongOpen =
  document.getElementById("hyunsukSongOpen");

const hyunsukSongPage =
  document.getElementById("hyunsukSongPage");

const hyunsukSongBack =
  document.getElementById("hyunsukSongBack");
// 🚀 起動時は必ず閉じる
if (hyunsukSongPage) {
  hyunsukSongPage.style.display = "none";
}
const hyunsukSongTitle =
  document.getElementById("hyunsukSongTitle");

const hyunsukSongMemo =
  document.getElementById("hyunsukSongMemo");

const hyunsukSongSave =
  document.getElementById("hyunsukSongSave");

const hyunsukSongList =
  document.getElementById("hyunsukSongList");


let hyunsukSongs = [];

try {
  hyunsukSongs =
    JSON.parse(
      localStorage.getItem("treasure-hyunsuk-songs")
    ) || [];
} catch (error) {
  hyunsukSongs = [];
}


// =========================================
// 🎧 OPEN / BACK
// =========================================

if (
  hyunsukSongOpen &&
  hyunsukSongPage &&
  hyunsukBookDetail
) {

  hyunsukSongOpen.addEventListener(
    "click",
    () => {

      hyunsukBookDetail.classList.remove("active");

      hyunsukSongPage.style.display =
        "block";

      hyunsukSongPage.scrollTop = 0;

      renderHyunsukSongs();

      document.body.style.overflow =
        "hidden";
    }
  );
}


if (
  hyunsukSongBack &&
  hyunsukSongPage &&
  hyunsukBookDetail
) {

  hyunsukSongBack.addEventListener(
    "click",
    () => {

      hyunsukSongPage.style.display =
        "none";

      hyunsukBookDetail.classList.add(
        "active"
      );

      hyunsukBookDetail.scrollTop = 0;

      resetHyunsukSongForm();

      document.body.style.overflow =
        "hidden";
    }
  );
}


// =========================================
// 💾 SAVE / UPDATE
// =========================================

if (hyunsukSongSave) {

  hyunsukSongSave.addEventListener(
    "click",
    () => {

      const title =
        hyunsukSongTitle?.value.trim() || "";

      const memo =
        hyunsukSongMemo?.value.trim() || "";

      if (!title) {
        alert("曲名を入力してね 🎧");
        return;
      }


      const editId =
        hyunsukSongSave.dataset.editId
          ? Number(
              hyunsukSongSave.dataset.editId
            )
          : null;


      if (editId) {

        const item =
          hyunsukSongs.find(
            song => song.id === editId
          );

        if (!item) return;

        item.title = title;
        item.memo = memo;

      } else {

        hyunsukSongs.unshift({
          id: Date.now(),
          title,
          memo,
          favorite: false,
          createdAt: Date.now()
        });
      }


      saveHyunsukSongs();

      renderHyunsukSongs();

      resetHyunsukSongForm();
    }
  );
}


// =========================================
// 💎 LOCAL STORAGE SAVE
// =========================================

function saveHyunsukSongs() {

  localStorage.setItem(
    "treasure-hyunsuk-songs",
    JSON.stringify(hyunsukSongs)
  );
}


// =========================================
// 🔄 FORM RESET
// =========================================

function resetHyunsukSongForm() {

  if (hyunsukSongTitle) {
    hyunsukSongTitle.value = "";
  }

  if (hyunsukSongMemo) {
    hyunsukSongMemo.value = "";
  }

  if (hyunsukSongSave) {

    delete hyunsukSongSave.dataset.editId;

    hyunsukSongSave.textContent =
      "＋ ADD SONG";
  }
}


// =========================================
// 🎧 SONG LIST RENDER
// =========================================

function renderHyunsukSongs() {

  if (!hyunsukSongList) return;


  if (hyunsukSongs.length === 0) {

    hyunsukSongList.innerHTML = `
      <div class="jihoon-song-empty">
        <span>🎧</span>

        <strong>
          まだ曲がありません
        </strong>

        <small>
          ヒョンソクを思い浮かべる曲を追加してみよう 🦔
        </small>
      </div>
    `;

    return;
  }


  const sortedSongs =
    [...hyunsukSongs].sort(
      (a, b) => {

        if (
          a.favorite !== b.favorite
        ) {
          return (
            Number(b.favorite) -
            Number(a.favorite)
          );
        }

        return (
          (b.createdAt || 0) -
          (a.createdAt || 0)
        );
      }
    );


  hyunsukSongList.innerHTML =
    sortedSongs
      .map(
        song => `
          <article
            class="jihoon-song-card ${
              song.favorite
                ? "is-favorite"
                : ""
            }"
            data-id="${song.id}"
          >

            <button
              type="button"
              class="jihoon-song-favorite"
              data-action="favorite"
            >
              ${
                song.favorite
                  ? "⭐️ HYUNSUK'S SONG"
                  : "☆ FAVORITE"
              }
            </button>

            <div
              class="jihoon-song-card-title"
            >
              🎧 ${escapeHyunsukSongHTML(
                song.title
              )}
            </div>

            ${
              song.memo
                ? `
                  <p>
                    ${escapeHyunsukSongHTML(
                      song.memo
                    )}
                  </p>
                `
                : `
                  <p class="jihoon-song-no-note">
                    NO NOTE
                  </p>
                `
            }

            <div
              class="jihoon-song-actions"
            >

              <button
                type="button"
                data-action="edit"
              >
                ✏️ EDIT
              </button>

              <button
                type="button"
                data-action="delete"
              >
                🗑 DELETE
              </button>

            </div>

          </article>
        `
      )
      .join("");


  const cards =
    hyunsukSongList.querySelectorAll(
      ".jihoon-song-card"
    );


  cards.forEach(card => {

    const id =
      Number(card.dataset.id);


    card.addEventListener(
      "click",
      event => {

        const button =
          event.target.closest(
            "button[data-action]"
          );

        if (!button) return;

        const action =
          button.dataset.action;


        // ⭐ FAVORITE
        if (action === "favorite") {

          hyunsukSongs.forEach(
            song => {

              song.favorite =
                song.id === id
                  ? !song.favorite
                  : false;
            }
          );

          saveHyunsukSongs();

          renderHyunsukSongs();

          return;
        }


        // ✏️ EDIT
        if (action === "edit") {

          const song =
            hyunsukSongs.find(
              item => item.id === id
            );

          if (!song) return;

          if (hyunsukSongTitle) {
            hyunsukSongTitle.value =
              song.title || "";
          }

          if (hyunsukSongMemo) {
            hyunsukSongMemo.value =
              song.memo || "";
          }

          if (hyunsukSongSave) {

            hyunsukSongSave.dataset.editId =
              String(song.id);

            hyunsukSongSave.textContent =
              "💎 UPDATE SONG";
          }

          hyunsukSongPage.scrollTop = 0;

          return;
        }


        // 🗑 DELETE
        if (action === "delete") {

          const ok =
            confirm(
              "この曲を削除する？🎧"
            );

          if (!ok) return;

          hyunsukSongs =
            hyunsukSongs.filter(
              song =>
                song.id !== id
            );

          saveHyunsukSongs();

          renderHyunsukSongs();

          resetHyunsukSongForm();
        }
      }
    );
  });
}


// =========================================
// 🛡 HTML ESCAPE
// =========================================

function escapeHyunsukSongHTML(text) {

  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


// 最初の表示
renderHyunsukSongs();
// ========================================
// 📷 HYUNSUK MEMORIES
// PHOTO MEMORY LINK VIEW
// ========================================

const hyunsukMemoriesOpen =
  document.getElementById("hyunsukMemoriesOpen");

const hyunsukMemoriesPage =
  document.getElementById("hyunsukMemoriesPage");

const hyunsukMemoriesBack =
  document.getElementById("hyunsukMemoriesBack");

const hyunsukMemoriesAdd =
  document.getElementById("hyunsukMemoriesAdd");

const hyunsukMemoriesList =
  document.getElementById("hyunsukMemoriesList");


// OPEN
if (
  hyunsukMemoriesOpen &&
  hyunsukMemoriesPage &&
  hyunsukBookDetail
) {

  hyunsukMemoriesOpen.addEventListener(
    "click",
    async () => {

      hyunsukMemoriesPage.style.display =
        "block";

      hyunsukMemoriesPage.scrollTop = 0;

      await renderHyunsukMemories();

      document.body.style.overflow =
        "hidden";
    }
  );
}


// BACK
if (
  hyunsukMemoriesBack &&
  hyunsukMemoriesPage &&
  hyunsukBookDetail
) {

  hyunsukMemoriesBack.addEventListener(
    "click",
    () => {

      hyunsukMemoriesPage.style.display =
        "none";

      hyunsukBookDetail.classList.add(
        "active"
      );

      hyunsukBookDetail.scrollTop = 0;

      document.body.style.overflow =
        "hidden";
    }
  );
}


// ADD → PHOTO MEMORY
if (hyunsukMemoriesAdd) {

  hyunsukMemoriesAdd.addEventListener(
    "click",
    () => {

      if (hyunsukMemoriesPage) {
        hyunsukMemoriesPage.style.display =
          "none";
      }

      if (hyunsukBookDetail) {
        hyunsukBookDetail.classList.remove(
          "active"
        );
      }

      const memberBookDetail =
        document.getElementById(
          "member-book-detail"
        );

      if (memberBookDetail) {
        memberBookDetail.classList.remove(
          "active"
        );
      }

      showPage("memory");

      switchMemoryMode("photo");

      // MEMBER自動セット
      if (memoryMember) {
        memoryMember.value =
          "HYUNSUK";
      }

      document.body.style.overflow =
        "";

      window.scrollTo(0, 0);
    }
  );
}


// ========================================
// 🦔 HYUNSUK MEMORY RENDER
// ========================================

async function renderHyunsukMemories() {

  if (!hyunsukMemoriesList) return;

  hyunsukMemoriesList.innerHTML = "";


  const hyunsukEntries =
    memories
      .map(
        (memory, index) => ({
          memory,
          index
        })
      )
      .filter(
        ({ memory }) =>
          String(
            memory.member || ""
          ).toUpperCase() ===
          "HYUNSUK"
      );


  if (hyunsukEntries.length === 0) {

    hyunsukMemoriesList.innerHTML = `
      <div class="jihoon-memories-empty">
        <span>📷</span>

        <strong>
          まだHYUNSUK MEMORYがありません
        </strong>

        <small>
          PHOTO MEMORYでMEMBERを
          HYUNSUKにして投稿してみよう 🦔💎
        </small>
      </div>
    `;

    return;
  }


  for (
    const { memory, index }
    of hyunsukEntries
  ) {

    const card =
      document.createElement("article");

    card.className =
      "jihoon-memory-card";


    // PHOTO
    if (
      memory.photoKey ||
      memory.photo
    ) {

      const image =
        document.createElement("img");

      image.alt =
        memory.title ||
        "HYUNSUK MEMORY";


      if (memory.photoKey) {

        try {

          image.src =
            await loadPhotoMemoryImage(
              memory.photoKey
            );

        } catch (error) {

          console.error(
            "HYUNSUK MEMORY IMAGE LOAD ERROR",
            error
          );

          image.src = "";
        }

      } else {

        image.src =
          memory.photo || "";
      }


      if (image.src) {
        card.appendChild(image);
      }
    }


    // INFO
    const body =
      document.createElement("div");

    body.className =
      "jihoon-memory-card-body";


    const title =
      document.createElement("strong");

    title.textContent =
      memory.title ||
      "HYUNSUK MEMORY 💎";

    body.appendChild(title);


    if (memory.text) {

      const text =
        document.createElement("p");

      text.textContent =
        memory.text;

      body.appendChild(text);
    }


    // TAGS
    if (
      Array.isArray(memory.tags) &&
      memory.tags.length > 0
    ) {

      const tags =
        document.createElement("div");

      tags.className =
        "jihoon-memory-tags";

      memory.tags.forEach(
        tag => {

          const span =
            document.createElement("span");

          span.textContent =
            "#" + tag;

          tags.appendChild(span);
        }
      );

      body.appendChild(tags);
    }


    card.appendChild(body);


    // PHOTO MEMORY詳細へ
    card.addEventListener(
      "click",
      async () => {

        photoMemoryReturnTarget =
          "hyunsuk";

        showPage("memory");

        switchMemoryMode("photo");

        await openPhotoMemoryDetail(
          index
        );

        window.scrollTo(0, 0);
      }
    );


    hyunsukMemoriesList.appendChild(
      card
    );
  }
}
// =====================================================
// 🫶 SHARED CHEMISTRY ENGINE
// HYUNSUK START / ALL MEMBERS READY
// =====================================================


// -----------------------------------------------------
// MEMBER INFO
// -----------------------------------------------------

const chemistryMemberInfo = {

  HYUNSUK: {
    name: "HYUNSUK",
    emoji: "🦔"
  },

  JIHOON: {
    name: "JIHOON",
    emoji: "🐶"
  },

  YOSHI: {
    name: "YOSHI",
    emoji: "🐯"
  },

  JUNKYU: {
    name: "JUNKYU",
    emoji: "🐨"
  },

  JAEHYUK: {
    name: "JAEHYUK",
    emoji: "🦁"
  },

  ASAHI: {
    name: "ASAHI",
    emoji: "🤖"
  },

  DOYOUNG: {
    name: "DOYOUNG",
    emoji: "🐰"
  },

  HARUTO: {
    name: "HARUTO",
    emoji: "🦋"
  },

  JEONGWOO: {
    name: "JEONGWOO",
    emoji: "🐺"
  },

  JUNGHWAN: {
    name: "JUNGHWAN",
    emoji: "🐮"
  }

};


// -----------------------------------------------------
// 💎 PAIR KEY
// 順番が逆でも必ず同じキー
// -----------------------------------------------------

function createChemistryPairKey(
  memberA,
  memberB
) {

  return [
    memberA.toUpperCase(),
    memberB.toUpperCase()
  ]
    .sort()
    .join("-");
}


// 例
// HYUNSUK + JIHOON
// JIHOON + HYUNSUK
// ↓
// HYUNSUK-JIHOON


// =====================================================
// 💾 SHARED METADATA
// =====================================================

const SHARED_CHEMISTRY_STORAGE_KEY =
  "treasure-shared-chemistry-memories";


let sharedChemistryMemories = [];


try {

  sharedChemistryMemories =
    JSON.parse(
      localStorage.getItem(
        SHARED_CHEMISTRY_STORAGE_KEY
      )
    ) || [];

} catch (error) {

  sharedChemistryMemories = [];
}


function saveSharedChemistryMemories() {

  localStorage.setItem(
    SHARED_CHEMISTRY_STORAGE_KEY,
    JSON.stringify(
      sharedChemistryMemories
    )
  );
}


// =====================================================
// 📸 SHARED IMAGE DB
// =====================================================

const SHARED_CHEMISTRY_DB_NAME =
  "treasure-day-shared-chemistry-db";

const SHARED_CHEMISTRY_DB_VERSION =
  1;

const SHARED_CHEMISTRY_IMAGE_STORE =
  "chemistry-images";


function openSharedChemistryDB() {

  return new Promise(
    (resolve, reject) => {

      const request =
        indexedDB.open(
          SHARED_CHEMISTRY_DB_NAME,
          SHARED_CHEMISTRY_DB_VERSION
        );


      request.onupgradeneeded =
        event => {

          const db =
            event.target.result;

          if (
            !db.objectStoreNames.contains(
              SHARED_CHEMISTRY_IMAGE_STORE
            )
          ) {

            db.createObjectStore(
              SHARED_CHEMISTRY_IMAGE_STORE
            );
          }
        };


      request.onsuccess = () => {

        resolve(
          request.result
        );
      };


      request.onerror = () => {

        reject(
          request.error
        );
      };

    }
  );
}


// IMAGE SAVE

async function saveSharedChemistryImage(
  imageKey,
  imageData
) {

  const db =
    await openSharedChemistryDB();


  return new Promise(
    (resolve, reject) => {

      const transaction =
        db.transaction(
          SHARED_CHEMISTRY_IMAGE_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          SHARED_CHEMISTRY_IMAGE_STORE
        );

      const request =
        store.put(
          imageData,
          imageKey
        );


      request.onsuccess =
        () => resolve();


      request.onerror =
        () => reject(
          request.error
        );
    }
  );
}


// IMAGE LOAD

async function loadSharedChemistryImage(
  imageKey
) {

  if (!imageKey) return "";


  const db =
    await openSharedChemistryDB();


  return new Promise(
    (resolve, reject) => {

      const transaction =
        db.transaction(
          SHARED_CHEMISTRY_IMAGE_STORE,
          "readonly"
        );

      const store =
        transaction.objectStore(
          SHARED_CHEMISTRY_IMAGE_STORE
        );

      const request =
        store.get(
          imageKey
        );


      request.onsuccess = () => {

        resolve(
          request.result || ""
        );
      };


      request.onerror =
        () => reject(
          request.error
        );
    }
  );
}


// IMAGE DELETE

async function deleteSharedChemistryImage(
  imageKey
) {

  if (!imageKey) return;


  const db =
    await openSharedChemistryDB();


  return new Promise(
    (resolve, reject) => {

      const transaction =
        db.transaction(
          SHARED_CHEMISTRY_IMAGE_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          SHARED_CHEMISTRY_IMAGE_STORE
        );

      const request =
        store.delete(
          imageKey
        );


      request.onsuccess =
        () => resolve();


      request.onerror =
        () => reject(
          request.error
        );
    }
  );
}


// =====================================================
// 📸 IMAGE RESIZE
// =====================================================

function resizeSharedChemistryImage(
  file
) {

  return new Promise(
    (resolve, reject) => {

      const reader =
        new FileReader();


      reader.onload = () => {

        const img =
          new Image();


        img.onload = () => {

          const MAX_SIZE =
            1600;

          let width =
            img.naturalWidth;

          let height =
            img.naturalHeight;


          if (
            width > height &&
            width > MAX_SIZE
          ) {

            height =
              Math.round(
                height *
                MAX_SIZE /
                width
              );

            width =
              MAX_SIZE;

          } else if (
            height >= width &&
            height > MAX_SIZE
          ) {

            width =
              Math.round(
                width *
                MAX_SIZE /
                height
              );

            height =
              MAX_SIZE;
          }


          const canvas =
            document.createElement(
              "canvas"
            );

          canvas.width =
            width;

          canvas.height =
            height;


          const ctx =
            canvas.getContext(
              "2d"
            );


          if (!ctx) {

            reject(
              new Error(
                "Canvas unavailable"
              )
            );

            return;
          }


          ctx.drawImage(
            img,
            0,
            0,
            width,
            height
          );


          resolve(
            canvas.toDataURL(
              "image/jpeg",
              0.82
            )
          );
        };


        img.onerror =
          reject;


        img.src =
          reader.result;
      };


      reader.onerror =
        reject;


      reader.readAsDataURL(
        file
      );
    }
  );
}


// =====================================================
// 🦔 HYUNSUK CHEMISTRY DOM
// =====================================================

const hyunsukChemistryOpen =
  document.getElementById(
    "hyunsukChemistryOpen"
  );

const hyunsukChemistryPage =
  document.getElementById(
    "hyunsukChemistryPage"
  );

const hyunsukChemistryBack =
  document.getElementById(
    "hyunsukChemistryBack"
  );

const hyunsukChemistryDetailPage =
  document.getElementById(
    "hyunsukChemistryDetailPage"
  );

const hyunsukChemistryDetailBack =
  document.getElementById(
    "hyunsukChemistryDetailBack"
  );

const hyunsukChemistryDetailEmoji =
  document.getElementById(
    "hyunsukChemistryDetailEmoji"
  );

const hyunsukChemistryDetailTitle =
  document.getElementById(
    "hyunsukChemistryDetailTitle"
  );

const hyunsukChemistryDetailName =
  document.getElementById(
    "hyunsukChemistryDetailName"
  );

const hyunsukChemistryDetailCaption =
  document.getElementById(
    "hyunsukChemistryDetailCaption"
  );

const hyunsukChemistryMemoryList =
  document.getElementById(
    "hyunsukChemistryMemoryList"
  );

const hyunsukChemistryAdd =
  document.getElementById(
    "hyunsukChemistryAdd"
  );


// MODAL

const hyunsukChemistryMemoryModal =
  document.getElementById(
    "hyunsukChemistryMemoryModal"
  );

const hyunsukChemistryMemoryTitle =
  document.getElementById(
    "hyunsukChemistryMemoryTitle"
  );

const hyunsukChemistryMemoryInput =
  document.getElementById(
    "hyunsukChemistryMemoryInput"
  );

const hyunsukChemistryMemorySelect =
  document.getElementById(
    "hyunsukChemistryMemorySelect"
  );

const hyunsukChemistryMemoryPreview =
  document.getElementById(
    "hyunsukChemistryMemoryPreview"
  );

const hyunsukChemistryMemoryPreviewImage =
  document.getElementById(
    "hyunsukChemistryMemoryPreviewImage"
  );

const hyunsukChemistryMemoryMemo =
  document.getElementById(
    "hyunsukChemistryMemoryMemo"
  );

const hyunsukChemistryMemorySave =
  document.getElementById(
    "hyunsukChemistryMemorySave"
  );

const hyunsukChemistryMemoryDelete =
  document.getElementById(
    "hyunsukChemistryMemoryDelete"
  );

const hyunsukChemistryMemoryCancel =
  document.getElementById(
    "hyunsukChemistryMemoryCancel"
  );


let currentHyunsukChemistryPartner =
  null;

let currentHyunsukChemistryPairKey =
  null;

let currentSharedChemistryImageData =
  null;
let currentSharedChemistryRenderTarget =
  hyunsukChemistryMemoryList;

// =====================================================
// 🦔 HYUNSUK CHEMISTRY OPEN / BACK
// =====================================================

if (
  hyunsukChemistryOpen &&
  hyunsukChemistryPage
) {

  hyunsukChemistryOpen.addEventListener(
    "click",
    () => {

      if (hyunsukBookDetail) {

        hyunsukBookDetail.classList.remove(
          "active"
        );
      }


      hyunsukChemistryPage.style.display =
        "block";

      hyunsukChemistryPage.scrollTop =
        0;


      document.body.style.overflow =
        "hidden";
    }
  );
}


if (
  hyunsukChemistryBack &&
  hyunsukChemistryPage
) {

  hyunsukChemistryBack.addEventListener(
    "click",
    () => {

      hyunsukChemistryPage.style.display =
        "none";


      if (hyunsukBookDetail) {

        hyunsukBookDetail.classList.add(
          "active"
        );

        hyunsukBookDetail.scrollTop =
          0;
      }


      document.body.style.overflow =
        "hidden";
    }
  );
}


// =====================================================
// 🫶 9 CHEMISTRY CARDS
// =====================================================

const hyunsukChemistryCards =
  document.querySelectorAll(
    ".hyunsuk-chemistry-card"
  );


hyunsukChemistryCards.forEach(
  card => {

    card.addEventListener(
      "click",
      async () => {

        const partner =
          card.dataset.partner;


        if (!partner) return;


        currentHyunsukChemistryPartner =
          partner;


        currentHyunsukChemistryPairKey =
          createChemistryPairKey(
            "HYUNSUK",
            partner
          );
currentSharedChemistryRenderTarget =
  hyunsukChemistryMemoryList;

        const partnerInfo =
          chemistryMemberInfo[
            partner
          ];


        if (
          hyunsukChemistryDetailEmoji
        ) {

          hyunsukChemistryDetailEmoji.textContent =
            "🦔" +
            (
              partnerInfo?.emoji ||
              "💎"
            );
        }


        if (
          hyunsukChemistryDetailTitle
        ) {

          hyunsukChemistryDetailTitle.textContent =
            `HYUNSUK × ${partner}`;
        }


        if (
          hyunsukChemistryDetailName
        ) {

          hyunsukChemistryDetailName.textContent =
            "CHEMISTRY MEMORY 💎";
        }


        if (
          hyunsukChemistryDetailCaption
        ) {

          hyunsukChemistryDetailCaption.textContent =
            `ヒョンソクと${partner}の好きな瞬間を集めよう 💎`;
        }


        hyunsukChemistryPage.style.display =
          "none";

        hyunsukChemistryDetailPage.style.display =
          "block";

        hyunsukChemistryDetailPage.scrollTop =
          0;


        await renderSharedChemistryMemories();


        document.body.style.overflow =
          "hidden";
      }
    );
  }
);


// =====================================================
// ← CHEMISTRY LIST
// =====================================================

if (
  hyunsukChemistryDetailBack &&
  hyunsukChemistryDetailPage
) {

  hyunsukChemistryDetailBack.addEventListener(
    "click",
    () => {

      hyunsukChemistryDetailPage.style.display =
        "none";

      hyunsukChemistryPage.style.display =
        "block";

      hyunsukChemistryPage.scrollTop =
        0;


      document.body.style.overflow =
        "hidden";
    }
  );
}


// =====================================================
// ＋ ADD MEMORY
// =====================================================

if (hyunsukChemistryAdd) {

  hyunsukChemistryAdd.addEventListener(
    "click",
    () => {

      if (
        !currentHyunsukChemistryPairKey
      ) {
        return;
      }


      currentSharedChemistryImageData =
        null;


      delete hyunsukChemistryMemorySave
        .dataset.editId;


      hyunsukChemistryMemoryInput.value =
        "";

      hyunsukChemistryMemoryMemo.value =
        "";

      hyunsukChemistryMemoryPreviewImage.src =
        "";

      hyunsukChemistryMemoryPreview.style.display =
        "none";

      hyunsukChemistryMemoryDelete.style.display =
        "none";


      hyunsukChemistryMemorySave.textContent =
        "💎 SAVE MEMORY";


      hyunsukChemistryMemoryTitle.textContent =
        `HYUNSUK × ${currentHyunsukChemistryPartner} MEMORY`;


      hyunsukChemistryMemoryModal.style.display =
        "flex";

      hyunsukChemistryMemoryModal.scrollTop =
        0;


      document.body.style.overflow =
        "hidden";
    }
  );
}


// =====================================================
// 📸 PHOTO SELECT
// =====================================================

if (
  hyunsukChemistryMemorySelect &&
  hyunsukChemistryMemoryInput
) {

  hyunsukChemistryMemorySelect.addEventListener(
    "click",
    () => {

      hyunsukChemistryMemoryInput.click();
    }
  );
}


if (hyunsukChemistryMemoryInput) {

  hyunsukChemistryMemoryInput.addEventListener(
    "change",
    async () => {

      const file =
        hyunsukChemistryMemoryInput
          .files[0];


      if (!file) return;


      try {

        currentSharedChemistryImageData =
          await resizeSharedChemistryImage(
            file
          );


        hyunsukChemistryMemoryPreviewImage.src =
          currentSharedChemistryImageData;


        hyunsukChemistryMemoryPreview.style.display =
          "block";


      } catch (error) {

        console.error(
          "SHARED CHEMISTRY IMAGE ERROR",
          error
        );


        alert(
          "写真の読み込みに失敗しました😭"
        );
      }
    }
  );
}


// =====================================================
// 💾 SAVE / UPDATE
// =====================================================

if (hyunsukChemistryMemorySave) {

  hyunsukChemistryMemorySave.addEventListener(
    "click",
    async () => {

      if (
        !currentHyunsukChemistryPairKey
      ) {
        return;
      }


      const memo =
        hyunsukChemistryMemoryMemo
          .value
          .trim();


      const editId =
        hyunsukChemistryMemorySave
          .dataset.editId
          ? Number(
              hyunsukChemistryMemorySave
                .dataset.editId
            )
          : null;


      try {


        // =============================
        // ✏️ UPDATE
        // =============================

        if (editId) {

          const item =
            sharedChemistryMemories.find(
              memory =>
                memory.id === editId
            );


          if (!item) return;


          item.memo =
            memo;


          if (
            currentSharedChemistryImageData
          ) {

            const newImageKey =
              "shared-chemistry-" +
              Date.now() +
              "-" +
              Math.random()
                .toString(36)
                .slice(2);


            await saveSharedChemistryImage(
              newImageKey,
              currentSharedChemistryImageData
            );


            if (item.imageKey) {

              await deleteSharedChemistryImage(
                item.imageKey
              );
            }


            item.imageKey =
              newImageKey;
          }

        }


        // =============================
        // 💎 NEW
        // =============================

        else {

          if (
            !currentSharedChemistryImageData
          ) {

            alert(
              "写真を選んでね 📸"
            );

            return;
          }


          const imageKey =
            "shared-chemistry-" +
            Date.now() +
            "-" +
            Math.random()
              .toString(36)
              .slice(2);


          await saveSharedChemistryImage(
            imageKey,
            currentSharedChemistryImageData
          );


          sharedChemistryMemories.unshift({

            id:
              Date.now(),

            pairKey:
              currentHyunsukChemistryPairKey,

            members:
              currentHyunsukChemistryPairKey.split("-"),

            imageKey,

            memo,

            createdAt:
              Date.now()

          });
        }


        saveSharedChemistryMemories();


        await renderSharedChemistryMemories();


        closeSharedChemistryModal();


      } catch (error) {

        console.error(
          "SHARED CHEMISTRY SAVE ERROR",
          error
        );


        alert(
          "保存に失敗しました😭"
        );
      }
    }
  );
}


// =====================================================
// 🖼 RENDER CURRENT PAIR
// =====================================================

async function renderSharedChemistryMemories() {

  if (
  !currentSharedChemistryRenderTarget ||
  !currentHyunsukChemistryPairKey
) {
  return;
}

  const items =
    sharedChemistryMemories
      .filter(
        memory =>
          memory.pairKey ===
          currentHyunsukChemistryPairKey
      )
      .sort(
        (a, b) =>
          (b.createdAt || 0) -
          (a.createdAt || 0)
      );


  if (items.length === 0) {

    currentSharedChemistryRenderTarget.innerHTML = `
      <div class="jihoon-chemistry-empty">
        <span>📸</span>

        <strong>
          まだ思い出がありません
        </strong>

        <small>
          好きなケミを追加してみよう 💎
        </small>
      </div>
    `;

    return;
  }


  currentSharedChemistryRenderTarget.innerHTML =
  "";


  for (const item of items) {

    let imageData = "";


    try {

      imageData =
        await loadSharedChemistryImage(
          item.imageKey
        );

    } catch (error) {

      console.error(
        "CHEMISTRY IMAGE LOAD ERROR",
        error
      );
    }


    const article =
      document.createElement(
        "article"
      );


    article.className =
      "jihoon-chemistry-memory-card";


    article.dataset.id =
      String(item.id);


    article.innerHTML = `
      ${
        imageData
          ? `
            <img
              src="${imageData}"
              alt="CHEMISTRY MEMORY"
            >
          `
          : ""
      }

      ${
        item.memo
          ? `
            <p>
              ${escapeSharedChemistryHTML(
                item.memo
              )}
            </p>
          `
          : `
            <p class="jihoon-chemistry-no-note">
              NO NOTE
            </p>
          `
      }
    `;


    article.addEventListener(
      "click",
      () => {

        openSharedChemistryMemoryEdit(
          item,
          imageData
        );
      }
    );


   currentSharedChemistryRenderTarget.appendChild(
  article
);
  }
}


// =====================================================
// ✏️ EDIT
// =====================================================

function openSharedChemistryMemoryEdit(
  item,
  imageData
) {

  currentHyunsukChemistryPairKey =
    item.pairKey;


  currentSharedChemistryImageData =
    null;


  hyunsukChemistryMemoryPreviewImage.src =
    imageData || "";


  hyunsukChemistryMemoryPreview.style.display =
    imageData
      ? "block"
      : "none";


  hyunsukChemistryMemoryMemo.value =
    item.memo || "";


  hyunsukChemistryMemorySave.dataset.editId =
    String(item.id);


  hyunsukChemistryMemorySave.textContent =
    "💎 UPDATE MEMORY";


  hyunsukChemistryMemoryDelete.dataset.deleteId =
    String(item.id);


  hyunsukChemistryMemoryDelete.style.display =
    "block";


  hyunsukChemistryMemoryModal.style.display =
    "flex";


  hyunsukChemistryMemoryModal.scrollTop =
    0;


  document.body.style.overflow =
    "hidden";
}


// =====================================================
// 🗑 DELETE
// =====================================================

if (hyunsukChemistryMemoryDelete) {

  hyunsukChemistryMemoryDelete.addEventListener(
    "click",
    async () => {

      const id =
        Number(
          hyunsukChemistryMemoryDelete
            .dataset.deleteId
        );


      if (!id) return;


      const ok =
        confirm(
          "このCHEMISTRY MEMORYを削除する？🥲"
        );


      if (!ok) return;


      const item =
        sharedChemistryMemories.find(
          memory =>
            memory.id === id
        );


      try {

        if (
          item &&
          item.imageKey
        ) {

          await deleteSharedChemistryImage(
            item.imageKey
          );
        }


        sharedChemistryMemories =
          sharedChemistryMemories.filter(
            memory =>
              memory.id !== id
          );


        saveSharedChemistryMemories();


        await renderSharedChemistryMemories();


        closeSharedChemistryModal();


      } catch (error) {

        console.error(
          "SHARED CHEMISTRY DELETE ERROR",
          error
        );


        alert(
          "削除に失敗しました😭"
        );
      }
    }
  );
}


// =====================================================
// ❌ CANCEL
// =====================================================

if (hyunsukChemistryMemoryCancel) {

  hyunsukChemistryMemoryCancel.addEventListener(
    "click",
    () => {

      closeSharedChemistryModal();
    }
  );
}


// =====================================================
// CLOSE MODAL
// =====================================================

function closeSharedChemistryModal() {

  if (
    hyunsukChemistryMemoryModal
  ) {

    hyunsukChemistryMemoryModal.style.display =
      "none";
  }


  if (
    hyunsukChemistryMemoryInput
  ) {

    hyunsukChemistryMemoryInput.value =
      "";
  }


  if (
    hyunsukChemistryMemoryMemo
  ) {

    hyunsukChemistryMemoryMemo.value =
      "";
  }


  if (
    hyunsukChemistryMemoryPreviewImage
  ) {

    hyunsukChemistryMemoryPreviewImage.src =
      "";
  }


  if (
    hyunsukChemistryMemoryPreview
  ) {

    hyunsukChemistryMemoryPreview.style.display =
      "none";
  }


  currentSharedChemistryImageData =
    null;


  if (
    hyunsukChemistryMemorySave
  ) {

    delete hyunsukChemistryMemorySave
      .dataset.editId;

    hyunsukChemistryMemorySave.textContent =
      "💎 SAVE MEMORY";
  }


  if (
    hyunsukChemistryMemoryDelete
  ) {

    delete hyunsukChemistryMemoryDelete
      .dataset.deleteId;

    hyunsukChemistryMemoryDelete.style.display =
      "none";
  }
}


// =====================================================
// 🛡 HTML ESCAPE
// =====================================================

function escapeSharedChemistryHTML(
  text
) {

  return String(text)

    .replaceAll(
      "&",
      "&amp;"
    )

    .replaceAll(
      "<",
      "&lt;"
    )

    .replaceAll(
      ">",
      "&gt;"
    )

    .replaceAll(
      '"',
      "&quot;"
    )

    .replaceAll(
      "'",
      "&#039;"
    );
}
// ========================================
// 🐯 YOSHI BOOK OPEN / CLOSE
// ========================================

const yoshiBookOpen =
  document.getElementById("yoshi-book-open");

const yoshiBookDetail =
  document.getElementById("yoshi-book-detail");

const yoshiBookClose =
  document.getElementById("yoshi-book-close");


// YOSHI BOOKを開く
if (yoshiBookOpen && yoshiBookDetail) {

  yoshiBookOpen.addEventListener(
    "click",
    () => {

      yoshiBookDetail.classList.add(
        "active"
      );

      yoshiBookDetail.scrollTop = 0;

      document.body.style.overflow =
        "hidden";
    }
  );
}


// MEMBER BOOKへ戻る
if (yoshiBookClose && yoshiBookDetail) {

  yoshiBookClose.addEventListener(
    "click",
    () => {

      yoshiBookDetail.classList.remove(
        "active"
      );

      // MEMBER BOOKは後ろで開いたまま
      document.body.style.overflow =
        "hidden";
    }
  );
}
// ========================================
// 🦁 JAEHYUK BOOK OPEN / CLOSE
// ========================================

const jaehyukBookOpen =
  document.getElementById("jaehyuk-book-open");

const jaehyukBookDetail =
  document.getElementById("jaehyuk-book-detail");

const jaehyukBookClose =
  document.getElementById("jaehyuk-book-close");


// JAEHYUK BOOKを開く
if (
  jaehyukBookOpen &&
  jaehyukBookDetail
) {

  jaehyukBookOpen.addEventListener(
    "click",
    () => {

      jaehyukBookDetail.classList.add(
        "active"
      );

      jaehyukBookDetail.scrollTop = 0;

      document.body.style.overflow =
        "hidden";
    }
  );
}


// JAEHYUK BOOKを閉じる
if (
  jaehyukBookClose &&
  jaehyukBookDetail
) {

  jaehyukBookClose.addEventListener(
    "click",
    () => {

      jaehyukBookDetail.classList.remove(
        "active"
      );

      document.body.style.overflow =
        "hidden";
    }
  );
}
// ========================================
// 🤖 ASAHI BOOK OPEN / CLOSE
// ========================================

const asahiBookOpen =
  document.getElementById("asahi-book-open");

const asahiBookDetail =
  document.getElementById("asahi-book-detail");

const asahiBookClose =
  document.getElementById("asahi-book-close");


// ASAHI BOOKを開く
if (
  asahiBookOpen &&
  asahiBookDetail
) {

  asahiBookOpen.addEventListener(
    "click",
    () => {

      asahiBookDetail.classList.add(
        "active"
      );

      asahiBookDetail.scrollTop = 0;

      document.body.style.overflow =
        "hidden";
    }
  );
}


// ASAHI BOOKを閉じる
if (
  asahiBookClose &&
  asahiBookDetail
) {

  asahiBookClose.addEventListener(
    "click",
    () => {

      asahiBookDetail.classList.remove(
        "active"
      );

      // MEMBER BOOKは後ろで開いたまま
      document.body.style.overflow =
        "hidden";
    }
  );
}
// ========================================
// 🐨 JUNKYU BOOK OPEN / CLOSE
// ========================================

const junkyuBookOpen =
  document.getElementById("junkyu-book-open");

const junkyuBookDetail =
  document.getElementById("junkyu-book-detail");

const junkyuBookClose =
  document.getElementById("junkyu-book-close");


// JUNKYU BOOKを開く
if (
  junkyuBookOpen &&
  junkyuBookDetail
) {

  junkyuBookOpen.addEventListener(
    "click",
    () => {

      junkyuBookDetail.classList.add(
        "active"
      );

      junkyuBookDetail.scrollTop = 0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// MEMBER BOOKへ戻る
if (
  junkyuBookClose &&
  junkyuBookDetail
) {

  junkyuBookClose.addEventListener(
    "click",
    () => {

      junkyuBookDetail.classList.remove(
        "active"
      );

      document.body.style.overflow =
        "hidden";

    }
  );
}
// ======================================================
// 📸 MEMBER VISUAL BOOK 共通エンジン
// YOSHI以降の量産用
// ======================================================

function setupMemberVisualBook(config) {

  const {
    key,
    displayName,
    japaneseName
  } = config;

  const cap =
    key.charAt(0).toUpperCase() +
    key.slice(1);


  // =========================================
  // DOM
  // =========================================

  const visualBook =
    document.getElementById(
      `${key}VisualBook`
    );

  const visualOpen =
    document.getElementById(
      `${key}VisualBookOpen`
    );

  const visualClose =
    document.getElementById(
      `${key}VisualClose`
    );

  const visualAdd =
    document.getElementById(
      `${key}VisualAdd`
    );

  const visualInput =
    document.getElementById(
      `${key}VisualInput`
    );

  const visualGrid =
    document.getElementById(
      `${key}VisualGrid`
    );

  const hairModal =
    document.getElementById(
      `${key}HairModal`
    );

  const hairCancel =
    document.getElementById(
      `${key}HairCancel`
    );

  const editModal =
    document.getElementById(
      `${key}VisualEditModal`
    );

  const editImage =
    document.getElementById(
      `${key}VisualEditImage`
    );

  const editCancel =
    document.getElementById(
      `${key}VisualEditCancel`
    );

  const favoriteButton =
    document.getElementById(
      `${key}VisualFavorite`
    );

  const changeHairButton =
    document.getElementById(
      `${key}VisualChangeHair`
    );

  const deleteButton =
    document.getElementById(
      `${key}VisualDelete`
    );

  const hairChangeModal =
    document.getElementById(
      `${key}HairChangeModal`
    );

  const hairChangeCancel =
    document.getElementById(
      `${key}HairChangeCancel`
    );


  // =========================================
  // 💾 IndexedDB
  // =========================================

  const DB_NAME =
    `treasure-day-${key}-visual-db`;

  const DB_VERSION = 1;

  const STORE_NAME =
    `${key}Visuals`;

  let visualDB = null;


  function openDB() {

    return new Promise(
      (resolve, reject) => {

        const request =
          indexedDB.open(
            DB_NAME,
            DB_VERSION
          );


        request.onupgradeneeded =
          event => {

            const db =
              event.target.result;

            if (
              !db.objectStoreNames.contains(
                STORE_NAME
              )
            ) {

              db.createObjectStore(
                STORE_NAME,
                {
                  keyPath: "id",
                  autoIncrement: true
                }
              );
            }
          };


        request.onsuccess =
          event => {

            visualDB =
              event.target.result;

            resolve(visualDB);
          };


        request.onerror =
          () => reject(
            request.error
          );
      }
    );
  }


  // =========================================
  // 📸 IMAGE → DataURL
  // =========================================

  function imageToDataURL(file) {

    return new Promise(
      (resolve, reject) => {

        const reader =
          new FileReader();


        reader.onload = () => {

          const img =
            new Image();


          img.onload = () => {

            const MAX_SIZE =
              1600;

            let width =
              img.naturalWidth;

            let height =
              img.naturalHeight;


            if (
              width > height &&
              width > MAX_SIZE
            ) {

              height =
                Math.round(
                  height *
                  MAX_SIZE /
                  width
                );

              width =
                MAX_SIZE;

            } else if (
              height >= width &&
              height > MAX_SIZE
            ) {

              width =
                Math.round(
                  width *
                  MAX_SIZE /
                  height
                );

              height =
                MAX_SIZE;
            }


            const canvas =
              document.createElement(
                "canvas"
              );

            canvas.width =
              width;

            canvas.height =
              height;


            const ctx =
              canvas.getContext("2d");

            if (!ctx) {

              reject(
                new Error(
                  "Canvas unavailable"
                )
              );

              return;
            }


            ctx.drawImage(
              img,
              0,
              0,
              width,
              height
            );


            resolve(
              canvas.toDataURL(
                "image/jpeg",
                0.86
              )
            );
          };


          img.onerror =
            reject;

          img.src =
            reader.result;
        };


        reader.onerror =
          reject;

        reader.readAsDataURL(
          file
        );
      }
    );
  }


  // =========================================
  // 💾 SAVE
  // =========================================

  async function saveVisual(
    file,
    hairColor
  ) {

    const imageData =
      await imageToDataURL(file);


    return new Promise(
      (resolve, reject) => {

        const transaction =
          visualDB.transaction(
            STORE_NAME,
            "readwrite"
          );

        const store =
          transaction.objectStore(
            STORE_NAME
          );


        const data = {

          imageData,

          hairColor,

          favorite: false,

          createdAt:
            Date.now()

        };


        const request =
          store.add(data);


        request.onsuccess = () => {

          data.id =
            request.result;

          resolve(data);
        };


        request.onerror =
          () => reject(
            request.error
          );
      }
    );
  }


  // =========================================
  // 📚 GET ALL
  // =========================================

  function getVisuals() {

    return new Promise(
      (resolve, reject) => {

        if (!visualDB) {

          resolve([]);

          return;
        }


        const transaction =
          visualDB.transaction(
            STORE_NAME,
            "readonly"
          );

        const store =
          transaction.objectStore(
            STORE_NAME
          );

        const request =
          store.getAll();


        request.onsuccess =
          () => resolve(
            request.result || []
          );


        request.onerror =
          () => reject(
            request.error
          );
      }
    );
  }


  // =========================================
  // ✏️ UPDATE
  // =========================================

  function updateVisual(item) {

    return new Promise(
      (resolve, reject) => {

        const transaction =
          visualDB.transaction(
            STORE_NAME,
            "readwrite"
          );

        const store =
          transaction.objectStore(
            STORE_NAME
          );

        const request =
          store.put(item);


        request.onsuccess =
          () => resolve();


        request.onerror =
          () => reject(
            request.error
          );
      }
    );
  }


  // =========================================
  // 🗑 DELETE
  // =========================================

  function deleteVisual(item) {

    return new Promise(
      (resolve, reject) => {

        const transaction =
          visualDB.transaction(
            STORE_NAME,
            "readwrite"
          );

        const store =
          transaction.objectStore(
            STORE_NAME
          );

        const request =
          store.delete(item.id);


        request.onsuccess =
          () => resolve();


        request.onerror =
          () => reject(
            request.error
          );
      }
    );
  }


  // =========================================
  // 📸 CARD
  // =========================================

  let currentItem = null;


  function createVisualCard(item) {

    if (!visualGrid) return;


    const card =
      document.createElement(
        "div"
      );

  card.className =
  `jihoon-visual-card ${key}-visual-card`;
    const hairColor =
      item.hairColor ||
      "UNTAGGED";


    card.dataset.hair =
      hairColor;


    const img =
      document.createElement(
        "img"
      );

    img.alt =
      `${displayName} VISUAL`;

    img.decoding =
      "async";

    img.loading =
      "lazy";

    img.src =
      item.imageData || "";


    const hairTag =
      document.createElement(
        "div"
      );

    hairTag.className =
      "jihoon-visual-hair-tag";


    const hairLabels = {

      BLACK: "🖤 BLACK",

      BROWN: "🤎 BROWN",

      RED: "❤️ RED",

      PINK: "🩷 PINK",

      BLONDE: "💛 BLONDE",

      GRAY: "🩶 GRAY",

      OTHER: "✨ OTHER",

      UNTAGGED:
        "💎 UNTAGGED"

    };


    hairTag.textContent =
      hairLabels[hairColor] ||
      "✨ OTHER";


    const favoriteBadge =
      document.createElement(
        "div"
      );

    favoriteBadge.className =
      "jihoon-visual-favorite-badge";


    if (
      item.favorite === true
    ) {

      favoriteBadge.textContent =
        "♥";

      favoriteBadge.classList.add(
        "show"
      );
    }


    card.addEventListener(
      "click",
      () => {

        openVisualEdit(
          item
        );
      }
    );


    card.appendChild(img);

    card.appendChild(
      hairTag
    );

    card.appendChild(
      favoriteBadge
    );


    visualGrid.prepend(
      card
    );
  }


  // =========================================
  // 📚 LOAD
  // =========================================

  async function loadVisuals() {

    if (!visualGrid) return;


    visualGrid.innerHTML =
      "";


    const visuals =
      await getVisuals();


    visuals
      .sort(
        (a, b) =>
          a.createdAt -
          b.createdAt
      )
      .forEach(
        item => {

          createVisualCard(
            item
          );
        }
      );
  }


  // =========================================
  // 📸 OPEN / CLOSE
  // =========================================

  if (
    visualOpen &&
    visualBook
  ) {

    visualOpen.addEventListener(
      "click",
      async () => {

        visualBook.classList.add(
          "active"
        );

        visualBook.scrollTop =
          0;

        await loadVisuals();

        document.body.style.overflow =
          "hidden";
      }
    );
  }


  if (
    visualClose &&
    visualBook
  ) {

    visualClose.addEventListener(
      "click",
      () => {

        visualBook.classList.remove(
          "active"
        );

        document.body.style.overflow =
          "hidden";
      }
    );
  }


  // =========================================
  // ＋ ADD VISUAL
  // =========================================

  if (
    visualAdd &&
    visualInput
  ) {

    visualAdd.addEventListener(
      "click",
      () => {

        visualInput.click();
      }
    );
  }


  // =========================================
  // 🎨 ADD HAIR
  // =========================================

  let pendingFile =
    null;


  const hairButtons =
    hairModal
      ? hairModal.querySelectorAll(
          "[data-hair]"
        )
      : [];


  if (visualInput) {

    visualInput.addEventListener(
      "change",
      () => {

        const file =
          visualInput.files[0];


        if (!file) return;


        pendingFile =
          file;


        if (hairModal) {

          hairModal.classList.add(
            "active"
          );
        }
      }
    );
  }


  hairButtons.forEach(
    button => {

      button.addEventListener(
        "click",
        async () => {

          if (!pendingFile) {
            return;
          }


          try {

            const savedItem =
              await saveVisual(
                pendingFile,
                button.dataset.hair
              );


            createVisualCard(
              savedItem
            );


          } catch (error) {

            console.error(
              `${displayName} VISUAL SAVE ERROR`,
              error
            );

            alert(
              "写真の保存に失敗しました🥲"
            );
          }


          pendingFile =
            null;


          if (visualInput) {

            visualInput.value =
              "";
          }


          if (hairModal) {

            hairModal.classList.remove(
              "active"
            );
          }
        }
      );
    }
  );


  // CANCEL

  if (hairCancel) {

    hairCancel.addEventListener(
      "click",
      () => {

        pendingFile =
          null;


        if (visualInput) {

          visualInput.value =
            "";
        }


        if (hairModal) {

          hairModal.classList.remove(
            "active"
          );
        }
      }
    );
  }


  // =========================================
  // ✏️ EDIT
  // =========================================

  function openVisualEdit(
    item
  ) {

    if (
      !editModal ||
      !editImage
    ) {
      return;
    }


    currentItem =
      item;


    editImage.src =
      item.imageData || "";


    if (favoriteButton) {

      const isFavorite =
        item.favorite === true;


      favoriteButton.textContent =
        isFavorite
          ? "♥ FAVORITED"
          : "♡ FAVORITE";


      favoriteButton.classList.toggle(
        "active",
        isFavorite
      );
    }


    editModal.classList.add(
      "active"
    );
  }


  function closeVisualEdit() {

    if (!editModal) return;


    editModal.classList.remove(
      "active"
    );


    if (editImage) {

      editImage.src =
        "";
    }


    currentItem =
      null;
  }


  if (editCancel) {

    editCancel.addEventListener(
      "click",
      closeVisualEdit
    );
  }


  // =========================================
  // ♡ FAVORITE
  // =========================================

  if (favoriteButton) {

    favoriteButton.addEventListener(
      "click",
      async () => {

        if (!currentItem) {
          return;
        }


        currentItem.favorite =
          currentItem.favorite !==
          true;


        await updateVisual(
          currentItem
        );


        const isFavorite =
          currentItem.favorite ===
          true;


        favoriteButton.textContent =
          isFavorite
            ? "♥ FAVORITED"
            : "♡ FAVORITE";


        favoriteButton.classList.toggle(
          "active",
          isFavorite
        );


        await loadVisuals();
      }
    );
  }


  // =========================================
  // 🎨 CHANGE HAIR
  // =========================================

  const hairChangeButtons =
    hairChangeModal
      ? hairChangeModal.querySelectorAll(
          "[data-hair]"
        )
      : [];


  if (changeHairButton) {

    changeHairButton.addEventListener(
      "click",
      () => {

        if (
          !currentItem ||
          !hairChangeModal
        ) {
          return;
        }


        hairChangeModal.classList.add(
          "active"
        );
      }
    );
  }


  hairChangeButtons.forEach(
    button => {

      button.addEventListener(
        "click",
        async () => {

          if (!currentItem) {
            return;
          }


          currentItem.hairColor =
            button.dataset.hair;


          await updateVisual(
            currentItem
          );


          hairChangeModal.classList.remove(
            "active"
          );


          closeVisualEdit();


          await loadVisuals();
        }
      );
    }
  );


  if (hairChangeCancel) {

    hairChangeCancel.addEventListener(
      "click",
      () => {

        if (hairChangeModal) {

          hairChangeModal.classList.remove(
            "active"
          );
        }
      }
    );
  }


  // =========================================
  // 🗑 DELETE
  // =========================================

  if (deleteButton) {

    deleteButton.addEventListener(
      "click",
      async () => {

        if (!currentItem) {
          return;
        }


        const ok =
          confirm(
            `この${japaneseName}をVISUAL BOOKから削除しますか？🥲`
          );


        if (!ok) return;


        await deleteVisual(
          currentItem
        );


        closeVisualEdit();


        await loadVisuals();
      }
    );
  }


  // =========================================
  // 🎨 FILTER
  // =========================================

  const hairFilters =
    document.querySelectorAll(
      `.${key}-hair-filter button`
    );


  hairFilters.forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const selectedHair =
            button.dataset.hair;


          hairFilters.forEach(
            filterButton => {

              filterButton.classList.remove(
                "active"
              );
            }
          );


          button.classList.add(
            "active"
          );


          const cards =
            document.querySelectorAll(
              `.${key}-visual-card`
            );


          cards.forEach(
            card => {

              card.style.display =
                selectedHair ===
                  "ALL" ||
                card.dataset.hair ===
                  selectedHair
                  ? ""
                  : "none";
            }
          );
        }
      );
    }
  );


  // =========================================
  // 🚀 INITIALIZE
  // =========================================

  openDB()
    .then(
      async () => {

        await loadVisuals();
      }
    )
    .catch(
      error => {

        console.error(
          `${displayName} VISUAL DB ERROR`,
          error
        );
      }
    );


  // 後のRANKING/GROWTHでも使えるよう返す
  return {

    getVisuals,

    updateVisual,

    loadVisuals

  };
}


// ======================================================
// 🐯 YOSHI VISUAL BOOK START
// ======================================================

const yoshiVisualSystem =
  setupMemberVisualBook({

    key: "yoshi",

    displayName: "YOSHI",

    japaneseName: "ヨシ"

  });
// ======================================================
// 🐨 JUNKYU VISUAL BOOK START
// ======================================================

const junkyuVisualSystem =
  setupMemberVisualBook({

    key: "junkyu",

    displayName: "JUNKYU",

    japaneseName: "ジュンギュ"

  });
// ======================================================
// 🦁 JAEHYUK VISUAL BOOK START
// ======================================================

const jaehyukVisualSystem =
  setupMemberVisualBook({

    key: "jaehyuk",

    displayName: "JAEHYUK",

    japaneseName: "ジェヒョク"

  });
// ======================================================
// 🤖 ASAHI VISUAL BOOK
// ======================================================

const asahiVisualSystem =
  setupMemberVisualBook({

    key: "asahi",

    displayName: "ASAHI",

    japaneseName: "アサヒ"

  });
// ======================================================
// 👑 ASAHI VISUAL RANKING
// ======================================================

const asahiVisualRankingSystem =
  setupMemberVisualRanking({

    key: "asahi",

    displayName: "ASAHI",

    visualSystem:
      asahiVisualSystem

  });

// ======================================================
// 👑 MEMBER VISUAL RANKING 共通エンジン
// ======================================================

function setupMemberVisualRanking(
  config
) {

  const {
    key,
    displayName,
    visualSystem
  } = config;


  const open =
    document.getElementById(
      `${key}VisualRankingOpen`
    );

  const page =
    document.getElementById(
      `${key}VisualRankingPage`
    );

  const back =
    document.getElementById(
      `${key}VisualRankingBack`
    );

  const list =
    document.getElementById(
      `${key}VisualRankingList`
    );


  if (
    !visualSystem ||
    !list
  ) {
    return;
  }


  async function loadRanking() {

    list.innerHTML = "";


    const visuals =
      await visualSystem.getVisuals();


    const favorites =
      visuals.filter(
        item =>
          item.favorite === true
      );


    favorites.sort(
      (a, b) => {

        const orderA =
          a.rankOrder ??
          Number.MAX_SAFE_INTEGER;

        const orderB =
          b.rankOrder ??
          Number.MAX_SAFE_INTEGER;

        return orderA - orderB;
      }
    );


    // 初回順位セット
    for (
      let i = 0;
      i < favorites.length;
      i++
    ) {

      if (
        favorites[i].rankOrder ==
        null
      ) {

        favorites[i].rankOrder =
          i;

        await visualSystem.updateVisual(
          favorites[i]
        );
      }
    }


    if (
      favorites.length === 0
    ) {

      list.innerHTML = `
        <div class="jihoon-ranking-empty">
          ♡ FAVORITEした写真がまだありません
        </div>
      `;

      return;
    }


    favorites.forEach(
      (item, index) => {

        const card =
          document.createElement(
            "div"
          );

        card.className =
          "jihoon-visual-ranking-item";


        const rank =
          document.createElement(
            "div"
          );

        rank.className =
          "jihoon-visual-ranking-number";


        const rankLabels = [
          "🥇 1ST",
          "🥈 2ND",
          "🥉 3RD"
        ];


        rank.textContent =
          rankLabels[index] ||
          `#${index + 1}`;


        const img =
          document.createElement(
            "img"
          );

        img.alt =
          `${displayName} VISUAL`;

        img.loading =
          "lazy";

        img.decoding =
          "async";

        img.src =
          item.imageData || "";


        const controls =
          document.createElement(
            "div"
          );

        controls.className =
          "jihoon-visual-ranking-controls";


        const upButton =
          document.createElement(
            "button"
          );

        upButton.type =
          "button";

        upButton.textContent =
          "↑  UP";

        upButton.className =
          "jihoon-ranking-move-button";


        const downButton =
          document.createElement(
            "button"
          );

        downButton.type =
          "button";

        downButton.textContent =
          "DOWN  ↓";

        downButton.className =
          "jihoon-ranking-move-button";


        upButton.addEventListener(
          "click",
          async () => {

            if (
              index === 0
            ) {
              return;
            }


            const previousItem =
              favorites[
                index - 1
              ];


            const currentOrder =
              item.rankOrder ??
              index;

            const previousOrder =
              previousItem.rankOrder ??
              index - 1;


            item.rankOrder =
              previousOrder;

            previousItem.rankOrder =
              currentOrder;


            await visualSystem.updateVisual(
              item
            );

            await visualSystem.updateVisual(
              previousItem
            );


            await loadRanking();
          }
        );


        downButton.addEventListener(
          "click",
          async () => {

            if (
              index ===
              favorites.length - 1
            ) {
              return;
            }


            const nextItem =
              favorites[
                index + 1
              ];


            const currentOrder =
              item.rankOrder ??
              index;

            const nextOrder =
              nextItem.rankOrder ??
              index + 1;


            item.rankOrder =
              nextOrder;

            nextItem.rankOrder =
              currentOrder;


            await visualSystem.updateVisual(
              item
            );

            await visualSystem.updateVisual(
              nextItem
            );


            await loadRanking();
          }
        );


        controls.appendChild(
          upButton
        );

        controls.appendChild(
          downButton
        );


        card.appendChild(
          rank
        );

        card.appendChild(
          img
        );

        card.appendChild(
          controls
        );


        list.appendChild(
          card
        );
      }
    );
  }


  if (
    open &&
    page
  ) {

    open.addEventListener(
      "click",
      async () => {

        page.style.display =
          "block";

        page.scrollTop =
          0;

        await loadRanking();

        document.body.style.overflow =
          "hidden";
      }
    );
  }


  if (
    back &&
    page
  ) {

    back.addEventListener(
      "click",
      () => {

        page.style.display =
          "none";

        document.body.style.overflow =
          "hidden";
      }
    );
  }


  return {
    loadRanking
  };
}


// 🐯 YOSHI RANKING START

const yoshiVisualRankingSystem =
  setupMemberVisualRanking({

    key: "yoshi",

    displayName: "YOSHI",

    visualSystem:
      yoshiVisualSystem

  });
// ======================================================
// 🐨 JUNKYU RANKING START
// ======================================================

const junkyuVisualRankingSystem =
  setupMemberVisualRanking({

    key: "junkyu",

    displayName: "JUNKYU",

    visualSystem:
      junkyuVisualSystem

  });
// ======================================================
// 🦁 JAEHYUK RANKING START
// ======================================================

const jaehyukVisualRankingSystem =
  setupMemberVisualRanking({

    key: "jaehyuk",

    displayName: "JAEHYUK",

    visualSystem:
      jaehyukVisualSystem

  });
// ======================================================
// 🌱 MEMBER GROWTH HISTORY 共通エンジン
// YOSHI以降の量産用
// ======================================================

function setupMemberGrowthHistory(config) {

  const {
    key,
    displayName
  } = config;


  // =========================================
  // DOM
  // =========================================

  const open =
    document.getElementById(
      `${key}GrowthHistoryOpen`
    );

  const page =
    document.getElementById(
      `${key}GrowthHistoryPage`
    );

  const back =
    document.getElementById(
      `${key}GrowthHistoryBack`
    );

  const input =
    document.getElementById(
      `${key}GrowthInput`
    );

  const addButtons =
    document.querySelectorAll(
      `.${key}-growth-add`
    );


  // =========================================
  // 💾 IndexedDB
  // =========================================

  const DB_NAME =
    `treasure-day-${key}-growth-db`;

  const DB_VERSION = 1;

  const STORE_NAME =
    `${key}GrowthPhotos`;

  let growthDB = null;

  let selectedYear = null;


  function openGrowthDB() {

    return new Promise(
      (resolve, reject) => {

        const request =
          indexedDB.open(
            DB_NAME,
            DB_VERSION
          );


        request.onupgradeneeded =
          event => {

            const db =
              event.target.result;


            if (
              !db.objectStoreNames.contains(
                STORE_NAME
              )
            ) {

              db.createObjectStore(
                STORE_NAME,
                {
                  keyPath: "id",
                  autoIncrement: true
                }
              );
            }
          };


        request.onsuccess =
          event => {

            growthDB =
              event.target.result;

            resolve(growthDB);
          };


        request.onerror =
          () => {

            reject(
              request.error
            );
          };
      }
    );
  }


  // =========================================
  // 📸 IMAGE → DataURL
  // =========================================

  function growthImageToDataURL(file) {

    return new Promise(
      (resolve, reject) => {

        const reader =
          new FileReader();


        reader.onload = () => {

          const img =
            new Image();


          img.onload = () => {

            const MAX_SIZE = 1600;

            let width =
              img.naturalWidth;

            let height =
              img.naturalHeight;


            if (
              width > height &&
              width > MAX_SIZE
            ) {

              height =
                Math.round(
                  height *
                  MAX_SIZE /
                  width
                );

              width =
                MAX_SIZE;

            } else if (
              height >= width &&
              height > MAX_SIZE
            ) {

              width =
                Math.round(
                  width *
                  MAX_SIZE /
                  height
                );

              height =
                MAX_SIZE;
            }


            const canvas =
              document.createElement(
                "canvas"
              );

            canvas.width =
              width;

            canvas.height =
              height;


            const ctx =
              canvas.getContext("2d");


            if (!ctx) {

              reject(
                new Error(
                  "Canvas unavailable"
                )
              );

              return;
            }


            ctx.drawImage(
              img,
              0,
              0,
              width,
              height
            );


            resolve(
              canvas.toDataURL(
                "image/jpeg",
                0.86
              )
            );
          };


          img.onerror =
            reject;

          img.src =
            reader.result;
        };


        reader.onerror =
          reject;


        reader.readAsDataURL(
          file
        );
      }
    );
  }


  // =========================================
  // 💾 SAVE
  // =========================================

  async function saveGrowthPhoto(
    file,
    year
  ) {

    const imageData =
      await growthImageToDataURL(
        file
      );


    return new Promise(
      (resolve, reject) => {

        const transaction =
          growthDB.transaction(
            STORE_NAME,
            "readwrite"
          );

        const store =
          transaction.objectStore(
            STORE_NAME
          );


        const data = {

          year:
            String(year),

          imageData,

          createdAt:
            Date.now()

        };


        const request =
          store.add(data);


        request.onsuccess =
          () => {

            data.id =
              request.result;

            resolve(data);
          };


        request.onerror =
          () => {

            reject(
              request.error
            );
          };
      }
    );
  }


  // =========================================
  // 📚 GET ALL
  // =========================================

  function getGrowthPhotos() {

    return new Promise(
      (resolve, reject) => {

        if (!growthDB) {

          resolve([]);

          return;
        }


        const transaction =
          growthDB.transaction(
            STORE_NAME,
            "readonly"
          );

        const store =
          transaction.objectStore(
            STORE_NAME
          );

        const request =
          store.getAll();


        request.onsuccess =
          () => {

            resolve(
              request.result || []
            );
          };


        request.onerror =
          () => {

            reject(
              request.error
            );
          };
      }
    );
  }


  // =========================================
  // 🗑 DELETE
  // =========================================

  function deleteGrowthPhoto(id) {

    return new Promise(
      (resolve, reject) => {

        const transaction =
          growthDB.transaction(
            STORE_NAME,
            "readwrite"
          );

        const store =
          transaction.objectStore(
            STORE_NAME
          );

        const request =
          store.delete(id);


        request.onsuccess =
          () => resolve();


        request.onerror =
          () => {

            reject(
              request.error
            );
          };
      }
    );
  }


  // =========================================
  // 📸 CARD
  // =========================================

  function createGrowthCard(item) {

    const grid =
      document.getElementById(
        `${key}Growth${item.year}`
      );


    if (!grid) return;


    const card =
      document.createElement(
        "div"
      );

    card.className =
      "jihoon-growth-photo-card";


    const img =
      document.createElement(
        "img"
      );

    img.src =
      item.imageData || "";

    img.alt =
      `${displayName} ${item.year}`;

    img.loading =
      "lazy";

    img.decoding =
      "async";


    const deleteButton =
      document.createElement(
        "button"
      );

    deleteButton.type =
      "button";

    deleteButton.className =
      "jihoon-growth-photo-delete";

    deleteButton.textContent =
      "×";


    deleteButton.addEventListener(
      "click",
      async event => {

        event.stopPropagation();


        const ok =
          confirm(
            `${item.year}年の写真を削除しますか？🥲`
          );


        if (!ok) return;


        await deleteGrowthPhoto(
          item.id
        );


        await loadGrowthPhotos();
      }
    );


    card.appendChild(img);

    card.appendChild(
      deleteButton
    );


    grid.appendChild(card);
  }


  // =========================================
  // 📚 LOAD
  // =========================================

  async function loadGrowthPhotos() {

    for (
      let year = 2020;
      year <= 2026;
      year++
    ) {

      const grid =
        document.getElementById(
          `${key}Growth${year}`
        );


      if (grid) {

        grid.innerHTML =
          "";
      }
    }


    const photos =
      await getGrowthPhotos();


    photos
      .sort(
        (a, b) =>
          a.createdAt -
          b.createdAt
      )
      .forEach(
        item => {

          createGrowthCard(
            item
          );
        }
      );
  }


  // =========================================
  // 🌱 OPEN
  // =========================================

  if (
    open &&
    page
  ) {

    open.addEventListener(
      "click",
      async () => {

        page.style.display =
          "block";

        page.scrollTop =
          0;


        await loadGrowthPhotos();


        document.body.style.overflow =
          "hidden";
      }
    );
  }


  // =========================================
  // ← BACK
  // =========================================

  if (
    back &&
    page
  ) {

    back.addEventListener(
      "click",
      () => {

        page.style.display =
          "none";

        document.body.style.overflow =
          "hidden";
      }
    );
  }


  // =========================================
  // ＋ ADD
  // =========================================

  addButtons.forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          selectedYear =
            button.dataset.year;


          if (input) {

            input.value =
              "";

            input.click();
          }
        }
      );
    }
  );


  // =========================================
  // 📸 FILE SELECT
  // =========================================

  if (input) {

    input.addEventListener(
      "change",
      async () => {

        const file =
          input.files[0];


        if (
          !file ||
          !selectedYear
        ) {
          return;
        }


        try {

          await saveGrowthPhoto(
            file,
            selectedYear
          );


          await loadGrowthPhotos();


        } catch (error) {

          console.error(
            `${displayName} GROWTH SAVE ERROR`,
            error
          );


          alert(
            "写真の保存に失敗しました🥲"
          );
        }


        input.value =
          "";

        selectedYear =
          null;
      }
    );
  }


  // =========================================
  // 🚀 INITIALIZE
  // =========================================

  openGrowthDB()
    .then(
      async () => {

        await loadGrowthPhotos();
      }
    )
    .catch(
      error => {

        console.error(
          `${displayName} GROWTH DB ERROR`,
          error
        );
      }
    );


  return {

    loadGrowthPhotos,

    getGrowthPhotos

  };
}


// ======================================================
// 🐯 YOSHI GROWTH HISTORY START
// ======================================================

const yoshiGrowthSystem =
  setupMemberGrowthHistory({

    key: "yoshi",

    displayName: "YOSHI"

  });
// ======================================================
// 🐨 JUNKYU GROWTH HISTORY START
// 完成型：YEAR DETAIL + EDIT MODAL
// ======================================================

const junkyuGrowthHistoryOpen =
  document.getElementById("junkyuGrowthHistoryOpen");

const junkyuGrowthHistoryPage =
  document.getElementById("junkyuGrowthHistoryPage");

const junkyuGrowthHistoryBack =
  document.getElementById("junkyuGrowthHistoryBack");

const junkyuGrowthYearPage =
  document.getElementById("junkyuGrowthYearPage");

const junkyuGrowthYearBack =
  document.getElementById("junkyuGrowthYearBack");

const junkyuGrowthYearButtons =
  document.querySelectorAll(".junkyu-growth-year");

const junkyuGrowthYearNumber =
  document.getElementById("junkyuGrowthYearNumber");

const junkyuGrowthYearTitle =
  document.getElementById("junkyuGrowthYearTitle");

const junkyuGrowthYearSubtitle =
  document.getElementById("junkyuGrowthYearSubtitle");

const junkyuGrowthYearVisualTitle =
  document.getElementById("junkyuGrowthYearVisualTitle");

const junkyuGrowthYearCaption =
  document.getElementById("junkyuGrowthYearCaption");

const junkyuGrowthYearVisualGrid =
  document.getElementById("junkyuGrowthYearVisualGrid");

const junkyuGrowthYearVisualAdd =
  document.getElementById("junkyuGrowthYearVisualAdd");

const junkyuGrowthVisualModal =
  document.getElementById("junkyuGrowthVisualModal");

const junkyuGrowthVisualModalKicker =
  document.getElementById("junkyuGrowthVisualModalKicker");

const junkyuGrowthVisualInput =
  document.getElementById("junkyuGrowthVisualInput");

const junkyuGrowthVisualSelect =
  document.getElementById("junkyuGrowthVisualSelect");

const junkyuGrowthVisualPreview =
  document.getElementById("junkyuGrowthVisualPreview");

const junkyuGrowthVisualPreviewImage =
  document.getElementById("junkyuGrowthVisualPreviewImage");

const junkyuGrowthVisualHair =
  document.getElementById("junkyuGrowthVisualHair");

const junkyuGrowthVisualMemo =
  document.getElementById("junkyuGrowthVisualMemo");

const junkyuGrowthVisualSave =
  document.getElementById("junkyuGrowthVisualSave");

const junkyuGrowthVisualDelete =
  document.getElementById("junkyuGrowthVisualDelete");

const junkyuGrowthVisualCancel =
  document.getElementById("junkyuGrowthVisualCancel");

let currentJunkyuGrowthYear = "2020";

let pendingJunkyuGrowthFile = null;

let currentJunkyuGrowthVisualItem = null;

let junkyuGrowthDB = null;

const JUNKYU_GROWTH_DB =
  "treasure-day-junkyu-growth-db";

const JUNKYU_GROWTH_STORE =
  "junkyuGrowthVisuals";
// ======================================================
// 💾 JUNKYU GROWTH IndexedDB
// ======================================================

function openJunkyuGrowthDB() {

  return new Promise((resolve, reject) => {

    const request =
      indexedDB.open(
        JUNKYU_GROWTH_DB,
        1
      );

    request.onupgradeneeded =
      event => {

        const db =
          event.target.result;

        if (
          !db.objectStoreNames.contains(
            JUNKYU_GROWTH_STORE
          )
        ) {

          db.createObjectStore(
            JUNKYU_GROWTH_STORE,
            {
              keyPath: "id"
            }
          );

        }

      };


    request.onsuccess =
      () => {

        junkyuGrowthDB =
          request.result;

        resolve(
          junkyuGrowthDB
        );

      };


    request.onerror =
      () => {

        reject(
          request.error
        );

      };

  });
}


// ======================================================
// 📸 IMAGE → DataURL
// ======================================================

function junkyuGrowthImageToDataURL(
  file
) {

  return new Promise(
    (resolve, reject) => {

      const reader =
        new FileReader();

      reader.onload = () => {

        const img =
          new Image();

        img.onload = () => {

          const MAX_SIZE = 1600;

          let width =
            img.naturalWidth;

          let height =
            img.naturalHeight;


          if (
            width > height &&
            width > MAX_SIZE
          ) {

            height =
              Math.round(
                height *
                MAX_SIZE /
                width
              );

            width =
              MAX_SIZE;

          } else if (
            height >= width &&
            height > MAX_SIZE
          ) {

            width =
              Math.round(
                width *
                MAX_SIZE /
                height
              );

            height =
              MAX_SIZE;

          }


          const canvas =
            document.createElement(
              "canvas"
            );

          canvas.width =
            width;

          canvas.height =
            height;


          const ctx =
            canvas.getContext(
              "2d"
            );

          if (!ctx) {

            reject(
              new Error(
                "Canvas unavailable"
              )
            );

            return;

          }


          ctx.drawImage(
            img,
            0,
            0,
            width,
            height
          );


          resolve(
            canvas.toDataURL(
              "image/jpeg",
              0.86
            )
          );

        };


        img.onerror =
          reject;

        img.src =
          reader.result;

      };


      reader.onerror =
        reject;

      reader.readAsDataURL(
        file
      );

    }
  );
}


// ======================================================
// 💾 SAVE NEW
// ======================================================

async function saveJunkyuGrowthVisual(
  file,
  year,
  hairColor,
  memo
) {

  if (!junkyuGrowthDB) {
    await openJunkyuGrowthDB();
  }


  const imageData =
    await junkyuGrowthImageToDataURL(
      file
    );


  const item = {

    id:
      Date.now() +
      Math.floor(
        Math.random() * 1000
      ),

    year:
      String(year),

    imageData,

    hairColor:
      hairColor || "OTHER",

    memo:
      memo || "",

    createdAt:
      Date.now()

  };


  return new Promise(
    (resolve, reject) => {

      const transaction =
        junkyuGrowthDB.transaction(
          JUNKYU_GROWTH_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          JUNKYU_GROWTH_STORE
        );

      const request =
        store.add(item);


      request.onsuccess =
        () => resolve(item);

      request.onerror =
        () => reject(
          request.error
        );

    }
  );
}


// ======================================================
// ✏️ UPDATE
// ======================================================

function updateJunkyuGrowthVisual(
  item
) {

  return new Promise(
    (resolve, reject) => {

      const transaction =
        junkyuGrowthDB.transaction(
          JUNKYU_GROWTH_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          JUNKYU_GROWTH_STORE
        );

      const request =
        store.put(item);


      request.onsuccess =
        () => resolve();

      request.onerror =
        () => reject(
          request.error
        );

    }
  );
}


// ======================================================
// 📚 GET YEAR VISUALS
// ======================================================

async function getJunkyuGrowthVisuals(
  year
) {

  if (!junkyuGrowthDB) {
    await openJunkyuGrowthDB();
  }


  return new Promise(
    (resolve, reject) => {

      const transaction =
        junkyuGrowthDB.transaction(
          JUNKYU_GROWTH_STORE,
          "readonly"
        );

      const store =
        transaction.objectStore(
          JUNKYU_GROWTH_STORE
        );

      const request =
        store.getAll();


      request.onsuccess =
        () => {

          const items =
            request.result || [];

          resolve(
            items.filter(
              item =>
                String(item.year) ===
                String(year)
            )
          );

        };


      request.onerror =
        () => reject(
          request.error
        );

    }
  );
}


// ======================================================
// 🗑 DELETE
// ======================================================

async function deleteJunkyuGrowthVisual(
  id
) {

  if (!junkyuGrowthDB) {
    await openJunkyuGrowthDB();
  }


  return new Promise(
    (resolve, reject) => {

      const transaction =
        junkyuGrowthDB.transaction(
          JUNKYU_GROWTH_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          JUNKYU_GROWTH_STORE
        );

      const request =
        store.delete(id);


      request.onsuccess =
        () => resolve();

      request.onerror =
        () => reject(
          request.error
        );

    }
  );
}
// ======================================================
// 🌱 JUNKYU GROWTH YEAR INFO
// ======================================================

const junkyuGrowthYearInfo = {

  "2020": {
    title: "DEBUT ERA 💎"
  },

  "2021": {
    title: "2021 ERA 💎"
  },

  "2022": {
    title: "2022 ERA 💎"
  },

  "2023": {
    title: "2023 ERA 💎"
  },

  "2024": {
    title: "2024 ERA 💎"
  },

  "2025": {
    title: "2025 ERA 💎"
  },

  "2026": {
    title: "NOW ✨"
  }

};


// ======================================================
// 📸 RENDER YEAR VISUALS
// ======================================================

async function renderJunkyuGrowthYearVisuals() {

  if (!junkyuGrowthYearVisualGrid) {
    return;
  }


  junkyuGrowthYearVisualGrid.innerHTML =
    "";


  const items =
    await getJunkyuGrowthVisuals(
      currentJunkyuGrowthYear
    );


  items
    .sort(
      (a, b) =>
        a.createdAt -
        b.createdAt
    )
    .forEach(item => {

      const card =
        document.createElement(
          "button"
        );

      card.type =
        "button";

 card.className =
  "jihoon-growth-visual-card junkyu-growth-visual-card";
const photo =
  document.createElement("div");

photo.className =
  "jihoon-growth-visual-photo junkyu-growth-visual-photo";
      const img =
        document.createElement(
          "img"
        );

      img.src =
        item.imageData || "";

      img.alt =
        `JUNKYU ${item.year}`;

      img.loading =
        "lazy";

      img.decoding =
        "async";


      const info =
        document.createElement(
          "div"
        );

      info.className =
        "jihoon-growth-visual-info";


      const hair =
        document.createElement(
          "span"
        );

      hair.textContent =
        `🎨 ${item.hairColor || "OTHER"}`;


      const memo =
        document.createElement(
          "p"
        );

      memo.textContent =
        item.memo || "";


      info.appendChild(
        hair
      );


      if (item.memo) {

        info.appendChild(
          memo
        );

      }


      photo.appendChild(
  img
);

card.appendChild(
  photo
);

      card.appendChild(
        info
      );


      // 写真タップ → EDIT
      card.addEventListener(
        "click",
        () => {

          currentJunkyuGrowthVisualItem =
            item;

          pendingJunkyuGrowthFile =
            null;


          if (
            junkyuGrowthVisualPreviewImage
          ) {

            junkyuGrowthVisualPreviewImage.src =
              item.imageData || "";

          }


          if (
            junkyuGrowthVisualPreview
          ) {

            junkyuGrowthVisualPreview.style.display =
              "block";

          }


          if (
            junkyuGrowthVisualHair
          ) {

            junkyuGrowthVisualHair.value =
              item.hairColor ||
              "OTHER";

          }


          if (
            junkyuGrowthVisualMemo
          ) {

            junkyuGrowthVisualMemo.value =
              item.memo || "";

          }


          if (
            junkyuGrowthVisualDelete
          ) {

            junkyuGrowthVisualDelete.style.display =
              "block";

          }


          if (
            junkyuGrowthVisualModalKicker
          ) {

            junkyuGrowthVisualModalKicker.textContent =
              `📸 ${item.year} VISUAL`;

          }


          if (
            junkyuGrowthVisualModal
          ) {

            junkyuGrowthVisualModal.style.display =
              "flex";

          }

        }
      );


      junkyuGrowthYearVisualGrid.appendChild(
        card
      );

    });

}


// ======================================================
// 🌱 OPEN YEAR DETAIL
// ======================================================

async function openJunkyuGrowthYear(
  year
) {

  currentJunkyuGrowthYear =
    String(year);


  const info =
    junkyuGrowthYearInfo[
      currentJunkyuGrowthYear
    ] || {
      title:
        `${currentJunkyuGrowthYear} ERA 💎`
    };


  if (
    junkyuGrowthYearNumber
  ) {

    junkyuGrowthYearNumber.textContent =
      currentJunkyuGrowthYear;

  }


  if (
    junkyuGrowthYearTitle
  ) {

    junkyuGrowthYearTitle.textContent =
      info.title;

  }


  if (
    junkyuGrowthYearSubtitle
  ) {

    junkyuGrowthYearSubtitle.textContent =
      `${currentJunkyuGrowthYear}年のジュンギュを振り返ろう 💎`;

  }


  if (
    junkyuGrowthYearVisualTitle
  ) {

    junkyuGrowthYearVisualTitle.textContent =
      `📸 ${currentJunkyuGrowthYear} VISUAL`;

  }


  if (
    junkyuGrowthYearCaption
  ) {

    junkyuGrowthYearCaption.textContent =
      `${currentJunkyuGrowthYear}年のお気に入りジュンギュを残そう 💎`;

  }


  if (
    junkyuGrowthHistoryPage
  ) {

    junkyuGrowthHistoryPage.style.display =
      "none";

  }


  if (
    junkyuGrowthYearPage
  ) {

    junkyuGrowthYearPage.style.display =
      "block";

    junkyuGrowthYearPage.scrollTop =
      0;

  }


  await renderJunkyuGrowthYearVisuals();

}


// ======================================================
// 🌱 YEAR BUTTONS
// ======================================================

junkyuGrowthYearButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      async () => {

        await openJunkyuGrowthYear(
          button.dataset.year
        );

      }
    );

  }
);
// ======================================================
// 🌱 OPEN GROWTH HISTORY
// ======================================================

if (
  junkyuGrowthHistoryOpen &&
  junkyuGrowthHistoryPage
) {

  junkyuGrowthHistoryOpen.addEventListener(
    "click",
    () => {

      if (junkyuBookDetail) {
        junkyuBookDetail.classList.remove(
          "active"
        );
      }

      junkyuGrowthHistoryPage.style.display =
        "block";

      junkyuGrowthHistoryPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// ======================================================
// ← GROWTH HISTORY → JUNKYU BOOK
// ======================================================

if (
  junkyuGrowthHistoryBack &&
  junkyuGrowthHistoryPage
) {

  junkyuGrowthHistoryBack.addEventListener(
    "click",
    () => {

      junkyuGrowthHistoryPage.style.display =
        "none";

      if (junkyuBookDetail) {

        junkyuBookDetail.classList.add(
          "active"
        );

        junkyuBookDetail.scrollTop =
          0;

      }

      document.body.style.overflow =
        "hidden";

    }
  );
}


// ======================================================
// ← YEAR DETAIL → GROWTH HISTORY
// ======================================================

if (
  junkyuGrowthYearBack &&
  junkyuGrowthYearPage
) {

  junkyuGrowthYearBack.addEventListener(
    "click",
    () => {

      junkyuGrowthYearPage.style.display =
        "none";

      junkyuGrowthHistoryPage.style.display =
        "block";

      junkyuGrowthHistoryPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// ======================================================
// ＋ ADD → MODAL
// ======================================================

if (junkyuGrowthYearVisualAdd) {

  junkyuGrowthYearVisualAdd.addEventListener(
    "click",
    () => {

      currentJunkyuGrowthVisualItem =
        null;

      pendingJunkyuGrowthFile =
        null;


      if (junkyuGrowthVisualInput) {
        junkyuGrowthVisualInput.value =
          "";
      }


      if (junkyuGrowthVisualMemo) {
        junkyuGrowthVisualMemo.value =
          "";
      }


      if (junkyuGrowthVisualHair) {
        junkyuGrowthVisualHair.value =
          "BLACK";
      }


      if (junkyuGrowthVisualPreviewImage) {
        junkyuGrowthVisualPreviewImage.src =
          "";
      }


      if (junkyuGrowthVisualPreview) {
        junkyuGrowthVisualPreview.style.display =
          "none";
      }


      if (junkyuGrowthVisualDelete) {
        junkyuGrowthVisualDelete.style.display =
          "none";
      }


      if (junkyuGrowthVisualModalKicker) {

        junkyuGrowthVisualModalKicker.textContent =
          `📸 ${currentJunkyuGrowthYear} VISUAL`;

      }


      if (junkyuGrowthVisualModal) {

        junkyuGrowthVisualModal.style.display =
          "flex";

        junkyuGrowthVisualModal.scrollTop =
          0;

      }

    }
  );
}


// ======================================================
// 📷 SELECT PHOTO
// ======================================================

if (
  junkyuGrowthVisualSelect &&
  junkyuGrowthVisualInput
) {

  junkyuGrowthVisualSelect.addEventListener(
    "click",
    () => {

      junkyuGrowthVisualInput.click();

    }
  );
}


if (junkyuGrowthVisualInput) {

  junkyuGrowthVisualInput.addEventListener(
    "change",
    () => {

      const file =
        junkyuGrowthVisualInput.files[0];

      if (!file) return;


      pendingJunkyuGrowthFile =
        file;


      const reader =
        new FileReader();


      reader.onload =
        () => {

          if (
            junkyuGrowthVisualPreviewImage
          ) {

            junkyuGrowthVisualPreviewImage.src =
              reader.result;

          }


          if (
            junkyuGrowthVisualPreview
          ) {

            junkyuGrowthVisualPreview.style.display =
              "block";

          }

        };


      reader.readAsDataURL(
        file
      );

    }
  );
}


// ======================================================
// 💎 SAVE / UPDATE
// ======================================================

if (junkyuGrowthVisualSave) {

  junkyuGrowthVisualSave.addEventListener(
    "click",
    async () => {

      try {

        const hairColor =
          junkyuGrowthVisualHair
            ? junkyuGrowthVisualHair.value
            : "OTHER";


        const memo =
          junkyuGrowthVisualMemo
            ? junkyuGrowthVisualMemo.value.trim()
            : "";


        // ✏️ UPDATE
        if (
          currentJunkyuGrowthVisualItem
        ) {

          currentJunkyuGrowthVisualItem.hairColor =
            hairColor;

          currentJunkyuGrowthVisualItem.memo =
            memo;


          if (
            pendingJunkyuGrowthFile
          ) {

            currentJunkyuGrowthVisualItem.imageData =
              await junkyuGrowthImageToDataURL(
                pendingJunkyuGrowthFile
              );

          }


          await updateJunkyuGrowthVisual(
            currentJunkyuGrowthVisualItem
          );

        }

        // 📸 NEW
        else {

          if (!pendingJunkyuGrowthFile) {

            alert(
              "写真を選んでね📸"
            );

            return;

          }


          await saveJunkyuGrowthVisual(
            pendingJunkyuGrowthFile,
            currentJunkyuGrowthYear,
            hairColor,
            memo
          );

        }


        closeJunkyuGrowthModal();

        await renderJunkyuGrowthYearVisuals();


      } catch (error) {

        console.error(
          "JUNKYU GROWTH SAVE ERROR:",
          error
        );

        alert(
          "保存に失敗しました🥲"
        );

      }

    }
  );
}


// ======================================================
// 🗑 DELETE
// ======================================================

if (junkyuGrowthVisualDelete) {

  junkyuGrowthVisualDelete.addEventListener(
    "click",
    async () => {

      if (
        !currentJunkyuGrowthVisualItem
      ) {
        return;
      }


      const ok =
        confirm(
          "この写真を削除しますか？🥲"
        );

      if (!ok) return;


      try {

        await deleteJunkyuGrowthVisual(
          currentJunkyuGrowthVisualItem.id
        );

        closeJunkyuGrowthModal();

        await renderJunkyuGrowthYearVisuals();


      } catch (error) {

        console.error(
          "JUNKYU GROWTH DELETE ERROR:",
          error
        );

        alert(
          "削除に失敗しました🥲"
        );

      }

    }
  );
}


// ======================================================
// CANCEL / CLOSE
// ======================================================

function closeJunkyuGrowthModal() {

  pendingJunkyuGrowthFile =
    null;

  currentJunkyuGrowthVisualItem =
    null;


  if (junkyuGrowthVisualInput) {
    junkyuGrowthVisualInput.value =
      "";
  }


  if (junkyuGrowthVisualPreviewImage) {
    junkyuGrowthVisualPreviewImage.src =
      "";
  }


  if (junkyuGrowthVisualPreview) {
    junkyuGrowthVisualPreview.style.display =
      "none";
  }


  if (junkyuGrowthVisualMemo) {
    junkyuGrowthVisualMemo.value =
      "";
  }


  if (junkyuGrowthVisualDelete) {
    junkyuGrowthVisualDelete.style.display =
      "none";
  }


  if (junkyuGrowthVisualModal) {
    junkyuGrowthVisualModal.style.display =
      "none";
  }

}


if (junkyuGrowthVisualCancel) {

  junkyuGrowthVisualCancel.addEventListener(
    "click",
    () => {

      closeJunkyuGrowthModal();

    }
  );
}


// ======================================================
// 🚀 INITIALIZE JUNKYU GROWTH DB
// ======================================================

openJunkyuGrowthDB()
  .catch(
    error => {

      console.error(
        "JUNKYU GROWTH DB ERROR:",
        error
      );

    }
  );
// ======================================================
// ======================================================
// 🦁 JAEHYUK GROWTH HISTORY START
// 完成型：YEAR DETAIL + EDIT MODAL
// ======================================================

const jaehyukGrowthHistoryOpen =
  document.getElementById("jaehyukGrowthHistoryOpen");

const jaehyukGrowthHistoryPage =
  document.getElementById("jaehyukGrowthHistoryPage");

const jaehyukGrowthHistoryBack =
  document.getElementById("jaehyukGrowthHistoryBack");

const jaehyukGrowthYearPage =
  document.getElementById("jaehyukGrowthYearPage");

const jaehyukGrowthYearBack =
  document.getElementById("jaehyukGrowthYearBack");

const jaehyukGrowthYearButtons =
  document.querySelectorAll(".jaehyuk-growth-year");

const jaehyukGrowthYearNumber =
  document.getElementById("jaehyukGrowthYearNumber");

const jaehyukGrowthYearTitle =
  document.getElementById("jaehyukGrowthYearTitle");

const jaehyukGrowthYearSubtitle =
  document.getElementById("jaehyukGrowthYearSubtitle");

const jaehyukGrowthYearVisualTitle =
  document.getElementById("jaehyukGrowthYearVisualTitle");

const jaehyukGrowthYearCaption =
  document.getElementById("jaehyukGrowthYearCaption");

const jaehyukGrowthYearVisualGrid =
  document.getElementById("jaehyukGrowthYearVisualGrid");

const jaehyukGrowthYearVisualAdd =
  document.getElementById("jaehyukGrowthYearVisualAdd");

const jaehyukGrowthVisualModal =
  document.getElementById("jaehyukGrowthVisualModal");

const jaehyukGrowthVisualModalKicker =
  document.getElementById("jaehyukGrowthVisualModalKicker");

const jaehyukGrowthVisualInput =
  document.getElementById("jaehyukGrowthVisualInput");

const jaehyukGrowthVisualSelect =
  document.getElementById("jaehyukGrowthVisualSelect");

const jaehyukGrowthVisualPreview =
  document.getElementById("jaehyukGrowthVisualPreview");

const jaehyukGrowthVisualPreviewImage =
  document.getElementById("jaehyukGrowthVisualPreviewImage");

const jaehyukGrowthVisualHair =
  document.getElementById("jaehyukGrowthVisualHair");

const jaehyukGrowthVisualMemo =
  document.getElementById("jaehyukGrowthVisualMemo");

const jaehyukGrowthVisualSave =
  document.getElementById("jaehyukGrowthVisualSave");

const jaehyukGrowthVisualDelete =
  document.getElementById("jaehyukGrowthVisualDelete");

const jaehyukGrowthVisualCancel =
  document.getElementById("jaehyukGrowthVisualCancel");

let currentJaehyukGrowthYear = "2020";

let pendingJaehyukGrowthFile = null;

let currentJaehyukGrowthVisualItem = null;

let jaehyukGrowthDB = null;

const JAEHYUK_GROWTH_DB =
  "treasure-day-jaehyuk-growth-db";

const JAEHYUK_GROWTH_STORE =
  "jaehyukGrowthVisuals";
// ======================================================
// 💾 JAEHYUK GROWTH IndexedDB
// ======================================================

function openJaehyukGrowthDB() {

  return new Promise((resolve, reject) => {

    const request =
      indexedDB.open(
        JAEHYUK_GROWTH_DB,
        1
      );

    request.onupgradeneeded =
      event => {

        const db =
          event.target.result;

        if (
          !db.objectStoreNames.contains(
            JAEHYUK_GROWTH_STORE
          )
        ) {

          db.createObjectStore(
            JAEHYUK_GROWTH_STORE,
            {
              keyPath: "id"
            }
          );

        }

      };


    request.onsuccess =
      () => {

        jaehyukGrowthDB =
          request.result;

        resolve(
          jaehyukGrowthDB
        );

      };


    request.onerror =
      () => {

        reject(
          request.error
        );

      };

  });
}


// ======================================================
// 📸 IMAGE → DataURL
// ======================================================

function jaehyukGrowthImageToDataURL(
  file
) {

  return new Promise(
    (resolve, reject) => {

      const reader =
        new FileReader();

      reader.onload = () => {

        const img =
          new Image();

        img.onload = () => {

          const MAX_SIZE = 1600;

          let width =
            img.naturalWidth;

          let height =
            img.naturalHeight;


          if (
            width > height &&
            width > MAX_SIZE
          ) {

            height =
              Math.round(
                height *
                MAX_SIZE /
                width
              );

            width =
              MAX_SIZE;

          } else if (
            height >= width &&
            height > MAX_SIZE
          ) {

            width =
              Math.round(
                width *
                MAX_SIZE /
                height
              );

            height =
              MAX_SIZE;

          }


          const canvas =
            document.createElement(
              "canvas"
            );

          canvas.width =
            width;

          canvas.height =
            height;


          const ctx =
            canvas.getContext(
              "2d"
            );

          if (!ctx) {

            reject(
              new Error(
                "Canvas unavailable"
              )
            );

            return;

          }


          ctx.drawImage(
            img,
            0,
            0,
            width,
            height
          );


          resolve(
            canvas.toDataURL(
              "image/jpeg",
              0.86
            )
          );

        };


        img.onerror =
          reject;

        img.src =
          reader.result;

      };


      reader.onerror =
        reject;

      reader.readAsDataURL(
        file
      );

    }
  );
}


// ======================================================
// 💾 SAVE NEW
// ======================================================

async function saveJaehyukGrowthVisual(
  file,
  year,
  hairColor,
  memo
) {

  if (!jaehyukGrowthDB) {
    await openJaehyukGrowthDB();
  }


  const imageData =
    await jaehyukGrowthImageToDataURL(
      file
    );


  const item = {

    id:
      Date.now() +
      Math.floor(
        Math.random() * 1000
      ),

    year:
      String(year),

    imageData,

    hairColor:
      hairColor || "OTHER",

    memo:
      memo || "",

    createdAt:
      Date.now()

  };


  return new Promise(
    (resolve, reject) => {

      const transaction =
        jaehyukGrowthDB.transaction(
          JAEHYUK_GROWTH_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          JAEHYUK_GROWTH_STORE
        );

      const request =
        store.add(item);


      request.onsuccess =
        () => resolve(item);

      request.onerror =
        () => reject(
          request.error
        );

    }
  );
}


// ======================================================
// ✏️ UPDATE
// ======================================================

function updateJaehyukGrowthVisual(
  item
) {

  return new Promise(
    (resolve, reject) => {

      const transaction =
        jaehyukGrowthDB.transaction(
          JAEHYUK_GROWTH_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          JAEHYUK_GROWTH_STORE
        );

      const request =
        store.put(item);


      request.onsuccess =
        () => resolve();

      request.onerror =
        () => reject(
          request.error
        );

    }
  );
}


// ======================================================
// 📚 GET YEAR VISUALS
// ======================================================

async function getJaehyukGrowthVisuals(
  year
) {

  if (!jaehyukGrowthDB) {
    await openJaehyukGrowthDB();
  }


  return new Promise(
    (resolve, reject) => {

      const transaction =
        jaehyukGrowthDB.transaction(
          JAEHYUK_GROWTH_STORE,
          "readonly"
        );

      const store =
        transaction.objectStore(
          JAEHYUK_GROWTH_STORE
        );

      const request =
        store.getAll();


      request.onsuccess =
        () => {

          const items =
            request.result || [];

          resolve(
            items.filter(
              item =>
                String(item.year) ===
                String(year)
            )
          );

        };


      request.onerror =
        () => reject(
          request.error
        );

    }
  );
}


// ======================================================
// 🗑 DELETE
// ======================================================

async function deleteJaehyukGrowthVisual(
  id
) {

  if (!jaehyukGrowthDB) {
    await openJaehyukGrowthDB();
  }


  return new Promise(
    (resolve, reject) => {

      const transaction =
        jaehyukGrowthDB.transaction(
          JAEHYUK_GROWTH_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          JAEHYUK_GROWTH_STORE
        );

      const request =
        store.delete(id);


      request.onsuccess =
        () => resolve();

      request.onerror =
        () => reject(
          request.error
        );

    }
  );
}
// ======================================================
// 🌱 JAEHYUK GROWTH YEAR INFO
// ======================================================

const jaehyukGrowthYearInfo = {

  "2020": {
    title: "DEBUT ERA 💎"
  },

  "2021": {
    title: "2021 ERA 💎"
  },

  "2022": {
    title: "2022 ERA 💎"
  },

  "2023": {
    title: "2023 ERA 💎"
  },

  "2024": {
    title: "2024 ERA 💎"
  },

  "2025": {
    title: "2025 ERA 💎"
  },

  "2026": {
    title: "NOW ✨"
  }

};


// ======================================================
// 📸 RENDER YEAR VISUALS
// ======================================================

async function renderJaehyukGrowthYearVisuals() {

  if (!jaehyukGrowthYearVisualGrid) {
    return;
  }


  jaehyukGrowthYearVisualGrid.innerHTML =
    "";


  const items =
    await getJaehyukGrowthVisuals(
      currentJaehyukGrowthYear
    );


  items
    .sort(
      (a, b) =>
        a.createdAt -
        b.createdAt
    )
    .forEach(item => {

      const card =
        document.createElement(
          "button"
        );

      card.type =
        "button";

 card.className =
  "jihoon-growth-visual-card jaehyuk-growth-visual-card";
const photo =
  document.createElement("div");

photo.className =
  "jihoon-growth-visual-photo jaehyuk-growth-visual-photo";
      const img =
        document.createElement(
          "img"
        );

      img.src =
        item.imageData || "";

      img.alt =
        `JAEHYUK ${item.year}`;

      img.loading =
        "lazy";

      img.decoding =
        "async";


      const info =
        document.createElement(
          "div"
        );

      info.className =
        "jihoon-growth-visual-info";


      const hair =
        document.createElement(
          "span"
        );

      hair.textContent =
        `🎨 ${item.hairColor || "OTHER"}`;


      const memo =
        document.createElement(
          "p"
        );

      memo.textContent =
        item.memo || "";


      info.appendChild(
        hair
      );


      if (item.memo) {

        info.appendChild(
          memo
        );

      }


      photo.appendChild(
  img
);

card.appendChild(
  photo
);

      card.appendChild(
        info
      );


      // 写真タップ → EDIT
      card.addEventListener(
        "click",
        () => {

          currentJaehyukGrowthVisualItem =
            item;

          pendingJaehyukGrowthFile =
            null;


          if (
            jaehyukGrowthVisualPreviewImage
          ) {

            jaehyukGrowthVisualPreviewImage.src =
              item.imageData || "";

          }


          if (
            jaehyukGrowthVisualPreview
          ) {

            jaehyukGrowthVisualPreview.style.display =
              "block";

          }


          if (
            jaehyukGrowthVisualHair
          ) {

            jaehyukGrowthVisualHair.value =
              item.hairColor ||
              "OTHER";

          }


          if (
            jaehyukGrowthVisualMemo
          ) {

            jaehyukGrowthVisualMemo.value =
              item.memo || "";

          }


          if (
            jaehyukGrowthVisualDelete
          ) {

            jaehyukGrowthVisualDelete.style.display =
              "block";

          }


          if (
            jaehyukGrowthVisualModalKicker
          ) {

            jaehyukGrowthVisualModalKicker.textContent =
              `📸 ${item.year} VISUAL`;

          }


          if (
            jaehyukGrowthVisualModal
          ) {

            jaehyukGrowthVisualModal.style.display =
              "flex";

          }

        }
      );


      jaehyukGrowthYearVisualGrid.appendChild(
        card
      );

    });

}


// ======================================================
// 🌱 OPEN YEAR DETAIL
// ======================================================

async function openJaehyukGrowthYear(
  year
) {

  currentJaehyukGrowthYear =
    String(year);


  const info =
    jaehyukGrowthYearInfo[
      currentJaehyukGrowthYear
    ] || {
      title:
        `${currentJaehyukGrowthYear} ERA 💎`
    };


  if (
    jaehyukGrowthYearNumber
  ) {

    jaehyukGrowthYearNumber.textContent =
      currentJaehyukGrowthYear;

  }


  if (
    jaehyukGrowthYearTitle
  ) {

    jaehyukGrowthYearTitle.textContent =
      info.title;

  }


  if (
    jaehyukGrowthYearSubtitle
  ) {

    jaehyukGrowthYearSubtitle.textContent =
      `${currentJaehyukGrowthYear}年のジェヒョクを振り返ろう 💎`;

  }


  if (
    jaehyukGrowthYearVisualTitle
  ) {

    jaehyukGrowthYearVisualTitle.textContent =
      `📸 ${currentJaehyukGrowthYear} VISUAL`;

  }


  if (
    jaehyukGrowthYearCaption
  ) {

    jaehyukGrowthYearCaption.textContent =
      `${currentJaehyukGrowthYear}年のお気に入りジェヒョクを残そう 💎`;

  }


  if (
    jaehyukGrowthHistoryPage
  ) {

    jaehyukGrowthHistoryPage.style.display =
      "none";

  }


  if (
    jaehyukGrowthYearPage
  ) {

    jaehyukGrowthYearPage.style.display =
      "block";

    jaehyukGrowthYearPage.scrollTop =
      0;

  }


  await renderJaehyukGrowthYearVisuals();

}


// ======================================================
// 🌱 YEAR BUTTONS
// ======================================================

jaehyukGrowthYearButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      async () => {

        await openJaehyukGrowthYear(
          button.dataset.year
        );

      }
    );

  }
);
// ======================================================
// 🌱 OPEN GROWTH HISTORY
// ======================================================

if (
  jaehyukGrowthHistoryOpen &&
  jaehyukGrowthHistoryPage
) {

  jaehyukGrowthHistoryOpen.addEventListener(
    "click",
    () => {

      if (jaehyukBookDetail) {
        jaehyukBookDetail.classList.remove(
          "active"
        );
      }

      jaehyukGrowthHistoryPage.style.display =
        "block";

      jaehyukGrowthHistoryPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// ======================================================
// ← GROWTH HISTORY → JAEHYUK BOOK
// ======================================================

if (
  jaehyukGrowthHistoryBack &&
  jaehyukGrowthHistoryPage
) {

  jaehyukGrowthHistoryBack.addEventListener(
    "click",
    () => {

      jaehyukGrowthHistoryPage.style.display =
        "none";

      if (jaehyukBookDetail) {

        jaehyukBookDetail.classList.add(
          "active"
        );

        jaehyukBookDetail.scrollTop =
          0;

      }

      document.body.style.overflow =
        "hidden";

    }
  );
}


// ======================================================
// ← YEAR DETAIL → GROWTH HISTORY
// ======================================================

if (
  jaehyukGrowthYearBack &&
  jaehyukGrowthYearPage
) {

  jaehyukGrowthYearBack.addEventListener(
    "click",
    () => {

      jaehyukGrowthYearPage.style.display =
        "none";

      jaehyukGrowthHistoryPage.style.display =
        "block";

      jaehyukGrowthHistoryPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// ======================================================
// ＋ ADD → MODAL
// ======================================================

if (jaehyukGrowthYearVisualAdd) {

  jaehyukGrowthYearVisualAdd.addEventListener(
    "click",
    () => {

      currentJaehyukGrowthVisualItem =
        null;

      pendingJaehyukGrowthFile =
        null;


      if (jaehyukGrowthVisualInput) {
        jaehyukGrowthVisualInput.value =
          "";
      }


      if (jaehyukGrowthVisualMemo) {
        jaehyukGrowthVisualMemo.value =
          "";
      }


      if (jaehyukGrowthVisualHair) {
        jaehyukGrowthVisualHair.value =
          "BLACK";
      }


      if (jaehyukGrowthVisualPreviewImage) {
        jaehyukGrowthVisualPreviewImage.src =
          "";
      }


      if (jaehyukGrowthVisualPreview) {
        jaehyukGrowthVisualPreview.style.display =
          "none";
      }


      if (jaehyukGrowthVisualDelete) {
        jaehyukGrowthVisualDelete.style.display =
          "none";
      }


      if (jaehyukGrowthVisualModalKicker) {

        jaehyukGrowthVisualModalKicker.textContent =
          `📸 ${currentJaehyukGrowthYear} VISUAL`;

      }


      if (jaehyukGrowthVisualModal) {

        jaehyukGrowthVisualModal.style.display =
          "flex";

        jaehyukGrowthVisualModal.scrollTop =
          0;

      }

    }
  );
}


// ======================================================
// 📷 SELECT PHOTO
// ======================================================

if (
  jaehyukGrowthVisualSelect &&
  jaehyukGrowthVisualInput
) {

  jaehyukGrowthVisualSelect.addEventListener(
    "click",
    () => {

      jaehyukGrowthVisualInput.click();

    }
  );
}


if (jaehyukGrowthVisualInput) {

  jaehyukGrowthVisualInput.addEventListener(
    "change",
    () => {

      const file =
        jaehyukGrowthVisualInput.files[0];

      if (!file) return;


      pendingJaehyukGrowthFile =
        file;


      const reader =
        new FileReader();


      reader.onload =
        () => {

          if (
            jaehyukGrowthVisualPreviewImage
          ) {

            jaehyukGrowthVisualPreviewImage.src =
              reader.result;

          }


          if (
            jaehyukGrowthVisualPreview
          ) {

            jaehyukGrowthVisualPreview.style.display =
              "block";

          }

        };


      reader.readAsDataURL(
        file
      );

    }
  );
}


// ======================================================
// 💎 SAVE / UPDATE
// ======================================================

if (jaehyukGrowthVisualSave) {

  jaehyukGrowthVisualSave.addEventListener(
    "click",
    async () => {

      try {

        const hairColor =
          jaehyukGrowthVisualHair
            ? jaehyukGrowthVisualHair.value
            : "OTHER";


        const memo =
          jaehyukGrowthVisualMemo
            ? jaehyukGrowthVisualMemo.value.trim()
            : "";


        // ✏️ UPDATE
        if (
          currentJaehyukGrowthVisualItem
        ) {

          currentJaehyukGrowthVisualItem.hairColor =
            hairColor;

          currentJaehyukGrowthVisualItem.memo =
            memo;


          if (
            pendingJaehyukGrowthFile
          ) {

            currentJaehyukGrowthVisualItem.imageData =
              await jaehyukGrowthImageToDataURL(
                pendingJaehyukGrowthFile
              );

          }


          await updateJaehyukGrowthVisual(
            currentJaehyukGrowthVisualItem
          );

        }

        // 📸 NEW
        else {

          if (!pendingJaehyukGrowthFile) {

            alert(
              "写真を選んでね📸"
            );

            return;

          }


          await saveJaehyukGrowthVisual(
            pendingJaehyukGrowthFile,
            currentJaehyukGrowthYear,
            hairColor,
            memo
          );

        }


        closeJaehyukGrowthModal();

        await renderJaehyukGrowthYearVisuals();


      } catch (error) {

        console.error(
          "JAEHYUK GROWTH SAVE ERROR:",
          error
        );

        alert(
          "保存に失敗しました🥲"
        );

      }

    }
  );
}


// ======================================================
// 🗑 DELETE
// ======================================================

if (jaehyukGrowthVisualDelete) {

  jaehyukGrowthVisualDelete.addEventListener(
    "click",
    async () => {

      if (
        !currentJaehyukGrowthVisualItem
      ) {
        return;
      }


      const ok =
        confirm(
          "この写真を削除しますか？🥲"
        );

      if (!ok) return;


      try {

        await deleteJaehyukGrowthVisual(
          currentJaehyukGrowthVisualItem.id
        );

        closeJaehyukGrowthModal();

        await renderJaehyukGrowthYearVisuals();


      } catch (error) {

        console.error(
          "JAEHYUK GROWTH DELETE ERROR:",
          error
        );

        alert(
          "削除に失敗しました🥲"
        );

      }

    }
  );
}


// ======================================================
// CANCEL / CLOSE
// ======================================================

function closeJaehyukGrowthModal() {

  pendingJaehyukGrowthFile =
    null;

  currentJaehyukGrowthVisualItem =
    null;


  if (jaehyukGrowthVisualInput) {
    jaehyukGrowthVisualInput.value =
      "";
  }


  if (jaehyukGrowthVisualPreviewImage) {
    jaehyukGrowthVisualPreviewImage.src =
      "";
  }


  if (jaehyukGrowthVisualPreview) {
    jaehyukGrowthVisualPreview.style.display =
      "none";
  }


  if (jaehyukGrowthVisualMemo) {
    jaehyukGrowthVisualMemo.value =
      "";
  }


  if (jaehyukGrowthVisualDelete) {
    jaehyukGrowthVisualDelete.style.display =
      "none";
  }


  if (jaehyukGrowthVisualModal) {
    jaehyukGrowthVisualModal.style.display =
      "none";
  }

}


if (jaehyukGrowthVisualCancel) {

  jaehyukGrowthVisualCancel.addEventListener(
    "click",
    () => {

      closeJaehyukGrowthModal();

    }
  );
}


// ======================================================
// 🚀 INITIALIZE JAEHYUK GROWTH DB
// ======================================================

openJaehyukGrowthDB()
  .catch(
    error => {

      console.error(
        "JAEHYUK GROWTH DB ERROR:",
        error
      );

    }
  );
// ======================================================
// 🤖 ASAHI GROWTH HISTORY START
// 完成型：YEAR DETAIL + EDIT MODAL
// ======================================================

const asahiGrowthHistoryOpen =
  document.getElementById("asahiGrowthHistoryOpen");

const asahiGrowthHistoryPage =
  document.getElementById("asahiGrowthHistoryPage");

const asahiGrowthHistoryBack =
  document.getElementById("asahiGrowthHistoryBack");

const asahiGrowthYearPage =
  document.getElementById("asahiGrowthYearPage");

const asahiGrowthYearBack =
  document.getElementById("asahiGrowthYearBack");

const asahiGrowthYearButtons =
  document.querySelectorAll(".asahi-growth-year");

const asahiGrowthYearNumber =
  document.getElementById("asahiGrowthYearNumber");

const asahiGrowthYearTitle =
  document.getElementById("asahiGrowthYearTitle");

const asahiGrowthYearSubtitle =
  document.getElementById("asahiGrowthYearSubtitle");

const asahiGrowthYearVisualTitle =
  document.getElementById("asahiGrowthYearVisualTitle");

const asahiGrowthYearCaption =
  document.getElementById("asahiGrowthYearCaption");

const asahiGrowthYearVisualGrid =
  document.getElementById("asahiGrowthYearVisualGrid");

const asahiGrowthYearVisualAdd =
  document.getElementById("asahiGrowthYearVisualAdd");

const asahiGrowthVisualModal =
  document.getElementById("asahiGrowthVisualModal");

const asahiGrowthVisualModalKicker =
  document.getElementById("asahiGrowthVisualModalKicker");

const asahiGrowthVisualInput =
  document.getElementById("asahiGrowthVisualInput");

const asahiGrowthVisualSelect =
  document.getElementById("asahiGrowthVisualSelect");

const asahiGrowthVisualPreview =
  document.getElementById("asahiGrowthVisualPreview");

const asahiGrowthVisualPreviewImage =
  document.getElementById("asahiGrowthVisualPreviewImage");

const asahiGrowthVisualHair =
  document.getElementById("asahiGrowthVisualHair");

const asahiGrowthVisualMemo =
  document.getElementById("asahiGrowthVisualMemo");

const asahiGrowthVisualSave =
  document.getElementById("asahiGrowthVisualSave");

const asahiGrowthVisualDelete =
  document.getElementById("asahiGrowthVisualDelete");

const asahiGrowthVisualCancel =
  document.getElementById("asahiGrowthVisualCancel");

let currentAsahiGrowthYear = "2020";

let pendingAsahiGrowthFile = null;

let currentAsahiGrowthVisualItem = null;

let asahiGrowthDB = null;

const ASAHI_GROWTH_DB =
  "treasure-day-asahi-growth-db";

const ASAHI_GROWTH_STORE =
  "asahiGrowthVisuals";
// ======================================================
// 💾 ASAHI GROWTH IndexedDB
// ======================================================

function openAsahiGrowthDB() {

  return new Promise((resolve, reject) => {

    const request =
      indexedDB.open(
        ASAHI_GROWTH_DB,
        1
      );

    request.onupgradeneeded =
      event => {

        const db =
          event.target.result;

        if (
          !db.objectStoreNames.contains(
            ASAHI_GROWTH_STORE
          )
        ) {

          db.createObjectStore(
            ASAHI_GROWTH_STORE,
            {
              keyPath: "id"
            }
          );

        }

      };


    request.onsuccess =
      () => {

        asahiGrowthDB =
          request.result;

        resolve(
          asahiGrowthDB
        );

      };


    request.onerror =
      () => {

        reject(
          request.error
        );

      };

  });
}


// ======================================================
// 📸 IMAGE → DataURL
// ======================================================

function asahiGrowthImageToDataURL(
  file
) {

  return new Promise(
    (resolve, reject) => {

      const reader =
        new FileReader();

      reader.onload = () => {

        const img =
          new Image();

        img.onload = () => {

          const MAX_SIZE = 1600;

          let width =
            img.naturalWidth;

          let height =
            img.naturalHeight;


          if (
            width > height &&
            width > MAX_SIZE
          ) {

            height =
              Math.round(
                height *
                MAX_SIZE /
                width
              );

            width =
              MAX_SIZE;

          } else if (
            height >= width &&
            height > MAX_SIZE
          ) {

            width =
              Math.round(
                width *
                MAX_SIZE /
                height
              );

            height =
              MAX_SIZE;

          }


          const canvas =
            document.createElement(
              "canvas"
            );

          canvas.width =
            width;

          canvas.height =
            height;


          const ctx =
            canvas.getContext(
              "2d"
            );

          if (!ctx) {

            reject(
              new Error(
                "Canvas unavailable"
              )
            );

            return;

          }


          ctx.drawImage(
            img,
            0,
            0,
            width,
            height
          );


          resolve(
            canvas.toDataURL(
              "image/jpeg",
              0.86
            )
          );

        };


        img.onerror =
          reject;

        img.src =
          reader.result;

      };


      reader.onerror =
        reject;

      reader.readAsDataURL(
        file
      );

    }
  );
}


// ======================================================
// 💾 SAVE NEW
// ======================================================

async function saveAsahiGrowthVisual(
  file,
  year,
  hairColor,
  memo
) {

  if (!asahiGrowthDB) {
    await openAsahiGrowthDB();
  }


  const imageData =
    await asahiGrowthImageToDataURL(
      file
    );


  const item = {

    id:
      Date.now() +
      Math.floor(
        Math.random() * 1000
      ),

    year:
      String(year),

    imageData,

    hairColor:
      hairColor || "OTHER",

    memo:
      memo || "",

    createdAt:
      Date.now()

  };


  return new Promise(
    (resolve, reject) => {

      const transaction =
        asahiGrowthDB.transaction(
          ASAHI_GROWTH_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          ASAHI_GROWTH_STORE
        );

      const request =
        store.add(item);


      request.onsuccess =
        () => resolve(item);

      request.onerror =
        () => reject(
          request.error
        );

    }
  );
}


// ======================================================
// ✏️ UPDATE
// ======================================================

function updateAsahiGrowthVisual(
  item
) {

  return new Promise(
    (resolve, reject) => {

      const transaction =
        asahiGrowthDB.transaction(
          ASAHI_GROWTH_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          ASAHI_GROWTH_STORE
        );

      const request =
        store.put(item);


      request.onsuccess =
        () => resolve();

      request.onerror =
        () => reject(
          request.error
        );

    }
  );
}


// ======================================================
// 📚 GET YEAR VISUALS
// ======================================================

async function getAsahiGrowthVisuals(
  year
) {

  if (!asahiGrowthDB) {
    await openAsahiGrowthDB();
  }


  return new Promise(
    (resolve, reject) => {

      const transaction =
        asahiGrowthDB.transaction(
          ASAHI_GROWTH_STORE,
          "readonly"
        );

      const store =
        transaction.objectStore(
          ASAHI_GROWTH_STORE
        );

      const request =
        store.getAll();


      request.onsuccess =
        () => {

          const items =
            request.result || [];

          resolve(
            items.filter(
              item =>
                String(item.year) ===
                String(year)
            )
          );

        };


      request.onerror =
        () => reject(
          request.error
        );

    }
  );
}


// ======================================================
// 🗑 DELETE
// ======================================================

async function deleteAsahiGrowthVisual(
  id
) {

  if (!asahiGrowthDB) {
    await openAsahiGrowthDB();
  }


  return new Promise(
    (resolve, reject) => {

      const transaction =
        asahiGrowthDB.transaction(
          ASAHI_GROWTH_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          ASAHI_GROWTH_STORE
        );

      const request =
        store.delete(id);


      request.onsuccess =
        () => resolve();

      request.onerror =
        () => reject(
          request.error
        );

    }
  );
}
// ======================================================
// 🌱 ASAHI GROWTH YEAR INFO
// ======================================================

const asahiGrowthYearInfo = {

  "2020": {
    title: "DEBUT ERA 💎"
  },

  "2021": {
    title: "2021 ERA 💎"
  },

  "2022": {
    title: "2022 ERA 💎"
  },

  "2023": {
    title: "2023 ERA 💎"
  },

  "2024": {
    title: "2024 ERA 💎"
  },

  "2025": {
    title: "2025 ERA 💎"
  },

  "2026": {
    title: "NOW ✨"
  }

};


// ======================================================
// 📸 RENDER YEAR VISUALS
// ======================================================

async function renderAsahiGrowthYearVisuals() {

  if (!asahiGrowthYearVisualGrid) {
    return;
  }


  asahiGrowthYearVisualGrid.innerHTML =
    "";


  const items =
    await getAsahiGrowthVisuals(
      currentAsahiGrowthYear
    );


  items
    .sort(
      (a, b) =>
        a.createdAt -
        b.createdAt
    )
    .forEach(item => {

      const card =
        document.createElement(
          "button"
        );

      card.type =
        "button";

 card.className =
  "jihoon-growth-visual-card asahi-growth-visual-card";
const photo =
  document.createElement("div");

photo.className =
  "jihoon-growth-visual-photo asahi-growth-visual-photo";
      const img =
        document.createElement(
          "img"
        );

      img.src =
        item.imageData || "";

      img.alt =
        `ASAHI ${item.year}`;

      img.loading =
        "lazy";

      img.decoding =
        "async";


      const info =
        document.createElement(
          "div"
        );

      info.className =
        "jihoon-growth-visual-info";


      const hair =
        document.createElement(
          "span"
        );

      hair.textContent =
        `🎨 ${item.hairColor || "OTHER"}`;


      const memo =
        document.createElement(
          "p"
        );

      memo.textContent =
        item.memo || "";


      info.appendChild(
        hair
      );


      if (item.memo) {

        info.appendChild(
          memo
        );

      }


      photo.appendChild(
  img
);

card.appendChild(
  photo
);

      card.appendChild(
        info
      );


      // 写真タップ → EDIT
      card.addEventListener(
        "click",
        () => {

          currentAsahiGrowthVisualItem =
            item;

          pendingAsahiGrowthFile =
            null;


          if (
            asahiGrowthVisualPreviewImage
          ) {

            asahiGrowthVisualPreviewImage.src =
              item.imageData || "";

          }


          if (
            asahiGrowthVisualPreview
          ) {

            asahiGrowthVisualPreview.style.display =
              "block";

          }


          if (
            asahiGrowthVisualHair
          ) {

            asahiGrowthVisualHair.value =
              item.hairColor ||
              "OTHER";

          }


          if (
            asahiGrowthVisualMemo
          ) {

            asahiGrowthVisualMemo.value =
              item.memo || "";

          }


          if (
            asahiGrowthVisualDelete
          ) {

            asahiGrowthVisualDelete.style.display =
              "block";

          }


          if (
            asahiGrowthVisualModalKicker
          ) {

            asahiGrowthVisualModalKicker.textContent =
              `📸 ${item.year} VISUAL`;

          }


          if (
            asahiGrowthVisualModal
          ) {

            asahiGrowthVisualModal.style.display =
              "flex";

          }

        }
      );


      asahiGrowthYearVisualGrid.appendChild(
        card
      );

    });

}


// ======================================================
// 🌱 OPEN YEAR DETAIL
// ======================================================

async function openAsahiGrowthYear(
  year
) {

  currentAsahiGrowthYear =
    String(year);


  const info =
    asahiGrowthYearInfo[
      currentAsahiGrowthYear
    ] || {
      title:
        `${currentAsahiGrowthYear} ERA 💎`
    };


  if (
    asahiGrowthYearNumber
  ) {

    asahiGrowthYearNumber.textContent =
      currentAsahiGrowthYear;

  }


  if (
    asahiGrowthYearTitle
  ) {

    asahiGrowthYearTitle.textContent =
      info.title;

  }


  if (
    asahiGrowthYearSubtitle
  ) {

    asahiGrowthYearSubtitle.textContent =
      `${currentAsahiGrowthYear}年のアサヒを振り返ろう 💎`;

  }


  if (
    asahiGrowthYearVisualTitle
  ) {

    asahiGrowthYearVisualTitle.textContent =
      `📸 ${currentAsahiGrowthYear} VISUAL`;

  }


  if (
    asahiGrowthYearCaption
  ) {

    asahiGrowthYearCaption.textContent =
      `${currentAsahiGrowthYear}年のお気に入りアサヒを残そう 💎`;

  }


  if (
    asahiGrowthHistoryPage
  ) {

    asahiGrowthHistoryPage.style.display =
      "none";

  }


  if (
    asahiGrowthYearPage
  ) {

    asahiGrowthYearPage.style.display =
      "block";

    asahiGrowthYearPage.scrollTop =
      0;

  }


  await renderAsahiGrowthYearVisuals();

}


// ======================================================
// 🌱 YEAR BUTTONS
// ======================================================

asahiGrowthYearButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      async () => {

        await openAsahiGrowthYear(
          button.dataset.year
        );

      }
    );

  }
);
// ======================================================
// 🌱 OPEN GROWTH HISTORY
// ======================================================

if (
  asahiGrowthHistoryOpen &&
  asahiGrowthHistoryPage
) {

  asahiGrowthHistoryOpen.addEventListener(
    "click",
    () => {

      if (asahiBookDetail) {
        asahiBookDetail.classList.remove(
          "active"
        );
      }

      asahiGrowthHistoryPage.style.display =
        "block";

      asahiGrowthHistoryPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// ======================================================
// ← GROWTH HISTORY → ASAHI BOOK
// ======================================================

if (
  asahiGrowthHistoryBack &&
  asahiGrowthHistoryPage
) {

  asahiGrowthHistoryBack.addEventListener(
    "click",
    () => {

      asahiGrowthHistoryPage.style.display =
        "none";

      if (asahiBookDetail) {

        asahiBookDetail.classList.add(
          "active"
        );

        asahiBookDetail.scrollTop =
          0;

      }

      document.body.style.overflow =
        "hidden";

    }
  );
}


// ======================================================
// ← YEAR DETAIL → GROWTH HISTORY
// ======================================================

if (
  asahiGrowthYearBack &&
  asahiGrowthYearPage
) {

  asahiGrowthYearBack.addEventListener(
    "click",
    () => {

      asahiGrowthYearPage.style.display =
        "none";

      asahiGrowthHistoryPage.style.display =
        "block";

      asahiGrowthHistoryPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// ======================================================
// ＋ ADD → MODAL
// ======================================================

if (asahiGrowthYearVisualAdd) {

  asahiGrowthYearVisualAdd.addEventListener(
    "click",
    () => {

      currentAsahiGrowthVisualItem =
        null;

      pendingAsahiGrowthFile =
        null;


      if (asahiGrowthVisualInput) {
        asahiGrowthVisualInput.value =
          "";
      }


      if (asahiGrowthVisualMemo) {
        asahiGrowthVisualMemo.value =
          "";
      }


      if (asahiGrowthVisualHair) {
        asahiGrowthVisualHair.value =
          "BLACK";
      }


      if (asahiGrowthVisualPreviewImage) {
        asahiGrowthVisualPreviewImage.src =
          "";
      }


      if (asahiGrowthVisualPreview) {
        asahiGrowthVisualPreview.style.display =
          "none";
      }


      if (asahiGrowthVisualDelete) {
        asahiGrowthVisualDelete.style.display =
          "none";
      }


      if (asahiGrowthVisualModalKicker) {

        asahiGrowthVisualModalKicker.textContent =
          `📸 ${currentAsahiGrowthYear} VISUAL`;

      }


      if (asahiGrowthVisualModal) {

        asahiGrowthVisualModal.style.display =
          "flex";

        asahiGrowthVisualModal.scrollTop =
          0;

      }

    }
  );
}


// ======================================================
// 📷 SELECT PHOTO
// ======================================================

if (
  asahiGrowthVisualSelect &&
  asahiGrowthVisualInput
) {

  asahiGrowthVisualSelect.addEventListener(
    "click",
    () => {

      asahiGrowthVisualInput.click();

    }
  );
}


if (asahiGrowthVisualInput) {

  asahiGrowthVisualInput.addEventListener(
    "change",
    () => {

      const file =
        asahiGrowthVisualInput.files[0];

      if (!file) return;


      pendingAsahiGrowthFile =
        file;


      const reader =
        new FileReader();


      reader.onload =
        () => {

          if (
            asahiGrowthVisualPreviewImage
          ) {

            asahiGrowthVisualPreviewImage.src =
              reader.result;

          }


          if (
            asahiGrowthVisualPreview
          ) {

            asahiGrowthVisualPreview.style.display =
              "block";

          }

        };


      reader.readAsDataURL(
        file
      );

    }
  );
}


// ======================================================
// 💎 SAVE / UPDATE
// ======================================================

if (asahiGrowthVisualSave) {

  asahiGrowthVisualSave.addEventListener(
    "click",
    async () => {

      try {

        const hairColor =
          asahiGrowthVisualHair
            ? asahiGrowthVisualHair.value
            : "OTHER";


        const memo =
          asahiGrowthVisualMemo
            ? asahiGrowthVisualMemo.value.trim()
            : "";


        // ✏️ UPDATE
        if (
          currentAsahiGrowthVisualItem
        ) {

          currentAsahiGrowthVisualItem.hairColor =
            hairColor;

          currentAsahiGrowthVisualItem.memo =
            memo;


          if (
            pendingAsahiGrowthFile
          ) {

            currentAsahiGrowthVisualItem.imageData =
              await asahiGrowthImageToDataURL(
                pendingAsahiGrowthFile
              );

          }


          await updateAsahiGrowthVisual(
            currentAsahiGrowthVisualItem
          );

        }

        // 📸 NEW
        else {

          if (!pendingAsahiGrowthFile) {

            alert(
              "写真を選んでね📸"
            );

            return;

          }


          await saveAsahiGrowthVisual(
            pendingAsahiGrowthFile,
            currentAsahiGrowthYear,
            hairColor,
            memo
          );

        }


        closeAsahiGrowthModal();

        await renderAsahiGrowthYearVisuals();


      } catch (error) {

        console.error(
          "ASAHI GROWTH SAVE ERROR:",
          error
        );

        alert(
          "保存に失敗しました🥲"
        );

      }

    }
  );
}


// ======================================================
// 🗑 DELETE
// ======================================================

if (asahiGrowthVisualDelete) {

  asahiGrowthVisualDelete.addEventListener(
    "click",
    async () => {

      if (
        !currentAsahiGrowthVisualItem
      ) {
        return;
      }


      const ok =
        confirm(
          "この写真を削除しますか？🥲"
        );

      if (!ok) return;


      try {

        await deleteAsahiGrowthVisual(
          currentAsahiGrowthVisualItem.id
        );

        closeAsahiGrowthModal();

        await renderAsahiGrowthYearVisuals();


      } catch (error) {

        console.error(
          "ASAHI GROWTH DELETE ERROR:",
          error
        );

        alert(
          "削除に失敗しました🥲"
        );

      }

    }
  );
}


// ======================================================
// CANCEL / CLOSE
// ======================================================

function closeAsahiGrowthModal() {

  pendingAsahiGrowthFile =
    null;

  currentAsahiGrowthVisualItem =
    null;


  if (asahiGrowthVisualInput) {
    asahiGrowthVisualInput.value =
      "";
  }


  if (asahiGrowthVisualPreviewImage) {
    asahiGrowthVisualPreviewImage.src =
      "";
  }


  if (asahiGrowthVisualPreview) {
    asahiGrowthVisualPreview.style.display =
      "none";
  }


  if (asahiGrowthVisualMemo) {
    asahiGrowthVisualMemo.value =
      "";
  }


  if (asahiGrowthVisualDelete) {
    asahiGrowthVisualDelete.style.display =
      "none";
  }


  if (asahiGrowthVisualModal) {
    asahiGrowthVisualModal.style.display =
      "none";
  }

}


if (asahiGrowthVisualCancel) {

  asahiGrowthVisualCancel.addEventListener(
    "click",
    () => {

      closeAsahiGrowthModal();

    }
  );
}


// ======================================================
// 🚀 INITIALIZE ASAHI GROWTH DB
// ======================================================

openAsahiGrowthDB()
  .catch(
    error => {

      console.error(
        "ASAHI GROWTH DB ERROR:",
        error
      );

    }
  );
// ======================================================
// 🎧 MEMBER SONG 共通エンジン
// YOSHI以降の量産用
// ======================================================

function setupMemberSong(config) {

  const {
    key,
    displayName,
    japaneseName
  } = config;


  const open =
    document.getElementById(
      `${key}SongOpen`
    );

  const page =
    document.getElementById(
      `${key}SongPage`
    );

  const back =
    document.getElementById(
      `${key}SongBack`
    );

  const title =
    document.getElementById(
      `${key}SongTitle`
    );

  const memo =
    document.getElementById(
      `${key}SongMemo`
    );

  const save =
    document.getElementById(
      `${key}SongSave`
    );

  const list =
    document.getElementById(
      `${key}SongList`
    );


  const STORAGE_KEY =
    `treasure-${key}-songs`;


  let songs = [];


  try {

    songs =
      JSON.parse(
        localStorage.getItem(
          STORAGE_KEY
        )
      ) || [];

  } catch (error) {

    songs = [];
  }


  // =========================================
  // SAVE STORAGE
  // =========================================

  function saveSongs() {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(songs)
    );
  }


  // =========================================
  // RESET
  // =========================================

  function resetForm() {

    if (title) {
      title.value = "";
    }

    if (memo) {
      memo.value = "";
    }

    if (save) {

      delete save.dataset.editId;

      save.textContent =
        "＋ ADD SONG";
    }
  }


  // =========================================
  // OPEN / BACK
  // =========================================

  if (
    open &&
    page
  ) {

    open.addEventListener(
      "click",
      () => {

        page.style.display =
          "block";

        page.scrollTop =
          0;

        renderSongs();

        document.body.style.overflow =
          "hidden";
      }
    );
  }


  if (
    back &&
    page
  ) {

    back.addEventListener(
      "click",
      () => {

        page.style.display =
          "none";

        resetForm();

        document.body.style.overflow =
          "hidden";
      }
    );
  }


  // =========================================
  // ADD / UPDATE
  // =========================================

  if (save) {

    save.addEventListener(
      "click",
      () => {

        const songTitle =
          title?.value.trim() || "";

        const songMemo =
          memo?.value.trim() || "";


        if (!songTitle) {

          alert(
            "曲名を入力してね 🎧"
          );

          return;
        }


        const editId =
          save.dataset.editId
            ? Number(
                save.dataset.editId
              )
            : null;


        if (editId) {

          const item =
            songs.find(
              song =>
                song.id === editId
            );


          if (!item) return;


          item.title =
            songTitle;

          item.memo =
            songMemo;


        } else {

          songs.unshift({

            id:
              Date.now(),

            title:
              songTitle,

            memo:
              songMemo,

            favorite:
              false,

            createdAt:
              Date.now()

          });
        }


        saveSongs();

        renderSongs();

        resetForm();
      }
    );
  }


  // =========================================
  // RENDER
  // =========================================

  function renderSongs() {

    if (!list) return;


    if (
      songs.length === 0
    ) {

      list.innerHTML = `
        <div class="jihoon-song-empty">
          <span>🎧</span>

          <strong>
            まだ曲がありません
          </strong>

          <small>
            ${japaneseName}を思い浮かべる曲を追加してみよう 💎
          </small>
        </div>
      `;

      return;
    }


    const sorted =
      [...songs].sort(
        (a, b) => {

          if (
            a.favorite !==
            b.favorite
          ) {

            return (
              Number(b.favorite) -
              Number(a.favorite)
            );
          }


          return (
            (b.createdAt || 0) -
            (a.createdAt || 0)
          );
        }
      );


    list.innerHTML =
      sorted
        .map(
          song => `
            <article
              class="jihoon-song-card ${
                song.favorite
                  ? "is-favorite"
                  : ""
              }"
              data-id="${song.id}"
            >

              <button
                type="button"
                class="jihoon-song-favorite"
                data-action="favorite"
              >
                ${
                  song.favorite
                    ? `⭐️ ${displayName}'S SONG`
                    : "☆ FAVORITE"
                }
              </button>

              <div
                class="jihoon-song-card-title"
              >
                🎧 ${escapeMemberSongHTML(
                  song.title
                )}
              </div>

              ${
                song.memo
                  ? `
                    <p>
                      ${escapeMemberSongHTML(
                        song.memo
                      )}
                    </p>
                  `
                  : `
                    <p class="jihoon-song-no-note">
                      NO NOTE
                    </p>
                  `
              }

              <div
                class="jihoon-song-actions"
              >

                <button
                  type="button"
                  data-action="edit"
                >
                  ✏️ EDIT
                </button>

                <button
                  type="button"
                  data-action="delete"
                >
                  🗑 DELETE
                </button>

              </div>

            </article>
          `
        )
        .join("");


    const cards =
      list.querySelectorAll(
        ".jihoon-song-card"
      );


    cards.forEach(
      card => {

        const id =
          Number(
            card.dataset.id
          );


        card.addEventListener(
          "click",
          event => {

            const button =
              event.target.closest(
                "button[data-action]"
              );


            if (!button) return;


            const action =
              button.dataset.action;


            // ⭐ FAVORITE
            if (
              action ===
              "favorite"
            ) {

              songs.forEach(
                song => {

                  song.favorite =
                    song.id === id
                      ? !song.favorite
                      : false;
                }
              );


              saveSongs();

              renderSongs();

              return;
            }


            // ✏️ EDIT
            if (
              action ===
              "edit"
            ) {

              const song =
                songs.find(
                  item =>
                    item.id === id
                );


              if (!song) return;


              if (title) {
                title.value =
                  song.title || "";
              }


              if (memo) {
                memo.value =
                  song.memo || "";
              }


              if (save) {

                save.dataset.editId =
                  String(
                    song.id
                  );

                save.textContent =
                  "💎 UPDATE SONG";
              }


              page.scrollTop =
                0;

              return;
            }


            // 🗑 DELETE
            if (
              action ===
              "delete"
            ) {

              const ok =
                confirm(
                  "この曲を削除する？🎧"
                );


              if (!ok) return;


              songs =
                songs.filter(
                  song =>
                    song.id !== id
                );


              saveSongs();

              renderSongs();

              resetForm();
            }
          }
        );
      }
    );
  }


  renderSongs();


  return {
    renderSongs
  };
}


// ======================================================
// 🐯 YOSHI SONG START
// ======================================================

const yoshiSongSystem =
  setupMemberSong({

    key: "yoshi",

    displayName: "YOSHI",

    japaneseName: "ヨシ"

  });
// ======================================================
// 🐨 JUNKYU SONG START
// ======================================================

const junkyuSongSystem =
  setupMemberSong({

    key: "junkyu",

    displayName: "JUNKYU",

    japaneseName: "ジュンギュ"

  });
// ======================================================
// 🦁 JAEHYUK SONG START
// ======================================================

const jaehyukSongSystem =
  setupMemberSong({

    key: "jaehyuk",

    displayName: "JAEHYUK",

    japaneseName: "ジェヒョク"

  });
// ======================================================
// 🤖 ASAHI SONG START
// ======================================================

const asahiSongSystem =
  setupMemberSong({

    key: "asahi",

    displayName: "ASAHI",

    japaneseName: "アサヒ"

  });
// ======================================================
// 🛡 SONG HTML ESCAPE
// ======================================================

function escapeMemberSongHTML(
  text
) {

  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
// ======================================================
// 📷 MEMBER MEMORIES 共通エンジン
// PHOTO MEMORY LINK
// ======================================================

function setupMemberMemories(config) {

  const {
    key,
    displayName,
    japaneseName
  } = config;


  const open =
    document.getElementById(
      `${key}MemoriesOpen`
    );

  const page =
    document.getElementById(
      `${key}MemoriesPage`
    );

  const back =
    document.getElementById(
      `${key}MemoriesBack`
    );

  const add =
    document.getElementById(
      `${key}MemoriesAdd`
    );

  const list =
    document.getElementById(
      `${key}MemoriesList`
    );


  async function renderMemories() {

    if (!list) return;

    list.innerHTML = "";


    const entries =
      memories
        .map(
          (memory, index) => ({
            memory,
            index
          })
        )
        .filter(
          ({ memory }) =>
            String(
              memory.member || ""
            ).toUpperCase() ===
            displayName
        );


    if (
      entries.length === 0
    ) {

      list.innerHTML = `
        <div class="jihoon-memories-empty">

          <span>📷</span>

          <strong>
            まだ${displayName} MEMORYがありません
          </strong>

          <small>
            PHOTO MEMORYでMEMBERを
            ${displayName}にして投稿してみよう 💎
          </small>

        </div>
      `;

      return;
    }


    for (
      const { memory, index }
      of entries
    ) {

      const card =
        document.createElement(
          "article"
        );

      card.className =
        "jihoon-memory-card";


      if (
        memory.photoKey ||
        memory.photo
      ) {

        const image =
          document.createElement(
            "img"
          );

        image.alt =
          memory.title ||
          `${displayName} MEMORY`;


        if (memory.photoKey) {

          try {

            image.src =
              await loadPhotoMemoryImage(
                memory.photoKey
              );

          } catch (error) {

            console.error(
              `${displayName} MEMORY IMAGE LOAD ERROR`,
              error
            );

            image.src = "";
          }

        } else {

          image.src =
            memory.photo || "";
        }


        if (image.src) {

          card.appendChild(
            image
          );
        }
      }


      const body =
        document.createElement(
          "div"
        );

      body.className =
        "jihoon-memory-card-body";


      const title =
        document.createElement(
          "strong"
        );

      title.textContent =
        memory.title ||
        `${displayName} MEMORY 💎`;

      body.appendChild(
        title
      );


      if (memory.text) {

        const text =
          document.createElement(
            "p"
          );

        text.textContent =
          memory.text;

        body.appendChild(
          text
        );
      }


      if (
        Array.isArray(
          memory.tags
        ) &&
        memory.tags.length > 0
      ) {

        const tags =
          document.createElement(
            "div"
          );

        tags.className =
          "jihoon-memory-tags";


        memory.tags.forEach(
          tag => {

            const span =
              document.createElement(
                "span"
              );

            span.textContent =
              "#" + tag;

            tags.appendChild(
              span
            );
          }
        );


        body.appendChild(
          tags
        );
      }


      card.appendChild(
        body
      );


      card.addEventListener(
        "click",
        async () => {

          photoMemoryReturnTarget =
            key;

          showPage("memory");

          switchMemoryMode(
            "photo"
          );

          await openPhotoMemoryDetail(
            index
          );

          window.scrollTo(
            0,
            0
          );
        }
      );


      list.appendChild(
        card
      );
    }
  }


  // =========================================
  // OPEN
  // =========================================

  if (
    open &&
    page
  ) {

    open.addEventListener(
      "click",
      async () => {

        page.style.display =
          "block";

        page.scrollTop =
          0;

        await renderMemories();

        document.body.style.overflow =
          "hidden";
      }
    );
  }


  // =========================================
  // BACK
  // =========================================

  if (
    back &&
    page
  ) {

    back.addEventListener(
      "click",
      () => {

        page.style.display =
          "none";

        document.body.style.overflow =
          "hidden";
      }
    );
  }


  // =========================================
  // ADD → PHOTO MEMORY
  // =========================================

  if (add) {

    add.addEventListener(
      "click",
      () => {

        page.style.display =
          "none";

        showPage(
          "memory"
        );

        switchMemoryMode(
          "photo"
        );


        if (memoryMember) {

          memoryMember.value =
            displayName;
        }


        document.body.style.overflow =
          "";

        window.scrollTo(
          0,
          0
        );
      }
    );
  }


  return {

    renderMemories

  };
}


// ======================================================
// 🐯 YOSHI MEMORIES START
// ======================================================

const yoshiMemoriesSystem =
  setupMemberMemories({

    key: "yoshi",

    displayName: "YOSHI",

    japaneseName: "ヨシ"

  });
// ======================================================
// 🐨 JUNKYU MEMORIES START
// ======================================================

const junkyuMemoriesSystem =
  setupMemberMemories({

    key: "junkyu",

    displayName: "JUNKYU",

    japaneseName: "ジュンギュ"

  });
// ======================================================
// 🦁 JAEHYUK MEMORIES START
// ======================================================

const jaehyukMemoriesSystem =
  setupMemberMemories({

    key: "jaehyuk",

    displayName: "JAEHYUK",

    japaneseName: "ジェヒョク"

  });
// ======================================================
// 🤖 ASAHI MEMORIES START
// ======================================================

const asahiMemoriesSystem =
  setupMemberMemories({

    key: "asahi",

    displayName: "ASAHI",

    japaneseName: "アサヒ"

  });
// =====================================================
// 🌱 YOSHI GROWTH HISTORY
// 2020 - 2026 共通YEARシステム
// =====================================================

const yoshiGrowthHistoryOpen =
  document.getElementById("yoshiGrowthHistoryOpen");

const yoshiGrowthHistoryPage =
  document.getElementById("yoshiGrowthHistoryPage");

const yoshiGrowthHistoryBack =
  document.getElementById("yoshiGrowthHistoryBack");

const yoshiGrowthYearPage =
  document.getElementById("yoshiGrowthYearPage");

const yoshiGrowthYearBack =
  document.getElementById("yoshiGrowthYearBack");

const yoshiGrowthYearNumber =
  document.getElementById("yoshiGrowthYearNumber");

const yoshiGrowthYearTitle =
  document.getElementById("yoshiGrowthYearTitle");

const yoshiGrowthYearSubtitle =
  document.getElementById("yoshiGrowthYearSubtitle");

const yoshiGrowthYearVisualTitle =
  document.getElementById("yoshiGrowthYearVisualTitle");

const yoshiGrowthYearCaption =
  document.getElementById("yoshiGrowthYearCaption");

const yoshiGrowthYearVisualAdd =
  document.getElementById("yoshiGrowthYearVisualAdd");

const yoshiGrowthYearVisualInput =
  document.getElementById("yoshiGrowthYearVisualInput");

const yoshiGrowthYearVisualGrid =
  document.getElementById("yoshiGrowthYearVisualGrid");

let currentYoshiGrowthYear = "2020";
const yoshiGrowthVisualModal =
  document.getElementById("yoshiGrowthVisualModal");

const yoshiGrowthVisualInput =
  document.getElementById("yoshiGrowthVisualInput");

const yoshiGrowthVisualSelect =
  document.getElementById("yoshiGrowthVisualSelect");

const yoshiGrowthVisualPreview =
  document.getElementById("yoshiGrowthVisualPreview");

const yoshiGrowthVisualPreviewImage =
  document.getElementById("yoshiGrowthVisualPreviewImage");

const yoshiGrowthVisualHair =
  document.getElementById("yoshiGrowthVisualHair");

const yoshiGrowthVisualMemo =
  document.getElementById("yoshiGrowthVisualMemo");

const yoshiGrowthVisualSave =
  document.getElementById("yoshiGrowthVisualSave");

const yoshiGrowthVisualDelete =
  document.getElementById("yoshiGrowthVisualDelete");

const yoshiGrowthVisualCancel =
  document.getElementById("yoshiGrowthVisualCancel");

const yoshiGrowthVisualModalKicker =
  document.getElementById("yoshiGrowthVisualModalKicker");

let pendingYoshiGrowthFile = null;
let currentYoshiGrowthVisualItem = null;

// =====================================================
// 🐯 YEAR INFO
// =====================================================

const yoshiGrowthYearInfo = {

  "2020": {
    title: "DEBUT ERA 💎"
  },

  "2021": {
    title: "2021 ERA 💎"
  },

  "2022": {
    title: "2022 ERA 💎"
  },

  "2023": {
    title: "2023 ERA 💎"
  },

  "2024": {
    title: "2024 ERA 💎"
  },

  "2025": {
    title: "2025 ERA 💎"
  },

  "2026": {
    title: "NOW ✨"
  }

};


// =====================================================
// 💾 YOSHI GROWTH IndexedDB
// =====================================================

const YOSHI_GROWTH_DB_NAME =
  "treasure-day-yoshi-growth-v2-db";

const YOSHI_GROWTH_DB_VERSION =
  1;

const YOSHI_GROWTH_STORE =
  "yoshi-growth-visuals";

let yoshiGrowthDB = null;


function openYoshiGrowthDB() {

  return new Promise((resolve, reject) => {

    const request =
      indexedDB.open(
        YOSHI_GROWTH_DB_NAME,
        YOSHI_GROWTH_DB_VERSION
      );


    request.onupgradeneeded = (event) => {

      const db =
        event.target.result;

      if (
        !db.objectStoreNames.contains(
          YOSHI_GROWTH_STORE
        )
      ) {

       db.createObjectStore(
  YOSHI_GROWTH_STORE,
  {
    keyPath: "id"
  }
);
      }
    };


    request.onsuccess = (event) => {

      yoshiGrowthDB =
        event.target.result;

      resolve(yoshiGrowthDB);
    };


    request.onerror = () => {

      reject(request.error);
    };
  });
}


// =====================================================
// 📸 IMAGE RESIZE
// =====================================================

function yoshiGrowthImageToDataURL(file) {

  return new Promise((resolve, reject) => {

    const reader =
      new FileReader();


    reader.onload = () => {

      const img =
        new Image();


      img.onload = () => {

        const MAX_SIZE = 1600;

        let width =
          img.naturalWidth;

        let height =
          img.naturalHeight;


        if (
          width > height &&
          width > MAX_SIZE
        ) {

          height =
            Math.round(
              height *
              MAX_SIZE /
              width
            );

          width =
            MAX_SIZE;

        } else if (
          height >= width &&
          height > MAX_SIZE
        ) {

          width =
            Math.round(
              width *
              MAX_SIZE /
              height
            );

          height =
            MAX_SIZE;
        }


        const canvas =
          document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;


        const ctx =
          canvas.getContext("2d");

        if (!ctx) {

          reject(
            new Error(
              "Canvas unavailable"
            )
          );

          return;
        }


        ctx.drawImage(
          img,
          0,
          0,
          width,
          height
        );


        resolve(
          canvas.toDataURL(
            "image/jpeg",
            0.84
          )
        );
      };


      img.onerror = reject;

      img.src =
        reader.result;
    };


    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}


// =====================================================
// 💾 SAVE
// =====================================================

async function saveYoshiGrowthVisual(
  file,
  year,
  hairColor,
  memo
) {

  if (!yoshiGrowthDB) {
    await openYoshiGrowthDB();
  }


  const imageData =
    await yoshiGrowthImageToDataURL(
      file
    );


  return new Promise((resolve, reject) => {

    const transaction =
      yoshiGrowthDB.transaction(
        YOSHI_GROWTH_STORE,
        "readwrite"
      );

    const store =
      transaction.objectStore(
        YOSHI_GROWTH_STORE
      );


  const item = {

  id:
    Date.now() +
    Math.floor(Math.random() * 1000),

  year:
    String(year),

  imageData,

  hairColor:
    hairColor || "OTHER",

  memo:
    memo || "",

  createdAt:
    Date.now()

};


    const request =
      store.add(item);


  request.onsuccess = () => {

  resolve(item);

};

    request.onerror = () => {

      reject(request.error);
    };
  });
}

function updateYoshiGrowthVisual(item) {

  return new Promise((resolve, reject) => {

    const transaction =
      yoshiGrowthDB.transaction(
        YOSHI_GROWTH_STORE,
        "readwrite"
      );

    const store =
      transaction.objectStore(
        YOSHI_GROWTH_STORE
      );

    const request =
      store.put(item);

    request.onsuccess =
      () => resolve();

    request.onerror =
      () => reject(request.error);

  });
}
// =====================================================
// 📚 GET YEAR VISUALS
// =====================================================

async function getYoshiGrowthVisuals(
  year
) {

  if (!yoshiGrowthDB) {
    await openYoshiGrowthDB();
  }


  return new Promise((resolve, reject) => {

    const transaction =
      yoshiGrowthDB.transaction(
        YOSHI_GROWTH_STORE,
        "readonly"
      );

    const store =
      transaction.objectStore(
        YOSHI_GROWTH_STORE
      );

    const request =
      store.getAll();


    request.onsuccess = () => {

      const items =
        request.result || [];


      resolve(
        items.filter(
          item =>
            String(item.year) ===
            String(year)
        )
      );
    };


    request.onerror = () => {

      reject(request.error);
    };
  });
}


// =====================================================
// 🗑 DELETE
// =====================================================

async function deleteYoshiGrowthVisual(
  id
) {

  if (!yoshiGrowthDB) {
    await openYoshiGrowthDB();
  }


  return new Promise((resolve, reject) => {

    const transaction =
      yoshiGrowthDB.transaction(
        YOSHI_GROWTH_STORE,
        "readwrite"
      );

    const store =
      transaction.objectStore(
        YOSHI_GROWTH_STORE
      );


    const request =
      store.delete(id);


    request.onsuccess =
      () => resolve();


    request.onerror =
      () => reject(
        request.error
      );
  });
}


// =====================================================
// 🖼 RENDER
// =====================================================

async function renderYoshiGrowthYearVisuals() {

  if (!yoshiGrowthYearVisualGrid) {
    return;
  }

  yoshiGrowthYearVisualGrid.innerHTML = "";

  const items =
    await getYoshiGrowthVisuals(
      currentYoshiGrowthYear
    );

  if (items.length === 0) {

    yoshiGrowthYearVisualGrid.innerHTML = `
      <div class="jihoon-growth-visual-empty">
        <span>📷</span>
        <strong>まだ写真がありません</strong>
        <small>
          好きな${currentYoshiGrowthYear}ヨシを追加してみよう 🐯
        </small>
      </div>
    `;

    return;
  }

  const hairLabels = {
    BLACK: "🖤 BLACK",
    BROWN: "🤎 BROWN",
    RED: "❤️ RED",
    PINK: "🩷 PINK",
    BLONDE: "💛 BLONDE",
    GRAY: "🩶 GRAY",
    OTHER: "✨ OTHER"
  };

  items
    .sort(
      (a, b) =>
        (a.createdAt || 0) -
        (b.createdAt || 0)
    )
    .forEach(item => {

      const card =
        document.createElement("article");

      card.className =
        "jihoon-growth-visual-card yoshi-growth-visual-card";


      const photo =
        document.createElement("div");

      photo.className =
        "jihoon-growth-visual-photo yoshi-growth-visual-photo";


      const img =
        document.createElement("img");

      img.src =
        item.imageData || "";

      img.alt =
        `${item.year} YOSHI`;

      img.loading = "lazy";
      img.decoding = "async";

      photo.appendChild(img);


      const info =
        document.createElement("div");

      info.className =
        "jihoon-growth-visual-info";


      const hair =
        document.createElement("span");

      hair.className =
        "jihoon-growth-visual-hair";

      hair.textContent =
        hairLabels[item.hairColor] ||
        "✨ OTHER";

      info.appendChild(hair);


      const memo =
        document.createElement("p");

      if (item.memo) {

        memo.textContent =
          item.memo;

      } else {

        memo.textContent =
          "NO NOTE";

        memo.className =
          "jihoon-growth-visual-no-note";

      }

      info.appendChild(memo);


      card.appendChild(photo);
      card.appendChild(info);


      // 💎 写真タップ → 編集画面
      card.addEventListener(
        "click",
        () => {

          openYoshiGrowthEdit(item);

        }
      );


      yoshiGrowthYearVisualGrid.appendChild(
        card
      );

    });
}

// =====================================================
// 🌱 GROWTH HISTORY OPEN
// =====================================================

if (
  yoshiGrowthHistoryOpen &&
  yoshiGrowthHistoryPage
) {

  yoshiGrowthHistoryOpen.addEventListener(
    "click",
    () => {

      if (yoshiBookDetail) {

        yoshiBookDetail.classList.remove(
          "active"
        );
      }


      yoshiGrowthHistoryPage.style.display =
        "block";

      yoshiGrowthHistoryPage.scrollTop =
        0;


      document.body.style.overflow =
        "hidden";
    }
  );
}


// =====================================================
// ← YOSHI BOOK
// =====================================================

if (
  yoshiGrowthHistoryBack &&
  yoshiGrowthHistoryPage
) {

  yoshiGrowthHistoryBack.addEventListener(
    "click",
    () => {

      yoshiGrowthHistoryPage.style.display =
        "none";


      if (yoshiBookDetail) {

        yoshiBookDetail.classList.add(
          "active"
        );

        yoshiBookDetail.scrollTop =
          0;
      }


      document.body.style.overflow =
        "hidden";
    }
  );
}


// =====================================================
// 📅 YEAR SELECT
// =====================================================

const yoshiGrowthYearButtons =
  yoshiGrowthHistoryPage
    ? yoshiGrowthHistoryPage.querySelectorAll(
        ".jihoon-growth-year"
      )
    : [];


yoshiGrowthYearButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      async () => {

        const year =
          button.dataset.year;


        if (!year) return;


        currentYoshiGrowthYear =
          String(year);


        const info =
          yoshiGrowthYearInfo[
            currentYoshiGrowthYear
          ];


        if (yoshiGrowthYearNumber) {

          yoshiGrowthYearNumber.textContent =
            currentYoshiGrowthYear;
        }


        if (yoshiGrowthYearTitle) {

          yoshiGrowthYearTitle.textContent =
            info?.title ||
            `${currentYoshiGrowthYear} ERA 💎`;
        }


        if (yoshiGrowthYearSubtitle) {

          yoshiGrowthYearSubtitle.textContent =
            `${currentYoshiGrowthYear}年のヨシを振り返ろう 💎`;
        }


        if (yoshiGrowthYearVisualTitle) {

          yoshiGrowthYearVisualTitle.textContent =
            `📸 ${currentYoshiGrowthYear} VISUAL`;
        }


        if (yoshiGrowthYearCaption) {

          yoshiGrowthYearCaption.textContent =
            `${currentYoshiGrowthYear}年のお気に入りヨシを残そう 💎`;
        }


        yoshiGrowthHistoryPage.style.display =
          "none";


        yoshiGrowthYearPage.style.display =
          "block";

        yoshiGrowthYearPage.scrollTop =
          0;


        await renderYoshiGrowthYearVisuals();


        document.body.style.overflow =
          "hidden";
      }
    );
  }
);


// =====================================================
// ← YEAR → GROWTH HISTORY
// =====================================================

if (
  yoshiGrowthYearBack &&
  yoshiGrowthYearPage
) {

  yoshiGrowthYearBack.addEventListener(
    "click",
    () => {

      yoshiGrowthYearPage.style.display =
        "none";


      yoshiGrowthHistoryPage.style.display =
        "block";

      yoshiGrowthHistoryPage.scrollTop =
        0;


      document.body.style.overflow =
        "hidden";
    }
  );
}


// =====================================================
// ＋ ADD → MODAL
// =====================================================

if (yoshiGrowthYearVisualAdd) {

  yoshiGrowthYearVisualAdd.addEventListener(
    "click",
    () => {

      currentYoshiGrowthVisualItem =
        null;

      pendingYoshiGrowthFile =
        null;


      if (yoshiGrowthVisualInput) {
        yoshiGrowthVisualInput.value = "";
      }


      if (yoshiGrowthVisualMemo) {
        yoshiGrowthVisualMemo.value = "";
      }


      if (yoshiGrowthVisualHair) {
        yoshiGrowthVisualHair.value =
          "BLACK";
      }


      if (yoshiGrowthVisualPreview) {
        yoshiGrowthVisualPreview.style.display =
          "none";
      }


      if (yoshiGrowthVisualDelete) {
        yoshiGrowthVisualDelete.style.display =
          "none";
      }


      if (yoshiGrowthVisualModalKicker) {

        yoshiGrowthVisualModalKicker.textContent =
          `📸 ${currentYoshiGrowthYear} VISUAL`;

      }


      if (yoshiGrowthVisualModal) {

        yoshiGrowthVisualModal.style.display =
          "flex";

        yoshiGrowthVisualModal.scrollTop =
          0;

      }

    }
  );
}


// =====================================================
// 📷 SELECT PHOTO
// =====================================================

if (
  yoshiGrowthVisualSelect &&
  yoshiGrowthVisualInput
) {

  yoshiGrowthVisualSelect.addEventListener(
    "click",
    () => {

      yoshiGrowthVisualInput.click();

    }
  );
}


if (yoshiGrowthVisualInput) {

  yoshiGrowthVisualInput.addEventListener(
    "change",
    () => {

      const file =
        yoshiGrowthVisualInput.files[0];

      if (!file) return;


      pendingYoshiGrowthFile =
        file;


      const reader =
        new FileReader();


      reader.onload = () => {

        if (
          yoshiGrowthVisualPreviewImage
        ) {

          yoshiGrowthVisualPreviewImage.src =
            reader.result;

        }


        if (yoshiGrowthVisualPreview) {

          yoshiGrowthVisualPreview.style.display =
            "block";

        }

      };


      reader.readAsDataURL(file);

    }
  );
}


// =====================================================
// 💾 SAVE / UPDATE
// =====================================================

if (yoshiGrowthVisualSave) {

  yoshiGrowthVisualSave.addEventListener(
    "click",
    async () => {

      try {

        const hairColor =
          yoshiGrowthVisualHair
            ? yoshiGrowthVisualHair.value
            : "OTHER";


        const memo =
          yoshiGrowthVisualMemo
            ? yoshiGrowthVisualMemo.value.trim()
            : "";


        // ✏️ EDIT
        if (
          currentYoshiGrowthVisualItem
        ) {

          currentYoshiGrowthVisualItem.hairColor =
            hairColor;

          currentYoshiGrowthVisualItem.memo =
            memo;


          if (
            pendingYoshiGrowthFile
          ) {

            currentYoshiGrowthVisualItem.imageData =
              await yoshiGrowthImageToDataURL(
                pendingYoshiGrowthFile
              );

          }


          await updateYoshiGrowthVisual(
            currentYoshiGrowthVisualItem
          );

        }

        // 📸 NEW
        else {

          if (!pendingYoshiGrowthFile) {

            alert(
              "写真を選んでね📸"
            );

            return;

          }


          await saveYoshiGrowthVisual(
            pendingYoshiGrowthFile,
            currentYoshiGrowthYear,
            hairColor,
            memo
          );

        }


        closeYoshiGrowthModal();

        await renderYoshiGrowthYearVisuals();


      } catch (error) {

        console.error(
          "YOSHI GROWTH SAVE ERROR:",
          error
        );

        alert(
          "保存に失敗しました🥲"
        );

      }

    }
  );
}


// =====================================================
// ✏️ EDIT
// =====================================================

function openYoshiGrowthEdit(item) {

  currentYoshiGrowthVisualItem =
    item;

  pendingYoshiGrowthFile =
    null;


  if (yoshiGrowthVisualInput) {
    yoshiGrowthVisualInput.value = "";
  }


  if (yoshiGrowthVisualHair) {

    yoshiGrowthVisualHair.value =
      item.hairColor ||
      "OTHER";

  }


  if (yoshiGrowthVisualMemo) {

    yoshiGrowthVisualMemo.value =
      item.memo || "";

  }


  if (
    yoshiGrowthVisualPreviewImage
  ) {

    yoshiGrowthVisualPreviewImage.src =
      item.imageData || "";

  }


  if (yoshiGrowthVisualPreview) {

    yoshiGrowthVisualPreview.style.display =
      "block";

  }


  if (yoshiGrowthVisualDelete) {

    yoshiGrowthVisualDelete.style.display =
      "block";

  }


  if (
    yoshiGrowthVisualModalKicker
  ) {

    yoshiGrowthVisualModalKicker.textContent =
      `📸 ${item.year} VISUAL EDIT`;

  }


  if (yoshiGrowthVisualModal) {

    yoshiGrowthVisualModal.style.display =
      "flex";

    yoshiGrowthVisualModal.scrollTop =
      0;

  }

}


// =====================================================
// 🗑 DELETE
// =====================================================

if (yoshiGrowthVisualDelete) {

  yoshiGrowthVisualDelete.addEventListener(
    "click",
    async () => {

      if (
        !currentYoshiGrowthVisualItem
      ) {
        return;
      }


      const ok =
        confirm(
          "この写真を削除しますか？🥲"
        );

      if (!ok) return;


      try {

        await deleteYoshiGrowthVisual(
          currentYoshiGrowthVisualItem.id
        );

        closeYoshiGrowthModal();

        await renderYoshiGrowthYearVisuals();


      } catch (error) {

        console.error(
          "YOSHI GROWTH DELETE ERROR:",
          error
        );

        alert(
          "削除に失敗しました🥲"
        );

      }

    }
  );
}


// =====================================================
// CANCEL / CLOSE
// =====================================================

function closeYoshiGrowthModal() {

  pendingYoshiGrowthFile =
    null;

  currentYoshiGrowthVisualItem =
    null;


  if (yoshiGrowthVisualInput) {
    yoshiGrowthVisualInput.value =
      "";
  }


  if (yoshiGrowthVisualPreviewImage) {
    yoshiGrowthVisualPreviewImage.src =
      "";
  }


  if (yoshiGrowthVisualPreview) {
    yoshiGrowthVisualPreview.style.display =
      "none";
  }


  if (yoshiGrowthVisualMemo) {
    yoshiGrowthVisualMemo.value =
      "";
  }


  if (yoshiGrowthVisualDelete) {
    yoshiGrowthVisualDelete.style.display =
      "none";
  }


  if (yoshiGrowthVisualModal) {
    yoshiGrowthVisualModal.style.display =
      "none";
  }

}


if (yoshiGrowthVisualCancel) {

  yoshiGrowthVisualCancel.addEventListener(
    "click",
    () => {

      closeYoshiGrowthModal();

    }
  );
}


// =====================================================
// 🚀 INITIALIZE
// =====================================================

openYoshiGrowthDB()
  .catch(error => {

    console.error(
      "YOSHI GROWTH DB ERROR:",
      error
    );
  });
// =====================================================
// 🫶 YOSHI CHEMISTRY
// LIST → SHARED DETAIL
// =====================================================

const yoshiChemistryOpen =
  document.getElementById("yoshiChemistryOpen");

const yoshiChemistryPage =
  document.getElementById("yoshiChemistryPage");

const yoshiChemistryBack =
  document.getElementById("yoshiChemistryBack");

const yoshiChemistryDetailPage =
  document.getElementById("yoshiChemistryDetailPage");

const yoshiChemistryDetailBack =
  document.getElementById("yoshiChemistryDetailBack");

const yoshiChemistryDetailEmoji =
  document.getElementById("yoshiChemistryDetailEmoji");

const yoshiChemistryDetailTitle =
  document.getElementById("yoshiChemistryDetailTitle");

const yoshiChemistryDetailName =
  document.getElementById("yoshiChemistryDetailName");

const yoshiChemistryDetailCaption =
  document.getElementById("yoshiChemistryDetailCaption");

const yoshiChemistryAdd =
  document.getElementById("yoshiChemistryAdd");

let currentYoshiChemistryPartner = null;


// =====================================================
// 🐯 PARTNER INFO
// =====================================================

const yoshiChemistryPartnerInfo = {

  HYUNSUK: {
    emoji: "🐯🦔",
    title: "YOSHI × HYUNSUK"
  },

  JIHOON: {
    emoji: "🐯🐶",
    title: "YOSHI × JIHOON"
  },

  JUNKYU: {
    emoji: "🐯🐨",
    title: "YOSHI × JUNKYU"
  },

  JAEHYUK: {
    emoji: "🐯🦁",
    title: "YOSHI × JAEHYUK"
  },

  ASAHI: {
    emoji: "🐯🤖",
    title: "YOSHI × ASAHI"
  },

  DOYOUNG: {
    emoji: "🐯🐰",
    title: "YOSHI × DOYOUNG"
  },

  HARUTO: {
    emoji: "🐯🦋",
    title: "YOSHI × HARUTO"
  },

  JEONGWOO: {
    emoji: "🐯🐺",
    title: "YOSHI × JEONGWOO"
  },

  JUNGHWAN: {
    emoji: "🐯🐮",
    title: "YOSHI × JUNGHWAN"
  }

};


// =====================================================
// 🫶 YOSHI BOOK → CHEMISTRY
// =====================================================

if (
  yoshiChemistryOpen &&
  yoshiChemistryPage
) {

  yoshiChemistryOpen.addEventListener(
    "click",
    () => {

      if (yoshiBookDetail) {
        yoshiBookDetail.classList.remove("active");
      }

      yoshiChemistryPage.style.display =
        "block";

      yoshiChemistryPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";
    }
  );
}


// =====================================================
// ← CHEMISTRY → YOSHI BOOK
// =====================================================

if (
  yoshiChemistryBack &&
  yoshiChemistryPage
) {

  yoshiChemistryBack.addEventListener(
    "click",
    () => {

      yoshiChemistryPage.style.display =
        "none";

      if (yoshiBookDetail) {

        yoshiBookDetail.classList.add(
          "active"
        );

        yoshiBookDetail.scrollTop =
          0;
      }

      document.body.style.overflow =
        "hidden";
    }
  );
}


// =====================================================
// 🐯 CHEMISTRY CARD → DETAIL
// =====================================================

document
  .querySelectorAll(".yoshi-chemistry-card")
  .forEach(card => {

   card.addEventListener(
  "click",
  async () => {

        const partner =
          card.dataset.partner;

        if (!partner) return;

        const info =
          yoshiChemistryPartnerInfo[
            partner
          ];

        if (!info) return;


        currentYoshiChemistryPartner =
          partner;
// 💎 SHARED CHEMISTRYへ接続
currentHyunsukChemistryPartner =
  partner;

currentHyunsukChemistryPairKey =
  createChemistryPairKey(
    "YOSHI",
    partner
  );

currentSharedChemistryRenderTarget =
  document.getElementById(
    "yoshiChemistryMemoryList"
  );

        if (yoshiChemistryDetailEmoji) {
          yoshiChemistryDetailEmoji.textContent =
            info.emoji;
        }


        if (yoshiChemistryDetailTitle) {
          yoshiChemistryDetailTitle.textContent =
            info.title;
        }


        if (yoshiChemistryDetailName) {
          yoshiChemistryDetailName.textContent =
            "CHEMISTRY MEMORY 💎";
        }


        if (yoshiChemistryDetailCaption) {
          yoshiChemistryDetailCaption.textContent =
            `ヨシと${partner}の好きな瞬間を集めよう 💎`;
        }


        yoshiChemistryPage.style.display =
          "none";

        yoshiChemistryDetailPage.style.display =
          "block";

        yoshiChemistryDetailPage.scrollTop =
          0;
await renderSharedChemistryMemories();
        document.body.style.overflow =
          "hidden";
      }
    );
  });


// =====================================================
// ← DETAIL → CHEMISTRY LIST
// =====================================================

if (
  yoshiChemistryDetailBack &&
  yoshiChemistryDetailPage
) {

  yoshiChemistryDetailBack.addEventListener(
    "click",
    () => {

      yoshiChemistryDetailPage.style.display =
        "none";

      yoshiChemistryPage.style.display =
        "block";

      yoshiChemistryPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";
    }
  );
}
// =====================================================
// 🐯 YOSHI CHEMISTRY → SHARED MEMORY MODAL
// =====================================================

if (yoshiChemistryAdd) {

  yoshiChemistryAdd.addEventListener(
    "click",
    () => {

      if (
        !currentYoshiChemistryPartner
      ) {
        return;
      }


      currentHyunsukChemistryPairKey =
        createChemistryPairKey(
          "YOSHI",
          currentYoshiChemistryPartner
        );


      currentSharedChemistryRenderTarget =
        document.getElementById(
          "yoshiChemistryMemoryList"
        );


      currentSharedChemistryImageData =
        null;


      delete hyunsukChemistryMemorySave
        .dataset.editId;


      hyunsukChemistryMemoryInput.value =
        "";

      hyunsukChemistryMemoryMemo.value =
        "";

      hyunsukChemistryMemoryPreviewImage.src =
        "";

      hyunsukChemistryMemoryPreview.style.display =
        "none";

      hyunsukChemistryMemoryDelete.style.display =
        "none";


      hyunsukChemistryMemorySave.textContent =
        "💎 SAVE MEMORY";


      hyunsukChemistryMemoryTitle.textContent =
        `YOSHI × ${currentYoshiChemistryPartner} MEMORY`;


      hyunsukChemistryMemoryModal.style.display =
        "flex";

      hyunsukChemistryMemoryModal.scrollTop =
        0;


      document.body.style.overflow =
        "hidden";
    }
  );
}
// =====================================================
// 🐨 JUNKYU CHEMISTRY
// SHARED CHEMISTRY ENGINE CONNECT
// =====================================================

const junkyuChemistryOpen =
  document.getElementById(
    "junkyuChemistryOpen"
  );

const junkyuChemistryPage =
  document.getElementById(
    "junkyuChemistryPage"
  );

const junkyuChemistryBack =
  document.getElementById(
    "junkyuChemistryBack"
  );

const junkyuChemistryList =
  document.getElementById(
    "junkyuChemistryList"
  );

const junkyuChemistryDetailPage =
  document.getElementById(
    "junkyuChemistryDetailPage"
  );

const junkyuChemistryDetailBack =
  document.getElementById(
    "junkyuChemistryDetailBack"
  );

const junkyuChemistryDetailName =
  document.getElementById(
    "junkyuChemistryDetailName"
  );

const junkyuChemistryDetailCaption =
  document.getElementById(
    "junkyuChemistryDetailCaption"
  );

const junkyuChemistryAdd =
  document.getElementById(
    "junkyuChemistryAdd"
  );

const junkyuChemistryMemories =
  document.getElementById(
    "junkyuChemistryMemories"
  );


let currentJunkyuChemistryPartner =
  null;


// =====================================================
// 🐨 PARTNERS
// =====================================================

const junkyuChemistryPartners = [
  "HYUNSUK",
  "JIHOON",
  "YOSHI",
  "JAEHYUK",
  "ASAHI",
  "DOYOUNG",
  "HARUTO",
  "JEONGWOO",
  "JUNGHWAN"
];


// =====================================================
// 🫶 MAKE 9 CHEMISTRY CARDS
// =====================================================

function renderJunkyuChemistryCards() {

  if (!junkyuChemistryList) {
    return;
  }


  junkyuChemistryList.innerHTML =
    "";


  junkyuChemistryPartners.forEach(
    partner => {

      const partnerInfo =
        chemistryMemberInfo[
          partner
        ];


      const card =
        document.createElement(
          "button"
        );

      card.type =
        "button";

      card.className =
        "jihoon-chemistry-card junkyu-chemistry-card";

      card.dataset.partner =
        partner;


      card.innerHTML = `
        <span class="jihoon-chemistry-emoji">
          🐨${partnerInfo?.emoji || "💎"}
        </span>

        <div>
          <strong>
            JUNKYU × ${partner}
          </strong>

          <small>
            CHEMISTRY MEMORY 💎
          </small>
        </div>

        <span>→</span>
      `;


      card.addEventListener(
        "click",
        async () => {

          currentJunkyuChemistryPartner =
            partner;


          // 💎 SHARED ENGINEへ接続
          currentHyunsukChemistryPartner =
            partner;

          currentHyunsukChemistryPairKey =
            createChemistryPairKey(
              "JUNKYU",
              partner
            );

          currentSharedChemistryRenderTarget =
            junkyuChemistryMemories;


          if (
            junkyuChemistryDetailName
          ) {

            junkyuChemistryDetailName.textContent =
              `🐨${partnerInfo?.emoji || "💎"} JUNKYU × ${partner}`;

          }


          if (
            junkyuChemistryDetailCaption
          ) {

            junkyuChemistryDetailCaption.textContent =
              `ジュンギュと${partner}の好きな瞬間を集めよう 💎`;

          }


          junkyuChemistryPage.style.display =
            "none";

          junkyuChemistryDetailPage.style.display =
            "block";

          junkyuChemistryDetailPage.scrollTop =
            0;


          await renderSharedChemistryMemories();


          document.body.style.overflow =
            "hidden";

        }
      );


      junkyuChemistryList.appendChild(
        card
      );

    }
  );
}


// =====================================================
// 🐨 JUNKYU BOOK → CHEMISTRY
// =====================================================

if (
  junkyuChemistryOpen &&
  junkyuChemistryPage
) {

  junkyuChemistryOpen.addEventListener(
    "click",
    () => {

      if (junkyuBookDetail) {

        junkyuBookDetail.classList.remove(
          "active"
        );

      }


      renderJunkyuChemistryCards();


      junkyuChemistryPage.style.display =
        "block";

      junkyuChemistryPage.scrollTop =
        0;


      document.body.style.overflow =
        "hidden";

    }
  );
}


// =====================================================
// ← CHEMISTRY → JUNKYU BOOK
// =====================================================

if (
  junkyuChemistryBack &&
  junkyuChemistryPage
) {

  junkyuChemistryBack.addEventListener(
    "click",
    () => {

      junkyuChemistryPage.style.display =
        "none";


      if (junkyuBookDetail) {

        junkyuBookDetail.classList.add(
          "active"
        );

        junkyuBookDetail.scrollTop =
          0;

      }


      document.body.style.overflow =
        "hidden";

    }
  );
}


// =====================================================
// ← DETAIL → CHEMISTRY LIST
// =====================================================

if (
  junkyuChemistryDetailBack &&
  junkyuChemistryDetailPage
) {

  junkyuChemistryDetailBack.addEventListener(
    "click",
    () => {

      junkyuChemistryDetailPage.style.display =
        "none";

      junkyuChemistryPage.style.display =
        "block";

      junkyuChemistryPage.scrollTop =
        0;


      document.body.style.overflow =
        "hidden";

    }
  );
}


// =====================================================
// ＋ ADD MEMORY → SHARED MODAL
// =====================================================

if (junkyuChemistryAdd) {

  junkyuChemistryAdd.addEventListener(
    "click",
    () => {

      if (
        !currentJunkyuChemistryPartner
      ) {
        return;
      }


      currentHyunsukChemistryPartner =
        currentJunkyuChemistryPartner;


      currentHyunsukChemistryPairKey =
        createChemistryPairKey(
          "JUNKYU",
          currentJunkyuChemistryPartner
        );


      currentSharedChemistryRenderTarget =
        junkyuChemistryMemories;


      currentSharedChemistryImageData =
        null;


      delete hyunsukChemistryMemorySave
        .dataset.editId;


      hyunsukChemistryMemoryInput.value =
        "";

      hyunsukChemistryMemoryMemo.value =
        "";

      hyunsukChemistryMemoryPreviewImage.src =
        "";

      hyunsukChemistryMemoryPreview.style.display =
        "none";

      hyunsukChemistryMemoryDelete.style.display =
        "none";


      hyunsukChemistryMemorySave.textContent =
        "💎 SAVE MEMORY";


      hyunsukChemistryMemoryTitle.textContent =
        `JUNKYU × ${currentJunkyuChemistryPartner} MEMORY`;


      hyunsukChemistryMemoryModal.style.display =
        "flex";

      hyunsukChemistryMemoryModal.scrollTop =
        0;


      document.body.style.overflow =
        "hidden";

    }
  );
}


// 最初のカード生成
renderJunkyuChemistryCards();
// =====================================================
// 🦁 JAEHYUK CHEMISTRY
// SHARED CHEMISTRY ENGINE CONNECT
// =====================================================

const jaehyukChemistryOpen =
  document.getElementById(
    "jaehyukChemistryOpen"
  );

const jaehyukChemistryPage =
  document.getElementById(
    "jaehyukChemistryPage"
  );

const jaehyukChemistryBack =
  document.getElementById(
    "jaehyukChemistryBack"
  );

const jaehyukChemistryList =
  document.getElementById(
    "jaehyukChemistryList"
  );

const jaehyukChemistryDetailPage =
  document.getElementById(
    "jaehyukChemistryDetailPage"
  );

const jaehyukChemistryDetailBack =
  document.getElementById(
    "jaehyukChemistryDetailBack"
  );

const jaehyukChemistryDetailName =
  document.getElementById(
    "jaehyukChemistryDetailName"
  );

const jaehyukChemistryDetailCaption =
  document.getElementById(
    "jaehyukChemistryDetailCaption"
  );

const jaehyukChemistryAdd =
  document.getElementById(
    "jaehyukChemistryAdd"
  );

const jaehyukChemistryMemories =
  document.getElementById(
    "jaehyukChemistryMemories"
  );


let currentJaehyukChemistryPartner =
  null;


// =====================================================
// 🦁 PARTNERS
// =====================================================

const jaehyukChemistryPartners = [
  "HYUNSUK",
  "JIHOON",
  "YOSHI",
  "JUNKYU",
  "ASAHI",
  "DOYOUNG",
  "HARUTO",
  "JEONGWOO",
  "JUNGHWAN"
];


// =====================================================
// 🫶 MAKE 9 CHEMISTRY CARDS
// =====================================================

function renderJaehyukChemistryCards() {

  if (!jaehyukChemistryList) {
    return;
  }


  jaehyukChemistryList.innerHTML =
    "";


  jaehyukChemistryPartners.forEach(
    partner => {

      const partnerInfo =
        chemistryMemberInfo[
          partner
        ];


      const card =
        document.createElement(
          "button"
        );

      card.type =
        "button";

      card.className =
        "jihoon-chemistry-card jaehyuk-chemistry-card";

      card.dataset.partner =
        partner;


      card.innerHTML = `
        <span class="jihoon-chemistry-emoji">
          🦁${partnerInfo?.emoji || "💎"}
        </span>

        <div>
          <strong>
            JAEHYUK × ${partner}
          </strong>

          <small>
            CHEMISTRY MEMORY 💎
          </small>
        </div>

        <span>→</span>
      `;


      card.addEventListener(
        "click",
        async () => {

          currentJaehyukChemistryPartner =
            partner;


          // 💎 SHARED ENGINEへ接続
          currentHyunsukChemistryPartner =
            partner;

          currentHyunsukChemistryPairKey =
            createChemistryPairKey(
              "JAEHYUK",
              partner
            );

          currentSharedChemistryRenderTarget =
            jaehyukChemistryMemories;


          if (
            jaehyukChemistryDetailName
          ) {

            jaehyukChemistryDetailName.textContent =
              `🦁${partnerInfo?.emoji || "💎"} JAEHYUK × ${partner}`;

          }


          if (
            jaehyukChemistryDetailCaption
          ) {

            jaehyukChemistryDetailCaption.textContent =
              `ジェヒョクと${partner}の好きな瞬間を集めよう 💎`;

          }


          jaehyukChemistryPage.style.display =
            "none";

          jaehyukChemistryDetailPage.style.display =
            "block";

          jaehyukChemistryDetailPage.scrollTop =
            0;


          await renderSharedChemistryMemories();


          document.body.style.overflow =
            "hidden";

        }
      );


      jaehyukChemistryList.appendChild(
        card
      );

    }
  );
}


// =====================================================
// 🦁 JAEHYUK BOOK → CHEMISTRY
// =====================================================

if (
  jaehyukChemistryOpen &&
  jaehyukChemistryPage
) {

  jaehyukChemistryOpen.addEventListener(
    "click",
    () => {

      if (jaehyukBookDetail) {

        jaehyukBookDetail.classList.remove(
          "active"
        );

      }


      renderJaehyukChemistryCards();
      jaehyukChemistryPage.style.display =
        "block";

      jaehyukChemistryPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// =====================================================
// ← CHEMISTRY → JAEHYUK BOOK
// =====================================================

if (
  jaehyukChemistryBack &&
  jaehyukChemistryPage
) {

  jaehyukChemistryBack.addEventListener(
    "click",
    () => {

      jaehyukChemistryPage.style.display =
        "none";

      if (jaehyukBookDetail) {

        jaehyukBookDetail.classList.add(
          "active"
        );

        jaehyukBookDetail.scrollTop =
          0;

      }

      document.body.style.overflow =
        "hidden";

    }
  );
}


// =====================================================
// ← DETAIL → CHEMISTRY LIST
// =====================================================

if (
  jaehyukChemistryDetailBack &&
  jaehyukChemistryDetailPage
) {

  jaehyukChemistryDetailBack.addEventListener(
    "click",
    () => {

      jaehyukChemistryDetailPage.style.display =
        "none";

      jaehyukChemistryPage.style.display =
        "block";

      jaehyukChemistryPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// =====================================================
// ＋ ADD MEMORY → SHARED MODAL
// =====================================================

if (jaehyukChemistryAdd) {

  jaehyukChemistryAdd.addEventListener(
    "click",
    () => {

      if (
        !currentJaehyukChemistryPartner
      ) {
        return;
      }

      currentHyunsukChemistryPartner =
        currentJaehyukChemistryPartner;

      currentHyunsukChemistryPairKey =
        createChemistryPairKey(
          "JAEHYUK",
          currentJaehyukChemistryPartner
        );

      currentSharedChemistryRenderTarget =
        jaehyukChemistryMemories;

      currentSharedChemistryImageData =
        null;

      delete hyunsukChemistryMemorySave
        .dataset.editId;

      hyunsukChemistryMemoryInput.value =
        "";

      hyunsukChemistryMemoryMemo.value =
        "";

      hyunsukChemistryMemoryPreviewImage.src =
        "";

      hyunsukChemistryMemoryPreview.style.display =
        "none";

      hyunsukChemistryMemoryDelete.style.display =
        "none";

      hyunsukChemistryMemorySave.textContent =
        "💎 SAVE MEMORY";

      hyunsukChemistryMemoryTitle.textContent =
        `JAEHYUK × ${currentJaehyukChemistryPartner} MEMORY`;

      hyunsukChemistryMemoryModal.style.display =
        "flex";

      hyunsukChemistryMemoryModal.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// 最初のカード生成
renderJaehyukChemistryCards();
// =====================================================
// 🤖 ASAHI CHEMISTRY
// SHARED CHEMISTRY ENGINE CONNECT
// =====================================================

const asahiChemistryOpen =
  document.getElementById(
    "asahiChemistryOpen"
  );

const asahiChemistryPage =
  document.getElementById(
    "asahiChemistryPage"
  );

const asahiChemistryBack =
  document.getElementById(
    "asahiChemistryBack"
  );

const asahiChemistryList =
  document.getElementById(
    "asahiChemistryList"
  );

const asahiChemistryDetailPage =
  document.getElementById(
    "asahiChemistryDetailPage"
  );

const asahiChemistryDetailBack =
  document.getElementById(
    "asahiChemistryDetailBack"
  );

const asahiChemistryDetailName =
  document.getElementById(
    "asahiChemistryDetailName"
  );

const asahiChemistryDetailCaption =
  document.getElementById(
    "asahiChemistryDetailCaption"
  );

const asahiChemistryAdd =
  document.getElementById(
    "asahiChemistryAdd"
  );

const asahiChemistryMemories =
  document.getElementById(
    "asahiChemistryMemories"
  );


let currentAsahiChemistryPartner =
  null;


// =====================================================
// 🤖 PARTNERS
// =====================================================

const asahiChemistryPartners = [
  "HYUNSUK",
  "JIHOON",
  "YOSHI",
  "JUNKYU",
  "JAEHYUK",
  "DOYOUNG",
  "HARUTO",
  "JEONGWOO",
  "JUNGHWAN"
];


// =====================================================
// 🫶 MAKE 9 CHEMISTRY CARDS
// =====================================================

function renderAsahiChemistryCards() {

  if (!asahiChemistryList) {
    return;
  }


  asahiChemistryList.innerHTML =
    "";


  asahiChemistryPartners.forEach(
    partner => {

      const partnerInfo =
        chemistryMemberInfo[
          partner
        ];


      const card =
        document.createElement(
          "button"
        );

      card.type =
        "button";

      card.className =
        "jihoon-chemistry-card asahi-chemistry-card";

      card.dataset.partner =
        partner;


      card.innerHTML = `
        <span class="jihoon-chemistry-emoji">
          🤖${partnerInfo?.emoji || "💎"}
        </span>

        <div>
          <strong>
            ASAHI × ${partner}
          </strong>

          <small>
            CHEMISTRY MEMORY 💎
          </small>
        </div>

        <span>→</span>
      `;


      card.addEventListener(
        "click",
        async () => {

          currentAsahiChemistryPartner =
            partner;


          // 💎 SHARED ENGINEへ接続
          currentHyunsukChemistryPartner =
            partner;

          currentHyunsukChemistryPairKey =
            createChemistryPairKey(
              "ASAHI",
              partner
            );

          currentSharedChemistryRenderTarget =
            asahiChemistryMemories;


          if (
            asahiChemistryDetailName
          ) {

            asahiChemistryDetailName.textContent =
              `🤖${partnerInfo?.emoji || "💎"} ASAHI × ${partner}`;

          }


          if (
            asahiChemistryDetailCaption
          ) {

            asahiChemistryDetailCaption.textContent =
              `アサヒと${partner}の好きな瞬間を集めよう 💎`;

          }


          asahiChemistryPage.style.display =
            "none";

          asahiChemistryDetailPage.style.display =
            "block";

          asahiChemistryDetailPage.scrollTop =
            0;


          await renderSharedChemistryMemories();


          document.body.style.overflow =
            "hidden";

        }
      );


      asahiChemistryList.appendChild(
        card
      );

    }
  );
}


// =====================================================
// 🤖 ASAHI BOOK → CHEMISTRY
// =====================================================

if (
  asahiChemistryOpen &&
  asahiChemistryPage
) {

  asahiChemistryOpen.addEventListener(
    "click",
    () => {

      if (asahiBookDetail) {

        asahiBookDetail.classList.remove(
          "active"
        );

      }


      renderAsahiChemistryCards();
      asahiChemistryPage.style.display =
        "block";

      asahiChemistryPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// =====================================================
// ← CHEMISTRY → ASAHI BOOK
// =====================================================

if (
  asahiChemistryBack &&
  asahiChemistryPage
) {

  asahiChemistryBack.addEventListener(
    "click",
    () => {

      asahiChemistryPage.style.display =
        "none";

      if (asahiBookDetail) {

        asahiBookDetail.classList.add(
          "active"
        );

        asahiBookDetail.scrollTop =
          0;

      }

      document.body.style.overflow =
        "hidden";

    }
  );
}


// =====================================================
// ← DETAIL → CHEMISTRY LIST
// =====================================================

if (
  asahiChemistryDetailBack &&
  asahiChemistryDetailPage
) {

  asahiChemistryDetailBack.addEventListener(
    "click",
    () => {

      asahiChemistryDetailPage.style.display =
        "none";

      asahiChemistryPage.style.display =
        "block";

      asahiChemistryPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// =====================================================
// ＋ ADD MEMORY → SHARED MODAL
// =====================================================

if (asahiChemistryAdd) {

  asahiChemistryAdd.addEventListener(
    "click",
    () => {

      if (
        !currentAsahiChemistryPartner
      ) {
        return;
      }

      currentHyunsukChemistryPartner =
        currentAsahiChemistryPartner;

      currentHyunsukChemistryPairKey =
        createChemistryPairKey(
          "ASAHI",
          currentAsahiChemistryPartner
        );

      currentSharedChemistryRenderTarget =
        asahiChemistryMemories;

      currentSharedChemistryImageData =
        null;

      delete hyunsukChemistryMemorySave
        .dataset.editId;

      hyunsukChemistryMemoryInput.value =
        "";

      hyunsukChemistryMemoryMemo.value =
        "";

      hyunsukChemistryMemoryPreviewImage.src =
        "";

      hyunsukChemistryMemoryPreview.style.display =
        "none";

      hyunsukChemistryMemoryDelete.style.display =
        "none";

      hyunsukChemistryMemorySave.textContent =
        "💎 SAVE MEMORY";

      hyunsukChemistryMemoryTitle.textContent =
        `ASAHI × ${currentAsahiChemistryPartner} MEMORY`;

      hyunsukChemistryMemoryModal.style.display =
        "flex";

      hyunsukChemistryMemoryModal.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// 最初のカード生成
renderAsahiChemistryCards();

// ======================================================
// 🚀 DOYOUNG → JUNGHWAN COMPLETE PACK
// ======================================================

// ========================================
// 🐰 DOYOUNG BOOK OPEN / CLOSE
// ========================================

const doyoungBookOpen =
  document.getElementById("doyoung-book-open");

const doyoungBookDetail =
  document.getElementById("doyoung-book-detail");

const doyoungBookClose =
  document.getElementById("doyoung-book-close");


// DOYOUNG BOOKを開く
if (
  doyoungBookOpen &&
  doyoungBookDetail
) {

  doyoungBookOpen.addEventListener(
    "click",
    () => {

      doyoungBookDetail.classList.add(
        "active"
      );

      doyoungBookDetail.scrollTop = 0;

      document.body.style.overflow =
        "hidden";
    }
  );
}


// DOYOUNG BOOKを閉じる
if (
  doyoungBookClose &&
  doyoungBookDetail
) {

  doyoungBookClose.addEventListener(
    "click",
    () => {

      doyoungBookDetail.classList.remove(
        "active"
      );

      // MEMBER BOOKは後ろで開いたまま
      document.body.style.overflow =
        "hidden";
    }
  );
}

// ======================================================
// 🐰 DOYOUNG VISUAL BOOK / RANKING
// ======================================================
const doyoungVisualSystem =
  setupMemberVisualBook({
    key: "doyoung",
    displayName: "DOYOUNG",
    japaneseName: "ドヨン"
  });

const doyoungVisualRankingSystem =
  setupMemberVisualRanking({
    key: "doyoung",
    displayName: "DOYOUNG",
    visualSystem: doyoungVisualSystem
  });

// ======================================================
// 🐰 DOYOUNG GROWTH HISTORY START
// 完成型：YEAR DETAIL + EDIT MODAL
// ======================================================

const doyoungGrowthHistoryOpen =
  document.getElementById("doyoungGrowthHistoryOpen");

const doyoungGrowthHistoryPage =
  document.getElementById("doyoungGrowthHistoryPage");

const doyoungGrowthHistoryBack =
  document.getElementById("doyoungGrowthHistoryBack");

const doyoungGrowthYearPage =
  document.getElementById("doyoungGrowthYearPage");

const doyoungGrowthYearBack =
  document.getElementById("doyoungGrowthYearBack");

const doyoungGrowthYearButtons =
  document.querySelectorAll(".doyoung-growth-year");

const doyoungGrowthYearNumber =
  document.getElementById("doyoungGrowthYearNumber");

const doyoungGrowthYearTitle =
  document.getElementById("doyoungGrowthYearTitle");

const doyoungGrowthYearSubtitle =
  document.getElementById("doyoungGrowthYearSubtitle");

const doyoungGrowthYearVisualTitle =
  document.getElementById("doyoungGrowthYearVisualTitle");

const doyoungGrowthYearCaption =
  document.getElementById("doyoungGrowthYearCaption");

const doyoungGrowthYearVisualGrid =
  document.getElementById("doyoungGrowthYearVisualGrid");

const doyoungGrowthYearVisualAdd =
  document.getElementById("doyoungGrowthYearVisualAdd");

const doyoungGrowthVisualModal =
  document.getElementById("doyoungGrowthVisualModal");

const doyoungGrowthVisualModalKicker =
  document.getElementById("doyoungGrowthVisualModalKicker");

const doyoungGrowthVisualInput =
  document.getElementById("doyoungGrowthVisualInput");

const doyoungGrowthVisualSelect =
  document.getElementById("doyoungGrowthVisualSelect");

const doyoungGrowthVisualPreview =
  document.getElementById("doyoungGrowthVisualPreview");

const doyoungGrowthVisualPreviewImage =
  document.getElementById("doyoungGrowthVisualPreviewImage");

const doyoungGrowthVisualHair =
  document.getElementById("doyoungGrowthVisualHair");

const doyoungGrowthVisualMemo =
  document.getElementById("doyoungGrowthVisualMemo");

const doyoungGrowthVisualSave =
  document.getElementById("doyoungGrowthVisualSave");

const doyoungGrowthVisualDelete =
  document.getElementById("doyoungGrowthVisualDelete");

const doyoungGrowthVisualCancel =
  document.getElementById("doyoungGrowthVisualCancel");

let currentDoyoungGrowthYear = "2020";

let pendingDoyoungGrowthFile = null;

let currentDoyoungGrowthVisualItem = null;

let doyoungGrowthDB = null;

const DOYOUNG_GROWTH_DB =
  "treasure-day-doyoung-growth-db";

const DOYOUNG_GROWTH_STORE =
  "doyoungGrowthVisuals";
// ======================================================
// 💾 DOYOUNG GROWTH IndexedDB
// ======================================================

function openDoyoungGrowthDB() {

  return new Promise((resolve, reject) => {

    const request =
      indexedDB.open(
        DOYOUNG_GROWTH_DB,
        1
      );

    request.onupgradeneeded =
      event => {

        const db =
          event.target.result;

        if (
          !db.objectStoreNames.contains(
            DOYOUNG_GROWTH_STORE
          )
        ) {

          db.createObjectStore(
            DOYOUNG_GROWTH_STORE,
            {
              keyPath: "id"
            }
          );

        }

      };


    request.onsuccess =
      () => {

        doyoungGrowthDB =
          request.result;

        resolve(
          doyoungGrowthDB
        );

      };


    request.onerror =
      () => {

        reject(
          request.error
        );

      };

  });
}


// ======================================================
// 📸 IMAGE → DataURL
// ======================================================

function doyoungGrowthImageToDataURL(
  file
) {

  return new Promise(
    (resolve, reject) => {

      const reader =
        new FileReader();

      reader.onload = () => {

        const img =
          new Image();

        img.onload = () => {

          const MAX_SIZE = 1600;

          let width =
            img.naturalWidth;

          let height =
            img.naturalHeight;


          if (
            width > height &&
            width > MAX_SIZE
          ) {

            height =
              Math.round(
                height *
                MAX_SIZE /
                width
              );

            width =
              MAX_SIZE;

          } else if (
            height >= width &&
            height > MAX_SIZE
          ) {

            width =
              Math.round(
                width *
                MAX_SIZE /
                height
              );

            height =
              MAX_SIZE;

          }


          const canvas =
            document.createElement(
              "canvas"
            );

          canvas.width =
            width;

          canvas.height =
            height;


          const ctx =
            canvas.getContext(
              "2d"
            );

          if (!ctx) {

            reject(
              new Error(
                "Canvas unavailable"
              )
            );

            return;

          }


          ctx.drawImage(
            img,
            0,
            0,
            width,
            height
          );


          resolve(
            canvas.toDataURL(
              "image/jpeg",
              0.86
            )
          );

        };


        img.onerror =
          reject;

        img.src =
          reader.result;

      };


      reader.onerror =
        reject;

      reader.readAsDataURL(
        file
      );

    }
  );
}


// ======================================================
// 💾 SAVE NEW
// ======================================================

async function saveDoyoungGrowthVisual(
  file,
  year,
  hairColor,
  memo
) {

  if (!doyoungGrowthDB) {
    await openDoyoungGrowthDB();
  }


  const imageData =
    await doyoungGrowthImageToDataURL(
      file
    );


  const item = {

    id:
      Date.now() +
      Math.floor(
        Math.random() * 1000
      ),

    year:
      String(year),

    imageData,

    hairColor:
      hairColor || "OTHER",

    memo:
      memo || "",

    createdAt:
      Date.now()

  };


  return new Promise(
    (resolve, reject) => {

      const transaction =
        doyoungGrowthDB.transaction(
          DOYOUNG_GROWTH_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          DOYOUNG_GROWTH_STORE
        );

      const request =
        store.add(item);


      request.onsuccess =
        () => resolve(item);

      request.onerror =
        () => reject(
          request.error
        );

    }
  );
}


// ======================================================
// ✏️ UPDATE
// ======================================================

function updateDoyoungGrowthVisual(
  item
) {

  return new Promise(
    (resolve, reject) => {

      const transaction =
        doyoungGrowthDB.transaction(
          DOYOUNG_GROWTH_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          DOYOUNG_GROWTH_STORE
        );

      const request =
        store.put(item);


      request.onsuccess =
        () => resolve();

      request.onerror =
        () => reject(
          request.error
        );

    }
  );
}


// ======================================================
// 📚 GET YEAR VISUALS
// ======================================================

async function getDoyoungGrowthVisuals(
  year
) {

  if (!doyoungGrowthDB) {
    await openDoyoungGrowthDB();
  }


  return new Promise(
    (resolve, reject) => {

      const transaction =
        doyoungGrowthDB.transaction(
          DOYOUNG_GROWTH_STORE,
          "readonly"
        );

      const store =
        transaction.objectStore(
          DOYOUNG_GROWTH_STORE
        );

      const request =
        store.getAll();


      request.onsuccess =
        () => {

          const items =
            request.result || [];

          resolve(
            items.filter(
              item =>
                String(item.year) ===
                String(year)
            )
          );

        };


      request.onerror =
        () => reject(
          request.error
        );

    }
  );
}


// ======================================================
// 🗑 DELETE
// ======================================================

async function deleteDoyoungGrowthVisual(
  id
) {

  if (!doyoungGrowthDB) {
    await openDoyoungGrowthDB();
  }


  return new Promise(
    (resolve, reject) => {

      const transaction =
        doyoungGrowthDB.transaction(
          DOYOUNG_GROWTH_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          DOYOUNG_GROWTH_STORE
        );

      const request =
        store.delete(id);


      request.onsuccess =
        () => resolve();

      request.onerror =
        () => reject(
          request.error
        );

    }
  );
}
// ======================================================
// 🌱 DOYOUNG GROWTH YEAR INFO
// ======================================================

const doyoungGrowthYearInfo = {

  "2020": {
    title: "DEBUT ERA 💎"
  },

  "2021": {
    title: "2021 ERA 💎"
  },

  "2022": {
    title: "2022 ERA 💎"
  },

  "2023": {
    title: "2023 ERA 💎"
  },

  "2024": {
    title: "2024 ERA 💎"
  },

  "2025": {
    title: "2025 ERA 💎"
  },

  "2026": {
    title: "NOW ✨"
  }

};


// ======================================================
// 📸 RENDER YEAR VISUALS
// ======================================================

async function renderDoyoungGrowthYearVisuals() {

  if (!doyoungGrowthYearVisualGrid) {
    return;
  }


  doyoungGrowthYearVisualGrid.innerHTML =
    "";


  const items =
    await getDoyoungGrowthVisuals(
      currentDoyoungGrowthYear
    );


  items
    .sort(
      (a, b) =>
        a.createdAt -
        b.createdAt
    )
    .forEach(item => {

      const card =
        document.createElement(
          "button"
        );

      card.type =
        "button";

 card.className =
  "jihoon-growth-visual-card doyoung-growth-visual-card";
const photo =
  document.createElement("div");

photo.className =
  "jihoon-growth-visual-photo doyoung-growth-visual-photo";
      const img =
        document.createElement(
          "img"
        );

      img.src =
        item.imageData || "";

      img.alt =
        `DOYOUNG ${item.year}`;

      img.loading =
        "lazy";

      img.decoding =
        "async";


      const info =
        document.createElement(
          "div"
        );

      info.className =
        "jihoon-growth-visual-info";


      const hair =
        document.createElement(
          "span"
        );

      hair.textContent =
        `🎨 ${item.hairColor || "OTHER"}`;


      const memo =
        document.createElement(
          "p"
        );

      memo.textContent =
        item.memo || "";


      info.appendChild(
        hair
      );


      if (item.memo) {

        info.appendChild(
          memo
        );

      }


      photo.appendChild(
  img
);

card.appendChild(
  photo
);

      card.appendChild(
        info
      );


      // 写真タップ → EDIT
      card.addEventListener(
        "click",
        () => {

          currentDoyoungGrowthVisualItem =
            item;

          pendingDoyoungGrowthFile =
            null;


          if (
            doyoungGrowthVisualPreviewImage
          ) {

            doyoungGrowthVisualPreviewImage.src =
              item.imageData || "";

          }


          if (
            doyoungGrowthVisualPreview
          ) {

            doyoungGrowthVisualPreview.style.display =
              "block";

          }


          if (
            doyoungGrowthVisualHair
          ) {

            doyoungGrowthVisualHair.value =
              item.hairColor ||
              "OTHER";

          }


          if (
            doyoungGrowthVisualMemo
          ) {

            doyoungGrowthVisualMemo.value =
              item.memo || "";

          }


          if (
            doyoungGrowthVisualDelete
          ) {

            doyoungGrowthVisualDelete.style.display =
              "block";

          }


          if (
            doyoungGrowthVisualModalKicker
          ) {

            doyoungGrowthVisualModalKicker.textContent =
              `📸 ${item.year} VISUAL`;

          }


          if (
            doyoungGrowthVisualModal
          ) {

            doyoungGrowthVisualModal.style.display =
              "flex";

          }

        }
      );


      doyoungGrowthYearVisualGrid.appendChild(
        card
      );

    });

}


// ======================================================
// 🌱 OPEN YEAR DETAIL
// ======================================================

async function openDoyoungGrowthYear(
  year
) {

  currentDoyoungGrowthYear =
    String(year);


  const info =
    doyoungGrowthYearInfo[
      currentDoyoungGrowthYear
    ] || {
      title:
        `${currentDoyoungGrowthYear} ERA 💎`
    };


  if (
    doyoungGrowthYearNumber
  ) {

    doyoungGrowthYearNumber.textContent =
      currentDoyoungGrowthYear;

  }


  if (
    doyoungGrowthYearTitle
  ) {

    doyoungGrowthYearTitle.textContent =
      info.title;

  }


  if (
    doyoungGrowthYearSubtitle
  ) {

    doyoungGrowthYearSubtitle.textContent =
      `${currentDoyoungGrowthYear}年のドヨンを振り返ろう 💎`;

  }


  if (
    doyoungGrowthYearVisualTitle
  ) {

    doyoungGrowthYearVisualTitle.textContent =
      `📸 ${currentDoyoungGrowthYear} VISUAL`;

  }


  if (
    doyoungGrowthYearCaption
  ) {

    doyoungGrowthYearCaption.textContent =
      `${currentDoyoungGrowthYear}年のお気に入りドヨンを残そう 💎`;

  }


  if (
    doyoungGrowthHistoryPage
  ) {

    doyoungGrowthHistoryPage.style.display =
      "none";

  }


  if (
    doyoungGrowthYearPage
  ) {

    doyoungGrowthYearPage.style.display =
      "block";

    doyoungGrowthYearPage.scrollTop =
      0;

  }


  await renderDoyoungGrowthYearVisuals();

}


// ======================================================
// 🌱 YEAR BUTTONS
// ======================================================

doyoungGrowthYearButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      async () => {

        await openDoyoungGrowthYear(
          button.dataset.year
        );

      }
    );

  }
);
// ======================================================
// 🌱 OPEN GROWTH HISTORY
// ======================================================

if (
  doyoungGrowthHistoryOpen &&
  doyoungGrowthHistoryPage
) {

  doyoungGrowthHistoryOpen.addEventListener(
    "click",
    () => {

      if (doyoungBookDetail) {
        doyoungBookDetail.classList.remove(
          "active"
        );
      }

      doyoungGrowthHistoryPage.style.display =
        "block";

      doyoungGrowthHistoryPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// ======================================================
// ← GROWTH HISTORY → DOYOUNG BOOK
// ======================================================

if (
  doyoungGrowthHistoryBack &&
  doyoungGrowthHistoryPage
) {

  doyoungGrowthHistoryBack.addEventListener(
    "click",
    () => {

      doyoungGrowthHistoryPage.style.display =
        "none";

      if (doyoungBookDetail) {

        doyoungBookDetail.classList.add(
          "active"
        );

        doyoungBookDetail.scrollTop =
          0;

      }

      document.body.style.overflow =
        "hidden";

    }
  );
}


// ======================================================
// ← YEAR DETAIL → GROWTH HISTORY
// ======================================================

if (
  doyoungGrowthYearBack &&
  doyoungGrowthYearPage
) {

  doyoungGrowthYearBack.addEventListener(
    "click",
    () => {

      doyoungGrowthYearPage.style.display =
        "none";

      doyoungGrowthHistoryPage.style.display =
        "block";

      doyoungGrowthHistoryPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// ======================================================
// ＋ ADD → MODAL
// ======================================================

if (doyoungGrowthYearVisualAdd) {

  doyoungGrowthYearVisualAdd.addEventListener(
    "click",
    () => {

      currentDoyoungGrowthVisualItem =
        null;

      pendingDoyoungGrowthFile =
        null;


      if (doyoungGrowthVisualInput) {
        doyoungGrowthVisualInput.value =
          "";
      }


      if (doyoungGrowthVisualMemo) {
        doyoungGrowthVisualMemo.value =
          "";
      }


      if (doyoungGrowthVisualHair) {
        doyoungGrowthVisualHair.value =
          "BLACK";
      }


      if (doyoungGrowthVisualPreviewImage) {
        doyoungGrowthVisualPreviewImage.src =
          "";
      }


      if (doyoungGrowthVisualPreview) {
        doyoungGrowthVisualPreview.style.display =
          "none";
      }


      if (doyoungGrowthVisualDelete) {
        doyoungGrowthVisualDelete.style.display =
          "none";
      }


      if (doyoungGrowthVisualModalKicker) {

        doyoungGrowthVisualModalKicker.textContent =
          `📸 ${currentDoyoungGrowthYear} VISUAL`;

      }


      if (doyoungGrowthVisualModal) {

        doyoungGrowthVisualModal.style.display =
          "flex";

        doyoungGrowthVisualModal.scrollTop =
          0;

      }

    }
  );
}


// ======================================================
// 📷 SELECT PHOTO
// ======================================================

if (
  doyoungGrowthVisualSelect &&
  doyoungGrowthVisualInput
) {

  doyoungGrowthVisualSelect.addEventListener(
    "click",
    () => {

      doyoungGrowthVisualInput.click();

    }
  );
}


if (doyoungGrowthVisualInput) {

  doyoungGrowthVisualInput.addEventListener(
    "change",
    () => {

      const file =
        doyoungGrowthVisualInput.files[0];

      if (!file) return;


      pendingDoyoungGrowthFile =
        file;


      const reader =
        new FileReader();


      reader.onload =
        () => {

          if (
            doyoungGrowthVisualPreviewImage
          ) {

            doyoungGrowthVisualPreviewImage.src =
              reader.result;

          }


          if (
            doyoungGrowthVisualPreview
          ) {

            doyoungGrowthVisualPreview.style.display =
              "block";

          }

        };


      reader.readAsDataURL(
        file
      );

    }
  );
}


// ======================================================
// 💎 SAVE / UPDATE
// ======================================================

if (doyoungGrowthVisualSave) {

  doyoungGrowthVisualSave.addEventListener(
    "click",
    async () => {

      try {

        const hairColor =
          doyoungGrowthVisualHair
            ? doyoungGrowthVisualHair.value
            : "OTHER";


        const memo =
          doyoungGrowthVisualMemo
            ? doyoungGrowthVisualMemo.value.trim()
            : "";


        // ✏️ UPDATE
        if (
          currentDoyoungGrowthVisualItem
        ) {

          currentDoyoungGrowthVisualItem.hairColor =
            hairColor;

          currentDoyoungGrowthVisualItem.memo =
            memo;


          if (
            pendingDoyoungGrowthFile
          ) {

            currentDoyoungGrowthVisualItem.imageData =
              await doyoungGrowthImageToDataURL(
                pendingDoyoungGrowthFile
              );

          }


          await updateDoyoungGrowthVisual(
            currentDoyoungGrowthVisualItem
          );

        }

        // 📸 NEW
        else {

          if (!pendingDoyoungGrowthFile) {

            alert(
              "写真を選んでね📸"
            );

            return;

          }


          await saveDoyoungGrowthVisual(
            pendingDoyoungGrowthFile,
            currentDoyoungGrowthYear,
            hairColor,
            memo
          );

        }


        closeDoyoungGrowthModal();

        await renderDoyoungGrowthYearVisuals();


      } catch (error) {

        console.error(
          "DOYOUNG GROWTH SAVE ERROR:",
          error
        );

        alert(
          "保存に失敗しました🥲"
        );

      }

    }
  );
}


// ======================================================
// 🗑 DELETE
// ======================================================

if (doyoungGrowthVisualDelete) {

  doyoungGrowthVisualDelete.addEventListener(
    "click",
    async () => {

      if (
        !currentDoyoungGrowthVisualItem
      ) {
        return;
      }


      const ok =
        confirm(
          "この写真を削除しますか？🥲"
        );

      if (!ok) return;


      try {

        await deleteDoyoungGrowthVisual(
          currentDoyoungGrowthVisualItem.id
        );

        closeDoyoungGrowthModal();

        await renderDoyoungGrowthYearVisuals();


      } catch (error) {

        console.error(
          "DOYOUNG GROWTH DELETE ERROR:",
          error
        );

        alert(
          "削除に失敗しました🥲"
        );

      }

    }
  );
}


// ======================================================
// CANCEL / CLOSE
// ======================================================

function closeDoyoungGrowthModal() {

  pendingDoyoungGrowthFile =
    null;

  currentDoyoungGrowthVisualItem =
    null;


  if (doyoungGrowthVisualInput) {
    doyoungGrowthVisualInput.value =
      "";
  }


  if (doyoungGrowthVisualPreviewImage) {
    doyoungGrowthVisualPreviewImage.src =
      "";
  }


  if (doyoungGrowthVisualPreview) {
    doyoungGrowthVisualPreview.style.display =
      "none";
  }


  if (doyoungGrowthVisualMemo) {
    doyoungGrowthVisualMemo.value =
      "";
  }


  if (doyoungGrowthVisualDelete) {
    doyoungGrowthVisualDelete.style.display =
      "none";
  }


  if (doyoungGrowthVisualModal) {
    doyoungGrowthVisualModal.style.display =
      "none";
  }

}


if (doyoungGrowthVisualCancel) {

  doyoungGrowthVisualCancel.addEventListener(
    "click",
    () => {

      closeDoyoungGrowthModal();

    }
  );
}


// ======================================================
// 🚀 INITIALIZE DOYOUNG GROWTH DB
// ======================================================

openDoyoungGrowthDB()
  .catch(
    error => {

      console.error(
        "DOYOUNG GROWTH DB ERROR:",
        error
      );

    }
  );

// ======================================================
// 🐰 DOYOUNG SONG / MEMORIES
// ======================================================
const doyoungSongSystem =
  setupMemberSong({
    key: "doyoung",
    displayName: "DOYOUNG",
    japaneseName: "ドヨン"
  });

const doyoungMemoriesSystem =
  setupMemberMemories({
    key: "doyoung",
    displayName: "DOYOUNG",
    japaneseName: "ドヨン"
  });

// =====================================================
// 🐰 DOYOUNG CHEMISTRY
// SHARED CHEMISTRY ENGINE CONNECT
// =====================================================

const doyoungChemistryOpen =
  document.getElementById(
    "doyoungChemistryOpen"
  );

const doyoungChemistryPage =
  document.getElementById(
    "doyoungChemistryPage"
  );

const doyoungChemistryBack =
  document.getElementById(
    "doyoungChemistryBack"
  );

const doyoungChemistryList =
  document.getElementById(
    "doyoungChemistryList"
  );

const doyoungChemistryDetailPage =
  document.getElementById(
    "doyoungChemistryDetailPage"
  );

const doyoungChemistryDetailBack =
  document.getElementById(
    "doyoungChemistryDetailBack"
  );

const doyoungChemistryDetailName =
  document.getElementById(
    "doyoungChemistryDetailName"
  );

const doyoungChemistryDetailCaption =
  document.getElementById(
    "doyoungChemistryDetailCaption"
  );

const doyoungChemistryAdd =
  document.getElementById(
    "doyoungChemistryAdd"
  );

const doyoungChemistryMemories =
  document.getElementById(
    "doyoungChemistryMemories"
  );


let currentDoyoungChemistryPartner =
  null;


// =====================================================
// 🐰 PARTNERS
// =====================================================

const doyoungChemistryPartners = [
  "HYUNSUK",
  "JIHOON",
  "YOSHI",
  "JUNKYU",
  "JAEHYUK",
  "ASAHI",
  "HARUTO",
  "JEONGWOO",
  "JUNGHWAN"
];


// =====================================================
// 🫶 MAKE 9 CHEMISTRY CARDS
// =====================================================

function renderDoyoungChemistryCards() {

  if (!doyoungChemistryList) {
    return;
  }


  doyoungChemistryList.innerHTML =
    "";


  doyoungChemistryPartners.forEach(
    partner => {

      const partnerInfo =
        chemistryMemberInfo[
          partner
        ];


      const card =
        document.createElement(
          "button"
        );

      card.type =
        "button";

      card.className =
        "jihoon-chemistry-card doyoung-chemistry-card";

      card.dataset.partner =
        partner;


      card.innerHTML = `
        <span class="jihoon-chemistry-emoji">
          🐰${partnerInfo?.emoji || "💎"}
        </span>

        <div>
          <strong>
            DOYOUNG × ${partner}
          </strong>

          <small>
            CHEMISTRY MEMORY 💎
          </small>
        </div>

        <span>→</span>
      `;


      card.addEventListener(
        "click",
        async () => {

          currentDoyoungChemistryPartner =
            partner;


          // 💎 SHARED ENGINEへ接続
          currentHyunsukChemistryPartner =
            partner;

          currentHyunsukChemistryPairKey =
            createChemistryPairKey(
              "DOYOUNG",
              partner
            );

          currentSharedChemistryRenderTarget =
            doyoungChemistryMemories;


          if (
            doyoungChemistryDetailName
          ) {

            doyoungChemistryDetailName.textContent =
              `🐰${partnerInfo?.emoji || "💎"} DOYOUNG × ${partner}`;

          }


          if (
            doyoungChemistryDetailCaption
          ) {

            doyoungChemistryDetailCaption.textContent =
              `ドヨンと${partner}の好きな瞬間を集めよう 💎`;

          }


          doyoungChemistryPage.style.display =
            "none";

          doyoungChemistryDetailPage.style.display =
            "block";

          doyoungChemistryDetailPage.scrollTop =
            0;


          await renderSharedChemistryMemories();


          document.body.style.overflow =
            "hidden";

        }
      );


      doyoungChemistryList.appendChild(
        card
      );

    }
  );
}


// =====================================================
// 🐰 DOYOUNG BOOK → CHEMISTRY
// =====================================================

if (
  doyoungChemistryOpen &&
  doyoungChemistryPage
) {

  doyoungChemistryOpen.addEventListener(
    "click",
    () => {

      if (doyoungBookDetail) {

        doyoungBookDetail.classList.remove(
          "active"
        );

      }


      renderDoyoungChemistryCards();
      doyoungChemistryPage.style.display =
        "block";

      doyoungChemistryPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// =====================================================
// ← CHEMISTRY → DOYOUNG BOOK
// =====================================================

if (
  doyoungChemistryBack &&
  doyoungChemistryPage
) {

  doyoungChemistryBack.addEventListener(
    "click",
    () => {

      doyoungChemistryPage.style.display =
        "none";

      if (doyoungBookDetail) {

        doyoungBookDetail.classList.add(
          "active"
        );

        doyoungBookDetail.scrollTop =
          0;

      }

      document.body.style.overflow =
        "hidden";

    }
  );
}


// =====================================================
// ← DETAIL → CHEMISTRY LIST
// =====================================================

if (
  doyoungChemistryDetailBack &&
  doyoungChemistryDetailPage
) {

  doyoungChemistryDetailBack.addEventListener(
    "click",
    () => {

      doyoungChemistryDetailPage.style.display =
        "none";

      doyoungChemistryPage.style.display =
        "block";

      doyoungChemistryPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// =====================================================
// ＋ ADD MEMORY → SHARED MODAL
// =====================================================

if (doyoungChemistryAdd) {

  doyoungChemistryAdd.addEventListener(
    "click",
    () => {

      if (
        !currentDoyoungChemistryPartner
      ) {
        return;
      }

      currentHyunsukChemistryPartner =
        currentDoyoungChemistryPartner;

      currentHyunsukChemistryPairKey =
        createChemistryPairKey(
          "DOYOUNG",
          currentDoyoungChemistryPartner
        );

      currentSharedChemistryRenderTarget =
        doyoungChemistryMemories;

      currentSharedChemistryImageData =
        null;

      delete hyunsukChemistryMemorySave
        .dataset.editId;

      hyunsukChemistryMemoryInput.value =
        "";

      hyunsukChemistryMemoryMemo.value =
        "";

      hyunsukChemistryMemoryPreviewImage.src =
        "";

      hyunsukChemistryMemoryPreview.style.display =
        "none";

      hyunsukChemistryMemoryDelete.style.display =
        "none";

      hyunsukChemistryMemorySave.textContent =
        "💎 SAVE MEMORY";

      hyunsukChemistryMemoryTitle.textContent =
        `DOYOUNG × ${currentDoyoungChemistryPartner} MEMORY`;

      hyunsukChemistryMemoryModal.style.display =
        "flex";

      hyunsukChemistryMemoryModal.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// 最初のカード生成
renderDoyoungChemistryCards();

// ========================================
// 🦋 HARUTO BOOK OPEN / CLOSE
// ========================================

const harutoBookOpen =
  document.getElementById("haruto-book-open");

const harutoBookDetail =
  document.getElementById("haruto-book-detail");

const harutoBookClose =
  document.getElementById("haruto-book-close");


// HARUTO BOOKを開く
if (
  harutoBookOpen &&
  harutoBookDetail
) {

  harutoBookOpen.addEventListener(
    "click",
    () => {

      harutoBookDetail.classList.add(
        "active"
      );

      harutoBookDetail.scrollTop = 0;

      document.body.style.overflow =
        "hidden";
    }
  );
}


// HARUTO BOOKを閉じる
if (
  harutoBookClose &&
  harutoBookDetail
) {

  harutoBookClose.addEventListener(
    "click",
    () => {

      harutoBookDetail.classList.remove(
        "active"
      );

      // MEMBER BOOKは後ろで開いたまま
      document.body.style.overflow =
        "hidden";
    }
  );
}

// ======================================================
// 🦋 HARUTO VISUAL BOOK / RANKING
// ======================================================
const harutoVisualSystem =
  setupMemberVisualBook({
    key: "haruto",
    displayName: "HARUTO",
    japaneseName: "ハルト"
  });

const harutoVisualRankingSystem =
  setupMemberVisualRanking({
    key: "haruto",
    displayName: "HARUTO",
    visualSystem: harutoVisualSystem
  });

// ======================================================
// 🦋 HARUTO GROWTH HISTORY START
// 完成型：YEAR DETAIL + EDIT MODAL
// ======================================================

const harutoGrowthHistoryOpen =
  document.getElementById("harutoGrowthHistoryOpen");

const harutoGrowthHistoryPage =
  document.getElementById("harutoGrowthHistoryPage");

const harutoGrowthHistoryBack =
  document.getElementById("harutoGrowthHistoryBack");

const harutoGrowthYearPage =
  document.getElementById("harutoGrowthYearPage");

const harutoGrowthYearBack =
  document.getElementById("harutoGrowthYearBack");

const harutoGrowthYearButtons =
  document.querySelectorAll(".haruto-growth-year");

const harutoGrowthYearNumber =
  document.getElementById("harutoGrowthYearNumber");

const harutoGrowthYearTitle =
  document.getElementById("harutoGrowthYearTitle");

const harutoGrowthYearSubtitle =
  document.getElementById("harutoGrowthYearSubtitle");

const harutoGrowthYearVisualTitle =
  document.getElementById("harutoGrowthYearVisualTitle");

const harutoGrowthYearCaption =
  document.getElementById("harutoGrowthYearCaption");

const harutoGrowthYearVisualGrid =
  document.getElementById("harutoGrowthYearVisualGrid");

const harutoGrowthYearVisualAdd =
  document.getElementById("harutoGrowthYearVisualAdd");

const harutoGrowthVisualModal =
  document.getElementById("harutoGrowthVisualModal");

const harutoGrowthVisualModalKicker =
  document.getElementById("harutoGrowthVisualModalKicker");

const harutoGrowthVisualInput =
  document.getElementById("harutoGrowthVisualInput");

const harutoGrowthVisualSelect =
  document.getElementById("harutoGrowthVisualSelect");

const harutoGrowthVisualPreview =
  document.getElementById("harutoGrowthVisualPreview");

const harutoGrowthVisualPreviewImage =
  document.getElementById("harutoGrowthVisualPreviewImage");

const harutoGrowthVisualHair =
  document.getElementById("harutoGrowthVisualHair");

const harutoGrowthVisualMemo =
  document.getElementById("harutoGrowthVisualMemo");

const harutoGrowthVisualSave =
  document.getElementById("harutoGrowthVisualSave");

const harutoGrowthVisualDelete =
  document.getElementById("harutoGrowthVisualDelete");

const harutoGrowthVisualCancel =
  document.getElementById("harutoGrowthVisualCancel");

let currentHarutoGrowthYear = "2020";

let pendingHarutoGrowthFile = null;

let currentHarutoGrowthVisualItem = null;

let harutoGrowthDB = null;

const HARUTO_GROWTH_DB =
  "treasure-day-haruto-growth-db";

const HARUTO_GROWTH_STORE =
  "harutoGrowthVisuals";
// ======================================================
// 💾 HARUTO GROWTH IndexedDB
// ======================================================

function openHarutoGrowthDB() {

  return new Promise((resolve, reject) => {

    const request =
      indexedDB.open(
        HARUTO_GROWTH_DB,
        1
      );

    request.onupgradeneeded =
      event => {

        const db =
          event.target.result;

        if (
          !db.objectStoreNames.contains(
            HARUTO_GROWTH_STORE
          )
        ) {

          db.createObjectStore(
            HARUTO_GROWTH_STORE,
            {
              keyPath: "id"
            }
          );

        }

      };


    request.onsuccess =
      () => {

        harutoGrowthDB =
          request.result;

        resolve(
          harutoGrowthDB
        );

      };


    request.onerror =
      () => {

        reject(
          request.error
        );

      };

  });
}


// ======================================================
// 📸 IMAGE → DataURL
// ======================================================

function harutoGrowthImageToDataURL(
  file
) {

  return new Promise(
    (resolve, reject) => {

      const reader =
        new FileReader();

      reader.onload = () => {

        const img =
          new Image();

        img.onload = () => {

          const MAX_SIZE = 1600;

          let width =
            img.naturalWidth;

          let height =
            img.naturalHeight;


          if (
            width > height &&
            width > MAX_SIZE
          ) {

            height =
              Math.round(
                height *
                MAX_SIZE /
                width
              );

            width =
              MAX_SIZE;

          } else if (
            height >= width &&
            height > MAX_SIZE
          ) {

            width =
              Math.round(
                width *
                MAX_SIZE /
                height
              );

            height =
              MAX_SIZE;

          }


          const canvas =
            document.createElement(
              "canvas"
            );

          canvas.width =
            width;

          canvas.height =
            height;


          const ctx =
            canvas.getContext(
              "2d"
            );

          if (!ctx) {

            reject(
              new Error(
                "Canvas unavailable"
              )
            );

            return;

          }


          ctx.drawImage(
            img,
            0,
            0,
            width,
            height
          );


          resolve(
            canvas.toDataURL(
              "image/jpeg",
              0.86
            )
          );

        };


        img.onerror =
          reject;

        img.src =
          reader.result;

      };


      reader.onerror =
        reject;

      reader.readAsDataURL(
        file
      );

    }
  );
}


// ======================================================
// 💾 SAVE NEW
// ======================================================

async function saveHarutoGrowthVisual(
  file,
  year,
  hairColor,
  memo
) {

  if (!harutoGrowthDB) {
    await openHarutoGrowthDB();
  }


  const imageData =
    await harutoGrowthImageToDataURL(
      file
    );


  const item = {

    id:
      Date.now() +
      Math.floor(
        Math.random() * 1000
      ),

    year:
      String(year),

    imageData,

    hairColor:
      hairColor || "OTHER",

    memo:
      memo || "",

    createdAt:
      Date.now()

  };


  return new Promise(
    (resolve, reject) => {

      const transaction =
        harutoGrowthDB.transaction(
          HARUTO_GROWTH_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          HARUTO_GROWTH_STORE
        );

      const request =
        store.add(item);


      request.onsuccess =
        () => resolve(item);

      request.onerror =
        () => reject(
          request.error
        );

    }
  );
}


// ======================================================
// ✏️ UPDATE
// ======================================================

function updateHarutoGrowthVisual(
  item
) {

  return new Promise(
    (resolve, reject) => {

      const transaction =
        harutoGrowthDB.transaction(
          HARUTO_GROWTH_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          HARUTO_GROWTH_STORE
        );

      const request =
        store.put(item);


      request.onsuccess =
        () => resolve();

      request.onerror =
        () => reject(
          request.error
        );

    }
  );
}


// ======================================================
// 📚 GET YEAR VISUALS
// ======================================================

async function getHarutoGrowthVisuals(
  year
) {

  if (!harutoGrowthDB) {
    await openHarutoGrowthDB();
  }


  return new Promise(
    (resolve, reject) => {

      const transaction =
        harutoGrowthDB.transaction(
          HARUTO_GROWTH_STORE,
          "readonly"
        );

      const store =
        transaction.objectStore(
          HARUTO_GROWTH_STORE
        );

      const request =
        store.getAll();


      request.onsuccess =
        () => {

          const items =
            request.result || [];

          resolve(
            items.filter(
              item =>
                String(item.year) ===
                String(year)
            )
          );

        };


      request.onerror =
        () => reject(
          request.error
        );

    }
  );
}


// ======================================================
// 🗑 DELETE
// ======================================================

async function deleteHarutoGrowthVisual(
  id
) {

  if (!harutoGrowthDB) {
    await openHarutoGrowthDB();
  }


  return new Promise(
    (resolve, reject) => {

      const transaction =
        harutoGrowthDB.transaction(
          HARUTO_GROWTH_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          HARUTO_GROWTH_STORE
        );

      const request =
        store.delete(id);


      request.onsuccess =
        () => resolve();

      request.onerror =
        () => reject(
          request.error
        );

    }
  );
}
// ======================================================
// 🌱 HARUTO GROWTH YEAR INFO
// ======================================================

const harutoGrowthYearInfo = {

  "2020": {
    title: "DEBUT ERA 💎"
  },

  "2021": {
    title: "2021 ERA 💎"
  },

  "2022": {
    title: "2022 ERA 💎"
  },

  "2023": {
    title: "2023 ERA 💎"
  },

  "2024": {
    title: "2024 ERA 💎"
  },

  "2025": {
    title: "2025 ERA 💎"
  },

  "2026": {
    title: "NOW ✨"
  }

};


// ======================================================
// 📸 RENDER YEAR VISUALS
// ======================================================

async function renderHarutoGrowthYearVisuals() {

  if (!harutoGrowthYearVisualGrid) {
    return;
  }


  harutoGrowthYearVisualGrid.innerHTML =
    "";


  const items =
    await getHarutoGrowthVisuals(
      currentHarutoGrowthYear
    );


  items
    .sort(
      (a, b) =>
        a.createdAt -
        b.createdAt
    )
    .forEach(item => {

      const card =
        document.createElement(
          "button"
        );

      card.type =
        "button";

 card.className =
  "jihoon-growth-visual-card haruto-growth-visual-card";
const photo =
  document.createElement("div");

photo.className =
  "jihoon-growth-visual-photo haruto-growth-visual-photo";
      const img =
        document.createElement(
          "img"
        );

      img.src =
        item.imageData || "";

      img.alt =
        `HARUTO ${item.year}`;

      img.loading =
        "lazy";

      img.decoding =
        "async";


      const info =
        document.createElement(
          "div"
        );

      info.className =
        "jihoon-growth-visual-info";


      const hair =
        document.createElement(
          "span"
        );

      hair.textContent =
        `🎨 ${item.hairColor || "OTHER"}`;


      const memo =
        document.createElement(
          "p"
        );

      memo.textContent =
        item.memo || "";


      info.appendChild(
        hair
      );


      if (item.memo) {

        info.appendChild(
          memo
        );

      }


      photo.appendChild(
  img
);

card.appendChild(
  photo
);

      card.appendChild(
        info
      );


      // 写真タップ → EDIT
      card.addEventListener(
        "click",
        () => {

          currentHarutoGrowthVisualItem =
            item;

          pendingHarutoGrowthFile =
            null;


          if (
            harutoGrowthVisualPreviewImage
          ) {

            harutoGrowthVisualPreviewImage.src =
              item.imageData || "";

          }


          if (
            harutoGrowthVisualPreview
          ) {

            harutoGrowthVisualPreview.style.display =
              "block";

          }


          if (
            harutoGrowthVisualHair
          ) {

            harutoGrowthVisualHair.value =
              item.hairColor ||
              "OTHER";

          }


          if (
            harutoGrowthVisualMemo
          ) {

            harutoGrowthVisualMemo.value =
              item.memo || "";

          }


          if (
            harutoGrowthVisualDelete
          ) {

            harutoGrowthVisualDelete.style.display =
              "block";

          }


          if (
            harutoGrowthVisualModalKicker
          ) {

            harutoGrowthVisualModalKicker.textContent =
              `📸 ${item.year} VISUAL`;

          }


          if (
            harutoGrowthVisualModal
          ) {

            harutoGrowthVisualModal.style.display =
              "flex";

          }

        }
      );


      harutoGrowthYearVisualGrid.appendChild(
        card
      );

    });

}


// ======================================================
// 🌱 OPEN YEAR DETAIL
// ======================================================

async function openHarutoGrowthYear(
  year
) {

  currentHarutoGrowthYear =
    String(year);


  const info =
    harutoGrowthYearInfo[
      currentHarutoGrowthYear
    ] || {
      title:
        `${currentHarutoGrowthYear} ERA 💎`
    };


  if (
    harutoGrowthYearNumber
  ) {

    harutoGrowthYearNumber.textContent =
      currentHarutoGrowthYear;

  }


  if (
    harutoGrowthYearTitle
  ) {

    harutoGrowthYearTitle.textContent =
      info.title;

  }


  if (
    harutoGrowthYearSubtitle
  ) {

    harutoGrowthYearSubtitle.textContent =
      `${currentHarutoGrowthYear}年のハルトを振り返ろう 💎`;

  }


  if (
    harutoGrowthYearVisualTitle
  ) {

    harutoGrowthYearVisualTitle.textContent =
      `📸 ${currentHarutoGrowthYear} VISUAL`;

  }


  if (
    harutoGrowthYearCaption
  ) {

    harutoGrowthYearCaption.textContent =
      `${currentHarutoGrowthYear}年のお気に入りハルトを残そう 💎`;

  }


  if (
    harutoGrowthHistoryPage
  ) {

    harutoGrowthHistoryPage.style.display =
      "none";

  }


  if (
    harutoGrowthYearPage
  ) {

    harutoGrowthYearPage.style.display =
      "block";

    harutoGrowthYearPage.scrollTop =
      0;

  }


  await renderHarutoGrowthYearVisuals();

}


// ======================================================
// 🌱 YEAR BUTTONS
// ======================================================

harutoGrowthYearButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      async () => {

        await openHarutoGrowthYear(
          button.dataset.year
        );

      }
    );

  }
);
// ======================================================
// 🌱 OPEN GROWTH HISTORY
// ======================================================

if (
  harutoGrowthHistoryOpen &&
  harutoGrowthHistoryPage
) {

  harutoGrowthHistoryOpen.addEventListener(
    "click",
    () => {

      if (harutoBookDetail) {
        harutoBookDetail.classList.remove(
          "active"
        );
      }

      harutoGrowthHistoryPage.style.display =
        "block";

      harutoGrowthHistoryPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// ======================================================
// ← GROWTH HISTORY → HARUTO BOOK
// ======================================================

if (
  harutoGrowthHistoryBack &&
  harutoGrowthHistoryPage
) {

  harutoGrowthHistoryBack.addEventListener(
    "click",
    () => {

      harutoGrowthHistoryPage.style.display =
        "none";

      if (harutoBookDetail) {

        harutoBookDetail.classList.add(
          "active"
        );

        harutoBookDetail.scrollTop =
          0;

      }

      document.body.style.overflow =
        "hidden";

    }
  );
}


// ======================================================
// ← YEAR DETAIL → GROWTH HISTORY
// ======================================================

if (
  harutoGrowthYearBack &&
  harutoGrowthYearPage
) {

  harutoGrowthYearBack.addEventListener(
    "click",
    () => {

      harutoGrowthYearPage.style.display =
        "none";

      harutoGrowthHistoryPage.style.display =
        "block";

      harutoGrowthHistoryPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// ======================================================
// ＋ ADD → MODAL
// ======================================================

if (harutoGrowthYearVisualAdd) {

  harutoGrowthYearVisualAdd.addEventListener(
    "click",
    () => {

      currentHarutoGrowthVisualItem =
        null;

      pendingHarutoGrowthFile =
        null;


      if (harutoGrowthVisualInput) {
        harutoGrowthVisualInput.value =
          "";
      }


      if (harutoGrowthVisualMemo) {
        harutoGrowthVisualMemo.value =
          "";
      }


      if (harutoGrowthVisualHair) {
        harutoGrowthVisualHair.value =
          "BLACK";
      }


      if (harutoGrowthVisualPreviewImage) {
        harutoGrowthVisualPreviewImage.src =
          "";
      }


      if (harutoGrowthVisualPreview) {
        harutoGrowthVisualPreview.style.display =
          "none";
      }


      if (harutoGrowthVisualDelete) {
        harutoGrowthVisualDelete.style.display =
          "none";
      }


      if (harutoGrowthVisualModalKicker) {

        harutoGrowthVisualModalKicker.textContent =
          `📸 ${currentHarutoGrowthYear} VISUAL`;

      }


      if (harutoGrowthVisualModal) {

        harutoGrowthVisualModal.style.display =
          "flex";

        harutoGrowthVisualModal.scrollTop =
          0;

      }

    }
  );
}


// ======================================================
// 📷 SELECT PHOTO
// ======================================================

if (
  harutoGrowthVisualSelect &&
  harutoGrowthVisualInput
) {

  harutoGrowthVisualSelect.addEventListener(
    "click",
    () => {

      harutoGrowthVisualInput.click();

    }
  );
}


if (harutoGrowthVisualInput) {

  harutoGrowthVisualInput.addEventListener(
    "change",
    () => {

      const file =
        harutoGrowthVisualInput.files[0];

      if (!file) return;


      pendingHarutoGrowthFile =
        file;


      const reader =
        new FileReader();


      reader.onload =
        () => {

          if (
            harutoGrowthVisualPreviewImage
          ) {

            harutoGrowthVisualPreviewImage.src =
              reader.result;

          }


          if (
            harutoGrowthVisualPreview
          ) {

            harutoGrowthVisualPreview.style.display =
              "block";

          }

        };


      reader.readAsDataURL(
        file
      );

    }
  );
}


// ======================================================
// 💎 SAVE / UPDATE
// ======================================================

if (harutoGrowthVisualSave) {

  harutoGrowthVisualSave.addEventListener(
    "click",
    async () => {

      try {

        const hairColor =
          harutoGrowthVisualHair
            ? harutoGrowthVisualHair.value
            : "OTHER";


        const memo =
          harutoGrowthVisualMemo
            ? harutoGrowthVisualMemo.value.trim()
            : "";


        // ✏️ UPDATE
        if (
          currentHarutoGrowthVisualItem
        ) {

          currentHarutoGrowthVisualItem.hairColor =
            hairColor;

          currentHarutoGrowthVisualItem.memo =
            memo;


          if (
            pendingHarutoGrowthFile
          ) {

            currentHarutoGrowthVisualItem.imageData =
              await harutoGrowthImageToDataURL(
                pendingHarutoGrowthFile
              );

          }


          await updateHarutoGrowthVisual(
            currentHarutoGrowthVisualItem
          );

        }

        // 📸 NEW
        else {

          if (!pendingHarutoGrowthFile) {

            alert(
              "写真を選んでね📸"
            );

            return;

          }


          await saveHarutoGrowthVisual(
            pendingHarutoGrowthFile,
            currentHarutoGrowthYear,
            hairColor,
            memo
          );

        }


        closeHarutoGrowthModal();

        await renderHarutoGrowthYearVisuals();


      } catch (error) {

        console.error(
          "HARUTO GROWTH SAVE ERROR:",
          error
        );

        alert(
          "保存に失敗しました🥲"
        );

      }

    }
  );
}


// ======================================================
// 🗑 DELETE
// ======================================================

if (harutoGrowthVisualDelete) {

  harutoGrowthVisualDelete.addEventListener(
    "click",
    async () => {

      if (
        !currentHarutoGrowthVisualItem
      ) {
        return;
      }


      const ok =
        confirm(
          "この写真を削除しますか？🥲"
        );

      if (!ok) return;


      try {

        await deleteHarutoGrowthVisual(
          currentHarutoGrowthVisualItem.id
        );

        closeHarutoGrowthModal();

        await renderHarutoGrowthYearVisuals();


      } catch (error) {

        console.error(
          "HARUTO GROWTH DELETE ERROR:",
          error
        );

        alert(
          "削除に失敗しました🥲"
        );

      }

    }
  );
}


// ======================================================
// CANCEL / CLOSE
// ======================================================

function closeHarutoGrowthModal() {

  pendingHarutoGrowthFile =
    null;

  currentHarutoGrowthVisualItem =
    null;


  if (harutoGrowthVisualInput) {
    harutoGrowthVisualInput.value =
      "";
  }


  if (harutoGrowthVisualPreviewImage) {
    harutoGrowthVisualPreviewImage.src =
      "";
  }


  if (harutoGrowthVisualPreview) {
    harutoGrowthVisualPreview.style.display =
      "none";
  }


  if (harutoGrowthVisualMemo) {
    harutoGrowthVisualMemo.value =
      "";
  }


  if (harutoGrowthVisualDelete) {
    harutoGrowthVisualDelete.style.display =
      "none";
  }


  if (harutoGrowthVisualModal) {
    harutoGrowthVisualModal.style.display =
      "none";
  }

}


if (harutoGrowthVisualCancel) {

  harutoGrowthVisualCancel.addEventListener(
    "click",
    () => {

      closeHarutoGrowthModal();

    }
  );
}


// ======================================================
// 🚀 INITIALIZE HARUTO GROWTH DB
// ======================================================

openHarutoGrowthDB()
  .catch(
    error => {

      console.error(
        "HARUTO GROWTH DB ERROR:",
        error
      );

    }
  );

// ======================================================
// 🦋 HARUTO SONG / MEMORIES
// ======================================================
const harutoSongSystem =
  setupMemberSong({
    key: "haruto",
    displayName: "HARUTO",
    japaneseName: "ハルト"
  });

const harutoMemoriesSystem =
  setupMemberMemories({
    key: "haruto",
    displayName: "HARUTO",
    japaneseName: "ハルト"
  });

// =====================================================
// 🦋 HARUTO CHEMISTRY
// SHARED CHEMISTRY ENGINE CONNECT
// =====================================================

const harutoChemistryOpen =
  document.getElementById(
    "harutoChemistryOpen"
  );

const harutoChemistryPage =
  document.getElementById(
    "harutoChemistryPage"
  );

const harutoChemistryBack =
  document.getElementById(
    "harutoChemistryBack"
  );

const harutoChemistryList =
  document.getElementById(
    "harutoChemistryList"
  );

const harutoChemistryDetailPage =
  document.getElementById(
    "harutoChemistryDetailPage"
  );

const harutoChemistryDetailBack =
  document.getElementById(
    "harutoChemistryDetailBack"
  );

const harutoChemistryDetailName =
  document.getElementById(
    "harutoChemistryDetailName"
  );

const harutoChemistryDetailCaption =
  document.getElementById(
    "harutoChemistryDetailCaption"
  );

const harutoChemistryAdd =
  document.getElementById(
    "harutoChemistryAdd"
  );

const harutoChemistryMemories =
  document.getElementById(
    "harutoChemistryMemories"
  );


let currentHarutoChemistryPartner =
  null;


// =====================================================
// 🦋 PARTNERS
// =====================================================

const harutoChemistryPartners = [
  "HYUNSUK",
  "JIHOON",
  "YOSHI",
  "JUNKYU",
  "JAEHYUK",
  "DOYOUNG",
  "ASAHI",
  "JEONGWOO",
  "JUNGHWAN"
];


// =====================================================
// 🫶 MAKE 9 CHEMISTRY CARDS
// =====================================================

function renderHarutoChemistryCards() {

  if (!harutoChemistryList) {
    return;
  }


  harutoChemistryList.innerHTML =
    "";


  harutoChemistryPartners.forEach(
    partner => {

      const partnerInfo =
        chemistryMemberInfo[
          partner
        ];


      const card =
        document.createElement(
          "button"
        );

      card.type =
        "button";

      card.className =
        "jihoon-chemistry-card haruto-chemistry-card";

      card.dataset.partner =
        partner;


      card.innerHTML = `
        <span class="jihoon-chemistry-emoji">
          🦋${partnerInfo?.emoji || "💎"}
        </span>

        <div>
          <strong>
            HARUTO × ${partner}
          </strong>

          <small>
            CHEMISTRY MEMORY 💎
          </small>
        </div>

        <span>→</span>
      `;


      card.addEventListener(
        "click",
        async () => {

          currentHarutoChemistryPartner =
            partner;


          // 💎 SHARED ENGINEへ接続
          currentHyunsukChemistryPartner =
            partner;

          currentHyunsukChemistryPairKey =
            createChemistryPairKey(
              "HARUTO",
              partner
            );

          currentSharedChemistryRenderTarget =
            harutoChemistryMemories;


          if (
            harutoChemistryDetailName
          ) {

            harutoChemistryDetailName.textContent =
              `🦋${partnerInfo?.emoji || "💎"} HARUTO × ${partner}`;

          }


          if (
            harutoChemistryDetailCaption
          ) {

            harutoChemistryDetailCaption.textContent =
              `ハルトと${partner}の好きな瞬間を集めよう 💎`;

          }


          harutoChemistryPage.style.display =
            "none";

          harutoChemistryDetailPage.style.display =
            "block";

          harutoChemistryDetailPage.scrollTop =
            0;


          await renderSharedChemistryMemories();


          document.body.style.overflow =
            "hidden";

        }
      );


      harutoChemistryList.appendChild(
        card
      );

    }
  );
}


// =====================================================
// 🦋 HARUTO BOOK → CHEMISTRY
// =====================================================

if (
  harutoChemistryOpen &&
  harutoChemistryPage
) {

  harutoChemistryOpen.addEventListener(
    "click",
    () => {

      if (harutoBookDetail) {

        harutoBookDetail.classList.remove(
          "active"
        );

      }


      renderHarutoChemistryCards();
      harutoChemistryPage.style.display =
        "block";

      harutoChemistryPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// =====================================================
// ← CHEMISTRY → HARUTO BOOK
// =====================================================

if (
  harutoChemistryBack &&
  harutoChemistryPage
) {

  harutoChemistryBack.addEventListener(
    "click",
    () => {

      harutoChemistryPage.style.display =
        "none";

      if (harutoBookDetail) {

        harutoBookDetail.classList.add(
          "active"
        );

        harutoBookDetail.scrollTop =
          0;

      }

      document.body.style.overflow =
        "hidden";

    }
  );
}


// =====================================================
// ← DETAIL → CHEMISTRY LIST
// =====================================================

if (
  harutoChemistryDetailBack &&
  harutoChemistryDetailPage
) {

  harutoChemistryDetailBack.addEventListener(
    "click",
    () => {

      harutoChemistryDetailPage.style.display =
        "none";

      harutoChemistryPage.style.display =
        "block";

      harutoChemistryPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// =====================================================
// ＋ ADD MEMORY → SHARED MODAL
// =====================================================

if (harutoChemistryAdd) {

  harutoChemistryAdd.addEventListener(
    "click",
    () => {

      if (
        !currentHarutoChemistryPartner
      ) {
        return;
      }

      currentHyunsukChemistryPartner =
        currentHarutoChemistryPartner;

      currentHyunsukChemistryPairKey =
        createChemistryPairKey(
          "HARUTO",
          currentHarutoChemistryPartner
        );

      currentSharedChemistryRenderTarget =
        harutoChemistryMemories;

      currentSharedChemistryImageData =
        null;

      delete hyunsukChemistryMemorySave
        .dataset.editId;

      hyunsukChemistryMemoryInput.value =
        "";

      hyunsukChemistryMemoryMemo.value =
        "";

      hyunsukChemistryMemoryPreviewImage.src =
        "";

      hyunsukChemistryMemoryPreview.style.display =
        "none";

      hyunsukChemistryMemoryDelete.style.display =
        "none";

      hyunsukChemistryMemorySave.textContent =
        "💎 SAVE MEMORY";

      hyunsukChemistryMemoryTitle.textContent =
        `HARUTO × ${currentHarutoChemistryPartner} MEMORY`;

      hyunsukChemistryMemoryModal.style.display =
        "flex";

      hyunsukChemistryMemoryModal.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// 最初のカード生成
renderHarutoChemistryCards();

// ========================================
// 🐺 JEONGWOO BOOK OPEN / CLOSE
// ========================================

const jeongwooBookOpen =
  document.getElementById("jeongwoo-book-open");

const jeongwooBookDetail =
  document.getElementById("jeongwoo-book-detail");

const jeongwooBookClose =
  document.getElementById("jeongwoo-book-close");


// JEONGWOO BOOKを開く
if (
  jeongwooBookOpen &&
  jeongwooBookDetail
) {

  jeongwooBookOpen.addEventListener(
    "click",
    () => {

      jeongwooBookDetail.classList.add(
        "active"
      );

      jeongwooBookDetail.scrollTop = 0;

      document.body.style.overflow =
        "hidden";
    }
  );
}


// JEONGWOO BOOKを閉じる
if (
  jeongwooBookClose &&
  jeongwooBookDetail
) {

  jeongwooBookClose.addEventListener(
    "click",
    () => {

      jeongwooBookDetail.classList.remove(
        "active"
      );

      // MEMBER BOOKは後ろで開いたまま
      document.body.style.overflow =
        "hidden";
    }
  );
}

// ======================================================
// 🐺 JEONGWOO VISUAL BOOK / RANKING
// ======================================================
const jeongwooVisualSystem =
  setupMemberVisualBook({
    key: "jeongwoo",
    displayName: "JEONGWOO",
    japaneseName: "ジョンウ"
  });

const jeongwooVisualRankingSystem =
  setupMemberVisualRanking({
    key: "jeongwoo",
    displayName: "JEONGWOO",
    visualSystem: jeongwooVisualSystem
  });

// ======================================================
// 🐺 JEONGWOO GROWTH HISTORY START
// 完成型：YEAR DETAIL + EDIT MODAL
// ======================================================

const jeongwooGrowthHistoryOpen =
  document.getElementById("jeongwooGrowthHistoryOpen");

const jeongwooGrowthHistoryPage =
  document.getElementById("jeongwooGrowthHistoryPage");

const jeongwooGrowthHistoryBack =
  document.getElementById("jeongwooGrowthHistoryBack");

const jeongwooGrowthYearPage =
  document.getElementById("jeongwooGrowthYearPage");

const jeongwooGrowthYearBack =
  document.getElementById("jeongwooGrowthYearBack");

const jeongwooGrowthYearButtons =
  document.querySelectorAll(".jeongwoo-growth-year");

const jeongwooGrowthYearNumber =
  document.getElementById("jeongwooGrowthYearNumber");

const jeongwooGrowthYearTitle =
  document.getElementById("jeongwooGrowthYearTitle");

const jeongwooGrowthYearSubtitle =
  document.getElementById("jeongwooGrowthYearSubtitle");

const jeongwooGrowthYearVisualTitle =
  document.getElementById("jeongwooGrowthYearVisualTitle");

const jeongwooGrowthYearCaption =
  document.getElementById("jeongwooGrowthYearCaption");

const jeongwooGrowthYearVisualGrid =
  document.getElementById("jeongwooGrowthYearVisualGrid");

const jeongwooGrowthYearVisualAdd =
  document.getElementById("jeongwooGrowthYearVisualAdd");

const jeongwooGrowthVisualModal =
  document.getElementById("jeongwooGrowthVisualModal");

const jeongwooGrowthVisualModalKicker =
  document.getElementById("jeongwooGrowthVisualModalKicker");

const jeongwooGrowthVisualInput =
  document.getElementById("jeongwooGrowthVisualInput");

const jeongwooGrowthVisualSelect =
  document.getElementById("jeongwooGrowthVisualSelect");

const jeongwooGrowthVisualPreview =
  document.getElementById("jeongwooGrowthVisualPreview");

const jeongwooGrowthVisualPreviewImage =
  document.getElementById("jeongwooGrowthVisualPreviewImage");

const jeongwooGrowthVisualHair =
  document.getElementById("jeongwooGrowthVisualHair");

const jeongwooGrowthVisualMemo =
  document.getElementById("jeongwooGrowthVisualMemo");

const jeongwooGrowthVisualSave =
  document.getElementById("jeongwooGrowthVisualSave");

const jeongwooGrowthVisualDelete =
  document.getElementById("jeongwooGrowthVisualDelete");

const jeongwooGrowthVisualCancel =
  document.getElementById("jeongwooGrowthVisualCancel");

let currentJeongwooGrowthYear = "2020";

let pendingJeongwooGrowthFile = null;

let currentJeongwooGrowthVisualItem = null;

let jeongwooGrowthDB = null;

const JEONGWOO_GROWTH_DB =
  "treasure-day-jeongwoo-growth-db";

const JEONGWOO_GROWTH_STORE =
  "jeongwooGrowthVisuals";
// ======================================================
// 💾 JEONGWOO GROWTH IndexedDB
// ======================================================

function openJeongwooGrowthDB() {

  return new Promise((resolve, reject) => {

    const request =
      indexedDB.open(
        JEONGWOO_GROWTH_DB,
        1
      );

    request.onupgradeneeded =
      event => {

        const db =
          event.target.result;

        if (
          !db.objectStoreNames.contains(
            JEONGWOO_GROWTH_STORE
          )
        ) {

          db.createObjectStore(
            JEONGWOO_GROWTH_STORE,
            {
              keyPath: "id"
            }
          );

        }

      };


    request.onsuccess =
      () => {

        jeongwooGrowthDB =
          request.result;

        resolve(
          jeongwooGrowthDB
        );

      };


    request.onerror =
      () => {

        reject(
          request.error
        );

      };

  });
}


// ======================================================
// 📸 IMAGE → DataURL
// ======================================================

function jeongwooGrowthImageToDataURL(
  file
) {

  return new Promise(
    (resolve, reject) => {

      const reader =
        new FileReader();

      reader.onload = () => {

        const img =
          new Image();

        img.onload = () => {

          const MAX_SIZE = 1600;

          let width =
            img.naturalWidth;

          let height =
            img.naturalHeight;


          if (
            width > height &&
            width > MAX_SIZE
          ) {

            height =
              Math.round(
                height *
                MAX_SIZE /
                width
              );

            width =
              MAX_SIZE;

          } else if (
            height >= width &&
            height > MAX_SIZE
          ) {

            width =
              Math.round(
                width *
                MAX_SIZE /
                height
              );

            height =
              MAX_SIZE;

          }


          const canvas =
            document.createElement(
              "canvas"
            );

          canvas.width =
            width;

          canvas.height =
            height;


          const ctx =
            canvas.getContext(
              "2d"
            );

          if (!ctx) {

            reject(
              new Error(
                "Canvas unavailable"
              )
            );

            return;

          }


          ctx.drawImage(
            img,
            0,
            0,
            width,
            height
          );


          resolve(
            canvas.toDataURL(
              "image/jpeg",
              0.86
            )
          );

        };


        img.onerror =
          reject;

        img.src =
          reader.result;

      };


      reader.onerror =
        reject;

      reader.readAsDataURL(
        file
      );

    }
  );
}


// ======================================================
// 💾 SAVE NEW
// ======================================================

async function saveJeongwooGrowthVisual(
  file,
  year,
  hairColor,
  memo
) {

  if (!jeongwooGrowthDB) {
    await openJeongwooGrowthDB();
  }


  const imageData =
    await jeongwooGrowthImageToDataURL(
      file
    );


  const item = {

    id:
      Date.now() +
      Math.floor(
        Math.random() * 1000
      ),

    year:
      String(year),

    imageData,

    hairColor:
      hairColor || "OTHER",

    memo:
      memo || "",

    createdAt:
      Date.now()

  };


  return new Promise(
    (resolve, reject) => {

      const transaction =
        jeongwooGrowthDB.transaction(
          JEONGWOO_GROWTH_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          JEONGWOO_GROWTH_STORE
        );

      const request =
        store.add(item);


      request.onsuccess =
        () => resolve(item);

      request.onerror =
        () => reject(
          request.error
        );

    }
  );
}


// ======================================================
// ✏️ UPDATE
// ======================================================

function updateJeongwooGrowthVisual(
  item
) {

  return new Promise(
    (resolve, reject) => {

      const transaction =
        jeongwooGrowthDB.transaction(
          JEONGWOO_GROWTH_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          JEONGWOO_GROWTH_STORE
        );

      const request =
        store.put(item);


      request.onsuccess =
        () => resolve();

      request.onerror =
        () => reject(
          request.error
        );

    }
  );
}


// ======================================================
// 📚 GET YEAR VISUALS
// ======================================================

async function getJeongwooGrowthVisuals(
  year
) {

  if (!jeongwooGrowthDB) {
    await openJeongwooGrowthDB();
  }


  return new Promise(
    (resolve, reject) => {

      const transaction =
        jeongwooGrowthDB.transaction(
          JEONGWOO_GROWTH_STORE,
          "readonly"
        );

      const store =
        transaction.objectStore(
          JEONGWOO_GROWTH_STORE
        );

      const request =
        store.getAll();


      request.onsuccess =
        () => {

          const items =
            request.result || [];

          resolve(
            items.filter(
              item =>
                String(item.year) ===
                String(year)
            )
          );

        };


      request.onerror =
        () => reject(
          request.error
        );

    }
  );
}


// ======================================================
// 🗑 DELETE
// ======================================================

async function deleteJeongwooGrowthVisual(
  id
) {

  if (!jeongwooGrowthDB) {
    await openJeongwooGrowthDB();
  }


  return new Promise(
    (resolve, reject) => {

      const transaction =
        jeongwooGrowthDB.transaction(
          JEONGWOO_GROWTH_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          JEONGWOO_GROWTH_STORE
        );

      const request =
        store.delete(id);


      request.onsuccess =
        () => resolve();

      request.onerror =
        () => reject(
          request.error
        );

    }
  );
}
// ======================================================
// 🌱 JEONGWOO GROWTH YEAR INFO
// ======================================================

const jeongwooGrowthYearInfo = {

  "2020": {
    title: "DEBUT ERA 💎"
  },

  "2021": {
    title: "2021 ERA 💎"
  },

  "2022": {
    title: "2022 ERA 💎"
  },

  "2023": {
    title: "2023 ERA 💎"
  },

  "2024": {
    title: "2024 ERA 💎"
  },

  "2025": {
    title: "2025 ERA 💎"
  },

  "2026": {
    title: "NOW ✨"
  }

};


// ======================================================
// 📸 RENDER YEAR VISUALS
// ======================================================

async function renderJeongwooGrowthYearVisuals() {

  if (!jeongwooGrowthYearVisualGrid) {
    return;
  }


  jeongwooGrowthYearVisualGrid.innerHTML =
    "";


  const items =
    await getJeongwooGrowthVisuals(
      currentJeongwooGrowthYear
    );


  items
    .sort(
      (a, b) =>
        a.createdAt -
        b.createdAt
    )
    .forEach(item => {

      const card =
        document.createElement(
          "button"
        );

      card.type =
        "button";

 card.className =
  "jihoon-growth-visual-card jeongwoo-growth-visual-card";
const photo =
  document.createElement("div");

photo.className =
  "jihoon-growth-visual-photo jeongwoo-growth-visual-photo";
      const img =
        document.createElement(
          "img"
        );

      img.src =
        item.imageData || "";

      img.alt =
        `JEONGWOO ${item.year}`;

      img.loading =
        "lazy";

      img.decoding =
        "async";


      const info =
        document.createElement(
          "div"
        );

      info.className =
        "jihoon-growth-visual-info";


      const hair =
        document.createElement(
          "span"
        );

      hair.textContent =
        `🎨 ${item.hairColor || "OTHER"}`;


      const memo =
        document.createElement(
          "p"
        );

      memo.textContent =
        item.memo || "";


      info.appendChild(
        hair
      );


      if (item.memo) {

        info.appendChild(
          memo
        );

      }


      photo.appendChild(
  img
);

card.appendChild(
  photo
);

      card.appendChild(
        info
      );


      // 写真タップ → EDIT
      card.addEventListener(
        "click",
        () => {

          currentJeongwooGrowthVisualItem =
            item;

          pendingJeongwooGrowthFile =
            null;


          if (
            jeongwooGrowthVisualPreviewImage
          ) {

            jeongwooGrowthVisualPreviewImage.src =
              item.imageData || "";

          }


          if (
            jeongwooGrowthVisualPreview
          ) {

            jeongwooGrowthVisualPreview.style.display =
              "block";

          }


          if (
            jeongwooGrowthVisualHair
          ) {

            jeongwooGrowthVisualHair.value =
              item.hairColor ||
              "OTHER";

          }


          if (
            jeongwooGrowthVisualMemo
          ) {

            jeongwooGrowthVisualMemo.value =
              item.memo || "";

          }


          if (
            jeongwooGrowthVisualDelete
          ) {

            jeongwooGrowthVisualDelete.style.display =
              "block";

          }


          if (
            jeongwooGrowthVisualModalKicker
          ) {

            jeongwooGrowthVisualModalKicker.textContent =
              `📸 ${item.year} VISUAL`;

          }


          if (
            jeongwooGrowthVisualModal
          ) {

            jeongwooGrowthVisualModal.style.display =
              "flex";

          }

        }
      );


      jeongwooGrowthYearVisualGrid.appendChild(
        card
      );

    });

}


// ======================================================
// 🌱 OPEN YEAR DETAIL
// ======================================================

async function openJeongwooGrowthYear(
  year
) {

  currentJeongwooGrowthYear =
    String(year);


  const info =
    jeongwooGrowthYearInfo[
      currentJeongwooGrowthYear
    ] || {
      title:
        `${currentJeongwooGrowthYear} ERA 💎`
    };


  if (
    jeongwooGrowthYearNumber
  ) {

    jeongwooGrowthYearNumber.textContent =
      currentJeongwooGrowthYear;

  }


  if (
    jeongwooGrowthYearTitle
  ) {

    jeongwooGrowthYearTitle.textContent =
      info.title;

  }


  if (
    jeongwooGrowthYearSubtitle
  ) {

    jeongwooGrowthYearSubtitle.textContent =
      `${currentJeongwooGrowthYear}年のジョンウを振り返ろう 💎`;

  }


  if (
    jeongwooGrowthYearVisualTitle
  ) {

    jeongwooGrowthYearVisualTitle.textContent =
      `📸 ${currentJeongwooGrowthYear} VISUAL`;

  }


  if (
    jeongwooGrowthYearCaption
  ) {

    jeongwooGrowthYearCaption.textContent =
      `${currentJeongwooGrowthYear}年のお気に入りジョンウを残そう 💎`;

  }


  if (
    jeongwooGrowthHistoryPage
  ) {

    jeongwooGrowthHistoryPage.style.display =
      "none";

  }


  if (
    jeongwooGrowthYearPage
  ) {

    jeongwooGrowthYearPage.style.display =
      "block";

    jeongwooGrowthYearPage.scrollTop =
      0;

  }


  await renderJeongwooGrowthYearVisuals();

}


// ======================================================
// 🌱 YEAR BUTTONS
// ======================================================

jeongwooGrowthYearButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      async () => {

        await openJeongwooGrowthYear(
          button.dataset.year
        );

      }
    );

  }
);
// ======================================================
// 🌱 OPEN GROWTH HISTORY
// ======================================================

if (
  jeongwooGrowthHistoryOpen &&
  jeongwooGrowthHistoryPage
) {

  jeongwooGrowthHistoryOpen.addEventListener(
    "click",
    () => {

      if (jeongwooBookDetail) {
        jeongwooBookDetail.classList.remove(
          "active"
        );
      }

      jeongwooGrowthHistoryPage.style.display =
        "block";

      jeongwooGrowthHistoryPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// ======================================================
// ← GROWTH HISTORY → JEONGWOO BOOK
// ======================================================

if (
  jeongwooGrowthHistoryBack &&
  jeongwooGrowthHistoryPage
) {

  jeongwooGrowthHistoryBack.addEventListener(
    "click",
    () => {

      jeongwooGrowthHistoryPage.style.display =
        "none";

      if (jeongwooBookDetail) {

        jeongwooBookDetail.classList.add(
          "active"
        );

        jeongwooBookDetail.scrollTop =
          0;

      }

      document.body.style.overflow =
        "hidden";

    }
  );
}


// ======================================================
// ← YEAR DETAIL → GROWTH HISTORY
// ======================================================

if (
  jeongwooGrowthYearBack &&
  jeongwooGrowthYearPage
) {

  jeongwooGrowthYearBack.addEventListener(
    "click",
    () => {

      jeongwooGrowthYearPage.style.display =
        "none";

      jeongwooGrowthHistoryPage.style.display =
        "block";

      jeongwooGrowthHistoryPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// ======================================================
// ＋ ADD → MODAL
// ======================================================

if (jeongwooGrowthYearVisualAdd) {

  jeongwooGrowthYearVisualAdd.addEventListener(
    "click",
    () => {

      currentJeongwooGrowthVisualItem =
        null;

      pendingJeongwooGrowthFile =
        null;


      if (jeongwooGrowthVisualInput) {
        jeongwooGrowthVisualInput.value =
          "";
      }


      if (jeongwooGrowthVisualMemo) {
        jeongwooGrowthVisualMemo.value =
          "";
      }


      if (jeongwooGrowthVisualHair) {
        jeongwooGrowthVisualHair.value =
          "BLACK";
      }


      if (jeongwooGrowthVisualPreviewImage) {
        jeongwooGrowthVisualPreviewImage.src =
          "";
      }


      if (jeongwooGrowthVisualPreview) {
        jeongwooGrowthVisualPreview.style.display =
          "none";
      }


      if (jeongwooGrowthVisualDelete) {
        jeongwooGrowthVisualDelete.style.display =
          "none";
      }


      if (jeongwooGrowthVisualModalKicker) {

        jeongwooGrowthVisualModalKicker.textContent =
          `📸 ${currentJeongwooGrowthYear} VISUAL`;

      }


      if (jeongwooGrowthVisualModal) {

        jeongwooGrowthVisualModal.style.display =
          "flex";

        jeongwooGrowthVisualModal.scrollTop =
          0;

      }

    }
  );
}


// ======================================================
// 📷 SELECT PHOTO
// ======================================================

if (
  jeongwooGrowthVisualSelect &&
  jeongwooGrowthVisualInput
) {

  jeongwooGrowthVisualSelect.addEventListener(
    "click",
    () => {

      jeongwooGrowthVisualInput.click();

    }
  );
}


if (jeongwooGrowthVisualInput) {

  jeongwooGrowthVisualInput.addEventListener(
    "change",
    () => {

      const file =
        jeongwooGrowthVisualInput.files[0];

      if (!file) return;


      pendingJeongwooGrowthFile =
        file;


      const reader =
        new FileReader();


      reader.onload =
        () => {

          if (
            jeongwooGrowthVisualPreviewImage
          ) {

            jeongwooGrowthVisualPreviewImage.src =
              reader.result;

          }


          if (
            jeongwooGrowthVisualPreview
          ) {

            jeongwooGrowthVisualPreview.style.display =
              "block";

          }

        };


      reader.readAsDataURL(
        file
      );

    }
  );
}


// ======================================================
// 💎 SAVE / UPDATE
// ======================================================

if (jeongwooGrowthVisualSave) {

  jeongwooGrowthVisualSave.addEventListener(
    "click",
    async () => {

      try {

        const hairColor =
          jeongwooGrowthVisualHair
            ? jeongwooGrowthVisualHair.value
            : "OTHER";


        const memo =
          jeongwooGrowthVisualMemo
            ? jeongwooGrowthVisualMemo.value.trim()
            : "";


        // ✏️ UPDATE
        if (
          currentJeongwooGrowthVisualItem
        ) {

          currentJeongwooGrowthVisualItem.hairColor =
            hairColor;

          currentJeongwooGrowthVisualItem.memo =
            memo;


          if (
            pendingJeongwooGrowthFile
          ) {

            currentJeongwooGrowthVisualItem.imageData =
              await jeongwooGrowthImageToDataURL(
                pendingJeongwooGrowthFile
              );

          }


          await updateJeongwooGrowthVisual(
            currentJeongwooGrowthVisualItem
          );

        }

        // 📸 NEW
        else {

          if (!pendingJeongwooGrowthFile) {

            alert(
              "写真を選んでね📸"
            );

            return;

          }


          await saveJeongwooGrowthVisual(
            pendingJeongwooGrowthFile,
            currentJeongwooGrowthYear,
            hairColor,
            memo
          );

        }


        closeJeongwooGrowthModal();

        await renderJeongwooGrowthYearVisuals();


      } catch (error) {

        console.error(
          "JEONGWOO GROWTH SAVE ERROR:",
          error
        );

        alert(
          "保存に失敗しました🥲"
        );

      }

    }
  );
}


// ======================================================
// 🗑 DELETE
// ======================================================

if (jeongwooGrowthVisualDelete) {

  jeongwooGrowthVisualDelete.addEventListener(
    "click",
    async () => {

      if (
        !currentJeongwooGrowthVisualItem
      ) {
        return;
      }


      const ok =
        confirm(
          "この写真を削除しますか？🥲"
        );

      if (!ok) return;


      try {

        await deleteJeongwooGrowthVisual(
          currentJeongwooGrowthVisualItem.id
        );

        closeJeongwooGrowthModal();

        await renderJeongwooGrowthYearVisuals();


      } catch (error) {

        console.error(
          "JEONGWOO GROWTH DELETE ERROR:",
          error
        );

        alert(
          "削除に失敗しました🥲"
        );

      }

    }
  );
}


// ======================================================
// CANCEL / CLOSE
// ======================================================

function closeJeongwooGrowthModal() {

  pendingJeongwooGrowthFile =
    null;

  currentJeongwooGrowthVisualItem =
    null;


  if (jeongwooGrowthVisualInput) {
    jeongwooGrowthVisualInput.value =
      "";
  }


  if (jeongwooGrowthVisualPreviewImage) {
    jeongwooGrowthVisualPreviewImage.src =
      "";
  }


  if (jeongwooGrowthVisualPreview) {
    jeongwooGrowthVisualPreview.style.display =
      "none";
  }


  if (jeongwooGrowthVisualMemo) {
    jeongwooGrowthVisualMemo.value =
      "";
  }


  if (jeongwooGrowthVisualDelete) {
    jeongwooGrowthVisualDelete.style.display =
      "none";
  }


  if (jeongwooGrowthVisualModal) {
    jeongwooGrowthVisualModal.style.display =
      "none";
  }

}


if (jeongwooGrowthVisualCancel) {

  jeongwooGrowthVisualCancel.addEventListener(
    "click",
    () => {

      closeJeongwooGrowthModal();

    }
  );
}


// ======================================================
// 🚀 INITIALIZE JEONGWOO GROWTH DB
// ======================================================

openJeongwooGrowthDB()
  .catch(
    error => {

      console.error(
        "JEONGWOO GROWTH DB ERROR:",
        error
      );

    }
  );

// ======================================================
// 🐺 JEONGWOO SONG / MEMORIES
// ======================================================
const jeongwooSongSystem =
  setupMemberSong({
    key: "jeongwoo",
    displayName: "JEONGWOO",
    japaneseName: "ジョンウ"
  });

const jeongwooMemoriesSystem =
  setupMemberMemories({
    key: "jeongwoo",
    displayName: "JEONGWOO",
    japaneseName: "ジョンウ"
  });

// =====================================================
// 🐺 JEONGWOO CHEMISTRY
// SHARED CHEMISTRY ENGINE CONNECT
// =====================================================

const jeongwooChemistryOpen =
  document.getElementById(
    "jeongwooChemistryOpen"
  );

const jeongwooChemistryPage =
  document.getElementById(
    "jeongwooChemistryPage"
  );

const jeongwooChemistryBack =
  document.getElementById(
    "jeongwooChemistryBack"
  );

const jeongwooChemistryList =
  document.getElementById(
    "jeongwooChemistryList"
  );

const jeongwooChemistryDetailPage =
  document.getElementById(
    "jeongwooChemistryDetailPage"
  );

const jeongwooChemistryDetailBack =
  document.getElementById(
    "jeongwooChemistryDetailBack"
  );

const jeongwooChemistryDetailName =
  document.getElementById(
    "jeongwooChemistryDetailName"
  );

const jeongwooChemistryDetailCaption =
  document.getElementById(
    "jeongwooChemistryDetailCaption"
  );

const jeongwooChemistryAdd =
  document.getElementById(
    "jeongwooChemistryAdd"
  );

const jeongwooChemistryMemories =
  document.getElementById(
    "jeongwooChemistryMemories"
  );


let currentJeongwooChemistryPartner =
  null;


// =====================================================
// 🐺 PARTNERS
// =====================================================

const jeongwooChemistryPartners = [
  "HYUNSUK",
  "JIHOON",
  "YOSHI",
  "JUNKYU",
  "JAEHYUK",
  "DOYOUNG",
  "HARUTO",
  "ASAHI",
  "JUNGHWAN"
];


// =====================================================
// 🫶 MAKE 9 CHEMISTRY CARDS
// =====================================================

function renderJeongwooChemistryCards() {

  if (!jeongwooChemistryList) {
    return;
  }


  jeongwooChemistryList.innerHTML =
    "";


  jeongwooChemistryPartners.forEach(
    partner => {

      const partnerInfo =
        chemistryMemberInfo[
          partner
        ];


      const card =
        document.createElement(
          "button"
        );

      card.type =
        "button";

      card.className =
        "jihoon-chemistry-card jeongwoo-chemistry-card";

      card.dataset.partner =
        partner;


      card.innerHTML = `
        <span class="jihoon-chemistry-emoji">
          🐺${partnerInfo?.emoji || "💎"}
        </span>

        <div>
          <strong>
            JEONGWOO × ${partner}
          </strong>

          <small>
            CHEMISTRY MEMORY 💎
          </small>
        </div>

        <span>→</span>
      `;


      card.addEventListener(
        "click",
        async () => {

          currentJeongwooChemistryPartner =
            partner;


          // 💎 SHARED ENGINEへ接続
          currentHyunsukChemistryPartner =
            partner;

          currentHyunsukChemistryPairKey =
            createChemistryPairKey(
              "JEONGWOO",
              partner
            );

          currentSharedChemistryRenderTarget =
            jeongwooChemistryMemories;


          if (
            jeongwooChemistryDetailName
          ) {

            jeongwooChemistryDetailName.textContent =
              `🐺${partnerInfo?.emoji || "💎"} JEONGWOO × ${partner}`;

          }


          if (
            jeongwooChemistryDetailCaption
          ) {

            jeongwooChemistryDetailCaption.textContent =
              `ジョンウと${partner}の好きな瞬間を集めよう 💎`;

          }


          jeongwooChemistryPage.style.display =
            "none";

          jeongwooChemistryDetailPage.style.display =
            "block";

          jeongwooChemistryDetailPage.scrollTop =
            0;


          await renderSharedChemistryMemories();


          document.body.style.overflow =
            "hidden";

        }
      );


      jeongwooChemistryList.appendChild(
        card
      );

    }
  );
}


// =====================================================
// 🐺 JEONGWOO BOOK → CHEMISTRY
// =====================================================

if (
  jeongwooChemistryOpen &&
  jeongwooChemistryPage
) {

  jeongwooChemistryOpen.addEventListener(
    "click",
    () => {

      if (jeongwooBookDetail) {

        jeongwooBookDetail.classList.remove(
          "active"
        );

      }


      renderJeongwooChemistryCards();
      jeongwooChemistryPage.style.display =
        "block";

      jeongwooChemistryPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// =====================================================
// ← CHEMISTRY → JEONGWOO BOOK
// =====================================================

if (
  jeongwooChemistryBack &&
  jeongwooChemistryPage
) {

  jeongwooChemistryBack.addEventListener(
    "click",
    () => {

      jeongwooChemistryPage.style.display =
        "none";

      if (jeongwooBookDetail) {

        jeongwooBookDetail.classList.add(
          "active"
        );

        jeongwooBookDetail.scrollTop =
          0;

      }

      document.body.style.overflow =
        "hidden";

    }
  );
}


// =====================================================
// ← DETAIL → CHEMISTRY LIST
// =====================================================

if (
  jeongwooChemistryDetailBack &&
  jeongwooChemistryDetailPage
) {

  jeongwooChemistryDetailBack.addEventListener(
    "click",
    () => {

      jeongwooChemistryDetailPage.style.display =
        "none";

      jeongwooChemistryPage.style.display =
        "block";

      jeongwooChemistryPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// =====================================================
// ＋ ADD MEMORY → SHARED MODAL
// =====================================================

if (jeongwooChemistryAdd) {

  jeongwooChemistryAdd.addEventListener(
    "click",
    () => {

      if (
        !currentJeongwooChemistryPartner
      ) {
        return;
      }

      currentHyunsukChemistryPartner =
        currentJeongwooChemistryPartner;

      currentHyunsukChemistryPairKey =
        createChemistryPairKey(
          "JEONGWOO",
          currentJeongwooChemistryPartner
        );

      currentSharedChemistryRenderTarget =
        jeongwooChemistryMemories;

      currentSharedChemistryImageData =
        null;

      delete hyunsukChemistryMemorySave
        .dataset.editId;

      hyunsukChemistryMemoryInput.value =
        "";

      hyunsukChemistryMemoryMemo.value =
        "";

      hyunsukChemistryMemoryPreviewImage.src =
        "";

      hyunsukChemistryMemoryPreview.style.display =
        "none";

      hyunsukChemistryMemoryDelete.style.display =
        "none";

      hyunsukChemistryMemorySave.textContent =
        "💎 SAVE MEMORY";

      hyunsukChemistryMemoryTitle.textContent =
        `JEONGWOO × ${currentJeongwooChemistryPartner} MEMORY`;

      hyunsukChemistryMemoryModal.style.display =
        "flex";

      hyunsukChemistryMemoryModal.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// 最初のカード生成
renderJeongwooChemistryCards();

// ========================================
// 🐮 JUNGHWAN BOOK OPEN / CLOSE
// ========================================

const junghwanBookOpen =
  document.getElementById("junghwan-book-open");

const junghwanBookDetail =
  document.getElementById("junghwan-book-detail");

const junghwanBookClose =
  document.getElementById("junghwan-book-close");


// JUNGHWAN BOOKを開く
if (
  junghwanBookOpen &&
  junghwanBookDetail
) {

  junghwanBookOpen.addEventListener(
    "click",
    () => {

      junghwanBookDetail.classList.add(
        "active"
      );

      junghwanBookDetail.scrollTop = 0;

      document.body.style.overflow =
        "hidden";
    }
  );
}


// JUNGHWAN BOOKを閉じる
if (
  junghwanBookClose &&
  junghwanBookDetail
) {

  junghwanBookClose.addEventListener(
    "click",
    () => {

      junghwanBookDetail.classList.remove(
        "active"
      );

      // MEMBER BOOKは後ろで開いたまま
      document.body.style.overflow =
        "hidden";
    }
  );
}

// ======================================================
// 🐮 JUNGHWAN VISUAL BOOK / RANKING
// ======================================================
const junghwanVisualSystem =
  setupMemberVisualBook({
    key: "junghwan",
    displayName: "JUNGHWAN",
    japaneseName: "ジョンファン"
  });

const junghwanVisualRankingSystem =
  setupMemberVisualRanking({
    key: "junghwan",
    displayName: "JUNGHWAN",
    visualSystem: junghwanVisualSystem
  });

// ======================================================
// 🐮 JUNGHWAN GROWTH HISTORY START
// 完成型：YEAR DETAIL + EDIT MODAL
// ======================================================

const junghwanGrowthHistoryOpen =
  document.getElementById("junghwanGrowthHistoryOpen");

const junghwanGrowthHistoryPage =
  document.getElementById("junghwanGrowthHistoryPage");

const junghwanGrowthHistoryBack =
  document.getElementById("junghwanGrowthHistoryBack");

const junghwanGrowthYearPage =
  document.getElementById("junghwanGrowthYearPage");

const junghwanGrowthYearBack =
  document.getElementById("junghwanGrowthYearBack");

const junghwanGrowthYearButtons =
  document.querySelectorAll(".junghwan-growth-year");

const junghwanGrowthYearNumber =
  document.getElementById("junghwanGrowthYearNumber");

const junghwanGrowthYearTitle =
  document.getElementById("junghwanGrowthYearTitle");

const junghwanGrowthYearSubtitle =
  document.getElementById("junghwanGrowthYearSubtitle");

const junghwanGrowthYearVisualTitle =
  document.getElementById("junghwanGrowthYearVisualTitle");

const junghwanGrowthYearCaption =
  document.getElementById("junghwanGrowthYearCaption");

const junghwanGrowthYearVisualGrid =
  document.getElementById("junghwanGrowthYearVisualGrid");

const junghwanGrowthYearVisualAdd =
  document.getElementById("junghwanGrowthYearVisualAdd");

const junghwanGrowthVisualModal =
  document.getElementById("junghwanGrowthVisualModal");

const junghwanGrowthVisualModalKicker =
  document.getElementById("junghwanGrowthVisualModalKicker");

const junghwanGrowthVisualInput =
  document.getElementById("junghwanGrowthVisualInput");

const junghwanGrowthVisualSelect =
  document.getElementById("junghwanGrowthVisualSelect");

const junghwanGrowthVisualPreview =
  document.getElementById("junghwanGrowthVisualPreview");

const junghwanGrowthVisualPreviewImage =
  document.getElementById("junghwanGrowthVisualPreviewImage");

const junghwanGrowthVisualHair =
  document.getElementById("junghwanGrowthVisualHair");

const junghwanGrowthVisualMemo =
  document.getElementById("junghwanGrowthVisualMemo");

const junghwanGrowthVisualSave =
  document.getElementById("junghwanGrowthVisualSave");

const junghwanGrowthVisualDelete =
  document.getElementById("junghwanGrowthVisualDelete");

const junghwanGrowthVisualCancel =
  document.getElementById("junghwanGrowthVisualCancel");

let currentJunghwanGrowthYear = "2020";

let pendingJunghwanGrowthFile = null;

let currentJunghwanGrowthVisualItem = null;

let junghwanGrowthDB = null;

const JUNGHWAN_GROWTH_DB =
  "treasure-day-junghwan-growth-db";

const JUNGHWAN_GROWTH_STORE =
  "junghwanGrowthVisuals";
// ======================================================
// 💾 JUNGHWAN GROWTH IndexedDB
// ======================================================

function openJunghwanGrowthDB() {

  return new Promise((resolve, reject) => {

    const request =
      indexedDB.open(
        JUNGHWAN_GROWTH_DB,
        1
      );

    request.onupgradeneeded =
      event => {

        const db =
          event.target.result;

        if (
          !db.objectStoreNames.contains(
            JUNGHWAN_GROWTH_STORE
          )
        ) {

          db.createObjectStore(
            JUNGHWAN_GROWTH_STORE,
            {
              keyPath: "id"
            }
          );

        }

      };


    request.onsuccess =
      () => {

        junghwanGrowthDB =
          request.result;

        resolve(
          junghwanGrowthDB
        );

      };


    request.onerror =
      () => {

        reject(
          request.error
        );

      };

  });
}


// ======================================================
// 📸 IMAGE → DataURL
// ======================================================

function junghwanGrowthImageToDataURL(
  file
) {

  return new Promise(
    (resolve, reject) => {

      const reader =
        new FileReader();

      reader.onload = () => {

        const img =
          new Image();

        img.onload = () => {

          const MAX_SIZE = 1600;

          let width =
            img.naturalWidth;

          let height =
            img.naturalHeight;


          if (
            width > height &&
            width > MAX_SIZE
          ) {

            height =
              Math.round(
                height *
                MAX_SIZE /
                width
              );

            width =
              MAX_SIZE;

          } else if (
            height >= width &&
            height > MAX_SIZE
          ) {

            width =
              Math.round(
                width *
                MAX_SIZE /
                height
              );

            height =
              MAX_SIZE;

          }


          const canvas =
            document.createElement(
              "canvas"
            );

          canvas.width =
            width;

          canvas.height =
            height;


          const ctx =
            canvas.getContext(
              "2d"
            );

          if (!ctx) {

            reject(
              new Error(
                "Canvas unavailable"
              )
            );

            return;

          }


          ctx.drawImage(
            img,
            0,
            0,
            width,
            height
          );


          resolve(
            canvas.toDataURL(
              "image/jpeg",
              0.86
            )
          );

        };


        img.onerror =
          reject;

        img.src =
          reader.result;

      };


      reader.onerror =
        reject;

      reader.readAsDataURL(
        file
      );

    }
  );
}


// ======================================================
// 💾 SAVE NEW
// ======================================================

async function saveJunghwanGrowthVisual(
  file,
  year,
  hairColor,
  memo
) {

  if (!junghwanGrowthDB) {
    await openJunghwanGrowthDB();
  }


  const imageData =
    await junghwanGrowthImageToDataURL(
      file
    );


  const item = {

    id:
      Date.now() +
      Math.floor(
        Math.random() * 1000
      ),

    year:
      String(year),

    imageData,

    hairColor:
      hairColor || "OTHER",

    memo:
      memo || "",

    createdAt:
      Date.now()

  };


  return new Promise(
    (resolve, reject) => {

      const transaction =
        junghwanGrowthDB.transaction(
          JUNGHWAN_GROWTH_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          JUNGHWAN_GROWTH_STORE
        );

      const request =
        store.add(item);


      request.onsuccess =
        () => resolve(item);

      request.onerror =
        () => reject(
          request.error
        );

    }
  );
}


// ======================================================
// ✏️ UPDATE
// ======================================================

function updateJunghwanGrowthVisual(
  item
) {

  return new Promise(
    (resolve, reject) => {

      const transaction =
        junghwanGrowthDB.transaction(
          JUNGHWAN_GROWTH_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          JUNGHWAN_GROWTH_STORE
        );

      const request =
        store.put(item);


      request.onsuccess =
        () => resolve();

      request.onerror =
        () => reject(
          request.error
        );

    }
  );
}


// ======================================================
// 📚 GET YEAR VISUALS
// ======================================================

async function getJunghwanGrowthVisuals(
  year
) {

  if (!junghwanGrowthDB) {
    await openJunghwanGrowthDB();
  }


  return new Promise(
    (resolve, reject) => {

      const transaction =
        junghwanGrowthDB.transaction(
          JUNGHWAN_GROWTH_STORE,
          "readonly"
        );

      const store =
        transaction.objectStore(
          JUNGHWAN_GROWTH_STORE
        );

      const request =
        store.getAll();


      request.onsuccess =
        () => {

          const items =
            request.result || [];

          resolve(
            items.filter(
              item =>
                String(item.year) ===
                String(year)
            )
          );

        };


      request.onerror =
        () => reject(
          request.error
        );

    }
  );
}


// ======================================================
// 🗑 DELETE
// ======================================================

async function deleteJunghwanGrowthVisual(
  id
) {

  if (!junghwanGrowthDB) {
    await openJunghwanGrowthDB();
  }


  return new Promise(
    (resolve, reject) => {

      const transaction =
        junghwanGrowthDB.transaction(
          JUNGHWAN_GROWTH_STORE,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          JUNGHWAN_GROWTH_STORE
        );

      const request =
        store.delete(id);


      request.onsuccess =
        () => resolve();

      request.onerror =
        () => reject(
          request.error
        );

    }
  );
}
// ======================================================
// 🌱 JUNGHWAN GROWTH YEAR INFO
// ======================================================

const junghwanGrowthYearInfo = {

  "2020": {
    title: "DEBUT ERA 💎"
  },

  "2021": {
    title: "2021 ERA 💎"
  },

  "2022": {
    title: "2022 ERA 💎"
  },

  "2023": {
    title: "2023 ERA 💎"
  },

  "2024": {
    title: "2024 ERA 💎"
  },

  "2025": {
    title: "2025 ERA 💎"
  },

  "2026": {
    title: "NOW ✨"
  }

};


// ======================================================
// 📸 RENDER YEAR VISUALS
// ======================================================

async function renderJunghwanGrowthYearVisuals() {

  if (!junghwanGrowthYearVisualGrid) {
    return;
  }


  junghwanGrowthYearVisualGrid.innerHTML =
    "";


  const items =
    await getJunghwanGrowthVisuals(
      currentJunghwanGrowthYear
    );


  items
    .sort(
      (a, b) =>
        a.createdAt -
        b.createdAt
    )
    .forEach(item => {

      const card =
        document.createElement(
          "button"
        );

      card.type =
        "button";

 card.className =
  "jihoon-growth-visual-card junghwan-growth-visual-card";
const photo =
  document.createElement("div");

photo.className =
  "jihoon-growth-visual-photo junghwan-growth-visual-photo";
      const img =
        document.createElement(
          "img"
        );

      img.src =
        item.imageData || "";

      img.alt =
        `JUNGHWAN ${item.year}`;

      img.loading =
        "lazy";

      img.decoding =
        "async";


      const info =
        document.createElement(
          "div"
        );

      info.className =
        "jihoon-growth-visual-info";


      const hair =
        document.createElement(
          "span"
        );

      hair.textContent =
        `🎨 ${item.hairColor || "OTHER"}`;


      const memo =
        document.createElement(
          "p"
        );

      memo.textContent =
        item.memo || "";


      info.appendChild(
        hair
      );


      if (item.memo) {

        info.appendChild(
          memo
        );

      }


      photo.appendChild(
  img
);

card.appendChild(
  photo
);

      card.appendChild(
        info
      );


      // 写真タップ → EDIT
      card.addEventListener(
        "click",
        () => {

          currentJunghwanGrowthVisualItem =
            item;

          pendingJunghwanGrowthFile =
            null;


          if (
            junghwanGrowthVisualPreviewImage
          ) {

            junghwanGrowthVisualPreviewImage.src =
              item.imageData || "";

          }


          if (
            junghwanGrowthVisualPreview
          ) {

            junghwanGrowthVisualPreview.style.display =
              "block";

          }


          if (
            junghwanGrowthVisualHair
          ) {

            junghwanGrowthVisualHair.value =
              item.hairColor ||
              "OTHER";

          }


          if (
            junghwanGrowthVisualMemo
          ) {

            junghwanGrowthVisualMemo.value =
              item.memo || "";

          }


          if (
            junghwanGrowthVisualDelete
          ) {

            junghwanGrowthVisualDelete.style.display =
              "block";

          }


          if (
            junghwanGrowthVisualModalKicker
          ) {

            junghwanGrowthVisualModalKicker.textContent =
              `📸 ${item.year} VISUAL`;

          }


          if (
            junghwanGrowthVisualModal
          ) {

            junghwanGrowthVisualModal.style.display =
              "flex";

          }

        }
      );


      junghwanGrowthYearVisualGrid.appendChild(
        card
      );

    });

}


// ======================================================
// 🌱 OPEN YEAR DETAIL
// ======================================================

async function openJunghwanGrowthYear(
  year
) {

  currentJunghwanGrowthYear =
    String(year);


  const info =
    junghwanGrowthYearInfo[
      currentJunghwanGrowthYear
    ] || {
      title:
        `${currentJunghwanGrowthYear} ERA 💎`
    };


  if (
    junghwanGrowthYearNumber
  ) {

    junghwanGrowthYearNumber.textContent =
      currentJunghwanGrowthYear;

  }


  if (
    junghwanGrowthYearTitle
  ) {

    junghwanGrowthYearTitle.textContent =
      info.title;

  }


  if (
    junghwanGrowthYearSubtitle
  ) {

    junghwanGrowthYearSubtitle.textContent =
      `${currentJunghwanGrowthYear}年のジョンファンを振り返ろう 💎`;

  }


  if (
    junghwanGrowthYearVisualTitle
  ) {

    junghwanGrowthYearVisualTitle.textContent =
      `📸 ${currentJunghwanGrowthYear} VISUAL`;

  }


  if (
    junghwanGrowthYearCaption
  ) {

    junghwanGrowthYearCaption.textContent =
      `${currentJunghwanGrowthYear}年のお気に入りジョンファンを残そう 💎`;

  }


  if (
    junghwanGrowthHistoryPage
  ) {

    junghwanGrowthHistoryPage.style.display =
      "none";

  }


  if (
    junghwanGrowthYearPage
  ) {

    junghwanGrowthYearPage.style.display =
      "block";

    junghwanGrowthYearPage.scrollTop =
      0;

  }


  await renderJunghwanGrowthYearVisuals();

}


// ======================================================
// 🌱 YEAR BUTTONS
// ======================================================

junghwanGrowthYearButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      async () => {

        await openJunghwanGrowthYear(
          button.dataset.year
        );

      }
    );

  }
);
// ======================================================
// 🌱 OPEN GROWTH HISTORY
// ======================================================

if (
  junghwanGrowthHistoryOpen &&
  junghwanGrowthHistoryPage
) {

  junghwanGrowthHistoryOpen.addEventListener(
    "click",
    () => {

      if (junghwanBookDetail) {
        junghwanBookDetail.classList.remove(
          "active"
        );
      }

      junghwanGrowthHistoryPage.style.display =
        "block";

      junghwanGrowthHistoryPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// ======================================================
// ← GROWTH HISTORY → JUNGHWAN BOOK
// ======================================================

if (
  junghwanGrowthHistoryBack &&
  junghwanGrowthHistoryPage
) {

  junghwanGrowthHistoryBack.addEventListener(
    "click",
    () => {

      junghwanGrowthHistoryPage.style.display =
        "none";

      if (junghwanBookDetail) {

        junghwanBookDetail.classList.add(
          "active"
        );

        junghwanBookDetail.scrollTop =
          0;

      }

      document.body.style.overflow =
        "hidden";

    }
  );
}


// ======================================================
// ← YEAR DETAIL → GROWTH HISTORY
// ======================================================

if (
  junghwanGrowthYearBack &&
  junghwanGrowthYearPage
) {

  junghwanGrowthYearBack.addEventListener(
    "click",
    () => {

      junghwanGrowthYearPage.style.display =
        "none";

      junghwanGrowthHistoryPage.style.display =
        "block";

      junghwanGrowthHistoryPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// ======================================================
// ＋ ADD → MODAL
// ======================================================

if (junghwanGrowthYearVisualAdd) {

  junghwanGrowthYearVisualAdd.addEventListener(
    "click",
    () => {

      currentJunghwanGrowthVisualItem =
        null;

      pendingJunghwanGrowthFile =
        null;


      if (junghwanGrowthVisualInput) {
        junghwanGrowthVisualInput.value =
          "";
      }


      if (junghwanGrowthVisualMemo) {
        junghwanGrowthVisualMemo.value =
          "";
      }


      if (junghwanGrowthVisualHair) {
        junghwanGrowthVisualHair.value =
          "BLACK";
      }


      if (junghwanGrowthVisualPreviewImage) {
        junghwanGrowthVisualPreviewImage.src =
          "";
      }


      if (junghwanGrowthVisualPreview) {
        junghwanGrowthVisualPreview.style.display =
          "none";
      }


      if (junghwanGrowthVisualDelete) {
        junghwanGrowthVisualDelete.style.display =
          "none";
      }


      if (junghwanGrowthVisualModalKicker) {

        junghwanGrowthVisualModalKicker.textContent =
          `📸 ${currentJunghwanGrowthYear} VISUAL`;

      }


      if (junghwanGrowthVisualModal) {

        junghwanGrowthVisualModal.style.display =
          "flex";

        junghwanGrowthVisualModal.scrollTop =
          0;

      }

    }
  );
}


// ======================================================
// 📷 SELECT PHOTO
// ======================================================

if (
  junghwanGrowthVisualSelect &&
  junghwanGrowthVisualInput
) {

  junghwanGrowthVisualSelect.addEventListener(
    "click",
    () => {

      junghwanGrowthVisualInput.click();

    }
  );
}


if (junghwanGrowthVisualInput) {

  junghwanGrowthVisualInput.addEventListener(
    "change",
    () => {

      const file =
        junghwanGrowthVisualInput.files[0];

      if (!file) return;


      pendingJunghwanGrowthFile =
        file;


      const reader =
        new FileReader();


      reader.onload =
        () => {

          if (
            junghwanGrowthVisualPreviewImage
          ) {

            junghwanGrowthVisualPreviewImage.src =
              reader.result;

          }


          if (
            junghwanGrowthVisualPreview
          ) {

            junghwanGrowthVisualPreview.style.display =
              "block";

          }

        };


      reader.readAsDataURL(
        file
      );

    }
  );
}


// ======================================================
// 💎 SAVE / UPDATE
// ======================================================

if (junghwanGrowthVisualSave) {

  junghwanGrowthVisualSave.addEventListener(
    "click",
    async () => {

      try {

        const hairColor =
          junghwanGrowthVisualHair
            ? junghwanGrowthVisualHair.value
            : "OTHER";


        const memo =
          junghwanGrowthVisualMemo
            ? junghwanGrowthVisualMemo.value.trim()
            : "";


        // ✏️ UPDATE
        if (
          currentJunghwanGrowthVisualItem
        ) {

          currentJunghwanGrowthVisualItem.hairColor =
            hairColor;

          currentJunghwanGrowthVisualItem.memo =
            memo;


          if (
            pendingJunghwanGrowthFile
          ) {

            currentJunghwanGrowthVisualItem.imageData =
              await junghwanGrowthImageToDataURL(
                pendingJunghwanGrowthFile
              );

          }


          await updateJunghwanGrowthVisual(
            currentJunghwanGrowthVisualItem
          );

        }

        // 📸 NEW
        else {

          if (!pendingJunghwanGrowthFile) {

            alert(
              "写真を選んでね📸"
            );

            return;

          }


          await saveJunghwanGrowthVisual(
            pendingJunghwanGrowthFile,
            currentJunghwanGrowthYear,
            hairColor,
            memo
          );

        }


        closeJunghwanGrowthModal();

        await renderJunghwanGrowthYearVisuals();


      } catch (error) {

        console.error(
          "JUNGHWAN GROWTH SAVE ERROR:",
          error
        );

        alert(
          "保存に失敗しました🥲"
        );

      }

    }
  );
}


// ======================================================
// 🗑 DELETE
// ======================================================

if (junghwanGrowthVisualDelete) {

  junghwanGrowthVisualDelete.addEventListener(
    "click",
    async () => {

      if (
        !currentJunghwanGrowthVisualItem
      ) {
        return;
      }


      const ok =
        confirm(
          "この写真を削除しますか？🥲"
        );

      if (!ok) return;


      try {

        await deleteJunghwanGrowthVisual(
          currentJunghwanGrowthVisualItem.id
        );

        closeJunghwanGrowthModal();

        await renderJunghwanGrowthYearVisuals();


      } catch (error) {

        console.error(
          "JUNGHWAN GROWTH DELETE ERROR:",
          error
        );

        alert(
          "削除に失敗しました🥲"
        );

      }

    }
  );
}


// ======================================================
// CANCEL / CLOSE
// ======================================================

function closeJunghwanGrowthModal() {

  pendingJunghwanGrowthFile =
    null;

  currentJunghwanGrowthVisualItem =
    null;


  if (junghwanGrowthVisualInput) {
    junghwanGrowthVisualInput.value =
      "";
  }


  if (junghwanGrowthVisualPreviewImage) {
    junghwanGrowthVisualPreviewImage.src =
      "";
  }


  if (junghwanGrowthVisualPreview) {
    junghwanGrowthVisualPreview.style.display =
      "none";
  }


  if (junghwanGrowthVisualMemo) {
    junghwanGrowthVisualMemo.value =
      "";
  }


  if (junghwanGrowthVisualDelete) {
    junghwanGrowthVisualDelete.style.display =
      "none";
  }


  if (junghwanGrowthVisualModal) {
    junghwanGrowthVisualModal.style.display =
      "none";
  }

}


if (junghwanGrowthVisualCancel) {

  junghwanGrowthVisualCancel.addEventListener(
    "click",
    () => {

      closeJunghwanGrowthModal();

    }
  );
}


// ======================================================
// 🚀 INITIALIZE JUNGHWAN GROWTH DB
// ======================================================

openJunghwanGrowthDB()
  .catch(
    error => {

      console.error(
        "JUNGHWAN GROWTH DB ERROR:",
        error
      );

    }
  );

// ======================================================
// 🐮 JUNGHWAN SONG / MEMORIES
// ======================================================
const junghwanSongSystem =
  setupMemberSong({
    key: "junghwan",
    displayName: "JUNGHWAN",
    japaneseName: "ジョンファン"
  });

const junghwanMemoriesSystem =
  setupMemberMemories({
    key: "junghwan",
    displayName: "JUNGHWAN",
    japaneseName: "ジョンファン"
  });

// =====================================================
// 🐮 JUNGHWAN CHEMISTRY
// SHARED CHEMISTRY ENGINE CONNECT
// =====================================================

const junghwanChemistryOpen =
  document.getElementById(
    "junghwanChemistryOpen"
  );

const junghwanChemistryPage =
  document.getElementById(
    "junghwanChemistryPage"
  );

const junghwanChemistryBack =
  document.getElementById(
    "junghwanChemistryBack"
  );

const junghwanChemistryList =
  document.getElementById(
    "junghwanChemistryList"
  );

const junghwanChemistryDetailPage =
  document.getElementById(
    "junghwanChemistryDetailPage"
  );

const junghwanChemistryDetailBack =
  document.getElementById(
    "junghwanChemistryDetailBack"
  );

const junghwanChemistryDetailName =
  document.getElementById(
    "junghwanChemistryDetailName"
  );

const junghwanChemistryDetailCaption =
  document.getElementById(
    "junghwanChemistryDetailCaption"
  );

const junghwanChemistryAdd =
  document.getElementById(
    "junghwanChemistryAdd"
  );

const junghwanChemistryMemories =
  document.getElementById(
    "junghwanChemistryMemories"
  );


let currentJunghwanChemistryPartner =
  null;


// =====================================================
// 🐮 PARTNERS
// =====================================================

const junghwanChemistryPartners = [
  "HYUNSUK",
  "JIHOON",
  "YOSHI",
  "JUNKYU",
  "JAEHYUK",
  "DOYOUNG",
  "HARUTO",
  "JEONGWOO",
  "ASAHI"
];


// =====================================================
// 🫶 MAKE 9 CHEMISTRY CARDS
// =====================================================

function renderJunghwanChemistryCards() {

  if (!junghwanChemistryList) {
    return;
  }


  junghwanChemistryList.innerHTML =
    "";


  junghwanChemistryPartners.forEach(
    partner => {

      const partnerInfo =
        chemistryMemberInfo[
          partner
        ];


      const card =
        document.createElement(
          "button"
        );

      card.type =
        "button";

      card.className =
        "jihoon-chemistry-card junghwan-chemistry-card";

      card.dataset.partner =
        partner;


      card.innerHTML = `
        <span class="jihoon-chemistry-emoji">
          🐮${partnerInfo?.emoji || "💎"}
        </span>

        <div>
          <strong>
            JUNGHWAN × ${partner}
          </strong>

          <small>
            CHEMISTRY MEMORY 💎
          </small>
        </div>

        <span>→</span>
      `;


      card.addEventListener(
        "click",
        async () => {

          currentJunghwanChemistryPartner =
            partner;


          // 💎 SHARED ENGINEへ接続
          currentHyunsukChemistryPartner =
            partner;

          currentHyunsukChemistryPairKey =
            createChemistryPairKey(
              "JUNGHWAN",
              partner
            );

          currentSharedChemistryRenderTarget =
            junghwanChemistryMemories;


          if (
            junghwanChemistryDetailName
          ) {

            junghwanChemistryDetailName.textContent =
              `🐮${partnerInfo?.emoji || "💎"} JUNGHWAN × ${partner}`;

          }


          if (
            junghwanChemistryDetailCaption
          ) {

            junghwanChemistryDetailCaption.textContent =
              `ジョンファンと${partner}の好きな瞬間を集めよう 💎`;

          }


          junghwanChemistryPage.style.display =
            "none";

          junghwanChemistryDetailPage.style.display =
            "block";

          junghwanChemistryDetailPage.scrollTop =
            0;


          await renderSharedChemistryMemories();


          document.body.style.overflow =
            "hidden";

        }
      );


      junghwanChemistryList.appendChild(
        card
      );

    }
  );
}


// =====================================================
// 🐮 JUNGHWAN BOOK → CHEMISTRY
// =====================================================

if (
  junghwanChemistryOpen &&
  junghwanChemistryPage
) {

  junghwanChemistryOpen.addEventListener(
    "click",
    () => {

      if (junghwanBookDetail) {

        junghwanBookDetail.classList.remove(
          "active"
        );

      }


      renderJunghwanChemistryCards();
      junghwanChemistryPage.style.display =
        "block";

      junghwanChemistryPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// =====================================================
// ← CHEMISTRY → JUNGHWAN BOOK
// =====================================================

if (
  junghwanChemistryBack &&
  junghwanChemistryPage
) {

  junghwanChemistryBack.addEventListener(
    "click",
    () => {

      junghwanChemistryPage.style.display =
        "none";

      if (junghwanBookDetail) {

        junghwanBookDetail.classList.add(
          "active"
        );

        junghwanBookDetail.scrollTop =
          0;

      }

      document.body.style.overflow =
        "hidden";

    }
  );
}


// =====================================================
// ← DETAIL → CHEMISTRY LIST
// =====================================================

if (
  junghwanChemistryDetailBack &&
  junghwanChemistryDetailPage
) {

  junghwanChemistryDetailBack.addEventListener(
    "click",
    () => {

      junghwanChemistryDetailPage.style.display =
        "none";

      junghwanChemistryPage.style.display =
        "block";

      junghwanChemistryPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// =====================================================
// ＋ ADD MEMORY → SHARED MODAL
// =====================================================

if (junghwanChemistryAdd) {

  junghwanChemistryAdd.addEventListener(
    "click",
    () => {

      if (
        !currentJunghwanChemistryPartner
      ) {
        return;
      }

      currentHyunsukChemistryPartner =
        currentJunghwanChemistryPartner;

      currentHyunsukChemistryPairKey =
        createChemistryPairKey(
          "JUNGHWAN",
          currentJunghwanChemistryPartner
        );

      currentSharedChemistryRenderTarget =
        junghwanChemistryMemories;

      currentSharedChemistryImageData =
        null;

      delete hyunsukChemistryMemorySave
        .dataset.editId;

      hyunsukChemistryMemoryInput.value =
        "";

      hyunsukChemistryMemoryMemo.value =
        "";

      hyunsukChemistryMemoryPreviewImage.src =
        "";

      hyunsukChemistryMemoryPreview.style.display =
        "none";

      hyunsukChemistryMemoryDelete.style.display =
        "none";

      hyunsukChemistryMemorySave.textContent =
        "💎 SAVE MEMORY";

      hyunsukChemistryMemoryTitle.textContent =
        `JUNGHWAN × ${currentJunghwanChemistryPartner} MEMORY`;

      hyunsukChemistryMemoryModal.style.display =
        "flex";

      hyunsukChemistryMemoryModal.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );
}


// 最初のカード生成
renderJunghwanChemistryCards();


// =====================================================
// 🐶 JIHOON CHEMISTRY - SHARED ENGINE INTEGRATION
// =====================================================

const jihoonChemistryOpenShared = document.getElementById("jihoonChemistryOpen");
const jihoonChemistryPageShared = document.getElementById("jihoonChemistryPage");
const jihoonChemistryBackShared = document.getElementById("jihoonChemistryBack");
const jihoonChemistryListShared = document.getElementById("jihoonChemistryList");
const jihoonChemistryDetailPageShared = document.getElementById("jihoonChemistryDetailPage");
const jihoonChemistryDetailBackShared = document.getElementById("jihoonChemistryDetailBack");
const jihoonChemistryDetailEmojiShared = document.getElementById("jihoonChemistryDetailEmoji");
const jihoonChemistryDetailTitleShared = document.getElementById("jihoonChemistryDetailTitle");
const jihoonChemistryDetailCaptionShared = document.getElementById("jihoonChemistryDetailCaption");
const jihoonChemistryMemoryListShared = document.getElementById("jihoonChemistryMemoryList");
const jihoonChemistryAddShared = document.getElementById("jihoonChemistryAdd");

let currentJihoonChemistryPartnerShared = null;

const jihoonChemistryPartnersShared = [
  "HYUNSUK", "YOSHI", "JUNKYU", "JAEHYUK", "ASAHI",
  "DOYOUNG", "HARUTO", "JEONGWOO", "JUNGHWAN"
];

function renderJihoonSharedChemistryCards() {
  if (!jihoonChemistryListShared) return;
  jihoonChemistryListShared.innerHTML = "";

  jihoonChemistryPartnersShared.forEach((partner) => {
    const info = chemistryMemberInfo[partner];
    const card = document.createElement("button");
    card.type = "button";
    card.className = "jihoon-chemistry-card";
    card.dataset.partner = partner;
    card.innerHTML = `
      <span class="jihoon-chemistry-emoji">🐶${info?.emoji || "💎"}</span>
      <div><strong>JIHOON × ${partner}</strong><small>CHEMISTRY MEMORY 💎</small></div>
      <span>→</span>`;

    card.addEventListener("click", async () => {
      currentJihoonChemistryPartnerShared = partner;
      currentHyunsukChemistryPartner = partner;
      currentHyunsukChemistryPairKey = createChemistryPairKey("JIHOON", partner);
      currentSharedChemistryRenderTarget = jihoonChemistryMemoryListShared;

      if (jihoonChemistryDetailEmojiShared)
        jihoonChemistryDetailEmojiShared.textContent = "🐶" + (info?.emoji || "💎");
      if (jihoonChemistryDetailTitleShared)
        jihoonChemistryDetailTitleShared.textContent = `JIHOON × ${partner}`;
      if (jihoonChemistryDetailCaptionShared)
        jihoonChemistryDetailCaptionShared.textContent = `ジフンと${partner}の好きな瞬間を集めよう 💎`;

      jihoonChemistryPageShared.style.display = "none";
      jihoonChemistryDetailPageShared.style.display = "block";
      jihoonChemistryDetailPageShared.scrollTop = 0;
      await renderSharedChemistryMemories();
      document.body.style.overflow = "hidden";
    });

    jihoonChemistryListShared.appendChild(card);
  });
}

if (jihoonChemistryOpenShared && jihoonChemistryPageShared) {
  jihoonChemistryOpenShared.addEventListener("click", () => {
    if (jihoonBookDetail) jihoonBookDetail.classList.remove("active");
    renderJihoonSharedChemistryCards();
    jihoonChemistryPageShared.style.display = "block";
    jihoonChemistryPageShared.scrollTop = 0;
    document.body.style.overflow = "hidden";
  });
}

if (jihoonChemistryBackShared) {
  jihoonChemistryBackShared.addEventListener("click", () => {
    jihoonChemistryPageShared.style.display = "none";
    if (jihoonBookDetail) {
      jihoonBookDetail.classList.add("active");
      jihoonBookDetail.scrollTop = 0;
    }
    document.body.style.overflow = "hidden";
  });
}

if (jihoonChemistryDetailBackShared) {
  jihoonChemistryDetailBackShared.addEventListener("click", () => {
    jihoonChemistryDetailPageShared.style.display = "none";
    jihoonChemistryPageShared.style.display = "block";
    jihoonChemistryPageShared.scrollTop = 0;
    document.body.style.overflow = "hidden";
  });
}

if (jihoonChemistryAddShared) {
  jihoonChemistryAddShared.addEventListener("click", () => {
    if (!currentJihoonChemistryPartnerShared) return;
    currentHyunsukChemistryPartner = currentJihoonChemistryPartnerShared;
    currentHyunsukChemistryPairKey = createChemistryPairKey("JIHOON", currentJihoonChemistryPartnerShared);
    currentSharedChemistryRenderTarget = jihoonChemistryMemoryListShared;
    currentSharedChemistryImageData = null;
    delete hyunsukChemistryMemorySave.dataset.editId;
    hyunsukChemistryMemoryInput.value = "";
    hyunsukChemistryMemoryMemo.value = "";
    hyunsukChemistryMemoryPreviewImage.src = "";
    hyunsukChemistryMemoryPreview.style.display = "none";
    hyunsukChemistryMemoryDelete.style.display = "none";
    hyunsukChemistryMemorySave.textContent = "💎 SAVE MEMORY";
    hyunsukChemistryMemoryTitle.textContent = `JIHOON × ${currentJihoonChemistryPartnerShared} MEMORY`;
    hyunsukChemistryMemoryModal.style.display = "flex";
    hyunsukChemistryMemoryModal.scrollTop = 0;
    document.body.style.overflow = "hidden";
  });
}

// Old JIHOON JUNKYU/YOSHI data -> shared chemistry (one-time migration)
const JIHOON_SHARED_MIGRATION_KEY = "treasure-jihoon-chemistry-shared-migrated-v1";

function openOldJihoonChemistryDBShared() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("treasure-jihoon-chemistry-db", 1);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("chemistry-images")) db.createObjectStore("chemistry-images");
    };
  });
}

async function loadOldJihoonChemistryImageShared(imageKey) {
  if (!imageKey) return "";
  const db = await openOldJihoonChemistryDBShared();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("chemistry-images", "readonly");
    const request = tx.objectStore("chemistry-images").get(imageKey);
    request.onsuccess = () => resolve(request.result || "");
    request.onerror = () => reject(request.error);
  });
}

async function migrateOldJihoonChemistryShared() {
  if (localStorage.getItem(JIHOON_SHARED_MIGRATION_KEY) === "done") return;
  let oldItems = [];
  try { oldItems = JSON.parse(localStorage.getItem("treasure-jihoon-chemistry-memories")) || []; }
  catch (error) { oldItems = []; }

  for (const oldItem of oldItems) {
    const partner = String(oldItem.chemistry || "").toUpperCase();
    if (!jihoonChemistryPartnersShared.includes(partner)) continue;
    const migrationId = `jihoon-old-${oldItem.id}`;
    if (sharedChemistryMemories.some((item) => item.migrationId === migrationId)) continue;

    let imageData = oldItem.imageData || "";
    if (!imageData && oldItem.imageKey) {
      try { imageData = await loadOldJihoonChemistryImageShared(oldItem.imageKey); }
      catch (error) { console.error("OLD JIHOON IMAGE LOAD ERROR", error); }
    }
    if (!imageData) continue;

    const imageKey = "jihoon-shared-migrate-" + Date.now() + "-" + Math.random().toString(36).slice(2);
    await saveSharedChemistryImage(imageKey, imageData);
    sharedChemistryMemories.push({
      id: Number(oldItem.id) || Date.now() + Math.floor(Math.random() * 1000),
      pairKey: createChemistryPairKey("JIHOON", partner),
      members: createChemistryPairKey("JIHOON", partner).split("-"),
      imageKey, memo: oldItem.memo || "",
      createdAt: oldItem.createdAt || oldItem.id || Date.now(),
      migrationId
    });
  }
  saveSharedChemistryMemories();
  localStorage.setItem(JIHOON_SHARED_MIGRATION_KEY, "done");
}

renderJihoonSharedChemistryCards();
migrateOldJihoonChemistryShared().catch((error) => console.error("JIHOON SHARED MIGRATION ERROR", error));
// ======================================================
// 🎧 MY TREASURE MUSIC
// FIRST STAGE
// ======================================================

const musicPageOpen =
  document.getElementById(
    "music-page-open"
  );

const musicPage =
  document.getElementById(
    "music-page"
  );

const musicPageBack =
  document.getElementById(
    "music-page-back"
  );

const musicTodaySong =
  document.getElementById(
    "music-today-song"
  );


function updateMusicTodaySong() {

  if (!musicTodaySong) {
    return;
  }

  let song =
    getTodaySong();

  // まだTODAYを引いていない日なら
  // MUSICを開いた時に今日の曲を決定
  if (
    song === "???"
  ) {

    song =
      drawTodaySong();

    // HOME側にも同じ結果を反映
    updateTodayTreasure();

  }

  musicTodaySong.textContent =
    song;

}


// HOME → MUSIC
if (
  musicPageOpen &&
  musicPage
) {

  musicPageOpen.addEventListener(
    "click",
    () => {

      updateMusicTodaySong();

      musicPage.style.display =
        "block";

      musicPage.scrollTop =
        0;

      document.body.style.overflow =
        "hidden";

    }
  );

}


// MUSIC → HOME
if (
  musicPageBack &&
  musicPage
) {

  musicPageBack.addEventListener(
    "click",
    () => {

      musicPage.style.display =
        "none";

      document.body.style.overflow =
        "";

      window.scrollTo(
        0,
        0
      );

    }
  );

}

// ============================================
// 📊 MY TREASURE STATS
// FIRST STAGE
// ============================================

const statsPageOpen =
  document.getElementById(
    "stats-page-open"
  );

const statsPage =
  document.getElementById(
    "stats-page"
  );

const statsPageBack =
  document.getElementById(
    "stats-page-back"
  );

// ============================================
// 📊 STATS DATA
// ============================================

function getStatsJSON(key, fallback) {

  try {

    const saved =
      JSON.parse(
        localStorage.getItem(key)
      );

    return saved ?? fallback;

  } catch (error) {

    console.error(
      "STATS LOAD ERROR:",
      key,
      error
    );

    return fallback;

  }

}


function updateMyTreasureStats() {

  // --------------------------
  // 📸 MEMORIES
  // PHOTO + EVENT + SEAT + DIARY
  // --------------------------

  const photoMemories =
    getStatsJSON(
      "treasure-memories",
      []
    );

  const eventMemories =
    getStatsJSON(
      "treasure-event-memories",
      {}
    );

  const seatMemoriesForStats =
    getStatsJSON(
      "treasure-seat-memories",
      []
    );

  const diaryPostsForStats =
    getStatsJSON(
      "treasure-diary",
      []
    );


  const photoCount =
    Array.isArray(photoMemories)
      ? photoMemories.length
      : 0;

  const eventMemoryCount =
    eventMemories &&
    typeof eventMemories === "object"
      ? Object.keys(eventMemories).length
      : 0;

  const seatCount =
    Array.isArray(seatMemoriesForStats)
      ? seatMemoriesForStats.length
      : 0;

  const diaryCount =
    Array.isArray(diaryPostsForStats)
      ? diaryPostsForStats.length
      : 0;


  const totalMemories =
    photoCount +
    eventMemoryCount +
    seatCount +
    diaryCount;



  // --------------------------
  // 🎤 EVENTS
  // PLANに登録されているイベント数
  // --------------------------

  const planEvents =
    getStatsJSON(
      "treasure-plan-events",
      []
    );

  const totalEvents =
    Array.isArray(planEvents)
      ? planEvents.length
      : 0;



  // --------------------------
  // ❤️ FAVORITE SONGS
  // --------------------------

  const favoriteSongs =
    getStatsJSON(
      "treasure-music-favorites",
      []
    );

  const totalFavorites =
    Array.isArray(favoriteSongs)
      ? favoriteSongs.length
      : 0;



  // --------------------------
  // 🏆 WORLD CUPS
  // --------------------------

  const worldcupHistory =
    getStatsJSON(
      "treasure-music-worldcup-history",
      []
    );

  let totalWorldcups =
    Array.isArray(worldcupHistory)
      ? worldcupHistory.length
      : 0;


  // HISTORYがまだ無くても
  // LAST RESULTだけ存在する旧データ用
  if (totalWorldcups === 0) {

    const lastWorldcup =
      getStatsJSON(
        "treasure-music-worldcup-result",
        null
      );

    if (lastWorldcup) {
      totalWorldcups = 1;
    }

  }



  // --------------------------
  // 📊 HTMLへ反映
  // --------------------------

  const totalMemoriesEl =
    document.getElementById(
      "stats-total-memories"
    );

  const totalEventsEl =
    document.getElementById(
      "stats-total-events"
    );

  const totalFavoritesEl =
    document.getElementById(
      "stats-total-favorites"
    );

  const totalWorldcupsEl =
    document.getElementById(
      "stats-total-worldcups"
    );


  if (totalMemoriesEl) {
    totalMemoriesEl.textContent =
      totalMemories;
  }

  if (totalEventsEl) {
    totalEventsEl.textContent =
      totalEvents;
  }

  if (totalFavoritesEl) {
    totalFavoritesEl.textContent =
      totalFavorites;
  }

  if (totalWorldcupsEl) {
    totalWorldcupsEl.textContent =
      totalWorldcups;
  }
// --------------------------
// 🎤 LIVE LIFE
// --------------------------

const liveLifeEl =
  document.getElementById(
    "stats-live-life"
  );


// 🏟️ SEAT MEMORYに記録された会場
const venueNames =
  seatMemoriesForStats
    .map(memory =>
      (memory.venue || "").trim()
    )
    .filter(Boolean);


// 会場の種類数
const uniqueVenues =
  [...new Set(venueNames)];

const venueCount =
  uniqueVenues.length;


// 👑 一番多く行った会場
const venueCounter = {};

venueNames.forEach(venue => {

  venueCounter[venue] =
    (venueCounter[venue] || 0) + 1;

});


let mostVisitedVenue = "まだ記録なし";
let mostVisitedCount = 0;

Object.entries(venueCounter)
  .forEach(([venue, count]) => {

    if (count > mostVisitedCount) {

      mostVisitedVenue = venue;
      mostVisitedCount = count;

    }

  });


// ⭐ ★★★★★ SEAT
const fiveStarSeats =
  seatMemoriesForStats.filter(memory => {

    return Number(memory.rating) === 5;

  }).length;


// HTMLへ反映
if (liveLifeEl) {

  liveLifeEl.innerHTML = `

    <div class="stats-live-grid">

      <div class="stats-live-item">
        <span>🎤</span>
        <strong>${totalEvents}</strong>
        <small>EVENTS</small>
      </div>

      <div class="stats-live-item">
        <span>🏟️</span>
        <strong>${venueCount}</strong>
        <small>VENUES</small>
      </div>

    </div>


    <div class="stats-live-highlight">

      <small>👑 MOST VISITED VENUE</small>

      <strong>
        ${mostVisitedVenue}
      </strong>

      ${
        mostVisitedCount > 0
          ? `<span>${mostVisitedCount} TIMES</span>`
          : ""
      }

    </div>


    <div class="stats-live-highlight">

      <small>⭐ FIVE-STAR SEATS</small>

      <strong>
        ${fiveStarSeats}
      </strong>

      <span>
        MY BEST SEATS
      </span>

    </div>

  `;

}
// --------------------------
// 📸 MEMORY LIFE
// --------------------------

const memoryLifeEl =
  document.getElementById(
    "stats-memory-life"
  );


// 一番記録数が多いカテゴリーを決める
const memoryCategories = [
  {
    name: "PHOTO MEMORY",
    icon: "📸",
    count: photoCount
  },
  {
    name: "EVENT MEMORY",
    icon: "🎫",
    count: eventMemoryCount
  },
  {
    name: "SEAT MEMORY",
    icon: "💺",
    count: seatCount
  },
  {
    name: "DIARY",
    icon: "📖",
    count: diaryCount
  }
];


let mostActiveMemory = null;

memoryCategories.forEach(category => {

  if (
    !mostActiveMemory ||
    category.count > mostActiveMemory.count
  ) {

    mostActiveMemory = category;

  }

});


// HTMLへ反映
if (memoryLifeEl) {

  memoryLifeEl.innerHTML = `

    <div class="stats-memory-grid">

      <div class="stats-memory-item">
        <span>📸</span>
        <strong>${photoCount}</strong>
        <small>PHOTO MEMORY</small>
      </div>

      <div class="stats-memory-item">
        <span>🎫</span>
        <strong>${eventMemoryCount}</strong>
        <small>EVENT MEMORY</small>
      </div>

      <div class="stats-memory-item">
        <span>💺</span>
        <strong>${seatCount}</strong>
        <small>SEAT MEMORY</small>
      </div>

      <div class="stats-memory-item">
        <span>📖</span>
        <strong>${diaryCount}</strong>
        <small>DIARY</small>
      </div>

    </div>


    <div class="stats-memory-highlight">

      <small>
        👑 MOST ACTIVE MEMORY
      </small>

      <strong>
        ${
          mostActiveMemory &&
          mostActiveMemory.count > 0
            ? `${mostActiveMemory.icon} ${mostActiveMemory.name}`
            : "まだ記録なし"
        }
      </strong>

      ${
        mostActiveMemory &&
        mostActiveMemory.count > 0
          ? `<span>${mostActiveMemory.count} MEMORIES</span>`
          : ""
      }

    </div>

  `;

}  
// --------------------------
// 🎧 MUSIC LIFE
// --------------------------

const musicLifeEl =
  document.getElementById(
    "stats-music-life"
  );


// ❤️ FAVORITES
const musicFavoritesForStats =
  getStatsJSON(
    "treasure-music-favorites",
    []
  );

const musicFavoriteCount =
  Array.isArray(musicFavoritesForStats)
    ? musicFavoritesForStats.length
    : 0;


// 👑 MY RANKING No.1
const musicRankingForStats =
  getStatsJSON(
    "treasure-music-ranking",
    []
  );

const myNo1SongId =
  Array.isArray(musicRankingForStats)
    ? musicRankingForStats.find(
        id => id !== null
      )
    : null;

const myNo1Song =
  treasureSongs.find(
    song =>
      song.id === Number(myNo1SongId)
  );

const myNo1SongTitle =
  myNo1Song
    ? myNo1Song.title
    : "まだ未設定";


// 🏆 最新WORLD CUP CHAMPION
const worldcupHistoryForStats =
  getStatsJSON(
    "treasure-music-worldcup-history",
    []
  );

let worldcupWinnerId = null;

if (
  Array.isArray(worldcupHistoryForStats) &&
  worldcupHistoryForStats.length > 0
) {

  const latestWorldcup =
    worldcupHistoryForStats[
      worldcupHistoryForStats.length - 1
    ];

  if (
    latestWorldcup &&
    Array.isArray(latestWorldcup.ranking)
  ) {

    worldcupWinnerId =
      latestWorldcup.ranking[0];

  }

}


// HISTORYが無い旧データも救済
if (!worldcupWinnerId) {

  const lastWorldcupForStats =
    getStatsJSON(
      "treasure-music-worldcup-result",
      null
    );

  if (
    lastWorldcupForStats &&
    Array.isArray(
      lastWorldcupForStats.ranking
    )
  ) {

    worldcupWinnerId =
      lastWorldcupForStats.ranking[0];

  }

}


const worldcupWinner =
  treasureSongs.find(
    song =>
      song.id === Number(worldcupWinnerId)
  );

const worldcupWinnerTitle =
  worldcupWinner
    ? worldcupWinner.title
    : "まだ大会なし";


// 🎲 TODAY'S SONG
const todaySongForStats =
  localStorage.getItem(
    "treasure-today-song"
  ) || "まだ抽選してない";


// HTMLへ反映
if (musicLifeEl) {

  musicLifeEl.innerHTML = `

    <div class="stats-music-grid">

      <div class="stats-music-item">

        <span>❤️</span>

        <strong>
          ${musicFavoriteCount}
          <small>/ 53</small>
        </strong>

        <p>FAVORITE SONGS</p>

      </div>


      <div class="stats-music-item">

        <span>👑</span>

        <strong>
          ${myNo1SongTitle}
        </strong>

        <p>MY No.1 SONG</p>

      </div>

    </div>


    <div class="stats-music-highlight">

      <small>
        🏆 WORLD CUP CHAMPION
      </small>

      <strong>
        ${worldcupWinnerTitle}
      </strong>

      <span>
        CURRENT CHAMPION
      </span>

    </div>


    <div class="stats-music-highlight">

      <small>
        🎲 TODAY'S SONG
      </small>

      <strong>
        ${todaySongForStats}
      </strong>

      <span>
        TODAY'S TREASURE MUSIC
      </span>

    </div>

  `;

}  
 // --------------------------
// 🫶 MEMBER & CHEMISTRY
// --------------------------

const favoriteMemberEl =
  document.getElementById(
    "stats-favorite-member"
  );

const favoriteChemistryEl =
  document.getElementById(
    "stats-favorite-chemistry"
  );

const memberSongEl =
  document.getElementById(
    "stats-member-song"
  );


// 💎 MY TREASURE
const myTreasureMember =
  localStorage.getItem(
    "treasure-member"
  ) || "JIHOON";

if (favoriteMemberEl) {
  favoriteMemberEl.textContent =
    myTreasureMember;
}


// 🫶 FAVORITE CHEMISTRY
const chemistryForStats =
  getStatsJSON(
    "treasure-shared-chemistry-memories",
    []
  );

const chemistryCounter = {};

if (Array.isArray(chemistryForStats)) {

  chemistryForStats.forEach(item => {

    const pairKey =
      item.pairKey || "";

    if (!pairKey) return;

    chemistryCounter[pairKey] =
      (chemistryCounter[pairKey] || 0) + 1;

  });

}


let favoriteChemistry =
  "まだ記録なし";

let favoriteChemistryCount =
  0;

Object.entries(chemistryCounter)
  .forEach(([pairKey, count]) => {

    if (count > favoriteChemistryCount) {

      favoriteChemistry =
        pairKey.replace("-", " × ");

      favoriteChemistryCount =
        count;

    }

  });


if (favoriteChemistryEl) {

  favoriteChemistryEl.textContent =
    favoriteChemistry;

}


// 🎧 MEMBER SONG
const memberSongKey =
  `treasure-${myTreasureMember.toLowerCase()}-songs`;

const memberSongsForStats =
  getStatsJSON(
    memberSongKey,
    []
  );


let favoriteMemberSong =
  null;

if (Array.isArray(memberSongsForStats)) {

  favoriteMemberSong =
    memberSongsForStats.find(
      song =>
        song.favorite === true
    ) || null;

}


if (memberSongEl) {

  memberSongEl.textContent =
    favoriteMemberSong
      ? favoriteMemberSong.title
      : "まだ未設定";

} 
// --------------------------
// 💎 YOUR TREASURE PROFILE
// --------------------------

const profileMemberEl =
  document.getElementById(
    "stats-profile-member"
  );

const profileEventsEl =
  document.getElementById(
    "stats-profile-events"
  );

const profileMemoriesEl =
  document.getElementById(
    "stats-profile-memories"
  );

const profileSongEl =
  document.getElementById(
    "stats-profile-song"
  );

const profileVenueEl =
  document.getElementById(
    "stats-profile-venue"
  );

const profileLevelEl =
  document.getElementById(
    "stats-profile-level"
  );


// 💎 MEMBER
if (profileMemberEl) {
  profileMemberEl.textContent =
    myTreasureMember;
}


// 🎤 EVENTS
if (profileEventsEl) {
  profileEventsEl.textContent =
    totalEvents;
}


// 📸 MEMORIES
if (profileMemoriesEl) {
  profileMemoriesEl.textContent =
    totalMemories;
}


// ❤️ MY No.1 SONG
if (profileSongEl) {
  profileSongEl.textContent =
    myNo1SongTitle;
}


// 🏟️ HOME VENUE
if (profileVenueEl) {

  profileVenueEl.textContent =
    mostVisitedCount > 0
      ? mostVisitedVenue
      : "まだ記録なし";

}


// ============================================
// ✦ TREASURE LIFE LEVEL + 🏅 MY BADGES v1
// ============================================

// MEMBER BOOKの「記録あり」判定
// PHOTO MEMORYでMEMBER指定がある、または
// そのメンバーのMEMBER SONGに記録があれば1人として数える
const treasureMembersForBadges = [
  "HYUNSUK",
  "JIHOON",
  "YOSHI",
  "JUNKYU",
  "JAEHYUK",
  "ASAHI",
  "DOYOUNG",
  "HARUTO",
  "JEONGWOO",
  "JUNGHWAN"
];

const memberBookRecordedMembers =
  treasureMembersForBadges.filter(memberName => {

    const hasPhotoMemory =
      Array.isArray(photoMemories) &&
      photoMemories.some(memory =>
        String(memory.member || "")
          .trim()
          .toUpperCase() === memberName
      );

    const memberSongs =
      getStatsJSON(
        `treasure-${memberName.toLowerCase()}-songs`,
        []
      );

    const hasMemberSong =
      Array.isArray(memberSongs) &&
      memberSongs.length > 0;

    return hasPhotoMemory || hasMemberSong;
  });

const memberBookRecordCount =
  memberBookRecordedMembers.length;

const chemistryMemoryCount =
  Array.isArray(chemistryForStats)
    ? chemistryForStats.length
    : 0;


// --------------------------------------------
// 🏅 BADGE DEFINITIONS
// --------------------------------------------
const treasureBadgeDefinitions = [
  {
    id: "first-memory",
    icon: "🌱",
    name: "FIRST MEMORY",
    description: "最初のMEMORYを残した",
    current: totalMemories,
    target: 1
  },
  {
    id: "memory-keeper",
    icon: "💾",
    name: "MEMORY KEEPER",
    description: "MEMORYを10件残した",
    current: totalMemories,
    target: 10
  },
  {
    id: "memory-master",
    icon: "📸",
    name: "MEMORY MASTER",
    description: "MEMORYを50件残した",
    current: totalMemories,
    target: 50
  },
  {
    id: "first-seat",
    icon: "💺",
    name: "FIRST SEAT",
    description: "最初のSEAT MEMORYを残した",
    current: seatCount,
    target: 1
  },
  {
    id: "five-star-seat",
    icon: "⭐",
    name: "5 STAR SEAT",
    description: "★★★★★のSEATを残した",
    current: fiveStarSeats,
    target: 1
  },
  {
    id: "first-event",
    icon: "🎤",
    name: "FIRST EVENT",
    description: "最初のEVENTを登録した",
    current: totalEvents,
    target: 1
  },
  {
    id: "ten-events",
    icon: "💎",
    name: "10 EVENTS",
    description: "EVENTを10件登録した",
    current: totalEvents,
    target: 10
  },
  {
    id: "treasure-listener",
    icon: "🎧",
    name: "TREASURE LISTENER",
    description: "FAVORITE SONGを10曲集めた",
    current: totalFavorites,
    target: 10
  },
  {
    id: "worldcup-champion",
    icon: "🏆",
    name: "WORLD CUP CHAMPION",
    description: "WORLD CUPを初めて完走した",
    current: totalWorldcups,
    target: 1
  },
  {
    id: "worldcup-master",
    icon: "👑",
    name: "WORLD CUP MASTER",
    description: "WORLD CUPを5回完走した",
    current: totalWorldcups,
    target: 5
  },
  {
    id: "chemistry-lover",
    icon: "🤝",
    name: "CHEMISTRY LOVER",
    description: "CHEMISTRY MEMORYを20件残した",
    current: chemistryMemoryCount,
    target: 20
  },
  {
    id: "member-book-master",
    icon: "📖",
    name: "MEMBER BOOK MASTER",
    description: "10人全員のMEMBER BOOKに記録を残した",
    current: memberBookRecordCount,
    target: 10
  }
];

const unlockedBadgeIds =
  treasureBadgeDefinitions
    .filter(badge => badge.current >= badge.target)
    .map(badge => badge.id);


// --------------------------------------------
// ✦ TREASURE LIFE EXP
// MEMORY 10 / EVENT 15 / SEAT 20 / FAVORITE 5
// WORLD CUP 25 / MEMBER BOOK 15 / CHEMISTRY 10
// BADGE 30
// --------------------------------------------
const treasureLifeExp =
  (totalMemories * 10) +
  (totalEvents * 15) +
  (seatCount * 20) +
  (totalFavorites * 5) +
  (totalWorldcups * 25) +
  (memberBookRecordCount * 15) +
  (chemistryMemoryCount * 10) +
  (unlockedBadgeIds.length * 30);

const treasureLevelThresholds = [
  0,
  100,
  250,
  450,
  700,
  1000,
  1400,
  1900,
  2500,
  3200
];

let treasureLifeLevel = 1;

for (
  let i = 0;
  i < treasureLevelThresholds.length;
  i++
) {
  if (treasureLifeExp >= treasureLevelThresholds[i]) {
    treasureLifeLevel = i + 1;
  }
}

// LEVEL 10以降は400EXPごとに1UP（最大99）
if (
  treasureLifeExp >=
  treasureLevelThresholds[
    treasureLevelThresholds.length - 1
  ]
) {
  treasureLifeLevel = Math.min(
    99,
    10 + Math.floor(
      (
        treasureLifeExp -
        treasureLevelThresholds[
          treasureLevelThresholds.length - 1
        ]
      ) / 400
    )
  );
}

if (profileLevelEl) {
  profileLevelEl.textContent =
    `✦ ${String(treasureLifeLevel).padStart(2, "0")}`;

  profileLevelEl.title =
    `${treasureLifeExp} EXP`;
}


// --------------------------------------------
// 🏅 BADGESをHTMLへ反映
// --------------------------------------------
const achievementsEl =
  document.getElementById(
    "stats-achievements"
  );

if (achievementsEl) {

  const unlockedCount =
    unlockedBadgeIds.length;

  achievementsEl.innerHTML = `
    <div class="stats-badge-summary">
      <div>
        <small>ACHIEVEMENT PROGRESS</small>
        <strong>${unlockedCount} / ${treasureBadgeDefinitions.length}</strong>
      </div>
      <span>✦ LEVEL ${String(treasureLifeLevel).padStart(2, "0")}</span>
    </div>

    <div class="stats-level-progress">
      <div class="stats-level-progress-head">
        <span>${treasureLifeExp} EXP</span>
        <span>
          ${
            treasureLifeLevel < 10
              ? `NEXT ${treasureLevelThresholds[treasureLifeLevel]} EXP`
              : "TREASURE LIFE"
          }
        </span>
      </div>
      <div class="stats-level-progress-track">
        <div
          class="stats-level-progress-bar"
          style="width:${(() => {
            if (treasureLifeLevel >= 10) return 100;
            const currentBase =
              treasureLevelThresholds[
                treasureLifeLevel - 1
              ];
            const nextBase =
              treasureLevelThresholds[
                treasureLifeLevel
              ];
            return Math.max(
              0,
              Math.min(
                100,
                ((treasureLifeExp - currentBase) /
                  (nextBase - currentBase)) * 100
              )
            );
          })()}%"
        ></div>
      </div>
    </div>

    <div class="stats-badge-grid">
      ${treasureBadgeDefinitions.map(badge => {

        const unlocked =
          badge.current >= badge.target;

        const progress = Math.max(
          0,
          Math.min(
            100,
            (badge.current / badge.target) * 100
          )
        );

        return `
          <article class="stats-badge-card ${unlocked ? "unlocked" : "locked"}">
            <div class="stats-badge-icon">
              ${unlocked ? badge.icon : "🔒"}
            </div>
            <div class="stats-badge-copy">
              <strong>${badge.name}</strong>
              <p>${badge.description}</p>
              <div class="stats-badge-progress">
                <div style="width:${progress}%"></div>
              </div>
              <small>
                ${
                  unlocked
                    ? "UNLOCKED 💎"
                    : `${badge.current} / ${badge.target}`
                }
              </small>
            </div>
          </article>
        `;
      }).join("")}
    </div>
  `;
}


// --------------------------------------------
// ✨ 初解除時だけACHIEVEMENT演出
// 既存データで一気に複数解除された場合も
// ポップアップは1回だけにして、全IDは保存する
// --------------------------------------------
const unlockedBadgeStorageKey =
  "treasure-unlocked-badges-v1";
const unlockedBadgeDateStorageKey =
  "treasure-unlocked-badge-dates-v1";

const unlockedBadgeDates =
  getStatsJSON(
    unlockedBadgeDateStorageKey,
    {}
  );
const previouslyUnlockedBadges =
  getStatsJSON(
    unlockedBadgeStorageKey,
    []
  );

const previousBadgeSet =
  new Set(
    Array.isArray(previouslyUnlockedBadges)
      ? previouslyUnlockedBadges
      : []
  );

const newlyUnlockedBadges =
  treasureBadgeDefinitions.filter(badge =>
    badge.current >= badge.target &&
    !previousBadgeSet.has(badge.id)
  );

if (newlyUnlockedBadges.length > 0) {

  localStorage.setItem(
    unlockedBadgeStorageKey,
    JSON.stringify(unlockedBadgeIds)
  );

  // --------------------------------------------
  // 🗓️ BADGE UNLOCK DATE
  // 初めて解除した日だけ保存する
  // --------------------------------------------
  const today =
    new Date().toLocaleDateString(
      "ja-JP",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }
    ).replaceAll("/", ".");

  newlyUnlockedBadges.forEach(badge => {

    // 一度記録した解除日は上書きしない
    if (!unlockedBadgeDates[badge.id]) {
      unlockedBadgeDates[badge.id] =
        today;
    }

  });

  localStorage.setItem(
    unlockedBadgeDateStorageKey,
    JSON.stringify(unlockedBadgeDates)
  );

  // STATSを初めて開いた時に既存実績が大量にある場合も
  // 1枚だけ上品に表示する
  const newestBadge =
    newlyUnlockedBadges[
      newlyUnlockedBadges.length - 1
    ];

  const oldToast =
    document.getElementById(
      "treasure-badge-toast"
    );

  if (oldToast) oldToast.remove();

  const badgeToast =
    document.createElement("div");

  badgeToast.id =
    "treasure-badge-toast";

  badgeToast.className =
    "treasure-badge-toast";

  badgeToast.innerHTML = `
    <small>🏅 ACHIEVEMENT UNLOCKED</small>
    <strong>${newestBadge.icon} ${newestBadge.name}</strong>
    <span>
      ${
        newlyUnlockedBadges.length > 1
          ? `+${newlyUnlockedBadges.length - 1} MORE BADGES 💎`
          : newestBadge.description
      }
    </span>
  `;

  document.body.appendChild(badgeToast);

  requestAnimationFrame(() => {
    badgeToast.classList.add("show");
  });

  setTimeout(() => {
    badgeToast.classList.remove("show");
    setTimeout(() => badgeToast.remove(), 350);
  }, 3200);

} else if (
  !localStorage.getItem(
    unlockedBadgeStorageKey
  )
) {
  // 解除0件でも初期化だけしておく
  localStorage.setItem(
    unlockedBadgeStorageKey,
    JSON.stringify([])
  );
}
}
// ============================================
// 📸 VISUAL KING STATS
// ============================================

async function updateVisualKingStats() {

  const visualKingEl =
    document.getElementById(
      "stats-visual-king"
    );

  if (!visualKingEl) return;


  const visualMembers = [

    {
      name: "JIHOON",
      getVisuals: getJihoonVisuals
    },

    {
      name: "HYUNSUK",
      getVisuals: getHyunsukVisuals
    },

    {
      name: "YOSHI",
      getVisuals: () =>
        yoshiVisualSystem.getVisuals()
    },

    {
      name: "JUNKYU",
      getVisuals: () =>
        junkyuVisualSystem.getVisuals()
    },

    {
      name: "JAEHYUK",
      getVisuals: () =>
        jaehyukVisualSystem.getVisuals()
    },

    {
      name: "ASAHI",
      getVisuals: () =>
        asahiVisualSystem.getVisuals()
    },

    {
      name: "DOYOUNG",
      getVisuals: () =>
        doyoungVisualSystem.getVisuals()
    },

    {
      name: "HARUTO",
      getVisuals: () =>
        harutoVisualSystem.getVisuals()
    },

    {
      name: "JEONGWOO",
      getVisuals: () =>
        jeongwooVisualSystem.getVisuals()
    },

    {
      name: "JUNGHWAN",
      getVisuals: () =>
        junghwanVisualSystem.getVisuals()
    }

  ];


  let visualKing =
    "まだFAVORITEなし";

  let visualKingCount =
    0;


  for (const member of visualMembers) {

    try {

      const visuals =
        await member.getVisuals();

      const favoriteCount =
        Array.isArray(visuals)
          ? visuals.filter(
              visual =>
                visual.favorite === true
            ).length
          : 0;


      if (
        favoriteCount >
        visualKingCount
      ) {

        visualKing =
          member.name;

        visualKingCount =
          favoriteCount;

      }

    } catch (error) {

      console.error(
        "VISUAL KING LOAD ERROR:",
        member.name,
        error
      );

    }

  }


  visualKingEl.textContent =
    visualKingCount > 0
      ? `${visualKing} (${visualKingCount})`
      : "まだFAVORITEなし";

}
// HOME → STATS
if (
  statsPageOpen &&
  statsPage
) {

  statsPageOpen.addEventListener(
    "click",
   () => {

  updateMyTreasureStats();
  updateVisualKingStats();

  // HOMEを隠す
      if (homePage) {
        homePage.style.display =
          "none";
      }

      // STATSを表示
      statsPage.style.display =
        "block";

      // STATSの一番上から表示
      statsPage.scrollTop = 0;

      window.scrollTo(
        0,
        0
      );

    }
  );
}



// STATS → HOME
if (
  statsPageBack &&
  statsPage
) {

  statsPageBack.addEventListener(
    "click",
    () => {

      // STATSを閉じる
      statsPage.style.display =
        "none";

      // HOMEを復活
      if (homePage) {
        homePage.style.display =
          "block";
      }

      window.scrollTo(
        0,
        0
      );

    }
  );

}
// ======================================================
// 🎧 MUSIC MENU
// 今回は入口のみ。中身は次から順番に実装。
// ======================================================


// ======================================================
// 🎧 TREASURE MUSIC MASTER DATA
// ======================================================

const treasureSongs = [

  // 2020
  { id: 1, year: 2020, title: "BOY", tags: [], album: null },
  { id: 2, year: 2020, title: "COME TO ME", tags: [], album: null },
  { id: 3, year: 2020, title: "I LOVE YOU", tags: [], album: null },
  { id: 4, year: 2020, title: "B.L.T (BLING LIKE THIS)", tags: [], album: null },
  { id: 5, year: 2020, title: "MMM", tags: [], album: null },
  { id: 6, year: 2020, title: "ORANGE", tags: [], album: null },

  // 2021
  { id: 7, year: 2021, title: "MY TREASURE", tags: [], album: null },
  { id: 8, year: 2021, title: "BE WITH ME", tags: [], album: null },
  { id: 9, year: 2021, title: "SLOWMOTION", tags: [], album: null },
  { id: 10, year: 2021, title: "GOING CRAZY", tags: [], album: null },
  { id: 11, year: 2021, title: "BEAUTIFUL", tags: ["JAPAN"], album: null },
  { id: 12, year: 2021, title: "EVERYDAY", tags: ["SPECIAL"], album: null },

  // 2022
  { id: 13, year: 2022, title: "JIKJIN", tags: [], album: null },
  { id: 14, year: 2022, title: "U", tags: [], album: null },
  { id: 15, year: 2022, title: "DARARI", tags: [], album: null },
  { id: 16, year: 2022, title: "IT’S OKAY", tags: [], album: null },
  { id: 17, year: 2022, title: "BFF (Best Friend Forever)", tags: ["OST"], album: null },
  { id: 18, year: 2022, title: "Gonna Be Fine", tags: ["OST"], album: null },
  { id: 19, year: 2022, title: "HELLO", tags: [], album: null },
  { id: 20, year: 2022, title: "VolKno", tags: ["UNIT"], album: null },
  { id: 21, year: 2022, title: "CLAP!", tags: [], album: null },
  { id: 22, year: 2022, title: "THANK YOU", tags: ["UNIT"], album: null },
  { id: 23, year: 2022, title: "HOLD IT IN", tags: [], album: null },
  { id: 24, year: 2022, title: "DARARI (ROCK REMIX)", tags: [], album: null },

  // 2023
  { id: 25, year: 2023, title: "Here I Stand", tags: ["JAPAN"], album: null },
  { id: 26, year: 2023, title: "BEAUTIFUL (Ballad Ver.)", tags: ["JAPAN"], album: null },
  { id: 27, year: 2023, title: "MOVE (T5)", tags: ["UNIT"], album: null },
  { id: 28, year: 2023, title: "BONA BONA", tags: [], album: null },
  { id: 29, year: 2023, title: "I WANT YOUR LOVE", tags: [], album: null },
  { id: 30, year: 2023, title: "RUN", tags: [], album: null },
  { id: 31, year: 2023, title: "G.O.A.T", tags: ["UNIT"], album: null },
  { id: 32, year: 2023, title: "STUPID", tags: [], album: null },
  { id: 33, year: 2023, title: "THE WAY TO", tags: ["UNIT"], album: null },
  { id: 34, year: 2023, title: "WONDERLAND", tags: [], album: null },
  { id: 35, year: 2023, title: "B.O.M.B", tags: [], album: null },
  { id: 36, year: 2023, title: "LOVESICK", tags: [], album: null },
  { id: 37, year: 2023, title: "B.O.M.B (KABOOM ver.)", tags: [], album: null },

  // 2024
  { id: 38, year: 2024, title: "病 (YAMAI)", tags: ["JAPAN"], album: null },
  { id: 39, year: 2024, title: "LET IT BURN", tags: ["JAPAN"], album: null },
  { id: 40, year: 2024, title: "KING KONG", tags: [], album: null },
  { id: 41, year: 2024, title: "REVERSE", tags: ["JAPAN"], album: null },
  { id: 42, year: 2024, title: "LAST NIGHT", tags: [], album: null },

  // 2025
  { id: 43, year: 2025, title: "YELLOW", tags: [], album: null },
  { id: 44, year: 2025, title: "SARURU", tags: [], album: null },
  { id: 45, year: 2025, title: "WHATEVER, WHENEVER", tags: [], album: null },
  { id: 46, year: 2025, title: "EVERYTHING", tags: [], album: null },
  { id: 47, year: 2025, title: "PARADISE", tags: [], album: null },
  { id: 48, year: 2025, title: "NOW FOREVER", tags: [], album: null },
  { id: 49, year: 2025, title: "BETTER THAN ME", tags: [], album: null },

  // 2026
  { id: 50, year: 2026, title: "IF I", tags: [], album: null },
  { id: 51, year: 2026, title: "ZOOM ZOOM", tags: [], album: null },
  { id: 52, year: 2026, title: "NALLY-NA (HYUNHAYO)", tags: ["UNIT"], album: null },
  { id: 53, year: 2026, title: "DANGER", tags: [], album: null }

];


// ======================================================
// 🎵 ALL SONGS SYSTEM
// ======================================================

const MUSIC_FAVORITES_KEY =
  "treasure-music-favorites";

const musicAllSongsOpen =
  document.getElementById("music-all-songs-open");

const musicAllSongsPage =
  document.getElementById("music-all-songs-page");

const musicAllSongsBack =
  document.getElementById("music-all-songs-back");

const musicSongSearch =
  document.getElementById("music-song-search");

const musicYearFilter =
  document.getElementById("music-year-filter");

const musicFavoriteFilter =
  document.getElementById("music-favorite-filter");

const musicSongList =
  document.getElementById("music-song-list");

const musicSongCount =
  document.getElementById("music-song-count");

const musicSongResultCount =
  document.getElementById("music-song-result-count");


let currentMusicYear = "ALL";
let musicFavoritesOnly = false;


function loadMusicFavorites() {

  try {

    const saved =
      JSON.parse(
        localStorage.getItem(
          MUSIC_FAVORITES_KEY
        )
      );

    return Array.isArray(saved)
      ? saved
      : [];

  } catch (error) {

    return [];

  }

}


function saveMusicFavorites(favorites) {

  localStorage.setItem(
    MUSIC_FAVORITES_KEY,
    JSON.stringify(favorites)
  );

}


function isMusicFavorite(songId) {

  return loadMusicFavorites()
    .includes(songId);

}


function toggleMusicFavorite(songId) {

  let favorites =
    loadMusicFavorites();

  if (favorites.includes(songId)) {

    favorites =
      favorites.filter(
        id => id !== songId
      );

  } else {

    favorites.push(songId);

  }

  saveMusicFavorites(favorites);

}


// ======================================================
// YEAR FILTER
// 新しい年の曲を追加すると自動で増える
// ======================================================

function renderMusicYearFilters() {

  if (!musicYearFilter) return;

  const years = [
    ...new Set(
      treasureSongs.map(
        song => song.year
      )
    )
  ].sort(
    (a, b) => a - b
  );

  musicYearFilter.innerHTML = "";

  const filterValues = [
    "ALL",
    ...years
  ];

  filterValues.forEach(value => {

    const button =
      document.createElement("button");

    button.type = "button";

    button.className =
      "music-year-button";

    button.textContent =
      value;

    if (
      String(currentMusicYear) ===
      String(value)
    ) {

      button.classList.add(
        "active"
      );

    }

    button.addEventListener(
      "click",
      () => {

        currentMusicYear =
          value;

        renderMusicYearFilters();
        renderMusicSongs();

      }
    );

    musicYearFilter.appendChild(
      button
    );

  });

}


// ======================================================
// TAG DISPLAY
// ======================================================

function getMusicTagLabel(tag) {

  const labels = {

    JAPAN: "🇯🇵 JAPAN",
    OST: "🎬 OST",
    UNIT: "👥 UNIT",
    SPECIAL: "💎 SPECIAL"

  };

  return labels[tag] || tag;

}


// ======================================================
// SONG LIST
// ======================================================

function renderMusicSongs() {

  if (!musicSongList) return;

  const searchText =
    musicSongSearch
      ? musicSongSearch.value
          .trim()
          .toLowerCase()
      : "";

  let songs =
    treasureSongs.filter(song => {

      const yearMatch =
        currentMusicYear === "ALL" ||
        String(song.year) ===
          String(currentMusicYear);

      const searchMatch =
        song.title
          .toLowerCase()
          .includes(searchText);

      const favoriteMatch =
        !musicFavoritesOnly ||
        isMusicFavorite(song.id);

      return (
        yearMatch &&
        searchMatch &&
        favoriteMatch
      );

    });


  musicSongList.innerHTML = "";


  if (musicSongCount) {

    musicSongCount.textContent =
      `${treasureSongs.length} SONGS 💎`;

  }


  if (musicSongResultCount) {

    musicSongResultCount.textContent =
      `${songs.length} SONGS`;

  }


  if (songs.length === 0) {

    musicSongList.innerHTML = `
      <div class="music-song-empty">
        🎧 該当する曲がありません<br>
        別の条件で探してみてね 💎
      </div>
    `;

    return;

  }


  songs.forEach(song => {

    const card =
      document.createElement("div");

    card.className =
      "music-song-card";


    const tagsHTML =
      song.tags
        .map(
          tag => `
            <span class="music-song-tag">
              ${getMusicTagLabel(tag)}
            </span>
          `
        )
        .join("");


    const favorite =
      isMusicFavorite(song.id);


    card.innerHTML = `

      <div class="music-song-number">
        ${String(song.id).padStart(2, "0")}
      </div>

      <div class="music-song-info">

        <strong>
          ${song.title}
        </strong>

        <div class="music-song-meta">

          <span>
            ${song.year}
          </span>

          ${tagsHTML}

        </div>

      </div>

      <button
        type="button"
        class="
          music-song-favorite
          ${favorite ? "active" : ""}
        "
        aria-label="favorite"
      >
        ${favorite ? "♥" : "♡"}
      </button>

    `;


    const favoriteButton =
      card.querySelector(
        ".music-song-favorite"
      );


    favoriteButton.addEventListener(
      "click",
      (event) => {

        event.stopPropagation();

        toggleMusicFavorite(
          song.id
        );

        renderMusicSongs();

      }
    );


    musicSongList.appendChild(
      card
    );

  });

}


// ======================================================
// SEARCH
// ======================================================

if (musicSongSearch) {

  musicSongSearch.addEventListener(
    "input",
    renderMusicSongs
  );

}


// ======================================================
// FAVORITES ONLY
// ======================================================

if (musicFavoriteFilter) {

  musicFavoriteFilter.addEventListener(
    "click",
    () => {

      musicFavoritesOnly =
        !musicFavoritesOnly;

      musicFavoriteFilter
        .classList.toggle(
          "active",
          musicFavoritesOnly
        );

      musicFavoriteFilter.textContent =
        musicFavoritesOnly
          ? "♥ FAVORITES ONLY"
          : "♡ FAVORITES ONLY";

      renderMusicSongs();

    }
  );

}


// ======================================================
// MUSIC → ALL SONGS
// ======================================================

if (
  musicAllSongsOpen &&
  musicAllSongsPage
) {

  musicAllSongsOpen.addEventListener(
    "click",
    () => {

      currentMusicYear =
        "ALL";

      musicFavoritesOnly =
        false;

      if (musicSongSearch) {
        musicSongSearch.value = "";
      }

      if (musicFavoriteFilter) {

        musicFavoriteFilter
          .classList.remove(
            "active"
          );

        musicFavoriteFilter.textContent =
          "♡ FAVORITES ONLY";

      }

      renderMusicYearFilters();
      renderMusicSongs();

      musicPage.style.display =
        "none";

      musicAllSongsPage.style.display =
        "block";

      musicAllSongsPage.scrollTop =
        0;

    }
  );

}


// ======================================================
// ALL SONGS → MUSIC
// ======================================================

if (
  musicAllSongsBack &&
  musicAllSongsPage
) {

  musicAllSongsBack.addEventListener(
    "click",
    () => {

      musicAllSongsPage.style.display =
        "none";

      musicPage.style.display =
        "block";

      musicPage.scrollTop =
        0;

    }
  );

}


// INITIAL
renderMusicYearFilters();
renderMusicSongs();
// ======================================================
// ❤️ MUSIC FAVORITES
// ======================================================

const musicFavoritesOpen =
  document.getElementById(
    "music-favorites-open"
  );

const musicFavoritesPage =
  document.getElementById(
    "music-favorites-page"
  );

const musicFavoritesBack =
  document.getElementById(
    "music-favorites-back"
  );

const musicFavoritesList =
  document.getElementById(
    "music-favorites-list"
  );

const musicFavoritesCount =
  document.getElementById(
    "music-favorites-count"
  );


// ======================================================
// RENDER FAVORITES
// ======================================================

function renderMusicFavorites() {

  if (!musicFavoritesList) {
    return;
  }

  const favoriteIds =
    loadMusicFavorites();

  const favoriteSongs =
    treasureSongs.filter(
      song =>
        favoriteIds.includes(song.id)
    );


  if (musicFavoritesCount) {

    musicFavoritesCount.textContent =
      `${favoriteSongs.length} FAVORITES`;

  }


  musicFavoritesList.innerHTML = "";


  // まだお気に入りがない
  if (favoriteSongs.length === 0) {

    musicFavoritesList.innerHTML = `
      <div class="music-favorites-empty">

        ♡<br>

        まだお気に入りの曲がありません。<br>

        ALL SONGSで♡を押して、<br>
        MY FAVORITESを育てよう 💎

      </div>
    `;

    return;

  }


  favoriteSongs.forEach(song => {

    const card =
      document.createElement("div");

    card.className =
      "music-favorite-card";


    const tagsHTML =
      song.tags
        .map(
          tag => `
            <span class="music-song-tag">
              ${getMusicTagLabel(tag)}
            </span>
          `
        )
        .join("");


    card.innerHTML = `

      <div class="music-favorite-number">
        ${String(song.id).padStart(2, "0")}
      </div>

      <div class="music-favorite-info">

        <strong>
          ${song.title}
        </strong>

        <div class="music-favorite-meta">

          <span>
            ${song.year}
          </span>

          ${tagsHTML}

        </div>

      </div>

      <button
        type="button"
        class="music-favorite-remove"
        aria-label="お気に入り解除"
      >
        ♥
      </button>

    `;


    const removeButton =
      card.querySelector(
        ".music-favorite-remove"
      );


    removeButton.addEventListener(
      "click",
      () => {

        toggleMusicFavorite(
          song.id
        );

        // FAVORITESを更新
        renderMusicFavorites();

        // ALL SONGS側も更新
        renderMusicSongs();

      }
    );


    musicFavoritesList.appendChild(
      card
    );

  });

}


// ======================================================
// MUSIC → FAVORITES
// ======================================================

if (
  musicFavoritesOpen &&
  musicFavoritesPage
) {

  musicFavoritesOpen.addEventListener(
    "click",
    () => {

      renderMusicFavorites();

      musicPage.style.display =
        "none";

      musicFavoritesPage.style.display =
        "block";

      musicFavoritesPage.scrollTop =
        0;

    }
  );

}


// ======================================================
// FAVORITES → MUSIC
// ======================================================

if (
  musicFavoritesBack &&
  musicFavoritesPage
) {

  musicFavoritesBack.addEventListener(
    "click",
    () => {

      musicFavoritesPage.style.display =
        "none";

      musicPage.style.display =
        "block";

      musicPage.scrollTop =
        0;

    }
  );

}
// ======================================================
// 💿 TREASURE DISCOGRAPHY DATA
// ======================================================

const treasureAlbums = [

  {
    id: 1,
    year: 2020,
    title: "THE FIRST STEP : CHAPTER ONE",
    type: "1st SINGLE ALBUM",
    releaseDate: "2020-08-07",
    image: "images/albums/album01_chapter1.jpg",
    tracks: [1, 2]
  },

  {
    id: 2,
    year: 2020,
    title: "THE FIRST STEP : CHAPTER TWO",
    type: "2nd SINGLE ALBUM",
    releaseDate: "2020-09-18",
    image: "images/albums/album02_chapter2.jpg",
    tracks: [3, 4]
  },

  {
    id: 3,
    year: 2020,
    title: "THE FIRST STEP : CHAPTER THREE",
    type: "3rd SINGLE ALBUM",
    releaseDate: "2020-11-06",
    image: "images/albums/album03_chapter3.jpg",
    tracks: [5, 6]
  },

  {
    id: 4,
    year: 2021,
    title: "THE FIRST STEP : TREASURE EFFECT",
    type: "1st FULL ALBUM",
    releaseDate: "2021-01-11",
    image: "images/albums/album04_treasure_effect.jpg",

    // 53曲マスターに入っている曲のみ連動
    tracks: [7, 8, 9, 1, 2, 3, 4, 5, 6, 10],

    bonusTracks: [
      "I LOVE YOU Mellow Mood. (CD only)",
      "MMM Rock Ver. (CD only)"
    ]
  },

  {
    id: 5,
    year: 2022,
    title: "THE SECOND STEP : CHAPTER ONE",
    type: "1st MINI ALBUM",
    releaseDate: "2022-02-15",
    image: "images/albums/album05_second_step1.jpg",
    tracks: [13, 14, 15, 16, 17, 18]
  },

  {
    id: 6,
    year: 2022,
    title: "THE SECOND STEP : CHAPTER TWO",
    type: "2nd MINI ALBUM",
    releaseDate: "2022-10-04",
    image: "images/albums/album06_second_step2.jpg",
    tracks: [19, 20, 21, 22, 23, 24]
  },

  {
    id: 7,
    year: 2023,
    title: "REBOOT",
    type: "2nd FULL ALBUM",
    releaseDate: "2023-07-28",
    image: "images/albums/album07_reboot.jpg",
    tracks: [28, 29, 30, 27, 31, 32, 33, 34, 35, 36]
  },

  {
    id: 8,
    year: 2023,
    title: "B.O.M.B (kaboom ver.)",
    type: "DIGITAL SINGLE",
    releaseDate: "2023-10-20",
    image: "images/albums/album08_bomb_kaboom.jpg",
    tracks: [37]
  },

  {
    id: 9,
    year: 2024,
    title: "KING KONG",
    type: "DIGITAL SINGLE",
    releaseDate: "2024-05-28",
    image: "images/albums/album09_king_kong.jpg",
    tracks: [40]
  },

  {
    id: 10,
    year: 2024,
    title: "LAST NIGHT",
    type: "DIGITAL SINGLE",
    releaseDate: "2024-12-05",
    image: "images/albums/album10_last_night.jpg",
    tracks: [42]
  },

  {
    id: 11,
    year: 2025,
    title: "PLEASURE",
    type: "SPECIAL MINI ALBUM",
    releaseDate: "2025-03-07",
    image: "images/albums/album11_pleasure.jpg",
    tracks: [43, 44, 45, 42]
  },

  {
    id: 12,
    year: 2025,
    title: "LOVE PULSE",
    type: "3rd MINI ALBUM",
    releaseDate: "2025-09-01",
    image: "images/albums/album12_love_pulse.jpg",
    tracks: [46, 47, 48, 49]
  },

  {
    id: 13,
    year: 2026,
    title: "NEW WAV",
    type: "4th MINI ALBUM",
    releaseDate: "2026-06-01",
    image: "images/albums/album13_new_wav.jpg",
    tracks: [50, 51, 52, 53]
  }

];

// ======================================================
// 💿 DISCOGRAPHY SYSTEM
// ======================================================

const musicDiscographyOpen =
  document.getElementById(
    "music-discography-open"
  );

const musicDiscographyPage =
  document.getElementById(
    "music-discography-page"
  );

const musicDiscographyBack =
  document.getElementById(
    "music-discography-back"
  );

const musicDiscographyList =
  document.getElementById(
    "music-discography-list"
  );


// ======================================================
// RENDER DISCOGRAPHY
// ======================================================

function renderMusicDiscography() {

  if (!musicDiscographyList) {
    return;
  }

  musicDiscographyList.innerHTML = "";


  const years = [
    ...new Set(
      treasureAlbums.map(
        album => album.year
      )
    )
  ].sort(
    (a, b) => a - b
  );


  years.forEach(year => {

    const albums =
      treasureAlbums.filter(
        album => album.year === year
      );


    const section =
      document.createElement("section");

    section.className =
      "music-discography-year";


    section.innerHTML = `

      <div class="music-discography-year-head">

        <strong>
          ${year}
        </strong>

        <span></span>

      </div>

      <div
        class="music-discography-grid"
      ></div>

    `;


    const grid =
      section.querySelector(
        ".music-discography-grid"
      );


    albums.forEach(album => {

      const card =
        document.createElement("article");

      card.className =
        "music-album-card";


      card.innerHTML = `

        <button
          type="button"
          class="music-album-cover-button"
          data-album-id="${album.id}"
          aria-label="${album.title}"
        >

          <img
            class="music-album-cover"
            src="${album.image}"
            alt="${album.title}"
          >

        </button>


        <div class="music-album-info">

          <strong>
            ${album.title}
          </strong>

          <span>
            ${album.year}
          </span>

          <span class="music-album-type">
            💿 ${album.type}
          </span>

        </div>

      `;


      grid.appendChild(card);

    });


    musicDiscographyList
      .appendChild(section);

  });

}


// ======================================================
// MUSIC → DISCOGRAPHY
// ======================================================

if (
  musicDiscographyOpen &&
  musicDiscographyPage
) {

  musicDiscographyOpen
    .addEventListener(
      "click",
      () => {

        renderMusicDiscography();

        musicPage.style.display =
          "none";

        musicDiscographyPage
          .style.display =
          "block";

        musicDiscographyPage
          .scrollTop = 0;

      }
    );

}


// ======================================================
// DISCOGRAPHY → MUSIC
// ======================================================

if (
  musicDiscographyBack &&
  musicDiscographyPage
) {

  musicDiscographyBack
    .addEventListener(
      "click",
      () => {

        musicDiscographyPage
          .style.display =
          "none";

        musicPage.style.display =
          "block";

        musicPage.scrollTop = 0;

      }
    );

}
// ======================================================
// 💿 ALBUM DETAIL
// ======================================================

const musicAlbumDetailPage =
  document.getElementById(
    "music-album-detail-page"
  );

const musicAlbumDetailBack =
  document.getElementById(
    "music-album-detail-back"
  );

const musicAlbumDetailCover =
  document.getElementById(
    "music-album-detail-cover"
  );

const musicAlbumDetailYear =
  document.getElementById(
    "music-album-detail-year"
  );
const musicAlbumDetailReleaseDate =
  document.getElementById(
    "music-album-detail-release-date"
  );
const musicAlbumDetailTitle =
  document.getElementById(
    "music-album-detail-title"
  );

const musicAlbumDetailType =
  document.getElementById(
    "music-album-detail-type"
  );

const musicAlbumTrackCount =
  document.getElementById(
    "music-album-track-count"
  );

const musicAlbumTrackList =
  document.getElementById(
    "music-album-track-list"
  );


let currentMusicAlbumId = null;


// ======================================================
// OPEN ALBUM
// ======================================================

function openMusicAlbumDetail(albumId) {

  const album =
    treasureAlbums.find(
      item =>
        item.id === Number(albumId)
    );

  if (!album) {
    return;
  }


  currentMusicAlbumId =
    album.id;


  musicAlbumDetailCover.src =
    album.image;

  musicAlbumDetailCover.alt =
    album.title;


  musicAlbumDetailYear.textContent =
    album.year;

musicAlbumDetailReleaseDate.textContent =
  album.releaseDate
    .replaceAll("-", ".");
  
  musicAlbumDetailTitle.textContent =
    album.title;


  musicAlbumDetailType.textContent =
    `💿 ${album.type}`;


 const albumSongs =
  album.tracks
    .map(songId =>
      treasureSongs.find(
        song =>
          song.id === songId
      )
    )
    .filter(Boolean);


musicAlbumTrackCount.textContent =
  `${albumSongs.length} TRACKS`;


musicAlbumTrackList.innerHTML =
  "";


albumSongs.forEach(
  (song, index) => {

    const favorite =
      isMusicFavorite(
        song.id
      );


    const trackCard =
      document.createElement(
        "div"
      );

    trackCard.className =
      "music-album-track-card";


    trackCard.innerHTML = `

      <div class="music-album-track-number">
        ${String(index + 1).padStart(2, "0")}
      </div>

      <div class="music-album-track-info">

        <strong>
          ${song.title}
        </strong>

      </div>

      <button
        type="button"
        class="
          music-album-track-favorite
          ${favorite ? "active" : ""}
        "
        aria-label="favorite"
      >
        ${favorite ? "♥" : "♡"}
      </button>

    `;


    const favoriteButton =
      trackCard.querySelector(
        ".music-album-track-favorite"
      );


    favoriteButton
      .addEventListener(
        "click",
        event => {

          event.stopPropagation();

          toggleMusicFavorite(
            song.id
          );


          // ALBUM DETAIL更新
          openMusicAlbumDetail(
            currentMusicAlbumId
          );


          // ALL SONGS更新
          renderMusicSongs();


          // FAVORITES更新
          renderMusicFavorites();

        }
      );


    musicAlbumTrackList
      .appendChild(
        trackCard
      );

  }
);

loadMusicAlbumArchive(album);
  musicDiscographyPage.style.display =
    "none";


  musicAlbumDetailPage.style.display =
    "block";


  musicAlbumDetailPage.scrollTop =
    0;

}


// ======================================================
// DISCOGRAPHY ALBUM CLICK
// ======================================================

if (musicDiscographyList) {

  musicDiscographyList
    .addEventListener(
      "click",
      event => {

        const button =
          event.target.closest(
            ".music-album-cover-button"
          );


        if (!button) {
          return;
        }


        const albumId =
          Number(
            button.dataset.albumId
          );


        openMusicAlbumDetail(
          albumId
        );

      }
    );

}


// ======================================================
// ALBUM DETAIL → DISCOGRAPHY
// ======================================================

if (
  musicAlbumDetailBack &&
  musicAlbumDetailPage
) {

  musicAlbumDetailBack
    .addEventListener(
      "click",
      () => {

        musicAlbumDetailPage
          .style.display =
          "none";


        musicDiscographyPage
          .style.display =
          "block";

      }
    );

}
// ======================================================
// 💎 THIS ALBUM & ME
// ======================================================

const MUSIC_ALBUM_ARCHIVE_KEY =
  "treasure-music-album-archive";


const musicAlbumFirstImpression =
  document.getElementById(
    "music-album-first-impression"
  );

const musicAlbumNumberOneSong =
  document.getElementById(
    "music-album-number-one-song"
  );

const musicAlbumNumberOneStage =
  document.getElementById(
    "music-album-number-one-stage"
  );

const musicAlbumMemory =
  document.getElementById(
    "music-album-memory"
  );

const musicAlbumArchiveSave =
  document.getElementById(
    "music-album-archive-save"
  );

const musicAlbumArchiveSaved =
  document.getElementById(
    "music-album-archive-saved"
  );


// ======================================================
// LOAD ALL ALBUM ARCHIVES
// ======================================================

function loadMusicAlbumArchives() {

  try {

    const saved =
      JSON.parse(
        localStorage.getItem(
          MUSIC_ALBUM_ARCHIVE_KEY
        )
      );

    return (
      saved &&
      typeof saved === "object"
    )
      ? saved
      : {};

  } catch (error) {

    return {};

  }

}


// ======================================================
// SAVE ALL
// ======================================================

function saveMusicAlbumArchives(
  archives
) {

  localStorage.setItem(
    MUSIC_ALBUM_ARCHIVE_KEY,
    JSON.stringify(archives)
  );

}


// ======================================================
// LOAD ONE ALBUM
// ======================================================

function loadMusicAlbumArchive(
  album
) {

  if (!album) return;


  const archives =
    loadMusicAlbumArchives();


  const saved =
    archives[album.id] || {};


  if (musicAlbumFirstImpression) {

    musicAlbumFirstImpression.value =
      saved.firstImpression || "";

  }


  if (musicAlbumNumberOneStage) {

    musicAlbumNumberOneStage.value =
      saved.numberOneStage || "";

  }


  if (musicAlbumMemory) {

    musicAlbumMemory.value =
      saved.memory || "";

  }


  // No.1 SONG候補を毎回そのアルバムから生成
  if (musicAlbumNumberOneSong) {

    musicAlbumNumberOneSong.innerHTML = `

      <option value="">
        選んでね 🎧
      </option>

    `;


    const albumSongs =
      album.tracks
        .map(songId =>
          treasureSongs.find(
            song =>
              song.id === songId
          )
        )
        .filter(Boolean);


    albumSongs.forEach(song => {

      const option =
        document.createElement(
          "option"
        );

      option.value =
        String(song.id);

      option.textContent =
        song.title;

      musicAlbumNumberOneSong
        .appendChild(
          option
        );

    });


    musicAlbumNumberOneSong.value =
      saved.numberOneSong
        ? String(saved.numberOneSong)
        : "";

  }


  if (musicAlbumArchiveSaved) {

    musicAlbumArchiveSaved.style.display =
      "none";

  }

}


// ======================================================
// SAVE CURRENT ALBUM
// ======================================================

if (musicAlbumArchiveSave) {

  musicAlbumArchiveSave
    .addEventListener(
      "click",
      () => {

        if (!currentMusicAlbumId) {
          return;
        }


        const archives =
          loadMusicAlbumArchives();


        archives[
          currentMusicAlbumId
        ] = {

          firstImpression:
            musicAlbumFirstImpression
              ? musicAlbumFirstImpression
                  .value.trim()
              : "",


          numberOneSong:
            musicAlbumNumberOneSong &&
            musicAlbumNumberOneSong.value
              ? Number(
                  musicAlbumNumberOneSong
                    .value
                )
              : null,


          numberOneStage:
            musicAlbumNumberOneStage
              ? musicAlbumNumberOneStage
                  .value.trim()
              : "",


          memory:
            musicAlbumMemory
              ? musicAlbumMemory
                  .value.trim()
              : ""

        };


        saveMusicAlbumArchives(
          archives
        );


        if (musicAlbumArchiveSaved) {

          musicAlbumArchiveSaved
            .style.display =
            "block";


          setTimeout(
            () => {

              musicAlbumArchiveSaved
                .style.display =
                "none";

            },
            1600
          );

        }

      }
    );

}
// ======================================================
// 👑 MUSIC MY RANKING
// ======================================================

const MUSIC_RANKING_KEY =
  "treasure-music-ranking";


const musicRankingOpen =
  document.getElementById(
    "music-ranking-open"
  );

const musicRankingPage =
  document.getElementById(
    "music-ranking-page"
  );

const musicRankingBack =
  document.getElementById(
    "music-ranking-back"
  );

const musicRankingList =
  document.getElementById(
    "music-ranking-list"
  );

const musicRankingSave =
  document.getElementById(
    "music-ranking-save"
  );

const musicRankingSaved =
  document.getElementById(
    "music-ranking-saved"
  );


// ======================================================
// LOAD RANKING
// ======================================================

function loadMusicRanking() {

  try {

    const saved =
      JSON.parse(
        localStorage.getItem(
          MUSIC_RANKING_KEY
        )
      );

    return Array.isArray(saved)
      ? saved
      : [];

  } catch (error) {

    return [];

  }

}


// ======================================================
// CREATE RANKING
// ======================================================

function renderMusicRanking() {

  if (!musicRankingList) {
    return;
  }


  const savedRanking =
    loadMusicRanking();


  musicRankingList.innerHTML =
    "";


  for (
    let position = 1;
    position <= 10;
    position++
  ) {

    const row =
      document.createElement(
        "div"
      );

    row.className =
      "music-ranking-row";


    const rankLabel =
      position === 1
        ? "👑 1"
        : String(position);


    row.innerHTML = `

      <div class="music-ranking-position">
        ${rankLabel}
      </div>

      <select
        class="music-ranking-select"
        data-position="${position}"
      >

        <option value="">
          曲を選ぶ 🎧
        </option>

      </select>

    `;


    const select =
      row.querySelector(
        ".music-ranking-select"
      );


    treasureSongs.forEach(song => {

      const option =
        document.createElement(
          "option"
        );

      option.value =
        String(song.id);

      option.textContent =
        `${song.title} · ${song.year}`;

      select.appendChild(
        option
      );

    });


    const savedSongId =
      savedRanking[
        position - 1
      ];


    if (savedSongId) {

      select.value =
        String(savedSongId);

    }


    musicRankingList
      .appendChild(
        row
      );

  }


  updateMusicRankingOptions();

}


// ======================================================
// PREVENT DUPLICATES
// ======================================================

function updateMusicRankingOptions() {

  const selects = [
    ...document.querySelectorAll(
      ".music-ranking-select"
    )
  ];


  const selectedIds =
    selects
      .map(
        select =>
          select.value
      )
      .filter(Boolean);


  selects.forEach(select => {

    const currentValue =
      select.value;


    [
      ...select.options
    ].forEach(option => {

      if (!option.value) {
        return;
      }


      option.disabled =
        selectedIds.includes(
          option.value
        ) &&
        option.value !==
          currentValue;

    });

  });

}


// ======================================================
// SELECT CHANGE
// ======================================================

if (musicRankingList) {

  musicRankingList
    .addEventListener(
      "change",
      event => {

        if (
          !event.target.classList
            .contains(
              "music-ranking-select"
            )
        ) {
          return;
        }


        updateMusicRankingOptions();

      }
    );

}


// ======================================================
// SAVE
// ======================================================

if (musicRankingSave) {

  musicRankingSave
    .addEventListener(
      "click",
      () => {

        const selects = [
          ...document.querySelectorAll(
            ".music-ranking-select"
          )
        ];


        const ranking =
          selects.map(
            select =>
              select.value
                ? Number(
                    select.value
                  )
                : null
          );


        localStorage.setItem(
          MUSIC_RANKING_KEY,
          JSON.stringify(
            ranking
          )
        );


        if (musicRankingSaved) {

          musicRankingSaved
            .style.display =
            "block";


          setTimeout(
            () => {

              musicRankingSaved
                .style.display =
                "none";

            },
            1600
          );

        }

      }
    );

}


// ======================================================
// MUSIC → RANKING
// ======================================================

if (
  musicRankingOpen &&
  musicRankingPage
) {

  musicRankingOpen
    .addEventListener(
      "click",
      () => {

        renderMusicRanking();


        musicPage.style.display =
          "none";


        musicRankingPage
          .style.display =
          "block";


        musicRankingPage
          .scrollTop = 0;

      }
    );

}


// ======================================================
// RANKING → MUSIC
// ======================================================

if (
  musicRankingBack &&
  musicRankingPage
) {

  musicRankingBack
    .addEventListener(
      "click",
      () => {

        musicRankingPage
          .style.display =
          "none";


        musicPage.style.display =
          "block";


        musicPage.scrollTop =
          0;

      }
    );

}
// ======================================================
// 🏆 TREASURE WORLD CUP
// ======================================================

const MUSIC_WORLDCUP_STATE_KEY =
  "treasure-music-worldcup-state";

const MUSIC_WORLDCUP_RESULT_KEY =
  "treasure-music-worldcup-result";
const MUSIC_WORLDCUP_HISTORY_KEY =
  "treasure-music-worldcup-history";

const musicWorldcupOpen =
  document.getElementById(
    "music-worldcup-open"
  );

const musicWorldcupPage =
  document.getElementById(
    "music-worldcup-page"
  );

const musicWorldcupBack =
  document.getElementById(
    "music-worldcup-back"
  );

const musicWorldcupStart =
  document.getElementById(
    "music-worldcup-start"
  );

const musicWorldcupBattle =
  document.getElementById(
    "music-worldcup-battle"
  );

const musicWorldcupResult =
  document.getElementById(
    "music-worldcup-result"
  );

const musicWorldcupStartButton =
  document.getElementById(
    "music-worldcup-start-button"
  );

const musicWorldcupContinueButton =
  document.getElementById(
    "music-worldcup-continue-button"
  );

const musicWorldcupSongCount =
  document.getElementById(
    "music-worldcup-song-count"
  );

const musicWorldcupBattleNumber =
  document.getElementById(
    "music-worldcup-battle-number"
  );

const musicWorldcupProgressText =
  document.getElementById(
    "music-worldcup-progress-text"
  );

const musicWorldcupProgressBar =
  document.getElementById(
    "music-worldcup-progress-bar"
  );

const musicWorldcupChoiceA =
  document.getElementById(
    "music-worldcup-choice-a"
  );

const musicWorldcupChoiceB =
  document.getElementById(
    "music-worldcup-choice-b"
  );

const musicWorldcupChoiceAYear =
  document.getElementById(
    "music-worldcup-choice-a-year"
  );

const musicWorldcupChoiceBYear =
  document.getElementById(
    "music-worldcup-choice-b-year"
  );

const musicWorldcupChoiceATitle =
  document.getElementById(
    "music-worldcup-choice-a-title"
  );

const musicWorldcupChoiceBTitle =
  document.getElementById(
    "music-worldcup-choice-b-title"
  );

const musicWorldcupWinner =
  document.getElementById(
    "music-worldcup-winner"
  );

const musicWorldcupResultList =
  document.getElementById(
    "music-worldcup-result-list"
  );

const musicWorldcupApplyRanking =
  document.getElementById(
    "music-worldcup-apply-ranking"
  );

const musicWorldcupRestart =
  document.getElementById(
    "music-worldcup-restart"
  );

const musicWorldcupLastResultButton =
  document.getElementById(
    "music-worldcup-last-result-button"
  );

const musicWorldcupResultDate =
  document.getElementById(
    "music-worldcup-result-date"
  );
const musicWorldcupHistoryButton =
  document.getElementById(
    "music-worldcup-history-button"
  );

const musicWorldcupHistory =
  document.getElementById(
    "music-worldcup-history"
  );

const musicWorldcupHistoryList =
  document.getElementById(
    "music-worldcup-history-list"
  );

const musicWorldcupHistoryEmpty =
  document.getElementById(
    "music-worldcup-history-empty"
  );

const musicWorldcupHistoryBack =
  document.getElementById(
    "music-worldcup-history-back"
  );
const musicWorldcupResultHistoryBack =
  document.getElementById(
    "music-worldcup-result-history-back"
  );
// ======================================================
// STATE
// ======================================================

let musicWorldcupState = null;
let musicWorldcupResultFromHistory =
  false;

// ======================================================
// HELPERS
// ======================================================

function shuffleMusicWorldcupSongs(items) {

  const array = [...items];

  for (
    let i = array.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(
        Math.random() * (i + 1)
      );

    [
      array[i],
      array[j]
    ] = [
      array[j],
      array[i]
    ];

  }

  return array;

}


function saveMusicWorldcupState() {

  if (!musicWorldcupState) {
    return;
  }

  localStorage.setItem(
    MUSIC_WORLDCUP_STATE_KEY,
    JSON.stringify(
      musicWorldcupState
    )
  );

}


function loadMusicWorldcupState() {

  try {

    const saved =
      JSON.parse(
        localStorage.getItem(
          MUSIC_WORLDCUP_STATE_KEY
        )
      );

    if (
      saved &&
      Array.isArray(saved.sorted) &&
      Array.isArray(saved.remaining)
    ) {

      return saved;

    }

  } catch (error) {
    console.error(
      "WORLD CUP STATE LOAD ERROR:",
      error
    );
  }

  return null;

}


function clearMusicWorldcupState() {

  localStorage.removeItem(
    MUSIC_WORLDCUP_STATE_KEY
  );

}


function saveMusicWorldcupResult(
  result
) {

  const data = {

    completedAt:
      new Date().toISOString(),

    ranking:
      result

  };


  localStorage.setItem(
    MUSIC_WORLDCUP_RESULT_KEY,
    JSON.stringify(data)
  );

}
function loadMusicWorldcupResult() {

  try {

    const saved =
      JSON.parse(
        localStorage.getItem(
          MUSIC_WORLDCUP_RESULT_KEY
        )
      );


    // 新形式
    if (
      saved &&
      Array.isArray(saved.ranking)
    ) {

      return {
        ranking:
          saved.ranking,

        completedAt:
          saved.completedAt || null
      };

    }


    // 旧形式
// 初回WORLD CUP結果を日時つきで新形式へ変換
if (
  Array.isArray(saved)
) {

  const migrated = {

    ranking:
      saved,

    completedAt:
      "2026-08-22T21:30:00+09:00"

  };


  localStorage.setItem(
    MUSIC_WORLDCUP_RESULT_KEY,
    JSON.stringify(migrated)
  );


  return migrated;

}

  } catch (error) {

    console.error(
      "WORLD CUP RESULT LOAD ERROR:",
      error
    );

  }


  return null;

}
function loadMusicWorldcupHistory() {

  try {

    const saved =
      JSON.parse(
        localStorage.getItem(
          MUSIC_WORLDCUP_HISTORY_KEY
        )
      );

    return Array.isArray(saved)
      ? saved
      : [];

  } catch (error) {

    console.error(
      "WORLD CUP HISTORY LOAD ERROR:",
      error
    );

    return [];

  }

}
function saveMusicWorldcupHistory(
  history
) {

  localStorage.setItem(
    MUSIC_WORLDCUP_HISTORY_KEY,
    JSON.stringify(history)
  );

}
function migrateFirstMusicWorldcupResultToHistory() {

  const history =
    loadMusicWorldcupHistory();

  // すでに履歴があるなら何もしない
  if (history.length > 0) {
    return;
  }


  const lastResult =
    loadMusicWorldcupResult();

  if (
    !lastResult ||
    !Array.isArray(lastResult.ranking) ||
    lastResult.ranking.length === 0
  ) {
    return;
  }


  const firstRecord = {

    id:
      "worldcup-1",

    completedAt:
      lastResult.completedAt ||
      "2026-08-22T21:30:00+09:00",

    ranking:
      [...lastResult.ranking]

  };


  saveMusicWorldcupHistory(
    [firstRecord]
  );

}
// ======================================================
// 🏆 WORLD CUP HISTORY RENDER
// ======================================================

function renderMusicWorldcupHistory() {

  if (
    !musicWorldcupHistoryList ||
    !musicWorldcupHistoryEmpty
  ) {
    return;
  }

  const history =
    loadMusicWorldcupHistory();

  musicWorldcupHistoryList.innerHTML =
    "";

  if (history.length === 0) {

    musicWorldcupHistoryEmpty.style.display =
      "block";

    return;
  }

  musicWorldcupHistoryEmpty.style.display =
    "none";

  const newestFirst =
    [...history].reverse();

  newestFirst.forEach(
    (record, reverseIndex) => {

      const originalIndex =
        history.length -
        reverseIndex -
        1;

      const winner =
        treasureSongs.find(
          song =>
            song.id ===
            record.ranking[0]
        );

      const second =
        treasureSongs.find(
          song =>
            song.id ===
            record.ranking[1]
        );

      const third =
        treasureSongs.find(
          song =>
            song.id ===
            record.ranking[2]
        );

      const date =
        record.completedAt
          ? new Date(
              record.completedAt
            )
          : null;

      const dateText =
        date
          ? date.toLocaleString(
              "ja-JP",
              {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
              }
            )
          : "日時記録なし";

      const card =
        document.createElement(
          "button"
        );

      card.type =
        "button";

      card.className =
        "music-worldcup-history-card";

      card.dataset.historyIndex =
        String(originalIndex);

      card.innerHTML = `

        <div class="music-worldcup-history-card-head">

          <strong>
            🏆 WORLD CUP #${String(
              originalIndex + 1
            ).padStart(2, "0")}
          </strong>

          <span>
            ${dateText}
          </span>

        </div>

        <div class="music-worldcup-history-top3">

          <div class="music-worldcup-history-rank">
            <span>🥇</span>
            <strong>
              ${winner ? winner.title : "-"}
            </strong>
          </div>

          <div class="music-worldcup-history-rank">
            <span>🥈</span>
            <strong>
              ${second ? second.title : "-"}
            </strong>
          </div>

          <div class="music-worldcup-history-rank">
            <span>🥉</span>
            <strong>
              ${third ? third.title : "-"}
            </strong>
          </div>

        </div>

      `;

     card.addEventListener(
  "click",
  () => {

    const previousRecord =
      originalIndex > 0
        ? history[
            originalIndex - 1
          ]
        : null;


    const previousRanking =
      previousRecord &&
      Array.isArray(
        previousRecord.ranking
      )
        ? previousRecord.ranking
        : null;


    musicWorldcupHistory.style.display =
      "none";
musicWorldcupResultFromHistory =
  true;

    renderMusicWorldcupResult(
      record.ranking,
      record.completedAt,
      previousRanking
    );

  }
);

      musicWorldcupHistoryList
        .appendChild(card);

    }
  );

}
// ======================================================
// START NEW WORLD CUP
// ======================================================

function startNewMusicWorldcup() {

  const shuffled =
    shuffleMusicWorldcupSongs(
      treasureSongs.map(
        song => song.id
      )
    );


  /*
    insertion sort型。

    最初の1曲をsortedに置いて、
    残りを1曲ずつ既存順位へ挿入していく。

    2択だけで全順位を作れる。
  */

  musicWorldcupState = {

    sorted: [
      shuffled[0]
    ],

    remaining:
      shuffled.slice(1),

    currentSongId: null,

    compareIndex: null,

    low: null,

    high: null,

    battleCount: 0,

    completed: false

  };


  prepareNextMusicWorldcupSong();

  saveMusicWorldcupState();

}


// ======================================================
// NEXT SONG
// ======================================================

function prepareNextMusicWorldcupSong() {

  if (
    !musicWorldcupState
  ) {
    return;
  }


  // 全曲終了
  if (
    musicWorldcupState
      .remaining.length === 0
  ) {

    finishMusicWorldcup();
    return;

  }


  musicWorldcupState.currentSongId =
    musicWorldcupState
      .remaining.shift();


  // 二分探索で順位位置を探す
  musicWorldcupState.low =
    0;

  musicWorldcupState.high =
    musicWorldcupState
      .sorted.length;


  prepareMusicWorldcupComparison();

}


// ======================================================
// PREPARE COMPARISON
// ======================================================

function prepareMusicWorldcupComparison() {

  const state =
    musicWorldcupState;


  if (!state) {
    return;
  }


  /*
    low === high になったら
    挿入位置確定
  */

  if (
    state.low >= state.high
  ) {

    state.sorted.splice(
      state.low,
      0,
      state.currentSongId
    );


    state.currentSongId =
      null;


    state.compareIndex =
      null;


    saveMusicWorldcupState();


    prepareNextMusicWorldcupSong();

    return;

  }


  state.compareIndex =
    Math.floor(
      (
        state.low +
        state.high
      ) / 2
    );


  state.battleCount++;


  saveMusicWorldcupState();

  renderMusicWorldcupBattle();

}


// ======================================================
// CURRENT SONGS
// ======================================================

function getCurrentMusicWorldcupSongs() {

  if (
    !musicWorldcupState
  ) {
    return null;
  }


  const newSong =
    treasureSongs.find(
      song =>
        song.id ===
        musicWorldcupState.currentSongId
    );


  const rankedSongId =
    musicWorldcupState
      .sorted[
        musicWorldcupState
          .compareIndex
      ];


  const rankedSong =
    treasureSongs.find(
      song =>
        song.id ===
        rankedSongId
    );


  if (
    !newSong ||
    !rankedSong
  ) {
    return null;
  }


  return {
    newSong,
    rankedSong
  };

}


// ======================================================
// RENDER BATTLE
// ======================================================

function renderMusicWorldcupBattle() {

  const songs =
    getCurrentMusicWorldcupSongs();


  if (!songs) {
    return;
  }


  musicWorldcupStart.style.display =
    "none";

  musicWorldcupResult.style.display =
    "none";

  musicWorldcupBattle.style.display =
    "block";


  /*
    左右を毎回ランダムにする。
    同じ側ばかり選ぶクセ対策🤣
  */

  const reverse =
    Math.random() < 0.5;


  const songA =
    reverse
      ? songs.rankedSong
      : songs.newSong;


  const songB =
    reverse
      ? songs.newSong
      : songs.rankedSong;


  musicWorldcupChoiceA.dataset.songId =
    String(songA.id);

  musicWorldcupChoiceB.dataset.songId =
    String(songB.id);


  musicWorldcupChoiceAYear.textContent =
    songA.year;

  musicWorldcupChoiceBYear.textContent =
    songB.year;


  musicWorldcupChoiceATitle.textContent =
    songA.title;

  musicWorldcupChoiceBTitle.textContent =
    songB.title;


  musicWorldcupBattleNumber.textContent =
    musicWorldcupState
      .battleCount;


  const completedSongs =
    musicWorldcupState
      .sorted.length;


  const totalSongs =
    treasureSongs.length;


  musicWorldcupProgressText.textContent =
    `${completedSongs} / ${totalSongs} SONGS`;


  const progress =
    Math.min(
      100,
      (
        completedSongs /
        totalSongs
      ) * 100
    );


  musicWorldcupProgressBar.style.width =
    `${progress}%`;

}


// ======================================================
// CHOOSE SONG
// ======================================================

function chooseMusicWorldcupSong(
  selectedSongId
) {

  if (
    !musicWorldcupState
  ) {
    return;
  }


  const state =
    musicWorldcupState;


  const currentSongId =
    state.currentSongId;


  const rankedSongId =
    state.sorted[
      state.compareIndex
    ];


  /*
    sortedは
    1位 → 最下位
    の順。

    新曲が比較相手より好き
    → より上側を探索

    比較相手の方が好き
    → より下側を探索
  */


  if (
    Number(selectedSongId) ===
    currentSongId
  ) {

    // 新曲の方が上
    state.high =
      state.compareIndex;

  } else if (
    Number(selectedSongId) ===
    rankedSongId
  ) {

    // 既存曲の方が上
    state.low =
      state.compareIndex + 1;

  } else {

    return;

  }


  saveMusicWorldcupState();

  prepareMusicWorldcupComparison();

}


// ======================================================
// CHOICE EVENTS
// ======================================================

if (musicWorldcupChoiceA) {

  musicWorldcupChoiceA
    .addEventListener(
      "click",
      () => {

        chooseMusicWorldcupSong(
          Number(
            musicWorldcupChoiceA
              .dataset.songId
          )
        );

      }
    );

}


if (musicWorldcupChoiceB) {

  musicWorldcupChoiceB
    .addEventListener(
      "click",
      () => {

        chooseMusicWorldcupSong(
          Number(
            musicWorldcupChoiceB
              .dataset.songId
          )
        );

      }
    );

}


// ======================================================
// FINISH
// ======================================================

function finishMusicWorldcup() {

  if (
    !musicWorldcupState
  ) {
    return;
  }


  musicWorldcupState.completed =
    true;


  const result =
    [
      ...musicWorldcupState.sorted
    ];


 saveMusicWorldcupResult(
  result
);


const savedResult =
  loadMusicWorldcupResult();
const history =
  loadMusicWorldcupHistory();


const newRecord = {

  id:
    `worldcup-${history.length + 1}`,

  completedAt:
    savedResult.completedAt,

  ranking:
    [...savedResult.ranking]

};


history.push(
  newRecord
);


saveMusicWorldcupHistory(
  history
);

clearMusicWorldcupState();

musicWorldcupState =
  null;

musicWorldcupResultFromHistory =
  false;

renderMusicWorldcupResult(
  savedResult.ranking,
  savedResult.completedAt
);


}


// ======================================================
// RESULT
// ======================================================

function renderMusicWorldcupResult(
  result,
  completedAt = null,
  previousRanking = null
) {
  if (
    !Array.isArray(result) ||
    result.length === 0
  ) {
    return;
  }


  musicWorldcupStart.style.display =
    "none";

  musicWorldcupBattle.style.display =
    "none";

  musicWorldcupResult.style.display =
    "block";
  if (
  musicWorldcupResultHistoryBack
) {

  musicWorldcupResultHistoryBack
    .style.display =
    musicWorldcupResultFromHistory
      ? "block"
      : "none";

}
if (musicWorldcupResultDate) {

  if (completedAt) {

    const date =
      new Date(completedAt);

    musicWorldcupResultDate.textContent =
      `🕘 ${date.toLocaleString("ja-JP")}`;

  } else {

    musicWorldcupResultDate.textContent =
      "🕘 実施日時：記録なし";

  }

}

  const winner =
    treasureSongs.find(
      song =>
        song.id === result[0]
    );


  if (winner) {

    musicWorldcupWinner.innerHTML = `

      <div class="music-worldcup-winner-card">

        <span>
          🏆
        </span>

        <small>
          MY No.1 SONG
        </small>

        <strong>
          ${winner.title}
        </strong>

      </div>

    `;

  }


  musicWorldcupResultList.innerHTML =
    "";


  result.forEach(
    (songId, index) => {

      const song =
        treasureSongs.find(
          item =>
            item.id === songId
        );

let changeText =
  "";


if (
  Array.isArray(previousRanking)
) {

  const previousIndex =
    previousRanking.indexOf(
      songId
    );


  if (previousIndex !== -1) {

    const difference =
      previousIndex - index;


    if (difference > 0) {

      changeText =
        `↑ ${difference}`;

    } else if (difference < 0) {

      changeText =
        `↓ ${Math.abs(difference)}`;

    } else {

      changeText =
        "—";

    }

  }

}
      if (!song) {
        return;
      }


      const row =
        document.createElement(
          "div"
        );


      row.className =
        "music-worldcup-result-row";


     row.innerHTML = `

  <div class="music-worldcup-result-rank">
    ${index + 1}
  </div>

  <strong>
    ${song.title}
  </strong>

  ${
    changeText
      ? `
        <span class="music-worldcup-rank-change">
          ${changeText}
        </span>
      `
      : ""
  }

  <span>
    ${song.year}
  </span>

`;


      musicWorldcupResultList
        .appendChild(
          row
        );

    }
  );


  musicWorldcupPage.scrollTop =
    0;

}


// ======================================================
// START BUTTON
// ======================================================
migrateFirstMusicWorldcupResultToHistory();
if (musicWorldcupStartButton) {

  musicWorldcupStartButton
    .addEventListener(
      "click",
      () => {

        /*
          途中データがある時に
          START押下した場合は確認
        */

        const oldState =
          loadMusicWorldcupState();


        if (oldState) {

          const restart =
            window.confirm(
              "途中のWORLD CUPがあります。\n最初からやり直しますか？"
            );


          if (!restart) {
            return;
          }

        }


        clearMusicWorldcupState();

        startNewMusicWorldcup();

      }
    );

}


// ======================================================
// CONTINUE
// ======================================================

if (
  musicWorldcupContinueButton
) {

  musicWorldcupContinueButton
    .addEventListener(
      "click",
      () => {

        const saved =
          loadMusicWorldcupState();


        if (!saved) {
          return;
        }


        musicWorldcupState =
          saved;


        renderMusicWorldcupBattle();

      }
    );

}
// ======================================================
// 🏆 OPEN WORLD CUP HISTORY
// ======================================================

if (
  musicWorldcupHistoryButton
) {

  musicWorldcupHistoryButton
    .addEventListener(
      "click",
      () => {

        renderMusicWorldcupHistory();

        musicWorldcupStart.style.display =
          "none";

        musicWorldcupBattle.style.display =
          "none";

        musicWorldcupResult.style.display =
          "none";

        musicWorldcupHistory.style.display =
          "block";

        musicWorldcupPage.scrollTop =
          0;

      }
    );

}
// ======================================================
// 🏆 HISTORY → WORLD CUP
// ======================================================

if (
  musicWorldcupHistoryBack
) {

  musicWorldcupHistoryBack
    .addEventListener(
      "click",
      () => {

        musicWorldcupHistory.style.display =
          "none";

        musicWorldcupBattle.style.display =
          "none";

        musicWorldcupResult.style.display =
          "none";

        musicWorldcupStart.style.display =
          "block";

        musicWorldcupPage.scrollTop =
          0;

      }
    );

}
// ======================================================
// OPEN WORLD CUP
// ======================================================

function openMusicWorldcup() {

  if (
    musicWorldcupSongCount
  ) {

    musicWorldcupSongCount
      .textContent =
      treasureSongs.length;

  }


  const savedState =
    loadMusicWorldcupState();
const savedResult =
  loadMusicWorldcupResult();

  musicWorldcupStart.style.display =
    "block";

  musicWorldcupBattle.style.display =
    "none";

  musicWorldcupResult.style.display =
    "none";
musicWorldcupHistory.style.display =
  "none";

  if (
    musicWorldcupContinueButton
  ) {

    musicWorldcupContinueButton
      .style.display =
      savedState
        ? "block"
        : "none";

  }
if (
  musicWorldcupLastResultButton
) {

  musicWorldcupLastResultButton
    .style.display =
    savedResult
      ? "block"
      : "none";

}

  musicPage.style.display =
    "none";


  musicWorldcupPage.style.display =
    "block";


  musicWorldcupPage.scrollTop =
    0;

}


if (
  musicWorldcupOpen &&
  musicWorldcupPage
) {

  musicWorldcupOpen
    .addEventListener(
      "click",
      openMusicWorldcup
    );

}


// ======================================================
// WORLD CUP → MUSIC
// ======================================================

if (
  musicWorldcupBack &&
  musicWorldcupPage
) {

  musicWorldcupBack
    .addEventListener(
      "click",
      () => {

        /*
          battle中ならstateは毎回保存済み。
          そのまま閉じてOK。
        */

        musicWorldcupPage.style.display =
          "none";


        musicPage.style.display =
          "block";


        musicPage.scrollTop =
          0;

      }
    );

}


// ======================================================
// APPLY TOP10 → MY RANKING
// ======================================================

if (
  musicWorldcupApplyRanking
) {

  musicWorldcupApplyRanking
    .addEventListener(
      "click",
      () => {

        const savedResult =
          loadMusicWorldcupResult();

        if (
          !savedResult ||
          savedResult.ranking.length === 0
        ) {
          return;
        }

        const top10 =
          savedResult.ranking.slice(
            0,
            10
          );

        localStorage.setItem(
          MUSIC_RANKING_KEY,
          JSON.stringify(top10)
        );

        window.alert(
          "👑 WORLD CUP TOP10を\nMY RANKINGに反映しました！"
        );

      }
    );

}

// ======================================================
// RESTART
// ======================================================

if (musicWorldcupRestart) {

  musicWorldcupRestart
    .addEventListener(
      "click",
      () => {

        const restart =
          window.confirm(
            "WORLD CUPを最初からやり直しますか？"
          );


        if (!restart) {
          return;
        }


        clearMusicWorldcupState();


        musicWorldcupResult.style.display =
          "none";


        musicWorldcupStart.style.display =
          "block";


        if (
          musicWorldcupContinueButton
        ) {

          musicWorldcupContinueButton
            .style.display =
            "none";

        }


        musicWorldcupPage.scrollTop =
          0;

      }
    );

}
if (
  musicWorldcupLastResultButton
) {

  musicWorldcupLastResultButton
    .addEventListener(
      "click",
      () => {

        const savedResult =
          loadMusicWorldcupResult();


        if (!savedResult) {
          return;
        }
musicWorldcupResultFromHistory =
  false;

        renderMusicWorldcupResult(
          savedResult.ranking,
          savedResult.completedAt
        );

      }
    );

}
// ======================================================
// 🏆 RESULT → HISTORY
// ======================================================

if (
  musicWorldcupResultHistoryBack
) {

  musicWorldcupResultHistoryBack
    .addEventListener(
      "click",
      () => {

        musicWorldcupResult.style.display =
          "none";

        musicWorldcupHistory.style.display =
          "block";

        musicWorldcupResultFromHistory =
          false;

        renderMusicWorldcupHistory();

        musicWorldcupPage.scrollTop =
          0;

      }
    );

}
