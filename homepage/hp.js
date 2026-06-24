const svg =
document.getElementById("stars");

const width =
window.innerWidth;

const height =
window.innerHeight;

svg.setAttribute(
    "viewBox",
    `0 0 ${width} ${height}`
);

for(let i=0;i<250;i++){

    const star =
    document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
    );

    const x =
    Math.random()*width;

    const y =
    Math.random()*height;

    const r =
    Math.random()*2+0.5;

    star.setAttribute("cx",x);
    star.setAttribute("cy",y);
    star.setAttribute("r",r);

    star.setAttribute(
    "fill",
    "white"
    );

    star.style.opacity =
    Math.random();

    star.style.animation =
    `twinkle ${
        Math.random()*5+2
    }s infinite`;

    svg.appendChild(star);
}














window.addEventListener("DOMContentLoaded", () => {

    const user = JSON.parse(
        localStorage.getItem("friend_user")
    );

    if(user){

        document.getElementById("userName").textContent =
            `Hi ${user.name} ♡`;

    }
});
function toggleProfileMenu(){

    const menu =
    document.getElementById("profileMenu");

    if(menu.style.display === "block"){
        menu.style.display = "none";
    }else{
        menu.style.display = "block";
    }

}
function logout(){

    localStorage.removeItem("orbloom_user");

    window.location.href = "../login.html";

}
function editName(){

    const user =
    JSON.parse(localStorage.getItem("orbloom_user"));

    const newName =
    prompt("Enter new name:");

    if(!newName) return;

    user.name = newName;

    localStorage.setItem(
        "orbloom_user",
        JSON.stringify(user)
    );

    document.getElementById("userName")
    .textContent = `Hi ${newName} 👋`;

}