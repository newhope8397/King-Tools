// ===== Dark / Light Mode Toggle =====
function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark");
    const btn = document.getElementById("theme-toggle");
    if(body.classList.contains("dark")){
        btn.innerText = "☀️ Light Mode";
    } else {
        btn.innerText = "🌙 Dark Mode";
    }
}

// ===== Search Filter for Homepage Tools =====
function searchTool() {
    const input = document.getElementById("searchBar").value.toLowerCase();
    const tools = document.getElementById("toolList").getElementsByClassName("tool");
    for(let i = 0; i < tools.length; i++){
        const title = tools[i].getElementsByTagName("h3")[0].innerText.toLowerCase();
        tools[i].style.display = title.includes(input) ? "" : "none";
    }
}

// ===== Optional: Highlight Tool on Hover =====
const tools = document.querySelectorAll(".tool");
tools.forEach(tool => {
    tool.addEventListener("mouseenter", () => {
        tool.style.transform = "translateY(-10px)";
        tool.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
    });
    tool.addEventListener("mouseleave", () => {
        tool.style.transform = "translateY(0)";
        tool.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
    });
});
