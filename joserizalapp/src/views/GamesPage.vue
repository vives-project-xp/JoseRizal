<template>
  <div class="games-page">
    <h1>Games</h1>
    <p>Explore the life and legacy of José Rizal through these interactive games!</p>

    <div class="games-grid">

      <div class="game-card">
        <h3>🖊️ Inked: Rizal's Desk</h3>
        <p>Step into Rizal's world and experience his life through an illustrated adventure.</p>
        <a href="https://jru-x-vives.itch.io/inked-rizals-desk" target="_blank">
          <button class="game-btn">Play Now</button>
        </a>
      </div>

      <div class="game-card">
        <h3>🧠 Memory Game</h3>
        <p>Test your memory and learn about José Rizal's life and landmarks.</p>
        <a href="https://interacty.me/projects/b1244c2258fc8ce3" target="_blank">
          <button class="game-btn">Play Now</button>
        </a>
      </div>

      <div class="game-card">
        <h3>📅 Timeline Game</h3>
        <p>Put the key events of Rizal's life in the correct order.</p>
        <a href="https://interacty.me/projects/f2734a0895b905a8" target="_blank">
          <button class="game-btn">Play Now</button>
        </a>
      </div>

      <div class="game-card">
        <h3>🧩 Puzzle Game</h3>
        <p>Piece together iconic images related to José Rizal's journey.</p>
        <a href="https://puzzel.org/en/jigsaw/play?p=-OlCFMGpM1GnFTI1fbjd" target="_blank">
          <button class="game-btn">Play Now</button>
        </a>
      </div>

    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.games-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 3rem 1rem;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.games-page > p {
  margin-bottom: 2rem;
  font-size: 1.1rem;
  color: #555;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  max-width: 800px;
  width: 100%;
}

.game-card {
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 12px;
  padding: 2rem 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.game-card h3 {
  font-size: 1.25rem;
  margin: 0;
}

.game-card p {
  color: #555;
  font-size: 0.95rem;
  margin: 0;
}

.game-btn {
  margin-top: 0.5rem;
  padding: 0.6rem 1.5rem;
  background-color: #424242;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
}

.game-btn:hover {
  background-color: #222222;
}

@media (max-width: 600px) {
  .games-grid {
    grid-template-columns: 1fr;
  }

  h1 {
    font-size: 1.8rem;
  }
}
</style>