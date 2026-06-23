const getStartedBtn =
document.getElementById("getStartedBtn");

const homepage1 =
document.querySelector(".homepage1");

const homepage2 =
document.getElementById("homepage2");

getStartedBtn.addEventListener("click", (e) => {

    e.preventDefault();

    homepage1.style.display = "none";

    homepage2.style.display = "block";

    window.scrollTo(0, 0);

});