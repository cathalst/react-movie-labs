import React, { useState } from "react";
import { getNowPlayingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const NowPlayingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [minRating, setMinRating] = useState(0);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["nowplaying"],
    queryFn: getNowPlayingMovies,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  let movies = data.results;
  if (searchQuery) {
    movies = movies.filter((m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  if (genreFilter) {
    movies = movies.filter((m) => m.genre_ids.includes(parseInt(genreFilter)));
  }
  if (minRating > 0) {
    movies = movies.filter((m) => m.vote_average >= minRating);
  }

  return (
    <PageTemplate
      title="Now Playing"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      genreFilter={genreFilter}
      setGenreFilter={setGenreFilter}
      minRating={minRating}
      setMinRating={setMinRating}
    />
  );
};

export default NowPlayingPage;
