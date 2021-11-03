import React from 'react'
import axios from 'axios'
import SingleContent from '../../components/SingleContent/SingleContent'
import CustomPagination from '../../components/Pagination/CustomPagination'
import Genres from '../../components/Genres'
import useGenre from '../../hooks/useGenre'
import './Series.css'

const Series = () => {
  const [tvseries,setTvSeries] = React.useState([])
  const [page,setPage] = React.useState(1)
  const [numberOfPages,setNumberOfPages] = React.useState([])
  const [selectedGenres,setSelectedGenres] = React.useState([])
  const [genres,setGenres] = React.useState([])
  const genreforURL = useGenre(selectedGenres)

  const fetchMovies =async()=>{
    const {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=7cf04a9eeffed94c9f46d1b6472f9ede&page=${page}&with_genres=${genreforURL}`)
    setTvSeries(data.results)
    setNumberOfPages(data.total_pages)
    
  }

  React.useEffect(()=>{
    fetchMovies()
    // eslint-disable-next-line
  },[page,genreforURL])

  return (
    <>
    <span className='pageTitle'>TV Series</span>
    <Genres
    type="tv"
    selectedGenres={selectedGenres}
    setSelectedGenres={setSelectedGenres}
    genres={genres}
    setGenres={setGenres}
    setPage={setPage}
    />
    <div className='tvseries'>
      {
        tvseries && tvseries.map(item=>
        <SingleContent 
        {...item}
        key={item.id} 
        media_type="tv"
        />)
      }

    </div>
    {numberOfPages >1 && <CustomPagination
      setPage={setPage}
      numberOfPages={numberOfPages}
    />}
    </>
  )
}

export default Series
