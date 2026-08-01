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

const saved =
JSON.parse(localStorage.getItem("treasure-checklist")) || {};

function render(){

    checklist.innerHTML="";

    let checked = 0;

    items.forEach(item=>{

        const row=document.createElement("label");
        row.className="item";

        const input=document.createElement("input");
        input.type="checkbox";
        input.checked=saved[item]||false;

        if(input.checked) checked++;

        input.addEventListener("change",()=>{

            saved[item]=input.checked;

            localStorage.setItem(
"treasure-checklist",
                JSON.stringify(saved)
            );

            render();

        });

        const span=document.createElement("span");
        span.textContent=item;

        row.appendChild(input);
        row.appendChild(span);

        checklist.appendChild(row);

    });

    const value=Math.round((checked/items.length)*100);

    progressBar.style.width=value+"%";

    percent.textContent=value+"%";

}

render();
document.getElementById("check-all").addEventListener("click",()=>{

    items.forEach(item=>{
        saved[item]=true;
    });

    localStorage.setItem(
        "treasure-day",
        JSON.stringify(saved)
    );

    render();

});

document.getElementById("clear-all").addEventListener("click",()=>{

    items.forEach(item=>{
        saved[item]=false;
    });

    localStorage.setItem(
        "treasure-day",
        JSON.stringify(saved)
    );

    render();

});
const eventDate = new Date("2026-08-01");
const today = new Date();

eventDate.setHours(0,0,0,0);
today.setHours(0,0,0,0);

const diff = Math.ceil((eventDate - today)/(1000*60*60*24));

const dday = document.getElementById("dday");

if(diff > 0){
    dday.textContent = "D-" + diff;
}else if(diff === 0){
    dday.textContent = "TODAY 💎";
}else{
    dday.textContent = "THANK YOU 💙";
}
setTimeout(()=>{

    document.getElementById("splash").style.display="none";

    document.getElementById("app").style.display="block";

},1800);
const homeTab = document.getElementById("home-tab");
const planTab = document.getElementById("plan-tab");
const memoryTab =
document.getElementById("memory-tab");
const settingsTab = document.getElementById("settings-tab");
const homePage = document.querySelector("main");
const planPage = document.getElementById("plan-page");
const memoryPage =
document.getElementById("memory-page");
const settingsPage = document.getElementById("settings-page");
homeTab.addEventListener("click",()=>{

    homePage.style.display="block";
    planPage.style.display="none";
memoryPage.style.display="none";
  settingsPage.style.display="none";
    homeTab.classList.add("active");
    planTab.classList.remove("active");
memoryTab.classList.remove("active");
settingsTab.classList.remove("active");

// 保存した推しメンをHOMEに反映
const savedHomeMember = localStorage.getItem("treasure-member") || "JIHOON";
const homeMemberDisplay = document.getElementById("home-member");

if (homeMemberDisplay) {
  homeMemberDisplay.textContent = savedHomeMember;
}

});

planTab.addEventListener("click",()=>{

    homePage.style.display="none";
    planPage.style.display="block";
memoryPage.style.display="none";
  settingsPage.style.display="none";
    planTab.classList.add("active");
    homeTab.classList.remove("active");
memoryTab.classList.remove("active");
  settingsTab.classList.remove("active");
});
memoryTab.addEventListener("click",()=>{

    homePage.style.display="none";
    planPage.style.display="none";
    memoryPage.style.display="block";
  
settingsPage.style.display="none";
    homeTab.classList.remove("active");
    planTab.classList.remove("active");
    memoryTab.classList.add("active");
  settingsTab.classList.remove("active");

});
settingsTab.addEventListener("click",()=>{

  homePage.style.display="none";
  planPage.style.display="none";
  memoryPage.style.display="none";
  settingsPage.style.display="block";

  homeTab.classList.remove("active");
  planTab.classList.remove("active");
  memoryTab.classList.remove("active");
  settingsTab.classList.add("active");

});
// ===== MEMORY 保存機能 =====

