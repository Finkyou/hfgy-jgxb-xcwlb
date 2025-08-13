// 资源服务页面JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面
    initResourcesPage();
    
    // 绑定事件监听器
    bindEventListeners();
    
    // 加载资源数据
    loadResourcesData();
});

// 页面初始化
function initResourcesPage() {
    console.log('资源服务页面初始化完成');
    
    // 初始化工具提示
    initTooltips();
    
    // 初始化进度条动画
    initProgressBars();
}

// 绑定事件监听器
function bindEventListeners() {
    // 资源分类筛选
    const categoryFilters = document.querySelectorAll('.category-filter');
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const category = this.dataset.category;
            filterResources(category);
            updateActiveFilter(this);
        });
    });
    
    // 搜索功能
    const searchInput = document.querySelector('#resource-search');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            searchResources(this.value);
        }, 300));
    }
    
    // 下载按钮
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const resourceId = this.dataset.resourceId;
            const resourceName = this.dataset.resourceName;
            downloadResource(resourceId, resourceName);
        });
    });
    
    // 在线工具交互
    const toolButtons = document.querySelectorAll('.tool-btn');
    toolButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const toolType = this.dataset.toolType;
            openTool(toolType);
        });
    });
    
    // 学习资料展开/收起
    const expandButtons = document.querySelectorAll('.expand-btn');
    expandButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const content = this.parentElement.querySelector('.learning-content');
            toggleContent(content, this);
        });
    });
    
    // 合作资源申请
    const applyButtons = document.querySelectorAll('.apply-btn');
    applyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const partnerId = this.dataset.partnerId;
            const partnerName = this.dataset.partnerName;
            openApplicationForm(partnerId, partnerName);
        });
    });
    
    // 资源申请表单
    const applicationForm = document.querySelector('#application-form');
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitApplication(this);
        });
    }
    
    // 文件上传
    const fileInputs = document.querySelectorAll('.file-input');
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            handleFileUpload(this);
        });
    });
}

// 资源数据
const resourcesData = {
    documents: [
        { id: 1, name: '活动策划模板', category: 'templates', size: '2.5MB', downloads: 156, description: '标准活动策划书模板，包含完整策划流程' },
        { id: 2, name: '宣传海报设计指南', category: 'guides', size: '1.8MB', downloads: 89, description: '海报设计技巧和规范说明' },
        { id: 3, name: '摄影技巧手册', category: 'guides', size: '3.2MB', downloads: 234, description: '校园摄影技巧和后期处理指南' },
        { id: 4, name: '外联合作协议模板', category: 'templates', size: '1.5MB', downloads: 67, description: '标准合作协议模板' }
    ],
    tools: [
        { id: 1, name: '海报生成器', type: 'design', description: '快速生成活动海报', status: 'online' },
        { id: 2, name: '预算计算器', type: 'finance', description: '活动预算计算工具', status: 'online' },
        { id: 3, name: '时间轴制作器', type: 'design', description: '活动时间轴制作', status: 'maintenance' }
    ],
    learning: [
        { id: 1, title: '新媒体运营基础', category: 'marketing', duration: '2小时', level: '初级' },
        { id: 2, title: '活动策划与执行', category: 'planning', duration: '3小时', level: '中级' },
        { id: 3, title: '摄影构图技巧', category: 'photography', duration: '1.5小时', level: '初级' },
        { id: 4, title: '商务谈判技巧', category: 'business', duration: '2.5小时', level: '高级' }
    ],
    partners: [
        { id: 1, name: 'XX科技公司', type: 'technology', description: '提供技术支持', contact: 'tech@xx.com' },
        { id: 2, name: 'YY文化传媒', type: 'media', description: '媒体宣传合作', contact: 'media@yy.com' },
        { id: 3, name: 'ZZ餐饮连锁', type: 'food', description: '活动餐饮服务', contact: 'food@zz.com' }
    ]
};

// 加载资源数据
function loadResourcesData() {
    // 加载文档资源
    loadDocuments();
    
    // 加载在线工具
    loadTools();
    
    // 加载学习资料
    loadLearningMaterials();
    
    // 加载合作资源
    loadPartnerResources();
}

// 加载文档资源
function loadDocuments() {
    const documentsContainer = document.querySelector('.documents-grid');
    if (!documentsContainer) return;
    
    documentsContainer.innerHTML = '';
    
    resourcesData.documents.forEach(doc => {
        const docElement = createDocumentElement(doc);
        documentsContainer.appendChild(docElement);
    });
}

