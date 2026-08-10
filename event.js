// ========================================
// 💎 PLAN DETAIL
// ========================================

// PLANで選んだイベントを取得
const selectedEvent = JSON.parse(
  localStorage.getItem("treasure-selected-event")
);

// 表示エリア
const detailName = document.getElementById("detail-name");
const detailPlace = document.getElementById("detail-place");
const detailDate = document.getElementById("detail-date");

// 入力欄
const detailOpen = document.getElementById("detail-open");
const detailStart = document.getElementById("detail-start");
const detailSeat = document.getElementById("detail-seat");
const detailGo = document.getElementById("detail-go");
const detailReturn = document.getElementById("detail-return");
const detailHotel = document.getElementById("detail-hotel");
const detailMemo = document.getElementById("detail-memo");

// ボタン
const saveDetailBtn = document.getElementById("save-detail");
const backToPlanBtn = document.getElementById("back-to-plan");

if (selectedEvent) {

  // イベント基本情報を表示
  detailName.textContent = selectedEvent.name || "EVENT";

  detailPlace.textContent =
    "📍 " + (selectedEvent.place || "");

  detailDate.textContent =
    "📅 " + (selectedEvent.date
      ? selectedEvent.date.replaceAll("-", ".")
      : "");

  // このイベント専用の保存キー
  const detailKey =
    "treasure-event-detail-" + selectedEvent.id;

  // 保存済みの詳細情報を読み込み
  let savedDetail = {};

  try {
    savedDetail =
      JSON.parse(localStorage.getItem(detailKey)) || {};
  } catch (e) {
    savedDetail = {};
  }

  // 保存済みデータを入力欄へ戻す
  detailOpen.value = savedDetail.open || "";
  detailStart.value = savedDetail.start || "";
  detailSeat.value = savedDetail.seat || "";
  detailGo.value = savedDetail.go || "";
  detailReturn.value = savedDetail.return || "";
  detailHotel.value = savedDetail.hotel || "";
  detailMemo.value = savedDetail.memo || "";

  // 💎 保存
  saveDetailBtn.addEventListener("click", () => {

    const detailData = {
      open: detailOpen.value,
      start: detailStart.value,
      seat: detailSeat.value,
      go: detailGo.value,
      return: detailReturn.value,
      hotel: detailHotel.value,
      memo: detailMemo.value
    };

    localStorage.setItem(
      detailKey,
      JSON.stringify(detailData)
    );

    alert("保存しました💎");
  });
}

// ← PLANに戻る
backToPlanBtn.addEventListener("click", () => {
  window.history.back();
});
// ========================================
// 🎒 持ち物チェックリスト
// ========================================

const packingList = document.getElementById("packing-list");
const packingInput = document.getElementById("packing-input");
const packingAddBtn = document.getElementById("packing-add-btn");

let packingItems = [];

// イベント専用の持ち物保存キー
const packingKey = selectedEvent
  ? "treasure-packing-" + selectedEvent.id
  : "treasure-packing";

// 保存済みの持ち物を読み込み
try {
  packingItems =
    JSON.parse(localStorage.getItem(packingKey)) || [];
} catch (e) {
  packingItems = [];
}

// 保存
function savePackingList() {
  localStorage.setItem(
    packingKey,
    JSON.stringify(packingItems)
  );
}

// 表示
function renderPackingList() {
  packingList.innerHTML = "";

  packingItems.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "packing-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.checked;

    // ☑️ チェック状態を保存
    checkbox.addEventListener("change", () => {
      packingItems[index].checked = checkbox.checked;
      savePackingList();
    });

    const text = document.createElement("span");
    text.textContent = item.text;

    // 🗑️ 削除
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "削除";

    deleteBtn.addEventListener("click", () => {
      packingItems.splice(index, 1);
      savePackingList();
      renderPackingList();
    });

    row.appendChild(checkbox);
    row.appendChild(text);
    row.appendChild(deleteBtn);

    packingList.appendChild(row);
  });
}

// ＋追加
packingAddBtn.addEventListener("click", () => {
  const text = packingInput.value.trim();

  if (!text) return;

  packingItems.push({
    text: text,
    checked: false
  });

  packingInput.value = "";

  savePackingList();
  renderPackingList();
});

// 最初に表示
renderPackingList();
