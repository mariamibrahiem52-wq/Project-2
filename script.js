// ============================================================
// script.js - جميع الوظائف المشتركة بين الصفحات
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ---------- شاشة التحميل ----------
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 800);
    }

    // ---------- القائمة المتنقلة (هامبرغر) ----------
    const hamburger = document.getElementById('hamburger');
    const navList = document.querySelector('.nav-list');
    if (hamburger && navList) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('open');
        });
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navList.classList.remove('open');
            });
        });
    }

    // ---------- زر العودة للأعلى ----------
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---------- تمرير سلس ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ---------- إظهار/إخفاء كلمة المرور ----------
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });

    // ---------- تبديل بين تسجيل الدخول وإنشاء حساب ----------
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (showRegister && loginForm && registerForm) {
        showRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        });
    }

    if (showLogin && loginForm && registerForm) {
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        });
    }

    // ---------- التحقق من صحة نماذج تسجيل الدخول والتسجيل ----------
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            let valid = true;
            const email = loginForm.querySelector('input[name="email"]');
            const password = loginForm.querySelector('input[name="password"]');
            const emailError = document.getElementById('email-error');
            const passwordError = document.getElementById('password-error');

            if (emailError) emailError.textContent = '';
            if (passwordError) passwordError.textContent = '';

            if (!email.value.trim()) {
                if (emailError) emailError.textContent = 'البريد الإلكتروني مطلوب';
                valid = false;
            } else if (!/\S+@\S+\.\S+/.test(email.value)) {
                if (emailError) emailError.textContent = 'يرجى إدخال بريد صحيح';
                valid = false;
            }

            if (!password.value.trim()) {
                if (passwordError) passwordError.textContent = 'كلمة المرور مطلوبة';
                valid = false;
            } else if (password.value.length < 6) {
                if (passwordError) passwordError.textContent = 'يجب أن تكون 6 أحرف على الأقل';
                valid = false;
            }

            if (!valid) e.preventDefault();
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            let valid = true;
            const name = registerForm.querySelector('input[name="fullname"]');
            const email = registerForm.querySelector('input[name="email"]');
            const password = registerForm.querySelector('input[name="password"]');
            const confirm = registerForm.querySelector('input[name="confirm_password"]');
            const nameError = document.getElementById('reg-name-error');
            const emailError = document.getElementById('reg-email-error');
            const passwordError = document.getElementById('reg-password-error');
            const confirmError = document.getElementById('reg-confirm-error');

            if (nameError) nameError.textContent = '';
            if (emailError) emailError.textContent = '';
            if (passwordError) passwordError.textContent = '';
            if (confirmError) confirmError.textContent = '';

            if (!name.value.trim() || name.value.trim().length < 3) {
                if (nameError) nameError.textContent = 'الاسم 3 أحرف على الأقل';
                valid = false;
            }
            if (!email.value.trim() || !/\S+@\S+\.\S+/.test(email.value)) {
                if (emailError) emailError.textContent = 'بريد غير صحيح';
                valid = false;
            }
            if (!password.value.trim() || password.value.length < 6) {
                if (passwordError) passwordError.textContent = '6 أحرف على الأقل';
                valid = false;
            }
            if (confirm.value !== password.value) {
                if (confirmError) confirmError.textContent = 'غير متطابقة';
                valid = false;
            }

            if (!valid) e.preventDefault();
        });
    }

    // ---------- العداد المتحرك ----------
    const counters = document.querySelectorAll('.counter');
    if (counters.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    let current = 0;
                    const step = Math.ceil(target / 60);
                    const interval = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(interval);
                        } else {
                            counter.textContent = current;
                        }
                    }, 25);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(c => observer.observe(c));
    }

    // ---------- سلايدر الشهادات ----------
    const slider = document.getElementById('testimonial-slider');
    if (slider) {
        const slides = slider.querySelectorAll('.testimonial-card');
        let currentSlide = 0;
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);

        let autoSlide = setInterval(nextSlide, 5000);
        slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
        slider.addEventListener('mouseleave', () => {
            autoSlide = setInterval(nextSlide, 5000);
        });
    }

    // ---------- إشعارات (مثال) ----------
    window.showNotification = function(message, type = 'info') {
        const notif = document.createElement('div');
        notif.className = `notification notification-${type}`;
        notif.textContent = message;
        notif.style.cssText = `
            position: fixed; bottom: 20px; right: 20px;
            background: var(--dark); color: var(--white);
            padding: 15px 25px; border-radius: 30px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 9999;
            font-weight: 600;
            animation: slideUp 0.5s ease;
        `;
        document.body.appendChild(notif);
        setTimeout(() => {
            notif.style.opacity = '0';
            notif.style.transition = 'opacity 0.5s';
            setTimeout(() => notif.remove(), 500);
        }, 3000);
    };

    // ---------- المنتجات (AJAX) ----------
    const productGrid = document.getElementById('product-grid');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const categoryFilter = document.getElementById('category-filter');
    const sortSelect = document.getElementById('sort-select');
    const pagination = document.getElementById('pagination');

    if (productGrid) {
        let currentPage = 1;
        const perPage = 6;
        let currentCategory = 'all';
        let currentSort = 'name';
        let currentOrder = 'ASC';
        let searchQuery = '';

        // تحميل التصنيفات
        function loadCategories() {
            if (categoryFilter) {
                fetch('products.php?action=categories')
                    .then(res => res.json())
                    .then(data => {
                        if (data && data.length) {
                            data.forEach(cat => {
                                const option = document.createElement('option');
                                option.value = cat.slug;
                                option.textContent = cat.name;
                                categoryFilter.appendChild(option);
                            });
                        }
                    })
                    .catch(() => {});
            }
        }
        loadCategories();

        // تحميل المنتجات
        function loadProducts(page = 1, category = 'all', sort = 'name', order = 'ASC', search = '') {
            const offset = (page - 1) * perPage;
            let url = `products.php?action=products&limit=${perPage}&offset=${offset}&sort=${sort}&order=${order}`;
            if (category !== 'all') url += `&category=${category}`;
            if (search) url += `&search=${encodeURIComponent(search)}`;

            fetch(url)
                .then(res => res.json())
                .then(data => {
                    if (data.products && data.products.length) {
                        renderProducts(data.products);
                        renderPagination(data.total, page);
                    } else {
                        productGrid.innerHTML = '<p class="text-center">لا توجد منتجات تطابق البحث</p>';
                        if (pagination) pagination.innerHTML = '';
                    }
                })
                .catch(() => {
                    productGrid.innerHTML = '<p class="text-center">حدث خطأ في تحميل المنتجات</p>';
                });
        }

        function renderProducts(products) {
            productGrid.innerHTML = '';
            products.forEach(p => {
                const card = document.createElement('div');
                card.className = 'product-card';
                const image = p.image ? `images/${p.image}` : 'images/default.jpg';
                card.innerHTML = `
                    <img src="${image}" alt="${p.name}" onerror="this.src='images/default.jpg'">
                    <div class="product-info">
                        <h3>${p.name}</h3>
                        <p class="price">${p.price} ج.س</p>
                        <p class="rating">${'★'.repeat(Math.floor(p.rating_avg))}${p.rating_avg % 1 >= 0.5 ? '★' : ''} (${p.rating_avg})</p>
                        <p class="stock">المخزون: ${p.stock}</p>
                        <div class="actions" style="display:flex; gap:8px; margin-top:12px; flex-wrap:wrap;">
                            <button class="btn-details" data-id="${p.id}" style="flex:1; padding:8px; border:none; border-radius:30px; cursor:pointer; background:var(--primary); color:var(--white);">تفاصيل</button>
                            <button class="btn-cart" data-id="${p.id}" style="flex:1; padding:8px; border:none; border-radius:30px; cursor:pointer; background:var(--secondary); color:var(--white);">إضافة للسلة</button>
                            <button class="btn-buy" data-id="${p.id}" style="flex:1; padding:8px; border:none; border-radius:30px; cursor:pointer; background:#28a745; color:var(--white);">شراء الآن</button>
                        </div>
                    </div>
                `;
                productGrid.appendChild(card);
            });

            document.querySelectorAll('.btn-details').forEach(btn => {
                btn.addEventListener('click', function() {
                    showNotification('تفاصيل المنتج رقم ' + this.dataset.id);
                });
            });
            document.querySelectorAll('.btn-cart').forEach(btn => {
                btn.addEventListener('click', function() {
                    showNotification('تم إضافة المنتج رقم ' + this.dataset.id + ' إلى السلة');
                });
            });
            document.querySelectorAll('.btn-buy').forEach(btn => {
                btn.addEventListener('click', function() {
                    showNotification('سيتم توجيهك لصفحة الشراء للمنتج رقم ' + this.dataset.id);
                });
            });
        }

        function renderPagination(total, current) {
            if (!pagination) return;
            const totalPages = Math.ceil(total / perPage);
            pagination.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                const btn = document.createElement('button');
                btn.textContent = i;
                if (i === current) btn.classList.add('active');
                btn.addEventListener('click', function() {
                    currentPage = i;
                    loadProducts(currentPage, currentCategory, currentSort, currentOrder, searchQuery);
                });
                pagination.appendChild(btn);
            }
        }

        // التحميل الأولي
        loadProducts(currentPage, currentCategory, currentSort, currentOrder);

        // أحداث البحث والفلترة
        if (searchBtn) {
            searchBtn.addEventListener('click', function() {
                searchQuery = searchInput ? searchInput.value.trim() : '';
                currentPage = 1;
                loadProducts(currentPage, currentCategory, currentSort, currentOrder, searchQuery);
            });
        }
        if (searchInput) {
            searchInput.addEventListener('keyup', function(e) {
                if (e.key === 'Enter') {
                    searchQuery = this.value.trim();
                    currentPage = 1;
                    loadProducts(currentPage, currentCategory, currentSort, currentOrder, searchQuery);
                }
            });
        }
        if (categoryFilter) {
            categoryFilter.addEventListener('change', function() {
                currentCategory = this.value;
                currentPage = 1;
                loadProducts(currentPage, currentCategory, currentSort, currentOrder, searchQuery);
            });
        }
        if (sortSelect) {
            sortSelect.addEventListener('change', function() {
                const val = this.value;
                if (val === 'price') { currentSort = 'price'; currentOrder = 'ASC'; }
                else if (val === 'price-desc') { currentSort = 'price'; currentOrder = 'DESC'; }
                else if (val === 'rating') { currentSort = 'rating_avg'; currentOrder = 'DESC'; }
                else { currentSort = 'name'; currentOrder = 'ASC'; }
                currentPage = 1;
                loadProducts(currentPage, currentCategory, currentSort, currentOrder, searchQuery);
            });
        }
    }

    console.log('<?= SITE_NAME ?> - تم تحميل الموقع بنجاح');
});