// 创建文档元素
function createDocumentElement(doc) {
    const docDiv = document.createElement('div');
    docDiv.className = 'document-item';
    docDiv.innerHTML = `
        <div class="document-icon">
            <i class="fas fa-file-pdf"></i>
        </div>
        <div class="document-info">
            <h4>${doc.name}</h4>
            <p>${doc.description}</p>
            <div class="document-meta">
                <span class="size">${doc.size}</span>
                <span class="downloads">${doc.downloads} 次下载</span>
            </div>
        </div>
        <button class="download-btn" data-resource-id="${doc.id}" data-resource-name="${doc.name}">
            <i class="fas fa-download"></i>
        </button>
    `;
    
    // 绑定下载事件
    const downloadBtn = docDiv.querySelector('.download-btn');
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        downloadResource(doc.id, doc.name);
    });
    
    return docDiv;
}

// 加载在线工具
function loadTools() {
    const toolsContainer = document.querySelector('.tools-grid');
    if (!toolsContainer) return;
    
    toolsContainer.innerHTML = '';
    
    resourcesData.tools.forEach(tool => {
        const toolElement = createToolElement(tool);
        toolsContainer.appendChild(toolElement);
    });
}

// 创建工具元素
function createToolElement(tool) {
    const toolDiv = document.createElement('div');
    toolDiv.className = 'tool-item';
    toolDiv.innerHTML = `
        <div class="tool-icon">
            <i class="fas fa-tools"></i>
        </div>
        <div class="tool-info">
            <h4>${tool.name}</h4>
            <p>${tool.description}</p>
            <span class="tool-status ${tool.status}">${getStatusText(tool.status)}</span>
        </div>
        <button class="tool-btn" data-tool-type="${tool.type}" ${tool.status === 'maintenance' ? 'disabled' : ''}>
            ${tool.status === 'maintenance' ? '维护中' : '使用'}
        </button>
    `;
    
    // 绑定工具使用事件
    const toolBtn = toolDiv.querySelector('.tool-btn');
    if (tool.status !== 'maintenance') {
        toolBtn.addEventListener('click', function() {
            openTool(tool.type);
        });
    }
    
    return toolDiv;
}

// 获取状态文本
function getStatusText(status) {
    const statusMap = {
        'online': '在线',
        'maintenance': '维护中',
        'offline': '离线'
    };
    return statusMap[status] || status;
}

// 加载学习资料
function loadLearningMaterials() {
    const learningContainer = document.querySelector('.learning-grid');
    if (!learningContainer) return;
    
    learningContainer.innerHTML = '';
    
    resourcesData.learning.forEach(material => {
        const materialElement = createLearningElement(material);
        learningContainer.appendChild(materialElement);
    });
}

// 创建学习资料元素
function createLearningElement(material) {
    const materialDiv = document.createElement('div');
    materialDiv.className = 'learning-item';
    materialDiv.innerHTML = `
        <div class="learning-header">
            <h4>${material.title}</h4>
            <button class="expand-btn">
                <i class="fas fa-chevron-down"></i>
            </button>
        </div>
        <div class="learning-content" style="display: none;">
            <div class="learning-meta">
                <span class="category">${material.category}</span>
                <span class="duration">${material.duration}</span>
                <span class="level">${material.level}</span>
            </div>
            <div class="learning-description">
                <p>详细的学习内容和课程大纲将在这里展示...</p>
            </div>
            <div class="learning-actions">
                <button class="btn btn-primary">开始学习</button>
                <button class="btn btn-secondary">下载资料</button>
            </div>
        </div>
    `;
    
    // 绑定展开事件
    const expandBtn = materialDiv.querySelector('.expand-btn');
    const content = materialDiv.querySelector('.learning-content');
    expandBtn.addEventListener('click', function() {
        toggleContent(content, this);
    });
    
    return materialDiv;
}

// 加载合作资源
function loadPartnerResources() {
    const partnersContainer = document.querySelector('.partners-grid');
    if (!partnersContainer) return;
    
    partnersContainer.innerHTML = '';
    
    resourcesData.partners.forEach(partner => {
        const partnerElement = createPartnerElement(partner);
        partnersContainer.appendChild(partnerElement);
    });
}

