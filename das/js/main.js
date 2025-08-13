// 自动表单校验和美化

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
      let valid = true;
      let msg = '';
      form.querySelectorAll('input,textarea').forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
          valid = false;
          msg = '请填写所有必填项';
          input.classList.add('is-invalid');
        } else {
          input.classList.remove('is-invalid');
        }
        if (input.type === 'email' && input.value) {
          const re = /^\S+@\S+\.\S+$/;
          if (!re.test(input.value)) {
            valid = false;
            msg = '邮箱格式不正确';
            input.classList.add('is-invalid');
          }
        }
        if (input.type === 'password' && input.value) {
          if (input.value.length < 6) {
            valid = false;
            msg = '密码至少6位';
            input.classList.add('is-invalid');
          }
        }
      });
      if (!valid) {
        e.preventDefault();
        showMsg(form, msg || '请检查输入');
      }
    });
  });
});

function showMsg(form, msg) {
  let div = form.querySelector('.msg');
  if (!div) {
    div = document.createElement('div');
    div.className = 'msg';
    form.prepend(div);
  }
  div.innerText = msg;
} 