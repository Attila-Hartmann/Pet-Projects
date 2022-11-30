const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i =0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '637e1af2c0894c525ebb1f62',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel perferendis dolorum quaerat doloribus, tenetur rem impedit quis, qui autem, tempora libero? Ab beatae consequuntur ipsam qui ad veritatis eligendi culpa!',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            image: [
                {
                  url: 'https://res.cloudinary.com/drrtri2ys/image/upload/v1669556601/YelpCamp/wdlw6xxqify6rp02ys6z.jpg',
                  filename: 'YelpCamp/wdlw6xxqify6rp02ys6z',
                },
                {
                  url: 'https://res.cloudinary.com/drrtri2ys/image/upload/v1669556601/YelpCamp/tpfrlltqqp9g1inxtna9.jpg',
                  filename: 'YelpCamp/tpfrlltqqp9g1inxtna9',
                }
              ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})