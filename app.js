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

const homePage = document.querySelector("main");
const planPage = document.getElementById("plan-page");

homeTab.addEventListener("click",()=>{

    homePage.style.display="block";
    planPage.style.display="none";

    homeTab.classList.add("active");
    planTab.classList.remove("active");

});

planTab.addEventListener("click",()=>{

    homePage.style.display="none";
    planPage.style.display="block";

    planTab.classList.add("active");
    homeTab.classList.remove("active");

});
