// --- Lời chào theo buổi với typing effect ---
var greetingEl = document.getElementById("greeting");
var now = new Date();
var hour = now.getHours();
var loi_chao = "";

if (hour >= 5 && hour < 12) {
    loi_chao = "☀️ Chào buổi sáng! Chúc bạn một ngày tốt lành!";
} else if (hour >= 12 && hour < 18) {
    loi_chao = "🌤️ Chào buổi chiều! Chúc bạn buổi chiều vui vẻ!";
} else {
    loi_chao = "🌙 Chào buổi tối! Chúc bạn buổi tối an lành!";
}

// Typing effect
var charIndex = 0;
function typeGreeting() {
    if (charIndex < loi_chao.length) {
        greetingEl.innerText = loi_chao.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeGreeting, 50);
    }
}
typeGreeting();

// --- Đổi theme (màu nền + accent) ---
var btnChangeColor = document.getElementById("btnChangeColor");
var themes = ["", "theme-cyber", "theme-sunset", "theme-ocean", "theme-forest"];
var themeNames = ["Mặc định", "Cyber Neon", "Sunset Vibes", "Deep Ocean", "Forest Dream"];
var themeIndex = 0;

btnChangeColor.addEventListener("click", function () {
    // Xóa theme cũ
    document.body.className = "";

    // Chuyển theme tiếp theo
    themeIndex = (themeIndex + 1) % themes.length;

    if (themes[themeIndex] !== "") {
        document.body.className = themes[themeIndex];
    }

    // Đổi style background-color cho body
    document.body.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
});

// --- Hiệu ứng xuất hiện khi scroll ---
var cards = document.querySelectorAll(".glass-card");

function checkScroll() {
    for (var i = 0; i < cards.length; i++) {
        var rect = cards[i].getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            cards[i].style.opacity = "1";
            cards[i].style.transform = "translateY(0)";
        }
    }
}

// Khởi tạo cards ẩn
for (var i = 0; i < cards.length; i++) {
    cards[i].style.opacity = "0";
    cards[i].style.transform = "translateY(30px)";
    cards[i].style.transition = "opacity 0.6s ease, transform 0.6s ease";
    cards[i].style.transitionDelay = (i * 0.15) + "s";
}

window.addEventListener("scroll", checkScroll);
// Chạy lần đầu
setTimeout(checkScroll, 100);
