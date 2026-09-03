var display = document.getElementById("display");
var buttons = document.querySelectorAll(".btn");
var btnClear = document.getElementById("btnClear");
var btnEqual = document.getElementById("btnEqual");

// Lắng nghe sự kiện click trên tất cả các nút bấm bằng addEventListener
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        var value = this.getAttribute("data-value");

        // Bỏ qua nút Clear và Equal (xử lý riêng)
        if (!value) return;

        // Nếu màn hình đang là "0" hoặc "Lỗi", thay thế bằng giá trị mới
        if (display.innerText === "0" || display.innerText === "Lỗi") {
            display.innerText = value;
        } else {
            // Nối số vào màn hình hiển thị bằng .innerText
            display.innerText = display.innerText + value;
        }
    });
}

// Khi bấm Clear: đặt lại màn hình về giá trị 0
btnClear.addEventListener("click", function () {
    display.innerText = "0";
});

// Khi bấm =: tính toán biểu thức hiện có trên màn hình và hiển thị kết quả
btnEqual.addEventListener("click", function () {
    try {
        var expression = display.innerText;
        var result = eval(expression);
        display.innerText = result;
    } catch (e) {
        display.innerText = "Lỗi";
    }
});
