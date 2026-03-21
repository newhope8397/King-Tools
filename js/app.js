// ===========================
// SAFE CANVAS INIT
// ===========================
let canvas = document.getElementById("canvas");
let ctx = null;

if(canvas){
  ctx = canvas.getContext("2d", { willReadFrequently: true });
}

// ===========================
// THEME
// ===========================
function toggleTheme(){
  document.body.classList.toggle("light");
}

// ===========================
// SEARCH
// ===========================
function searchTools(){
  let input = document.getElementById("search").value.toLowerCase();
  let cards = document.querySelectorAll(".card");

  cards.forEach(card=>{
    let name = card.dataset.name || "";
    card.style.display = name.toLowerCase().includes(input) ? "block" : "none";
  });
}

// ===========================
// OPEN TOOL
// ===========================
function openTool(url){
  window.location.href = url;
}

// ===========================
// MODALS (SAFE)
// ===========================
function handlePremium(){
  let modal = document.getElementById("premiumModal");
  if(modal) modal.style.display = "flex";
}

function closePremium(){
  let modal = document.getElementById("premiumModal");
  if(modal) modal.style.display = "none";
}

function closeLogin(){
  let modal = document.getElementById("loginModal");
  if(modal) modal.style.display = "none";
}

// ===========================
// SMOOTH PAGE TRANSITION (SAFE)
// ===========================
document.querySelectorAll("a").forEach(link=>{

  // skip external / download links
  if(link.target === "_blank" || link.hasAttribute("download")) return;

  link.addEventListener("click", e=>{
    e.preventDefault();

    const url = link.href;

    document.body.style.opacity = "0";

    setTimeout(()=>{
      window.location.href = url;
    },300);
  });

});

// ===========================
// PAGE LOAD FADE IN
// ===========================
window.addEventListener("load", ()=>{
  document.body.classList.add("loaded");
});
// ======================
// PREMIUM / PRO FEATURES
// ======================

function handlePremium(){
  document.getElementById("premiumModal").style.display = "flex";
}

function buyPro(){
  alert("Payment system coming soon 💰");
}
