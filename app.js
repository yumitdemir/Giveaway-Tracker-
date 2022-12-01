//? api website https://www.gamerpower.com/api-read
//? fix for error that api causes use Moesif Origin & CORS Changer extension
const cardimg = document.getElementById("card-img");
const blackbackground = document.getElementById("background-black");
const transitiontext = document.getElementById("transition-text");
const scrollimg = document.getElementById("scroll-img");

document.addEventListener("scroll", (params) => {
  cardimg.classList.add("cardimg");
  blackbackground.classList.add("backgroundblack");
  transitiontext.classList.add("transitiontext");
  setInterval(() => {
    location.href = "brows.html";
  }, 650);
});
