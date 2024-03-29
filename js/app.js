import MOVIE_DATA from "./data/movie-data.js";

class Movie {
  constructor(title, rating, duration, image) {
    this.title = title;
    this.rating = rating;
    this.duration = duration;
    this.image = image;
  }
}

class App {
  constructor() {
    this.movieTitle;
    this.movieRating;
    this.movieDuration;
    this.nextButton;
    this.filterButton;
    this.filterNumber = 0;
    this.movieNumber = 0;
    this.image = new Image();
    this.moviesArray = [];

    this.createObjects();
    this.buildDom();
    this.showMovie();
  }

  incrementMovieNumber = () => {
    this.movieNumber++;
    if (this.movieNumber === this.moviesArray.length) {
      this.movieNumber = 0;
    }
  };

  incrementFilterNumber = () => {
    this.filterNumber++;
    console.log("filterNumber", this.filterNumber);
  };

  createObjects() {
    MOVIE_DATA.forEach(movie => {
      this.moviesArray.push(new Movie(movie.title, movie.rating, movie.duration, movie.image));
    });
  }

  buildDom() {
    let card = document.createElement("div");
    card.classList.add("card");
    this.image.classList.add("card__img");
    this.movieTitle = document.createElement("h1");
    this.movieTitle.classList.add("card__title");
    this.movieRating = document.createElement("p");
    this.movieRating.classList.add("card__info");
    this.movieDuration = document.createElement("p");
    this.movieDuration.classList.add("card__info");
    this.nextButton = document.createElement("button");
    this.nextButton.classList.add("card__button");
    this.filterButton = document.createElement("button");
    this.filterButton.classList.add("card__button");

    document.body.append(card);
    card.append(this.image, this.movieTitle, this.movieDuration, this.movieRating, this.nextButton, this.filterButton);

    this.nextButton.addEventListener("click", () => {
      this.incrementMovieNumber();
      this.showMovie();
    });

    this.filterButton.addEventListener("click", () => {
      this.filter();
    });
  }

  showMovie() {
    const movie = this.moviesArray[this.movieNumber];
    this.image.src = movie.image;
    this.image.alt = `Movie poster for ${movie.title}`;
    this.movieTitle.textContent = `${movie.title}`;
    this.movieDuration.textContent = `Duration: ${Utils.convertTime(movie.duration)}`;
    this.movieRating.textContent = `Rating: ${movie.rating}`;
    this.nextButton.textContent = "Next";
    this.filterButton.textContent = "R Movies Only";
  }

  filter() {
    const fMovies = this.moviesArray.filter(movie => movie.rating === "R");

    if (this.movieTitle.textContent === fMovies[this.filterNumber].title && this.filterNumber < fMovies.length - 1) {
      this.incrementFilterNumber();
    }

    this.image.src = fMovies[this.filterNumber].image;
    this.image.alt = `Movie poster for ${fMovies[this.filterNumber].title}`;
    this.movieTitle.textContent = `${fMovies[this.filterNumber].title}`;
    this.movieDuration.textContent = `Duration: ${Utils.convertTime(fMovies[this.filterNumber].duration)}`;
    this.movieRating.textContent = `Rating: ${fMovies[this.filterNumber].rating}`;

    this.incrementFilterNumber();
    if (this.filterNumber === fMovies.length) {
      this.filterNumber = 0;
    }
  }
}

(() => {
  const app = new App();
})();
