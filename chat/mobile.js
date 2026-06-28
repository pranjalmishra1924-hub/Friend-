const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".mobile-overlay");
const menu = document.querySelector(".mobile-menu");
const messages = document.querySelector(".messages");

let startX = 0;

function openSidebar(){

    sidebar.classList.add("open");
    overlay.classList.add("show");

}

function closeSidebar(){

    sidebar.classList.remove("open");
    overlay.classList.remove("show");

}

if(menu){

    menu.addEventListener("click",(e)=>{

        e.stopPropagation();
        openSidebar();

    });

}

if(overlay){

    overlay.addEventListener("click",closeSidebar);

}

document.addEventListener("touchstart",(e)=>{

    startX=e.touches[0].clientX;

},{passive:true});

document.addEventListener("touchmove",(e)=>{

    const x=e.touches[0].clientX;

    if(!sidebar.classList.contains("open")){

        if(startX<20 && x>100){

            openSidebar();

        }

    }else{

        if(x<startX-70){

            closeSidebar();

        }

    }

},{passive:true});

function scrollToBottom(){

    if(messages){

        requestAnimationFrame(()=>{

            messages.scrollTop=messages.scrollHeight;

        });

    }

}

window.addEventListener("load",scrollToBottom);
window.addEventListener("resize",scrollToBottom);