const memoryTitle = document.getElementById("memory-title");
const memoryText = document.getElementById("memory-text");
const saveMemoryBtn = document.getElementById("save-memory");
const memoryList = document.getElementById("memory-list");

let memories =
  JSON.parse(localStorage.getItem("treasure-memories")) || [];

function renderMemories(){

  memoryList.innerHTML = "";

  memories.forEach((memory)=>{

    const card = document.createElement("div");
    card.className = "memory-card";

    const title = document.createElement("h3");
    title.textContent = memory.title;

    const text = document.createElement("p");
    text.textContent = memory.text;

    card.appendChild(title);
    card.appendChild(text);

    memoryList.appendChild(card);

  });

}

saveMemoryBtn.addEventListener("click",()=>{

  const title = memoryTitle.value.trim();
  const text = memoryText.value.trim();

  if(title === "" && text === ""){
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

  memoryTitle.value = "";
  memoryText.value = "";

  renderMemories();

});

renderMemories();
// ===== THEME 設定 =====
const themeToggle = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("treasure-theme") || "dark";

function applyTheme(theme) {
  if (theme === "light") {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "DARK MODE";
  } else {
    document.body.classList.remove("light-mode");
    themeToggle.textContent = "LIGHT MODE";
  }
}

applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.contains("light-mode");
  const newTheme = isLight ? "dark" : "light";

  localStorage.setItem("treasure-theme", newTheme);
  applyTheme(newTheme);
});
// ===== 推しメン設定 =====

const memberSelect = document.getElementById("member-select");

// 保存済みの推しメンを読み込む
const savedMember = localStorage.getItem("treasure-member");

if (savedMember) {
  memberSelect.value = savedMember;
}

// メンバーを選んだら保存
memberSelect.addEventListener("change", () => {
  const selectedMember = memberSelect.value;

  localStorage.setItem("treasure-member", selectedMember);


});
// ===== HOME 推しメン表示 =====
const homeMember = document.getElementById("home-member");

function updateHomeMember() {
  const member =
    localStorage.getItem("treasure-member") || "JIHOON";

  if (homeMember) {
    homeMember.textContent = member;
  }
}

// 最初にHOMEへ反映
updateHomeMember();

// SETTINGSで変更したらHOMEもすぐ変更
memberSelect.addEventListener("change", () => {
  updateHomeMember();
});
// ===== TREASURE DAY 設定 =====
const treasureDayInput = document.getElementById("treasure-day-input");

// 保存済みの日付を読み込む
const savedTreasureDay = localStorage.getItem("treasure-day-date");

if (savedTreasureDay && treasureDayInput) {
  treasureDayInput.value = savedTreasureDay;
}

// 日付を変更したら保存
if (treasureDayInput) {
  treasureDayInput.addEventListener("change", () => {
localStorage.setItem("treasure-day-date", treasureDayInput.value);
  });
}
// ===== TREASURE DAY カウントダウン表示 =====
const treasureCountdown = document.getElementById("treasure-countdown");

function updateTreasureCountdown() {
  const savedDate = localStorage.getItem("treasure-day-date");

  if (!savedDate || !treasureCountdown) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const treasureDate = new Date(savedDate + "T00:00:00");
  const diff = Math.ceil((treasureDate - today) / (1000 * 60 * 60 * 24));

  if (diff > 0) {
    treasureCountdown.textContent = "D-" + diff;
  } else if (diff === 0) {
    treasureCountdown.textContent = "🎉 TODAY IS TREASURE DAY 💎";
  } else {
    treasureCountdown.textContent = "💎 TREASURE DAY 💎";
  }
}

updateTreasureCountdown();

if (treasureDayInput) {
  treasureDayInput.addEventListener("change", () => {
    updateTreasureCountdown();
  });
}
