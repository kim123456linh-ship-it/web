const buttons = document.querySelectorAll(".add-to-cart");
const cartEl = document.getElementById("cart");
const totalEl = document.getElementById("total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// thêm vào giỏ
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.id;
    const name = btn.dataset.name;
    const price = Number(btn.dataset.price);

    const item = cart.find(p => p.id === id);

    if (item) {
      item.qty += 1;
    } else {
      cart.push({ id, name, price, qty: 1 });
    }

    saveCart();
    renderCart();
  });
});

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// hiển thị giỏ hàng
function renderCart() {
  cartEl.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
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

// đổi số lượng
function updateQty(id, qty) {
  const item = cart.find(p => p.id === id);
  item.qty = Number(qty);
  saveCart();
  renderCart();
}

// xóa sản phẩm
function removeItem(id) {
  cart = cart.filter(p => p.id !== id);
  saveCart();
  renderCart();
}

renderCart();
