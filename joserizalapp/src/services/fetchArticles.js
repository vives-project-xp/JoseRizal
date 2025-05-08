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
            // belgium coords
            longitude: 3.72078687023803,
            latitude: 51.05727128133882, 
            imageUrl: img_jose_rizal_1,
            landmark: true
        },
        {
            id: 2,
            title: 'Jose Rizal Landmark 2',
            preview: 'Another important location in Rizal\'s life...',
            content: 'This is some content',
            imageUrl: img_jose_rizal_2,
            // coords for the second landmark
            longitude: 3.7227790682206052,
            latitude: 51.06198939692039,
            landmark: true
        },
        {
            id: 3,
            title: 'Jose Rizal Landmark 3',
            preview: 'Memorial site honoring the national hero...',
            content: '* This is some content',
            imageUrl: img_jose_rizal_3,
            // coords for the third landmark
            longitude: 3.720754609464725,
            latitude: 51.05483215886014,
            landmark: true
        }
    ]
}

export default fetchArticles