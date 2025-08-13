// 新闻区页面JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    // 模拟新闻数据
    const newsData = [
        {
            id: 1,
            title: '2025年秋季招新活动正式启动',
            category: 'activity',
            categoryText: '活动新闻',
            date: '2024-09-10',
            views: 1234,
            content: '学生会宣传外联部2025年秋季招新活动正式启动，欢迎各位同学踊跃报名参加。本次招新将面向全校学生，提供多个岗位机会，包括宣传组、外联组、摄影组、设计组等。我们期待有创意、有热情、有责任心的同学加入我们的团队！',
            featured: true,
            image: '../img/new_zhaoxin.png',
            author: '23g3 倪梦阳',
            avatar: '../img/logo/footer-logo.png',
            location: '合肥工业学校'
        },
        {
            id: 2,
            title: '部门荣获年度优秀部门奖',
            category: 'achievement',
            categoryText: '成果展示',
            date: '2024-01-18',
            views: 856,
            content: '在2023年度学生会评选中，宣传外联部凭借出色的工作表现和突出的贡献，荣获年度优秀部门奖...',
            featured: true,
            author: '宣传外联部',
            avatar: '../img/logo/footer-logo.png',
            location: '合肥工业学校'
        },
        {
            id: 3,
            title: '建工部一楼阶梯教室开展【毕业学生返校分享讲座】',
            category: 'cooperation',
            categoryText: '活动新闻',
            date: '2025-05-28',
            views: 567,
            content: '建工部一楼阶梯教室开展【毕业学生返校分享讲座】',
            featured: true,
            image: '../img/news/527优秀毕业生交流会.jpg',
            author: '宣传外联部',
            avatar: '../img/logo/footer-logo.png',
            location: '合肥工业学校'
        },
        {
            id: 4,
            title: '校园文化节筹备工作启动',
            category: 'activity',
            categoryText: '活动新闻',
            date: '2024-01-12',
            views: 432,
            content: '2024年校园文化节筹备工作正式启动，各部门分工明确，各项工作有序推进...',
            image: '../img/news/0515合肥工业学校第六届文化艺术节文艺汇演.png',
            author: '宣传外联部',
            avatar: '../img/logo/footer-logo.png',
            location: '合肥工业学校'
        },
        {
            id: 5,
            title: '第十届主席团第一次全体学生会会议成功召开',
            category: 'activity',
            categoryText: '活动新闻',
            date: '2025-06-04',
            views: 345,
            content: '第十届主席团第一次全体学生会会议成功召开',
            image: '../img/news/0604第十届主席团第一次全体学生会会议.JPG',
            author: '宣传外联部',
            avatar: '../img/logo/footer-logo.png',
            location: '合肥工业学校'
        },
        {
            id: 6,
            title: '重要通知：部门例会时间调整',
            category: 'announcement',
            categoryText: '通知公告',
            date: '2024-01-08',
            views: 678,
            content: '因学校安排调整，部门例会时间从每周三下午调整为每周四下午，请各位成员注意时间变更...',
            author: '宣传外联部',
            avatar: '../img/logo/footer-logo.png',
            location: '合肥工业学校'
        },
        {
            id: 7,
            title: '摄影作品在校园摄影大赛中获奖',
            category: 'achievement',
            categoryText: '成果展示',
            date: '2024-01-05',
            views: 234,
            content: '我部门摄影组同学的作品在校园摄影大赛中获得一等奖，展现了部门在摄影方面的专业水平...',
            author: '宣传外联部',
            avatar: '../img/logo/footer-logo.png',
            location: '合肥工业学校'
        },
        {
            id: 8,
            title: '与校友企业建立合作关系',
            category: 'cooperation',
            categoryText: '合作动态',
            date: '2024-01-03',
            views: 189,
            content: '与校友企业建立合作关系，为在校学生提供实习和就业机会，促进校企合作发展...',
            author: '宣传外联部',
            avatar: '../img/logo/footer-logo.png',
            location: '合肥工业学校'
        }
    ];

    let currentPage = 1;
    let currentFilter = 'all';
    let currentSearch = '';
    const itemsPerPage = 6;

    // 搜索功能
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const categoryFilter = document.getElementById('categoryFilter');
    const timeFilter = document.getElementById('timeFilter');

    function performSearch() {
        currentSearch = searchInput.value.trim();
        currentPage = 1;
        loadNews();
    }

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // 筛选功能
    categoryFilter.addEventListener('change', () => {
        currentFilter = categoryFilter.value;
        currentPage = 1;
        loadNews();
    });

    timeFilter.addEventListener('change', () => {
        currentPage = 1;
        loadNews();
    });

    // 加载新闻
    function loadNews() {
        const newsList = document.getElementById('newsList');
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        
        // 筛选新闻
        let filteredNews = newsData.filter(news => {
            // 搜索筛选
            if (currentSearch && !news.title.toLowerCase().includes(currentSearch.toLowerCase()) && 
                !news.content.toLowerCase().includes(currentSearch.toLowerCase())) {
                return false;
            }
            
            // 分类筛选
            if (currentFilter && currentFilter !== 'all' && news.category !== currentFilter) {
                return false;
            }
            
            // 时间筛选
            const timeFilterValue = timeFilter.value;
            if (timeFilterValue) {
                const newsDate = new Date(news.date);
                const today = new Date();
                const diffTime = Math.abs(today - newsDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                switch (timeFilterValue) {
                    case 'today':
                        if (diffDays > 1) return false;
                        break;
                    case 'week':
                        if (diffDays > 7) return false;
                        break;
                    case 'month':
                        if (diffDays > 30) return false;
                        break;
                    case 'year':
                        if (diffDays > 365) return false;
                        break;
                }
            }
            
            return true;
        });

        // 分页
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageNews = filteredNews.slice(startIndex, endIndex);

        // 清空现有内容
        if (currentPage === 1) {
            newsList.innerHTML = '';
        }

        // 渲染新闻
        pageNews.forEach(news => {
            const newsCard = createNewsCard(news);
            newsList.appendChild(newsCard);
        });

        // 显示/隐藏加载更多按钮
        if (endIndex >= filteredNews.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }

        // 如果没有搜索结果
        if (filteredNews.length === 0) {
            newsList.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>没有找到相关新闻</h3>
                    <p>请尝试调整搜索条件或筛选条件</p>
                </div>
            `;
            loadMoreBtn.style.display = 'none';
        }
    }

    // 创建新闻卡片
    function createNewsCard(news) {
        const card = document.createElement('div');
        card.className = 'news-card';
        // 卡片顶部为图片，统一高度和圆角
        const imageContent = news.image ?
            `<div style="width:100%;height:160px;overflow:hidden;border-radius:16px 16px 0 0;background:#f3f3f3;">
                <img src="${news.image}" alt="${news.title}" style="width:100%;height:100%;object-fit:cover;display:block;">
            </div>` :
            `<div class="placeholder-image" style="width:100%;height:160px;display:flex;align-items:center;justify-content:center;background:#f3f3f3;border-radius:16px 16px 0 0;">
                <i class="fas fa-newspaper" style="font-size:2.5em;color:#bbb;"></i>
            </div>`;
        card.innerHTML = `
            ${imageContent}
            <div class="news-content" style="padding:1.2rem 1.5rem 0.5rem 1.5rem;display:flex;flex-direction:column;align-items:flex-start;">
                <div class="news-title" style="font-size:1.1rem;font-weight:700;margin-bottom:0.5rem;">${news.title}</div>
                <div class="news-summary" style="color:#666;font-size:0.98rem;margin-bottom:0.7rem;line-height:1.6;">${news.content.slice(0, 48)}...</div>
                <a href="news/${news.id}.html" class="btn btn-primary" style="margin-top:0.5rem;">阅读详情</a>
            </div>
            <div class="news-meta" style="display:flex;align-items:center;justify-content:space-between;padding:0.7rem 1.5rem 1.1rem 1.5rem;color:#a3a7b7;font-size:0.95em;">
                <div style="display:flex;align-items:center;gap:8px;">
                    <img src="${news.avatar || '../img/logo/footer-logo.png'}" alt="avatar" style="width:28px;height:28px;border-radius:50%;object-fit:cover;">
                    <span>${news.author || '宣传外联部'}</span>
                </div>
                <span><i class="fas fa-calendar"></i> ${news.date}</span>
            </div>
        `;
        return card;
    }

    // 显示新闻详情
    function showNewsDetail(news, isAdmin) {
        const modal = document.createElement('div');
        modal.className = 'news-modal';
        modal.innerHTML = `
            <div class="modal-content${isAdmin ? ' admin' : ''}">
                ${isAdmin ? '<button class="edit-btn" title="编辑"><i class="fas fa-edit"></i></button>' : ''}
                <button class="modal-close">&times;</button>
                <div class="modal-image">${news.image ? `<img src="${news.image}" alt="">` : '<i class="fas fa-newspaper"></i>'}</div>
                <div class="modal-body">
                    <div class="modal-title">${news.title}</div>
                    <div class="modal-meta">
                        <span><i class="fas fa-calendar"></i> ${news.date}</span>
                        <span><i class="fas fa-eye"></i> ${news.views}</span>
                    </div>
                    <div class="modal-content-text">${news.content}</div>
                </div>
                <div class="modal-actions">
                    <i class="far fa-thumbs-up"></i>
                    <i class="far fa-comment"></i>
                    <i class="far fa-share-square"></i>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        // 关闭
        modal.querySelector('.modal-close').onclick = () => document.body.removeChild(modal);
        modal.onclick = (e) => { if (e.target === modal) document.body.removeChild(modal); };
        // 编辑按钮
        if (isAdmin) {
            modal.querySelector('.edit-btn').onclick = (e) => {
                e.stopPropagation();
                document.body.removeChild(modal);
                showEditNewsModal(news);
            };
        }
        // ESC关闭
        document.addEventListener('keydown', function closeModal(e) {
            if (e.key === 'Escape') {
                if (document.body.contains(modal)) document.body.removeChild(modal);
                document.removeEventListener('keydown', closeModal);
            }
        });
    }

    // 编辑新闻弹窗（本地模拟）
    function showEditNewsModal(news) {
        const modal = document.createElement('div');
        modal.className = 'news-modal';
        modal.innerHTML = `
            <div class="modal-content admin">
                <button class="modal-close">&times;</button>
                <form class="modal-body" style="display:flex;flex-direction:column;gap:1.2rem;">
                    <label>标题<input type="text" name="title" value="${news.title}" required style="padding:8px;border-radius:6px;border:1px solid #ccc;"></label>
                    <label>内容<textarea name="content" rows="6" required style="padding:8px;border-radius:6px;border:1px solid #ccc;">${news.content}</textarea></label>
                    <button type="submit" style="background:#6366f1;color:#fff;border:none;border-radius:8px;padding:10px 0;font-size:1.1em;">保存</button>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('.modal-close').onclick = () => document.body.removeChild(modal);
        modal.onclick = (e) => { if (e.target === modal) document.body.removeChild(modal); };
        // 保存（本地模拟）
        modal.querySelector('form').onsubmit = (e) => {
            e.preventDefault();
            news.title = e.target.title.value;
            news.content = e.target.content.value;
            document.body.removeChild(modal);
            loadNews();
            showNotification('新闻已保存（仅本地模拟）', 'success');
        };
    }

    // 加载更多
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        loadNews();
    });

    // 订阅功能
    const subscribeForm = document.getElementById('subscribeForm');
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = subscribeForm.querySelector('input[type="email"]').value;
        const checkboxes = subscribeForm.querySelectorAll('input[type="checkbox"]:checked');
        const categories = Array.from(checkboxes).map(cb => cb.parentNode.textContent.trim());
        
        if (email && categories.length > 0) {
            showNotification(`订阅成功！您将收到以下类别的新闻：${categories.join(', ')}`, 'success');
            subscribeForm.reset();
        } else {
            showNotification('请填写邮箱地址并选择至少一个订阅类别', 'error');
        }
    });

    // 通知功能
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        const colors = {
            'success': '#28a745',
            'error': '#dc3545',
            'warning': '#ffc107',
            'info': '#667eea'
        };
        notification.style.background = colors[type] || colors.info;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // 分类卡片点击事件
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const categories = ['activity', 'announcement', 'achievement', 'cooperation'];
            categoryFilter.value = categories[index];
            currentFilter = categories[index];
            currentPage = 1;
            loadNews();
            
            // 滚动到新闻列表
            document.querySelector('.news-list-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 初始化加载
    loadNews();

    // 添加无结果样式
    const style = document.createElement('style');
    style.textContent = `
        .no-results {
            text-align: center;
            padding: 3rem;
            color: #666;
        }
        
        .no-results i {
            font-size: 4rem;
            color: #ddd;
            margin-bottom: 1rem;
        }
        
        .no-results h3 {
            margin-bottom: 0.5rem;
            color: #333;
        }
        
        .news-card {
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    console.log('新闻区页面初始化完成！');
}); 