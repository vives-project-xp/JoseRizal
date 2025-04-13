<template>
  <div class="pageContent">
    <div class="city-card">
      <div class="card-content">
        <h3 class="title">Add City</h3>
        <p class="subtitle">City name</p>
        <input type="text" placeholder="Enter location name" class="input-field" v-model="newCity.name" />
        <p class="subtitle">Description</p>
        <input type="text" placeholder="Enter location description" class="input-field" v-model="newCity.description" />
        <p class="subtitle">City Image</p>
        <input type="file" class="input-field" ref="cityImage" @change="handleImageInput" />
        <button class="action-button" @click="addCity">
          Add City
        </button>
        <p v-if="message" :class="['message', messageType]">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newCity: {
        name: "",
        description: "",
      },
      cityImage: null,
      message: "",
      messageType: ""
    };
  },
  methods: {
    getCookie(name) {
      const nameEQ = name + '=';
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    },

    handleImageInput(event) {
      this.cityImage = event.target.files[0];
    },

    async addCity() {
      const token = this.getCookie("access_token");
      if (!token) {
        this.showMessage("You must be logged in to add a city", "error");
        return;
      }

      if (!this.newCity.name.trim()) {
        this.showMessage("City name is required", "error");
        return;
      }

      const formData = new FormData();
      formData.append("name", this.newCity.name);
      formData.append("description", this.newCity.description);

      if (this.cityImage) {
        formData.append("file", this.cityImage);
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/add_city", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`
          },
          body: formData
        });

        if (response.ok) {
          const data = await response.json();
          console.log("City added successfully:", data);
          this.showMessage(this.newCity.name + " added successfully", "success");
          this.newCity.name = "";
          this.newCity.description = "";
          this.cityImage = null;
        } else {
          const errorData = await response.json();
          this.showMessage(errorData.message || "Failed to add city", "error");
        }
      } catch (error) {
        console.error("Error adding city:", error);
        this.showMessage("An error occurred while adding the city", "error");
      }
    },

    showMessage(text, type) {
      this.message = text;
      this.messageType = type;
      setTimeout(() => {
        this.message = "";
      }, 5000);
    }
  }
};
</script>

<style scoped>
.page-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 16px;
  background-color: #f5f5f5;
}

.city-card {
  width: 100%;
  max-width: 100%;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card-content {
  padding: 16px;
}

.input-field {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 12px;
  box-sizing: border-box;
}

.input-field:focus {
  border-color: #666666;
  box-shadow: 0 0 0 3px rgba(140, 140, 140, 0.200);
  outline: none;
}

.input-field::placeholder {
  color: #999999;
  opacity: 0.5;
}

input[type="file"].input-field {
  position: relative;
  padding: 12px;
  cursor: pointer;
  color: #999999;
  opacity: 0.5;
}

.input-field::file-selector-button {
  display: none;
}

.action-button {
  width: 100%;
  padding: 12px;
  margin-top: 16px;
  background-color: #999999;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
}

.action-button:hover {
  background-color: #666666;
}

.message {
  margin-top: 16px;
  padding: 12px;
  border-radius: 6px;
  font-size: 14px;
  text-align: center;
}

.success {
  background-color: #c6f6d5;
  color: #276749;
}

.error {
  background-color: #fed7d7;
  color: #c53030;
}

@media screen and (min-width: 768px) {
  .page-content {
    padding: 32px;
  }

  .city-card {
    max-width: 480px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .card-content {
    padding: 24px;
  }

  .action-button {
    transition: transform 0.2s, background-color 0.3s;
  }

  .action-button:hover {
    transform: translateY(-2px);
  }

  .city-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
  }
}

</style>