// 创建合作资源元素
function createPartnerElement(partner) {
    const partnerDiv = document.createElement('div');
    partnerDiv.className = 'partner-item';
    partnerDiv.innerHTML = `
        <div class="partner-info">
            <h4>${partner.name}</h4>
            <p>${partner.description}</p>
            <div class="partner-meta">
                <span class="type">${partner.type}</span>
                <span class="contact">${partner.contact}</span>
            </div>
        </div>
        <button class="apply-btn" data-partner-id="${partner.id}" data-partner-name="${partner.name}">
            申请合作
        </button>
    `;
    
    // 绑定申请事件
    const applyBtn = partnerDiv.querySelector('.apply-btn');
    applyBtn.addEventListener('click', function() {
        openApplicationForm(partner.id, partner.name);
    });
    
    return partnerDiv;
}

// 筛选资源
function filterResources(category) {
    const resourceItems = document.querySelectorAll('.resource-item, .document-item, .tool-item, .learning-item, .partner-item');
    
    resourceItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            item.classList.add('fade-in');
        } else {
            item.style.display = 'none';
        }
    });
    
    // 添加动画效果
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(item => {
            item.classList.remove('fade-in');
        });
    }, 300);
}

// 更新活动筛选器
function updateActiveFilter(activeFilter) {
    // 移除所有活动状态
    document.querySelectorAll('.category-filter').forEach(filter => {
        filter.classList.remove('active');
    });
    
    // 添加活动状态
    activeFilter.classList.add('active');
}

// 搜索资源
function searchResources(query) {
    const searchResults = [];
    
    // 搜索文档
    resourcesData.documents.forEach(doc => {
        if (doc.name.toLowerCase().includes(query.toLowerCase()) || 
            doc.description.toLowerCase().includes(query.toLowerCase())) {
            searchResults.push({ type: 'document', data: doc });
        }
    });
    
    // 搜索工具
    resourcesData.tools.forEach(tool => {
        if (tool.name.toLowerCase().includes(query.toLowerCase()) || 
            tool.description.toLowerCase().includes(query.toLowerCase())) {
            searchResults.push({ type: 'tool', data: tool });
        }
    });
    
    // 搜索学习资料
    resourcesData.learning.forEach(material => {
        if (material.title.toLowerCase().includes(query.toLowerCase())) {
            searchResults.push({ type: 'learning', data: material });
        }
    });
    
    // 搜索合作资源
    resourcesData.partners.forEach(partner => {
        if (partner.name.toLowerCase().includes(query.toLowerCase()) || 
            partner.description.toLowerCase().includes(query.toLowerCase())) {
            searchResults.push({ type: 'partner', data: partner });
        }
    });
    
    displaySearchResults(searchResults);
}

// 显示搜索结果
function displaySearchResults(results) {
    const searchContainer = document.querySelector('.search-results');
    if (!searchContainer) return;
    
    if (results.length === 0) {
        searchContainer.innerHTML = '<p class="no-results">没有找到相关资源</p>';
        return;
    }
    
    searchContainer.innerHTML = '';
    
    results.forEach(result => {
        const resultElement = createSearchResultElement(result);
        searchContainer.appendChild(resultElement);
    });
}

// 创建搜索结果元素
function createSearchResultElement(result) {
    const resultDiv = document.createElement('div');
    resultDiv.className = 'search-result-item';
    
    let icon, action;
    switch (result.type) {
        case 'document':
            icon = 'fas fa-file-pdf';
            action = `<button class="download-btn" data-resource-id="${result.data.id}" data-resource-name="${result.data.name}">下载</button>`;
            break;
        case 'tool':
            icon = 'fas fa-tools';
            action = `<button class="tool-btn" data-tool-type="${result.data.type}">使用</button>`;
            break;
        case 'learning':
            icon = 'fas fa-graduation-cap';
            action = `<button class="btn btn-primary">学习</button>`;
            break;
        case 'partner':
            icon = 'fas fa-handshake';
            action = `<button class="apply-btn" data-partner-id="${result.data.id}" data-partner-name="${result.data.name}">申请</button>`;
            break;
    }
    
    resultDiv.innerHTML = `
        <div class="result-icon">
            <i class="${icon}"></i>
        </div>
        <div class="result-info">
            <h4>${result.data.name || result.data.title}</h4>
            <p>${result.data.description}</p>
        </div>
        <div class="result-action">
            ${action}
        </div>
    `;
    
    return resultDiv;
}

// 下载资源
function downloadResource(resourceId, resourceName) {
    // 显示下载进度
    showNotification('开始下载资源: ' + resourceName, 'info');
    
    // 模拟下载过程
    setTimeout(() => {
        showNotification('资源下载完成: ' + resourceName, 'success');
        
        // 更新下载次数
        updateDownloadCount(resourceId);
    }, 2000);
}

