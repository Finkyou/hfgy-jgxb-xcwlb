// 导航栏交互
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenuBackdrop = document.querySelector('.mobile-menu-backdrop');

    // 打开移动端菜单
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('show');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    });

    // 关闭移动端菜单
    function closeMobileMenu() {
        mobileMenu.classList.remove('show');
        document.body.style.overflow = ''; // 恢复背景滚动
    }

    // 点击关闭按钮
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    // 点击背景遮罩关闭菜单
    if (mobileMenuBackdrop) {
        mobileMenuBackdrop.addEventListener('click', closeMobileMenu);
    }

    // 点击菜单链接关闭菜单
    document.querySelectorAll('.mobile-menu-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // 点击图标关闭菜单
    document.querySelectorAll('.mobile-menu-icon').forEach(icon => {
        icon.addEventListener('click', closeMobileMenu);
    });

    // 键盘ESC键关闭菜单
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('show')) {
            closeMobileMenu();
        }
    });

    // Banner轮播
    let currentSlide = 0;
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    // 自动轮播
    setInterval(nextSlide, 5000);

    // 点击圆点切换
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // 数据动画
    const dataNumbers = document.querySelectorAll('.data-number');
    
    function animateNumber(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2秒动画
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    // 观察者API，当元素进入视口时触发动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const dataNumber = entry.target;
                animateNumber(dataNumber);
                observer.unobserve(dataNumber); // 只触发一次
            }
        });
    }, {
        threshold: 0.5
    });

    dataNumbers.forEach(number => {
        observer.observe(number);
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 导航栏滚动效果
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // 添加滚动时的导航栏背景
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(102, 126, 234, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            navbar.style.backdropFilter = 'none';
        }
    });

    // 卡片悬停效果
    const cards = document.querySelectorAll('.quick-link-card, .data-card, .honor-item, .gallery-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 添加页面加载动画
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        sectionObserver.observe(section);
    });

    // 添加按钮点击效果
    const buttons = document.querySelectorAll('.btn, .banner-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 创建涟漪效果
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // 添加涟漪效果的CSS
    const style = document.createElement('style');
    style.textContent = `
        .btn, .banner-btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // 添加键盘导航支持
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // 添加触摸支持
    let touchStartX = 0;
    let touchEndX = 0;
    
    const bannerContainer = document.querySelector('.banner-container');
    
    if (bannerContainer) {
        bannerContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        bannerContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // 向左滑动，下一张
                nextSlide();
            } else {
                // 向右滑动，上一张
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                showSlide(currentSlide);
            }
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        var hamburger = document.querySelector('.hamburger');
        var navMenu = document.querySelector('.nav-menu');
        if (hamburger && navMenu) {
            hamburger.onclick = function() {
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
            };
            document.querySelectorAll('.nav-link').forEach(function(link) {
                link.onclick = function() {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                };
            });
        }
    });

    // ===== 返回顶部按钮逻辑开始 =====
    try {
        // 只在非 recruitment 页面显示
        const isRecruitment = /pages[\/]+recruitment\.html$/.test(window.location.pathname);
        if (!isRecruitment) {
            const backToTopBtn = document.createElement('button');
            backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            backToTopBtn.className = 'back-to-top-btn';
            backToTopBtn.style.display = 'none';
            backToTopBtn.style.position = 'fixed';
            backToTopBtn.style.right = '32px';
            backToTopBtn.style.bottom = '32px';
            backToTopBtn.style.left = '';
            backToTopBtn.style.top = '';
            backToTopBtn.style.zIndex = '2000';
            backToTopBtn.style.width = '48px';
            backToTopBtn.style.height = '48px';
            backToTopBtn.style.border = 'none';
            backToTopBtn.style.borderRadius = '50%';
            backToTopBtn.style.background = 'rgba(102,126,234,0.9)';
            backToTopBtn.style.color = '#fff';
            backToTopBtn.style.fontSize = '1.7rem';
            backToTopBtn.style.cursor = 'pointer';
            backToTopBtn.style.boxShadow = '0 4px 16px rgba(0,0,0,0.18)';
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.transition = 'opacity 0.4s, transform 0.3s';
            backToTopBtn.style.transform = 'scale(0.8)';
            document.body.appendChild(backToTopBtn);

            window.addEventListener('scroll', function() {
                if (window.scrollY > window.innerHeight * 0.8) {
                    backToTopBtn.style.display = 'block';
                    setTimeout(()=>{
                        backToTopBtn.style.opacity = '1';
                        backToTopBtn.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    backToTopBtn.style.opacity = '0';
                    backToTopBtn.style.transform = 'scale(0.8)';
                    setTimeout(()=>{backToTopBtn.style.display = 'none';}, 400);
                }
            });

            backToTopBtn.addEventListener('mouseenter', function() {
                backToTopBtn.style.transform = 'scale(1.15)';
                backToTopBtn.style.background = 'rgba(102,126,234,1)';
            });
            backToTopBtn.addEventListener('mouseleave', function() {
                backToTopBtn.style.transform = 'scale(1)';
                backToTopBtn.style.background = 'rgba(102,126,234,0.9)';
            });

            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    } catch(e) {console.error('返回顶部按钮出错', e);}
    // ===== 返回顶部按钮逻辑结束 =====

    // 导航栏吸顶动画
    $(window).on('scroll', function () {
        var scroll = $(window).scrollTop();
        if (scroll < 245) {
            $('.navbar').removeClass('stick');
        } else {
            $('.navbar').addClass('stick');
        }
    });

    console.log('网站初始化完成！');
}); 