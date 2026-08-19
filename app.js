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
const memorySong =
  document.getElementById("memory-song");
const memoryLink =
  document.getElementById("memory-link");
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


// ← PHOTO MEMORYに戻る
const photoMemoryDetailBackBtn =
  document.getElementById("photo-memory-detail-back");

if (photoMemoryDetailBackBtn) {
  photoMemoryDetailBackBtn.addEventListener(
    "click",
    () => {
      const detailPage =
        document.getElementById(
          "photo-memory-detail-page"
        );

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
  title: title || "TREASURE MEMORY 💎",
  text: text,
  song: song,
 link: link, 
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
const jihoonBookClose = document.querySelector(".jihoon-book-close");

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
// =========================================
// 📸 JIHOON VISUAL BOOK OPEN / CLOSE
// =========================================

const jihoonVisualBook = document.getElementById("jihoonVisualBook");
const jihoonVisualClose = document.querySelector(".jihoon-visual-close");
const jihoonMenuCards = document.querySelectorAll(".jihoon-book-menu-card");


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

    document.body.style.overflow = "hidden";
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

document.body.style.overflow = "hidden";
  });
});
}
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
