<template>
    <div class="page-break">
        <!-- Top Image -->
        <img v-if="visibility === 'both' || visibility === 'top'" 
            :src="pageBreakTopImage" 
            alt="Top Page Break" 
            class="page-break-top" />
        
        <!-- Bottom Image -->
        <img v-if="visibility === 'both' || visibility === 'bottom'" 
            :src="pageBreakBottomImage" 
            alt="Bottom Page Break" 
            class="page-break-bottom" />
    </div>
</template>

<script setup>
import pageBreakTopImage from "@/assets/page_break_top.png";
import pageBreakBottomImage from "@/assets/page_break_bottom.png";

// Prop for controlling visibility
defineProps({
  visibility: {
    type: String,
    default: 'both', // by default, both images show, but you can choose just one if needed
  },
});
</script>

<style scoped>
.page-break {
  display: flex;
  flex-direction: column; 
  margin: 0;
  padding: 0;
}

.page-break img {
  width: 100%; 
  display: block;
  margin: 0;
}

.page-break-top {
  margin-bottom: 0;
}

.page-break-bottom {
  margin-top: 0; 
}
</style>
