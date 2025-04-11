// Import các hàm từ auth.js
import { getCurrentUser, updateUser } from './auth.js';

// Class quản lý giỏ hàng
class CartManager {
    constructor() {
        this.cartContainer = document.getElementById('cart-container');
        this.orderContainer = document.getElementById('order-container');
        this.cartItemTemplate = document.getElementById('cart-item-template');
        this.orderItemTemplate = document.getElementById('order-item-template');
    }

    // Hiển thị giỏ hàng
    displayCart() {
        const user = getCurrentUser();
        if (!user || !this.cartContainer) return;

        this.cartContainer.innerHTML = '';
        let total = 0;

        user.cart.forEach(item => {
            const itemElement = this.createCartItemElement(item);
            this.cartContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        // Hiển thị tổng tiền
        const totalElement = document.createElement('div');
        totalElement.className = 'cart-total';
        totalElement.innerHTML = `
            <h3>Tổng cộng: ${this.formatPrice(total)}đ</h3>
            <button class="btn btn-primary" onclick="cartManager.checkout()">Thanh toán</button>
        `;
        this.cartContainer.appendChild(totalElement);
    }

    // Tạo phần tử hiển thị sản phẩm trong giỏ hàng
    createCartItemElement(item) {
        const element = document.createElement('div');
        element.className = 'cart-item';
        element.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>Giá: ${this.formatPrice(item.price)}đ</p>
                <div class="quantity-controls">
                    <button onclick="cartManager.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="cartManager.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="cartManager.removeItem('${item.id}')">×</button>
        `;
        return element;
    }

    // Cập nhật số lượng sản phẩm
    updateQuantity(productId, newQuantity) {
        const user = getCurrentUser();
        if (!user) return;

        const item = user.cart.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                updateUser(user);
                this.displayCart();
            }
        }
    }

    // Xóa sản phẩm khỏi giỏ hàng
    removeItem(productId) {
        const user = getCurrentUser();
        if (!user) return;

        user.cart = user.cart.filter(item => item.id !== productId);
        updateUser(user);
        this.displayCart();
    }

    // Thanh toán giỏ hàng
    checkout() {
        const user = getCurrentUser();
        if (!user || user.cart.length === 0) {
            alert('Giỏ hàng trống!');
            return;
        }

        const order = {
            id: Date.now().toString(),
            items: [...user.cart],
            status: 'Đang xử lý',
            createdAt: new Date().toISOString(),
            total: user.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
        };

        user.orders.push(order);
        user.cart = [];
        updateUser(user);

        alert('Đặt hàng thành công!');
        this.displayCart();
        this.displayOrders();
    }

    // Hiển thị danh sách đơn hàng
    displayOrders() {
        const user = getCurrentUser();
        if (!user || !this.orderContainer) return;

        this.orderContainer.innerHTML = '';
        
        if (user.orders.length === 0) {
            this.orderContainer.innerHTML = '<p>Chưa có đơn hàng nào.</p>';
            return;
        }

        user.orders.forEach(order => {
            const orderElement = document.createElement('div');
            orderElement.className = 'order-item';
            orderElement.innerHTML = `
                <div class="order-header">
                    <h3>Đơn hàng #${order.id}</h3>
                    <span class="order-status ${order.status.toLowerCase().replace(' ', '-')}">
                        ${order.status}
                    </span>
                </div>
                <div class="order-details">
                    <p>Ngày đặt: ${new Date(order.createdAt).toLocaleDateString()}</p>
                    <p>Tổng tiền: ${this.formatPrice(order.total)}đ</p>
                </div>
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-product">
                            <img src="${item.image}" alt="${item.name}">
                            <div class="product-info">
                                <h4>${item.name}</h4>
                                <p>Số lượng: ${item.quantity}</p>
                                <p>Giá: ${this.formatPrice(item.price)}đ</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            this.orderContainer.appendChild(orderElement);
        });
    }

    // Format giá tiền
    formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
}

// Khởi tạo CartManager
const cartManager = new CartManager();

// Export để sử dụng ở các file khác
export { cartManager };