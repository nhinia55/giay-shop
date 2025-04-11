// Khởi tạo mảng lưu trữ thông tin người dùng (trong thực tế nên sử dụng database)
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Hàm đăng ký tài khoản
function register(username, email, password) {
    // Kiểm tra xem username hoặc email đã tồn tại chưa
    if (users.find(user => user.username === username || user.email === email)) {
        throw new Error('Tên đăng nhập hoặc email đã tồn tại!');
    }

    // Tạo user mới
    const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password, // Trong thực tế nên mã hóa mật khẩu
        cart: [],
        orders: []
    };

    // Thêm user vào mảng và lưu vào localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    return newUser;
}

// Hàm đăng nhập
function login(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        throw new Error('Tên đăng nhập hoặc mật khẩu không đúng!');
    }

    // Lưu thông tin user đang đăng nhập
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));

    return user;
}

// Hàm đăng xuất
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
}

// Hàm kiểm tra trạng thái đăng nhập
function isLoggedIn() {
    return currentUser !== null;
}

// Hàm lấy thông tin user hiện tại
function getCurrentUser() {
    return currentUser;
}

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(product) {
    if (!currentUser) {
        throw new Error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
    }

    // Tìm sản phẩm trong giỏ hàng
    const existingItem = currentUser.cart.find(item => item.id === product.id);

    if (existingItem) {
        // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
        existingItem.quantity += 1;
    } else {
        // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
        currentUser.cart.push({
            ...product,
            quantity: 1
        });
    }

    // Cập nhật thông tin user trong localStorage
    updateUser(currentUser);
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(productId) {
    if (!currentUser) return;

    currentUser.cart = currentUser.cart.filter(item => item.id !== productId);
    updateUser(currentUser);
}

// Hàm cập nhật số lượng sản phẩm trong giỏ hàng
function updateCartItemQuantity(productId, quantity) {
    if (!currentUser) return;

    const item = currentUser.cart.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateUser(currentUser);
        }
    }
}

// Hàm tạo đơn hàng mới
function createOrder() {
    if (!currentUser || currentUser.cart.length === 0) return null;

    const order = {
        id: Date.now().toString(),
        items: [...currentUser.cart],
        status: 'Đang xử lý',
        createdAt: new Date().toISOString(),
        total: currentUser.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };

    currentUser.orders.push(order);
    currentUser.cart = []; // Xóa giỏ hàng sau khi đặt hàng
    updateUser(currentUser);

    return order;
}

// Hàm cập nhật thông tin user
function updateUser(user) {
    // Cập nhật trong mảng users
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
        users[index] = user;
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Cập nhật currentUser
    if (currentUser && currentUser.id === user.id) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
}

// Export các hàm để sử dụng
export {
    register,
    login,
    logout,
    isLoggedIn,
    getCurrentUser,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    createOrder
};