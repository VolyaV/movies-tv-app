import React from 'react'
import axios from 'axios'
import SingleContent from '../../components/SingleContent/SingleContent'
import CustomPagination from '../../components/Pagination/CustomPagination'
import Genres from '../../components/Genres'
import './Movies.css'
import useGenre from '../../hooks/useGenre'

const Movies = () => {
  const [movies,setMovies] = React.useState([])
  const [page,setPage] = React.useState(1)
  const [numberOfPages,setNumberOfPages] = React.useState([])
  const [selectedGenres,setSelectedGenres] = React.useState([])
  const [genres,setGenres] = React.useState([])
  const genreforURL = useGenre(selectedGenres)

  const fetchMovies =async()=>{
    const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=7cf04a9eeffed94c9f46d1b6472f9ede&page=${page}&with_genres=${genreforURL}`)
    setMovies(data.results)
    setNumberOfPages(data.total_pages)
    
  }

  React.useEffect(()=>{
    fetchMovies()
    // eslint-disable-next-line
  },[page,genreforURL])

  return (
    <>
    <span className='pageTitle'>Movies</span>
    <Genres
    type="movie"
    selectedGenres={selectedGenres}
    setSelectedGenres={setSelectedGenres}
    genres={genres}
    setGenres={setGenres}
    setPage={setPage}
    />
    <div className='movies'>
      {
        movies && movies.map(item=>
        <SingleContent 
        {...item}
        key={item.id} />)
      }

    </div>
    {numberOfPages >1 && <CustomPagination
      setPage={setPage}
      numberOfPages={numberOfPages}
    />}
    </>
  )
}

export default Movies
