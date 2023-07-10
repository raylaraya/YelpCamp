/*
    We will run this file on its own anytime we want to seed our database
    which is pretty much anytime we make changes to our model or data
    Seeding: populating our database with an initial set of data
    In our case we our populating our mongodb database with initial sets of campgrounds
*/

const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

// deletes everything from our database and replaces it with new campgrounds
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6499fc31aab7dc54feac6c83',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci iste modi, minus eum quis nemo et fugiat, doloremque eveniet nobis natus commodi odit aliquid quia totam voluptatum quasi sint corporis!',
            price,
            geometry: {
                type: "Point",
                coordinates: [-113.1331, 47.0202],
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dpahchhsg/image/upload/v1688688747/YelpCamp/otsnebomcbjousi1vguf.jpg',
                    filename: 'YelpCamp/otsnebomcbjousi1vguf',
                },
                {
                    url: 'https://res.cloudinary.com/dpahchhsg/image/upload/v1688683848/YelpCamp/ldmmtrs23gcjtwwfzlpi.jpg',
                    filename: 'YelpCamp/ldmmtrs23gcjtwwfzlpi',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});