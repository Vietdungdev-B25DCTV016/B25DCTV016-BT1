// ================================
// Lời chào theo buổi (dùng Date)
// ================================
var greetingEl = document.getElementById("greeting");
var now = new Date();
var hour = now.getHours();
var loi_chao = "";

if (hour >= 5 && hour < 12) {
    loi_chao = "Chào buổi sáng ☀️";
} else if (hour >= 12 && hour < 18) {
    loi_chao = "Chào buổi chiều 🌤️";
} else {
    loi_chao = "Chào buổi tối 🌙";
}

greetingEl.innerText = loi_chao;

// ================================
// Typing Effect
// ================================
var typingEl = document.getElementById("typingText");
var phrases = [
    "Sinh viên PTIT 🎓",
    "Web Developer 💻",
    "Yêu công nghệ ❤️",
    "Luôn học hỏi 📚"
];
var phraseIndex = 0;
var charIndex = 0;
var isDeleting = false;

function typeEffect() {
    var current = phrases[phraseIndex];

    if (isDeleting) {
        typingEl.innerText = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingEl.innerText = current.substring(0, charIndex + 1);
        charIndex++;
    }

    var speed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === current.length) {
        speed = 2000; // Dừng 2s trước khi xóa
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

// ================================
// Đổi theme bằng addEventListener
// ================================
var btnChangeColor = document.getElementById("btnChangeColor");
var themes = ["", "theme-emerald", "theme-rose", "theme-amber", "theme-sky"];
var themeIndex = 0;

btnChangeColor.addEventListener("click", function () {
    themeIndex = (themeIndex + 1) % themes.length;
    document.body.className = themes[themeIndex];
    // Đổi màu nền bằng .style
    document.body.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
});

// ================================
// Scroll Reveal Animation
// ================================
var sections = document.querySelectorAll(".reveal");

function revealOnScroll() {
    for (var i = 0; i < sections.length; i++) {
        var rect = sections[i].getBoundingClientRect();
        var windowHeight = window.innerHeight;
        if (rect.top < windowHeight - 60) {
            sections[i].classList.add("visible");
        }
    }
}

window.addEventListener("scroll", revealOnScroll);
setTimeout(revealOnScroll, 150);

// ================================
// Skill Bars Animation
// ================================
var skillFills = document.querySelectorAll(".skill-fill");
var skillsAnimated = false;

function animateSkills() {
    var skillsSection = document.getElementById("skills");
    if (!skillsSection) return;
    var rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100 && !skillsAnimated) {
        skillsAnimated = true;
        for (var i = 0; i < skillFills.length; i++) {
            var width = skillFills[i].getAttribute("data-width");
            skillFills[i].style.width = width + "%";
        }
    }
}

window.addEventListener("scroll", animateSkills);
setTimeout(animateSkills, 500);

// ================================
// Active Nav Link on Scroll
// ================================
var navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {
    var scrollPos = window.scrollY + 100;
    for (var i = 0; i < navLinks.length; i++) {
        var href = navLinks[i].getAttribute("href");
        var target = document.querySelector(href);
        if (target) {
            var top = target.offsetTop;
            var height = target.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                // Xóa active cũ
                for (var j = 0; j < navLinks.length; j++) {
                    navLinks[j].classList.remove("active");
                }
                navLinks[i].classList.add("active");
            }
        }
    }
}

window.addEventListener("scroll", updateActiveNav);
