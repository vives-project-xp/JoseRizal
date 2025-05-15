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
					<DevCard v-for="dev in developers" :name="dev.name" :description="dev.description"
						:image-url="dev.imageUrl" :linkedin-url="dev.linkedinUrl" />
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
	},
	{
		name: 'Simon Stijnen',
		description: 'Belgium \n Backend Engineer',
		imageUrl: "https://github.com/SimonStnn.png",
		linkedinUrl: "https://www.linkedin.com/in/simon-stijnen/",
	},
	{
		name: 'Olivier Westerman',
		description: 'Belgium \n Backend Engineer',
		imageUrl: "https://github.com/OlivierWesterman.png",
	},
	{
		name: 'Nigel Belderbos',
		description: 'Belgium \n Backend Engineer',
		imageUrl: "https://github.com/steellight541.png",
	},
	{
		name: 'Kenrie Vandekerckhove',
		description: 'Belgium \n Backend Engineer',
		imageUrl: "https://github.com/kenrie19.png",
	},
])

</script>

<style scoped>
html,
body {
	margin: 0;
	padding: 0;
	padding-top: 1px;
}

.page-container {
	background-image: url("@/assets/background.png");
	background-size: cover;
	background-attachment: fixed;
	padding: 10px;
	min-height: 100vh;
	box-sizing: border-box;
}

.title {
	text-align: center;
	margin: 0;
	padding: 20px 0;
}

.title h1 {
	margin: 0;
	padding: 0;
	font-size: clamp(1.8rem, 4vw, 2.5rem);
}

.page-description {
	margin: auto;
	width: 90%;
	max-width: 1200px;
	text-align: justify;
}

.project-info {
	margin: 0;
	padding: 0 10px;
}

h3 {
	margin: 0;
	padding-bottom: 10px;
	padding-top: 15px;
	font-size: clamp(1.2rem, 3vw, 1.5rem);
}

p {
	margin: 0;
	padding: 0;
	font-size: clamp(0.9rem, 2vw, 1rem);
	line-height: 1.6;
}

.developers {
	margin-top: 10px;
	padding: 0 10px;
}

.dev-list {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	gap: 1rem;
	padding: 0.5rem;
	justify-items: center;
}

.dev-list > * {
	width: 100%;
}

/* Media Queries for Responsive Design */
@media screen and (max-width: 768px) {
	.page-description {
		width: 95%;
	}
}

@media screen and (max-width: 480px) {
	.page-container {
		padding: 5px;
	}

	.dev-list {
		gap: 0.8rem;
		padding: 0.3rem;
	}
}

@media screen and (min-width: 1600px) {
	.page-description {
		max-width: 1400px;
	}
}
</style>