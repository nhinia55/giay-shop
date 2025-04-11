// Danh sách sản phẩm giày
const products = [
    {
        id: '1',
        name: 'Nike Air Force 1 Low',
        brand: 'nike',
        price: 2850000,
        image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoes-WrLlWX.png',
        description: 'Giày thể thao Nike Air Force 1 Low màu trắng cổ điển'
    },
    {
        id: '2',
        name: 'Adidas Superstar',
        brand: 'adidas',
        price: 2400000,
        image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7ed0855435194229a525aad6009a0497_9366/Superstar_Shoes_White_EG4958_01_standard.jpg',
        description: 'Giày thể thao Adidas Superstar phiên bản cổ điển'
    },
    {
        id: '3',
        name: 'Jordan 1 Retro High',
        brand: 'nike',
        price: 4200000,
        image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/air-jordan-1-high-og-shoes-PLe6rN.png',
        description: 'Giày bóng rổ Air Jordan 1 Retro High OG'
    },
    {
        id: '4',
        name: 'Puma RS-X',
        brand: 'puma',
        price: 2600000,
        image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/369579/01/sv01/fnd/PNA/fmt/png/RS-X-Reinvention-Men\'s-Sneakers',
        description: 'Giày thể thao Puma RS-X phong cách retro'
    },
    {
        id: '5',
        name: 'Vans Old Skool',
        brand: 'vans',
        price: 1650000,
        image: 'https://images.vans.com/is/image/VansEU/VN000D3HY28-HERO?$PDP-FULL-IMAGE$',
        description: 'Giày Vans Old Skool Classic màu đen trắng'
    },
    {
        id: '6',
        name: 'Nike Air Max 270',
        brand: 'nike',
        price: 3900000,
        image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-shoes-2V5C4p.png',
        description: 'Giày thể thao Nike Air Max 270 với đệm khí visible'
    },
    {
        id: '7',
        name: 'Adidas Ultra Boost',
        brand: 'adidas',
        price: 4500000,
        image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/69cbc73d0cb846889f89acbb011e68cb_9366/Ultraboost_Light_Shoes_White_GY9850_01_standard.jpg',
        description: 'Giày chạy bộ Adidas Ultra Boost với công nghệ Boost'
    },
    {
        id: '8',
        name: 'Converse Chuck 70',
        brand: 'converse',
        price: 1800000,
        image: 'https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw8d525b64/images/a_107/162058C_A_107X1.jpg',
        description: 'Giày Converse Chuck 70 High Top phiên bản cao cấp'
    },
    {
        id: '9',
        name: 'New Balance 574',
        brand: 'new-balance',
        price: 2200000,
        image: 'https://nb.scene7.com/is/image/NB/ml574evg_nb_02_i?$pdpflexf2$&wid=440&hei=440',
        description: 'Giày thể thao New Balance 574 Classic'
    },
    {
        id: '10',
        name: 'Reebok Classic Leather',
        brand: 'reebok',
        price: 1950000,
        image: 'https://assets.reebok.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/7937f607950945189297aaf50142b9c5_9366/Classic_Leather_Shoes_White_49799_01_standard.jpg',
        description: 'Giày Reebok Classic Leather màu trắng'
    },
    // Thêm 40 sản phẩm khác
    {
        id: '11',
        name: 'Nike Dunk Low',
        brand: 'nike',
        price: 2950000,
        image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/5e7687f1-c13e-4bac-8ffa-a6f863ae9157/dunk-low-shoes-RwPL6m.png',
        description: 'Giày thể thao Nike Dunk Low phiên bản mới'
    },
    {
        id: '12',
        name: 'Adidas NMD R1',
        brand: 'adidas',
        price: 3200000,
        image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/96a5f085ef8b4e678095abad01056711_9366/NMD_R1_Shoes_Black_GZ9256_01_standard.jpg',
        description: 'Giày thể thao Adidas NMD R1 phong cách hiện đại'
    },
    // Thêm các sản phẩm còn lại tương tự
    {
        id: '50',
        name: 'Puma Suede Classic',
        brand: 'puma',
        price: 1800000,
        image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/374915/01/sv01/fnd/PNA/fmt/png/Suede-Classic-XXI-Men\'s-Sneakers',
        description: 'Giày thể thao Puma Suede Classic phiên bản 2023'
    }
];

// Hàm lọc sản phẩm theo thương hiệu
function filterProductsByBrand(brand) {
    if (brand === 'all') return products;
    return products.filter(product => product.brand === brand);
}

// Hàm tìm sản phẩm theo ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

// Export các hàm và dữ liệu
export {
    products,
    filterProductsByBrand,
    getProductById
};