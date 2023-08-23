const mongoose = require('mongoose');
const Campground = require("../models/campground");
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected!")
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64d15e37d892cc57294804b3',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/dqy5d8x8d/image/upload/v1691777309/Yelpcamp/hzjqgrex0ozstiobqost.jpg',
                  filename: 'Yelpcamp/hzjqgrex0ozstiobqost'
                },
                {
                  url: 'https://res.cloudinary.com/dqy5d8x8d/image/upload/v1691777310/Yelpcamp/ikrqpkbnape58lfc6jnf.png',
                  filename: 'Yelpcamp/ikrqpkbnape58lfc6jnf'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close()
});
