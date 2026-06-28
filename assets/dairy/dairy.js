document.addEventListener("DOMContentLoaded", () => {


const editor =
document.getElementById("editor");

editor.innerHTML =
localStorage.getItem("orbloomDiary")
||
"Dear Diary,";



const user =
JSON.parse(
localStorage.getItem(
"FriendUser"
));


const hour =
new Date().getHours();

let greeting = "";

if(hour < 12){

    greeting = "Good Morning";

}
else if(hour < 17){

    greeting = "Good Afternoon";

}
else if(hour < 21){

    greeting = "Good Evening";

}
else{

    greeting = "Good Night";

}

document.getElementById("welcomeText").innerHTML =
`${greeting}, ${user?.name || "Friend"} ✨`;


const saveBtn =
document.getElementById("saveBtn");

saveBtn.addEventListener("click", saveEntry);
function saveEntry(){

    const content =
    editor.innerHTML.trim();

    if(content === ""){

        alert("Write something first ✨");
        return;

    }

   const entries =
JSON.parse(
    localStorage.getItem(
        "friendEntries"
    )
) || [];

    const newEntry = {

        id: Date.now(),

        date: new Date()
        .toLocaleDateString(),

        content: content

    };

    entries.unshift(newEntry);

    localStorage.setItem(
        "friendEntries",
        JSON.stringify(entries)
    );

    renderTimeline();

    alert("🌙 Diary Saved");

}
function renderTimeline(){

    const container =
    document.getElementById(
        "timelineContainer"
    );

    const entries =
    JSON.parse(
        localStorage.getItem(
            "friendEntries"
        )
    ) || [];

    container.innerHTML = "";

    entries.forEach(entry=>{

        const card =
        document.createElement("div");

        card.className =
        "entry";

        card.innerHTML = `

            <span class="entry-date">
                ${entry.date}
            </span>

            <p>
                ${
                entry.content
                .replace(/<[^>]*>/g,"")
                .substring(0,120)
                }
                ...
            </p>

        `;

        container.appendChild(card);

    });

}
renderTimeline();
const moods =
document.querySelectorAll(".mood-grid button");

moods.forEach(btn=>{

btn.addEventListener("click",()=>{

moods.forEach(m=>{
m.style.background="#13092f";
});

  btn.style.background = `
            linear-gradient(
                135deg,
                #d946ef 0%,
                #8b5cf6 40%,
                #3b82f6 75%,
                #22d3ee 100%
            )
        `;
        
});

});









const moodButtons =
document.querySelectorAll(".mood-btn");

const diary =
document.getElementById("editorWrapper");

moodButtons.forEach(btn=>{

    btn.addEventListener("click",()=>{

        const mood =
        btn.dataset.mood;

        changeMood(mood);

    });

});
function changeMood(mood){

switch(mood){

case "happy":

diary.style.setProperty(
"--c1",
"#7399f3"
);

diary.style.setProperty(
"--c2",
"#a85dea"
);

diary.style.setProperty(
"--c3",
"#f072d5"
);

break;


case "sad":

diary.style.setProperty(
"--c1",
"#4facfe"
);

diary.style.setProperty(
"--c2",
"#1e3c72"
);

diary.style.setProperty(
"--c3",
"#6dd5ed"
);

break;


case "calm":

diary.style.setProperty(
"--c1",
"#FFF5F2"
);

diary.style.setProperty(
"--c2",
"#F5BABB"
);

diary.style.setProperty(
"--c3",
"#568F87"
);

break;


case "motivated":

diary.style.setProperty(
"--c1",
"#ff512f"
);

diary.style.setProperty(
"--c2",
"#f09819"
);

diary.style.setProperty(
"--c3",
"#ff9966"
);

break;


case "angry":

diary.style.setProperty(
"--c1",
"#ff0844"
);

diary.style.setProperty(
"--c2",
"#b721ff"
);

diary.style.setProperty(
"--c3",
"#ff4b2b"
);

break;


case "dreamy":

diary.style.setProperty(
"--c1",
"#c471ed"
);

diary.style.setProperty(
"--c2",
"#f64f59"
);

diary.style.setProperty(
"--c3",
"#12c2e9"
);

break;

}

}
});




boldBtn.addEventListener("click", () => {

    document.execCommand("bold");

    boldBtn.classList.toggle("active");

    editor.focus();

});

italicBtn.addEventListener("click", () => {

    document.execCommand("italic");

    italicBtn.classList.toggle("active");

    editor.focus();

});

underlineBtn.addEventListener("click", () => {

    document.execCommand("underline");

    underlineBtn.classList.toggle("active");

    editor.focus();

});















const sidebar=document.querySelector(".sidebar");

const hamburger=document.querySelector(".hamburger");

const overlay=document.querySelector(".mobile-overlay");

hamburger.onclick=()=>{

sidebar.classList.add("open");

overlay.classList.add("show");

}

overlay.onclick=()=>{

sidebar.classList.remove("open");

overlay.classList.remove("show");

}
let startX=0;

document.addEventListener("touchstart",e=>{

startX=e.touches[0].clientX;

});

document.addEventListener("touchend",e=>{

let endX=e.changedTouches[0].clientX;

if(startX<25 && endX-startX>90){

sidebar.classList.add("open");

overlay.classList.add("show");

}

});
moodFab.onclick=()=>{

document
.querySelector(".mood-card")
.classList.toggle("open");

}