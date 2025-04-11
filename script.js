// Import các module cần thiết
import { register, login, logout, isLoggedIn, getCurrentUser } from './auth.js';
import { cartManager } from './cart.js';
import { products, filterProductsByBrand } from './products.js';

// Khởi tạo ứng dụng khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    // Các elements
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const cartModal = document.getElementById('cartModal');
    const ordersModal = document.getElementById('ordersModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const cartCount = document.getElementById('cartCount');
    const productGrid = document.getElementById('productGrid');
    const brandFilter = document.querySelector('.brand-filter ul');

    // Khởi tạo danh sách thương hiệu
    const brands = ['all', 'nike', 'adidas', 'puma', 'vans', 'converse', 'new-balance', 'reebok'];
    brands.forEach(brand => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#" data-brand="${brand}" ${brand === 'all' ? 'class="active"' : ''}>
            ${brand === 'all' ? 'Tất cả' : brand.charAt(0).toUpperCase() + brand.slice(1)}
        </a>`;
        brandFilter.appendChild(li);
    });

    // Hiển thị sản phẩm
    function displayProducts(brand = 'all') {
        const filteredProducts = filterProductsByBrand(brand);
        productGrid.innerHTML = '';

        filteredProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.setAttribute('data-brand', product.brand);
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${formatPrice(product.price)}đ</p>
                <button class="btn-buy" data-product-id="${product.id}">Thêm vào giỏ</button>
            `;
            productGrid.appendChild(card);
        });

        // Thêm sự kiện cho nút mua hàng
        document.querySelectorAll('.btn-buy').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-product-id');
                const product = products.find(p => p.id === productId);
                if (product) addToCart(product);
            });
        });
    }

    // Format giá tiền
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    // Thêm vào giỏ hàng
    function addToCart(product) {
        if (!isLoggedIn()) {
            alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
            showModal(loginModal);
            return;
        }

        const user = getCurrentUser();
        const existingItem = user.cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cart.push({ ...product, quantity: 1 });
        }

        updateCartCount();
        cartManager.displayCart();
        alert('Đã thêm sản phẩm vào giỏ hàng!');
    }

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    function updateCartCount() {
        const user = getCurrentUser();
        cartCount.textContent = user ? user.cart.length : 0;
    }

    // Hiển thị modal
    function showModal(modal) {
        modal.style.display = 'block';
    }

    // Ẩn modal
    function hideModal(modal) {
        modal.style.display = 'none';
    }

    // Cập nhật UI theo trạng thái đăng nhập
    function updateAuthUI() {
        const isLogged = isLoggedIn();
        document.querySelectorAll('.show-when-logged-in').forEach(el => {
            el.style.display = isLogged ? 'inline-block' : 'none';
        });
        document.querySelectorAll('.show-when-logged-out').forEach(el => {
            el.style.display = isLogged ? 'none' : 'inline-block';
        });
        updateCartCount();
    }

    // Xử lý sự kiện đăng ký
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        try {
            register(username, email, password);
            alert('Đăng ký thành công! Vui lòng đăng nhập.');
            hideModal(registerModal);
            showModal(loginModal);
        } catch (error) {
            alert(error.message);
        }
    });

    // Xử lý sự kiện đăng nhập
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        try {
            login(username, password);
            alert('Đăng nhập thành công!');
            hideModal(loginModal);
            updateAuthUI();
        } catch (error) {
            alert(error.message);
        }
    });

    // Xử lý sự kiện đăng xuất
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
        e.preventDefault();
        logout();
        updateAuthUI();
        alert('Đã đăng xuất!');
    });

    // Xử lý sự kiện hiển thị modal
    document.getElementById('loginBtn').addEventListener('click', () => showModal(loginModal));
    document.getElementById('registerBtn').addEventListener('click', () => showModal(registerModal));
    document.getElementById('cartBtn').addEventListener('click', () => {
        cartManager.displayCart();
        showModal(cartModal);
    });
    document.getElementById('ordersBtn').addEventListener('click', () => {
        cartManager.displayOrders();
        showModal(ordersModal);
    });

    // Xử lý sự kiện đóng modal khi click bên ngoài
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            hideModal(e.target);
        }
    });

    // Xử lý sự kiện lọc sản phẩm theo thương hiệu
    brandFilter.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const brand = e.target.getAttribute('data-brand');
            document.querySelectorAll('.brand-filter a').forEach(a => a.classList.remove('active'));
            e.target.classList.add('active');
            displayProducts(brand);
        }
    });

    // Khởi tạo ban đầu
    displayProducts();
    updateAuthUI();
});