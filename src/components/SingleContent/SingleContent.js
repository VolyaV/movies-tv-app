import React from 'react'
import {img_300,unavailable} from '../../config/config'
import './SingleContent.css'
import {Badge} from '@material-ui/core'


const SingleContent = ({title,poster_path,media_type,first_air_date,release_date,vote_average,name}) => {
  
  return (
    <div className='media'>
      <Badge badgeContent={vote_average} color={vote_average > 6 ? 'primary' : 'secondary'}/>
      <img 
      className='poster' 
      src={poster_path ?`${img_300}/${poster_path}` :unavailable } 
      alt='posterImg' 
      />
      <b className='title'>{title ? title : name}</b>
      <span className='subTitle'>
      {media_type === "tv" ? "TV Series" : "Movie"}
        <span className='subTitle'>
        {release_date ? release_date : first_air_date}
        </span>
      </span>
    </div>
  )
}

export default SingleContent
