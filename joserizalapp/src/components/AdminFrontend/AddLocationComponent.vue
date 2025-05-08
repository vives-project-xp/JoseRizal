<template>
  <div class="pageContent">
    <div class="location-card">
      <div class="card-content">
        <h3 class="title">Add Location</h3>
        <p class="subtitle">Pick a city</p>
        <select class="input-field" v-model="newLocation.city_id">
          <option value="" disabled>Select a city</option>
          <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
        </select>
        <p class="subtitle">Location name</p>
        <input type="text" placeholder="Enter location name" class="input-field" v-model="newLocation.name" />
        <p class="subtitle">Description</p>
        <input type="text" placeholder="Enter location description" class="input-field"
          v-model="newLocation.description" />
        <p class="subtitle">Location coordinates</p>
        <div class="coordinates-inputs">
          <input type="text" placeholder="Enter latitude" class="input-field" v-model="newLocation.location_data.latitude" />
          <input type="text" placeholder="Enter longitude" class="input-field" v-model="newLocation.location_data.longitude" />
        </div>
        <button class="action-button" @click="addLocation" :disabled="isSubmitting">
          Add Location
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
      newLocation: {
        city_id: null,
        name: "",
        description: "",
        location_data: {
          latitude: null,
          longitude: null,
        },
      },
      cities: [],
      message: "",
      messageType: "",
      isSubmitting: false,
    };
  },
  mounted() {
    this.fetchCities();
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
    async fetchCities() {
      const token = this.getCookie("access_token");
      try {
        const response = await fetch("http://127.0.0.1:8000/cities", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Cities fetched successfully:", data);
          this.cities = data;
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    },
    async addLocation() {
      const token = this.getCookie("access_token");

      const cityId = this.newLocation.city_id;
      if (!cityId) {
        this.showMessage("City is required", "error");
        return;
      }

      const name = this.newLocation.name.trim();
      if (!name) {
        this.showMessage("Location name is required", "error");
        return;
      }

      const description = this.newLocation.description.trim();

      const latitude = this.newLocation.location_data.latitude;
      if (!latitude && latitude !== 0) {
        this.showMessage("Location latitude is required", "error");
        return;
      } else {
        const float = parseFloat(latitude);
        if (isNaN(float) || float < -90 || float > 90) {
          this.showMessage("Please enter a valid latitude", "error");
          return;
        }
      }
      const longitude = this.newLocation.location_data.longitude;
      if (!longitude && longitude !== 0) {
        this.showMessage("Location longitude is required", "error");
        return;
      } else {
        const float = parseFloat(longitude);
        if (isNaN(float) || float < -180 || float > 180) {
          this.showMessage("Please enter a valid longitude", "error");
          return;
        }
      }

      const newLocation = {
        city_id: cityId,
        name: name,
        description: description,
        location_data: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
      };
      console.log("New location data:", newLocation);

      try {
        this.isSubmitting = true;
        const response = await fetch("http://127.0.0.1:8000/add_location/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
          },
          body: JSON.stringify(newLocation),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Location added successfully:", data);
          this.showMessage(this.newLocation.name + " added successfully", "success");
          this.newLocation.city_id = null;
          this.newLocation.name = "";
          this.newLocation.description = "";
          this.newLocation.location_data.latitude = null;
          this.newLocation.location_data.longitude = null;
          setTimeout(() => {
            window.location.href = window.location.pathname;
          }, 1000);
        } else {
          const errorData = await response.json();
          this.showMessage(errorData.message || "Failed to add location", "error");
        }
      } catch (error) {
        console.error("Error adding location:", error);
        this.showMessage("An error occurred while adding the location", "error");
      } finally {
        this.isSubmitting = false;
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
.pageContent {
  display: flex;
  padding: 16px;
  background-color: #f5f5f5;
}

.location-card {
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

.coordinates-inputs {
  display: flex;
  justify-content: space-between;
  gap: 8px;
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