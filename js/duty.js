// 执勤表页面功能

document.addEventListener('DOMContentLoaded', function() {
    // 标签页切换功能
    const tabButtons = document.querySelectorAll('.tab-btn');
    const daySchedules = document.querySelectorAll('.day-schedule');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetDay = this.getAttribute('data-day');
            
            // 移除所有活动状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            daySchedules.forEach(schedule => schedule.classList.remove('active'));
            
            // 添加活动状态到当前选中的标签
            this.classList.add('active');
            
            // 显示对应的日程内容
            const targetSchedule = document.getElementById(targetDay);
            if (targetSchedule) {
                targetSchedule.classList.add('active');
            }
        });
    });

    // 添加标签页切换动画
    function addTabAnimation() {
        const activeSchedule = document.querySelector('.day-schedule.active');
        if (activeSchedule) {
            activeSchedule.style.opacity = '0';
            activeSchedule.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                activeSchedule.style.transition = 'all 0.3s ease';
                activeSchedule.style.opacity = '1';
                activeSchedule.style.transform = 'translateY(0)';
            }, 50);
        }
    }

    // 为标签按钮添加点击动画
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 添加点击波纹效果
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // 添加波纹动画CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // 时间槽位悬停效果
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        slot.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 值班人员信息点击展开
    const dutyPersons = document.querySelectorAll('.duty-person');
    dutyPersons.forEach(person => {
        person.addEventListener('click', function() {
            const contact = this.querySelector('.contact');
            if (contact) {
                // 复制联系方式到剪贴板
                const phoneNumber = contact.textContent.trim();
                navigator.clipboard.writeText(phoneNumber).then(() => {
                    // 显示复制成功提示
                    showNotification('联系方式已复制到剪贴板', 'success');
                }).catch(() => {
                    showNotification('复制失败，请手动复制', 'error');
                });
            }
        });
    });

    // 通知提示功能
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // 添加通知样式
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // 显示动画
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // 自动隐藏
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // 统计卡片数字动画
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target;
                const finalValue = parseInt(number.textContent);
                animateNumber(number, 0, finalValue, 1000);
                numberObserver.unobserve(number);
            }
        });
    }, observerOptions);

    statNumbers.forEach(number => {
        numberObserver.observe(number);
    });

    function animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        const originalText = element.textContent;
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // 使用缓动函数
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(start + (end - start) * easeOutQuart);
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = originalText;
            }
        }
        
        requestAnimationFrame(updateNumber);
    }

    // 页面加载完成后的初始化
    setTimeout(() => {
        addTabAnimation();
    }, 100);
}); 