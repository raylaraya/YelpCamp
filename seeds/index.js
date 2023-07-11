/*
    We will run this file on its own anytime we want to seed our database
    which is pretty much anytime we make changes to our model or data
    Seeding: populating our database with an initial set of data
    In our case we our populating our mongodb database with initial sets of campgrounds
*/

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

// import mapbox
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

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
    await Campground.deleteMany({}); // delete everything

    // Seed 50 new camps
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const name = `${sample(descriptors)} ${sample(places)}`;
        const price = Math.floor(Math.random() * 20) + 10;
        const location = `${cities[random1000].city}, ${cities[random1000].state}`
        const geoData = await geocoder.forwardGeocode({
            query: location,
            limit: 1
        }).send()

        const camp = new Campground({
            // Your user ID. If you delete the users in mongoDB you will get an error when trying to seed your database
            author: '6499fc31aab7dc54feac6c83',
            title: name,
            location: location,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias magni distinctio porro, cum dicta perspiciatis nam? Ad maiores, nisi voluptatum obcaecati magni neque omnis ab et nobis amet molestias exercitationem.",
            price,
            geometry: geoData.body.features[0].geometry,
            images: [
                {
                    url: 'https://res.cloudinary.com/dpahchhsg/image/upload/v1688683847/YelpCamp/wybwqj5vnagmyxfq7i6x.jpg',
                    filename: 'YelpCamp/wybwqj5vnagmyxfq7i6x'
                },
                {
                    url: 'https://res.cloudinary.com/dpahchhsg/image/upload/v1688683848/YelpCamp/ldmmtrs23gcjtwwfzlpi.jpg',
                    filename: 'YelpCamp/ldmmtrs23gcjtwwfzlpi'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});