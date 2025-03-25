<template>
    <div id="addEdit" class="pageContent">
        <form>
            <h1>Add - Edit</h1>
            <label for="title">Title</label>
            <input type="text" id="title" required>
            <label for="subtitle">Subtitle</label>
            <input type="text" id="subtitle" required>
            <label for="street">Street</label>
            <input type="text" id="street" required>
            <label for="city">City</label>
            <input type="text" id="city" required>
            <label for="country">Country</label>
            <input type="text" id="country" required>
            <label for="zipcode">Zip code</label>
            <input type="text" id="zipcode" required>
            <label for="xcord">X Coordinate</label>
            <input type="text" id="xcord" required>
            <label for="ycord">Y Coordinate</label>
            <input type="text" id="ycord" required>
            <label for="text">Text</label>
            <textarea id="text" required></textarea>
            <label for="image">Image</label>
            <input type="file" id="image" accept="image/*" required @change="previewImage">
            <img v-if="imageUrl" :src="imageUrl" alt="Image Preview" />
        </form>
    </div>
</template>

<script>

</script>

<style></style>