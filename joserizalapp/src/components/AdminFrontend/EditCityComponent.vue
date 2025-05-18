<template>
    <div class="pageContent">
        <div class="city-card">
            <div class="card-content">
                <h3 class="title">Edit city</h3>
                <p class="subtitle">City name</p>
                <input type="text" placeholder="Enter location name" class="input-field" v-model="newCity.name" />
                <p class="subtitle">Description</p>
                <input type="text" placeholder="Enter location description" class="input-field"
                    v-model="newCity.description" />
                <p class="subtitle">City Image</p>
                <input type="file" class="input-field" ref="cityImage" @change="handleImageInput" />
                <button class="action-button" @click="editCity" :disabled="isSubmitting">
                    Save
                </button>
                <button class="action-button" @click="$emit('close')">Cancel</button>
                <p v-if="message" :class="['message', messageType]">{{ message }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { apiRequest, API_URL } from "../../utils/apiConfig";

export default {
    props: {
        city: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            newCity: { name: '', description: '' },
            cityImage: null,
            message: '',
            messageType: '',
            isSubmitting: false,
        };
    },
    watch: {
        city: {
            immediate: true,
            handler(newCity) {
                if (newCity) {
                    this.getCityDetails();
                }
            },
        },
    },
    methods: {
        handleImageInput(event) {
            const file = event.target.files[0];
            this.newCity.image = file;
        },
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
        showMessage(message, type) {
            this.message = message;
            this.messageType = type;
            setTimeout(() => {
                this.message = '';
                this.messageType = '';
            }, 3000);
        }, async getCityDetails() {
            try {
                const response = await apiRequest(`/city/${this.city.id}`);
                if (!response.ok) {
                    const fetchErrorData = await response.json();
                    console.error('Error fetching city details:', fetchErrorData);
                    this.showMessage(fetchErrorData.message || 'Failed to fetch city details', 'error');
                    return;
                }
                const cityDetails = await response.json();
                this.newCity = { ...cityDetails };
            } catch (error) {
                console.error('Error fetching city details:', error);
                this.showMessage('An error occurred while fetching city details', 'error');
            }
        },

        async editCity() {
            const token = this.getCookie('access_token');

            if (!this.newCity.name || !this.newCity.name.trim()) {
                this.showMessage('City name is required', 'error');
                return;
            }

            if (!this.newCity.description || !this.newCity.description.trim()) {
                this.newCity.description = '';
            }

            try {
                this.isSubmitting = true;
                const formData = new FormData();
                formData.append('name', this.newCity.name);
                formData.append('description', this.newCity.description);
                if (this.$refs.cityImage.files[0]) {
                    formData.append('file', this.$refs.cityImage.files[0]);
                }
                const updateResponse = await apiRequest(`/update_city/${this.city.id}`, {
                    method: 'PUT',
                    headers: {
                        // Remove content-type for FormData
                        'Content-Type': undefined
                    },
                    body: formData,
                });

                if (updateResponse.ok) {
                    this.showMessage('City updated successfully', 'success');
                    this.$emit('city-updated');
                    setTimeout(() => {
                        window.location.href = window.location.pathname;
                    }, 1000);
                } else {
                    const updateErrorData = await updateResponse.json();
                    console.error('Server error:', updateErrorData);
                    this.showMessage(updateErrorData.message || 'Failed to update city', 'error');
                }
            } catch (error) {
                console.error('Error updating city:', error);
                this.showMessage('An error occurred while updating the city', 'error');
            } finally {
                this.isSubmitting = false;
            }
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

.input-field,
.textarea-field {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
    margin-bottom: 12px;
    box-sizing: border-box;
    caret-color: auto;
}

.input-field:focus,
.textarea-field:focus {
    border-color: #666666;
    box-shadow: 0 0 0 3px rgba(140, 140, 140, 0.2);
    outline: none;
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
</style>