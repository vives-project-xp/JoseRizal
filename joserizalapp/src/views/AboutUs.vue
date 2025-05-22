<template>
	<div class="page-container">
		<div class="title">
			<h1>About Us</h1>
		</div>
		<div class="page-description">
			<div class="project-info">
				<h3>Project Info</h3>
				<p>
					Wij zijn vier gemotiveerde studenten die hebben deelgenomen aan een Blended Intensive Program 
					(BIP), een unieke internationale leerervaring waarbij samenwerking met studenten uit verschillende landen en 
					vakgebieden centraal staat. Tijdens dit programma leerden we niet alleen over elkaars culturen en achtergronden, 
					maar werkten we ook intensief samen aan realistische en maatschappelijk relevante projecten.
					<br/>
					<br/>
					Een van de projecten waarvoor wij onze krachten bundelden, was in opdracht van het consulaat van 
					de Filipijnen in België en de Filipijnse ambassade. Ons doel: het leven en de erfenis van 
					José Rizal – een nationale held van de Filipijnen – onder de aandacht brengen van de 
					Gentse bevolking. Rizal verbleef een belangrijk deel van zijn leven in Gent, waar hij onder 
					andere meewerkte aan de publicatie van zijn invloedrijke werken die de Filipijnse 
					onafhankelijkheidsbeweging voedden.
					<br/>
					<br/>
					Met ons project willen we een brug slaan tussen verleden en heden, tussen België en de Filipijnen. 
					We ontwikkelden een campagne die Gentenaars informeert en inspireert, en die Rizals verblijf in 
					Gent op een tastbare manier zichtbaar maakt in het stadsbeeld. Door storytelling, interactieve 
					media en lokale partnerschappen brengen we zijn verhaal opnieuw tot leven – niet alleen als 
					geschiedkundige figuur, maar als bron van inspiratie voor internationale verbondenheid, burgerzin 
					en intellectuele vrijheid.
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
