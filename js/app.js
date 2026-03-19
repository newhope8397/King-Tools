// THEME
function toggleTheme(){
document.body.classList.toggle("light");
}

// SEARCH
function searchTools(){
let input = document.getElementById("search").value.toLowerCase();
let cards = document.querySelectorAll(".card");

cards.forEach(card=>{
let name = card.dataset.name;
card.style.display = name.includes(input) ? "block" : "none";
});
}

// OPEN TOOL
function openTool(url){
window.location.href = url;
}

// LOGIN MODAL
function handlePremium(){
document.getElementById("premiumModal").style.display = "flex";
}

function closePremium(){
document.getElementById("premiumModal").style.display = "none";
}

function closeLogin(){
document.getElementById("loginModal").style.display = "none";
}

// Smooth page transition
document.querySelectorAll("a").forEach(link=>{
  link.addEventListener("click", e=>{
    e.preventDefault();
    const url = link.href;

    document.body.style.opacity = "0";
    document.body.style.transition = "0.3s";

    setTimeout(()=>{
      window.location.href = url;
    },300);
  });
});
window.onload = ()=>{
  document.body.classList.add("loaded");
};