// 更新下载次数
function updateDownloadCount(resourceId) {
    const resource = resourcesData.documents.find(doc => doc.id == resourceId);
    if (resource) {
        resource.downloads++;
        
        // 更新显示
        const downloadElement = document.querySelector(`[data-resource-id="${resourceId}"]`);
        if (downloadElement) {
            const downloadsSpan = downloadElement.closest('.document-item').querySelector('.downloads');
            if (downloadsSpan) {
                downloadsSpan.textContent = resource.downloads + ' 次下载';
            }
        }
    }
}

// 打开工具
function openTool(toolType) {
    const toolWindows = {
        'design': {
            title: '海报生成器',
            content: `
                <div class="tool-interface">
                    <h3>海报生成器</h3>
                    <div class="tool-controls">
                        <label>选择模板:</label>
                        <select id="template-select">
                            <option value="event">活动海报</option>
                            <option value="recruitment">招新海报</option>
                            <option value="competition">比赛海报</option>
                        </select>
                        <label>输入文字:</label>
                        <input type="text" id="poster-text" placeholder="输入海报文字">
                        <button class="btn btn-primary" onclick="generatePoster()">生成海报</button>
                    </div>
                </div>
            `
        },
        'finance': {
            title: '预算计算器',
            content: `
                <div class="tool-interface">
                    <h3>预算计算器</h3>
                    <div class="tool-controls">
                        <label>活动规模:</label>
                        <input type="number" id="event-scale" placeholder="参与人数">
                        <label>活动时长:</label>
                        <input type="number" id="event-duration" placeholder="小时">
                        <button class="btn btn-primary" onclick="calculateBudget()">计算预算</button>
                        <div id="budget-result"></div>
                    </div>
                </div>
            `
        }
    };
    
    const tool = toolWindows[toolType];
    if (tool) {
        openModal(tool.title, tool.content);
    }
}

// 打开模态框
function openModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 绑定关闭事件
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // 点击背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// 切换内容显示
function toggleContent(content, button) {
    const isHidden = content.style.display === 'none';
    
    if (isHidden) {
        content.style.display = 'block';
        button.innerHTML = '<i class="fas fa-chevron-up"></i>';
        content.classList.add('slide-down');
    } else {
        content.style.display = 'none';
        button.innerHTML = '<i class="fas fa-chevron-down"></i>';
        content.classList.remove('slide-down');
    }
}

// 打开申请表单
function openApplicationForm(partnerId, partnerName) {
    const formContent = `
        <form id="application-form" class="application-form">
            <div class="form-group">
                <label for="applicant-name">申请人姓名</label>
                <input type="text" id="applicant-name" name="applicantName" required>
            </div>
            <div class="form-group">
                <label for="applicant-email">邮箱地址</label>
                <input type="email" id="applicant-email" name="applicantEmail" required>
            </div>
            <div class="form-group">
                <label for="applicant-phone">联系电话</label>
                <input type="tel" id="applicant-phone" name="applicantPhone" required>
            </div>
            <div class="form-group">
                <label for="cooperation-type">合作类型</label>
                <select id="cooperation-type" name="cooperationType" required>
                    <option value="">请选择合作类型</option>
                    <option value="sponsorship">赞助合作</option>
                    <option value="media">媒体合作</option>
                    <option value="service">服务合作</option>
                    <option value="other">其他</option>
                </select>
            </div>
            <div class="form-group">
                <label for="project-description">项目描述</label>
                <textarea id="project-description" name="projectDescription" rows="4" placeholder="请详细描述您的项目需求..." required></textarea>
            </div>
            <div class="form-group">
                <label for="budget-range">预算范围</label>
                <select id="budget-range" name="budgetRange" required>
                    <option value="">请选择预算范围</option>
                    <option value="0-1000">1000元以下</option>
                    <option value="1000-5000">1000-5000元</option>
                    <option value="5000-10000">5000-10000元</option>
                    <option value="10000+">10000元以上</option>
                </select>
            </div>
            <div class="form-group">
                <label for="attachment">相关附件</label>
                <input type="file" id="attachment" name="attachment" class="file-input" multiple>
                <div class="file-preview"></div>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">提交申请</button>
                <button type="button" class="btn btn-secondary" onclick="closeModal()">取消</button>
            </div>
        </form>
    `;
    
    openModal(`申请与${partnerName}合作`, formContent);
    
    // 绑定表单提交事件
    const form = document.querySelector('#application-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            submitApplication(this);
        });
    }
    
    // 绑定文件上传事件
    const fileInput = document.querySelector('#attachment');
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            handleFileUpload(this);
        });
    }
}

