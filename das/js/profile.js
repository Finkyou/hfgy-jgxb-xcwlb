// 用户鉴权
const token = localStorage.getItem('token');
if (!token) {
  alert('请先登录');
  location.href = 'login.html';
}
document.getElementById('user-info').innerText = '用户：' + localStorage.getItem('username');

function showTab(tab) {
  document.querySelectorAll('.profile-tab').forEach(s => s.style.display = 'none');
  document.getElementById(tab).style.display = '';
  if (tab === 'my-submissions') loadMySubmissions();
  if (tab === 'my-resources') loadMyResources();
  if (tab === 'my-subs') loadMySubs();
  if (tab === 'my-info') loadMyInfo();
}

function logout() {
  localStorage.clear();
  location.href = 'login.html';
}

// 我的投稿
async function loadMySubmissions() {
  const res = await fetch('http://localhost:3000/api/submit/my', { headers: { Authorization: token } });
  const data = await res.json();
  let html = '<h2>我的投稿</h2><table><tr><th>标题</th><th>内容</th><th>状态</th><th>时间</th></tr>';
  for (const s of data.list) {
    html += `<tr><td>${s.title}</td><td>${s.content}</td><td>${s.status}</td><td>${new Date(s.createdAt).toLocaleString()}</td></tr>`;
  }
  html += '</table>';
  document.getElementById('my-submissions').innerHTML = html;
}

// 我的资源申请
async function loadMyResources() {
  const res = await fetch('http://localhost:3000/api/resource/my', { headers: { Authorization: token } });
  const data = await res.json();
  let html = '<h2>我的资源申请</h2><table><tr><th>内容</th><th>状态</th><th>时间</th></tr>';
  for (const r of data.list) {
    html += `<tr><td>${r.content}</td><td>${r.status}</td><td>${new Date(r.createdAt).toLocaleString()}</td></tr>`;
  }
  html += '</table>';
  document.getElementById('my-resources').innerHTML = html;
}

// 我的订阅
async function loadMySubs() {
  // 这里只能显示当前邮箱是否订阅
  let html = '<h2>我的订阅</h2>';
  const email = localStorage.getItem('email');
  if (!email) {
    html += '未绑定邮箱，无法查询订阅。';
  } else {
    const res = await fetch('http://localhost:3000/api/subscribe/all');
    const data = await res.json();
    const sub = data.list.find(s => s.email === email);
    if (sub) {
      html += `已订阅新闻推送（${email}） <button onclick="unsubscribe()">取消订阅</button>`;
    } else {
      html += `未订阅新闻推送 <button onclick="subscribe()">订阅</button>`;
    }
  }
  document.getElementById('my-subs').innerHTML = html;
}
async function subscribe() {
  const email = localStorage.getItem('email');
  if (!email) return alert('未绑定邮箱');
  await fetch('http://localhost:3000/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  loadMySubs();
}
async function unsubscribe() {
  alert('如需取消订阅请联系管理员');
}

// 个人信息
function loadMyInfo() {
  let html = `<h2>个人信息</h2>
    <p>用户名：${localStorage.getItem('username')}</p>
    <p>邮箱：${localStorage.getItem('email')||'未绑定'}</p>
    <form id="pwdForm">
      <input type="password" id="old-pwd" placeholder="原密码" required>
      <input type="password" id="new-pwd" placeholder="新密码" required>
      <button type="submit">修改密码</button>
    </form>
    <div id="pwd-msg"></div>`;
  document.getElementById('my-info').innerHTML = html;
  document.getElementById('pwdForm').onsubmit = async function(e) {
    e.preventDefault();
    const oldPwd = document.getElementById('old-pwd').value;
    const newPwd = document.getElementById('new-pwd').value;
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: localStorage.getItem('username'), password: oldPwd })
    });
    const data = await res.json();
    if (!data.success) {
      document.getElementById('pwd-msg').innerText = '原密码错误';
      return;
    }
    // 修改密码接口（需后端支持）
    const res2 = await fetch('http://localhost:3000/api/auth/changepwd', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify({ newPwd })
    });
    const data2 = await res2.json();
    document.getElementById('pwd-msg').innerText = data2.message;
  };
}

// 默认显示我的投稿
showTab('my-submissions'); 