document.addEventListener('DOMContentLoaded', () => {
    const brandLinks = document.querySelectorAll('.brand-filter a');
    const productCards = document.querySelectorAll('.product-card');

    // Thêm class active cho link "Tất cả"
    const allBrandsLink = document.createElement('li');
    allBrandsLink.innerHTML = '<a href="#" data-brand="all" class="active">Tất cả</a>';
    document.querySelector('.brand-filter ul').insertBefore(allBrandsLink, document.querySelector('.brand-filter ul').firstChild);

    // Xử lý sự kiện click cho các link thương hiệu
    document.querySelector('.brand-filter').addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            
            // Cập nhật trạng thái active
            brandLinks.forEach(link => link.classList.remove('active'));
            e.target.classList.add('active');
            
            const selectedBrand = e.target.getAttribute('data-brand');
            
            // Hiển thị tất cả sản phẩm nếu chọn "Tất cả"
            if (selectedBrand === 'all') {
                productCards.forEach(card => {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                });
                return;
            }
            
            // Lọc và hiển thị sản phẩm theo thương hiệu
            productCards.forEach(card => {
                const cardBrand = card.getAttribute('data-brand');
                if (cardBrand === selectedBrand) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        }
    });

    // Thêm hiệu ứng hover cho các nút mua ngay
    document.querySelectorAll('.btn-buy').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});