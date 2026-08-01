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
JSON.parse(localStorage.getItem("treasure-day")) || {};

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
                "treasure-day",
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

    homeTab.classList.remove("active");
    planTab.classList.remove("active");
    memoryTab.classList.add("active");

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