// 提交申请
function submitApplication(form) {
    const formData = new FormData(form);
    
    // 验证表单
    if (!validateApplicationForm(formData)) {
        return;
    }
    
    // 显示提交进度
    showNotification('正在提交申请...', 'info');
    
    // 模拟提交过程
    setTimeout(() => {
        showNotification('申请提交成功！我们会尽快与您联系。', 'success');
        closeModal();
    }, 2000);
}

// 验证申请表单
function validateApplicationForm(formData) {
    const requiredFields = ['applicantName', 'applicantEmail', 'applicantPhone', 'cooperationType', 'projectDescription', 'budgetRange'];
    
    for (let field of requiredFields) {
        if (!formData.get(field)) {
            showNotification('请填写所有必填字段', 'error');
            return false;
        }
    }
    
    // 验证邮箱格式
    const email = formData.get('applicantEmail');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('请输入有效的邮箱地址', 'error');
        return false;
    }
    
    // 验证手机号格式
    const phone = formData.get('applicantPhone');
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        showNotification('请输入有效的手机号码', 'error');
        return false;
    }
    
    return true;
}

// 处理文件上传
function handleFileUpload(input) {
    const files = input.files;
    const preview = input.parentElement.querySelector('.file-preview');
    
    if (files.length === 0) {
        preview.innerHTML = '';
        return;
    }
    
    preview.innerHTML = '';
    
    Array.from(files).forEach(file => {
        const fileDiv = document.createElement('div');
        fileDiv.className = 'file-item';
        fileDiv.innerHTML = `
            <i class="fas fa-file"></i>
            <span>${file.name}</span>
            <span class="file-size">(${formatFileSize(file.size)})</span>
        `;
        preview.appendChild(fileDiv);
    });
}

// 格式化文件大小
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 关闭模态框
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        document.body.removeChild(modal);
    }
}

// 初始化工具提示
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            showTooltip(this, this.dataset.tooltip);
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

// 显示工具提示
function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
}

// 隐藏工具提示
function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        document.body.removeChild(tooltip);
    }
}

// 初始化进度条动画
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const progress = bar.dataset.progress || 0;
        animateProgressBar(bar, progress);
    });
}

// 动画进度条
function animateProgressBar(bar, targetProgress) {
    let currentProgress = 0;
    const increment = targetProgress / 50;
    
    const animation = setInterval(() => {
        currentProgress += increment;
        if (currentProgress >= targetProgress) {
            currentProgress = targetProgress;
            clearInterval(animation);
        }
        
        bar.style.width = currentProgress + '%';
        bar.textContent = Math.round(currentProgress) + '%';
    }, 20);
}

// 显示通知
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // 绑定关闭事件
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(notification);
    });
    
    // 自动关闭
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 5000);
}

// 获取通知图标
function getNotificationIcon(type) {
    const icons = {
        'success': 'fa-check-circle',
        'error': 'fa-exclamation-circle',
        'warning': 'fa-exclamation-triangle',
        'info': 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 工具函数：生成海报
function generatePoster() {
    const template = document.getElementById('template-select').value;
    const text = document.getElementById('poster-text').value;
    
    if (!text) {
        showNotification('请输入海报文字', 'error');
        return;
    }
    
    showNotification('正在生成海报...', 'info');
    
    setTimeout(() => {
        showNotification('海报生成完成！', 'success');
    }, 2000);
}

// 工具函数：计算预算
function calculateBudget() {
    const scale = document.getElementById('event-scale').value;
    const duration = document.getElementById('event-duration').value;
    
    if (!scale || !duration) {
        showNotification('请填写完整信息', 'error');
        return;
    }
    
    const baseCost = 1000;
    const scaleCost = scale * 50;
    const durationCost = duration * 200;
    const totalCost = baseCost + scaleCost + durationCost;
    
    const resultDiv = document.getElementById('budget-result');
    resultDiv.innerHTML = `
        <div class="budget-breakdown">
            <h4>预算明细</h4>
            <p>基础费用: ¥${baseCost}</p>
            <p>规模费用 (${scale}人): ¥${scaleCost}</p>
            <p>时长费用 (${duration}小时): ¥${durationCost}</p>
            <p class="total-cost">总预算: ¥${totalCost}</p>
        </div>
    `;
} 