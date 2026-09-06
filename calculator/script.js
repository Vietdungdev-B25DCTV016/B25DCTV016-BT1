var display = document.getElementById("display");
var expression = document.getElementById("expression");
var buttons = document.querySelectorAll(".btn");
var btnClear = document.getElementById("btnClear");
var btnEqual = document.getElementById("btnEqual");

var currentInput = "0";
var lastExpression = "";

// Lắng nghe sự kiện click trên tất cả các nút bấm bằng addEventListener
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        var value = this.getAttribute("data-value");

        // Bỏ qua nút Clear và Equal (xử lý riêng)
        if (!value) return;

        // Xóa trạng thái lỗi
        display.classList.remove("error");

        // Nếu màn hình đang là "0" và nhập số, thay thế
        if (currentInput === "0" && value !== "." && value !== "(" && value !== ")") {
            // Nếu là operator thì nối vào
            if (["+", "-", "*", "/"].indexOf(value) !== -1) {
                currentInput = "0" + value;
            } else {
                currentInput = value;
            }
        } else {
            // Nối số/operator vào màn hình hiển thị bằng .innerText
            currentInput = currentInput + value;
        }

        display.innerText = currentInput;
    });
}

// Khi bấm Clear: đặt lại màn hình về giá trị 0
btnClear.addEventListener("click", function () {
    currentInput = "0";
    lastExpression = "";
    display.innerText = "0";
    display.classList.remove("error");
    expression.innerText = "";
});

// Khi bấm =: tính toán biểu thức hiện có trên màn hình và hiển thị kết quả
btnEqual.addEventListener("click", function () {
    try {
        var expr = currentInput;
        var result = eval(expr);

        // Hiển thị biểu thức cũ ở trên
        lastExpression = expr + " =";
        expression.innerText = lastExpression;

        // Hiển thị kết quả
        // Làm tròn nếu số thập phân quá dài
        if (result !== Math.floor(result)) {
            result = parseFloat(result.toFixed(10));
        }

        currentInput = String(result);
        display.innerText = currentInput;

        // Animation khi hiện kết quả
        display.style.transform = "scale(1.05)";
        setTimeout(function () {
            display.style.transform = "scale(1)";
        }, 150);

    } catch (e) {
        display.innerText = "Lỗi biểu thức";
        display.classList.add("error");
        currentInput = "0";
        lastExpression = "";
        expression.innerText = "";
    }
});
