console.log("JS đã chạy");

const buttons = document.querySelectorAll(".add-to-cart");
const cartEl = document.getElementById("cart");
const totalEl = document.getElementById("total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// THÊM VÀO GIỎ (trang chủ)
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.id;
    const name = btn.dataset.name;
    const price = Number(btn.dataset.price);

    const item = cart.find(p => p.id === id);

    if (item) {
      item.qty += 1;
    } else {
      cart.push({
        id,
        name,
        price,
        qty: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ ✅");
  });
});

// HIỂN THỊ GIỎ HÀNG (giohang.html)
function renderCart() {
  if (!cartEl || !totalEl) return;

  cartEl.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    if (!item.price || !item.qty) return; // CHỐNG LỖI

    const sum = item.price * item.qty;
    total += sum;

    cartEl.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>
          <input type="number" min="1" value="${item.qty}"
            onchange="updateQty('${item.id}', this.value)">
        </td>
        <td>${item.price.toLocaleString()} VNĐ</td>
        <td>${sum.toLocaleString()} VNĐ</td>
        <td>
          <button onclick="removeItem('${item.id}')">❌</button>
        </td>
      </tr>
    `;
  });

  totalEl.textContent = total.toLocaleString();
}

function updateQty(id, qty) {
  const item = cart.find(p => p.id === id);
  item.qty = Number(qty);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(id) {
  cart = cart.filter(p => p.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

renderCart();



  fetch("footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    });

function openLogin() {
  alert("Mở form đăng nhập");
}

function openRegister() {
  alert("Mở form đăng ký");
}


//dnhap dki
function openLogin() {
  document.getElementById("authModal").style.display = "flex";
  showLogin();
}

function openRegister() {
  document.getElementById("authModal").style.display = "flex";
  showRegister();
}

function closeModal() {
  document.getElementById("authModal").style.display = "none";
}

function showLogin() {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("registerForm").style.display = "none";
}

function showRegister() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "block";
}



function register(e) {
  e.preventDefault();

  const user = document.querySelector("#registerForm input[type='text']").value;
  const pass = document.querySelectorAll("#registerForm input[type='password']")[0].value;
  const repass = document.querySelectorAll("#registerForm input[type='password']")[1].value;

  if (pass !== repass) {
    alert("Mật khẩu không khớp");
    return;
  }

  localStorage.setItem("user", user);
  localStorage.setItem("pass", pass);

  alert("Đăng ký thành công, mời đăng nhập");
  showLogin();
}


function login(e) {
  e.preventDefault();

  const user = document.querySelector("#loginForm input[type='text']").value;
  const pass = document.querySelector("#loginForm input[type='password']").value;

  const savedUser = localStorage.getItem("user");
  const savedPass = localStorage.getItem("pass");

  if (user === savedUser && pass === savedPass) {
    alert("Đăng nhập thành công");
    closeModal();
  } else {
    alert("Sai tài khoản hoặc mật khẩu");
  }
}

//vjdhndigidijiojiobjj
function register(e) {
  e.preventDefault();

  const user = document.querySelector("#registerForm input[type='text']").value;
  const pass = document.querySelectorAll("#registerForm input[type='password']")[0].value;
  const repass = document.querySelectorAll("#registerForm input[type='password']")[1].value;

  if (pass !== repass) {
    alert("Mật khẩu không khớp");
    return;
  }

  localStorage.setItem("user", user);
  localStorage.setItem("pass", pass);

  alert("Đăng ký thành công, mời đăng nhập");
  showLogin();
}
//gggggg
function login(e) {
  e.preventDefault();

  const user = document.querySelector("#loginForm input[type='text']").value;
  const pass = document.querySelector("#loginForm input[type='password']").value;

  const savedUser = localStorage.getItem("user");
  const savedPass = localStorage.getItem("pass");

  if (!savedUser) {
    alert("Chưa có tài khoản, vui lòng đăng ký");
    showRegister();
    return;
  }

  if (user === savedUser && pass === savedPass) {
    alert("Đăng nhập thành công");
    closeModal();
  } else {
    alert("Sai tài khoản hoặc mật khẩu");
  }
}




function toggleMenu(e) {
    e.stopPropagation(); // ❗ chặn click lan
    let d = document.getElementById("dropdown");
    d.style.display = d.style.display === "block" ? "none" : "block";
}

function stop(e) {
    e.stopPropagation(); // ❗ click trong tab không đóng
}

function showLogin() {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
}

function showRegister() {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
}

function register() {
    let u = regUser.value;
    let p = regPass.value;

    if (!u || !p) {
        alert("Nhập đầy đủ thông tin");
        return;
    }

    if (localStorage.getItem(u)) {
        alert("Tài khoản đã tồn tại");
        return;
    }

    localStorage.setItem(u, p);
    alert("Đăng ký thành công");

    regUser.value = "";
    regPass.value = "";
    showLogin();
}

function login() {
    let u = loginUser.value;
    let p = loginPass.value;

    if (localStorage.getItem(u) === p) {
        alert("Đăng nhập thành công 🎉");
    } else {
        alert("Sai tài khoản hoặc mật khẩu");
    }

    loginUser.value = "";
    loginPass.value = "";
}

/* Click ra ngoài → tự đóng */
document.addEventListener("click", () => {
    dropdown.style.display = "none";
});

// NÚT XÓA TẤT CẢ GIỎ HÀNG
document.getElementById("clear-cart").addEventListener("click", function () {
  // hỏi xác nhận
  if (confirm("Bạn có chắc muốn xóa tất cả sản phẩm không?")) {
    // xóa dữ liệu giỏ hàng trong localStorage
    localStorage.removeItem("cart");

    // xóa giao diện bảng
    document.getElementById("cart").innerHTML = "";

    // reset tổng tiền
    document.getElementById("total").innerText = "0";

    alert("Đã xóa tất cả sản phẩm!");
  }
});    




