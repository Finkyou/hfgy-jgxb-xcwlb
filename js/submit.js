// 投稿区页面JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    // 文件上传功能
    const fileUploadArea = document.getElementById('fileUploadArea');
    const fileInput = document.getElementById('fileUpload');
    const fileList = document.getElementById('fileList');
    const uploadedFiles = [];

    // 文件上传区域交互
    fileUploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    // 拖拽上传
    fileUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileUploadArea.style.background = '#e8f0fe';
        fileUploadArea.style.borderColor = '#4facfe';
    });

    fileUploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        fileUploadArea.style.background = '#f8f9fa';
        fileUploadArea.style.borderColor = '#667eea';
    });

    fileUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        fileUploadArea.style.background = '#f8f9fa';
        fileUploadArea.style.borderColor = '#667eea';
        
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    // 文件选择处理
    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        handleFiles(files);
    });

    function handleFiles(files) {
        Array.from(files).forEach(file => {
            if (validateFile(file)) {
                addFileToList(file);
                uploadedFiles.push(file);
            }
        });
    }

    function validateFile(file) {
        const maxSize = 50 * 1024 * 1024; // 50MB
        const allowedTypes = [
            'image/jpeg', 'image/png', 'image/gif',
            'video/mp4', 'video/avi', 'video/mov',
            'application/pdf', 'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        if (file.size > maxSize) {
            showNotification('文件大小不能超过50MB', 'error');
            return false;
        }

        if (!allowedTypes.includes(file.type)) {
            showNotification('不支持的文件类型', 'error');
            return false;
        }

        return true;
    }

    function addFileToList(file) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        const fileName = document.createElement('span');
        fileName.className = 'file-name';
        fileName.textContent = file.name;
        
        const fileSize = document.createElement('span');
        fileSize.className = 'file-size';
        fileSize.textContent = formatFileSize(file.size);
        
        const removeBtn = document.createElement('span');
        removeBtn.className = 'remove-file';
        removeBtn.innerHTML = '<i class="fas fa-times"></i>';
        removeBtn.addEventListener('click', () => {
            fileItem.remove();
            const index = uploadedFiles.indexOf(file);
            if (index > -1) {
                uploadedFiles.splice(index, 1);
            }
        });

        fileItem.appendChild(fileName);
        fileItem.appendChild(fileSize);
        fileItem.appendChild(removeBtn);
        fileList.appendChild(fileItem);
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // 表单提交处理
    const submitForm = document.getElementById('submitForm');
    
    submitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            submitFormData();
        }
    });

    function validateForm() {
        const requiredFields = ['authorName', 'authorEmail', 'category', 'title', 'description'];
        let isValid = true;

        requiredFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (!field.value.trim()) {
                showFieldError(field, '此字段为必填项');
                isValid = false;
            } else {
                clearFieldError(field);
            }
        });

        // 验证邮箱格式
        const emailField = document.getElementById('authorEmail');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.value && !emailRegex.test(emailField.value)) {
            showFieldError(emailField, '请输入有效的邮箱地址');
            isValid = false;
        }

        // 验证文件上传
        if (uploadedFiles.length === 0) {
            showNotification('请至少上传一个文件', 'error');
            isValid = false;
        }

        return isValid;
    }

    function showFieldError(field, message) {
        field.style.borderColor = '#dc3545';
        field.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
        
        // 移除之前的错误提示
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // 添加新的错误提示
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    function clearFieldError(field) {
        field.style.borderColor = '#e1e5e9';
        field.style.boxShadow = 'none';
        
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    function submitFormData() {
        // 显示加载状态
        const submitBtn = submitForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '提交中...';
        submitBtn.disabled = true;

        // 模拟提交过程
        setTimeout(() => {
            showNotification('投稿提交成功！我们会在3-5个工作日内审核并回复您。', 'success');
            submitForm.reset();
            fileList.innerHTML = '';
            uploadedFiles.length = 0;
            
            // 恢复按钮状态
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // 添加投稿到历史记录
            addToHistory();
        }, 2000);
    }

    // 投稿历史功能
    const historyList = document.getElementById('historyList');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // 模拟投稿历史数据
    const historyData = [
        {
            id: 1,
            title: '校园春色摄影作品',
            category: '摄影投稿',
            status: 'approved',
            date: '2024-01-15',
            details: '一组关于校园春天的摄影作品，展现了校园的美丽景色。'
        },
        {
            id: 2,
            title: '学生会活动报道',
            category: '文字投稿',
            status: 'pending',
            date: '2024-01-20',
            details: '关于学生会最新活动的详细报道和心得体会。'
        },
        {
            id: 3,
            title: '创意海报设计',
            category: '设计投稿',
            status: 'rejected',
            date: '2024-01-18',
            details: '为校园文化节设计的创意海报，色彩鲜明，主题突出。'
        }
    ];

    function loadHistory(filter = 'all') {
        historyList.innerHTML = '';
        
        const filteredData = filter === 'all' 
            ? historyData 
            : historyData.filter(item => item.status === filter);

        filteredData.forEach(item => {
            const historyItem = createHistoryItem(item);
            historyList.appendChild(historyItem);
        });
    }

    function createHistoryItem(item) {
        const div = document.createElement('div');
        div.className = `history-item ${item.status}`;
        
        div.innerHTML = `
            <div class="history-item-header">
                <div class="history-item-title">${item.title}</div>
                <div class="history-item-status ${item.status}">
                    ${getStatusText(item.status)}
                </div>
            </div>
            <div class="history-item-details">
                <strong>类别：</strong>${item.category}<br>
                ${item.details}
            </div>
            <div class="history-item-date">提交时间：${item.date}</div>
        `;
        
        return div;
    }

    function getStatusText(status) {
        const statusMap = {
            'pending': '待审核',
            'approved': '已通过',
            'rejected': '已拒绝'
        };
        return statusMap[status] || status;
    }

    // 筛选按钮事件
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadHistory(btn.getAttribute('data-filter'));
        });
    });

    // FAQ交互功能
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // 关闭其他FAQ
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // 切换当前FAQ
            if (!isActive) {
                item.classList.add('active');
            }
        });
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
        
        // 设置背景色
        const colors = {
            'success': '#28a745',
            'error': '#dc3545',
            'warning': '#ffc107',
            'info': '#667eea'
        };
        notification.style.background = colors[type] || colors.info;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // 显示动画
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // 自动隐藏
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // 添加投稿到历史记录
    function addToHistory() {
        const newItem = {
            id: historyData.length + 1,
            title: document.getElementById('title').value,
            category: getCategoryText(document.getElementById('category').value),
            status: 'pending',
            date: new Date().toISOString().split('T')[0],
            details: document.getElementById('description').value.substring(0, 100) + '...'
        };
        
        historyData.unshift(newItem);
        loadHistory('all');
    }

    function getCategoryText(category) {
        const categoryMap = {
            'article': '文字投稿',
            'photo': '摄影投稿',
            'video': '视频投稿',
            'design': '设计投稿'
        };
        return categoryMap[category] || category;
    }

    // 实时表单验证
    const formFields = submitForm.querySelectorAll('input, select, textarea');
    
    formFields.forEach(field => {
        field.addEventListener('blur', () => {
            if (field.hasAttribute('required') && !field.value.trim()) {
                showFieldError(field, '此字段为必填项');
            } else {
                clearFieldError(field);
            }
        });
        
        field.addEventListener('input', () => {
            clearFieldError(field);
        });
    });

    // 初始化加载历史记录
    loadHistory('all');

    // 添加键盘快捷键
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            submitForm.dispatchEvent(new Event('submit'));
        }
    });

    console.log('投稿区页面初始化完成！');
}); 