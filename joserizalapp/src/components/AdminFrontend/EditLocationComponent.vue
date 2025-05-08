<template>
  <div class="pageContent">
    <div class="location-card">
      <div class="card-content">
        <h3 class="title">Edit Location</h3>
        <p class="subtitle">Location name</p>
        <input type="text" placeholder="Enter location name" class="input-field" v-model="location.name" />
        <p class="subtitle">Description</p>
        <input type="text" placeholder="Enter location description" class="input-field" v-model="location.description" />
        <p class="subtitle">Location coordinates</p>
        <div class="coordinates-inputs">
          <input type="text" placeholder="Enter latitude" class="input-field" v-model="location.location_data.latitude" />
          <input type="text" placeholder="Enter longitude" class="input-field" v-model="location.location_data.longitude" />
        </div>
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
        } else {
          const errorData = await response.json();
          this.showMessage(errorData.message || "Failed to fetch location details", "error");
        }
      } catch (error) {
        console.error("Error fetching location details:", error);
        this.showMessage("An error occurred while fetching location details", "error");
      }
    },
    async updateLocation() {
      const token = this.getCookie("access_token");
      try {
        this.isSubmitting = true;
        const response = await fetch(`http://127.0.0.1:8000/update_location/${this.locationId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(this.location),
        });
        if (response.ok) {
          this.showMessage("Location updated successfully", "success");
          this.$emit("location-updated");
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

</style>