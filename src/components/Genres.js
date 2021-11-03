import React from 'react'
import axios from 'axios'
import {Chip} from '@material-ui/core'

const Genres = ({type,selectedGenres,setSelectedGenres,genres,setGenres,setPage}) => {

  const handleAdd =(genre)=>{
    setSelectedGenres([...selectedGenres,genre])
    setGenres(genres.filter((i)=>i.id !== genre.id))
    setPage(1)
  }

  const hanleRemove =(genre)=>{
    setSelectedGenres(selectedGenres.filter((selected)=>selected.id !== genre.id))
    setGenres([...genres,genre])
    setPage(1)
  }

  const fetchGenres =async()=>{
    const {data} = await axios.get( `https://api.themoviedb.org/3/genre/${type}/list?api_key=7cf04a9eeffed94c9f46d1b6472f9ede&language=en-US`)
    setGenres(data.genres)
  }

  

  React.useEffect(()=>{
    fetchGenres()
    //Cancel the API call
    return ()=> {
      setGenres({})
    }
    // eslint-disable-next-line
  },[])
  return (
    <div style={{padding:"6px 0"}}>
      {selectedGenres &&
         selectedGenres.map(genre=>
         <Chip 
          label={genre.name} 
          key={genre.id} 
          style={{margin:2}} 
          size="small"
          color="primary" 
          clickable
          onDelete={()=>hanleRemove(genre)}
          />)
      }
      {genres &&
         genres.map(genre=>
         <Chip 
          label={genre.name} 
          key={genre.id} 
          style={{margin:2}} 
          size="small" 
          clickable
          onClick={()=>handleAdd(genre)}
          />)
      }
    </div>
  )
}

export default Genres
