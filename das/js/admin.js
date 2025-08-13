// 管理员鉴权
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');
if (!token || role !== 'admin') {
  alert('请用管理员账号登录');
  location.href = 'login.html';
}
document.getElementById('admin-info').innerText = '管理员：' + localStorage.getItem('username');

function showTab(tab) {
  document.querySelectorAll('.admin-tab').forEach(s => s.style.display = 'none');
  document.getElementById(tab).style.display = '';
  if (tab === 'submissions') loadSubmissions();
  if (tab === 'recruitments') loadRecruitments();
  if (tab === 'resources') loadResources();
  if (tab === 'news') loadNews();
  if (tab === 'users') loadUsers();
}

function logout() {
  localStorage.clear();
  location.href = 'login.html';
}

// 投稿管理
async function loadSubmissions() {
  const res = await fetch('http://localhost:3000/api/submit/all', { headers: { Authorization: token } });
  const data = await res.json();
  let html = '<h2>投稿管理</h2><table><tr><th>作者</th><th>标题</th><th>内容</th><th>状态</th><th>操作</th></tr>';
  for (const s of data.list) {
    html += `<tr><td>${s.author.username}</td><td>${s.title}</td><td>${s.content}</td><td>${s.status}</td><td>` +
      (s.status === 'pending' ? `<button onclick="reviewSubmission('${s._id}','approved')">通过</button><button onclick="reviewSubmission('${s._id}','rejected')">驳回</button>` : '') + '</td></tr>';
  }
  html += '</table>';
  document.getElementById('submissions').innerHTML = html;
}
async function reviewSubmission(id, status) {
  await fetch('http://localhost:3000/api/submit/review', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify({ id, status })
  });
  loadSubmissions();
}

// 招新管理
async function loadRecruitments() {
  const res = await fetch('http://localhost:3000/api/recruitment/all');
  const data = await res.json();
  let html = '<h2>招新报名</h2><table><tr><th>姓名</th><th>联系方式</th><th>部门</th><th>理由</th><th>时间</th></tr>';
  for (const r of data.list) {
    html += `<tr><td>${r.name}</td><td>${r.contact}</td><td>${r.department}</td><td>${r.reason||''}</td><td>${new Date(r.createdAt).toLocaleString()}</td></tr>`;
  }
  html += '</table>';
  document.getElementById('recruitments').innerHTML = html;
}

// 资源申请管理
async function loadResources() {
  const res = await fetch('http://localhost:3000/api/resource/all', { headers: { Authorization: token } });
  const data = await res.json();
  let html = '<h2>资源申请</h2><table><tr><th>申请人</th><th>内容</th><th>状态</th><th>操作</th></tr>';
  for (const r of data.list) {
    html += `<tr><td>${r.applicant.username}</td><td>${r.content}</td><td>${r.status}</td><td>` +
      (r.status === 'pending' ? `<button onclick="reviewResource('${r._id}','approved')">通过</button><button onclick="reviewResource('${r._id}','rejected')">驳回</button>` : '') + '</td></tr>';
  }
  html += '</table>';
  document.getElementById('resources').innerHTML = html;
}
async function reviewResource(id, status) {
  await fetch('http://localhost:3000/api/resource/review', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify({ id, status })
  });
  loadResources();
}

// 新闻推送
async function loadNews() {
  let html = `<h2>新闻推送</h2>
    <form id="newsForm">
      <input type="text" id="news-title" placeholder="标题" required>
      <textarea id="news-content" placeholder="内容" required></textarea>
      <button type="submit">发布并推送</button>
    </form>
    <div id="news-msg"></div>
    <h3>历史新闻</h3><ul id="news-list"></ul>`;
  document.getElementById('news').innerHTML = html;
  document.getElementById('newsForm').onsubmit = async function(e) {
    e.preventDefault();
    const title = document.getElementById('news-title').value;
    const content = document.getElementById('news-content').value;
    const res = await fetch('http://localhost:3000/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify({ title, content })
    });
    const data = await res.json();
    document.getElementById('news-msg').innerText = data.message;
    loadNewsList();
  };
  loadNewsList();
}
async function loadNewsList() {
  const res = await fetch('http://localhost:3000/api/news');
  const data = await res.json();
  let html = '';
  for (const n of data.list) {
    html += `<li><b>${n.title}</b> - ${new Date(n.createdAt).toLocaleString()}<br>${n.content}</li>`;
  }
  document.getElementById('news-list').innerHTML = html;
}

// 用户管理
async function loadUsers() {
  const res = await fetch('http://localhost:3000/api/auth/users', { headers: { Authorization: token } });
  const data = await res.json();
  let html = '<h2>用户管理</h2><table><tr><th>用户名</th><th>邮箱</th><th>角色</th><th>操作</th></tr>';
  for (const u of data.list) {
    html += `<tr><td>${u.username}</td><td>${u.email}</td><td>${u.role}</td><td>` +
      (u.role !== 'admin' ? `<button onclick="setAdmin('${u._id}')">设为管理员</button>` : '') + '</td></tr>';
  }
  html += '</table>';
  document.getElementById('users').innerHTML = html;
}
async function setAdmin(id) {
  await fetch('http://localhost:3000/api/auth/setadmin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify({ id })
  });
  loadUsers();
}

// 默认显示投稿管理
showTab('submissions'); 