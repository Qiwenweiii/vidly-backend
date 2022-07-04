const { Genre } = require('./models/genre');
const { Movie } = require('./models/movie');
const mongoose = require('mongoose');
const config = require('config');

const data = [
  {
    name: '喜剧',
    movies: [
      { title: '空前绝后满天飞', numberInStock: 5, dailyRentalRate: 2 },
      { title: '宿醉', numberInStock: 10, dailyRentalRate: 2 },
      { title: '婚礼傲客', numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
  {
    name: '动作片',
    movies: [
      { title: '虎胆龙威', numberInStock: 5, dailyRentalRate: 2 },
      { title: '终结者', numberInStock: 10, dailyRentalRate: 2 },
      { title: '复仇者联盟', numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
  {
    name: '爱情片',
    movies: [
      { title: '恋恋笔记本', numberInStock: 5, dailyRentalRate: 2 },
      { title: '当哈利遇到莎莉', numberInStock: 10, dailyRentalRate: 2 },
      { title: '风月俏佳人', numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
  {
    name: '恐怖片',
    movies: [
      { title: '灵异第六感', numberInStock: 5, dailyRentalRate: 2 },
      { title: '消失的爱人', numberInStock: 10, dailyRentalRate: 2 },
      { title: '小岛惊魂', numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
];

async function seed() {
  await mongoose.connect(config.get('db'));

  await Movie.deleteMany({});
  await Genre.deleteMany({});

  for (let genre of data) {
    const { _id: genreId } = await new Genre({ name: genre.name }).save();
    const movies = genre.movies.map((movie) => ({
      ...movie,
      genre: { _id: genreId, name: genre.name },
    }));
    await Movie.insertMany(movies);
  }

  mongoose.disconnect();

  console.info('Done!');
}

seed();
