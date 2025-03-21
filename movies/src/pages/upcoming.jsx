import React from "react";
import { getUpcoming } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import PlaylistAddIcon from '../components/cardIcons/addPlaylist';


const Upcoming = (props) => {

  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['Upcoming'],
    queryFn: getUpcoming,
  })
  
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const AddToPlaylistIcon = (movieId) => true 

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        
        return <PlaylistAddIcon movie={movie}/>
      }}
    />
);

};
export default Upcoming;
