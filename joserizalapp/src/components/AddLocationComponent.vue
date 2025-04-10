<template>
    <div class="location-card">
      <div class="card-content">
        <h3 class="title">Add Location</h3>
        <p class="subtitle">Subtitle</p>
        <button 
          class="action-button"
          @click="handleButtonClick"
        >
          Click me
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  const handleButtonClick = () => {
    console.log('Button clicked')
  }
</script>
  
  <style scoped>
  .location-card {
    max-width: 400px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background: white;
    display: flex;
    flex-direction: column;
  }
  
  .card-content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex-grow: 1;
  }
  
  .title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #333;
  }
  
  .subtitle {
    margin: 0;
    font-size: 0.9rem;
    color: #666;
    line-height: 1.5;
  }
  
  .action-button {
    align-self: flex-start;
    padding: 0.5rem 1.5rem;
    background: #666666;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  
  .action-button:hover {
    background: rgb(140, 140, 140);
  }
</style>