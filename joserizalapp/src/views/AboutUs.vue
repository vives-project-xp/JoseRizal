<template>
	<div class="page-container">
		<div class="title">
			<h1>About Us</h1>
		</div>
		<div class="page-description">

			<!-- PROJECT INFO: WEBSITE -->
			<div class="section-header">
				<h2>Project Info: Website</h2>
			</div>
			<div class="project-info">
				<p>
					We are four motivated students who participated in a Blended Intensive Program
					(BIP), a unique international learning experience centered around collaboration
					with students from different countries and fields of study. During this program,
					we not only learned about each other's cultures and backgrounds, but also worked
					intensively together on realistic and socially relevant projects.
					<br/>
					<br/>
					One of the projects we joined forces on was commissioned by the Consulate of
					the Philippines in Belgium and the Philippine Embassy. Our goal: to bring the
					life and legacy of José Rizal – a national hero of the Philippines – to the
					attention of the people of Ghent. Rizal spent an important part of his life in
					Ghent, where he contributed to the publication of his influential works that
					fueled the Philippine independence movement.
					<br/>
					<br/>
					With our project, we want to build a bridge between past and present, between
					Belgium and the Philippines. We developed a campaign that informs and inspires
					the people of Ghent, making Rizal's stay in Ghent tangibly visible in the city.
					Through storytelling, interactive media and local partnerships, we bring his
					story back to life – not just as a historical figure, but as a source of
					inspiration for international solidarity, civic engagement and intellectual freedom.
				</p>
			</div>

			<!-- PROJECT INFO: VIRTUAL TOUR & GAMES -->
			<div class="section-header">
				<h2>Project Info: Virtual Tour & Games</h2>
			</div>
			<div class="project-info">
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
					Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					<br/>
					<br/>
					Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
					Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					<br/>
					<br/>
					Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
					Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
				</p>
			</div>

			<!-- MEET THE DEVELOPERS: WEBSITE -->
			<div class="section-header">
				<h2>Meet the Developers: Website</h2>
			</div>
			<div class="developers">
				<div class="dev-list">
					<DevCard
					v-for="dev in developers"
					:name="dev.name"
					:description="dev.description"
					:image-url="dev.imageUrl"
					/>
				</div>
			</div>

			<!-- MEET THE DEVELOPERS: VIRTUAL TOUR & GAMES -->
			<div class="section-header">
				<h2>Meet the Developers: Virtual Tour & Games</h2>
			</div>
			<div class="developers">
				<div class="dev-list">
					<!-- 5 individual placeholder cards -->
					<div class="placeholder-card" v-for="n in 5" :key="'individual-' + n">
						<div class="placeholder-image"></div>
						<p class="placeholder-name">Developer {{ n }}</p>
						<p class="placeholder-role">Role placeholder</p>
					</div>
					<!-- 1 group picture placeholder spanning full width -->
					<div class="placeholder-card group-card">
						<div class="placeholder-image group-image"></div>
						<p class="placeholder-name">Group Picture</p>
						<p class="placeholder-role">The full team</p>
					</div>
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
html, body {
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
}

.title, h1 {
	margin: 0;
	padding-top: 10px;
}

.page-description {
	margin: auto;
	width: 50%;
	text-align: justify;
}

.section-header {
	margin-top: 2rem;
	margin-bottom: 0.5rem;
	border-bottom: 2px solid #c9a84c;
	padding-bottom: 0.5rem;
}

.section-header h2 {
	margin: 0;
	font-size: 1.8rem;
	color: #3a2a00;
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

p {
	margin: 0;
	padding: 0;
}

.developers {
	margin-top: 10px;
}

.dev-list {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 0.2rem;
	padding: 0.5rem;
	row-gap: 1rem;
	column-gap: 0rem;
}

.placeholder-card {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
	background-color: rgba(255, 255, 255, 0.6);
	border-radius: 8px;
	padding: 1rem;
	border: 2px dashed #c9a84c;
}

.placeholder-image {
	width: 100px;
	height: 100px;
	border-radius: 50%;
	background-color: #ddd;
	border: 2px dashed #aaa;
}

.group-card {
	grid-column: 1 / -1;
}

.group-image {
	width: 100%;
	height: 150px;
	border-radius: 8px;
	background-color: #ddd;
}

.placeholder-name {
	font-weight: 700;
	font-size: 1rem;
	margin: 0;
}

.placeholder-role {
	font-size: 0.85rem;
	color: #666;
	margin: 0;
}

@media (max-width: 768px) {
	.page-description {
		width: 90%;
	}
}
</style>