// Dữ liệu sản phẩm mẫu
const products = [
    {
        id: 1,
        name: 'Nike Air Max 270',
        brand: 'nike',
        price: 2890000,
        image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-shoes-2V5C4p.png'
    },
    {
        id: 2,
        name: 'Adidas Ultraboost 21',
        brand: 'adidas',
        price: 4200000,
        image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg'
    },
    {
        id: 3,
        name: 'Puma RS-X',
        brand: 'puma',
        price: 2500000,
        image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1350,h_1350/global/368845/02/sv01/fnd/IND/fmt/png/RS-X-Reinvention-Sneakers'
    },
    {
        id: 4,
        name: 'Jordan 1 Retro High',
        brand: 'jordan',
        price: 7500000,
        image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/air-jordan-1-high-og-shoes-d1nVFf.png'
    },
    {
        id: 5,
        name: 'Yeezy Boost 350 V2',
        brand: 'yeezy',
        price: 8500000,
        image: 'https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/052/819/344/original/704071_01.jpg.jpeg'
    }
];

// Hàm định dạng giá tiền VNĐ
function formatPrice(price) {
    return price.toLocaleString('vi-VN') + ' ₫';
}

// Hàm hiển thị sản phẩm
function displayProducts(filteredProducts) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Image+Not+Found'">
            <h3>${product.name}</h3>
            <p class="price">${formatPrice(product.price)}</p>
            <a href="#" class="btn">Mua ngay</a>
        `;
        productGrid.appendChild(productCard);
    });
}

// Xử lý lọc theo thương hiệu
document.querySelectorAll('.brand-filter a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const brand = e.target.dataset.brand;
        const filteredProducts = brand === 'all' ? 
            products : 
            products.filter(product => product.brand === brand);
        displayProducts(filteredProducts);

        // Đánh dấu thương hiệu đang được chọn
        document.querySelectorAll('.brand-filter a').forEach(a => a.classList.remove('active'));
        e.target.classList.add('active');
    });
});

// Xử lý lọc theo giá
document.getElementById('price-range').addEventListener('change', (e) => {
    const range = e.target.value;
    let filteredProducts = [...products];

    if (range !== 'all') {
        const [min, max] = range.split('-').map(Number);
        filteredProducts = products.filter(product => {
            if (max) {
                return product.price >= min && product.price <= max;
            } else {
                return product.price >= min;
            }
        });
    }

    displayProducts(filteredProducts);
});

// Hiển thị tất cả sản phẩm khi trang web được tải
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
});