// 全局加载动画
(function(){
    function showLoading() {
        $('#loading-box').removeClass('loaded');
    }
    function hideLoading() {
        $('#loading-box').addClass('loaded');
    }
    // 页面加载完毕后隐藏loading - 超快速 (1.5s内)
    window.addEventListener('load', function() {
      var loadingBox = document.getElementById('loading-box');
      if (loadingBox) {
        loadingBox.classList.add('loaded');
        setTimeout(function() {
          loadingBox.style.display = 'none';
        }, 300); // 从1200ms减少到300ms
      }
    });
    // a标签点击时显示loading
    $(document).on('click', 'a', function(e){
        var link = $(this).attr('href');
        if(link && link[0] !== '#' && !$(this).attr('target')){
            showLoading();
        }
    });
    // 导出全局方法
    window.showLoading = showLoading;
    window.hideLoading = hideLoading;
})(); 