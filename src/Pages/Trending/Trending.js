import axios from 'axios'
import React from 'react'
import './Trending.css'
import SingleContent from '../../components/SingleContent/SingleContent'
import CustomPagination from '../../components/Pagination/CustomPagination'

const Trending = () => {
  const [content,setContent] = React.useState([])
  const [page,setPage] = React.useState(1)
  
  

  const fetchData =async()=>{
    const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=7cf04a9eeffed94c9f46d1b6472f9ede&page=${page}`)
    setContent(data.results)
    
  }

  React.useEffect(()=>{
    fetchData()
    // eslint-disable-next-line
  },[page])
  
  return (
    <>
    <span className='pageTitle'>Trending</span>
    <div className='trending'>
      {
        content && content.map(item=>
        <SingleContent 
        {...item}
        key={item.id} />)
      }

    </div>
    <CustomPagination
      setPage={setPage}
    />
    </>
  )
}

export default Trending
