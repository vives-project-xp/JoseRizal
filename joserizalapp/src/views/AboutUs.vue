<template>
	<div class="page-container">
		<div class="title">
			<h1>About Us</h1>
		</div>
		<div class="page-description">
			<div class="project-info">
				<h3>Project Info</h3>
				<p>
					Ligula vivamus gravida viverra feugiat neque sociis nam aptent tristique, nec platea velit 
					libero nisl nascetur interdum integer accumsan, tincidunt a vulputate vehicula nostra auctor 
					eu lectus. Nam natoque massa ante commodo eget ultrices nullam libero, vestibulum parturient 
					viverra enim senectus tempus luctus vivamus sed, lacus nunc mattis nibh ligula metus sociis. 
					Himenaeos curabitur habitasse mi ornare penatibus risus posuere platea ullamcorper, tortor 
					pretium fames auctor felis sem vivamus aptent netus, vestibulum sapien sodales curae duis 
					faucibus viverra tristiqu
				</p>
			</div>
			<div class="developers">
				<h3>Meet the developers</h3>
				<div class="dev-list">
					<DevCard
					v-for="dev in developers"
					:name="dev.name"
					:description="dev.description"
					:image-url="dev.imageUrl"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'

import DevCard from '@/components/UserFrontend/DevCard.vue'
import imageDev1 from '@/assets/developer_pics/Fae.jpg'
import imageDev2 from '@/assets/developer_pics/Lynn.png'
import imageDev3 from '@/assets/developer_pics/Liang.jpg'
import imageDev4 from '@/assets/developer_pics/Tristan.png'


const developers = ref([
	{
		name: 'Lynn Delaere',
		description: 'Belgium \n Web developement',
		imageUrl: imageDev2,
	},
	{
		name: 'Fae Jordaan',
		description: 'Netherlands \n Web design',
		imageUrl: imageDev1,
	},
	{
		name: 'Tristan Shawn Cerera den Ouden',
		description: 'Netherlands \n Web developement',
		imageUrl: imageDev4,
	},
	{
		name: 'Liang Yibo',
		description: 'Spain \n Backend developement',
		imageUrl: imageDev3,
	}
])

</script>

<style scoped>
html, body{
	margin: 0;
  	padding: 0;
	padding-top: 1px;
}
.page-container{
	background-image: url("@/assets/background.png");
	background-size: cover;
  	background-attachment: fixed;
	padding: 10px;
	min-height: 100vh;
}

.title, h1 {
	margin: 0;
	padding-top: 10px;
}

.page-description {
	margin: auto;
	width:50%;
	text-align: justify;
}

.project-info {
	margin: 0;
	padding: 0;
}

h3 {
	margin: 0;
	padding-bottom: 10px;
	padding-top: 15px;
}

p{
	margin: 0;
	padding: 0;
}
.developers {
	margin-top: 10px;
}
.dev-list{
	display: grid; 
	grid-template-columns: repeat(2, 1fr); /* 2 articles per row */
    gap: 0.2rem;
    padding: 0.5rem;
	row-gap: 1rem;       
  	column-gap: 0rem;
}


</style>