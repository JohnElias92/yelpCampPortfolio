const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
  useNewUrlParser: true,
  UseUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // YOUR USER ID
      author: '6712aa1a21d5cac46b889d6d',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus voluptatibus doloribus odio sunt obcaecati consequatur numquam debitis dolor tempore illum, nam corrupti asperiores, rem ipsam nulla unde doloremque cupiditate minus?',
      price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dp9o3yomk/image/upload/v1729958535/YelpCamp/sxvmzrywftwrn0g0hnyr.jpg',
          filename: 'YelpCamp/sxvmzrywftwrn0g0hnyr',
        },
        {
          url: 'https://res.cloudinary.com/dp9o3yomk/image/upload/v1729958549/YelpCamp/hga8zalzotmy5ceo2zz9.jpg',
          filename: 'YelpCamp/hga8zalzotmy5ceo2zz9',
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
