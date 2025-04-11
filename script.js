document.addEventListener('DOMContentLoaded', function() {
    const brandLinks = document.querySelectorAll('.brand-filter a');
    const productCards = document.querySelectorAll('.product-card');

    // Thêm sự kiện click cho các link thương hiệu
    brandLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Xóa class active khỏi tất cả các link
            brandLinks.forEach(l => l.classList.remove('active'));
            
            // Thêm class active cho link được click
            this.classList.add('active');
            
            const selectedBrand = this.getAttribute('data-brand');
            
            // Hiển thị tất cả sản phẩm nếu click vào 'Tất cả'
            if (selectedBrand === 'all') {
                productCards.forEach(card => {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                });
                return;
            }
            
            // Lọc và hiển thị sản phẩm theo thương hiệu
            productCards.forEach(card => {
                const cardBrand = card.getAttribute('data-brand');
                if (cardBrand === selectedBrand) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // Thêm hiệu ứng hover cho sản phẩm
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});