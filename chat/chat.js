/* =========================
   MOUSE SPOTLIGHT
========================= */

const spotlight =
document.querySelector(".spotlight");

document.addEventListener("mousemove",(e)=>{

spotlight.style.left =
e.clientX + "px";

spotlight.style.top =
e.clientY + "px";

});

/* =========================
   TYPING PLACEHOLDER
========================= */

const phrases = [

"Ask Luna anything...",

"Tell Luna about your day...",

"What's on your mind?",

"Share a memory with Luna...",

"Need someone to talk to?",

"How are you feeling today?"
];

let phraseIndex = 0;

const input =
document.getElementById("messageInput");

setInterval(()=>{

phraseIndex =
(phraseIndex + 1) %
phrases.length;

input.placeholder =
phrases[phraseIndex];

},3000);

/* =========================
   STARS
========================= */

const stars =
document.getElementById("stars");

for(let i=0;i<180;i++){

const star =
document.createElement("span");

star.classList.add("star");

star.style.left =
Math.random()*100+"vw";

star.style.top =
Math.random()*100+"vh";

star.style.opacity =
Math.random();

star.style.animationDelay =
Math.random()*5+"s";

stars.appendChild(star);
}

/* =========================
   GALAXY DUST
========================= */

const dust =
document.getElementById("dust");

for(let i=0;i<40;i++){

const particle =
document.createElement("span");

particle.classList.add("dust-particle");

particle.style.left =
Math.random()*100+"vw";

particle.style.animationDuration =
(10 + Math.random()*10)+"s";

particle.style.animationDelay =
Math.random()*10+"s";

dust.appendChild(particle);
}

/* =========================
   SEND MESSAGE
========================= */

const sendBtn =
document.querySelector(".send-btn");

const messages =
document.querySelector(".messages");

async function sendMessage(){

const text =
input.value.trim();

if(!text && pastedImages.length === 0){
    return;
}

const userMessage =
document.createElement("div");

userMessage.className = "message user";

let html = "";

/* Add pasted images */
pastedImages.forEach(file => {

    const imageURL = URL.createObjectURL(file);

    html += `
        <img
            src="${imageURL}"
            class="chat-image"
        >
    `;
});

/* Add text */
if(text){
    html += `
        <div class="chat-text">
            ${text}
        </div>
    `;
}

userMessage.innerHTML = `
    <div class="bubble">
        ${html}
    </div>
`;

messages.appendChild(userMessage);

input.value = "";

messages.scrollTop =
messages.scrollHeight;
try {

    const typing = document.createElement("div");

    typing.className = "message luna";

    typing.innerHTML = `
    <div class="bubble">
    Friend is typing...
    </div>
    `;

    messages.appendChild(typing);

    messages.scrollTop = messages.scrollHeight;

   const formData = new FormData();

formData.append("message", text);

if (pastedImages.length > 0) {
    formData.append("image", pastedImages[0]);
}

const response = await fetch(
    "https://friend-10jz.onrender.com/chat",  
    {
        method: "POST",
        body: formData
    }
);

    const data = await response.json();
previewContainer.innerHTML = "";
pastedImages = [];
    typing.remove();

    const friendReply =
    document.createElement("div");

    friendReply.className =
    "message luna";

    friendReply.innerHTML = `
    <div class="bubble">
    ${data.reply}
    </div>
    `;

    messages.appendChild(friendReply);

    messages.scrollTop =
    messages.scrollHeight;

} catch(error){

    console.error(error);

    const errorReply =
    document.createElement("div");

    errorReply.className =
    "message luna";

    errorReply.innerHTML = `
    <div class="bubble">
    Sorry... Friend is having trouble connecting right now.
    </div>
    `;

    messages.appendChild(errorReply);
}
}

sendBtn.addEventListener(
"click",
sendMessage
);

input.addEventListener(
"keypress",
(e)=>{

if(e.key==="Enter"){

sendMessage();

}

});

document.getElementById("chatLink").classList.add("active");



const more = document.getElementById("more");
const moreMenu = document.getElementById("moreMenu");

more.addEventListener("click", (e) => {

    e.stopPropagation();

    moreMenu.classList.toggle("show");

});

document.addEventListener("click", (e) => {

    if(
        !more.contains(e.target) &&
        !moreMenu.contains(e.target)
    ){
        moreMenu.classList.remove("show");
    }

});

document.getElementById("newChatBtn")
.addEventListener("click", () => {

    messages.innerHTML = "";

    moreMenu.classList.remove("show");

});







let pastedImages = [];

const previewContainer =
document.getElementById("imagePreviewContainer");
document.addEventListener("paste", (e) => {

    console.log("PASTE DETECTED");

    if (!e.clipboardData) return;

    const items = e.clipboardData.items;

    for (let i = 0; i < items.length; i++) {

        const item = items[i];

        if (item.type.startsWith("image/")) {

            const file = item.getAsFile();

            pastedImages.push(file);

            showPreview(file);
        }
    }
});
function showPreview(file) {

    const url = URL.createObjectURL(file);

    const wrapper =
    document.createElement("div");

    wrapper.style.position = "relative";
    wrapper.style.display = "inline-block";

    const img =
    document.createElement("img");

    img.src = url;
    img.className = "preview-image";

    const remove =
    document.createElement("button");

    remove.className = "remove-preview";

    remove.textContent = "×";

    remove.onclick = () => {

        pastedImages =
        pastedImages.filter(f => f !== file);

        wrapper.remove();
    };

    wrapper.appendChild(img);
    wrapper.appendChild(remove);

    previewContainer.appendChild(wrapper);
}















const menuBtn =
document.getElementById("menuBtn");

const sidebar =
document.querySelector(".sidebar");

menuBtn.addEventListener("click",()=>{

    sidebar.classList.toggle("open");

});
 