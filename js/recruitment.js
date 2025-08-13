// 导航栏滚动效果
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('bg-dark/90', 'backdrop-blur-md', 'shadow-lg');
    navbar.classList.remove('py-4');
    navbar.classList.add('py-2');
  } else {
    navbar.classList.remove('bg-dark/90', 'backdrop-blur-md', 'shadow-lg');
    navbar.classList.add('py-4');
    navbar.classList.remove('py-2');
  }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// 动画效果
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('opacity-100', 'translate-y-0');
      entry.target.classList.remove('opacity-0', 'translate-y-10');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-300');
  observer.observe(el);
});

// 为所有幻灯片添加进入动画 - 超快速 (1.5s内)
document.querySelectorAll('.slide').forEach((slide, index) => {
  const slideContent = slide.querySelector('.container') || slide.querySelector('.content-wrapper');
  if (slideContent) {
    slideContent.style.opacity = '0';
    slideContent.style.transform = 'translateY(20px)';
    slideContent.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
    window.addEventListener('scroll', function() {
      const slideTop = slide.offsetTop;
      const slideHeight = slide.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      if (scrollY > slideTop - windowHeight + slideHeight / 3) {
        setTimeout(() => {
          slideContent.style.opacity = '1';
          slideContent.style.transform = 'translateY(0)';
        }, index * 50); // 从100ms减少到50ms
      }
    });
  }
});

// 移动端菜单功能
(function() {
  const mobileMenuTrigger = document.getElementById('mobile-menu-trigger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
  const mobileMenuBackdrop = document.querySelector('.mobile-menu-backdrop');
  
  // 打开菜单
  function openMobileMenu() {
    mobileMenu.classList.remove('hidden');
    mobileMenu.classList.add('show');
    document.body.style.overflow = 'hidden'; // 防止背景滚动
  }
  
  // 关闭菜单
  function closeMobileMenu() {
    mobileMenu.classList.remove('show');
    mobileMenu.classList.add('hide');
    
    setTimeout(() => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('hide');
    }, 300);
    
    document.body.style.overflow = ''; // 恢复滚动
  }
  
  // 事件监听
  mobileMenuTrigger.addEventListener('click', openMobileMenu);
  mobileMenuClose.addEventListener('click', closeMobileMenu);
  
  // 点击背景关闭菜单
  mobileMenuBackdrop.addEventListener('click', closeMobileMenu);
  
  // 菜单链接点击关闭菜单
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });
  
  // ESC键关闭菜单
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      closeMobileMenu();
    }
  });
})();

// 回到顶部按钮功能
(function() {
  // 创建按钮
  const btn = document.createElement('button');
  btn.id = 'backToTopBtn';
  btn.innerHTML = '<i class="fa fa-arrow-up"></i>';
  btn.style.position = 'fixed';
  btn.style.right = '32px';
  btn.style.bottom = '32px';
  btn.style.zIndex = '9999';
  btn.style.display = 'none';
  btn.style.background = '#FFD700';
  btn.style.color = '#2C2C2C';
  btn.style.border = 'none';
  btn.style.borderRadius = '50%';
  btn.style.width = '48px';
  btn.style.height = '48px';
  btn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
  btn.style.fontSize = '22px';
  btn.style.cursor = 'pointer';
  btn.style.transition = 'opacity 0.3s';
  document.body.appendChild(btn);

  // 监听滚动，判断是否显示
  window.addEventListener('scroll', function() {
    const slide2 = document.getElementById('slide2');
    if (!slide2) return;
    const rect = slide2.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.5) {
      btn.style.display = 'block';
      btn.style.opacity = '1';
    } else {
      btn.style.opacity = '0';
      setTimeout(() => { btn.style.display = 'none'; }, 300);
    }
  });

  // 点击回到顶部
  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})(); 