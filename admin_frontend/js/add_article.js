
ClassicEditor
  .create(document.querySelector('#editor'), {
    simpleUpload: {
      uploadUrl: 'http://100.107.144.48:8000/upload_image',
      
    }
  })
  .then(newEditor => {
    editor = newEditor;
  })
  .catch(error => {
    console.error('Error initializing CKEditor:', error);
  });


async function loadLocations() {
  try {
    const response = await fetch('http://100.107.144.48:8000/locations');
    const locations = await response.json();
    const container = document.getElementById('locationContainer');
    
    
    container.innerHTML = '';
    
    
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


document.getElementById('add-article-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const title = document.getElementById('articleTitle').value;
  
  const content_html = editor.getData();
  
  
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
    const response = await fetch('http://100.107.144.48:8000/articles', {
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
