// 摄影展区页面JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    // 模拟摄影作品数据
    const photoData = [
        {
            id: 1,
            title: '校园春色',
            category: 'campus',
            categoryText: '校园风光',
            photographer: '张同学',
            date: '2024-01-20',
            likes: 156,
            description: '春天的校园，樱花盛开，阳光透过花瓣洒在校园的小径上，营造出温馨浪漫的氛围。',
            featured: true
        },
        {
            id: 2,
            title: '团队合影',
            category: 'activity',
            categoryText: '活动记录',
            photographer: '李同学',
            date: '2024-01-18',
            likes: 98,
            description: '部门成员在活动结束后的合影，展现了团队的凝聚力和活力。'
        },
        {
            id: 3,
            title: '活动瞬间',
            category: 'activity',
            categoryText: '活动记录',
            photographer: '王同学',
            date: '2024-01-15',
            likes: 134,
            description: '捕捉到活动中的精彩瞬间，展现了同学们参与活动的热情。'
        },
        {
            id: 4,
            title: '人物特写',
            category: 'portrait',
            categoryText: '人物特写',
            photographer: '张同学',
            date: '2024-01-12',
            likes: 89,
            description: '通过特写镜头展现人物的情感和表情，体现了摄影的艺术性。'
        },
        {
            id: 5,
            title: '创意构图',
            category: 'creative',
            categoryText: '创意摄影',
            photographer: '王同学',
            date: '2024-01-10',
            likes: 167,
            description: '运用独特的构图技巧和创意元素，创造出具有艺术感的摄影作品。'
        },
        {
            id: 6,
            title: '校园夜景',
            category: 'campus',
            categoryText: '校园风光',
            photographer: '李同学',
            date: '2024-01-08',
            likes: 112,
            description: '夜晚的校园在灯光的映照下显得格外宁静美丽。'
        },
        {
            id: 7,
            title: '光影艺术',
            category: 'creative',
            categoryText: '创意摄影',
            photographer: '张同学',
            date: '2024-01-05',
            likes: 145,
            description: '利用自然光影创造出独特的视觉效果，展现了摄影的艺术魅力。'
        },
        {
            id: 8,
            title: '活动花絮',
            category: 'activity',
            categoryText: '活动记录',
            photographer: '王同学',
            date: '2024-01-03',
            likes: 76,
            description: '记录活动中的精彩花絮，展现了活动的丰富多彩。'
        }
    ];

    let currentFilter = 'all';
    let currentSearch = '';
    let currentPage = 1;
    const itemsPerPage = 6;

    // 筛选功能
    const filterTabs = document.querySelectorAll('.filter-tab');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    // 筛选标签点击事件
filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // 移除所有活动状态
        filterTabs.forEach(t => t.classList.remove('active'));
        // 添加当前活动状态
        tab.classList.add('active');
        
        currentFilter = tab.getAttribute('data-filter');
        currentPage = 1;
        loadPhotos();
        // 新增：点击后滚动到作品展示区
        const gallerySection = document.querySelector('.gallery-section');
        if (gallerySection) {
            gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

    // 筛选标签点击事件
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有活动状态
            filterTabs.forEach(t => t.classList.remove('active'));
            // 添加当前活动状态
            tab.classList.add('active');
            
            currentFilter = tab.getAttribute('data-filter');
            currentPage = 1;
            loadPhotos();
        });
    });

    // 搜索功能
    function performSearch() {
        currentSearch = searchInput.value.trim();
        currentPage = 1;
        loadPhotos();
    }

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // 加载摄影作品
    function loadPhotos() {
        const galleryGrid = document.getElementById('galleryGrid');
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        
        // 筛选作品
        let filteredPhotos = photoData.filter(photo => {
            // 搜索筛选
            if (currentSearch && !photo.title.toLowerCase().includes(currentSearch.toLowerCase()) && 
                !photo.description.toLowerCase().includes(currentSearch.toLowerCase())) {
                return false;
            }
            
            // 分类筛选
            if (currentFilter && currentFilter !== 'all' && photo.category !== currentFilter) {
                return false;
            }
            
            return true;
        });

        // 分页
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pagePhotos = filteredPhotos.slice(startIndex, endIndex);

        // 清空现有内容
        if (currentPage === 1) {
            galleryGrid.innerHTML = '';
        }

        // 渲染作品
        pagePhotos.forEach(photo => {
            const photoCard = createPhotoCard(photo);
            galleryGrid.appendChild(photoCard);
        });

        // 显示/隐藏加载更多按钮
        if (endIndex >= filteredPhotos.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }

        // 如果没有搜索结果
        if (filteredPhotos.length === 0) {
            galleryGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-camera"></i>
                    <h3>没有找到相关作品</h3>
                    <p>请尝试调整搜索条件或筛选条件</p>
                </div>
            `;
            loadMoreBtn.style.display = 'none';
        }
    }

    // 创建摄影作品卡片
    function createPhotoCard(photo) {
        const card = document.createElement('div');
        card.className = 'photo-card';
        
        card.innerHTML = `
            <div class="photo-image">
                <div class="placeholder-image">
                    <i class="fas fa-camera"></i>
                    <p>摄影作品</p>
                </div>
                <div class="photo-overlay">
                    <div class="photo-info">
                        <h3>${photo.title}</h3>
                        <p>摄影师：${photo.photographer}</p>
                    </div>
                </div>
            </div>
        `;

        // 添加点击事件
        card.addEventListener('click', () => {
            showPhotoDetail(photo);
        });

        return card;
    }

    // 显示作品详情
    function showPhotoDetail(photo) {
        const modal = document.createElement('div');
        modal.className = 'photo-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 20px;
        `;

        modal.innerHTML = `
            <div class="modal-content" style="
                background: white;
                border-radius: 15px;
                max-width: 800px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
            ">
                <button class="modal-close" style="
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #666;
                    z-index: 1;
                ">&times;</button>
                <div class="modal-image" style="
                    height: 400px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 4rem;
                    position: relative;
                ">
                    <i class="fas fa-camera"></i>
                    <div style="
                        position: absolute;
                        top: 15px;
                        left: 15px;
                        background: rgba(102, 126, 234, 0.9);
                        color: white;
                        padding: 5px 12px;
                        border-radius: 15px;
                        font-size: 0.8rem;
                    ">${photo.categoryText}</div>
                </div>
                <div style="padding: 2rem;">
                    <h2 style="font-size: 2rem; margin-bottom: 1rem; color: #333;">${photo.title}</h2>
                    <div style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        color: #999;
                        font-size: 0.9rem;
                        margin-bottom: 2rem;
                        padding-bottom: 1rem;
                        border-bottom: 1px solid #eee;
                    ">
                        <span><i class="fas fa-user"></i> ${photo.photographer}</span>
                        <span><i class="fas fa-calendar"></i> ${photo.date}</span>
                        <span><i class="fas fa-heart"></i> ${photo.likes} 赞</span>
                    </div>
                    <div style="
                        line-height: 1.8;
                        color: #666;
                        font-size: 1.1rem;
                    ">
                        <p>${photo.description}</p>
                        <p>这幅作品展现了摄影师独特的视角和精湛的技术，通过光影的运用和构图的安排，成功地传达了作品的主题和情感。</p>
                        <p>摄影不仅仅是记录，更是一种艺术表达，每一幅作品都承载着摄影师对世界的理解和感悟。</p>
                    </div>
                    <div style="
                        margin-top: 2rem;
                        padding-top: 1rem;
                        border-top: 1px solid #eee;
                        display: flex;
                        gap: 1rem;
                    ">
                        <button style="
                            padding: 8px 16px;
                            background: #667eea;
                            color: white;
                            border: none;
                            border-radius: 20px;
                            cursor: pointer;
                            font-size: 0.9rem;
                        " onclick="likePhoto(${photo.id})">
                            <i class="fas fa-heart"></i> 点赞
                        </button>
                        <button style="
                            padding: 8px 16px;
                            background: transparent;
                            color: #667eea;
                            border: 2px solid #667eea;
                            border-radius: 20px;
                            cursor: pointer;
                            font-size: 0.9rem;
                        ">
                            <i class="fas fa-share"></i> 分享
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // 关闭模态框
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });

        // ESC键关闭
        document.addEventListener('keydown', function closeModal(e) {
            if (e.key === 'Escape') {
                document.body.removeChild(modal);
                document.removeEventListener('keydown', closeModal);
            }
        });
    }

    // 点赞功能
    window.likePhoto = function(photoId) {
        const photo = photoData.find(p => p.id === photoId);
        if (photo) {
            photo.likes++;
            showNotification('点赞成功！', 'success');
        }
    };

    // 加载更多
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        loadPhotos();
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
        }, 3000);
    }

    // 摄影技巧卡片点击事件
    const tipCards = document.querySelectorAll('.tip-card');
    tipCards.forEach(card => {
        const link = card.querySelector('.tip-link');
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const title = card.querySelector('h3').textContent;
            showTipDetail(title);
        });
    });

    // 显示技巧详情
    function showTipDetail(title) {
        const modal = document.createElement('div');
        modal.className = 'tip-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 20px;
        `;

        modal.innerHTML = `
            <div class="modal-content" style="
                background: white;
                border-radius: 15px;
                max-width: 600px;
                width: 100%;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
                padding: 2rem;
            ">
                <button class="modal-close" style="
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #666;
                    z-index: 1;
                ">&times;</button>
                <h2 style="font-size: 2rem; margin-bottom: 1rem; color: #333;">${title}</h2>
                <div style="
                    line-height: 1.8;
                    color: #666;
                    font-size: 1.1rem;
                ">
                    <p>这里是关于${title}的详细技巧介绍。我们将从基础概念开始，逐步深入讲解各种技巧的运用方法。</p>
                    <h3 style="color: #333; margin: 1.5rem 0 1rem;">基础要点</h3>
                    <ul style="margin-bottom: 1.5rem;">
                        <li>理解基本概念和原理</li>
                        <li>掌握操作技巧和方法</li>
                        <li>实践练习和总结</li>
                    </ul>
                    <h3 style="color: #333; margin: 1.5rem 0 1rem;">进阶技巧</h3>
                    <p>在掌握基础后，可以尝试一些进阶的技巧，这些技巧能够让你的作品更加出色。</p>
                    <h3 style="color: #333; margin: 1.5rem 0 1rem;">注意事项</h3>
                    <p>在运用这些技巧时，需要注意一些常见的问题和误区，避免犯同样的错误。</p>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // 关闭模态框
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });

        // ESC键关闭
        document.addEventListener('keydown', function closeModal(e) {
            if (e.key === 'Escape') {
                document.body.removeChild(modal);
                document.removeEventListener('keydown', closeModal);
            }
        });
    }

    // 初始化加载
    loadPhotos();

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
        
        .photo-card {
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    console.log('摄影展区页面初始化完成！');
}); 