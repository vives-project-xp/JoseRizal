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
					This project develops a digital, interactive experience around the existing
					José Rizal Guided Walk in Ghent, focused on heritage experience, education
					and international collaboration.
					<br/>
					<br/>
					The project transforms the physical José Rizal city walk in Ghent into a
					fully virtualised tour that can be experienced both on location and remotely.
					It offers historical context through storytelling, interactive elements and
					multimedia such as text, audio, video, 360° images and virtual environments.
					Clickable hotspots, narrative storylines and mini-assignments per location
					actively engage visitors and deepen their understanding of the historical context.
					<br/>
					<br/>
					Alongside the virtual tour, an educational game was developed aimed at young
					Filipino youth, exploring the life, ideas and themes of José Rizal — including
					his studies, travels, freedom and identity. The game was created by students
					of José Rizal University in the Philippines, who also collaborated closely
					on the visual and artistic elements of the entire project. This international
					partnership ensured historical and cultural accuracy, and formed the heart
					of the collaboration between Belgium and the Philippines that made this
					project possible.
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
					<!-- Belgian/Uzbek team -->
					<DevCard
					v-for="dev in developers3"
					:name="dev.name"
					:description="dev.description"
					:image-url="dev.imageUrl"
					/>

					<!-- Filipino team -->
					<DevCard
					v-for="dev in developers2"
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

import imageVince from '@/assets/developer_pics/Vince_Julius_Cedeno.jpg'
import imageAaron from '@/assets/developer_pics/Aaron_Jason_Cedeno.jpg'
import imageTimothy from '@/assets/developer_pics/Timothy_Joseph_Angeles.jpg'
import imageKyrsten from '@/assets/developer_pics/Kyrsten_Sasil.png'
import imageRandall from '@/assets/developer_pics/Randall_Ramirez.png'

import imageDelmar from '@/assets/developer_pics/Delmar_Ramcic.jpg'
import imageJarno from '@/assets/developer_pics/Jarno_Bostyn.jpg'
import imageNicolas from '@/assets/developer_pics/Nicolas_Hongerloot.jpg'
import imageWard from '@/assets/developer_pics/Ward_Dereeper.jpg'
import imageSanjar from '@/assets/developer_pics/Sanjar_Tilavkobilov_Sanjar_Isomiddin_Ugli.jpg'

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

const developers2 = ref([
	{
		name: 'Vince Julius S. Cedeño',
		description: 'Philippines \n 3D Artist',
		imageUrl: imageVince,
	},
	{
		name: 'Aaron Jason A. Cedeño',
		description: 'Philippines \n 3D Artist',
		imageUrl: imageAaron,
	},
	{
		name: 'Timothy Joseph V. Angeles',
		description: 'Philippines \n Programmer',
		imageUrl: imageTimothy,
	},
	{
		name: 'Kyrsten Shaen C. Sasil',
		description: 'Philippines \n Multimedia Artist',
		imageUrl: imageKyrsten,
	},
	{
		name: 'Randall Jay E. Ramirez',
		description: 'Philippines \n Programmer',
		imageUrl: imageRandall,
	}
])

const developers3 = ref([
	{
		name: 'Delmar Ramcic',
		description: 'Belgium \n Web Development',
		imageUrl: imageDelmar,
	},
	{
		name: 'Jarno Bostyn',
		description: 'Belgium \n Virtual Tour',
		imageUrl: imageJarno,
	},
	{
		name: 'Nicolas Hongerloot',
		description: 'Belgium \n Virtual Tour',
		imageUrl: imageNicolas,
	},
	{
		name: 'Ward Dereeper',
		description: 'Belgium \n Virtual Tour',
		imageUrl: imageWard,
	},
	{
		name: 'Sanjar Tilavkobilov Sanjar Isomiddin Ugli',
		description: 'Uzbekistan \n Virtual Tour',
		imageUrl: imageSanjar,
	},
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
	align-items: flex-start;
	background: rgb(221, 221, 221);
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	max-width: 280px;
	margin-bottom: 15px;
}

.placeholder-image {
	width: 100%;
	height: 250px;
	background-color: #bbb;
}

.placeholder-name {
	font-weight: 600;
	font-size: 1rem;
	color: #333;
	margin: 0.5rem 1rem 0 1rem;
}

.placeholder-country {
	font-size: 1rem;
	color: #666;
	margin: 0 1rem;
}

.placeholder-role {
	font-size: 1rem;
	color: #666;
	margin: 0 1rem 1rem 1rem;
}

@media (max-width: 768px) {
	.page-description {
		width: 90%;
	}
}
</style>