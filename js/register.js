import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDqr2Fi0hT4JoM9cGzlKpPFFGUyAOmTUso",
    authDomain: "login-bank-7c2f5.firebaseapp.com",
    projectId: "login-bank-7c2f5",
    storageBucket: "login-bank-7c2f5.appspot.com",
    messagingSenderId: "696493635814",
    appId: "1:696493635814:web:e37ea2de49b4d5e9112327"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Hàm đăng ký
document.getElementById('signUpForm').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const phone = document.getElementById('signUpPhone').value;
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const messageDiv = document.getElementById('signUpMessage');

    // Kiểm tra định dạng số điện thoại
    if (!isValidPhoneNumber(phone)) {
        showMessage(messageDiv, "Số điện thoại không hợp lệ. Vui lòng nhập 10 chữ số.", "red");
        return; // Ngưng thực hiện nếu số điện thoại không hợp lệ
    }

    if (!isValidEmail(email)) {
        messageDiv.innerText = "Sai cú pháp email. Vui lòng nhập lại.";
        messageDiv.style.color = "red";
        return; // Ngưng thực hiện nếu email không hợp lệ
    }

    // Kiểm tra mật khẩu
    if (password !== confirmPassword) {
        showMessage(messageDiv, "Mật khẩu và xác nhận không khớp.", "red");
        return; // Ngưng thực hiện nếu mật khẩu không khớp
    }

    // Tiến hành đăng ký với Firebase nếu số điện thoại và email hợp lệ
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Đăng ký thành công
            showMessage(messageDiv, "Đăng ký thành công!", "green");
            setTimeout(() => {
                window.location.href = "/login.html"; // Chuyển đến trang đăng nhập
            }, 2100); // Chuyển trang sau 2 giây
        })
        .catch((error) => {
            // Xử lý lỗi đăng ký
            const errorMessage = error.message;
            showMessage(messageDiv, `Lỗi trong quá trình đăng ký: ${errorMessage}`, "red");
        });
});

// Hàm hiển thị thông báo
function showMessage(element, message, color) {
    element.innerText = message;
    element.style.color = color;
    element.style.display = "block"; // Hiện thông báo
    setTimeout(() => {
        element.style.display = "none"; // Ẩn thông báo sau 3 giây
    }, 4000); // Thời gian hiển thị thông báo
}

// Hàm kiểm tra định dạng số điện thoại
function isValidPhoneNumber(phone) {
    return /^\d{10}$/.test(phone); // Kiểm tra số điện thoại có 10 chữ số
}

// Hàm kiểm tra định dạng email
function isValidEmail(email) {
    // Biểu thức chính quy kiểm tra định dạng email hợp lệ
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}