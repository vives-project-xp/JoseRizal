// 初始化 CKEditor 5，并配置图片上传（需要后端接口 /upload_image 支持）
let editor;
ClassicEditor
  .create(document.querySelector('#editor'), {
    simpleUpload: {
      uploadUrl: 'http://localhost:8000/upload_image',
      // 如果需要，可以添加请求头，例如认证信息：
      // headers: { 'Authorization': `Bearer ${localStorage.getItem("access_token")}` }
    }
  })
  .then(newEditor => {
    editor = newEditor;
  })
  .catch(error => {
    console.error('Error initializing CKEditor:', error);
  });

// 加载地点数据到页面上
async function loadLocations() {
  try {
    const response = await fetch('http://localhost:8000/locations');
    const locations = await response.json();
    const container = document.getElementById('locationContainer');
    
    // 清空容器，防止重复渲染
    container.innerHTML = '';
    
    // 为每个地点生成复选框和 label
    locations.forEach(location => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = location.id;
      checkbox.id = `loc_${location.id}`;
  
      const label = document.createElement('label');
      label.htmlFor = `loc_${location.id}`;
      label.innerText = location.name;
  
      container.appendChild(checkbox);
      container.appendChild(label);
      container.appendChild(document.createElement('br'));
    });
  } catch (error) {
    console.error('Error loading locations:', error);
  }
}
loadLocations();

// 表单提交事件处理
document.getElementById('add-article-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const title = document.getElementById('articleTitle').value;
  // 从 CKEditor 获取编辑后的 HTML 内容
  const content_html = editor.getData();
  
  // 从地点容器中获取选中的地点 ID 列表
  const container = document.getElementById('locationContainer');
  const checkboxes = container.querySelectorAll('input[type="checkbox"]');
  let location_ids = [];
  checkboxes.forEach(cb => {
    if (cb.checked) {
      location_ids.push(parseInt(cb.value));
    }
  });
  
  const data = { title, content_html, location_ids };
  
  try {
    const response = await fetch('http://localhost:8000/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    const outputElem = document.getElementById('output');
    if (response.ok) {
      outputElem.innerText = 'Article created successfully with ID: ' + result.article_id;
    } else {
      outputElem.innerText = 'Error: ' + result.detail;
    }
  } catch (error) {
    document.getElementById('output').innerText = 'Error: ' + error.message;
  }
});
