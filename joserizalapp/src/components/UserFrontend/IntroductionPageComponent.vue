<template>
    <div id="introduction" class="pageContent">
        <div v-for="title in titles" :key="title.id">
            <template v-if="title.id === 1">
                <h1>{{ title.title }}</h1>
                <div class="textImageWrapper">
                    <img :src="image.find(i => i.id === title.id).src" alt="Image" />
                    <p>{{ text.find(t => t.id === title.id).text }}</p>
                </div>
            </template>
            <template v-else>
                <h3>{{ title.title }}</h3>
                <div class="textImageWrapper">
                    <img :src="image.find(i => i.id === title.id).src" alt="Image" />
                    <p>{{ text.find(t => t.id === title.id).text }}</p>
                </div>
            </template>
        </div>
    </div>
</template>


<script>
import JoseRizalBio from '../../assets/generic_intro_pics/JoseRizalBio.jpg'
import JoseRizalEdu from '../../assets/generic_intro_pics/JoseRizalEdu.jpg'
import JoseRizalRelation from '../../assets/generic_intro_pics/JoseRizalRelation.jpg'


export default {
    name: 'IntroductionPageComponent',
    data() {
        return {
            titles: [
                { id: 1, title: 'Biography' },
                { id: 2, title: 'Education' },
                { id: 3, title: 'Personal life, relationships and ventures' }
            ],
            text: [
                { id: 1, text: 'José Rizal (1861–1896) was a Filipino nationalist, writer, and polymath who played a key role in the Filipino Propaganda Movement against Spanish colonial rule. An ophthalmologist by profession, he authored Noli Me Tángere and El filibusterismo, which inspired the Philippine Revolution. Though not directly involved in the revolution, his writings fueled the movement for independence. Executed by the Spanish in 1896 for rebellion, he remains a revered national hero. His ancestry was a mix of Chinese, Spanish, and Tagalog, and he was known for his intelligence and literary prowess from a young age.' },
                { id: 2, text: 'José Rizal pursued his education at the Ateneo Municipal de Manila, excelling in multiple fields. Initially studying law at the University of Santo Tomas, he switched to medicine upon learning of his mother’s blindness, specializing in ophthalmology. He continued his studies in Madrid, Paris, and Heidelberg, where he trained under renowned doctors and became a polyglot fluent in 22 languages. A polymath, Rizal was also a writer, painter, sculptor, historian, and Freemason. His novels, Noli Me Tángere and El filibusterismo, became catalysts for Philippine nationalism, blending literature with his advocacy for reform.' },
                { id: 3, text: 'José Rizal\'s life is one of the most well- documented among 19th - century Filipinos due to his extensive writings and letters. A prolific diarist, Rizal recorded his travels, relationships, and experiences, often switching between languages in his writings. His first love was Segunda Katigbak, though she was engaged to another.His longest and most significant relationship was with Leonor Rivera, who inspired the character of María Clara in Noli Me Tángere. Their love endured years of secret correspondence, but her family opposed the match, and she eventually married an Englishman, devastating Rizal. During his travels in Europe and Asia, Rizal was linked to several women, including Gertrude Beckett in London, Nelly Boustead of an English- Iberian family, and Seiko Usui in Japan.In Hong Kong, he practiced ophthalmology and lived with his family. In 1895, Rizal met Josephine Bracken, an Irishwoman who brought her adoptive father to Rizal for eye treatment.They fell in love, but the Catholic Church refused to marry them due to Rizal’s political reputation.Instead, they lived in a common - law marriage in Dapitan and had a son who died shortly after birth. Rizal’s personal life, much like his political endeavors, was marked by passion, hardship, and unwavering dedication to his beliefs.' }],
            image: [
                { id: 1, src: JoseRizalBio },
                { id: 2, src: JoseRizalEdu },
                { id: 3, src: JoseRizalRelation }
            ]
        }
    }
}
</script>

<style scoped>
.pageContent {
    font-family: 'Pompiere', sans-serif;
    font-style: normal;
    color: #333;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

h1, 
h3 {
    margin-top: 2rem;
    margin-bottom: 1.5rem;
}

h1 {
    font-size: 2.5rem;
    font-weight: 400;
	text-align: center;
}

h3 {
	text-align: left;
    font-size: 1.8rem;
    font-weight: 400;
}

img {
    display: block;
    margin: 0 auto 1.5rem;
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

p {
    line-height: 1.6;
    text-align: left;
    max-width: 800px;
    margin: 0 auto 2rem;
    padding: 0;
    font-size: 1.1rem;
}

.textImageWrapper {
    overflow: hidden; /* Clear the float */
    margin-bottom: 2rem;
}

.textImageWrapper img {
    float: left;
    width: 300px; /* Adjust to fit your layout */
    margin: 0 1.5rem 1rem 0;
    margin-top: 0.35rem;
}

.textImageWrapper p {
    text-align: justify;
    line-height: 1.6;
    font-size: 1.1rem;
}

@media (max-width: 768px) {
    .pageContent {
        padding: 1rem;
    }

    h1 {
        font-size: 2rem;
    }

    h3 {
        font-size: 1.5rem;
    }

    p {
        font-size: 1.2rem;
        line-height: 1.7;
        padding: 0 1rem;
    }

    .textImageWrapper img {
        float: none;
        display: block;
        margin: 0 auto 1rem;
        width: 100%;
    }

    .textImageWrapper p {
        padding: 0;
        font-size: 1.2rem;
    }
}
</style>