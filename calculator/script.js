// ================================
// DOM Elements
// ================================
var display = document.getElementById("display");
var expression = document.getElementById("expression");
var btnClear = document.getElementById("btnClear");
var btnEqual = document.getElementById("btnEqual");
var buttons = document.querySelectorAll(".btn");

var currentInput = "0";
var lastExpression = "";

// ================================
// Ripple effect (mouse position tracking)
// ================================
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("mousemove", function (e) {
        var rect = this.getBoundingClientRect();
        this.style.setProperty("--x", (e.clientX - rect.left) + "px");
        this.style.setProperty("--y", (e.clientY - rect.top) + "px");
    });
}

// ================================
// Auto-resize display text
// ================================
function updateDisplay(text) {
    display.innerText = text;
    display.classList.remove("shrink");
    if (text.length > 10) {
        display.classList.add("shrink");
    }
}

// ================================
// Lắng nghe sự kiện click trên tất cả nút bằng addEventListener
// ================================
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        var value = this.getAttribute("data-value");

        // Bỏ qua nút Clear và Equal
        if (!value) return;

        // Xóa trạng thái lỗi
        display.classList.remove("error");

        // Khi bấm số: nối số vào màn hình hiển thị bằng .innerText
        if (currentInput === "0" && value !== "." && value !== "(" && value !== ")") {
            if ("+-*/".indexOf(value) !== -1) {
                currentInput = "0" + value;
            } else {
                currentInput = value;
            }
        } else {
            currentInput = currentInput + value;
        }

        updateDisplay(currentInput);
    });
}

// ================================
// Khi bấm Clear: đặt lại màn hình về giá trị 0
// ================================
btnClear.addEventListener("click", function () {
    currentInput = "0";
    lastExpression = "";
    display.classList.remove("error", "shrink");
    updateDisplay("0");
    expression.innerText = "";
});

// ================================
// Khi bấm =: tính toán biểu thức và hiển thị kết quả
// ================================
btnEqual.addEventListener("click", function () {
    try {
        var expr = currentInput;
        var result = eval(expr);

        // Hiển thị biểu thức cũ
        lastExpression = expr + " =";
        expression.innerText = lastExpression;

        // Làm tròn số thập phân
        if (result !== Math.floor(result)) {
            result = parseFloat(result.toFixed(10));
        }

        currentInput = String(result);
        updateDisplay(currentInput);

        // Pop animation
        display.classList.remove("pop");
        // Force reflow
        void display.offsetWidth;
        display.classList.add("pop");

    } catch (e) {
        display.classList.add("error");
        updateDisplay("Lỗi biểu thức");
        currentInput = "0";
        lastExpression = "";
        expression.innerText = "";
    }
});

// ================================
// Keyboard support
// ================================
document.addEventListener("keydown", function (e) {
    var key = e.key;

    if ("0123456789.+-*/()".indexOf(key) !== -1) {
        // Simulate number/operator click
        display.classList.remove("error");
        if (currentInput === "0" && "0123456789".indexOf(key) !== -1) {
            currentInput = key;
        } else {
            currentInput = currentInput + key;
        }
        updateDisplay(currentInput);
    } else if (key === "Enter" || key === "=") {
        e.preventDefault();
        btnEqual.click();
    } else if (key === "Escape" || key === "Delete") {
        btnClear.click();
    } else if (key === "Backspace") {
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput = "0";
        }
        updateDisplay(currentInput);
    }
});
