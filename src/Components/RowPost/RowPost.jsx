import React,{useEffect,useState} from 'react'
import Youtube from 'react-youtube'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faN } from '@fortawesome/free-solid-svg-icons';

import './RowPost.css'
import {imageUrl,API_KEY} from '../../constans/constans'

import axios from '../../axios'

function RowPost(props) {

  const [movies, setMovies] = useState([])  

  const [urlId,setUrlId] = useState('')

  useEffect(
    () => {
      axios.get(props.url).then(response=>{
        console.log(response.data);
        setMovies(response.data.results)
      }).catch(err=>{
        // alert("Network error")
      })
    },[])
  
    const opts = {
      height: '390',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
    };

    const handleMovie = (id) =>{
      console.log(id);
      axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{

          if(response.data.results.length!==0){
            setUrlId(response.data.results[0])
          }else{
            console.log("Array empty");
          }

      })
    }

  return (
    <div className='row'>
        <h2>{props.title}</h2>

      <div id='centreIcon' className='posters'>

      {movies.map((obj) => (

        <div className="poster-wrapper" key={obj.id}>
          <div className="image-container">

            <img onClick={() => handleMovie(obj.id)} className={props.isSmall ? 'smallPoster' : 'poster'} src={`${imageUrl + obj.backdrop_path}`} alt="Poster" />
           
            <FontAwesomeIcon className='youtubeIcon' size='2xl'icon={faN}  style={{ color: '#ff0000' }} />
            {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="" className="youtubeIcon" /> */}

          </div>

        </div>
      ))}
    </div>
       {  urlId && <Youtube opts={opts} videoId={urlId.key} /> }
    </div>
  )
}

export default RowPost