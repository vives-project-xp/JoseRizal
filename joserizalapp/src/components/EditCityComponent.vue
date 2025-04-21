<template>
    <div class="pageContent">
        <div class="city-card">
            <div class="card-content">
                <h3 class="title">{{ city ? 'Edit City' : 'Add City' }}</h3>
                <p class="subtitle">City name</p>
                <input type="text" placeholder="Enter location name" class="input-field" v-model="newCity.name" />
                <p class="subtitle">Description</p>
                <input type="text" placeholder="Enter location description" class="input-field"
                    v-model="newCity.description" />
                <p class="subtitle">City Image</p>
                <input type="file" class="input-field" ref="cityImage" @change="handleImageInput" />
                <button class="action-button" @click="editCity">
                    {{ city ? 'Save Changes' : 'Add City' }}
                </button>
                <button class="action-button" @click="$emit('close')">Cancel</button>
                <p v-if="message" :class="['message', messageType]">{{ message }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        city: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            newCity: this.city ? { ...this.city } : { name: '', description: '', image: null },
            message: '',
            messageType: '',
        };
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
        },
        async editCity() {
            const token = this.getCookie('access_token');
            if (!token) {
                this.showMessage('You must be logged in to add a city', 'error');
                return;
            }
            if (!this.newCity.name || !this.newCity.name.trim()) {
                this.showMessage('City name is required', 'error');
                return;
            }

            const formData = new FormData();
            formData.append('name', this.newCity.name);
            formData.append('description', this.newCity.description);
            if (this.newCity.image) {
                formData.append('file', this.newCity.image);
            }

            console.log('city name:', this.newCity.name);
            console.log('city description:', this.newCity.description);
            console.log('city image:', this.newCity.image);   
                    
            try {
                const response = await fetch('http://127.0.0.1:8000/update_city/' + this.city.id, {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                    body: formData,
                });
                if (response.ok) {
                    this.showMessage('City updated successfully', 'success');
                    this.$emit('city-updated');
                } else {
                    const errorData = await response.json();
                    this.showMessage(errorData.message || 'Failed to update city', 'error');
                }
            } catch (error) {
                console.error('Error updating city:', error);
                this.showMessage('An error occurred while updating the city', 'error');
            }
        },
    },
};
</script>

<style></style>