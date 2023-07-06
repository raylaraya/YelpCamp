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
            images: [
                {
                    url: 'https://res.cloudinary.com/dpahchhsg/image/upload/v1688611998/YelpCamp/iwyrxhlwtrwcqy8xme3l.png',
                    filename: 'YelpCamp/iwyrxhlwtrwcqy8xme3l',
                },
                {
                    url: 'https://res.cloudinary.com/dpahchhsg/image/upload/v1688611998/YelpCamp/ir2xbmyhlxwafpxomwbf.png',
                    filename: 'YelpCamp/ir2xbmyhlxwafpxomwbf',
                },
                {
                    url: 'https://res.cloudinary.com/dpahchhsg/image/upload/v1688611997/YelpCamp/dkx6fybk91elmpur3n0n.jpg',
                    filename: 'YelpCamp/dkx6fybk91elmpur3n0n',
                },
                {
                    url: 'https://res.cloudinary.com/dpahchhsg/image/upload/v1688611997/YelpCamp/ksxqfocp8nsmnicpvsot.jpg',
                    filename: 'YelpCamp/ksxqfocp8nsmnicpvsot',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});