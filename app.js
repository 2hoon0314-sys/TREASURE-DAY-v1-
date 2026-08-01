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

setTimeout(()=>{

    document.getElementById("splash").style.display="none";

    document.getElementById("app").style.display="block";

},1800);
