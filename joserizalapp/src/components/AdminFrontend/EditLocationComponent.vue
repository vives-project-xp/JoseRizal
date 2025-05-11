<template>
  <div class="pageContent">
    <div class="location-card">
      <div class="card-content">
        <h3 class="title">Edit Location</h3>
        <p class="subtitle">Location name</p>
        <input type="text" placeholder="Enter location name" class="input-field" v-model="location.name" />
        <p class="subtitle">Description</p>
        <input type="text" placeholder="Enter location description" class="input-field"
          v-model="location.description" />
        <p class="subtitle">Location coordinates</p>
        <div class="coordinates-inputs">
          <input type="text" placeholder="Enter latitude" class="input-field"
            v-model="location.location_data.latitude" />
          <input type="text" placeholder="Enter longitude" class="input-field"
            v-model="location.location_data.longitude" />
        </div>
        <p class="subtitle">Location Image</p>
        <input type="file" class="input-field" @change="handleImageUpload" />
        <button class="action-button" @click="updateLocation" :disabled="isSubmitting">Save</button>
        <button class="action-button" @click="$emit('close')">Cancel</button>
        <p v-if="message" :class="['message', messageType]">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    locationId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      location: {
        name: "",
        description: "",
        location_data: {
          latitude: null,
          longitude: null,
        },
      },
      locationImage: null,
      message: "",
      messageType: "",
      isSubmitting: false,
    };
  },
  mounted() {
    this.fetchLocationDetails();
  },
  methods: {
    getCookie(name) {
      const nameEQ = name + "=";
      const ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    },
    async fetchLocationDetails() {
      const token = this.getCookie("access_token");
      try {
        const response = await fetch(`http://127.0.0.1:8000/location/${this.locationId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          this.location = data;
          if (typeof this.location.location_data === "string") {
            this.location.location_data = JSON.parse(this.location.location_data);
          }
        } else {
          const errorData = await response.json();
          this.showMessage(errorData.message || "Failed to fetch location details", "error");
        }
      } catch (error) {
        console.error("Error fetching location details:", error);
        this.showMessage("An error occurred while fetching location details", "error");
      }
    },
    handleImageUpload(event) {
      this.locationImage = event.target.files[0] || null;
    },
    async updateLocation() {
      if (this.isSubmitting) return;
      this.isSubmitting = true;
      const token = this.getCookie("access_token");
      if (!token) {
        this.showMessage("You must be logged in to update a location", "error");
        this.isSubmitting = false;
        return;
      }
      const name = this.location.name.trim();
      if (!name) {
        this.showMessage("Location name is required", "error");
        this.isSubmitting = false;
        return;
      }
      const lat = parseFloat(this.location.location_data.latitude);
      const lng = parseFloat(this.location.location_data.longitude);
      if (isNaN(lat) || lat < -90 || lat > 90) {
        this.showMessage("Please enter a valid latitude", "error");
        this.isSubmitting = false;
        return;
      }
      if (isNaN(lng) || lng < -180 || lng > 180) {
        this.showMessage("Please enter a valid longitude", "error");
        this.isSubmitting = false;
        return;
      }
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", this.location.description);
      formData.append(
        "location_data",
        JSON.stringify({
          latitude: lat,
          longitude: lng,
        })
      );
      if (this.locationImage) {
        formData.append("file", this.locationImage);
      }
      try {
        const response = await fetch(`http://127.0.0.1:8000/update_location/${this.locationId}`, {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: formData,
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Location updated successfully:", data);
          this.showMessage("Location updated successfully", "success");
          setTimeout(() => {
            window.location.href = window.location.pathname;
          }, 1000);
        } else {
          const errorData = await response.json();
          this.showMessage(errorData.message || "Failed to update location", "error");
        }
      } catch (error) {
        console.error("Error updating location:", error);
        this.showMessage("An error occurred while updating the location", "error");
      } finally {
        this.isSubmitting = false;
      }
    },
    showMessage(text, type) {
      this.message = text;
      this.messageType = type;
      setTimeout(() => {
        this.message = "";
        this.messageType = "";
      }, 5000);
    },
  },
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

.input-field,
.textarea-field {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 12px;
  box-sizing: border-box;
}

.input-field:focus,
.textarea-field:focus {
  border-color: #666666;
  box-shadow: 0 0 0 3px rgba(140, 140, 140, 0.2);
  outline: none;
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
</style>