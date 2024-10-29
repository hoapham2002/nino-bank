// Import các module cần thiết từ Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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

// Thêm sự kiện khi DOM được tải xong
document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("Button_Login");
    const messageDiv = document.getElementById("signInpMessage"); // Chỉnh sửa ID tại đây

    // Xử lý sự kiện khi nhấn nút Đăng Nhập
    loginButton.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('Đã bấm nút Đăng Nhập');

        const phone = document.getElementById('signInPhone').value.trim();
        const email = document.getElementById('signInEmail').value.trim();
        const password = document.getElementById('signInPassword').value.trim();

        console.log(`Phone: ${phone}, Email: ${email}, Password: ${password}`);

        if (!phone || !email || !password) {
            showMessage(messageDiv, 'Vui lòng nhập đủ thông tin.', 'red');
            return;
        }

        signInUser(phone, email, password, messageDiv);
    });
});

// Hàm đăng nhập người dùng với Firebase Authentication
function signInUser(phone, email, password, messageDiv) {
    // Kiểm tra số điện thoại hợp lệ
    if (!isValidPhoneNumber(phone)) {
        showMessage(messageDiv, "Sai số điện thoại!", "red");
        return;
    }

    // Kiểm tra email hợp lệ
    if (!isValidEmail(email)) {
        showMessage(messageDiv, "Sai cú pháp email. Vui lòng nhập lại.", "red");
        return;
    }

    // Kiểm tra mật khẩu hợp lệ
    if (!isValidPassword(password)) {
        showMessage(messageDiv, "Mật khẩu không chính xác!", "red");
        return;
    }

    // Đăng nhập bằng Firebase Authentication
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage(messageDiv, "Đăng nhập thành công!", "green");
            setTimeout(() => {
                window.location.href = "/user.html";  // Chuyển hướng sau khi đăng nhập thành công
            }, 2000);
        })
        .catch((error) => {
            handleFirebaseError(error, messageDiv); // Xử lý lỗi từ Firebase
        });
}

// Hàm hiển thị thông báo
function showMessage(element, message, color) {
    if (!element) {
        console.error("Không tìm thấy phần tử để hiển thị thông báo.");
        return;
    }
    element.innerText = message;
    element.style.color = color;
    element.style.display = "block";  // Hiển thị thông báo

    // Ẩn thông báo sau 4 giây
    setTimeout(() => {
        element.style.display = "none";
    }, 4000);
}

// Hàm kiểm tra số điện thoại hợp lệ (10 chữ số)
function isValidPhoneNumber(phone) {
    return /^\d{10}$/.test(phone);  // Trả về true nếu số điện thoại hợp lệ
}

// Hàm kiểm tra email hợp lệ
function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);  // Trả về true nếu email hợp lệ
}

// Hàm kiểm tra mật khẩu hợp lệ
function isValidPassword(password) {
    return password.length >= 6;  // Trả về true nếu mật khẩu có ít nhất 6 ký tự
}

// Hàm xử lý lỗi từ Firebase
function handleFirebaseError(error, messageDiv) {
    switch (error.code) {
        case 'auth/invalid-email':
            showMessage(messageDiv, "Email không hợp lệ.", "red");
            break;
        case 'auth/user-disabled':
            showMessage(messageDiv, "Tài khoản của bạn đã bị vô hiệu hóa.", "red");
            break;
        case 'auth/user-not-found':
            showMessage(messageDiv, "Không tìm thấy người dùng với email này.", "red");
            break;
        case 'auth/wrong-password':
            showMessage(messageDiv, "Mật khẩu không chính xác.", "red");
            break;
        case 'auth/too-many-requests':
            showMessage(messageDiv, "Quá nhiều yêu cầu. Vui lòng thử lại sau.", "red");
            break;
        default:
            showMessage(messageDiv, `Lỗi: ${error.message}`, "red");
            break;
    }
}
