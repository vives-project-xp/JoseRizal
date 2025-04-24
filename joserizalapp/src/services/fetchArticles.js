import img_jose_rizal_1 from '../assets/generic_landmark_pics/joserizal1.jpg'
import img_jose_rizal_2 from '../assets/generic_landmark_pics/joserizal2.jpg'
import img_jose_rizal_3 from '../assets/generic_landmark_pics/joserizal3.jpg'

const fetchArticles = () => {
    return [
        {
            id: 1,
            title: 'Jose Rizal Landmark 1',
            preview: 'Historical site related to Dr. Jose Rizal...',
            content: '# This is some content',
            imageUrl: img_jose_rizal_1,
            landmark: true
        },
        {
            id: 2,
            title: 'Jose Rizal Landmark 2',
            preview: 'Another important location in Rizal\'s life...',
            content: 'This is some content',
            imageUrl: img_jose_rizal_2,
            landmark: true
        },
        {
            id: 3,
            title: 'Jose Rizal Landmark 3',
            preview: 'Memorial site honoring the national hero...',
            content: '* This is some content',
            imageUrl: img_jose_rizal_3,
            landmark: false
        }
    ]
}

export default fetchArticles