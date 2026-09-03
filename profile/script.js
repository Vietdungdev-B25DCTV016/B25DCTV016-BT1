// --- Lời chào theo buổi ---
var greetingEl = document.getElementById("greeting");
var now = new Date();
var hour = now.getHours();
var loi_chao = "";

if (hour >= 5 && hour < 12) {
    loi_chao = "Chào buổi sáng! Chúc bạn một ngày tốt lành! ☀️";
} else if (hour >= 12 && hour < 18) {
    loi_chao = "Chào buổi chiều! Chúc bạn buổi chiều vui vẻ! 🌤️";
} else {
    loi_chao = "Chào buổi tối! Chúc bạn buổi tối an lành! 🌙";
}

greetingEl.innerText = loi_chao;

// --- Đổi màu nền ---
var btnChangeColor = document.getElementById("btnChangeColor");

var colors = ["#f9ebea", "#d5f5e3", "#d6eaf8", "#fdebd0", "#f5eef8", "#fdfefe"];
var colorIndex = 0;

btnChangeColor.addEventListener("click", function () {
    colorIndex = (colorIndex + 1) % colors.length;
    document.body.style.backgroundColor = colors[colorIndex];
});
