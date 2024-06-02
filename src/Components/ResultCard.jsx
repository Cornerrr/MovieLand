import React, { useContext, useState, useEffect } from "react";
import Moment from "react-moment";
import { GlobalContext } from "../context/GlobalState";

export const ResultCard = ({ movie }) => {
  const {
    addMovieToWatchlist,
    addMovieToWatched,
    watchlist,
    watched,
  } = useContext(GlobalContext);

  const [genres, setGenres] = useState([]);
  const [trailerKey, setTrailerKey] = useState("");
  const [rating, setRating] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const [runtime, setRuntime] = useState("");

  useEffect(() => {
    // 在组件加载时调用TMDb API以获取电影的详细信息，包括导演、预告片和评分
    const fetchMovieDetails = async () => {
      const movieDetailsResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=f0a8b943b9b76a3e3ce5440889f18343&language=en-US`
      );
      const movieDetailsData = await movieDetailsResponse.json();

      setGenres(movieDetailsData?.genres || []);

      const trailerResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=f0a8b943b9b76a3e3ce5440889f18343&language=en-US`
      );
      const trailerData = await trailerResponse.json();
      const trailer = trailerData.results.find(result => result.type === "Trailer");
      setTrailerKey(trailer?.key || "");

      setRating(movieDetailsData?.vote_average || "");
      setRuntime(movieDetailsData?.runtime || "");
    };

    fetchMovieDetails();
  }, [movie.id]);

  let storedMovie = watchlist.find((o) => o.id === movie.id);
  let storedMovieWatched = watched.find((o) => o.id === movie.id);

  const watchlistDisabled = storedMovie
    ? true
    : storedMovieWatched
    ? true
    : false;

  const watchedDisabled = storedMovieWatched ? true : false;

  const handleToggleTrailer = () => {
    setShowTrailer(!showTrailer);
  };

  return (
    <div className="result-card">
      <div className="poster-wrapper">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={`${movie.title} Poster`}
          />
        ) : (
          <div className="filler-poster" />
        )}
      </div>

      <div className="info">
        <div className="header2">
          <h3 className="title">{movie.title}</h3>
          <h4 className="release-date">
            <Moment format="YYYY">{movie.release_date}</Moment>
          </h4>
          <p className="genres">
            Genres: {genres.map((genre) => genre.name).join(", ")}
          </p>
          <p className="rating">Rating: {rating}</p>
          <p className="runtime">Runtime: {runtime} minutes</p>
        </div>

        <div className="controls">
          <button
            className="btn2"
            disabled={watchlistDisabled}
            onClick={() => addMovieToWatchlist(movie)}
          >
            Add to Watchlist
          </button>

          <button
            className="btn2"
            disabled={watchedDisabled}
            onClick={() => addMovieToWatched(movie)}
          >
            Add to Watched
          </button>
          <button className="btn2" onClick={handleToggleTrailer}>
            {showTrailer ? "Hide Trailer" : "Show Trailer"}
          </button>
        </div>
        {showTrailer && trailerKey && (
          <div className="trailer">
            <iframe
              title={`${movie.title} Trailer`}
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};
