const sidebar=document.querySelector(".sidebar");
const overlay=document.querySelector(".mobile-overlay");
const menu=document.querySelector(".mobile-menu");

let startX=0;
let currentX=0;

function openSidebar(){

    sidebar.classList.add("open");
    overlay.classList.add("show");

    document.body.style.overflow="hidden";

}

function closeSidebar(){

    sidebar.classList.remove("open");
    overlay.classList.remove("show");

    document.body.style.overflow="hidden";

}

menu.addEventListener("click",openSidebar);

overlay.addEventListener("click",closeSidebar);

document.addEventListener("touchstart",(e)=>{

    startX=e.touches[0].clientX;

});

document.addEventListener("touchmove",(e)=>{

    currentX=e.touches[0].clientX;

    if(startX<18 && currentX>95){

        openSidebar();

    }

    if(sidebar.classList.contains("open")){

        if(currentX<startX-70){

            closeSidebar();

        }

    }

});

window.addEventListener("resize",()=>{

    scrollToBottom();

});
function scrollToBottom(){

    const chat=document.querySelector(".messages");

    requestAnimationFrame(()=>{

        chat.scrollTop=chat.scrollHeight;

    });

}
 